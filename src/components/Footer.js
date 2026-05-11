"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Wavy top border */}
      <div className={styles.waveContainer}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.wave}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,130.83,112.56,189.9,92.83,234.33,77.93,277.62,64.55,321.39,56.44Z" className={styles.wavePath}></path>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={`container ${styles.inner}`}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.logo}>
              <Image src="/images/utah-logo.png" alt="Utah Logo" width={40} height={40} className={styles.logoImg} />
              <span className={styles.logoText}>Qxis</span>
            </div>
            <p className={styles.tagline}>
              Engineering exceptional digital experiences. Elevating ERLC communities, discord infrastructure, and the modern web.
            </p>
          </motion.div>

          <motion.div
            className={styles.center}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={styles.colTitle}>Sitemap</span>
            <div className={styles.linkGrid}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
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
              <a href="https://discord.com/users/597419454665588746" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Discord">
                <span className="emoji" style={{ fontSize: '1.2rem' }}>💬</span>
              </a>
              <a href="https://github.com/nc1b" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <span className="emoji" style={{ fontSize: '1.2rem' }}>💻</span>
              </a>
              <a href="mailto:contact@qxis.site" className={styles.socialBtn} aria-label="Email">
                <span className="emoji" style={{ fontSize: '1.2rem' }}>✉️</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className={`container ${styles.bottom}`}>
          <div className={styles.bottomInner}>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} Qxis. All rights reserved.
            </span>
            
            <button onClick={scrollToTop} className={styles.backToTop}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              Back to Top
            </button>
            
            <span className={styles.credit}>
              <span className="emoji" style={{ fontSize: '1rem', marginRight: '6px' }}>🔥</span>
              Crafted with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
