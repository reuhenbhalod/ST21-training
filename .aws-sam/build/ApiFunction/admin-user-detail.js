import { verifyToken } from "./_lib/auth.js";
import { getUser, queryProgress, queryAttempts } from "./_lib/db.js";

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

    const targetEmail = (req.query.email || "").toLowerCase();
    if (!targetEmail) {
      return res.status(400).json({ error: "email query param is required" });
    }

    const targetUser = await getUser(targetEmail);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    const progress = await queryProgress(targetEmail);
    progress.sort((a, b) => (a.section_id > b.section_id ? 1 : -1));

    const attempts = await queryAttempts(targetEmail, 50); // newest first

    return res.status(200).json({
      user: {
        email: targetUser.email,
        firstName: targetUser.first_name,
        lastInitial: targetUser.last_initial,
        firstSeen: targetUser.first_seen,
        lastSeen: targetUser.last_seen,
        totalLogins: targetUser.total_logins,
        isAdmin: !!targetUser.is_admin,
      },
      progress: progress.map((r) => ({
        sectionId: r.section_id,
        read: !!r.has_read,
        bestScore: r.best_score,
        passed: !!r.passed,
        attemptsCount: r.attempts_count,
        updatedAt: r.updated_at,
      })),
      attempts: attempts.map((r) => ({
        id: r.id,
        sectionId: r.section_id,
        score: r.score,
        passed: !!r.passed,
        submittedAt: r.submitted_at,
      })),
    });
  } catch (err) {
    console.error("admin-user-detail error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
