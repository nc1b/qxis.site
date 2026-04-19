"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.logo}>
            <Image src="/images/utah-logo.png" alt="Utah Logo" width={28} height={28} className={styles.logoImg} />
            <span className={styles.logoText}>Qxis</span>
          </div>
          <p className={styles.tagline}>
            Building exceptional digital experiences for ERLC communities and beyond.
          </p>
        </motion.div>

        <motion.div
          className={styles.center}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.linkCol}>
            <span className={styles.colTitle}>Navigation</span>
            <a href="#home">
              <img src="/images/emojis/rocket.svg" alt="" width={14} height={14} className={styles.linkEmoji} />
              Home
            </a>
            <a href="#about">
              <img src="/images/emojis/star.svg" alt="" width={14} height={14} className={styles.linkEmoji} />
              About
            </a>
            <a href="#skills">
              <img src="/images/emojis/code.svg" alt="" width={14} height={14} className={styles.linkEmoji} />
              Skills
            </a>
            <a href="#projects">
              <img src="/images/emojis/fire.svg" alt="" width={14} height={14} className={styles.linkEmoji} />
              Projects
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className={styles.colTitle}>Connect</span>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialBtn} aria-label="Discord">
              <img src="/images/emojis/bot.svg" alt="Discord" width={18} height={18} />
            </a>
            <a href="#" className={styles.socialBtn} aria-label="GitHub">
              <img src="/images/emojis/code.svg" alt="GitHub" width={18} height={18} />
            </a>
            <a href="#" className={styles.socialBtn} aria-label="More">
              <img src="/images/emojis/lightning.svg" alt="More" width={18} height={18} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} Qxis. All rights reserved.
        </span>
        <span className={styles.credit}>
          <img src="/images/emojis/fire.svg" alt="" width={12} height={12} style={{ marginRight: "4px" }} />
          Crafted with precision
        </span>
      </div>
    </footer>
  );
}
