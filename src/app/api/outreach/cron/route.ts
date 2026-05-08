import { NextRequest, NextResponse } from 'next/server';
import { runOutreachCron } from '@/lib/outreach-cron';

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  // Vercel cron + manual cURL callers authenticate via Bearer.
  // Dashboard manual triggers go through /api/outreach/admin (cookie-auth).
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runOutreachCron();
    return NextResponse.json(result);
  } catch (err) {
    console.error('[outreach/cron] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
