import { verifyToken } from "./_lib/auth.js";
import { getUser, putUser, updateUser } from "./_lib/db.js";

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
    const isNewSession = !!(req.body && req.body.isNewSession);
    const now = new Date().toISOString();

    const existing = await getUser(user.email);

    if (existing) {
      const updates = { last_seen: now };
      if (isNewSession) updates.total_logins = (existing.total_logins || 0) + 1;
      if (!existing.first_name) updates.first_name = user.firstName;
      if (!existing.last_initial) updates.last_initial = user.lastInitial;

      await updateUser(user.email, updates);

      return res.status(200).json({ ok: true, isAdmin: !!existing.is_admin });
    } else {
      await putUser({
        email: user.email,
        first_name: user.firstName,
        last_initial: user.lastInitial,
        first_seen: now,
        last_seen: now,
        total_logins: 1,
        is_admin: false,
      });

      return res.status(200).json({ ok: true, isAdmin: false });
    }
  } catch (err) {
    console.error("heartbeat error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
