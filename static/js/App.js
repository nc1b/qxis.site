import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import './styles.css';
import Home from './components/Home';
import Archive from './components/Archive';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import BeforeDM from './components/BeforeDM';
import May from './components/May';
import { useRoute, matchWork, matchBeforeDM, matchMay } from './hooks/useRoute';

const TITLE = 'qxis.site | Portfolio';

export default function App() {
  const { path, navigate } = useRoute();
  const isWork = matchWork(path);
  const isBeforeDM = matchBeforeDM(path);
  const isMay = matchMay(path);

  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    window.lenis = lenis;
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); delete window.lenis; };
  }, []);

  useEffect(() => {
    let index = 0, deleting = false, alive = true, timeout;
    const title = isMay
      ? 'May . mental health month . qxis.site'
      : isBeforeDM
        ? 'Before you DM me . qxis.site'
        : isWork
          ? 'Archive . qxis.site'
          : TITLE;

    const tick = () => {
      if (!alive) return;
      if (!deleting) {
        index++;
        document.title = title.slice(0, index);
        timeout = setTimeout(tick, index === title.length ? 25000 : 80);
        if (index === title.length) deleting = true;
      } else {
        index--;
        document.title = title.slice(0, index);
        if (index === 0) { deleting = false; timeout = setTimeout(tick, 3000); }
        else timeout = setTimeout(tick, 50);
      }
    };
    timeout = setTimeout(tick, 300);
    return () => { alive = false; clearTimeout(timeout); };
  }, [isWork, isBeforeDM, isMay]);

  if (isMay) {
    return (
      <>
        <Cursor />
        <May onNavigate={navigate} />
      </>
    );
  }

  if (isBeforeDM) {
    return (
      <>
        <Cursor />
        <BeforeDM onNavigate={navigate} />
      </>
    );
  }

  if (isWork) {
    return (
      <>
        <Cursor />
        <Archive onNavigate={navigate} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Cursor />
      <Home
        onContact={() => setContactOpen(true)}
        onNavigate={navigate}
      />
      {contactOpen && <Contact onClose={() => setContactOpen(false)} />}
    </div>
  );
}
