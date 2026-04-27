// ==========================================================================
// GET /api/health
// Sanity check. Returns {ok:true, db:true} if the API and database are alive.
// No auth required so we can ping it from anywhere to verify deployment.
// ==========================================================================

import { jsonResponse } from "../_lib/auth.js";
import { query } from "../_lib/db.js";

export default async function (context, req) {
  try {
    await query("SELECT 1 AS ok", {});
    return jsonResponse(context, 200, { ok: true, db: true });
  } catch (err) {
    context.log.error("health check failed:", err);
    return jsonResponse(context, 500, { ok: false, db: false, error: err.message });
  }
}