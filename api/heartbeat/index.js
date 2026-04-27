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
    const isNewSession = !!(req.body && req.body.isNewSession);

    await query(
      `MERGE users AS target
         USING (SELECT @email AS email) AS source
         ON target.email = source.email
       WHEN MATCHED THEN
         UPDATE SET
           last_seen    = SYSUTCDATETIME(),
           total_logins = CASE WHEN @isNewSession = 1
                                THEN target.total_logins + 1
                                ELSE target.total_logins END,
           first_name   = COALESCE(target.first_name, @firstName),
           last_initial = COALESCE(target.last_initial, @lastInitial)
       WHEN NOT MATCHED THEN
         INSERT (email, first_name, last_initial, first_seen, last_seen, total_logins, is_admin)
         VALUES (@email, @firstName, @lastInitial, SYSUTCDATETIME(), SYSUTCDATETIME(), 1, 0);`,
      {
        email:        { type: sql.NVarChar(255), value: user.email },
        firstName:    { type: sql.NVarChar(100), value: user.firstName },
        lastInitial:  { type: sql.NVarChar(10),  value: user.lastInitial },
        isNewSession: { type: sql.Bit,           value: isNewSession ? 1 : 0 },
      }
    );

    const result = await query(
      `SELECT is_admin FROM users WHERE email = @email`,
      { email: { type: sql.NVarChar(255), value: user.email } }
    );
    const isAdmin = result.recordset.length > 0 && !!result.recordset[0].is_admin;

    return jsonResponse(context, 200, { ok: true, isAdmin });
  } catch (err) {
    context.log.error("heartbeat error:", err);
    return jsonResponse(context, 500, { error: "Internal server error" });
  }
};
