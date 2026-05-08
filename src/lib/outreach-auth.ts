// Edge-compatible HMAC-cookie auth for the outreach admin dashboard.
// Uses Web Crypto so it runs in Next.js middleware (edge runtime) and route handlers.

export const OUTREACH_AUTH_COOKIE = 'outreach_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const VERSION = 'v1';

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not set');
  return s;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return base64UrlEncode(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export interface SessionCookie {
  name: string;
  value: string;
  expires: Date;
}

export async function createSessionCookie(): Promise<SessionCookie> {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${VERSION}.${exp}`;
  const sig = await hmacSha256(getSecret(), payload);
  return {
    name: OUTREACH_AUTH_COOKIE,
    value: `${payload}.${sig}`,
    expires: new Date(exp),
  };
}

export async function verifySessionCookie(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const parts = value.split('.');
  if (parts.length !== 3) return false;
  const [v, expStr, sig] = parts;
  if (v !== VERSION) return false;
  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  let expectedSig: string;
  try {
    expectedSig = await hmacSha256(getSecret(), `${v}.${expStr}`);
  } catch {
    return false;
  }
  return timingSafeEqual(sig, expectedSig);
}

export function verifyPassword(input: unknown): boolean {
  const expected = process.env.OUTREACH_ADMIN_PASSWORD;
  if (!expected || typeof input !== 'string') return false;
  if (input.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < input.length; i++) result |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return result === 0;
}
