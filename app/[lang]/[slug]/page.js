import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import ToolWidget from '@/components/ToolWidget';
import { alternatesFor, localePath } from '@/lib/i18n/config';
import { getDictionary, getReadyLocales, getTool, getTools } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';
import { TOOLS } from '@/lib/tools';

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const [t, dict, ready] = await Promise.all([getTool(lang, slug), getDictionary(lang), getReadyLocales()]);
  if (!t) return {};
  const title = t.seoTitle || `${t.metaTitle} | ${dict.site.titleSuffix}`;
  return {
    title: { absolute: title },
    description: t.metaDescription,
    alternates: alternatesFor(lang, `/${t.slug}`, ready),
    openGraph: { title, description: t.metaDescription, url: `${SITE.url}${localePath(lang, `/${t.slug}`)}` },
  };
}

const plain = (s) => s.replace(/\*\*|\*|\[([^\]]+)\]\([^)]+\)/g, '$1');

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
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dict.page.breadcrumbHome, item: `${SITE.url}${localePath(lang, '/')}` },
          { '@type': 'ListItem', position: 2, name: t.nav, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
      },
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

const RELATED_ICON = { cut: 'scissors', join: 'layers', link: 'link', soon: 'music' };

export default async function ToolPage({ params }) {
  const { lang, slug } = await params;
  const [t, dict, tools] = await Promise.all([getTool(lang, slug), getDictionary(lang), getTools(lang)]);
  if (!t) notFound();
  const R = ({ text }) => <Rich text={text} lang={lang} />;
  const b = dict.badges;

  return (
    <>
      <JsonLd t={t} lang={lang} dict={dict} />
      <section className="hero container" aria-labelledby="page-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href={localePath(lang, '/')}>{dict.page.breadcrumbHome}</Link></li>
            <li aria-current="page">{t.nav}</li>
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
        <ToolWidget kind={t.kind} tool={t.tool} />
      </section>

      <div className="container narrow">
        <section className="section" aria-labelledby="intro">
          <h2 id="intro">{t.intro.h2}</h2>
          {t.intro.paras.map((p) => <p key={p.slice(0, 32)}><R text={p} /></p>)}
          <Figure image={t.intro.image} />
        </section>

        <section className="section" aria-labelledby="how">
          <span className="eyebrow">{dict.page.stepByStep}</span>
          <h2 id="how">{dict.page.howToUse.replace('{name}', t.nav)}</h2>
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
