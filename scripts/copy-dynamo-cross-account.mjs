// One-time cross-account copy of the smartek21-academy DynamoDB table.
//   SOURCE: old account, default credentials (env/default profile)
//   TARGET: new account, `st21-migration` profile
// Copies ALL items verbatim (progress, attempts, chat audit logs, RL counters).
// Idempotent: BatchWrite Put overwrites by key, so re-running re-syncs.
//
//   node copy-dynamo-cross-account.mjs
//
// Env overrides: SRC_PROFILE, TGT_PROFILE, TABLE, REGION.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

const REGION = process.env.REGION || "us-east-1";
const TABLE = process.env.TABLE || "smartek21-academy";
const SRC_PROFILE = process.env.SRC_PROFILE || "default";
const TGT_PROFILE = process.env.TGT_PROFILE || "st21-migration";

const src = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION, credentials: fromIni({ profile: SRC_PROFILE }) })
);
const tgt = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION, credentials: fromIni({ profile: TGT_PROFILE }) })
);

const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function scanAll() {
  const items = [];
  let ExclusiveStartKey;
  do {
    const out = await src.send(
      new ScanCommand({ TableName: TABLE, ExclusiveStartKey })
    );
    items.push(...(out.Items || []));
    ExclusiveStartKey = out.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

async function writeAll(items) {
  let written = 0;
  for (const batch of chunk(items, 25)) {
    let req = { [TABLE]: batch.map((Item) => ({ PutRequest: { Item } })) };
    // handle UnprocessedItems with simple retry
    for (let attempt = 0; attempt < 5 && req[TABLE]?.length; attempt++) {
      const out = await tgt.send(new BatchWriteCommand({ RequestItems: req }));
      const unprocessed = out.UnprocessedItems?.[TABLE] || [];
      written += req[TABLE].length - unprocessed.length;
      req = unprocessed.length ? { [TABLE]: unprocessed } : {};
      if (unprocessed.length) await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  return written;
}

console.log(`Scanning ${TABLE} in ${SRC_PROFILE}...`);
const items = await scanAll();
console.log(`Read ${items.length} items. Writing to ${TGT_PROFILE}...`);
const written = await writeAll(items);
console.log(`Done. Wrote ${written}/${items.length} items to ${TABLE} in ${TGT_PROFILE}.`);
if (written !== items.length) {
  console.error("WARNING: written count != read count — investigate before cutover.");
  process.exit(1);
}
