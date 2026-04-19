"use client";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

const socials = [
  {
    name: "Discord",
    handle: "@qxis",
    icon: (
      <img src="/images/emojis/bot.svg" alt="Discord" width={22} height={22} />
    ),
    link: "#",
  },
  {
    name: "GitHub",
    handle: "@qxis",
    icon: (
      <img src="/images/emojis/code.svg" alt="GitHub" width={22} height={22} />
    ),
    link: "#",
  },
  {
    name: "Twitter / X",
    handle: "@qxis",
    icon: (
      <img src="/images/emojis/lightning.svg" alt="Twitter" width={20} height={20} />
    ),
    link: "#",
  },
];

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div
        className="glow-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(217,114,40,0.1) 0%, transparent 70%)",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
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
          <span className="badge">Get in Touch</span>
          <h2>
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className={styles.sectionDesc}>
            Interested in collaborating on ERLC servers, custom bots, or web
            development projects? I&apos;m always open to new opportunities.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Contact Form */}
          <motion.div
            className={`glass-card ${styles.formCard}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  className={styles.textarea}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <img src="/images/emojis/rocket.svg" alt="" width={18} height={18} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className={styles.socialsColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={`glass-card ${styles.infoCard}`}>
              <h3>Quick Connect</h3>
              <p>
                The fastest way to reach me is through Discord. I typically respond
                within a few hours.
              </p>
              <div className={styles.socialsList}>
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    className={styles.socialItem}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className={styles.socialIcon}>{social.icon}</div>
                    <div className={styles.socialInfo}>
                      <span className={styles.socialName}>{social.name}</span>
                      <span className={styles.socialHandle}>{social.handle}</span>
                    </div>
                    <img src="/images/emojis/star.svg" alt="" width={16} height={16} className={styles.socialArrow} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className={`glass-card ${styles.availabilityCard}`}>
              <div className={styles.availDot} />
              <div>
                <h4>Currently Available</h4>
                <p>Open for ERLC alterations, bot development, and freelance web projects.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
