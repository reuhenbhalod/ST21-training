import { verifyToken } from "./_lib/auth.js";
import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  try {
    const db = getDb();

    const { data: me } = await db
      .from("users")
      .select("is_admin")
      .eq("email", user.email)
      .maybeSingle();

    if (!me?.is_admin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    const { data: users, error: usersError } = await db
      .from("users")
      .select("email, first_name, last_initial, first_seen, last_seen, total_logins, is_admin")
      .order("last_seen", { ascending: false });
    if (usersError) throw usersError;

    const { data: progress, error: progressError } = await db
      .from("user_progress")
      .select("email, passed, best_score");
    if (progressError) throw progressError;

    const stats = {};
    for (const row of progress) {
      if (!stats[row.email]) {
        stats[row.email] = { modulesPassed: 0, modulesStarted: 0, totalScore: 0 };
      }
      stats[row.email].modulesStarted += 1;
      if (row.passed) stats[row.email].modulesPassed += 1;
      stats[row.email].totalScore += row.best_score || 0;
    }

    const result = users.map((u) => {
      const s = stats[u.email] || { modulesPassed: 0, modulesStarted: 0, totalScore: 0 };
      return {
        email: u.email,
        firstName: u.first_name,
        lastInitial: u.last_initial,
        firstSeen: u.first_seen,
        lastSeen: u.last_seen,
        totalLogins: u.total_logins,
        isAdmin: !!u.is_admin,
        modulesPassed: s.modulesPassed,
        modulesStarted: s.modulesStarted,
        avgBestScore: s.modulesStarted > 0 ? s.totalScore / s.modulesStarted : 0,
      };
    });

    return res.status(200).json({ users: result });
  } catch (err) {
    console.error("admin-users error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
