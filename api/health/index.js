const { jsonResponse } = require("../_lib/auth");
const { query } = require("../_lib/db");

module.exports = async function (context, req) {
  try {
    await query("SELECT 1 AS ok", {});
    return jsonResponse(context, 200, { ok: true, db: true });
  } catch (err) {
    context.log.error("health check failed:", err);
    return jsonResponse(context, 500, { ok: false, db: false, error: err.message });
  }
};
