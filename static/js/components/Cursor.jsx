import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const hover   = useRef(false);
  const click   = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    let raf;
    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) hover.current = true;
    };
    const onOut  = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) hover.current = false;
    };
    const onDown = () => { click.current = true; };
    const onUp   = () => { click.current = false; };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      const isHover = hover.current;
      const isClick = click.current;
      const ringSize = isHover ? 44 : isClick ? 26 : 30;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 2}px, ${mouse.current.y - 2}px)`;
        dotRef.current.style.opacity = isHover ? '0' : '1';
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - ringSize/2}px, ${ring.current.y - ringSize/2}px)`;
        ringRef.current.style.width  = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.borderColor = isHover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
      }

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 4, height: 4, borderRadius: '50%',
          background: '#fff',
          zIndex: 99999, pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'opacity 0.18s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 30, height: 30, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          zIndex: 99998, pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s ease',
        }}
      />
    </>
  );
}
