import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// 1x1 transparent GIF
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export async function GET(req: NextRequest) {
  const sendId = req.nextUrl.searchParams.get('id');

  if (sendId) {
    try {
      const db = createServerClient();
      await db
        .from('email_sends')
        .update({ opened_at: new Date().toISOString(), status: 'opened' })
        .eq('id', sendId)
        .is('opened_at', null); // only record first open
    } catch (err) {
      console.error('[track/open] Error:', err);
    }
  }

  return new NextResponse(PIXEL, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
  });
}
