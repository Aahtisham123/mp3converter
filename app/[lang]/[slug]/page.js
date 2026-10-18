import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import ToolWidget from '@/components/ToolWidget';
import { LOCALE_MAP, localePath } from '@/lib/i18n/config';
import { getDictionary, getReadyLocales, getTool, getTools } from '@/lib/i18n/server';
import { pageMeta } from '@/lib/seo/meta';
import { NAV_GROUPS, SITE, hubGroupOf } from '@/lib/site';
import { TOOLS } from '@/lib/tools';

// Unknown slugs still reach the page, which calls notFound() so visitors get the site's own 404 screen.
export const dynamicParams = true;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const [t, dict, ready] = await Promise.all([getTool(lang, slug), getDictionary(lang), getReadyLocales()]);
  if (!t) return {};
  const title = t.seoTitle || `${t.metaTitle} | ${dict.site.titleSuffix}`;
  return pageMeta({ lang, path: `/${t.slug}`, title, description: t.metaDescription, ready });
}

const plain = (s) => s.replace(/\*\*|\*|\[([^\]]+)\]\([^)]+\)/g, '$1');

const NAV_ICON = Object.fromEntries(NAV_GROUPS.flatMap((g) => g.items.map((i) => [i.href.slice(1), i.icon])));

/** Home › hub (when the tool belongs to one) › tool. */
function crumbs(t, lang, dict) {
  const group = hubGroupOf(t.slug);
  return [
    { name: dict.page.breadcrumbHome, href: localePath(lang, '/') },
    ...(group ? [{ name: dict.nav[group.label], href: localePath(lang, group.hub) }] : []),
    { name: t.nav, href: localePath(lang, `/${t.slug}`) },
  ];
}

function JsonLd({ t, lang, dict }) {
  const url = `${SITE.url}${localePath(lang, `/${t.slug}`)}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: t.h1,
        url,
        inLanguage: lang,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: dict.page.operatingSystem,
        description: t.metaDescription,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs(t, lang, dict).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE.url}${c.href}` })),
      },
      ...(t.hub
        ? [{
            '@type': 'ItemList',
            name: t.hub.h2,
            itemListElement: t.hub.items.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: dict.nav[h.slug], url: `${SITE.url}${localePath(lang, `/${h.slug}`)}` })),
          }]
        : []),
      ...(t.faqs && t.faqs.length
        ? [{
            '@type': 'FAQPage',
            inLanguage: lang,
            mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
          }]
        : []),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Button that scrolls back up to the tool at the top of the page. */
function ToolButton({ cta }) {
  if (!cta) return null;
  return (
    <p className="inline-cta">
      <a href="#converter" className="btn-grad">
        <Icon name="arrowUp" /> {cta}
      </a>
    </p>
  );
}

function Figure({ image }) {
  if (!image) return null;
  return (
    <figure className="figure">
      <img src={image.src} alt={image.alt} title={image.title || image.alt} width={image.width} height={image.height} loading="lazy" />
    </figure>
  );
}

const RELATED_ICON = { cut: 'scissors', join: 'layers', link: 'link', soon: 'music', transcribe: 'fileText', hub: 'grid' };

/** Cards linking to every tool of a hub page. */
function HubGrid({ hub, lang, dict }) {
  return (
    <section className="section hub" aria-labelledby="hub">
      <div className="section__head">
        <h2 id="hub">{hub.h2}</h2>
        {hub.intro && <p>{hub.intro}</p>}
      </div>
      <div className="grid grid-3 hub-grid">
        {hub.items.map((h) => (
          <Link key={h.slug} href={localePath(lang, `/${h.slug}`)} className="card hub-card">
            <span className="card__icon"><Icon name={NAV_ICON[h.slug] || 'fileAudio'} /></span>
            <span>
              <strong>{dict.nav[h.slug]}</strong>
              <span className="hub-card__text">{h.text}</span>
            </span>
            <Icon name="chevronRight" className="icon hub-card__go" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ToolPage({ params }) {
  const { lang, slug } = await params;
  const [t, dict, tools] = await Promise.all([getTool(lang, slug), getDictionary(lang), getTools(lang)]);
  if (!t || !LOCALE_MAP[lang]) notFound();
  const R = ({ text }) => <Rich text={text} lang={lang} />;
  const b = dict.badges;

  return (
    <>
      <JsonLd t={t} lang={lang} dict={dict} />
      <section className="hero container" aria-labelledby="page-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            {crumbs(t, lang, dict).map((c, i, all) =>
              i < all.length - 1 ? <li key={c.href}><Link href={c.href}>{c.name}</Link></li> : <li key={c.href} aria-current="page">{c.name}</li>,
            )}
          </ol>
        </nav>
        <h1 id="page-title">{t.h1}</h1>
        <p className="hero__lead"><R text={t.lead} /></p>
        {t.kind === 'soon' ? (
          <ul className="badges">
            <li><Icon name="sparkles" /> {b.comingSoon}</li>
            <li><Icon name="tag" /> {b.free}</li>
            <li><Icon name="zap" /> {b.mp3Up}</li>
            <li><Icon name="phone" /> {b.anyDevice}</li>
          </ul>
        ) : t.kind === 'link' ? (
          <ul className="badges">
            <li><Icon name="tag" /> {b.free}</li>
            <li><Icon name="shield" /> {b.noSignup}</li>
            <li><Icon name="zap" /> {b.mp3Up}</li>
            <li><Icon name="video" /> {b.mp4Up}</li>
          </ul>
        ) : (
          <ul className="badges">
            <li><Icon name="shield" /> {b.private}</li>
            <li><Icon name="infinity" /> {b.noLimits}</li>
            <li><Icon name="tag" /> {b.free}</li>
            <li><Icon name="phone" /> {b.anyDevice}</li>
          </ul>
        )}
        {t.kind !== 'hub' && <ToolWidget kind={t.kind} tool={t.tool} />}
      </section>

      {t.hub && (
        <div className="container">
          <HubGrid hub={t.hub} lang={lang} dict={dict} />
        </div>
      )}

      <div className="container narrow">
        <section className="section" aria-labelledby="intro">
          <h2 id="intro">{t.intro.h2}</h2>
          {t.intro.paras.map((p) => <p key={p.slice(0, 32)}><R text={p} /></p>)}
          <Figure image={t.intro.image} />
        </section>

        {t.steps && t.steps.length > 0 && (
        <section className="section" aria-labelledby="how">
          <span className="eyebrow">{dict.page.stepByStep}</span>
          <h2 id="how">{t.howTitle || dict.page.howToUse.replace('{name}', t.nav)}</h2>
          <Figure image={t.howImage} />
          <ol className="steps">
            {t.steps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <R text={text} />
              </li>
            ))}
          </ol>
          <ToolButton cta={t.howCta} />
        </section>
        )}

        {t.sections.map((s, i) => (
          <section className="section" key={s.h2} aria-labelledby={`s${i}`}>
            <h2 id={`s${i}`}>{s.h2}</h2>
            {(s.paras || []).map((p) => <p key={p.slice(0, 32)}><R text={p} /></p>)}
            {s.list && (
              <ul className="checklist">
                {s.list.map(([bold, text]) => (
                  <li key={bold}><strong>{bold}.</strong> <R text={text} /></li>
                ))}
              </ul>
            )}
            <Figure image={s.image} />
            <ToolButton cta={s.cta} />
          </section>
        ))}

        {t.faqs && t.faqs.length > 0 && (
        <section className="section" aria-labelledby="faq">
          <span className="eyebrow">{dict.page.faq}</span>
          <h2 id="faq">{dict.page.faqTitle}</h2>
          <div className="faq">
            {t.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p><R text={f.a} /></p>
              </details>
            ))}
          </div>
        </section>
        )}
      </div>

      <section className="section container" aria-labelledby="related">
        <div className="section__head">
          <h2 id="related">{dict.page.related}</h2>
        </div>
        <div className="grid grid-4">
          {t.related.map((r) => tools[r]).filter(Boolean).map((r) => (
            <Link key={r.slug} href={localePath(lang, `/${r.slug}`)} className="card format-card">
              <span className="card__icon"><Icon name={RELATED_ICON[r.kind] || 'fileAudio'} /></span>
              <strong>{r.nav}</strong>
            </Link>
          ))}
        </div>
      </section>

      <div className="container narrow">
        <section className="section">
          <div className="author-box">
            <img src="/images/logo.svg" alt="" width="52" height="52" />
            <div>
              <strong>{dict.page.byTeam}</strong>
              <p><R text={dict.page.teamText} /></p>
              <p style={{ color: 'var(--text-3)', fontSize: '.88rem' }}>{dict.page.lastUpdated}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
