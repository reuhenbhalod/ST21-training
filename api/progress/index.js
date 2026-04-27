// ==========================================================================
// /api/progress
// GET  → returns all progress for the signed-in user as a map
//        { sectionId: { read, best, passed, attemptsCount } }
// POST → upserts one section's progress
//        body: { sectionId, read, bestScore, passed, attemptsCount }
// ==========================================================================

import { verifyToken, unauthorized, jsonResponse } from "../_lib/auth.js";
import { query, sql } from "../_lib/db.js";

export default async function (context, req) {
  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    context.log.warn("Auth failed:", err.message);
    return unauthorized(context, err.message);
  }

  try {
    if (req.method === "GET") {
      return await handleGet(context, user);
    }
    if (req.method === "POST") {
      return await handlePost(context, user, req.body || {});
    }
    return jsonResponse(context, 405, { error: "Method not allowed" });
  } catch (err) {
    context.log.error("Progress handler error:", err);
    return jsonResponse(context, 500, { error: "Internal server error" });
  }
}

async function handleGet(context, user) {
  const result = await query(
    `SELECT section_id, has_read, best_score, passed, attempts_count
     FROM user_progress
     WHERE email = @email`,
    { email: { type: sql.NVarChar(255), value: user.email } }
  );

  // Return as an object keyed by section_id so the frontend can use it directly
  const progress = {};
  for (const row of result.recordset) {
    progress[row.section_id] = {
      read: !!row.has_read,
      best: row.best_score,
      passed: !!row.passed,
      attemptsCount: row.attempts_count,
    };
  }
  return jsonResponse(context, 200, { progress });
}

async function handlePost(context, user, body) {
  const { sectionId, read, bestScore, passed, attemptsCount } = body;

  if (!sectionId || typeof sectionId !== "string") {
    return jsonResponse(context, 400, { error: "sectionId is required" });
  }

  // Upsert: insert or update if the row already exists
  await query(
    `MERGE user_progress AS target
       USING (SELECT @email AS email, @sectionId AS section_id) AS source
       ON target.email = source.email AND target.section_id = source.section_id
     WHEN MATCHED THEN
       UPDATE SET
         has_read       = @read,
         best_score     = CASE WHEN @bestScore > target.best_score THEN @bestScore ELSE target.best_score END,
         passed         = CASE WHEN @passed = 1 OR target.passed = 1 THEN 1 ELSE 0 END,
         attempts_count = @attemptsCount,
         updated_at     = SYSUTCDATETIME()
     WHEN NOT MATCHED THEN
       INSERT (email, section_id, has_read, best_score, passed, attempts_count)
       VALUES (@email, @sectionId, @read, @bestScore, @passed, @attemptsCount);`,
    {
      email:          { type: sql.NVarChar(255), value: user.email },
      sectionId:      { type: sql.NVarChar(100), value: sectionId },
      read:           { type: sql.Bit,           value: read ? 1 : 0 },
      bestScore:      { type: sql.Float,         value: bestScore || 0 },
      passed:         { type: sql.Bit,           value: passed ? 1 : 0 },
      attemptsCount:  { type: sql.Int,           value: attemptsCount || 0 },
    }
  );

  return jsonResponse(context, 200, { ok: true });
}