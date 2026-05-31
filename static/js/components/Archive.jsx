import { useEffect, useState } from 'react';

const WORKS = [
  { src: '/work/embed (1).png',  title: 'Retirement',        tag: 'Embed' },
  { src: '/work/embed (2).png',  title: 'Session Starting',  tag: 'Embed' },
  { src: '/work/embed (3).png',  title: 'Giveaway',          tag: 'Embed' },
  { src: '/work/embed (4).png',  title: 'Staff Infraction',  tag: 'Embed' },
  { src: '/work/embed (5).png',  title: 'Dashboard',         tag: 'Embed' },
  { src: '/work/embed (6).png',  title: 'Marketplace',       tag: 'Embed' },
  { src: '/work/embed (7).png',  title: 'Ordering',          tag: 'Embed' },
  { src: '/work/embed (8).png',  title: 'Bot Profile',       tag: 'Embed' },
  { src: '/work/embed (9).png',  title: 'Welcome',           tag: 'Embed' },
  { src: '/work/embed (10).png', title: 'Bot Profile',       tag: 'Embed' },
];

export default function Archive({ onNavigate }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (active === null) return;
      if (e.key === 'Escape')      setActive(null);
      if (e.key === 'ArrowRight')  setActive((i) => (i + 1) % WORKS.length);
      if (e.key === 'ArrowLeft')   setActive((i) => (i - 1 + WORKS.length) % WORKS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="cn-root cn-archive">
      <div className="cn-grain" aria-hidden />
      <div className="cn-vignette" aria-hidden />

      <header className="cn-nav is-scrolled">
        <div className="cn-nav-inner">
          <button onClick={() => onNavigate('/')} className="cn-mark cn-back">
            <span className="cn-back-arrow">←</span>
            <em>back to qxis</em>
          </button>
          <nav className="cn-nav-links">
            <span className="cn-link-btn">Archive</span>
          </nav>
        </div>
      </header>

      <main className="cn-archive-body">
        <section className="cn-archive-head">
          <h1 className="cn-archive-title">
            <span>embeds</span>
            <span className="cn-italic">&amp; designs.</span>
          </h1>
          <p className="cn-lede">
            A running collection of embeds, branding, and visual systems built for clients and personal work.
          </p>
        </section>

        <section className="cn-archive-grid">
          {WORKS.map((w, i) => (
            <WorkCard key={w.src} work={w} index={i} onOpen={() => setActive(i)} />
          ))}
        </section>

        <footer className="cn-archive-footer">
          <span>{String(WORKS.length).padStart(2, '0')} ITEMS</span>
          <span>ARCHIVE  .  QXIS</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>

      {active !== null && (
        <Lightbox
          work={WORKS[active]}
          index={active}
          total={WORKS.length}
          onClose={() => setActive(null)}
          onPrev={() => setActive((i) => (i - 1 + WORKS.length) % WORKS.length)}
          onNext={() => setActive((i) => (i + 1) % WORKS.length)}
        />
      )}
    </div>
  );
}

function WorkCard({ work, index, onOpen }) {
  const [errored, setErrored] = useState(false);
  return (
    <button className="cn-wc" onClick={onOpen}>
      <div className="cn-wc-frame">
        {!errored ? (
          <img
            src={`${process.env.PUBLIC_URL}${work.src}`}
            alt={work.title}
            onError={() => setErrored(true)}
            loading="lazy"
          />
        ) : (
          <div className="cn-wc-missing">missing</div>
        )}
        <div className="cn-wc-overlay" />
      </div>
      <div className="cn-wc-meta">
        <span className="cn-wc-idx">{String(index + 1).padStart(2, '0')}</span>
        <span className="cn-wc-title">{work.title}</span>
        <span className="cn-wc-arrow">↗</span>
      </div>
    </button>
  );
}

function Lightbox({ work, index, total, onClose, onPrev, onNext }) {
  return (
    <div className="cn-lb" onClick={onClose}>
      <button className="cn-lb-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
        close ✕
      </button>

      <button
        className="cn-lb-nav cn-lb-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="previous"
      >←</button>
      <button
        className="cn-lb-nav cn-lb-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="next"
      >→</button>

      <div className="cn-lb-stage" onClick={(e) => e.stopPropagation()}>
        <img src={`${process.env.PUBLIC_URL}${work.src}`} alt={work.title} />
        <div className="cn-lb-meta">
          <span className="cn-lb-title">{work.title}</span>
          <span className="cn-lb-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
