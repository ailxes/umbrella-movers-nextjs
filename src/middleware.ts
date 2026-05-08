import { NextResponse, type NextRequest } from 'next/server';
import { OUTREACH_AUTH_COOKIE, verifySessionCookie } from '@/lib/outreach-auth';

const PROTECTED_API_PREFIXES = [
  '/api/outreach/admin',
  '/api/outreach/contacts',
  '/api/outreach/campaigns',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public exceptions inside protected paths
  if (pathname === '/outreach-admin/login') return NextResponse.next();

  const cookie = req.cookies.get(OUTREACH_AUTH_COOKIE);
  const ok = await verifySessionCookie(cookie?.value);
  if (ok) return NextResponse.next();

  // Page request → bounce to login
  if (pathname.startsWith('/outreach-admin')) {
    const url = req.nextUrl.clone();
    url.pathname = '/outreach-admin/login';
    if (pathname !== '/outreach-admin') url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // API request → JSON 401
  if (PROTECTED_API_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/outreach-admin',
    '/outreach-admin/:path*',
    '/api/outreach/admin',
    '/api/outreach/admin/:path*',
    '/api/outreach/contacts',
    '/api/outreach/campaigns',
  ],
};
