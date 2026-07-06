// ==========================================================================
// One-time migration: Supabase (Postgres) -> DynamoDB single table.
//
// Reads the three former tables (users, user_progress, quiz_attempts) from
// Supabase and writes them into the DynamoDB table using the same PK/SK schema
// api/_lib/db.js expects. Idempotent: re-running overwrites the same items.
//
// Usage:
//   cd scripts && npm init -y && npm i @supabase/supabase-js @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
//   SUPABASE_URL=... SUPABASE_SERVICE_KEY=... \
//   TABLE_NAME=smartek21-academy AWS_REGION=us-east-1 \
//   node migrate-supabase-to-dynamo.mjs
//
// (Use AWS creds that can write to the table — e.g. `aws sso login` first, or
//  AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars.)
// ==========================================================================

import { createClient } from "@supabase/supabase-js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";

const { SUPABASE_URL, SUPABASE_SERVICE_KEY, TABLE_NAME } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !TABLE_NAME) {
  console.error("Set SUPABASE_URL, SUPABASE_SERVICE_KEY, and TABLE_NAME.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
});

const pk = (email) => `USER#${email}`;

// Pull every row from a table, paging past Supabase's 1000-row default cap.
async function fetchAll(table) {
  const rows = [];
  let from = 0;
  const page = 1000;
  for (;;) {
    const { data, error } = await sb.from(table).select("*").range(from, from + page - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...data);
    if (data.length < page) break;
    from += page;
  }
  return rows;
}

// DynamoDB BatchWrite accepts max 25 items per call.
async function batchWrite(items) {
  for (let i = 0; i < items.length; i += 25) {
    const chunk = items.slice(i, i + 25);
    let req = {
      [TABLE_NAME]: chunk.map((Item) => ({ PutRequest: { Item } })),
    };
    // Retry any UnprocessedItems (throttling) with a tiny backoff.
    for (let attempt = 0; attempt < 5; attempt++) {
      const out = await ddb.send(new BatchWriteCommand({ RequestItems: req }));
      const un = out.UnprocessedItems?.[TABLE_NAME];
      if (!un || un.length === 0) break;
      req = { [TABLE_NAME]: un };
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
}

async function main() {
  const [users, progress, attempts] = await Promise.all([
    fetchAll("users"),
    fetchAll("user_progress"),
    fetchAll("quiz_attempts"),
  ]);
  console.log(
    `Fetched ${users.length} users, ${progress.length} progress rows, ${attempts.length} attempts.`
  );

  const userItems = users.map((u) => ({
    PK: pk(u.email),
    SK: "PROFILE",
    GSI1PK: "USER",
    GSI1SK: u.last_seen,
    email: u.email,
    first_name: u.first_name,
    last_initial: u.last_initial,
    first_seen: u.first_seen,
    last_seen: u.last_seen,
    total_logins: u.total_logins,
    is_admin: !!u.is_admin,
  }));

  const progressItems = progress.map((p) => ({
    PK: pk(p.email),
    SK: `PROG#${p.section_id}`,
    email: p.email,
    section_id: p.section_id,
    has_read: !!p.has_read,
    best_score: p.best_score,
    passed: !!p.passed,
    attempts_count: p.attempts_count,
    updated_at: p.updated_at,
  }));

  const attemptItems = attempts.map((a) => {
    const id = a.id != null ? String(a.id) : randomUUID();
    const submitted_at = a.submitted_at;
    return {
      PK: pk(a.email),
      SK: `ATT#${submitted_at}#${id}`,
      id,
      email: a.email,
      section_id: a.section_id,
      score: a.score,
      passed: !!a.passed,
      questions_json: a.questions_json ?? [],
      answers_json: a.answers_json ?? {},
      submitted_at,
    };
  });

  await batchWrite(userItems);
  console.log(`Wrote ${userItems.length} profiles.`);
  await batchWrite(progressItems);
  console.log(`Wrote ${progressItems.length} progress items.`);
  await batchWrite(attemptItems);
  console.log(`Wrote ${attemptItems.length} attempt items.`);
  console.log("Migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
