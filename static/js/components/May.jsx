import { useEffect, useState } from 'react';

const RESOURCES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    detail: 'call or text 988. free, 24/7, US.',
    href: 'tel:988',
  },
  {
    name: 'Crisis Text Line',
    detail: 'text HOME to 741741. they actually text back.',
    href: 'sms:741741&body=HOME',
  },
  {
    name: 'Trevor Project',
    detail: 'for LGBTQ+ youth. call 1-866-488-7386 or text START to 678-678.',
    href: 'https://www.thetrevorproject.org/get-help/',
  },
  {
    name: 'SAMHSA Helpline',
    detail: '1-800-662-4357. mental health and substance stuff, free, confidential.',
    href: 'tel:18006624357',
  },
  {
    name: 'findahelpline.com',
    detail: 'not in the US? type your country in and it gives you a number that actually works there.',
    href: 'https://findahelpline.com',
  },
];

export default function May({ onNavigate }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.background = '#000';
    return () => { document.body.style.background = ''; };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://qxis.site/may');
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
          <span className="cn-eyebrow"><span className="cn-dot" /> may is mental health month</span>
          <h1 className="cn-bdm-title">
            <span>it’s may</span>
          </h1>
          <p className="cn-lede">
            may is mental health awareness month. over 280 million people worldwide suffer from depression.
            280 million.
            280,000,000.
            depression is one of the main causes of suicide.
            suicide is one of the most common ways to die because of mental health.
            around 740,000 individuals die of suicide yearly.
            740 thousand.
            740,000.
            for every death by suicide there are about 20 attempts.
            14 million attempts yearly.
            14 million.
            14,000,000.
            you are not alone
            you are loved
            feel free to dm me to talk about mental health.

          </p>
          <p className="cn-bdm-sub">
            last night i was getting food and i saw this old man (70s, all alone). i decided to talk to and ask him how he's doing, then he started crying, crying crying crying, i asked "what's wrong!?", he told me his wife just left him, he said "i feel so alone". he told me it's his birthday in a few days. i think i will get him something, even something little.
          </p>
        </section>

        <section className="cn-bdm-rules">
          <article className="cn-rule">
            <header className="cn-rule-head">
              <span className="cn-rule-n">01</span>
              <h2 className="cn-rule-title">im not a therapist and i’m not gonna pretend i know it all</h2>
            </header>
            <p className="cn-rule-body">
              i build things like websites and discord bots. i don’t have a psychology degree i’m not going to
              tell you "i get it" because honestly everybody’s version of not being okay is different
              and i’m not gonna flatten yours into mine. what i can tell you is that the years where
              i was the most quiet about how i felt were also the worst years and i wish past me had
              just told somebody. anybody. literally one person.
            </p>
          </article>

          <article className="cn-rule">
            <header className="cn-rule-head">
              <span className="cn-rule-n">02</span>
              <h2 className="cn-rule-title">getting help is not a big dramatic thing.</h2>
            </header>
            <p className="cn-rule-body">
              i used to imagine it like a movie scene. you walk in, you sit on a couch, you cry, and
              then your life is fixed. it’s not that. it’s usually a slightly awkward first appointment
              where you don’t know what to say and the person across from you is patient about it.
              it’s a text to a friend that says “hey can i be weird for a sec”. it’s telling your mom
              one true thing instead of the version where you’re fine. it starts small. it’s allowed
              to start small.
            </p>
          </article>

          <article className="cn-rule">
            <header className="cn-rule-head">
              <span className="cn-rule-n">03</span>
              <h2 className="cn-rule-title">the “i don’t wanna bother anyone” thing.</h2>
            </header>
            <p className="cn-rule-body">
              i know that one. that one is a liar. the people who love you would rather get a 2am
              message that scares them than find out months later you’ve been drowning quietly the
              whole time. you are not the burden you think you are. nobody who actually cares about
              you is keeping a tally. and if they are, they’re not your people, find better ones, they
              exist i promise.
            </p>
          </article>

          <article className="cn-rule">
            <header className="cn-rule-head">
              <span className="cn-rule-n">04</span>
              <h2 className="cn-rule-title">tiny things still count.</h2>
            </header>
            <p className="cn-rule-body">
              drinking water. opening a window. eating something that isn’t coffee. going outside for
              ten minutes even tho you don’t want to. people online act like none of that matters
              compared to “real” help but they’re wrong, it stacks. on the days i couldn’t do the big
              stuff, the only thing that kept me from sliding further was the dumb little stuff. a
              shower is not a personality, but on a bad day it’s a victory.
            </p>
          </article>

          <article className="cn-rule">
            <header className="cn-rule-head">
              <span className="cn-rule-n">05</span>
              <h2 className="cn-rule-title">if you’re in it right now.</h2>
            </header>
            <p className="cn-rule-body">
              if you opened this page and your chest is tight and the thoughts are loud, please just
              text or call one of the numbers below. it’s free. you don’t have to be at a “bad enough”
              level to use them. there is no bar. if your brain is hurting, that is enough. you can
              hang up the second it feels weird. you can text instead of call if talking is too much.
              you don’t even have to know what to say, they’re used to silence.
            </p>
          </article>
        </section>

        <section className="cn-bdm-status">
          <div className="cn-status-head">
            <span className="cn-tldr-label">if you need someone right now</span>
            <p className="cn-status-intro">
              these are all free and people answer them. you don’t owe anyone an explanation for
              using them.
            </p>
          </div>
          <ul className="cn-status-list">
            {RESOURCES.map((r) => (
              <li key={r.name} className="cn-status-row cn-status-online">
                <span className="cn-status-dot" aria-hidden />
                <div className="cn-status-text">
                  <span className="cn-status-name">
                    <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {r.name}
                    </a>
                  </span>
                  <span className="cn-status-body">{r.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="cn-bdm-cta">
          <h3 className="cn-bdm-cta-title">
            that’s it, <span className="cn-italic">take care of yourself :)</span>
          </h3>
          <p className="cn-lede">
            
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
          <span>MAY  .  MENTAL HEALTH MONTH</span>
          <span>YOU.MATTER  .  QXIS</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
