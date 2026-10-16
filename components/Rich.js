import Link from 'next/link';
import { localePath } from '@/lib/i18n/config';
import { interpolate } from '@/lib/i18n/format';

const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

/**
 * Renders text with light markup: **bold**, *italic* and [text](/path). Internal paths get the page's language
 * prefix; mailto: and external links become plain anchors. {placeholders} are filled from `vars`.
 */
export default function Rich({ text, lang, vars }) {
  if (!text) return null;
  const parts = interpolate(text, vars).split(TOKEN);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}><Rich text={part.slice(2, -2)} lang={lang} /></strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      return href.startsWith('/') ? (
        <Link key={i} href={localePath(lang, href)}>{label}</Link>
      ) : (
        <a key={i} href={href}>{label}</a>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
