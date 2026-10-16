import { NextResponse } from 'next/server';

// Keep in sync with LOCALES in lib/i18n/config.js (proxy runs separately from the app, so it has its own copy).
const PREFIXED = ['es', 'pt', 'fr', 'de', 'ru', 'tr', 'ar', 'hi', 'id'];

/**
 * English pages live at the site root (/youtube-to-mp3) but are rendered by app/[lang] with lang = 'en',
 * so root URLs are rewritten internally. /en/... is redirected to the root to avoid duplicate URLs.
 */
export function proxy(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  const first = pathname.split('/')[1];
  if (PREFIXED.includes(first)) return NextResponse.next();
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, workers, sitemap.xml, robots.txt…).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
