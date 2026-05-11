"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.css";

const highlights = [
  {
    emoji: "⭐",
    title: "Server Growth",
    desc: "Scaling in-game server populations and driving community engagement through targeted strategies and automated systems.",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.05))"
  },
  {
    emoji: "🖥️",
    title: "Community Management",
    desc: "Building staff teams, establishing moderation guidelines, and managing day-to-day operations for thousands of players.",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.05))"
  },
  {
    emoji: "💻",
    title: "Full Stack Development",
    desc: "Creating scalable web platforms and Discord bots using React, Next.js, Python, and MongoDB to streamline community operations.",
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
              About
            </div>
            <h2>
              Background & <span className="gradient-text">Experience</span>
            </h2>
            
            <ScrollRevealText text="I specialize in building and scaling online communities, with a focus on ERLC servers and Discord infrastructure. My work ranges from developing custom moderation bots to engineering full-stack web applications that help communities operate more efficiently." />
            
            <div className={styles.experienceLine}>
              <div className={styles.expItem}>
                <span className={styles.expNum}>3+</span>
                <span className={styles.expText}>Years Experience</span>
              </div>
              <div className={styles.expDivider} />
              <div className={styles.expItem}>
                <span className={styles.expNum}>10k+</span>
                <span className={styles.expText}>Users Managed</span>
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
