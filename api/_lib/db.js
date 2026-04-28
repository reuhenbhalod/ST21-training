// ==========================================================================
// db.js — Supabase client
// Uses SUPABASE_URL and SUPABASE_SERVICE_KEY env vars from Vercel.
// ==========================================================================

import { createClient } from "@supabase/supabase-js";

let _client = null;

export function getDb() {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      {
        auth: { persistSession: false }
      }
    );
  }
  return _client;
}
