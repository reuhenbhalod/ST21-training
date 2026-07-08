// ==========================================================================
// db.js — DynamoDB data layer (single-table design)
//
// Replaces the old Supabase/Postgres client. One on-demand table holds all
// three former Postgres tables, keyed by PK/SK:
//
//   profile   PK=USER#<email>  SK=PROFILE            (+ GSI1PK=USER, GSI1SK=<last_seen>)
//   progress  PK=USER#<email>  SK=PROG#<section_id>
//   attempt   PK=USER#<email>  SK=ATT#<submitted_at>#<id>
//
// Table name comes from the TABLE_NAME env var (set by the SAM template).
// Region is provided automatically by the Lambda runtime.
// ==========================================================================

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE = process.env.TABLE_NAME;

let _doc = null;
function doc() {
  if (!_doc) {
    _doc = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return _doc;
}

const pk = (email) => `USER#${email}`;
const PROFILE_SK = "PROFILE";
const progSk = (sectionId) => `PROG#${sectionId}`;
const PROG_PREFIX = "PROG#";
const ATT_PREFIX = "ATT#";
const CHAT_PREFIX = "CHAT#";
const RL_PREFIX = "RL#";

// --------------------------------------------------------------------------
// Users (profiles)
// --------------------------------------------------------------------------

export async function getUser(email) {
  const { Item } = await doc().send(
    new GetCommand({ TableName: TABLE, Key: { PK: pk(email), SK: PROFILE_SK } })
  );
  return Item || null;
}

// Insert a brand-new profile.
export async function putUser(user) {
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        PK: pk(user.email),
        SK: PROFILE_SK,
        GSI1PK: "USER",
        GSI1SK: user.last_seen,
        ...user,
      },
    })
  );
}

// Patch an existing profile. `updates` is a flat object of column->value.
// Always keeps GSI1SK in sync with last_seen so the admin list stays ordered.
export async function updateUser(email, updates) {
  const names = {};
  const values = {};
  const sets = [];
  for (const [k, v] of Object.entries(updates)) {
    names[`#${k}`] = k;
    values[`:${k}`] = v;
    sets.push(`#${k} = :${k}`);
  }
  if (updates.last_seen !== undefined) {
    names["#gsi1sk"] = "GSI1SK";
    values[":gsi1sk"] = updates.last_seen;
    sets.push("#gsi1sk = :gsi1sk");
  }
  await doc().send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { PK: pk(email), SK: PROFILE_SK },
      UpdateExpression: `SET ${sets.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );
}

// All profiles, newest last_seen first (admin dashboard).
export async function listAllUsers() {
  const items = [];
  let ExclusiveStartKey;
  do {
    const out = await doc().send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :u",
        ExpressionAttributeValues: { ":u": "USER" },
        ScanIndexForward: false, // newest last_seen first
        ExclusiveStartKey,
      })
    );
    items.push(...(out.Items || []));
    ExclusiveStartKey = out.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

// --------------------------------------------------------------------------
// Progress
// --------------------------------------------------------------------------

export async function getProgressItem(email, sectionId) {
  const { Item } = await doc().send(
    new GetCommand({
      TableName: TABLE,
      Key: { PK: pk(email), SK: progSk(sectionId) },
    })
  );
  return Item || null;
}

export async function queryProgress(email) {
  const out = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: { ":pk": pk(email), ":sk": PROG_PREFIX },
    })
  );
  return out.Items || [];
}

// Upsert a single progress row.
export async function putProgress(row) {
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        PK: pk(row.email),
        SK: progSk(row.section_id),
        ...row,
      },
    })
  );
}

// Every progress row across all users (admin aggregate stats). Scan is fine at
// this scale — the table only holds a handful of rows per employee.
export async function scanAllProgress() {
  const items = [];
  let ExclusiveStartKey;
  do {
    const out = await doc().send(
      new ScanCommand({
        TableName: TABLE,
        FilterExpression: "begins_with(SK, :sk)",
        ExpressionAttributeValues: { ":sk": PROG_PREFIX },
        ProjectionExpression: "email, passed, best_score",
        ExclusiveStartKey,
      })
    );
    items.push(...(out.Items || []));
    ExclusiveStartKey = out.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

// --------------------------------------------------------------------------
// Quiz attempts (append-only)
// --------------------------------------------------------------------------

export async function putAttempt(attempt) {
  // submitted_at leads the SK so a reverse Query returns newest-first for free.
  const sk = `${ATT_PREFIX}${attempt.submitted_at}#${attempt.id}`;
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: { PK: pk(attempt.email), SK: sk, ...attempt },
    })
  );
}

export async function queryAttempts(email, limit = 50) {
  const out = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: { ":pk": pk(email), ":sk": ATT_PREFIX },
      ScanIndexForward: false, // newest submitted_at first
      Limit: limit,
    })
  );
  return out.Items || [];
}

// --------------------------------------------------------------------------
// Chat logs (append-only) — audit trail of AI assistant conversations.
// --------------------------------------------------------------------------

export async function putChatLog(entry) {
  // submitted_at leads the SK so a reverse Query returns newest-first for free.
  const sk = `${CHAT_PREFIX}${entry.submitted_at}#${entry.id}`;
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: { PK: pk(entry.email), SK: sk, ...entry },
    })
  );
}

export async function queryChatLogs(email, limit = 50) {
  const out = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: { ":pk": pk(email), ":sk": CHAT_PREFIX },
      ScanIndexForward: false, // newest submitted_at first
      Limit: limit,
    })
  );
  return out.Items || [];
}

// --------------------------------------------------------------------------
// Rate limiting — per-user fixed-window counters (PK=USER#<email>,
// SK=RL#<bucket>#<windowId>). The window id is derived from the request
// timestamp by the caller, so counters "reset" by simply landing on a new
// key; expired ones are garbage-collected by the table's TTL on expires_at.
// --------------------------------------------------------------------------

// Atomically consume one request from a window. Creates the counter at 1 on
// first use, increments while under `limit`. The increment and the limit
// check are a single conditional write, so concurrent Lambda containers
// cannot race past the limit. Returns true if allowed, false if the limit is
// hit. Any other DynamoDB failure propagates — the caller owns fail-open.
export async function consumeRateLimit(email, bucket, windowId, limit, expiresAtEpochSec) {
  try {
    await doc().send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { PK: pk(email), SK: `${RL_PREFIX}${bucket}#${windowId}` },
        // "count" is a DynamoDB reserved word, hence the #c alias.
        UpdateExpression: "ADD #c :one SET expires_at = if_not_exists(expires_at, :exp)",
        ConditionExpression: "attribute_not_exists(#c) OR #c < :limit",
        ExpressionAttributeNames: { "#c": "count" },
        ExpressionAttributeValues: { ":one": 1, ":limit": limit, ":exp": expiresAtEpochSec },
      })
    );
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") return false;
    throw err;
  }
}

// --------------------------------------------------------------------------
// Cost dashboard cache — one shaped Cost Explorer payload per range, stored
// under a fixed system partition (PK=SYSTEM#costs, SK=COST#<range>). Cost data
// is global (not per-user), so a single blob per range serves every admin. A
// numeric expires_at gives it a short TTL (default 6h) so repeated dashboard
// views are served from DynamoDB instead of re-hitting the metered, slow Cost
// Explorer API. Expired blobs are GC'd lazily by the table's TTL; we also guard
// against reading a logically-expired one below.
// --------------------------------------------------------------------------

const COST_CACHE_PK = "SYSTEM#costs";
const COST_PREFIX = "COST#";

// Read the cached payload for a range, or null on a miss (absent or expired).
export async function getCachedCosts(range) {
  const { Item } = await doc().send(
    new GetCommand({
      TableName: TABLE,
      Key: { PK: COST_CACHE_PK, SK: `${COST_PREFIX}${range}` },
    })
  );
  if (!Item) return null;
  // TTL deletion is lazy, so a logically-expired blob may still be present.
  if (Item.expires_at && Item.expires_at < Math.floor(Date.now() / 1000)) return null;
  return Item.payload || null;
}

// Cache a shaped payload for a range with a TTL (default 6h). expires_at is a
// numeric epoch-seconds value, matching the table's TTL attribute convention.
export async function putCachedCosts(range, payload, ttlSeconds = 6 * 3600) {
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        PK: COST_CACHE_PK,
        SK: `${COST_PREFIX}${range}`,
        payload,
        expires_at: Math.floor(Date.now() / 1000) + ttlSeconds,
      },
    })
  );
}

// --------------------------------------------------------------------------
// Health — a cheap round-trip that proves IAM + connectivity to the table.
// --------------------------------------------------------------------------

export async function ping() {
  await doc().send(
    new GetCommand({
      TableName: TABLE,
      Key: { PK: "HEALTH#ping", SK: "PROFILE" },
    })
  );
  return true;
}
