// ==========================================================================
// lambda.js — single Lambda entrypoint behind one Function URL.
//
// The 6 handlers were written for Vercel's (req, res) signature. Rather than
// rewrite them, this router adapts an AWS Lambda Function URL event (payload
// format 2.0) into the same (req, res) shape and dispatches by path. One
// Lambda + one Function URL = one CORS config and the smallest cold-start
// surface. The frontend keeps calling relative /api/* paths (CloudFront
// forwards them here), so no client changes are needed.
// ==========================================================================

import health from "./health.js";
import progress from "./progress.js";
import heartbeat from "./heartbeat.js";
import quizAttempt from "./quiz-attempt.js";
import adminUsers from "./admin-users.js";
import adminUserDetail from "./admin-user-detail.js";
import chat from "./chat.js";

const ROUTES = {
  "/api/health": health,
  "/api/progress": progress,
  "/api/heartbeat": heartbeat,
  "/api/quiz-attempt": quizAttempt,
  "/api/admin-users": adminUsers,
  "/api/admin-user-detail": adminUserDetail,
  "/api/chat": chat,
};

const CORS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Max-Age": "86400",
};

// Build the minimal (req, res) pair the handlers use: req.method, req.headers,
// req.query, req.body; res.status().json(). res resolves a promise the router
// awaits so we can return a single Function URL response object.
function makeReqRes(event) {
  const http = event.requestContext?.http || {};
  const method = http.method || "GET";

  let body = undefined;
  if (event.body) {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    try {
      body = JSON.parse(raw);
    } catch {
      body = raw;
    }
  }

  const req = {
    method,
    headers: event.headers || {},
    query: event.queryStringParameters || {},
    body,
  };

  let resolve;
  const done = new Promise((r) => (resolve = r));
  let statusCode = 200;
  const extraHeaders = {};
  const res = {
    status(code) {
      statusCode = code;
      return res;
    },
    setHeader(name, value) {
      extraHeaders[name] = String(value);
      return res;
    },
    json(payload) {
      resolve({
        statusCode,
        headers: { "Content-Type": "application/json", ...CORS, ...extraHeaders },
        body: JSON.stringify(payload),
      });
      return res;
    },
  };

  return { req, res, done };
}

export async function handler(event) {
  const http = event.requestContext?.http || {};
  const method = http.method || "GET";
  // Function URL gives the full path; strip any stage/query. rawPath is enough.
  const path = (event.rawPath || http.path || "").replace(/\/+$/, "") || "/";

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }

  const route = ROUTES[path];
  if (!route) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json", ...CORS },
      body: JSON.stringify({ error: "Not found" }),
    };
  }

  const { req, res, done } = makeReqRes(event);
  try {
    await route(req, res);
    return await done;
  } catch (err) {
    console.error("unhandled error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", ...CORS },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
