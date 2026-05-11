"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";

// Bettina Sosa Physics Falling Character
const FallingChar = ({ children, progress, index }) => {
  const random = Math.abs(Math.sin(index * 12.9898));
  const randomSign = Math.sin(index * 78.233) > 0 ? 1 : -1;
  
  const yTarget = 150 + (random * 600);
  const xTarget = (random * 300) * randomSign;
  const rotateTarget = 45 + (random * 300) * randomSign;

  const y = useTransform(progress, [0.05, 0.6], [0, yTarget]);
  const x = useTransform(progress, [0.05, 0.6], [0, xTarget]);
  const rotate = useTransform(progress, [0.05, 0.6], [0, rotateTarget]);
  const opacity = useTransform(progress, [0.3, 0.6], [1, 0]);

  return (
    <motion.span style={{ y, x, rotate, opacity, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
};

// Animated typing text component
const Typewriter = ({ text, delay = 0 }) => {
  return (
    <span className="gradient-text">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.05,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const FallingWord = ({ word, baseIndex, progress }) => {
  return (
    <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {word.split("").map((char, i) => (
        <FallingChar key={i} progress={progress} index={baseIndex + i}>
          {char}
        </FallingChar>
      ))}
    </span>
  );
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const line1Words = "Software".split(" ");
  const line3Words = "& Community Manager".split(" ");

  return (
    <section 
      id="home" 
      className={styles.hero} 
      onMouseMove={handleMouseMove}
      ref={heroRef}
    >
      <motion.div
        className="glow-orb"
        animate={{
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)",
          top: "-20%",
          right: "-10%",
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />
      <motion.div
        className="glow-orb"
        animate={{
          x: mousePos.x * 40,
          y: mousePos.y * 40,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 80 }}
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)",
          bottom: "0%",
          left: "-10%",
          animation: "pulse-glow 10s ease-in-out infinite 2s",
        }}
      />

      <motion.div 
        className={styles.gridOverlay}
        animate={{
          backgroundPositionX: mousePos.x * -20 + "px",
          backgroundPositionY: mousePos.y * -20 + "px",
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      />

      <div className={`container ${styles.content}`}>
        <div className={styles.textSide}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          >
            <div className="badge" style={{ padding: '0.4rem 1rem' }}>
              <span className={styles.statusDot} />
              <span style={{ fontWeight: 600 }}>Available for work</span>
            </div>
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ position: 'relative', zIndex: 20 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.3em' }}>
              {line1Words.map((word, wIdx) => (
                <FallingWord key={wIdx} word={word} baseIndex={wIdx * 10} progress={scrollYProgress} />
              ))}
            </div>
            
            <Typewriter text="Engineer" delay={0.6} />
            
            <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.3em' }}>
              {line3Words.map((word, wIdx) => (
                <FallingWord key={wIdx} word={word} baseIndex={100 + (wIdx * 10)} progress={scrollYProgress} />
              ))}
            </div>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          >
            Specializing in Roblox community infrastructure, automated moderation systems, and scalable web applications.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          >
            <a href="#projects" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
              <span style={{ marginLeft: '8px' }}>View Projects</span>
            </a>
            <a href="#contact" className="btn btn-secondary" style={{ padding: '1rem 2.5rem' }}>
              <span>Get in Touch</span>
            </a>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { num: "50+", label: "Servers Managed" },
              { num: "10K+", label: "Active Users" },
              { num: "3+", label: "Years Exp." }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + (i * 0.1), type: "spring" }}
              >
                <span className={styles.statNum}>{stat.num}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        >
          <motion.div 
            className={styles.imageWrapper}
            animate={{
              rotateX: mousePos.y * -10,
              rotateY: mousePos.x * 10,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className={styles.imageGlow} />
            <div className={styles.imageFrame}>
              <Image
                src="/images/profile.png"
                alt="Profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div className={styles.imageOverlay} />
            </div>
            
            <motion.div
              className={styles.floatingTag}
              style={{ top: "15%", right: "-10%", translateZ: 50 }}
              animate={{ 
                y: [0, -15, 0],
                x: mousePos.x * 20,
              }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
              <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '6px' }}>⭐</span>
              Community Manager
            </motion.div>
            
            <motion.div
              className={styles.floatingTag}
              style={{ bottom: "25%", left: "-15%", translateZ: 80 }}
              animate={{ 
                y: [0, 15, 0],
                x: mousePos.x * -30,
              }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            >
              <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '6px' }}>💻</span>
              Full Stack Dev
            </motion.div>
            
            <motion.div
              className={styles.floatingTag}
              style={{ top: "60%", right: "-15%", translateZ: 60 }}
              animate={{ 
                y: [0, -10, 0],
                x: mousePos.x * 10,
              }}
              transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
            >
              <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '6px' }}>🛡️</span>
              Automation
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <motion.div
          className={styles.scrollMouse}
        >
          <motion.div 
            className={styles.scrollWheel}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
