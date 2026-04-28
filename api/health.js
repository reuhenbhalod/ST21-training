import { getDb } from "./_lib/db.js";

export default async function handler(req, res) {
  try {
    const db = getDb();
    const { error } = await db.from("users").select("email").limit(1);
    if (error) throw error;
    res.status(200).json({ ok: true, db: true });
  } catch (err) {
    console.error("health check failed:", err);
    res.status(500).json({ ok: false, db: false, error: err.message });
  }
}
