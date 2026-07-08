# Admin-only AWS Cost Dashboard — Implementation Plan

## Approach

Add a read-only "Costs" view to the existing admin area that shows the AWS
hosting cost for the `smartek21-academy` project: a total, a per-service
breakdown, and a daily trend. The data comes from AWS Cost Explorer (CE).

This is a strict **Backend-for-Frontend**. The browser never touches CE. A new
authenticated, admin-gated Lambda route `/api/admin-costs` is the only thing
that can call CE, and it returns a narrow, pre-shaped JSON contract. CE is
metered ($0.01/GetCostAndUsage call) and slow (~1–2s), and its data only
refreshes a few times a day, so the route is fronted by a **read-through cache
in the existing DynamoDB table** (a shaped JSON blob under a `COST#<range>` key
with a ~6h `expires_at` TTL). Cache reuses the exact TTL mechanism already used
by the chat rate limiter.

The route follows the existing endpoint shape exactly: `verifyToken(req)` for
auth (fail closed → 401), then `getUser(email)` + `if (!me?.is_admin)` for the
admin gate (fail closed → 403). Unlike the rate limiter (which fails *open*),
the CE call fails **soft**: any CE/SDK error is caught and returned as a clear
"temporarily unavailable" signal (HTTP 503 + `error` field) so the admin UI
degrades gracefully instead of crashing. An empty/$0 response from CE (tags not
yet populated) is a valid success, not an error.

Frontend: `AdminView` gains a "Users | Costs" sub-tab (preferred over a new
top-nav button, so the learner/admin toggle stays as-is). A new `AdminCosts`
component fetches `/api/admin-costs?range=…` via the existing `apiCall` helper
and renders a total card, per-service table, daily trend, and the untagged line,
with loading/error states, reusing the existing `Th`/`Td`/`Stat` helpers and the
established inline-style + Tailwind look.

Build order is backend-first (SDK dep → db cache helpers → CE module → route →
IAM), then frontend, then verification.

## Architecture decisions

- **New `/api/admin-costs` route, mirroring `admin-users.js`** rather than
  extending an existing endpoint. Reason: same auth+admin gate, but a distinct
  concern (billing) with its own caching and failure policy. Keeps each handler
  single-purpose, matching the current one-file-per-route convention registered
  in `lambda.js` `ROUTES`.
- **DynamoDB read-through cache under a fixed system partition**
  (`PK="SYSTEM#costs"`, `SK="COST#<range>"`) instead of a per-user key or a new
  table. Reason: reuses the single-table design and the already-enabled
  `expires_at` TTL. Cost data is global (not per-user), so one cached blob per
  range serves all admins. Rejected: a separate cache table (over-engineered,
  new resource) and in-memory Lambda caching (doesn't survive cold starts / new
  containers, so CE would still be hit often).
- **CE fetch logic in a new `api/_lib/cost.js` module** exporting `fetchCosts`,
  rather than inline in the handler. Reason: keeps the handler thin (auth,
  cache, shape) and matches the `_lib/` layering (`auth.js`, `db.js`). The CE
  client is lazy-initialized exactly like `bedrock()` in `chat.js` and `doc()`
  in `db.js`.
- **CE client pinned to `region: "us-east-1"`.** Reason: the CE API only exists
  in `us-east-1`; the Lambda may run elsewhere. This is a hard requirement, not
  a preference.
- **Fail SOFT on CE errors (503 + error field), fail CLOSED on auth/admin
  (401/403).** Reason: an admin who can't see costs should get a graceful
  "unavailable" state; an unauthenticated/non-admin caller must get nothing.
  Explicitly *not* copying the rate limiter's fail-open behavior.
- **Whitelisted ranges (`mtd`, `last30d`) validated server-side.** Reason: keeps
  the surface small and enumerable, and prevents arbitrary CE date ranges (cost
  + abuse control). Unknown range → 400.
- **Only explicitly-tagged spend is shown (no untagged/shared line).** Reason:
  this is a SHARED AWS account where the `Project` tag is used by other projects,
  so an account-wide "untagged" figure would sweep in other projects' spend and
  mislead. The dashboard reports only costs tagged `Project=smartek21-academy`.

## Data and interfaces

### Response contract (the seam — exact shape)

```json
{
  "range": "mtd",
  "currency": "USD",
  "total": 12.34,
  "byService": [
    { "service": "Amazon DynamoDB", "amount": 4.10 },
    { "service": "AWS Lambda", "amount": 3.02 }
  ],
  "trend": [
    { "date": "2026-07-01", "amount": 0.41 },
    { "date": "2026-07-02", "amount": 0.55 }
  ],
  "asOf": "2026-07-07T14:03:00.000Z",
  "cached": true
}
```

- All amounts are **numbers** (USD), rounded to cents.
- `byService` sorted descending by `amount`; zero-amount services dropped.
- `trend` ascending by `date` (YYYY-MM-DD).
- `asOf` = when the underlying CE fetch ran (cache write time).
- `cached` = true when served from the DynamoDB cache, false on a fresh CE fetch.

Error response (CE unavailable): HTTP **503**, body
`{ "error": "cost_data_unavailable" }`.
Bad range: HTTP **400**, body `{ "error": "invalid range" }`.
Auth/admin: **401** `{ error: <message> }` / **403** `{ error: "Admin access required" }`.

### Ranges (server-side, in `api/_lib/costable.js` or inline in `costs.js`)

```js
const RANGES = { mtd: "mtd", last30d: "last30d" };
// resolveRange(range, now) -> { start, end, granularity }
//   dates are YYYY-MM-DD (UTC); `end` is EXCLUSIVE per CE semantics.
//   mtd:     start = first day of current month, end = tomorrow
//   last30d: start = today - 29 days,            end = tomorrow
// granularity is DAILY for the trend call; the breakdown call uses MONTHLY.
```

### New `api/_lib/costs.js`

```js
import { CostExplorerClient, GetCostAndUsageCommand /*, GetCostForecastCommand*/ }
  from "@aws-sdk/client-cost-explorer";

let _ce = null;
function ce() {                       // lazy init, mirrors bedrock()/doc()
  if (!_ce) _ce = new CostExplorerClient({ region: "us-east-1" }); // CE is us-east-1 only
  return _ce;
}

const PROJECT_TAG = { Key: "Project", Values: ["smartek21-academy"] };

// Returns the shaped payload WITHOUT the `cached` flag (handler adds it).
// Throws on any CE/SDK error (handler catches -> 503). Empty CE result is a
// valid $0 payload, NOT an error.
export async function fetchCosts(range, now = new Date()) { /* ... */ }
```

`fetchCosts` makes (at minimum) two `GetCostAndUsageCommand` calls with
`Metrics: ["UnblendedCost"]` and `Filter: { Tags: PROJECT_TAG }`:

1. **Breakdown** — `Granularity: "MONTHLY"` (or a single period spanning the
   range), `GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }]`. Sum per service
   → `byService`; sum of all → `total`.
2. **Trend** — `Granularity: "DAILY"`, no GroupBy → `trend[{date, amount}]`.
(No untagged/shared query and no forecast in v1 — see Decisions below. Both were
considered and deferred: an untagged figure is account-wide and misleading on
this shared account; forecast needs more tagged history than exists yet.)

Amount parsing: `Number(group.Metrics.UnblendedCost.Amount)`, currency from
`.Unit` (default `"USD"`); round to cents with `Math.round(x*100)/100`.

### New `api/_lib/db.js` helpers

```js
const COST_CACHE_PK = "SYSTEM#costs";
const COST_PREFIX = "COST#";

export async function getCachedCosts(range) {
  const { Item } = await doc().send(new GetCommand({
    TableName: TABLE, Key: { PK: COST_CACHE_PK, SK: `${COST_PREFIX}${range}` },
  }));
  if (!Item) return null;
  // TTL deletion is lazy; guard against reading a logically-expired blob.
  if (Item.expires_at && Item.expires_at < Math.floor(Date.now() / 1000)) return null;
  return Item.payload || null;   // the shaped contract (minus `cached`)
}

export async function putCachedCosts(range, payload, ttlSeconds = 6 * 3600) {
  await doc().send(new PutCommand({
    TableName: TABLE,
    Item: {
      PK: COST_CACHE_PK,
      SK: `${COST_PREFIX}${range}`,
      payload,
      expires_at: Math.floor(Date.now() / 1000) + ttlSeconds, // numeric epoch secs, matches TTL attr
    },
  }));
}
```

### New `api/admin-costs.js` (handler flow)

```
verifyToken(req)              -> catch -> 401
getUser(email); !is_admin    -> 403
range = req.query.range || "mtd"; if (!RANGES[range]) -> 400
cached = await getCachedCosts(range)
if (cached) return 200 { ...cached, cached: true }
try {
  payload = await fetchCosts(range)          // { range, currency, total, byService, trend, untagged, asOf }
  await putCachedCosts(range, payload)       // best-effort; log-and-continue on write failure
  return 200 { ...payload, cached: false }
} catch (err) {
  console.error("admin-costs CE fetch failed:", err)
  return 503 { error: "cost_data_unavailable" }
}
```

### `api/lambda.js` ROUTES addition

```js
import adminCosts from "./admin-costs.js";
// ...
"/api/admin-costs": adminCosts,
```

### `template.yaml` IAM statement (append to `ApiFunction` `Policies`, mirroring the Bedrock statement ~lines 111–116)

```yaml
        - Statement:
            - Effect: Allow
              Action:
                - ce:GetCostAndUsage
                - ce:GetCostForecast
                - ce:GetDimensionValues
              Resource: "*"   # CE has no resource-level scoping
```

### Frontend contract (in `src/App.jsx`)

- `AdminView` gains sub-tab state and renders `<AdminCosts apiCall={apiCall} />`
  when the Costs tab is active.
- `AdminCosts` calls `apiCall(\`/api/admin-costs?range=${range}\`)`; on a 503 the
  thrown error carries `err.status === 503` / `err.body.error` (the `apiCall`
  helper already attaches `.status` and parsed `.body`).

## Files affected

- `api/package.json` — add `@aws-sdk/client-cost-explorer` dependency.
- `api/_lib/db.js` — add `getCachedCosts` / `putCachedCosts` + cache-key consts.
- `api/_lib/costs.js` — **new**: lazy CE client, `resolveRange`, `fetchCosts`.
- `api/admin-costs.js` — **new**: auth + admin gate + cache + CE + shaping.
- `api/lambda.js` — import and register `/api/admin-costs` in `ROUTES`.
- `template.yaml` — add CE IAM statement to `ApiFunction.Policies`.
- `src/App.jsx` — sub-tab in `AdminView`; new `AdminCosts` component (reusing
  `Th`/`Td`/`Stat`).

## Task list

- [ ] **1. Add the CE SDK dependency.** File: `api/package.json`. Add
  `"@aws-sdk/client-cost-explorer": "^3.699.0"` to `dependencies`, matching the
  version style of the existing `@aws-sdk/*` entries. **Acceptance:** dep listed
  at the pinned `^3.699.0`. **Test:** `cd api && npm install` resolves cleanly;
  `node -e "import('@aws-sdk/client-cost-explorer').then(m=>console.log(!!m.CostExplorerClient))"`
  prints `true`. (Required so `sam build` bundles it.)

- [ ] **2. Add DynamoDB cache helpers.** File: `api/_lib/db.js`. Add
  `COST_CACHE_PK`/`COST_PREFIX` consts and `getCachedCosts(range)` /
  `putCachedCosts(range, payload, ttlSeconds=21600)` per the signatures above,
  reusing `doc()`, `GetCommand`, `PutCommand`, and the numeric `expires_at` TTL
  convention already used by `consumeRateLimit`. **Acceptance:** both exported;
  `getCachedCosts` returns `null` for missing or logically-expired items and the
  stored `payload` otherwise. **Test:** local script (or a temporary unit) that
  `putCachedCosts("mtd", {total:1})` then `getCachedCosts("mtd")` round-trips the
  blob; a put with `ttlSeconds: -1` then get returns `null`.

- [ ] **3. Build the CE fetch module.** File: `api/_lib/costs.js` (new). Add the
  lazy `ce()` client pinned to `us-east-1`, the `RANGES` whitelist,
  `resolveRange(range, now)`, and `fetchCosts(range, now)` returning the shaped
  payload (`range, currency, total, byService, trend, untagged, asOf`) from the
  breakdown + trend (+ untagged) CE calls. Round amounts to cents; sort
  `byService` desc and drop zeros; sort `trend` asc. Treat an empty CE result as
  a valid all-zero payload. **Acceptance:** `fetchCosts("mtd")` returns a
  contract-shaped object; an unknown range throws before any CE call; a mocked
  empty CE response yields `total:0, byService:[], trend:[…]`.
  **Test:** unit-mock `CostExplorerClient.send` to assert the SERVICE GroupBy,
  DAILY granularity, `Filter.Tags = {Key:"Project",Values:["smartek21-academy"]}`,
  and correct Start/End for both `mtd` and `last30d`.

- [ ] **4. Create the route handler.** File: `api/admin-costs.js` (new).
  Implement the flow above: `verifyToken` (401), `getUser`+`!me?.is_admin`
  (403), range validation (400), cache read (return with `cached:true`), CE
  fetch → cache write → return `cached:false`, and a `try/catch` around the CE
  fetch that returns **503** `{ error: "cost_data_unavailable" }`. Cache-write
  failures are logged and do not fail the request. **Acceptance:** handler
  matches the auth/admin pattern of `admin-users.js` exactly; success returns the
  contract; CE error returns 503, not 500. **Test:** unit-invoke with a mocked
  admin `getUser` + mocked `fetchCosts` (success) → 200 with `cached:false`;
  second call (cache warm) → 200 `cached:true` with no CE call; mocked
  `fetchCosts` throw → 503; non-admin `getUser` → 403; missing token → 401;
  `range=bogus` → 400.

- [ ] **5. Register the route.** File: `api/lambda.js`. Import
  `adminCosts from "./admin-costs.js"` and add `"/api/admin-costs": adminCosts`
  to `ROUTES`. **Acceptance:** the path dispatches to the handler; unknown paths
  still 404. **Test:** synthesize a Function-URL event with
  `rawPath:"/api/admin-costs"` and an admin Bearer token; router returns the
  handler's response, not 404.

- [ ] **6. Add the CE IAM statement.** File: `template.yaml`. Append the
  `ce:GetCostAndUsage` / `ce:GetCostForecast` / `ce:GetDimensionValues`
  statement (`Resource: "*"`) to `ApiFunction.Policies`, mirroring the Bedrock
  statement. **Acceptance:** `sam validate` passes; the statement is present.
  **Test:** `sam validate --lint`; confirm the rendered policy includes the three
  CE actions. (Deploys automatically on merge to `main` via the existing
  GitHub Actions `sam deploy` — no manual deploy step.)

- [ ] **7. Add the Costs sub-tab to AdminView.** File: `src/App.jsx`
  (`AdminView`, ~line 1532). Add `tab` state (`"users" | "costs"`, default
  `"users"`), render a small "Users | Costs" segmented control styled like the
  existing admin toggle (orange `#E66433` / `#FDF1EC` active, `#E5E5E5`
  borders), and render `AdminUserList`/`AdminUserDetail` for `users` and
  `<AdminCosts apiCall={apiCall} />` for `costs`. Keep the existing `onBack`
  ("Back to learner view") intact. **Acceptance:** switching tabs swaps content
  without leaving the admin view; the learner/admin top-nav toggle is unchanged.
  **Test:** as admin, open admin view, click Costs then Users; content swaps and
  the back-to-learner toggle still works.

- [ ] **8. Build the AdminCosts component.** File: `src/App.jsx` (new component
  near `AdminView`). Fetch `/api/admin-costs?range=${range}` with `apiCall`,
  `range` state defaulting to `mtd` with a `mtd | last30d` switcher. Render:
  a total card (+ optional forecast), a per-service table (reuse `Th`/`Td`), a
  daily-trend visualization (simple CSS bars or a small table). Include loading
  and error states; on a 503
  (`err.status === 503` or `err.body?.error === "cost_data_unavailable"`) show a
  clear "Cost data temporarily unavailable" message rather than a raw error. An
  all-zero payload renders as `$0.00` with a hint that tag data may not be
  populated yet (not an error). Match existing inline-style/Tailwind tokens.
  **Acceptance:** loading, success, empty ($0), and 503 states all render
  sensibly; changing range refetches. **Test:** load as admin against the
  deployed endpoint; verify total/services/trend; toggle ranges;
  simulate 503 (temporarily point at a failing state) to confirm the graceful
  message.

- [ ] **9. End-to-end verification.** No file change. Deploy via merge to `main`.
  **Acceptance/Test:**
  - `curl -H "Authorization: Bearer <ADMIN>" https://<site>/api/admin-costs?range=mtd`
    → 200 contract, `cached:false`; immediately re-run → `cached:true` (cache hit,
    no CE latency).
  - Same with a **non-admin** token → 403; with **no** token → 401.
  - `?range=bogus` → 400.
  - Confirm CloudWatch shows a single CE fetch per range within the 6h TTL
    window (subsequent calls served from cache).
  - Confirm an account with no populated tag data returns `total:0` /
    `byService:[]` as a 200 (not a 503).

## Risks

- **~~`untagged` semantics~~ (RESOLVED — dropped).** Decision: do NOT show an
  untagged/shared line. This is a shared account where `Project` is used by other
  projects, so an account-wide untagged figure would over-count. The dashboard
  reports only `Project=smartek21-academy`-tagged spend.
- **CE data freshness / lag.** CE can lag several hours and restate recent days;
  the 6h cache plus "as of `asOf`" label sets expectations. Not a correctness bug.
- **Empty vs. error ambiguity.** Newly-activated cost-allocation tags mean CE may
  legitimately return $0/empty for a while. The handler must treat empty as
  success (200), only SDK/permission failures as 503 — call this out in review of
  task 3/4.
- **SDK version alignment.** `@aws-sdk/client-cost-explorer` must be pinned to the
  same `^3.699.0` line as the other AWS SDK deps to avoid a mixed-version bundle;
  verify `npm install` doesn't hoist a divergent core version.
- **Route-map / build coupling.** The IAM change (task 6) and the SDK dep (task 1)
  must both be on `main` before the endpoint works in production; since CI runs
  `sam build` + `sam deploy` on merge, land them together (or dep first) so a
  deploy never ships a handler whose dependency or permission is missing.

## Decisions (resolved 2026-07-07)

- **Untagged/shared line: DROPPED.** Shared account → an account-wide untagged
  figure is misleading. Show only `Project=smartek21-academy`-tagged spend.
- **Forecast: DEFERRED past v1.** Tag data is brand new; revisit once there's
  enough tagged history. IAM keeps `ce:GetCostForecast` so adding it later is
  code-only.
- **Cache TTL: 6h** (default `ttlSeconds` in `putCachedCosts`). May become a
  template parameter later; fine as a constant for v1.
