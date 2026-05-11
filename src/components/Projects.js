"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Utah State Roleplay",
    description: "A premier ERLC roleplay community featuring custom bots, advanced moderation, economy systems, and a rich staff ecosystem serving thousands of active players.",
    tags: ["ERLC", "Discord Bot", "Community", "Moderation"],
    color: "#3b82f6",
    emoji: "⭐",
    link: "https://discord.gg/wgexDnEerp",
    metrics: "10K+ Members"
  },
  {
    title: "Botify Suite",
    description: "Full-featured Discord management bots with slash commands, application systems, economy, giveaways, ticket systems, and PRC API integration for ERLC servers.",
    tags: ["Python", "Discord.py", "MongoDB", "APIs"],
    color: "#8b5cf6",
    emoji: "🤖",
    link: "#",
    metrics: "50+ Servers"
  },
  {
    title: "ERLC Moderation System",
    description: "Advanced AI-powered moderation system for ERLC servers with automated detection of RDM, VDM, and safezone violations. Real-time monitoring and visual reports.",
    tags: ["AI/ML", "Computer Vision", "Python", "PRC API"],
    color: "#06b6d4",
    emoji: "🛡️",
    link: "#",
    metrics: "99% Accuracy"
  },
  {
    title: "Web Portfolio & Platforms",
    description: "Modern web platforms and portfolio sites built with Next.js, featuring stunning animations, responsive design, and premium aesthetics for clients and personal use.",
    tags: ["Next.js", "React", "CSS", "Framer Motion"],
    color: "#6366f1",
    emoji: "🌐",
    link: "#",
    metrics: "100/100 LH"
  },
  {
    title: "Server Infrastructure",
    description: "End-to-end VPS management, deployment pipelines, database architecture, and server configuration for production-grade Discord bots and web applications.",
    tags: ["Linux", "VPS", "MongoDB", "DevOps"],
    color: "#2563eb",
    emoji: "🖧",
    link: "#",
    metrics: "99.9% Uptime"
  },
  {
    title: "CAD/MDT Systems",
    description: "Custom CAD and MDT systems for ERLC roleplay servers — dispatch management, unit tracking, and records systems built for realistic law enforcement RP.",
    tags: ["Full Stack", "Real-time", "WebSockets", "UI/UX"],
    color: "#1e40af",
    emoji: "📻",
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
      target={project.link !== "#" ? "_blank" : undefined}
      rel={project.link !== "#" ? "noopener noreferrer" : undefined}
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
          <span className="emoji" style={{ fontSize: '1.4rem' }}>{project.emoji}</span>
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
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)",
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
            <span className="emoji" style={{ fontSize: '1rem', marginRight: '4px' }}>🚀</span>
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
            <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '8px' }}>💻</span>
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
