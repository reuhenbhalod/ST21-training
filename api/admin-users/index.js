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

    const result = await query(
      `SELECT
         u.email,
         u.first_name,
         u.last_initial,
         u.first_seen,
         u.last_seen,
         u.total_logins,
         u.is_admin,
         COALESCE(p.modules_passed, 0)    AS modules_passed,
         COALESCE(p.modules_started, 0)   AS modules_started,
         COALESCE(p.avg_best_score, 0)    AS avg_best_score
       FROM users u
       LEFT JOIN (
         SELECT
           email,
           SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) AS modules_passed,
           COUNT(*)                                    AS modules_started,
           AVG(best_score)                             AS avg_best_score
         FROM user_progress
         GROUP BY email
       ) p ON u.email = p.email
       ORDER BY u.last_seen DESC`,
      {}
    );

    const users = result.recordset.map((r) => ({
      email: r.email,
      firstName: r.first_name,
      lastInitial: r.last_initial,
      firstSeen: r.first_seen,
      lastSeen: r.last_seen,
      totalLogins: r.total_logins,
      isAdmin: !!r.is_admin,
      modulesPassed: r.modules_passed,
      modulesStarted: r.modules_started,
      avgBestScore: r.avg_best_score,
    }));

    return jsonResponse(context, 200, { users });
  } catch (err) {
    context.log.error("admin-users error:", err);
    return jsonResponse(context, 500, { error: "Internal server error" });
  }
};
