import { createHash } from 'crypto';

/**
 * Verify an Artemis admin session token.
 *
 * Tokens are issued by `POST /api/admin/login` in the format:
 *   `adm_{timestamp}_{random}_{hash}`
 * where `hash = sha256(ADMIN_PASSWORD + timestamp).slice(0, 22)` (the
 * same truncation performed by the login route's `sha256Hash` helper).
 *
 * Verification is therefore stateless: we recompute the expected hash
 * from the timestamp embedded in the token and the configured
 * `ADMIN_PASSWORD`, then compare. A token is valid only when:
 *   1. `ADMIN_PASSWORD` is configured in the environment.
 *   2. The token matches the expected format.
 *   3. The recomputed hash matches the hash in the token.
 *   4. The timestamp is within the 24-hour session window.
 *
 * The token may be supplied either via the `artemis_admin_token`
 * HttpOnly cookie or via an `Authorization: Bearer <token>` header.
 */
export async function verifyAdminAuth(request: Request): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  // Read the token from the cookie or the Authorization header.
  const cookieToken = readCookie(request, 'artemis_admin_token');
  const authHeader = request.headers.get('authorization') || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';
  const token = cookieToken || bearerToken;

  if (!token) return false;

  return isValidAdminToken(token, adminPassword);
}

function isValidAdminToken(token: string, adminPassword: string): boolean {
  const parts = token.split('_');
  // Expected: adm, timestamp, random, hash
  if (parts.length < 4 || parts[0] !== 'adm') return false;

  const timestamp = parts[1];
  const suppliedHash = parts.slice(3).join('_');
  if (!timestamp || !suppliedHash) return false;

  // Timestamp must be a number.
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;

  // Session expires after 24 hours.
  const SESSION_MS = 24 * 60 * 60 * 1000;
  if (Date.now() - ts > SESSION_MS) return false;

  const expectedHash = sha256Short(adminPassword + timestamp);
  return timingSafeEqualString(expectedHash, suppliedHash);
}

function sha256Short(input: string): string {
  return createHash('sha256')
    .update(input)
    .digest('hex')
    .slice(0, 22);
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function readCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}
