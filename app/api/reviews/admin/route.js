import { timingSafeEqual } from 'node:crypto';
import { adminApprove, adminDelete, adminList, storeConfigured } from '@/lib/reviews-store';

export const dynamic = 'force-dynamic';

const ADMIN_KEY = process.env.REVIEWS_ADMIN_KEY || '';

function authorized(request) {
  const given = Buffer.from(request.headers.get('x-admin-key') || '');
  const expected = Buffer.from(ADMIN_KEY);
  return ADMIN_KEY.length >= 12 && given.length === expected.length && timingSafeEqual(given, expected);
}

const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function guard(request) {
  if (!ADMIN_KEY) return json({ error: 'Set REVIEWS_ADMIN_KEY (12+ characters) in your environment variables first.' }, 503);
  if (!authorized(request)) return json({ error: 'Wrong admin key.' }, 401);
  if (!storeConfigured()) return json({ error: 'Review storage is not connected (Upstash Redis).' }, 503);
  return null;
}

export async function GET(request) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    return json(await adminList());
  } catch (err) {
    console.error('reviews admin list failed', err);
    return json({ error: 'Could not load reviews.' }, 500);
  }
}

export async function POST(request) {
  const denied = guard(request);
  if (denied) return denied;
  const { action, id } = await request.json().catch(() => ({}));
  if (typeof id !== 'string' || !/^[a-f0-9-]{36}$/.test(id)) return json({ error: 'Invalid review id.' }, 400);
  try {
    if (action === 'approve') return json({ ok: await adminApprove(id) });
    if (action === 'delete') return json({ ok: await adminDelete(id) });
    return json({ error: 'Unknown action.' }, 400);
  } catch (err) {
    console.error('reviews admin action failed', err);
    return json({ error: 'Action failed.' }, 500);
  }
}
