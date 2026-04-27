// ==========================================================================
// db.js — Azure SQL Database connection pool
// ==========================================================================

const sql = require("mssql");

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

async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(getConfig()).catch((err) => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

async function query(text, params = {}) {
  const pool = await getPool();
  const request = pool.request();
  for (const [name, { type, value }] of Object.entries(params)) {
    request.input(name, type, value);
  }
  return request.query(text);
}

module.exports = { getPool, query, sql };
