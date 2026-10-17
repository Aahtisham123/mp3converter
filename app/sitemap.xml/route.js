import { sitemapIndex, xmlResponse } from '@/lib/seo/sitemaps';

export const dynamic = 'force-static';

export async function GET() {
  return xmlResponse(await sitemapIndex());
}
