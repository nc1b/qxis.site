"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Utah State Roleplay",
    description:
      "A premier ERLC roleplay community featuring custom bots, advanced moderation, economy systems, and a rich staff ecosystem serving thousands of active players.",
    tags: ["ERLC", "Discord Bot", "Community", "Moderation"],
    color: "#d97228",
    emoji: "/images/emojis/star.svg",
    link: "#",
  },
  {
    title: "Custom Discord Bot Suite",
    description:
      "Full-featured Discord management bots with slash commands, application systems, economy, giveaways, ticket systems, and PRC API integration for ERLC servers.",
    tags: ["Python", "Discord.py", "MongoDB", "APIs"],
    color: "#e28d4f",
    emoji: "/images/emojis/bot.svg",
    link: "#",
  },
  {
    title: "ERLC Moderation System",
    description:
      "Advanced AI-powered moderation system for ERLC servers with automated detection of RDM, VDM, and safezone violations. Real-time monitoring and visual reports.",
    tags: ["AI/ML", "Computer Vision", "Python", "PRC API"],
    color: "#f5a623",
    emoji: "/images/emojis/shield.svg",
    link: "#",
  },
  {
    title: "Web Portfolio & Platforms",
    description:
      "Modern web platforms and portfolio sites built with Next.js, featuring stunning animations, responsive design, and premium aesthetics for clients and personal use.",
    tags: ["Next.js", "React", "CSS", "Framer Motion"],
    color: "#cc7a0a",
    emoji: "/images/emojis/globe.svg",
    link: "#",
  },
  {
    title: "Server Infrastructure",
    description:
      "End-to-end VPS management, deployment pipelines, database architecture, and server configuration for production-grade Discord bots and web applications.",
    tags: ["Linux", "VPS", "MongoDB", "DevOps"],
    color: "#a3451b",
    emoji: "/images/emojis/server.svg",
    link: "#",
  },
  {
    title: "CAD/MDT Systems",
    description:
      "Custom CAD and MDT systems for ERLC roleplay servers — dispatch management, unit tracking, and records systems built for realistic law enforcement RP.",
    tags: ["Full Stack", "Real-time", "WebSockets", "UI/UX"],
    color: "#83381d",
    emoji: "/images/emojis/radio.svg",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div
        className="glow-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(226,141,79,0.12) 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
        }}
      />

      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge">
            <img src="/images/emojis/fire.svg" alt="" width={14} height={14} />
            Featured Work
          </span>
          <h2>
            Projects I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className={styles.sectionDesc}>
            A selection of projects that showcase my expertise across ERLC development,
            server management, and full stack engineering.
          </p>
        </motion.div>

        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              className={`glass-card ${styles.projectCard}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={styles.cardGlow}
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
                }}
              />
              <div className={styles.cardHeader}>
                <div className={styles.projectIcon}>
                  <img src={project.emoji} alt="" width={26} height={26} />
                </div>
                <div className={styles.arrowWrap}>
                  <img src="/images/emojis/lightning.svg" alt="" width={16} height={16} className={styles.arrowIcon} />
                </div>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.tag}
                    style={{
                      borderColor: `${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className={styles.cardBorder}
                style={{ background: project.color }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
