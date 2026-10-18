import Link from 'next/link';
import Converter from '@/components/Converter';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import { notFound } from 'next/navigation';
import { LOCALE_MAP, localePath } from '@/lib/i18n/config';
import { getDictionary, getHome, getReadyLocales } from '@/lib/i18n/server';
import { pageMeta } from '@/lib/seo/meta';
import { SITE, SOCIAL_LINKS } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const [home, ready] = await Promise.all([getHome(lang), getReadyLocales()]);
  return pageMeta({ lang, path: '/', title: home.metaTitle, description: home.metaDescription, shareDescription: home.ogDescription, ready });
}

const FORMATS = [
  { slug: 'mp4-to-mp3', tag: 'video' },
  { slug: 'wav-to-mp3', tag: 'audio' },
  { slug: 'm4a-to-mp3', tag: 'audio' },
  { slug: 'flac-to-mp3', tag: 'lossless' },
  { slug: 'mov-to-mp3', tag: 'video' },
  { slug: 'ogg-to-mp3', tag: 'audio' },
  { slug: 'webm-to-mp3', tag: 'video' },
  { slug: 'aac-to-mp3', tag: 'audio' },
];
const BADGE_ICONS = ['shield', 'infinity', 'tag', 'zap'];
const FEATURE_ICONS = ['lock', 'zap', 'sliders', 'layers', 'phone', 'tag'];
const USE_ICONS = ['book', 'podcast', 'mic', 'headphones', 'music', 'scissors'];

function JsonLd({ lang, home }) {
  const url = `${SITE.url}${localePath(lang, '/')}`;
  const plain = (s) => s.replace(/\*\*|\*|\[([^\]]+)\]\([^)]+\)/g, '$1');
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: `${SITE.url}/icons/icon-512.png`,
        email: SITE.email,
        sameAs: SOCIAL_LINKS.map((s) => s.href),
      },
      { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: lang, publisher: { '@id': `${SITE.url}/#organization` } },
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: SITE.name,
        url,
        inLanguage: lang,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: home.jsonLd.operatingSystem,
        browserRequirements: 'Requires a modern browser with JavaScript and Web Audio support',
        description: home.jsonLd.appDescription,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: home.jsonLd.features,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        mainEntity: home.faqs.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function Checklist({ items, lang }) {
  return (
    <ul className="checklist">
      {items.map(([b, text]) => (
        <li key={b}>
          <strong><Rich text={b} lang={lang} />.</strong> <Rich text={text} lang={lang} />
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows, lang }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => <td key={i}>{i === 0 ? <strong>{c}</strong> : <Rich text={c} lang={lang} />}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!LOCALE_MAP[lang]) notFound();
  const [home, dict] = await Promise.all([getHome(lang), getDictionary(lang)]);
  const R = ({ text }) => <Rich text={text} lang={lang} />;
  const { whatIs, howTo, devices, why, bitrate, compare, features, uses, privacy, author, cta } = home;

  return (
    <>
      <JsonLd lang={lang} home={home} />

      {/* ---------- Hero + tool ---------- */}
      <section className="hero container" aria-labelledby="page-title">
        <h1 id="page-title">
          {home.h1} <span className="grad">{home.h1Highlight}</span>
        </h1>
        <p className="hero__lead"><R text={home.lead} /></p>
        <ul className="badges">
          {home.badges.map((b, i) => (
            <li key={b}><Icon name={BADGE_ICONS[i]} /> {b}</li>
          ))}
        </ul>
        <Converter showLink />
      </section>

      {/* ---------- Popular conversions ---------- */}
      <section className="section container" aria-labelledby="popular">
        <div className="section__head">
          <span className="eyebrow">{home.popular.eyebrow}</span>
          <h2 id="popular">{home.popular.h2}</h2>
          <p><R text={home.popular.intro} /></p>
        </div>
        <div className="grid grid-4">
          {FORMATS.map((f) => (
            <Link key={f.slug} href={localePath(lang, `/${f.slug}`)} className="card format-card">
              <span className="card__icon"><Icon name={f.tag === 'video' ? 'fileVideo' : 'fileAudio'} /></span>
              <span>
                <span className="tag">{home.popular.tags[f.tag]}</span>
                <strong>{home.popular.names[f.slug]}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container narrow">
        {/* ---------- What is ---------- */}
        <section className="section" aria-labelledby="what-is">
          <span className="eyebrow">{whatIs.eyebrow}</span>
          <h2 id="what-is">{whatIs.h2}</h2>
          {whatIs.paras.map((p) => <p key={p.slice(0, 40)}><R text={p} /></p>)}
          <figure className="figure">
            <img src="/images/mp3-converter-hero.svg" alt={whatIs.imageAlt} title={whatIs.imageAlt} width="1100" height="800" loading="lazy" />
            <figcaption>{whatIs.caption}</figcaption>
          </figure>
          <p><R text={whatIs.after} /></p>
        </section>

        {/* ---------- How to ---------- */}
        <section className="section" aria-labelledby="how-to">
          <span className="eyebrow">{howTo.eyebrow}</span>
          <h2 id="how-to">{howTo.h2}</h2>
          <p><R text={howTo.intro} /></p>
          <figure className="figure">
            <img src="/images/how-to-convert-to-mp3.svg" alt={howTo.imageAlt} title={howTo.imageAlt} width="960" height="300" loading="lazy" />
          </figure>
          <ol className="steps">
            {howTo.steps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <R text={text} />
              </li>
            ))}
          </ol>
          <div className="callout">
            <Icon name="mic" />
            <p><R text={howTo.callout} /></p>
          </div>
        </section>

        {/* ---------- Devices ---------- */}
        <section className="section" aria-labelledby="devices">
          <span className="eyebrow">{devices.eyebrow}</span>
          <h2 id="devices">{devices.h2}</h2>
          <p><R text={devices.intro} /></p>
          <Checklist items={devices.list} lang={lang} />
        </section>

        {/* ---------- Why MP3 ---------- */}
        <section className="section" aria-labelledby="why">
          <span className="eyebrow">{why.eyebrow}</span>
          <h2 id="why">{why.h2}</h2>
          <p><R text={why.intro} /></p>
          <Checklist items={why.list} lang={lang} />
        </section>

        {/* ---------- Bitrate guide ---------- */}
        <section className="section" aria-labelledby="bitrate">
          <span className="eyebrow">{bitrate.eyebrow}</span>
          <h2 id="bitrate">{bitrate.h2}</h2>
          <p><R text={bitrate.intro} /></p>
          <Table head={bitrate.head} rows={bitrate.rows} lang={lang} />
          <h3>{bitrate.tipsTitle}</h3>
          <ul>
            {bitrate.tips.map(([b, text]) => (
              <li key={b}><strong>{b}.</strong> <R text={text} /></li>
            ))}
          </ul>
        </section>

        {/* ---------- Compare formats ---------- */}
        <section className="section" aria-labelledby="compare">
          <span className="eyebrow">{compare.eyebrow}</span>
          <h2 id="compare">{compare.h2}</h2>
          <p><R text={compare.intro} /></p>
          <Table head={compare.head} rows={compare.rows} lang={lang} />
          <p><R text={compare.outro} /></p>
        </section>
      </div>

      {/* ---------- Features ---------- */}
      <section className="section container" aria-labelledby="features">
        <div className="section__head center">
          <span className="eyebrow">{features.eyebrow}</span>
          <h2 id="features">{features.h2}</h2>
          <p><R text={features.intro} /></p>
        </div>
        <figure className="figure figure--wide">
          <img src="/images/why-choose-mp3-converter.svg" alt={features.imageAlt} title={features.imageAlt} width="1100" height="520" loading="lazy" />
        </figure>
        <div className="grid grid-3">
          {features.items.map(([title, text], i) => (
            <div key={title} className="card">
              <span className="card__icon"><Icon name={FEATURE_ICONS[i]} /></span>
              <h3>{title}</h3>
              <p><R text={text} /></p>
            </div>
          ))}
        </div>
      </section>

      <div className="container narrow">
        {/* ---------- Use cases ---------- */}
        <section className="section" aria-labelledby="uses">
          <span className="eyebrow">{uses.eyebrow}</span>
          <h2 id="uses">{uses.h2}</h2>
          <div className="grid grid-2">
            {uses.items.map(([title, text], i) => (
              <div key={title} className="card">
                <span className="card__icon"><Icon name={USE_ICONS[i]} /></span>
                <h3>{title}</h3>
                <p><R text={text} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Privacy / trust ---------- */}
        <section className="section" aria-labelledby="privacy">
          <span className="eyebrow">{privacy.eyebrow}</span>
          <h2 id="privacy">{privacy.h2}</h2>
          <p><R text={privacy.text} /></p>
          <ul className="checklist">
            {privacy.list.map((item) => <li key={item}><R text={item} /></li>)}
          </ul>
          <div className="callout">
            <Icon name="info" />
            <p><R text={privacy.callout} /></p>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="section" aria-labelledby="faq">
          <span className="eyebrow">{dict.page.faq}</span>
          <h2 id="faq">{home.faqTitle}</h2>
          <div className="faq">
            {home.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p><R text={f.a} /></p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- About / E-E-A-T ---------- */}
        <section className="section" aria-labelledby="about">
          <h2 id="about" className="sr-only">{dict.page.aboutPage}</h2>
          <div className="author-box">
            <img src="/images/logo.svg" alt="" width="52" height="52" />
            <div>
              <strong>{author.title}</strong>
              <p><R text={author.text} /></p>
              <p style={{ color: 'var(--text-3)', fontSize: '.88rem' }}>{dict.page.lastUpdated}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ---------- CTA ---------- */}
      <section className="container" aria-labelledby="cta">
        <div className="cta">
          <h2 id="cta">{cta.h2}</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: 620, margin: '0 auto 22px' }}><R text={cta.text} /></p>
          <a href="#converter" className="btn-grad">
            <Icon name="upload" /> {cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
