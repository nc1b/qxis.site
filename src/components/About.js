"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.css";

const highlights = [
  {
    emoji: "⭐",
    title: "ERLC Alter",
    desc: "Specialist in ERLC server alting — botting in-game servers to fill them to max capacity. Driving player counts up and keeping servers packed with active users around the clock.",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.05))"
  },
  {
    emoji: "🖥️",
    title: "Server Manager",
    desc: "Skilled in managing large-scale Roblox and Discord communities — building staff teams, robust moderation systems, and engaging player experiences.",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.05))"
  },
  {
    emoji: "💻",
    title: "Full Stack Developer",
    desc: "Building modern web and bot applications with Next.js, React, Node.js, Python, and MongoDB — from stunning frontend polish to backend power.",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.05))"
  },
];

const Card = ({ highlight, index }) => {
  return (
    <motion.div
      className={`glass-card ${styles.highlightCard}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div 
        className={styles.cardBg} 
        style={{ background: highlight.gradient }} 
      />
      <div className={styles.cardIconWrap}>
        <div className={styles.cardIconGlow} />
        <div className={styles.cardIcon}>
          <span className="emoji" style={{ fontSize: '1.8rem' }}>{highlight.emoji}</span>
        </div>
      </div>
      <h3>{highlight.title}</h3>
      <p>{highlight.desc}</p>
      <div className={styles.cardAccent} />
    </motion.div>
  );
};

// Scroll Reveal Word Component (Bettina Sosa Effect)
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
};

const ScrollRevealText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 50%"]
  });

  const words = text.split(" ");
  
  return (
    <p 
      className={styles.sectionDesc} 
      ref={containerRef} 
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.25em', rowGap: '0.1em' }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })}
    </p>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className={`section ${styles.about}`} ref={containerRef}>
      <motion.div 
        className="glow-orb"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 50%)",
          top: "30%",
          left: "-20%",
          y
        }}
      />
      
      <div className="container">
        <div className={styles.contentWrapper}>
          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="badge">
              <span className={styles.badgePulse} />
              About Me
            </div>
            <h2>
              Crafting <span className="gradient-text">Digital Worlds</span>
              <br />
              From Vision to Reality
            </h2>
            
            {/* Applied Bettina Sosa Scroll Reveal Effect */}
            <ScrollRevealText text="I'm passionate about blending creativity with high-performance technology. Whether it's transforming an ERLC server into an immersive, max-capacity experience, managing a thriving community of thousands, or engineering scalable full-stack solutions — I bring dedication, precision, and elite expertise to every single project." />
            
            <div className={styles.experienceLine}>
              <div className={styles.expItem}>
                <span className={styles.expNum}>100%</span>
                <span className={styles.expText}>Commitment</span>
              </div>
              <div className={styles.expDivider} />
              <div className={styles.expItem}>
                <span className={styles.expNum}>24/7</span>
                <span className={styles.expText}>Uptime Goals</span>
              </div>
            </div>
          </motion.div>

          <div className={styles.cardsSection}>
            {highlights.map((h, i) => (
              <Card key={h.title} highlight={h} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
