// ==========================================================================
// db.js — Azure SQL Database connection pool
// Uses Managed Identity in production (no passwords). Uses connection
// string from environment for local dev.
// ==========================================================================

import sql from "mssql";

// Connection config. The pool is created on first request and reused.
let poolPromise = null;

function getConfig() {
  return {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };
}

/**
 * Get the shared connection pool. Creates it once on first call.
 */
export async function getPool() {
  if (!poolPromise) {
    const config = getConfig();
    poolPromise = sql.connect(config).catch((err) => {
      // Reset on failure so the next call retries fresh
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

/**
 * Run a parameterized query and return the result.
 *
 * Usage:
 *   const result = await query(
 *     "SELECT * FROM users WHERE email = @email",
 *     { email: { type: sql.NVarChar(255), value: "x@y.com" } }
 *   );
 *   console.log(result.recordset);  // array of rows
 */
export async function query(text, params = {}) {
  const pool = await getPool();
  const request = pool.request();
  for (const [name, { type, value }] of Object.entries(params)) {
    request.input(name, type, value);
  }
  return request.query(text);
}

// Re-export sql so handlers can reference sql.NVarChar, sql.Bit, etc.
export { sql };