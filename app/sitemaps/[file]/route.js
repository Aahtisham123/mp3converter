import { getReadyLocales } from '@/lib/i18n/server';
import { languageSitemap, xmlResponse } from '@/lib/seo/sitemaps';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getReadyLocales()).map((code) => ({ file: `${code}.xml` }));
}

export async function GET(_request, { params }) {
  const { file } = await params;
  const body = /^[a-z]{2}\.xml$/.test(file) ? await languageSitemap(file.slice(0, 2)) : null;
  return body ? xmlResponse(body) : new Response('Not found', { status: 404 });
}
