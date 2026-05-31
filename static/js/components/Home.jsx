import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { projects, skills } from '../data';

function FX() {
  return (
    <>
      <div className="cn-grain" aria-hidden />
      <div className="cn-vignette" aria-hidden />
    </>
  );
}

function CursorLight() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 300}px,${y - 300}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, []);
  return <div ref={ref} className="cn-cursor-light" aria-hidden />;
}

function useDragRef() {
  const drag = useRef({ yaw: 0, pitch: 0, active: false, lastX: 0, lastY: 0 });
  useEffect(() => {
    const onDown = (e) => {
      if (e.button !== 0) return;
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      document.body.classList.add('cn-dragging');
    };
    const onUp = () => {
      drag.current.active = false;
      document.body.classList.remove('cn-dragging');
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.yaw   += dx * 0.005;
      drag.current.pitch += dy * 0.005;
      drag.current.pitch = Math.max(-1.2, Math.min(1.2, drag.current.pitch));
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('cn-dragging');
    };
  }, []);
  return drag;
}

function useScrollRef() {
  const ref = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return ref;
}

const POINT_COUNT = 6000;

function shapeGalaxy(n, radius = 5.5, arms = 4) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.6) * radius;
    const arm = (i % arms) * (Math.PI * 2 / arms);
    const spin = r * 0.55;
    const angle = arm + spin + (Math.random() - 0.5) * 0.4;
    const scatter = (1 - r / radius) * 0.6 + 0.05;
    a[i*3]   = Math.cos(angle) * r + (Math.random() - 0.5) * scatter;
    a[i*3+1] = (Math.random() - 0.5) * 0.4 * (1 - r / radius * 0.6);
    a[i*3+2] = Math.sin(angle) * r + (Math.random() - 0.5) * scatter;
  }
  return a;
}

function shapeBarredGalaxy(n, radius = 5.6, barLen = 2.6) {
  const a = new Float32Array(n * 3);
  const barFrac = 0.28;
  for (let i = 0; i < n; i++) {
    if (i / n < barFrac) {
      const t = (Math.random() * 2 - 1);
      a[i*3]   = t * barLen + (Math.random() - 0.5) * 0.25;
      a[i*3+1] = (Math.random() - 0.5) * 0.18;
      a[i*3+2] = (Math.random() - 0.5) * 0.35;
    } else {
      const r = barLen + Math.pow(Math.random(), 0.55) * (radius - barLen);
      const side = i % 2 === 0 ? 0 : Math.PI;
      const spin = (r - barLen) * 0.75;
      const angle = side + spin + (Math.random() - 0.5) * 0.35;
      const scatter = (1 - r / radius) * 0.55 + 0.05;
      a[i*3]   = Math.cos(angle) * r + (Math.random() - 0.5) * scatter;
      a[i*3+1] = (Math.random() - 0.5) * 0.35 * (1 - r / radius * 0.6);
      a[i*3+2] = Math.sin(angle) * r + (Math.random() - 0.5) * scatter;
    }
  }
  return a;
}

function shapeRingedPlanet(n, coreR = 1.6, ringInner = 2.4, ringOuter = 5.0) {
  const a = new Float32Array(n * 3);
  const coreFrac = 0.35;
  for (let i = 0; i < n; i++) {
    if (i / n < coreFrac) {
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = coreR * Math.cbrt(Math.random());
      a[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      a[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      a[i*3+2] = r * Math.cos(phi);
    } else {
      const theta = Math.random() * Math.PI * 2;
      const r = ringInner + Math.pow(Math.random(), 0.8) * (ringOuter - ringInner);
      const gap = Math.sin((r - ringInner) * 4.0) * 0.15;
      const rr = r + gap;
      a[i*3]   = Math.cos(theta) * rr;
      a[i*3+1] = (Math.random() - 0.5) * 0.08;
      a[i*3+2] = Math.sin(theta) * rr;
    }
  }
  return a;
}

function shapeCluster(n, radius = 4.2) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random(), v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const g = (Math.random() + Math.random() + Math.random()) / 3;
    const r = radius * Math.pow(g, 1.6);
    a[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    a[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    a[i*3+2] = r * Math.cos(phi);
  }
  return a;
}

function shapeAccretionDisk(n, inner = 0.9, outer = 5.2) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = inner + Math.pow(Math.random(), 1.6) * (outer - inner);
    const warp = Math.sin(theta * 2) * 0.12 * (r / outer);
    const thickness = 0.05 + (r / outer) * 0.18;
    a[i*3]   = Math.cos(theta) * r;
    a[i*3+1] = (Math.random() - 0.5) * thickness + warp;
    a[i*3+2] = Math.sin(theta) * r;
  }
  return a;
}

function shapeSupernova(n, radius = 5.8, filaments = 18) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random(), v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const fil = Math.floor(Math.random() * filaments);
    const fJitter = (fil / filaments - 0.5) * 0.6;
    const t = Math.pow(Math.random(), 1.8);
    const r = radius * t;
    const dirX = Math.sin(phi) * Math.cos(theta + fJitter);
    const dirY = Math.sin(phi) * Math.sin(theta + fJitter);
    const dirZ = Math.cos(phi);
    const noise = (1 - t) * 0.4 + 0.05;
    a[i*3]   = dirX * r + (Math.random() - 0.5) * noise;
    a[i*3+1] = dirY * r + (Math.random() - 0.5) * noise;
    a[i*3+2] = dirZ * r + (Math.random() - 0.5) * noise;
  }
  return a;
}

function shapeText(n, text, { width = 12, height = 4 } = {}) {
  const a = new Float32Array(n * 3);
  if (typeof document === 'undefined') return a;

  const PX_W = 1024, PX_H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = PX_W; canvas.height = PX_H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, PX_W, PX_H);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let fontSize = 260;
  ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
  while (ctx.measureText(text).width > PX_W * 0.92 && fontSize > 40) {
    fontSize -= 10;
    ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
  }
  ctx.fillText(text, PX_W / 2, PX_H / 2);

  const data = ctx.getImageData(0, 0, PX_W, PX_H).data;
  const pts = [];
  const step = 3;
  for (let y = 0; y < PX_H; y += step) {
    for (let x = 0; x < PX_W; x += step) {
      if (data[(y * PX_W + x) * 4] > 128) pts.push([x, y]);
    }
  }
  if (pts.length === 0) return a;

  const sx = width / PX_W;
  const sy = height / PX_H;
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[Math.floor(Math.random() * pts.length)];
    a[i*3]   = (px - PX_W / 2) * sx + (Math.random() - 0.5) * 0.04;
    a[i*3+1] = -(py - PX_H / 2) * sy + (Math.random() - 0.5) * 0.04;
    a[i*3+2] = (Math.random() - 0.5) * 0.15;
  }
  return a;
}

function DotCloud({ progress, viewCount }) {
  const pointsRef = useRef();
  const positionsRef = useRef(new Float32Array(POINT_COUNT * 3));
  const current = useRef(new Float32Array(POINT_COUNT * 3));

  const shapes = useMemo(() => {
    const countText = viewCount == null ? '' : viewCount.toLocaleString();
    return [
      shapeGalaxy(POINT_COUNT),
      shapeBarredGalaxy(POINT_COUNT),
      shapeRingedPlanet(POINT_COUNT),
      shapeCluster(POINT_COUNT),
      shapeAccretionDisk(POINT_COUNT),
      countText
        ? shapeText(POINT_COUNT, countText)
        : shapeSupernova(POINT_COUNT),
    ];
  }, [viewCount]);

  useMemo(() => {
    current.current.set(shapes[0]);
    positionsRef.current.set(shapes[0]);
  }, [shapes]);

  useFrame((state, dt) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const stages = shapes.length;
    const idx = Math.min(stages - 2, Math.floor(p * (stages - 1)));
    const local = (p * (stages - 1)) - idx;
    const eased = local < 0.5
      ? 2 * local * local
      : 1 - Math.pow(-2 * local + 2, 2) / 2;
    const a = shapes[idx];
    const b = shapes[idx + 1];

    const arr = current.current;
    const out = positionsRef.current;
    const lerpRate = 1 - Math.pow(0.001, dt);

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;
      const tx = a[i3]   + (b[i3]   - a[i3])   * eased;
      const ty = a[i3+1] + (b[i3+1] - a[i3+1]) * eased;
      const tz = a[i3+2] + (b[i3+2] - a[i3+2]) * eased;
      arr[i3]   += (tx - arr[i3])   * lerpRate;
      arr[i3+1] += (ty - arr[i3+1]) * lerpRate;
      arr[i3+2] += (tz - arr[i3+2]) * lerpRate;

      out[i3]   = arr[i3]   + Math.sin(t * 0.6 + i * 0.013) * 0.04;
      out[i3+1] = arr[i3+1] + Math.cos(t * 0.4 + i * 0.011) * 0.04;
      out[i3+2] = arr[i3+2] + Math.sin(t * 0.5 + i * 0.017) * 0.04;
    }

    const attr = pointsRef.current.geometry.attributes.position;
    attr.array = out;
    attr.needsUpdate = true;

    pointsRef.current.rotation.y += dt * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={POINT_COUNT}
          array={positionsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function StarHalo({ count = 1800, radius = 30 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius + Math.random() * 10;
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.008;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#ffffff" sizeAttenuation transparent opacity={0.4} depthWrite={false} />
    </points>
  );
}

function OrbitalCamera({ progress, drag }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const yaw = useRef(0);
  const pitch = useRef(0);

  useFrame(() => {
    yaw.current   += (drag.current.yaw   - yaw.current)   * 0.12;
    pitch.current += (drag.current.pitch - pitch.current) * 0.12;

    const p = progress.current;
    const dist = 11 - Math.sin(p * Math.PI) * 3.5;
    const scrollYaw   = p * Math.PI * 0.6;
    const scrollPitch = Math.sin(p * Math.PI * 1.4) * 0.25;

    const yA = yaw.current   + scrollYaw;
    const pA = pitch.current + scrollPitch;

    const x = Math.sin(yA) * Math.cos(pA) * dist;
    const y = Math.sin(pA) * dist;
    const z = Math.cos(yA) * Math.cos(pA) * dist;

    camera.position.set(x, y, z);
    camera.lookAt(target.current);
  });

  return null;
}

function Scene({ progress, drag, viewCount }) {
  return (
    <>
      <color attach="background" args={[0x000000]} />
      <fog attach="fog" args={['#000', 14, 38]} />
      <ambientLight intensity={0.5} />
      <OrbitalCamera progress={progress} drag={drag} />
      <StarHalo />
      <DotCloud progress={progress} viewCount={viewCount} />
    </>
  );
}

function useViewCount() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const ns = 'qxis-dev';
    const key = 'views';
    const url = `https://abacus.jasoncameron.dev/hit/${ns}/${key}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (typeof d?.value === 'number') setCount(d.value);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return count;
}

function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="cn-rail" style={{ scaleX }} />;
}

function Nav({ onContact, onWork }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onS);
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return (
    <header className={`cn-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="cn-nav-inner">
        <div className="cn-mark">
          <img
            src={`${process.env.PUBLIC_URL}/profile.png`}
            alt="qxis"
            className="cn-avatar"
          />
          <em>qxis</em>
        </div>
        <nav className="cn-nav-links">
          <button onClick={onWork} className="cn-link-btn">Archive</button>
          <button onClick={onContact} className="cn-cta">Contact <span>↗</span></button>
        </nav>
      </div>
    </header>
  );
}

function HeroOverlay() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.06], [0, -30]);
  return (
    <motion.div className="cn-stage cn-stage-hero" style={{ opacity, y }}>
      <h1 className="cn-display">
        <span className="cn-italic">this is</span>
        <span className="cn-shine">qxis.</span>
      </h1>
      <p className="cn-lede" style={{ maxWidth: 520 }}>
        Two years building Discord bots, web platforms, and visual systems.
        Code, interface, motion, ship.
      </p>
    </motion.div>
  );
}

function AboutOverlay() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.13, 0.2, 0.32, 0.4], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.13, 0.4], [30, -30]);
  return (
    <motion.div className="cn-stage cn-stage-about" style={{ opacity, y }}>
      <p className="cn-tag">A note.</p>
      <p className="cn-lede">
        End to end work. Architecture, code, interface, motion. Output that carries a tone.
      </p>
      <div className="cn-stat-row">
        <div className="cn-stat"><span>02+</span><label>YEARS</label></div>
        <div className="cn-stat"><span>10k</span><label>USERS REACHED</label></div>
        <div className="cn-stat"><span>∞</span><label>ITERATIONS</label></div>
      </div>
    </motion.div>
  );
}

function ProjectsOverlay() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.42, 0.5, 0.68, 0.75], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.42, 0.75], [30, -30]);
  return (
    <motion.div className="cn-stage cn-stage-projects" style={{ opacity, y }}>
      <p className="cn-tag-small">02  .  SELECTED WORK</p>
      <div className="cn-proj-list">
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.link || '#'}
            target={p.link ? '_blank' : undefined}
            rel="noreferrer"
            className="cn-proj-row"
          >
            <span className="cn-proj-idx">{String(i + 1).padStart(2, '0')}</span>
            <span className="cn-proj-name">{p.title}</span>
            <span className="cn-proj-tags">{p.tech.slice(0, 2).join('  .  ')}</span>
            <span className="cn-proj-arrow">{p.link ? '↗' : '·'}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsOverlay() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.7, 0.78, 0.88, 0.94], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.7, 0.94], [30, -30]);
  return (
    <motion.div className="cn-stage cn-stage-skills" style={{ opacity, y }}>
      <p className="cn-tag-small">03  .  STACK</p>
      <div className="cn-skill-grid">
        {skills.map((s, i) => (
          <div key={s.name} className="cn-skill-cell">
            <span className="cn-skill-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="cn-skill-label">{s.name}</span>
            <span className="cn-skill-pct">{s.level}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactOverlay({ onContact }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 0.97], [0, 1]);
  return (
    <motion.div className="cn-stage cn-stage-contact" style={{ opacity }}>
      <p className="cn-tag-small">04  .  TRANSMIT</p>
      <h2 className="cn-display cn-outro-title">
        <span>have an</span>
        <span className="cn-italic">idea?</span>
      </h2>
      <button className="cn-outro-cta" onClick={onContact}>
        <span>start a conversation</span>
        <span className="cn-arrow">↗</span>
      </button>
      <div className="cn-outro-links">
        <a href="https://github.com/Qxis" target="_blank" rel="noreferrer">GitHub</a>
        <span>.</span>
        <a href="https://discord.gg/kFdKSBBHxd" target="_blank" rel="noreferrer">Discord</a>
        <span>.</span>
        <a href="https://nnotclix.xyz/" target="_blank" rel="noreferrer">Commissions</a>
      </div>
      <footer className="cn-footer">
        <span>© {new Date().getFullYear()}  QXIS</span>
        <span>BUILT WITH LOVE</span>
        <span>MADE BY QXIS (me!)</span>
      </footer>
    </motion.div>
  );
}

export default function Home({ onContact, onNavigate }) {
  const progress = useScrollRef();
  const drag = useDragRef();
  const viewCount = useViewCount();
  const goWork = () => onNavigate && onNavigate('/work');

  return (
    <div className="cn-root">
      <FX />
      <CursorLight />
      <ProgressRail />
      <Nav onContact={onContact} onWork={goWork} />

      <div className="cn-world">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 11], fov: 55, near: 0.1, far: 80 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Scene progress={progress} drag={drag} viewCount={viewCount} />
        </Canvas>
      </div>

      <div className="cn-scroll">
        <section className="cn-screen"><HeroOverlay /></section>
        <section className="cn-screen"><AboutOverlay /></section>
        <section className="cn-screen"><ProjectsOverlay /></section>
        <section className="cn-screen"><SkillsOverlay /></section>
        <section className="cn-screen"><ContactOverlay onContact={onContact} /></section>
      </div>
    </div>
  );
}
