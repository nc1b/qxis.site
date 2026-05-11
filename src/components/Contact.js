"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Contact.module.css";

const socials = [
  {
    name: "Discord",
    handle: "597419454665588746",
    icon: <span className="emoji" style={{ fontSize: '1.5rem' }}>💬</span>,
    link: "https://discord.com/users/597419454665588746",
    color: "#5865F2"
  },
  {
    name: "GitHub",
    handle: "@nc1b",
    icon: <span className="emoji" style={{ fontSize: '1.5rem' }}>💻</span>,
    link: "https://github.com/nc1b",
    color: "#3b82f6"
  },
  {
    name: "Email",
    handle: "contact@qxis.site",
    icon: <span className="emoji" style={{ fontSize: '1.5rem' }}>✉️</span>,
    link: "mailto:contact@qxis.site",
    color: "#8b5cf6"
  },
];

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
    offset: ["start 90%", "end 60%"]
  });

  const words = text.split(" ");
  
  return (
    <p 
      className={styles.desc} 
      ref={containerRef} 
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.25em', rowGap: '0.1em', justifyContent: 'center' }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })}
    </p>
  );
};

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div
        className="glow-orb"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)",
          bottom: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="container" style={{ maxWidth: '800px' }}>
        <div className={styles.wrapper}>
          {/* Centered Column: Socials & Info */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ alignItems: 'center', textAlign: 'center' }}
          >
            <span className="badge" style={{ alignSelf: "center", marginBottom: "1rem" }}>
              <span className={styles.availDot} />
              Open for Work
            </span>
            <h2 className={styles.heading}>
              Get in <span className="gradient-text">Touch</span>
            </h2>
            
            <ScrollRevealText text="Interested in working together or have a question? Feel free to reach out through any of the platforms below." />

            <div className={styles.socialsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%', maxWidth: 'none', marginTop: '2rem' }}>
              {socials.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card ${styles.socialCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={{ flexDirection: 'column', textAlign: 'center', padding: '1.5rem' }}
                >
                  <div className={styles.socialIcon} style={{ background: `${social.color}20`, color: social.color, marginBottom: '1rem' }}>
                    {social.icon}
                  </div>
                  <div className={styles.socialText}>
                    <span className={styles.socialName}>{social.name}</span>
                    <span className={styles.socialHandle}>{social.handle}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
