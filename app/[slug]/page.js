import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import ToolWidget from '@/components/ToolWidget';
import { SITE } from '@/lib/site';
import { TOOLS, TOOL_MAP } from '@/lib/tools';

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = TOOL_MAP[slug];
  if (!t) return {};
  return {
    title: { absolute: `${t.metaTitle} | MP3 Converter` },
    description: t.metaDescription,
    alternates: { canonical: `/${t.slug}` },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `${SITE.url}/${t.slug}` },
  };
}

function JsonLd({ t }) {
  const url = `${SITE.url}/${t.slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: t.h1,
        url,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (runs in a web browser)',
        description: t.metaDescription,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: t.nav, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const t = TOOL_MAP[slug];
  if (!t) notFound();

  return (
    <>
      <JsonLd t={t} />
      <section className="hero container" aria-labelledby="page-title">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{t.nav}</li>
          </ol>
        </nav>
        <h1 id="page-title">{t.h1}</h1>
        <p className="hero__lead">{t.lead}</p>
        {t.kind === 'soon' ? (
          <ul className="badges">
            <li><Icon name="sparkles" /> Coming Soon</li>
            <li><Icon name="tag" /> Free</li>
            <li><Icon name="zap" /> MP3 up to 320 kbps</li>
            <li><Icon name="phone" /> Any Device</li>
          </ul>
        ) : t.kind === 'link' ? (
          <ul className="badges">
            <li><Icon name="tag" /> Free</li>
            <li><Icon name="shield" /> No Sign-up</li>
            <li><Icon name="zap" /> MP3 up to 320 kbps</li>
            <li><Icon name="video" /> MP4 up to 1080p</li>
          </ul>
        ) : (
          <ul className="badges">
            <li><Icon name="shield" /> 100% Private</li>
            <li><Icon name="infinity" /> No Limits</li>
            <li><Icon name="tag" /> Free</li>
            <li><Icon name="phone" /> Any Device</li>
          </ul>
        )}
        <ToolWidget kind={t.kind} tool={t.tool} />
      </section>

      <div className="container narrow">
        <section className="section" aria-labelledby="intro">
          <h2 id="intro">{t.intro.h2}</h2>
          {t.intro.paras.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
        </section>

        <section className="section" aria-labelledby="how">
          <span className="eyebrow">Step by step</span>
          <h2 id="how">How to use the {t.nav}</h2>
          <ol className="steps">
            {t.steps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                {text}
              </li>
            ))}
          </ol>
        </section>

        {t.sections.map((s, i) => (
          <section className="section" key={s.h2} aria-labelledby={`s${i}`}>
            <h2 id={`s${i}`}>{s.h2}</h2>
            {(s.paras || []).map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
            {s.list && (
              <ul className="checklist">
                {s.list.map(([b, text]) => (
                  <li key={b}><strong>{b}.</strong> {text}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="section" aria-labelledby="faq">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq">Frequently asked questions</h2>
          <div className="faq">
            {t.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="section container" aria-labelledby="related">
        <div className="section__head">
          <h2 id="related">Related tools</h2>
        </div>
        <div className="grid grid-4">
          {t.related.map((r) => TOOL_MAP[r]).filter(Boolean).map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="card format-card">
              <span className="card__icon"><Icon name={r.kind === 'cut' ? 'scissors' : r.kind === 'join' ? 'layers' : r.kind === 'link' ? 'link' : r.kind === 'soon' ? 'music' : 'fileAudio'} /></span>
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
              <strong>By the MP3 Converter team</strong>
              <p>
                We build free, privacy-first audio tools that run in your browser. This guide is checked against how the
                tool actually works. <Link href="/about">About us</Link>
              </p>
              <p style={{ color: 'var(--text-3)', fontSize: '.88rem' }}>Last updated: October 2026</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
