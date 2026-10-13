import { Inter } from 'next/font/google';
import AppShell from '@/components/AppShell';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'MP3 Converter – Convert Audio & Video to MP3 Free Online',
    template: '%s | MP3 Converter',
  },
  description:
    'Free online MP3 converter. Turn WAV, M4A, FLAC, MP4, MOV and other audio or video files into MP3 at up to 320 kbps. No sign-up, no upload, works in your browser.',
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  icons: { icon: '/images/logo.svg' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: 'MP3 Converter – Convert Audio & Video to MP3 Free Online',
    description:
      'Convert any audio or video file to MP3 in seconds. Free, private and works on phone or computer.',
    images: [{ url: '/images/og-mp3-converter.png', width: 1200, height: 630, alt: 'MP3 Converter' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppShell>
          {children}
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
