"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Utah State Roleplay",
    description: "A premier ERLC roleplay community featuring custom bots, advanced moderation, economy systems, and a rich staff ecosystem serving thousands of active players.",
    tags: ["ERLC", "Discord Bot", "Community", "Moderation"],
    color: "#d97228",
    emoji: "/images/emojis/star.svg",
    link: "#",
    metrics: "10K+ Members"
  },
  {
    title: "Botify Suite",
    description: "Full-featured Discord management bots with slash commands, application systems, economy, giveaways, ticket systems, and PRC API integration for ERLC servers.",
    tags: ["Python", "Discord.py", "MongoDB", "APIs"],
    color: "#e28d4f",
    emoji: "/images/emojis/bot.svg",
    link: "#",
    metrics: "50+ Servers"
  },
  {
    title: "ERLC Moderation System",
    description: "Advanced AI-powered moderation system for ERLC servers with automated detection of RDM, VDM, and safezone violations. Real-time monitoring and visual reports.",
    tags: ["AI/ML", "Computer Vision", "Python", "PRC API"],
    color: "#f5a623",
    emoji: "/images/emojis/shield.svg",
    link: "#",
    metrics: "99% Accuracy"
  },
  {
    title: "Web Portfolio & Platforms",
    description: "Modern web platforms and portfolio sites built with Next.js, featuring stunning animations, responsive design, and premium aesthetics for clients and personal use.",
    tags: ["Next.js", "React", "CSS", "Framer Motion"],
    color: "#cc7a0a",
    emoji: "/images/emojis/globe.svg",
    link: "#",
    metrics: "100/100 LH"
  },
  {
    title: "Server Infrastructure",
    description: "End-to-end VPS management, deployment pipelines, database architecture, and server configuration for production-grade Discord bots and web applications.",
    tags: ["Linux", "VPS", "MongoDB", "DevOps"],
    color: "#a3451b",
    emoji: "/images/emojis/server.svg",
    link: "#",
    metrics: "99.9% Uptime"
  },
  {
    title: "CAD/MDT Systems",
    description: "Custom CAD and MDT systems for ERLC roleplay servers — dispatch management, unit tracking, and records systems built for realistic law enforcement RP.",
    tags: ["Full Stack", "Real-time", "WebSockets", "UI/UX"],
    color: "#83381d",
    emoji: "/images/emojis/radio.svg",
    link: "#",
    metrics: "Zero Latency"
  },
];

const ProjectCard = ({ project, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      href={project.link}
      className={`glass-card ${styles.projectCard}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
    >
      <div
        className={styles.cardGlow}
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}15, transparent 40%)`,
        }}
      />
      
      <div className={styles.cardTop}>
        <div className={styles.projectIcon} style={{ background: `${project.color}15`, borderColor: `${project.color}30` }}>
          <img src={project.emoji} alt="" width={24} height={24} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        </div>
        <div className={styles.metricsBadge} style={{ color: project.color, background: `${project.color}10`, borderColor: `${project.color}20` }}>
          {project.metrics}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
      </div>
      
      <div className={styles.cardBottom}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
              style={{
                background: `rgba(255,255,255,0.03)`,
                borderColor: `rgba(255,255,255,0.05)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.arrowWrap} style={{ background: `${project.color}20`, color: project.color }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
      
      <div
        className={styles.cardBorder}
        style={{ background: project.color }}
      />
    </motion.a>
  );
};

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div
        className="glow-orb"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(226,141,79,0.1) 0%, transparent 60%)",
          bottom: "10%",
          right: "-10%",
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
            <img src="/images/emojis/rocket.svg" alt="" width={16} height={16} style={{ marginRight: "4px" }} />
            Featured Work
          </span>
          <h2>
            Projects I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className={styles.sectionDesc}>
            A selection of high-impact projects showcasing my expertise across ERLC development,
            server infrastructure, and full stack engineering.
          </p>
        </motion.div>

        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
        
        <motion.div 
          className={styles.moreProjects}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a href="https://github.com/qxis" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <img src="/images/emojis/code.svg" alt="" width={18} height={18} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
