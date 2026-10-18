import Link from 'next/link';
import { notFound } from 'next/navigation';
import Rich from './Rich';
import { LOCALE_MAP, alternatesFor, localePath } from '@/lib/i18n/config';
import { getDictionary, getPage, getReadyLocales } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';

const VARS = { email: SITE.email, domain: SITE.url.replace('https://', '') };

export async function staticPageMetadata(params, slug) {
  const { lang } = await params;
  const [page, ready] = await Promise.all([getPage(lang, slug), getReadyLocales()]);
  return { title: page.metaTitle, description: page.metaDescription, alternates: alternatesFor(lang, `/${slug}`, ready) };
}

function Block({ block, lang }) {
  const R = ({ text }) => <Rich text={text} lang={lang} vars={VARS} />;
  if (typeof block === 'string') return <p><R text={block} /></p>;
  if (block.h3) return <h3>{block.h3}</h3>;
  const items = block.check || block.ul || block.ol;
  const List = block.ol ? 'ol' : 'ul';
  return (
    <List className={block.check ? 'checklist' : undefined}>
      {items.map((it) => <li key={it.slice(0, 40)}><R text={it} /></li>)}
    </List>
  );
}

/** About, Contact, Privacy, Terms and Copyright pages, rendered from lib/content/pages.js (or a translation). */
export default async function StaticPage({ params, slug }) {
  const { lang } = await params;
  if (!LOCALE_MAP[lang]) notFound();
  const [page, dict] = await Promise.all([getPage(lang, slug), getDictionary(lang)]);
  return (
    <>
      <section className="page-hero container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href={localePath(lang, '/')}>{dict.page.breadcrumbHome}</Link></li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>
        <h1>{page.title}</h1>
        {page.lead && <p>{page.lead}</p>}
      </section>
      <div className="container narrow">
        {page.sections.map((s) => (
          <section className="section" key={s.h2}>
            <h2>{s.h2}</h2>
            {s.blocks.map((block, i) => <Block key={i} block={block} lang={lang} />)}
          </section>
        ))}
      </div>
    </>
  );
}
