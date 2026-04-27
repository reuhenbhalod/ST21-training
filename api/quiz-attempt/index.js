const { verifyToken, unauthorized, jsonResponse } = require("../_lib/auth");
const { query, sql } = require("../_lib/db");

module.exports = async function (context, req) {
  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    return unauthorized(context, err.message);
  }

  try {
    const { sectionId, score, passed, questions, answers } = req.body || {};

    if (!sectionId || typeof score !== "number" || typeof passed !== "boolean") {
      return jsonResponse(context, 400, { error: "sectionId, score, and passed are required" });
    }

    await query(
      `INSERT INTO quiz_attempts
         (email, section_id, score, passed, questions_json, answers_json)
       VALUES
         (@email, @sectionId, @score, @passed, @questionsJson, @answersJson)`,
      {
        email:         { type: sql.NVarChar(255), value: user.email },
        sectionId:     { type: sql.NVarChar(100), value: sectionId },
        score:         { type: sql.Float,         value: score },
        passed:        { type: sql.Bit,           value: passed ? 1 : 0 },
        questionsJson: { type: sql.NVarChar(sql.MAX), value: JSON.stringify(questions || []) },
        answersJson:   { type: sql.NVarChar(sql.MAX), value: JSON.stringify(answers || {}) },
      }
    );

    return jsonResponse(context, 200, { ok: true });
  } catch (err) {
    context.log.error("quiz-attempt error:", err);
    return jsonResponse(context, 500, { error: "Internal server error" });
  }
};
