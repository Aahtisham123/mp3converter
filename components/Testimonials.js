'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const RATING_WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

const BANNERS = {
  verified: { tone: 'ok', text: 'Thank you! Your email is confirmed and your review is now live with a Verified badge.' },
  'verified-pending': { tone: 'ok', text: 'Thank you! Your email is confirmed. Your review will appear after a quick check.' },
  invalid: { tone: 'err', text: 'That confirmation link is invalid or has expired. Please submit your review again.' },
};

function Stars({ value, size = 18, label }) {
  return (
    <span className="stars" style={{ '--star': `${size}px` }} role="img" aria-label={label || `${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span className="star" key={i}>
            <Icon name="star" className="star__base" />
            <span className="star__fill" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" className="star__on" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Avatar({ review }) {
  if (review.photo) {
    return <img className="t-avatar" src={review.photo} alt={`Photo of ${review.name}`} width="56" height="56" loading="lazy" />;
  }
  return (
    <span className="t-avatar t-avatar--default" aria-hidden="true">
      <Icon name="user" />
    </span>
  );
}

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};

/** Resizes an image to a square JPEG data URL so it stays small. */
function resizePhoto(file, size = 160) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - side) / 2;
      const sy = (img.naturalHeight - side) / 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('bad image'));
    };
    img.src = url;
  });
}

function ReviewCard({ review }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > 220;
  return (
    <article className="t-card">
      <span className="t-card__quote" aria-hidden="true">“</span>
      <header className="t-card__head">
        <Avatar review={review} />
        <div className="t-card__who">
          <strong className="t-card__name">{review.name}</strong>
          {review.verified ? (
            <span className="t-verified" title="Email address confirmed">
              <Icon name="check" /> Verified
            </span>
          ) : null}
        </div>
      </header>
      <div className="t-card__meta">
        <Stars value={review.rating} size={16} />
        <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
      </div>
      <p className={`t-card__text${long && !open ? ' is-clamped' : ''}`}>{review.text}</p>
      {long ? (
        <button type="button" className="t-card__more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? 'Show less' : 'Read more'}
        </button>
      ) : null}
    </article>
  );
}

function Carousel({ reviews }) {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(total);
    setPage(Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, [measure, reviews.length]);

  const go = useCallback((target) => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    const next = (target + total) % total;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  }, []);

  // Gentle autoplay that stops on hover, focus or when the visitor prefers less motion.
  useEffect(() => {
    if (paused || pages < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => go(page + 1), 6000);
    return () => clearInterval(t);
  }, [paused, pages, page, go]);

  return (
    <div
      className="t-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Customer reviews"
    >
      <div className="t-track" ref={track} tabIndex={0}>
        {reviews.map((r, i) => (
          <div className="t-slide" key={r.id} aria-roledescription="slide" aria-label={`${i + 1} of ${reviews.length}`}>
            <ReviewCard review={r} />
          </div>
        ))}
      </div>
      {pages > 1 ? (
        <div className="t-controls">
          <button type="button" className="t-arrow" onClick={() => go(page - 1)} aria-label="Previous reviews">
            <Icon name="chevronLeft" />
          </button>
          <div className="t-dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                type="button"
                key={i}
                className={`t-dot${i === page ? ' is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Show review page ${i + 1}`}
                aria-current={i === page ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="t-arrow" onClick={() => go(page + 1)} aria-label="Next reviews">
            <Icon name="chevronRight" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ReviewForm({ emailVerification, onDone }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const fileRef = useRef(null);

  const pickPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMsg({ tone: 'err', text: 'Please choose an image file (JPG, PNG or WebP).' });
      return;
    }
    try {
      setPhoto(await resizePhoto(file));
      setMsg(null);
    } catch {
      setMsg({ tone: 'err', text: 'That image could not be read. Please try another photo.' });
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!rating) {
      setMsg({ tone: 'err', text: 'Please choose a star rating.' });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          text: data.text,
          rating,
          photo,
          consent: data.consent === 'on',
          website: data.website,
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || 'Something went wrong. Please try again.');
      setMsg({ tone: 'ok', text: out.message });
      form.reset();
      setRating(0);
      removePhoto();
      onDone?.(out.status);
    } catch (err) {
      setMsg({ tone: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const shown = hover || rating;

  return (
    <form className="t-form" onSubmit={submit} noValidate>
      <div className="t-form__rating">
        <span className="t-form__label" id="rv-rating-label">Your rating</span>
        <div className="t-picker" role="radiogroup" aria-labelledby="rv-rating-label" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''} – ${RATING_WORDS[n]}`}
              className={`t-picker__star${n <= shown ? ' is-on' : ''}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
            >
              <Icon name="star" />
            </button>
          ))}
          <span className="t-picker__word" aria-live="polite">{shown ? RATING_WORDS[shown] : 'Tap a star'}</span>
        </div>
      </div>

      <div className="t-form__row">
        <label className="t-field">
          <span>Name</span>
          <input name="name" required minLength={2} maxLength={60} autoComplete="name" placeholder="e.g. Sarah K." />
        </label>
        <label className="t-field">
          <span>Email <small>(never shown publicly)</small></span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>

      <label className="t-field">
        <span>Your review</span>
        <textarea
          name="text"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder="What did you convert, and how did it go?"
        />
      </label>

      <div className="t-photo">
        {photo ? (
          <img className="t-avatar" src={photo} alt="Your photo preview" width="56" height="56" />
        ) : (
          <span className="t-avatar t-avatar--default" aria-hidden="true">
            <Icon name="user" />
          </span>
        )}
        <div>
          <label className="btn-pill t-photo__btn">
            <Icon name="upload" />
            {photo ? 'Change photo' : 'Add your photo (optional)'}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={pickPhoto} className="sr-only" />
          </label>
          {photo ? (
            <button type="button" className="t-photo__remove" onClick={removePhoto}>
              Remove
            </button>
          ) : null}
        </div>
      </div>

      {/* Honeypot for bots */}
      <label className="t-hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="t-consent">
        <input type="checkbox" name="consent" required />
        <span>
          I am a real user of MP3 Converter, and I agree that my name, photo, rating and review may be shown on this
          website.{emailVerification ? ' We will email you a link to confirm your review.' : ''}
        </span>
      </label>

      {msg ? (
        <p className={`t-msg t-msg--${msg.tone}`} role={msg.tone === 'err' ? 'alert' : 'status'}>
          {msg.text}
        </p>
      ) : null}

      <button type="submit" className="btn-grad" disabled={busy}>
        {busy ? 'Sending…' : 'Submit review'}
      </button>
    </form>
  );
}

export default function Testimonials() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [banner, setBanner] = useState(null);

  const load = useCallback(() => {
    fetch('/api/reviews', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('load'))))
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    load();
    const state = new URLSearchParams(window.location.search).get('review');
    if (state && BANNERS[state]) {
      setBanner(BANNERS[state]);
      const clean = window.location.pathname + window.location.hash;
      window.history.replaceState(null, '', clean);
    }
  }, [load]);

  const reviews = data?.reviews || [];
  const stats = data?.stats || { count: 0, average: 0, distribution: [] };
  const hasReviews = reviews.length > 0;
  const formOpen = showForm || (data && !hasReviews);

  return (
    <div className="testimonials">
      {banner ? <p className={`t-msg t-msg--${banner.tone} t-banner`} role="status">{banner.text}</p> : null}

      <div className="t-summary">
        <div className="t-score">
          <span className="t-score__num">{hasReviews ? stats.average.toFixed(1) : '–'}</span>
          <div>
            <Stars value={stats.average} size={22} label={hasReviews ? `Average rating ${stats.average} out of 5` : 'No ratings yet'} />
            <p className="t-score__count">
              {hasReviews
                ? `Based on ${stats.count} review${stats.count === 1 ? '' : 's'}`
                : data
                  ? 'No reviews yet'
                  : 'Loading reviews…'}
            </p>
          </div>
        </div>
        {hasReviews ? (
          <ul className="t-bars" aria-label="Rating breakdown">
            {stats.distribution.map((d) => (
              <li key={d.stars}>
                <span className="t-bars__label">{d.stars}<Icon name="star" /></span>
                <span className="t-bars__track">
                  <span className="t-bars__fill" style={{ width: `${stats.count ? (d.count / stats.count) * 100 : 0}%` }} />
                </span>
                <span className="t-bars__n">{d.count}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {hasReviews ? (
          <button type="button" className="btn-grad t-write" onClick={() => setShowForm((v) => !v)} aria-expanded={Boolean(formOpen)}>
            <Icon name="edit" /> {formOpen ? 'Close form' : 'Write a review'}
          </button>
        ) : null}
      </div>

      {hasReviews ? <Carousel reviews={reviews} /> : null}

      {!hasReviews && data ? (
        <div className="t-empty">
          <Icon name="sparkles" />
          <p>
            <strong>Be the first to review MP3 Converter.</strong> Tell other people how your conversion went. Your
            feedback helps us improve the tool.
          </p>
        </div>
      ) : null}

      {failed ? <p className="t-msg t-msg--err">Reviews could not be loaded right now. Please refresh the page.</p> : null}

      {formOpen ? (
        data?.configured === false ? (
          <p className="t-msg t-msg--info">Reviews open soon. Thank you for your patience!</p>
        ) : (
          <ReviewForm emailVerification={data?.emailVerification} onDone={(status) => status === 'published' && load()} />
        )
      ) : null}
    </div>
  );
}
