// ==========================================================================
// auth.js — Verify Microsoft Entra ID tokens
// Every API endpoint calls verifyToken(req) to confirm the request comes
// from a real signed-in SmarTek21 user. If verification fails, the endpoint
// returns 401. If it succeeds, we get the user's email back.
// ==========================================================================

import { jwtVerify, createRemoteJWKSet } from "jose";

// Azure tenant configuration — must match what's in the React app
const TENANT_ID = "4738192e-2424-46c8-a19c-bc2c86665215";
const CLIENT_ID = "9c7894fe-fab8-40ac-a866-81d06f14f68c";
const ALLOWED_DOMAIN = "smartek21.com";

// Microsoft's public keys, used to verify token signatures.
// jose caches these so we don't fetch them on every call.
const JWKS = createRemoteJWKSet(
  new URL(`https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`)
);

/**
 * Extract and verify the bearer token from a request.
 * Returns { email, firstName, lastInitial } on success.
 * Throws an error if the token is missing, invalid, expired, or from
 * outside the SmarTek21 tenant.
 */
export async function verifyToken(req) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = authHeader.slice("Bearer ".length).trim();

  // Verify signature, issuer, audience, and expiration.
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    audience: CLIENT_ID,
  });

  // Microsoft returns the email in different claims depending on token type.
  // Try the most common ones in order.
  const email = (
    payload.preferred_username ||
    payload.email ||
    payload.upn ||
    ""
  ).toLowerCase();

  if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
    throw new Error(`User ${email} is not from the ${ALLOWED_DOMAIN} domain`);
  }

  // Parse the email to derive name parts.
  // SmarTek21 convention: {firstname}{lastinitial}@smartek21.com
  const prefix = email.split("@")[0];
  const lastInitial = prefix.slice(-1).toUpperCase();
  const firstRaw = prefix.slice(0, -1);
  const firstName = firstRaw
    ? firstRaw.charAt(0).toUpperCase() + firstRaw.slice(1)
    : "";

  return { email, firstName, lastInitial };
}

/**
 * Helper: send a 401 Unauthorized response from a Functions handler.
 */
export function unauthorized(context, message = "Unauthorized") {
  context.res = {
    status: 401,
    headers: { "Content-Type": "application/json" },
    body: { error: message },
  };
}

/**
 * Helper: send a JSON response.
 */
export function jsonResponse(context, status, body) {
  context.res = {
    status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}