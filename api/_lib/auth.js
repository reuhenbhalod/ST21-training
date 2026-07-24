// ==========================================================================
// auth.js — Verify Microsoft Entra ID tokens
// ==========================================================================

import { jwtVerify, createRemoteJWKSet } from "jose";

const TENANT_ID = "4738192e-2424-46c8-a19c-bc2c86665215";
const CLIENT_ID = "7d8b1e2d-57fb-430b-b3c0-acaab113bbf5";
// Email domains allowed to sign in. All must be verified custom domains on the
// same Entra tenant (TENANT_ID) so their users get tokens from this app.
const ALLOWED_DOMAINS = ["smartek21.com", "retrorabbit.co.za"];

const JWKS = createRemoteJWKSet(
  new URL(`https://login.microsoftonline.com/${TENANT_ID}/discovery/keys`)
);

export async function verifyToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = authHeader.slice("Bearer ".length).trim();

  const { payload } = await jwtVerify(token, JWKS, {
    issuer: [
      `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
      `https://sts.windows.net/${TENANT_ID}/`
    ],
    audience: [
      CLIENT_ID,
      `api://${CLIENT_ID}`
    ],
  });

  // Resolve a stable identity that is IDENTICAL across v1.0 and v2.0 tokens.
  // We now accept both token versions, and the claim set differs between them:
  // v2.0 tokens carry `preferred_username` (the UPN) but often omit `upn`, while
  // v1.0 tokens carry `upn` but often omit `preferred_username`. For a member
  // account both of those resolve to the same UPN, so checking them first keeps
  // the same user keyed to the same row regardless of which token version we get.
  // `email` is checked LAST because it can be a different primary-SMTP alias and
  // would otherwise split one user's progress across two keys.
  // Candidate identity claims in priority order. For member accounts these all
  // resolve to the same UPN, so the order keeps one user keyed to one row across
  // v1.0/v2.0 tokens. For B2B guests, however, `preferred_username`/`upn` can be
  // the mangled "name_domain#EXT#@tenant.onmicrosoft.com" form while `email`
  // holds the real external address — so we prefer whichever candidate sits on
  // an allowed domain, and only fall back to raw priority order otherwise.
  const candidates = [
    payload.preferred_username,
    payload.upn,
    payload.email,
  ]
    .filter(Boolean)
    .map((c) => c.toLowerCase().trim());

  const email =
    candidates.find((c) => ALLOWED_DOMAINS.some((d) => c.endsWith(`@${d}`))) ||
    candidates[0] ||
    "";

  if (!ALLOWED_DOMAINS.some((d) => email.endsWith(`@${d}`))) {
    throw new Error(
      `User ${email} is not from an allowed domain (${ALLOWED_DOMAINS.join(", ")})`
    );
  }

  const prefix = email.split("@")[0];
  const lastInitial = prefix.slice(-1).toUpperCase();
  const firstRaw = prefix.slice(0, -1);
  const firstName = firstRaw
    ? firstRaw.charAt(0).toUpperCase() + firstRaw.slice(1)
    : "";

  return { email, firstName, lastInitial };
}
