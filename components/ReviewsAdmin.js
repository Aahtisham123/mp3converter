'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ReviewsAdmin() {
  const [key, setKey] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const call = useCallback(
    async (method, body) => {
      const res = await fetch('/api/reviews/admin', {
        method,
        headers: { 'x-admin-key': key, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || `Error ${res.status}`);
      return out;
    },
    [key]
  );

  const load = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      setData(await call('GET'));
      try { sessionStorage.setItem('rv-admin', key); } catch {}
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setBusy(false);
    }
  }, [call, key]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('rv-admin');
      if (saved) setKey(saved);
    } catch {}
  }, []);

  const act = async (action, id) => {
    if (action === 'delete' && !window.confirm('Delete this review permanently?')) return;
    setBusy(true);
    try {
      await call('POST', { action, id });
      setData(await call('GET'));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const List = ({ title, items, pending }) => (
    <section className="section">
      <h2>{title} ({items.length})</h2>
      {items.length === 0 ? <p>Nothing here.</p> : null}
      <div className="admin-reviews">
        {items.map((r) => (
          <article key={r.id} className="admin-review">
            <div className="admin-review__head">
              {r.photo ? <img src={r.photo} alt="" width="44" height="44" /> : null}
              <div>
                <strong>{r.name}</strong> · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                <br />
                <small>
                  {r.email} · {new Date(r.createdAt).toLocaleString()} · {r.verified ? 'email verified' : r.status === 'unverified' ? 'email NOT confirmed yet' : 'not verified'}
                </small>
              </div>
            </div>
            <p>{r.text}</p>
            <div className="admin-review__actions">
              {pending ? (
                <button type="button" className="btn-grad" disabled={busy} onClick={() => act('approve', r.id)}>
                  Approve
                </button>
              ) : null}
              <button type="button" className="btn-outline" disabled={busy} onClick={() => act('delete', r.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  return (
    <div>
      <form
        className="admin-login"
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
      >
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin key (REVIEWS_ADMIN_KEY)" autoComplete="current-password" />
        <button type="submit" className="btn-grad" disabled={busy || !key}>
          {data ? 'Refresh' : 'Open'}
        </button>
      </form>
      {error ? <p className="t-msg t-msg--err">{error}</p> : null}
      {data ? (
        <>
          <List title="Waiting for approval" items={data.pending} pending />
          <List title="Published" items={data.approved} />
        </>
      ) : null}
    </div>
  );
}
