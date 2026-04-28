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

    const targetEmail = (req.query.email || "").toLowerCase();
    if (!targetEmail) {
      return res.status(400).json({ error: "email query param is required" });
    }

    const { data: targetUser, error: userError } = await db
      .from("users")
      .select("*")
      .eq("email", targetEmail)
      .maybeSingle();
    if (userError) throw userError;
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    const { data: progress, error: progressError } = await db
      .from("user_progress")
      .select("section_id, has_read, best_score, passed, attempts_count, updated_at")
      .eq("email", targetEmail)
      .order("section_id");
    if (progressError) throw progressError;

    const { data: attempts, error: attemptsError } = await db
      .from("quiz_attempts")
      .select("id, section_id, score, passed, submitted_at")
      .eq("email", targetEmail)
      .order("submitted_at", { ascending: false })
      .limit(50);
    if (attemptsError) throw attemptsError;

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
