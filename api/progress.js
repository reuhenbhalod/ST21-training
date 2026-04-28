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

    if (req.method === "GET") {
      const { data, error } = await db
        .from("user_progress")
        .select("section_id, has_read, best_score, passed, attempts_count")
        .eq("email", user.email);
      if (error) throw error;

      const progress = {};
      for (const row of data) {
        progress[row.section_id] = {
          read: !!row.has_read,
          best: row.best_score,
          passed: !!row.passed,
          attemptsCount: row.attempts_count,
        };
      }
      return res.status(200).json({ progress });
    }

    if (req.method === "POST") {
      const { sectionId, read, bestScore, passed, attemptsCount } = req.body || {};
      if (!sectionId || typeof sectionId !== "string") {
        return res.status(400).json({ error: "sectionId is required" });
      }

      const { data: existing } = await db
        .from("user_progress")
        .select("best_score, passed")
        .eq("email", user.email)
        .eq("section_id", sectionId)
        .maybeSingle();

      const newBestScore = Math.max(
        bestScore || 0,
        existing?.best_score || 0
      );
      const newPassed = !!passed || !!existing?.passed;

      const { error } = await db.from("user_progress").upsert(
        {
          email: user.email,
          section_id: sectionId,
          has_read: !!read,
          best_score: newBestScore,
          passed: newPassed,
          attempts_count: attemptsCount || 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email,section_id" }
      );
      if (error) throw error;

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("progress error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
