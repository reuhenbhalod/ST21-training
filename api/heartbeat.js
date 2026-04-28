import { verifyToken } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  try {
    const db = getDb();
    const isNewSession = !!(req.body && req.body.isNewSession);
    const now = new Date().toISOString();

    const { data: existing } = await db
      .from("users")
      .select("email, total_logins, is_admin, first_name, last_initial")
      .eq("email", user.email)
      .maybeSingle();

    if (existing) {
      const updates = { last_seen: now };
      if (isNewSession) updates.total_logins = (existing.total_logins || 0) + 1;
      if (!existing.first_name) updates.first_name = user.firstName;
      if (!existing.last_initial) updates.last_initial = user.lastInitial;

      const { error } = await db.from("users").update(updates).eq("email", user.email);
      if (error) throw error;

      return res.status(200).json({ ok: true, isAdmin: !!existing.is_admin });
    } else {
      const { error } = await db.from("users").insert({
        email: user.email,
        first_name: user.firstName,
        last_initial: user.lastInitial,
        first_seen: now,
        last_seen: now,
        total_logins: 1,
        is_admin: false,
      });
      if (error) throw error;

      return res.status(200).json({ ok: true, isAdmin: false });
    }
  } catch (err) {
    console.error("heartbeat error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
