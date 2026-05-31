import { useEffect, useState } from 'react';

const RULES = [
  {
    n: '01',
    title: 'Don’t just say “hi”.',
    body: 'A lone “hi” or “you there?” is a ping that costs me a context switch and gives you nothing back. State your actual message in the first line. I will read it faster, reply sooner, and like you more for it.',
    bad: 'hey noah\nyou there?',
    good: 'hey noah, quick one: are you free this week to take a look at a Discord bot embed redesign? budget ~300 robux, due Friday.',
    ref: 'nohello.net',
  },
  {
    n: '02',
    title: 'Don’t ask to ask. Just ask.',
    body: 'Skip “can I ask you a question?”. The answer is always yes, but now you’ve added a round trip. Ask the real question. If I can’t help I’ll tell you, and if I can, we’re already moving.',
    bad: 'can i ask u something about react?',
    good: 'in react, my useEffect runs twice on mount in dev. is that strict mode or am i doing something wrong? here’s the snippet: [code]',
    ref: 'dontasktoask.com',
  },
  {
    n: '03',
    title: 'Front-load the context.',
    body: 'Tell me what it is, what you’ve tried, and what you want from me. “I need help” is not a brief. A two-sentence summary up front saves us 10 messages of back-and-forth.',
    bad: 'can u help me with my server',
    good: 'I run a 400-member Discord server. The welcome embed looks off on mobile (screenshot attached). I want it rebuilt to match my brand colors (#0a0a0a / #fff). Have you done this before?',
  },
  {
    n: '04',
    title: 'One DM, not 17.',
    body: 'Don’t spread one thought across a dozen messages. Each ping pulls me back. Compose the whole thing, then send it.',
    bad: 'hey\nso\nlike\ni was wondering\nif u could maybe\ndo something for me\nidk\n (i do this all the time, it’s a bad habit)',
    good: 'hey, wondering if you could design a Discord giveaway embed for my server. Theme: dark / minimal. Budget: 250 robux. Need it by next Sunday. Let me know if you’re open.',
  },
  {
    n: '05',
    title: 'If it’s work, say so up front.',
    body: 'Lead with: what, when, budget. Most ghosting happens because someone hides the brief behind “hey can we chat”. I’d rather know in line one if this is a paid project, a collab, or just a question.',
    good: '[PAID] need 3 Discord embeds (rules, welcome, giveaway). 700 robux total. Want them by end of next week. Examples of my server attached.',
  },
  {
    n: '06',
    title: 'Search first.',
    body: 'If the answer lives on this site, my pinned posts, or the first page of Google, please check before pinging. Respect for your time too: you’ll get an answer in 30 seconds instead of 30 hours.',
  },
  {
    n: '07',
    title: 'Be patient. I’m one person.',
    body: 'I read every DM. I don’t reply to every DM the same day. If it’s urgent, say so and tell me why. Don’t just send “???” four hours later. That’s the fastest way to the bottom of the queue.',
  },
  {
    n: '08',
    title: 'No, I won’t “jump on a quick call”.',
    body: 'Default to async. If text genuinely won’t work, suggest a time window and an agenda. Calls without an agenda eat hours; well-scoped 15-minute calls are great.',
  },
];

const STATUSES = [
  {
    key: 'online',
    label: 'Online',
    color: 'Green',
    body: 'Good to DM, will respond ASAP.',
  },
  {
    key: 'dnd',
    label: 'DND',
    color: 'Red',
    body: 'Delayed responses, may take a bit.',
  },
  {
    key: 'idle',
    label: 'Idle',
    color: 'Yellow',
    body: 'Either playing a game or sleeping. Response times vary.',
  },
  {
    key: 'offline',
    label: 'Invisible / Offline',
    color: 'Gray',
    body: 'Not available.',
  },
];

const TLDR = [
  'Skip “hi”. Just say the thing.',
  'Don’t ask to ask. Just ask.',
  'Front-load context: what, when, budget.',
  'Send one message, not seventeen.',
  'If it’s paid work, label it [PAID].',
  'Search before pinging.',
  'I read every DM. I’m one person.',
];

export default function BeforeDM({ onNavigate }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.background = '#000';
    return () => { document.body.style.background = ''; };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://qxis.site/dm');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="cn-root cn-bdm">
      <div className="cn-grain" aria-hidden />
      <div className="cn-vignette" aria-hidden />

      <header className="cn-nav is-scrolled">
        <div className="cn-nav-inner">
          <button onClick={() => onNavigate('/')} className="cn-mark cn-back">
            <span className="cn-back-arrow">←</span>
            <em>back to qxis</em>
          </button>
          <nav className="cn-nav-links">
            <button onClick={copyLink} className="cn-link-btn">
              {copied ? 'Copied ✓' : 'Copy link'}
            </button>
          </nav>
        </div>
      </header>

      <main className="cn-bdm-body">
        <section className="cn-bdm-head">
          <span className="cn-eyebrow"><span className="cn-dot" /> Read before DMing me pls</span>
          <h1 className="cn-bdm-title">
            <span>before you DM me</span>
          </h1>
          <p className="cn-lede">
            I love hearing from people. I also get a lot of messages.
            This page is here so we both get more out of the conversation.
            You get a faster, better reply, and I get to spend my time actually helping
            instead of decoding 14 one-word pings.
          </p>
          <p className="cn-bdm-sub">
            Inspired by <a href="https://nohello.net" target="_blank" rel="noreferrer">nohello.net</a> and{' '}
            <a href="https://dontasktoask.com" target="_blank" rel="noreferrer">dontasktoask.com</a>.
            None of this is meant to be rude. 
          </p>
        </section>

        <section className="cn-bdm-status">
          <div className="cn-status-head">
            <span className="cn-tldr-label">my status</span>
            <p className="cn-status-intro">
              Check my Discord status before pinging. Here’s what each one means:
            </p>
          </div>
          <ul className="cn-status-list">
            {STATUSES.map((s) => (
              <li key={s.key} className={`cn-status-row cn-status-${s.key}`}>
                <span className="cn-status-dot" aria-hidden />
                <div className="cn-status-text">
                  <span className="cn-status-name">
                    {s.label} <em>({s.color})</em>
                  </span>
                  <span className="cn-status-body">{s.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="cn-bdm-tldr">
          <span className="cn-tldr-label">tl;dr</span>
          <ul className="cn-tldr-list">
            {TLDR.map((t, i) => (
              <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>
            ))}
          </ul>
        </section>

        <section className="cn-bdm-rules">
          {RULES.map((r) => (
            <article key={r.n} className="cn-rule">
              <header className="cn-rule-head">
                <span className="cn-rule-n">{r.n}</span>
                <h2 className="cn-rule-title">{r.title}</h2>
                {r.ref && <span className="cn-rule-ref">via {r.ref}</span>}
              </header>
              <p className="cn-rule-body">{r.body}</p>

              {(r.bad || r.good) && (
                <div className="cn-rule-examples">
                  {r.bad && (
                    <div className="cn-rule-ex cn-rule-ex-bad">
                      <span className="cn-rule-ex-label">don’t</span>
                      <pre>{r.bad}</pre>
                    </div>
                  )}
                  {r.good && (
                    <div className="cn-rule-ex cn-rule-ex-good">
                      <span className="cn-rule-ex-label">do</span>
                      <pre>{r.good}</pre>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </section>

        <section className="cn-bdm-cta">
          <h3 className="cn-bdm-cta-title">
            cool? <span className="cn-italic">cool.</span>
          </h3>
          <p className="cn-lede">
            If you read this far, you’re already going to send a great message. Go ahead.
          </p>
          <div className="cn-bdm-cta-row">
            <button onClick={() => onNavigate('/')} className="cn-cta">
              back home <span>↗</span>
            </button>
            <button onClick={copyLink} className="cn-cta cn-cta-ghost">
              {copied ? 'link copied ✓' : 'share this page'} <span>↗</span>
            </button>
          </div>
        </section>

        <footer className="cn-archive-footer">
          <span>{String(RULES.length).padStart(2, '0')} RULES</span>
          <span>BEFORE.YOU.DM  .  QXIS</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
