import { storeConfigured, verifyReview } from '@/lib/reviews-store';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  let result = 'invalid';
  if (storeConfigured()) {
    try {
      result = await verifyReview(url.searchParams.get('token'));
    } catch (err) {
      console.error('review verify failed', err);
    }
  }
  const state = result === 'invalid' ? 'invalid' : result === 'published' ? 'verified' : 'verified-pending';
  return Response.redirect(new URL(`/?review=${state}#testimonials`, url.origin), 303);
}
