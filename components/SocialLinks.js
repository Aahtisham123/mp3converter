import { SITE, SOCIAL_LINKS } from '@/lib/site';

const ICONS = {
  facebook: <path fill="currentColor" d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.6c-.5-.1-1.5-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5v1.6H7.2v3.3H10V21h4v-9.2h2.8l.4-3.3z" />,
  x: <path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.3l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" />,
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  tiktok: <path fill="currentColor" d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.6 4.6 0 0 1-4.4-4.7z" />,
  linkedin: <path fill="currentColor" d="M5 3.2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6zM3 9.4h4V21H3zm6.4 0h3.8V11h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />,
  pinterest: <path fill="currentColor" d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.8 3.4-.3 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.8 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.7 2.3l.1.3-.3 1.1c0 .2-.1.2-.3.1-1.3-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.1l-.6 2.4c-.2.9-.9 2-1.3 2.6A10 10 0 1 0 12 2z" />,
};

/** Row of social media icon links (edit the URLs in lib/site.js). */
export default function SocialLinks({ label = `${SITE.name} on social media`, itemLabel = `${SITE.name} on {name}` }) {
  return (
    <ul className="social" aria-label={label}>
      {SOCIAL_LINKS.map((s) => (
        <li key={s.icon}>
          <a
            href={s.href}
            className={`social__link social__link--${s.icon}`}
            aria-label={itemLabel.replace('{name}', s.name)}
            title={s.name}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">{ICONS[s.icon]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
