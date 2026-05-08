import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie, verifyPassword } from '@/lib/outreach-auth';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = (body as { password?: unknown }).password;

  if (!verifyPassword(password)) {
    // Small uniform delay to flatten timing differences against brute force
    await new Promise(r => setTimeout(r, 350));
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  let cookie;
  try {
    cookie = await createSessionCookie();
  } catch {
    return NextResponse.json({ error: 'Server misconfigured (ADMIN_SESSION_SECRET missing)' }, { status: 500 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: cookie.name,
    value: cookie.value,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: cookie.expires,
  });
  return res;
}
