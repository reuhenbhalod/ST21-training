import { ping } from "./_lib/db.js";

export default async function handler(req, res) {
  try {
    await ping();
    res.status(200).json({ ok: true, db: true });
  } catch (err) {
    console.error("health check failed:", err);
    res.status(500).json({ ok: false, db: false, error: err.message });
  }
}
