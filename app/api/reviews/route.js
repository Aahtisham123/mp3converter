import {
  createReview,
  emailVerificationEnabled,
  getPublished,
  rateLimited,
  sendVerificationEmail,
  storeConfigured,
} from '@/lib/reviews-store';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
const PHOTO_RE = /^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i;
const MAX_PHOTO_CHARS = 200_000;

const json = (body, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const clean = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

export async function GET() {
  if (!storeConfigured()) {
    return json({ configured: false, emailVerification: false, reviews: [], stats: { count: 0, average: 0, distribution: [] } });
  }
  try {
    const data = await getPublished();
    return Response.json(
      { configured: true, emailVerification: emailVerificationEnabled(), ...data },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (err) {
    console.error('reviews GET failed', err);
    return json({ error: 'Reviews could not be loaded right now.' }, 500);
  }
}

export async function POST(request) {
  if (!storeConfigured()) {
    return json({ error: 'Reviews are not open yet. Please check back soon.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.website) return json({ status: 'pending', message: 'Thank you! Your review was received.' });

  const name = clean(body.name, 60).replace(/\s+/g, ' ');
  const email = clean(body.email, 254).toLowerCase();
  const text = clean(body.text, 1000);
  const rating = Number(body.rating);
  const photo = body.photo ? String(body.photo) : null;

  if (name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'Please choose a star rating.' }, 400);
  if (text.length < 10) return json({ error: 'Please write at least a short sentence (10 characters or more).' }, 400);
  if (photo && (photo.length > MAX_PHOTO_CHARS || !PHOTO_RE.test(photo))) {
    return json({ error: 'That photo could not be used. Please try a smaller JPG or PNG image.' }, 400);
  }
  if (!body.consent) return json({ error: 'Please agree to the review terms.' }, 400);

  try {
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
    if (await rateLimited(ip)) {
      return json({ error: 'You have sent several reviews already. Please try again in an hour.' }, 429);
    }

    const result = await createReview({ name, email, rating, text, photo });

    if (result.status === 'duplicate') {
      return json({ error: 'A review from this email address already exists. Thank you for sharing your feedback!' }, 409);
    }

    if (result.status === 'verify-email') {
      const origin = (process.env.REVIEWS_SITE_URL || new URL(request.url).origin).replace(/\/+$/, '');
      const link = `${origin}/api/reviews/verify?token=${result.token}`;
      try {
        await sendVerificationEmail({ to: email, name, link });
      } catch (err) {
        console.error('review email failed', err);
        return json({
          status: 'pending',
          message: 'Thank you! Your review was received, but we could not send the confirmation email. It will appear after a quick check.',
        });
      }
      return json({
        status: 'verify-email',
        message: 'Almost done! We sent a confirmation link to your email. Click it to get your Verified badge.',
      });
    }

    if (result.status === 'published') {
      return json({ status: 'published', message: 'Thank you! Your review is now live.' });
    }
    return json({ status: 'pending', message: 'Thank you! Your review was received and will appear after a quick check.' });
  } catch (err) {
    console.error('reviews POST failed', err);
    return json({ error: 'Something went wrong while saving your review. Please try again.' }, 500);
  }
}
