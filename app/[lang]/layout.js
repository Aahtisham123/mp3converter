import { Inter, Noto_Sans_Arabic, Noto_Sans_Devanagari } from 'next/font/google';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { LOCALES, LOCALE_CODES, LOCALE_MAP, alternatesFor } from '@/lib/i18n/config';
import { getDictionary, getHome, getReadyLocales } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic'], display: 'swap', variable: '--font-inter' });
// Only downloaded by browsers when Arabic or Hindi text is on the page.
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], display: 'swap', variable: '--font-arabic', preload: false });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], display: 'swap', variable: '--font-devanagari', preload: false });

// Unknown paths below a language must reach the pages, so they can show the localized 404. Pages also call
// notFound() for an unknown language.
export const dynamicParams = true;

export function generateStaticParams() {
  return LOCALE_CODES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LOCALE_MAP[lang]) return {};
  const [dict, home, ready] = await Promise.all([getDictionary(lang), getHome(lang), getReadyLocales()]);
  const loc = LOCALE_MAP[lang];
  return {
    metadataBase: new URL(SITE.url),
    title: { default: home.metaTitle, template: `%s | ${dict.site.titleSuffix}` },
    description: home.metaDescription,
    applicationName: SITE.name,
    alternates: alternatesFor(lang, '/', ready),
    icons: {
      icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/images/logo.svg', type: 'image/svg+xml' }],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: loc.og,
      alternateLocale: LOCALES.filter((l) => l.code !== lang && ready.includes(l.code)).map((l) => l.og),
      title: home.metaTitle,
      description: home.ogDescription,
      images: [{ url: '/images/og-mp3-converter.png', width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: 'summary_large_image' },
    // A language without translations would only repeat the English text, so keep it out of search results.
    robots: ready.includes(lang) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children, params }) {
  const { lang: segment } = await params;
  // An unknown first segment (e.g. /old-page.php) renders in English; its page then calls notFound(), so the
  // visitor gets the site's own 404 screen with the sidebar instead of the bare default page.
  const lang = LOCALE_MAP[segment] ? segment : 'en';
  const [dict, ready] = await Promise.all([getDictionary(lang), getReadyLocales()]);
  return (
    <html lang={lang} dir={LOCALE_MAP[lang].dir} className={`${inter.variable} ${arabic.variable} ${devanagari.variable}`}>
      <body>
        <I18nProvider lang={lang} dict={dict} ready={ready}>
          <AppShell>
            {children}
            <Footer lang={lang} dict={dict} />
          </AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
