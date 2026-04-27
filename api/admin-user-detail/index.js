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
    const adminCheck = await query(
      `SELECT is_admin FROM users WHERE email = @email`,
      { email: { type: sql.NVarChar(255), value: user.email } }
    );
    const isAdmin =
      adminCheck.recordset.length > 0 && !!adminCheck.recordset[0].is_admin;

    if (!isAdmin) {
      return jsonResponse(context, 403, { error: "Admin access required" });
    }

    const targetEmail = ((req.query && req.query.email) || "").toLowerCase();
    if (!targetEmail) {
      return jsonResponse(context, 400, { error: "email query param is required" });
    }

    const userResult = await query(
      `SELECT email, first_name, last_initial, first_seen, last_seen, total_logins, is_admin
       FROM users WHERE email = @email`,
      { email: { type: sql.NVarChar(255), value: targetEmail } }
    );

    if (userResult.recordset.length === 0) {
      return jsonResponse(context, 404, { error: "User not found" });
    }

    const u = userResult.recordset[0];

    const progressResult = await query(
      `SELECT section_id, has_read, best_score, passed, attempts_count, updated_at
       FROM user_progress
       WHERE email = @email
       ORDER BY section_id`,
      { email: { type: sql.NVarChar(255), value: targetEmail } }
    );

    const attemptsResult = await query(
      `SELECT TOP 50 id, section_id, score, passed, submitted_at
       FROM quiz_attempts
       WHERE email = @email
       ORDER BY submitted_at DESC`,
      { email: { type: sql.NVarChar(255), value: targetEmail } }
    );

    return jsonResponse(context, 200, {
      user: {
        email: u.email,
        firstName: u.first_name,
        lastInitial: u.last_initial,
        firstSeen: u.first_seen,
        lastSeen: u.last_seen,
        totalLogins: u.total_logins,
        isAdmin: !!u.is_admin,
      },
      progress: progressResult.recordset.map((r) => ({
        sectionId: r.section_id,
        read: !!r.has_read,
        bestScore: r.best_score,
        passed: !!r.passed,
        attemptsCount: r.attempts_count,
        updatedAt: r.updated_at,
      })),
      attempts: attemptsResult.recordset.map((r) => ({
        id: r.id,
        sectionId: r.section_id,
        score: r.score,
        passed: !!r.passed,
        submittedAt: r.submitted_at,
      })),
    });
  } catch (err) {
    context.log.error("admin-user-detail error:", err);
    return jsonResponse(context, 500, { error: "Internal server error" });
  }
};
