import { NextResponse } from 'next/server';
import { OUTREACH_AUTH_COOKIE } from '@/lib/outreach-auth';

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: OUTREACH_AUTH_COOKIE,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
