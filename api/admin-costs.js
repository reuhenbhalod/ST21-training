// ==========================================================================
// admin-costs.js — admin-only AWS cost dashboard endpoint.
//
// Backend-for-Frontend over AWS Cost Explorer: the browser never touches CE
// (which can see the whole company's billing and is metered). This route
// authenticates, gates on is_admin, and returns a narrow, pre-shaped payload
// for the ST21 project only (isolated by the Project=smartek21-academy tag in
// costs.js).
//
// Failure policy (deliberately mixed):
//   - auth / admin gate  -> fail CLOSED (401 / 403), never leak.
//   - Cost Explorer error -> fail SOFT (503) so the admin UI degrades
//     gracefully. (NOT fail-open like the chat rate limiter.)
//   - empty / $0 CE result -> valid success (200), not an error.
//
// A read-through DynamoDB cache (getCachedCosts/putCachedCosts, ~6h TTL) keeps
// repeated dashboard views off the metered, slow CE API.
// ==========================================================================

import { verifyToken } from "./_lib/auth.js";
import { getUser, getCachedCosts, putCachedCosts } from "./_lib/db.js";
import { fetchCosts, RANGES } from "./_lib/costs.js";

export default async function handler(req, res) {
  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  try {
    const me = await getUser(user.email);
    if (!me?.is_admin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    const range = req.query?.range || "mtd";
    if (!RANGES[range]) {
      return res.status(400).json({ error: "invalid range" });
    }

    // Read-through cache: a hit avoids the metered, slow CE call entirely. A
    // cache read failure is non-fatal — fall through and fetch fresh.
    let cached = null;
    try {
      cached = await getCachedCosts(range);
    } catch (err) {
      console.error("admin-costs cache read failed:", err);
    }
    if (cached) {
      return res.status(200).json({ ...cached, cached: true });
    }

    // Cache miss: fetch from Cost Explorer. Fail SOFT on any CE/SDK error.
    let payload;
    try {
      payload = await fetchCosts(range);
    } catch (err) {
      console.error("admin-costs CE fetch failed:", err);
      return res.status(503).json({ error: "cost_data_unavailable" });
    }

    // Best-effort cache write — a failure here must not fail the request.
    try {
      await putCachedCosts(range, payload);
    } catch (err) {
      console.error("admin-costs cache write failed:", err);
    }

    return res.status(200).json({ ...payload, cached: false });
  } catch (err) {
    console.error("admin-costs error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
