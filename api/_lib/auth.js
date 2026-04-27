// ==========================================================================
// auth.js — Verify Microsoft Entra ID tokens
// ==========================================================================

const TENANT_ID = "4738192e-2424-46c8-a19c-bc2c86665215";
const CLIENT_ID = "9c7894fe-fab8-40ac-a866-81d06f14f68c";
const ALLOWED_DOMAIN = "smartek21.com";

let _jose = null;
let _jwks = null;

async function getJose() {
  if (!_jose) {
    _jose = await import("jose");
    _jwks = _jose.createRemoteJWKSet(
      new URL(`https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`)
    );
  }
  return { jwtVerify: _jose.jwtVerify, jwks: _jwks };
}

async function verifyToken(req) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = authHeader.slice("Bearer ".length).trim();

  const { jwtVerify, jwks } = await getJose();
  const { payload } = await jwtVerify(token, jwks, {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    audience: CLIENT_ID,
  });

  const email = (
    payload.preferred_username ||
    payload.email ||
    payload.upn ||
    ""
  ).toLowerCase();

  if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
    throw new Error(`User ${email} is not from the ${ALLOWED_DOMAIN} domain`);
  }

  const prefix = email.split("@")[0];
  const lastInitial = prefix.slice(-1).toUpperCase();
  const firstRaw = prefix.slice(0, -1);
  const firstName = firstRaw
    ? firstRaw.charAt(0).toUpperCase() + firstRaw.slice(1)
    : "";

  return { email, firstName, lastInitial };
}

function unauthorized(context, message = "Unauthorized") {
  context.res = {
    status: 401,
    headers: { "Content-Type": "application/json" },
    body: { error: message },
  };
}

function jsonResponse(context, status, body) {
  context.res = {
    status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}

module.exports = { verifyToken, unauthorized, jsonResponse };
