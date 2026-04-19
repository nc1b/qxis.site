"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const techStack = [
  { name: "Python", emoji: "/images/emojis/code.svg" },
  { name: "JavaScript", emoji: "/images/emojis/lightning.svg" },
  { name: "React / Next.js", emoji: "/images/emojis/globe.svg" },
  { name: "Node.js", emoji: "/images/emojis/server.svg" },
  { name: "MongoDB", emoji: "/images/emojis/wrench.svg" },
  { name: "Discord.py", emoji: "/images/emojis/bot.svg" },
  { name: "Lua", emoji: "/images/emojis/star.svg" },
  { name: "Git", emoji: "/images/emojis/shield.svg" },
];

const codeSnippets = [
  {
    title: "economy.py",
    label: "Economy System",
    emoji: "/images/emojis/lightning.svg",
    code: `import discord
from discord import app_commands
from motor.motor_asyncio import AsyncIOMotorClient

class Economy(commands.Cog):
    """Full economy system with banking,
    gambling, shop, and daily rewards."""

    def __init__(self, bot):
        self.bot = bot
        self.db = bot.mongo["utah"]
        self.economy = self.db["economy"]

    @app_commands.command(name="balance")
    async def balance(self, interaction):
        """Check your current balance."""
        data = await self.economy.find_one(
            {"user_id": interaction.user.id}
        )
        wallet = data.get("wallet", 0)
        bank = data.get("bank", 0)

        embed = discord.Embed(
            title="💰 Your Balance",
            color=0xD97228
        )
        embed.add_field(
            name="Wallet", value=f"\${wallet:,}"
        )
        embed.add_field(
            name="Bank", value=f"\${bank:,}"
        )
        await interaction.response.send_message(
            embed=embed
        )`,
  },
  {
    title: "erlcmod.py",
    label: "ERLC Moderation",
    emoji: "/images/emojis/shield.svg",
    code: `import aiohttp
from datetime import datetime

class ERLCModeration(commands.Cog):
    """AI-powered moderation system for
    ERLC with automated detection."""

    PRC_API = "https://api.policeroleplay.community"

    async def get_server_players(self, key):
        """Fetch live player data from PRC."""
        headers = {
            "Server-Key": key,
            "Content-Type": "application/json"
        }
        async with aiohttp.ClientSession() as s:
            async with s.get(
                f"{self.PRC_API}/v1/server/players",
                headers=headers
            ) as resp:
                return await resp.json()

    async def detect_violations(self, data):
        """Scan for RDM, VDM, and
        safezone violations in real-time."""
        violations = []
        for player in data:
            if self._check_rdm(player):
                violations.append({
                    "type": "RDM",
                    "player": player["name"],
                    "time": datetime.utcnow()
                })
        return violations`,
  },
  {
    title: "altcentral.py",
    label: "Alt Central",
    emoji: "/images/emojis/rocket.svg",
    code: `import robloxapi
import asyncio
from concurrent.futures import ThreadPoolExecutor

class AltCentral:
    """ERLC server alting system —
    fills servers to max capacity."""

    def __init__(self, config):
        self.accounts = config["accounts"]
        self.target_server = config["server"]
        self.executor = ThreadPoolExecutor(
            max_workers=30
        )

    async def launch_all(self):
        """Launch all queued accounts
        into the target ERLC server."""
        queued = [
            acc for acc in self.accounts
            if acc.status == "QUEUED"
        ]
        tasks = []
        for account in queued:
            account.status = "LAUNCHING"
            task = asyncio.create_task(
                self._join_server(account)
            )
            tasks.append(task)

        results = await asyncio.gather(
            *tasks, return_exceptions=True
        )
        success = sum(
            1 for r in results if not
            isinstance(r, Exception)
        )
        return f"{success}/{len(queued)} joined"`,
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      {/* Background glow */}
      <div
        className="glow-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(217,114,40,0.1) 0%, transparent 70%)",
          top: "20%",
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
          <span className="badge">
            <img src="/images/emojis/fire.svg" alt="" width={14} height={14} style={{ marginRight: "2px" }} />
            Skills &amp; Expertise
          </span>
          <h2>
            My <span className="gradient-text">Tech Stack</span>
            <br />&amp; Capabilities
          </h2>
        </motion.div>

        {/* Tech Marquee */}
        <motion.div
          className={styles.marqueeWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...techStack, ...techStack].map((tech, i) => (
                <span key={i} className={styles.marqueeItem}>
                  <img src={tech.emoji} alt="" width={16} height={16} className={styles.marqueeEmoji} />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Code Panel */}
        <motion.div
          className={styles.codeSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Tab bar */}
          <div className={styles.tabBar}>
            {codeSnippets.map((snippet, i) => (
              <button
                key={snippet.title}
                className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(i)}
              >
                <img src={snippet.emoji} alt="" width={14} height={14} className={styles.tabEmoji} />
                <span className={styles.tabTitle}>{snippet.title}</span>
              </button>
            ))}
          </div>

          {/* Code window */}
          <div className={styles.codeWindow}>
            <div className={styles.codeWindowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.windowTitle}>
                <img src={codeSnippets[activeTab].emoji} alt="" width={12} height={12} />
                {codeSnippets[activeTab].label}
              </span>
              <span className={styles.windowLang}>
                <img src="/images/emojis/code.svg" alt="" width={12} height={12} />
                Python
              </span>
            </div>
            <div className={styles.codeContent}>
              <pre className={styles.codeBlock}>
                <code>
                  {codeSnippets[activeTab].code.split("\n").map((line, i) => (
                    <div key={i} className={styles.codeLine}>
                      <span className={styles.lineNum}>{i + 1}</span>
                      <span className={styles.lineContent}>{syntaxHighlight(line)}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function syntaxHighlight(line) {
  // Simple Python syntax highlighter
  const parts = [];
  let remaining = line;
  let key = 0;

  const patterns = [
    { regex: /(#.*)$/, cls: "comment" },
    { regex: /(""".*?"""|'''.*?'''|".*?"|'.*?'|f".*?"|f'.*?')/, cls: "string" },
    { regex: /\b(import|from|class|def|async|await|return|for|if|in|not|and|or|with|as|self)\b/, cls: "keyword" },
    { regex: /\b(True|False|None)\b/, cls: "builtin" },
    { regex: /\b(\d+)\b/, cls: "number" },
    { regex: /(@\w+)/, cls: "decorator" },
  ];

  // Simple approach: return the line with span wrappers
  let processed = remaining;

  // Comments
  processed = processed.replace(/(#.*)$/, '<span class="cm">$1</span>');
  // Decorators
  processed = processed.replace(/(@\w+(?:\.\w+)*)/g, '<span class="dec">$1</span>');
  // Strings (f-strings, regular strings)
  processed = processed.replace(/(f?"[^"]*"|f?'[^']*'|"""[\s\S]*?""")/g, '<span class="str">$1</span>');
  // Keywords
  processed = processed.replace(/\b(import|from|class|def|async|await|return|for|if|in|not|and|or|with|as|self|isinstance)\b/g, '<span class="kw">$1</span>');
  // Built-in constants
  processed = processed.replace(/\b(True|False|None)\b/g, '<span class="bi">$1</span>');
  // Numbers
  processed = processed.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  // Function calls
  processed = processed.replace(/(\w+)\(/g, '<span class="fn">$1</span>(');

  return <span dangerouslySetInnerHTML={{ __html: processed }} />;
}
