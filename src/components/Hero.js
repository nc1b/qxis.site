"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Background orbs */}
      <div
        className="glow-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(217,114,40,0.2) 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(131,56,29,0.2) 0%, transparent 70%)",
          bottom: "10%",
          left: "-5%",
          animation: "pulse-glow 8s ease-in-out infinite 2s",
        }}
      />

      {/* Subtle grid */}
      <div className={styles.gridOverlay} />

      <div className={`container ${styles.content}`}>
        <div className={styles.textSide}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="badge">
              <span className={styles.statusDot} />
              Available for projects
            </div>
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Building Digital
            <br />
            <span className="gradient-text">Experiences</span>
            <br />
            That Matter
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            ERLC Alter • Server Manager • Full Stack Developer — I bot servers
            to max capacity, manage thriving communities, and build powerful
            tools that elevate everything.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <a href="#projects" className="btn btn-primary">
              <img src="/images/emojis/rocket.svg" alt="" width={18} height={18} className={styles.btnEmoji} />
              View My Work
            </a>
            <a href="#about" className="btn btn-secondary">
              Learn More
              <img src="/images/emojis/lightning.svg" alt="" width={16} height={16} className={styles.btnEmoji} />
            </a>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNum}>50+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>10K+</span>
              <span className={styles.statLabel}>Players Served</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Years Exp.</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} />
            <div className={styles.imageFrame}>
              <Image
                src="/images/profile.png"
                alt="Qxis - Profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            {/* Floating tags with custom emoji images */}
            <motion.div
              className={styles.floatingTag}
              style={{ top: "15%", right: "-10%" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/images/emojis/star.svg" alt="" width={16} height={16} className={styles.tagEmoji} />
              ERLC
            </motion.div>
            <motion.div
              className={styles.floatingTag}
              style={{ bottom: "20%", left: "-12%" }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <img src="/images/emojis/code.svg" alt="" width={16} height={16} className={styles.tagEmoji} />
              Dev
            </motion.div>
            <motion.div
              className={styles.floatingTag}
              style={{ top: "55%", right: "-15%" }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <img src="/images/emojis/shield.svg" alt="" width={16} height={16} className={styles.tagEmoji} />
              Mgr
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
