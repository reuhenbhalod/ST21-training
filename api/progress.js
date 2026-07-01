import { verifyToken } from "./_lib/auth.js";
import { getProgressItem, queryProgress, putProgress } from "./_lib/db.js";

export default async function handler(req, res) {
  let user;
  try {
    user = await verifyToken(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  try {
    if (req.method === "GET") {
      const rows = await queryProgress(user.email);
      const progress = {};
      for (const row of rows) {
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

      const existing = await getProgressItem(user.email, sectionId);

      const newBestScore = Math.max(bestScore || 0, existing?.best_score || 0);
      const newPassed = !!passed || !!existing?.passed;

      await putProgress({
        email: user.email,
        section_id: sectionId,
        has_read: !!read,
        best_score: newBestScore,
        passed: newPassed,
        attempts_count: attemptsCount || 0,
        updated_at: new Date().toISOString(),
      });

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("progress error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
