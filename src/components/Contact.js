"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

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

      <div className="container">
        <div className={styles.wrapper}>
          {/* Left Column: Socials & Info */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="badge" style={{ alignSelf: "flex-start" }}>
              <span className={styles.availDot} />
              Open for Work
            </span>
            <h2 className={styles.heading}>
              Let&apos;s Build Something <span className="gradient-text">Incredible</span>
            </h2>
            <p className={styles.desc}>
              Looking for a top-tier ERLC alter, an expert community manager, or a full-stack engineering partner? Let's connect and elevate your project.
            </p>

            <div className={styles.socialsGrid}>
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
                >
                  <div className={styles.socialIcon} style={{ background: `${social.color}20`, color: social.color }}>
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

          {/* Right Column: Premium Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={`glass-card ${styles.formCard}`}>
              <div className={styles.formHeader}>
                <h3>Send a Message</h3>
                <p>Fill out the form below and I'll get back to you within 24 hours.</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input type="text" id="name" required className={styles.input} placeholder=" " />
                  <label htmlFor="name">Your Name</label>
                  <div className={styles.inputHighlight} />
                </div>

                <div className={styles.inputGroup}>
                  <input type="email" id="email" required className={styles.input} placeholder=" " />
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.inputHighlight} />
                </div>

                <div className={styles.inputGroup}>
                  <textarea id="message" required className={styles.textarea} rows="4" placeholder=" " />
                  <label htmlFor="message">How can I help you?</label>
                  <div className={styles.inputHighlight} />
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={formState !== "idle"}
                >
                  {formState === "idle" && (
                    <>
                      <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '8px' }}>🚀</span>
                      Send Message
                    </>
                  )}
                  {formState === "submitting" && "Sending..."}
                  {formState === "success" && "Message Sent! 🎉"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
