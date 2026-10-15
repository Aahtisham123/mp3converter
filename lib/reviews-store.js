// Server-only storage for visitor reviews (Upstash Redis REST API, e.g. via Vercel → Storage → Upstash).
// Env: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN).
// Optional email verification with Resend: RESEND_API_KEY + REVIEWS_FROM_EMAIL.
// REVIEWS_AUTO_APPROVE=1 publishes reviews without manual approval (after email verification when enabled).

import { createHash, randomBytes, randomUUID } from 'node:crypto';

const REDIS_URL = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '').replace(/\/+$/, '');
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
const RESEND_KEY = process.env.RESEND_API_KEY || '';
const RESEND_URL = process.env.RESEND_API_URL || 'https://api.resend.com/emails';
const FROM_EMAIL = process.env.REVIEWS_FROM_EMAIL || '';
const AUTO_APPROVE = process.env.REVIEWS_AUTO_APPROVE === '1';

export const storeConfigured = () => Boolean(REDIS_URL && REDIS_TOKEN);
export const emailVerificationEnabled = () => Boolean(RESEND_KEY && FROM_EMAIL);

async function redis(...command) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(`Redis error: ${data.error || res.status}`);
  return data.result;
}

const key = {
  review: (id) => `rv:${id}`,
  approved: 'rv:approved',
  pending: 'rv:pending',
  token: (t) => `rv:token:${t}`,
  email: (email) => `rv:email:${createHash('sha256').update(email.toLowerCase()).digest('hex')}`,
  rate: (ip) => `rv:rate:${ip}`,
};

/** Public view of a review: never includes the email address. */
function publicReview(r) {
  return { id: r.id, name: r.name, rating: r.rating, text: r.text, photo: r.photo || null, verified: Boolean(r.verified), createdAt: r.createdAt };
}

async function loadMany(ids) {
  if (!ids || !ids.length) return [];
  const raw = await redis('MGET', ...ids.map(key.review));
  return raw.filter(Boolean).map((s) => JSON.parse(s));
}

/** Approved reviews (newest first) plus rating statistics. */
export async function getPublished(limit = 60) {
  const ids = await redis('ZRANGE', key.approved, 0, 499, 'REV');
  const all = await loadMany(ids);
  const count = all.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({ stars, count: all.filter((r) => r.rating === stars).length }));
  const average = count ? Math.round((all.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { reviews: all.slice(0, limit).map(publicReview), stats: { count, average, distribution } };
}

/** Allows a few submissions per IP address per hour. */
export async function rateLimited(ip, max = 3) {
  const n = await redis('INCR', key.rate(ip));
  if (n === 1) await redis('EXPIRE', key.rate(ip), 3600);
  return n > max;
}

/**
 * Stores a new review. Returns { status: 'verify-email' | 'pending' | 'published' | 'duplicate', id, token }.
 */
export async function createReview({ name, email, rating, text, photo }) {
  // One review per email address (for 180 days).
  const claimed = await redis('SET', key.email(email), '1', 'NX', 'EX', 180 * 24 * 3600);
  if (claimed !== 'OK') return { status: 'duplicate' };

  const id = randomUUID();
  const needsEmail = emailVerificationEnabled();
  const publishNow = !needsEmail && AUTO_APPROVE;
  const review = {
    id,
    name,
    email,
    rating,
    text,
    photo: photo || null,
    verified: false,
    status: needsEmail ? 'unverified' : publishNow ? 'approved' : 'pending',
    createdAt: new Date().toISOString(),
  };
  await redis('SET', key.review(id), JSON.stringify(review));
  await redis('ZADD', publishNow ? key.approved : key.pending, Date.now(), id);

  if (!needsEmail) return { status: publishNow ? 'published' : 'pending', id };
  const token = randomBytes(24).toString('hex');
  await redis('SET', key.token(token), id, 'EX', 7 * 24 * 3600);
  return { status: 'verify-email', id, token };
}

/** Marks a review's email as verified. Returns 'published' | 'pending' | 'invalid'. */
export async function verifyReview(token) {
  if (!/^[a-f0-9]{48}$/.test(token || '')) return 'invalid';
  const id = await redis('GET', key.token(token));
  if (!id) return 'invalid';
  const raw = await redis('GET', key.review(id));
  if (!raw) return 'invalid';
  const review = JSON.parse(raw);
  review.verified = true;
  if (AUTO_APPROVE) {
    review.status = 'approved';
    await redis('ZREM', key.pending, id);
    await redis('ZADD', key.approved, Date.now(), id);
  } else {
    review.status = 'pending';
  }
  await redis('SET', key.review(id), JSON.stringify(review));
  await redis('DEL', key.token(token));
  return review.status === 'approved' ? 'published' : 'pending';
}

export async function sendVerificationEmail({ to, name, link }) {
  const safeName = String(name).replace(/[<>&"]/g, '');
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Please confirm your MP3 Converter review',
      html: `<p>Hi ${safeName},</p><p>Thanks for reviewing MP3 Converter! Please confirm your email address so we can show your review with a <strong>Verified</strong> badge:</p><p><a href="${link}">Confirm my review</a></p><p>If you did not write a review, you can ignore this email.</p>`,
    }),
  });
  if (!res.ok) throw new Error(`Email failed: ${res.status}`);
}

// ---------------------------------------------------------------- admin
export async function adminList() {
  const [pendingIds, approvedIds] = await Promise.all([
    redis('ZRANGE', key.pending, 0, 199, 'REV'),
    redis('ZRANGE', key.approved, 0, 199, 'REV'),
  ]);
  const [pending, approved] = await Promise.all([loadMany(pendingIds), loadMany(approvedIds)]);
  return { pending, approved };
}

export async function adminApprove(id) {
  const raw = await redis('GET', key.review(id));
  if (!raw) return false;
  const review = JSON.parse(raw);
  review.status = 'approved';
  await redis('SET', key.review(id), JSON.stringify(review));
  await redis('ZREM', key.pending, id);
  await redis('ZADD', key.approved, Date.now(), id);
  return true;
}

export async function adminDelete(id) {
  const raw = await redis('GET', key.review(id));
  if (raw) {
    const review = JSON.parse(raw);
    // Free the email so the person could submit again after a removal.
    if (review.email) await redis('DEL', key.email(review.email));
  }
  await redis('ZREM', key.pending, id);
  await redis('ZREM', key.approved, id);
  await redis('DEL', key.review(id));
  return true;
}
