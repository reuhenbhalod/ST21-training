# Deploying SmarTek21 Academy to AWS

Full migration from Vercel + Supabase to **S3 + CloudFront (static) + Lambda (API) + DynamoDB (data)**.
Entra ID authentication is **unchanged** — it stays in Azure and is verified inside the Lambda.

Target cost: **~$0/month** at internal-tool volume.

---

## What's in this repo now

| Path | Purpose |
|---|---|
| `template.yaml` | SAM/CloudFormation: DynamoDB table, API Lambda + Function URL, S3 bucket, CloudFront |
| `api/lambda.js` | Single Lambda entrypoint; routes `/api/*` to the 6 handlers |
| `api/_lib/db.js` | DynamoDB data layer (replaced Supabase) |
| `api/_lib/auth.js` | Entra ID JWT verification — **unchanged** |
| `scripts/migrate-supabase-to-dynamo.mjs` | One-time data copy Supabase → DynamoDB |

---

## Prerequisites (one time)

1. AWS CLI + SAM CLI installed (you already have both).
2. Log in to your company AWS account, e.g. `aws sso login` (or configure a profile).
3. Pick a region, e.g. `us-east-1`.

---

## Step 1 — Deploy the AWS infrastructure

```bash
sam build
sam deploy --guided \
  --stack-name smartek21-academy \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM
```

Accept the defaults. When it finishes, note the **Outputs**:

- `SiteURL`   → e.g. `https://d123abc.cloudfront.net` (your new app URL)
- `BucketName`
- `DistributionId`
- `TableName` → `smartek21-academy`

Subsequent deploys are just `sam build && sam deploy`.

---

## Step 2 — Migrate the data from Supabase

Copy the existing rows into DynamoDB (run once):

```bash
cd scripts
npm init -y && npm i @supabase/supabase-js @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
SUPABASE_URL='<your supabase url>' \
SUPABASE_SERVICE_KEY='<your supabase service key>' \
TABLE_NAME='smartek21-academy' \
AWS_REGION='us-east-1' \
node migrate-supabase-to-dynamo.mjs
```

It prints how many users / progress rows / attempts it copied. It's idempotent — safe to re-run for a final sync at cutover.

---

## Step 3 — Build and upload the React site

```bash
npm run build                       # produces dist/
aws s3 sync dist/ s3://<BucketName>/ --delete
aws cloudfront create-invalidation --distribution-id <DistributionId> --paths '/*'
```

Visit `SiteURL` — the app loads (login won't work yet until Step 4).

---

## Step 4 — Point Entra ID at the new URL

In the Azure Portal → **App registrations** → your app
(`clientId 9c7894fe-fab8-40ac-a866-81d06f14f68c`):

1. **Authentication → Single-page application → Redirect URIs** → add your `SiteURL`
   (e.g. `https://d123abc.cloudfront.net`). Keep the Vercel URL too during cutover.
2. Save.

No secrets, no Azure resource moves — the app already authenticates the browser
directly against Microsoft and only the redirect URI needs the new origin. The
frontend uses `redirectUri: window.location.origin`, so it adapts automatically.

> When you later map a custom domain (e.g. `academy.smartek21.com`) to CloudFront,
> add that URL as a redirect URI too.

---

## Step 5 — Lock down CORS (recommended)

The API defaults to `AllowedOrigin: *`. After confirming the app works, tighten it:

```bash
sam deploy --parameter-overrides AllowedOrigin=https://d123abc.cloudfront.net
```

---

## Step 6 — Verify, then decommission the old stack

Test end-to-end on the CloudFront URL: log in with a `@smartek21.com` account,
read a section, take a quiz, and (as an admin) open the admin dashboard.

Then:
- Remove the CloudFront/new URL testing aside, delete the **Vercel** project.
- **Pause or delete the Supabase** project (the keep-alive cron is gone — DynamoDB never idles out).
- Remove the old Vercel redirect URI from Entra.

---

## AI Chat assistant (`/api/chat`)

An in-app floating assistant answers questions about the training modules using
**Amazon Nova Lite** via Bedrock. It is grounded strictly in the course
content and refuses off-topic questions.

- **Knowledge base:** `npm run build:kb` flattens `src/courseData.jsx` into
  `api/course-kb.json` (quiz answers excluded). `npm run build` runs it
  automatically, and it is bundled into the Lambda by `sam build`. Re-run after
  editing course content.
- **Model:** set by the `BedrockModelId` template parameter (default
  `us.amazon.nova-lite-v1:0`). Confirm model access is ACTIVE for Nova Lite in
  the Bedrock console; if you switch regions/models, enable access there and
  confirm the invocable id.
- **Guardrails (no Bedrock Guardrail resource):** two cheap layers in
  `api/chat.js` — (1) a tiny Nova topic-classifier pre-check that refuses
  off-topic asks before the expensive call, and (2) system-prompt grounding.
  A Bedrock Guardrail can be layered in later by setting the `GUARDRAIL_ID` /
  `GUARDRAIL_VERSION` env vars (the handler already conditionally applies it).
- **IAM:** the Lambda role has `bedrock:InvokeModel` scoped to the Nova Lite
  foundation model + inference profiles.
- **Audit:** each conversation turn is logged to DynamoDB
  (`PK=USER#<email>`, `SK=CHAT#<ts>#<id>`), fire-and-forget.
- **Rate limiting:** each user gets **10 chat messages/minute** (burst) and
  **100/day** (cost cap), enforced in `api/chat.js` *before* any Bedrock call
  via atomic fixed-window counters in the same DynamoDB table
  (`SK=RL#chat#<window>`; a table TTL on `expires_at` garbage-collects old
  windows). Over the limit → `429` + `Retry-After`; the chat panel shows a
  cooldown countdown. Tune with the `ChatRateLimitPerMinute` /
  `ChatRateLimitPerDay` template parameters (`sam deploy
  --parameter-overrides ChatRateLimitPerDay=200`). If the counter write
  itself errors the request is allowed through (fail open). Rejected
  requests are not audit-logged; they emit a `rate limited:` warn line to
  CloudWatch Logs.

## Notes & cost

- **DynamoDB** is on-demand (pay per request) → effectively $0 for this workload.
  Point-in-time recovery is enabled for safety (a few cents at this size).
- **Lambda** free tier (1M requests/mo) more than covers an internal tool.
- **CloudFront + S3** → pennies at low traffic; CloudFront `PriceClass_100` keeps it cheapest.
- **No RDS, no NAT gateway, no idle servers** — nothing bills while the app is unused.
- The old daily `/api/health` cron (`vercel.json`) is **no longer needed** and can be deleted.

## Rollback

Vercel + Supabase remain fully intact until you delete them in Step 6, so rollback
is just pointing DNS/users back at the Vercel URL. The AWS stack can be torn down
with `sam delete --stack-name smartek21-academy` (empty the S3 bucket first).
