import Link from 'next/link';

export default function SimplePage({ title, lead, children }) {
  return (
    <>
      <section className="page-hero container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </section>
      <div className="container narrow">{children}</div>
    </>
  );
}
