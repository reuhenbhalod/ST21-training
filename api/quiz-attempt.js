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
    const { sectionId, score, passed, questions, answers } = req.body || {};
    if (!sectionId || typeof score !== "number" || typeof passed !== "boolean") {
      return res.status(400).json({ error: "sectionId, score, and passed are required" });
    }

    const db = getDb();
    const { error } = await db.from("quiz_attempts").insert({
      email: user.email,
      section_id: sectionId,
      score,
      passed,
      questions_json: questions || [],
      answers_json: answers || {},
    });
    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("quiz-attempt error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
