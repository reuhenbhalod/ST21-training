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
