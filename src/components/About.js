"use client";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const highlights = [
  {
    emoji: "/images/emojis/star.svg",
    title: "ERLC Alter",
    desc: "Specialist in ERLC server alting — botting in-game servers to fill them to max capacity. Driving player counts up and keeping servers packed with active users around the clock.",
  },
  {
    emoji: "/images/emojis/monitor.svg",
    title: "Server Manager",
    desc: "Skilled in managing large-scale Roblox and Discord communities — building staff teams, moderation systems, and engaging player experiences.",
  },
  {
    emoji: "/images/emojis/code.svg",
    title: "Full Stack Developer",
    desc: "Building modern web and bot applications with Next.js, React, Node.js, Python, and MongoDB — from frontend polish to backend power.",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge">About Me</span>
          <h2>
            Crafting <span className="gradient-text">Digital Worlds</span>
            <br />
            From Vision to Reality
          </h2>
          <p className={styles.sectionDesc}>
            I&apos;m passionate about blending creativity with technology. Whether
            it&apos;s transforming an ERLC server into an immersive experience,
            managing a thriving community, or engineering full-stack solutions —
            I bring dedication and expertise to every project.
          </p>
        </motion.div>

        <div className={styles.highlightsGrid}>
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              className={`glass-card ${styles.highlightCard}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariants}
            >
              <div className={styles.cardIcon}>
                <img src={h.emoji} alt="" width={28} height={28} />
              </div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
              <div className={styles.cardAccent} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
