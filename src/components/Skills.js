"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";

const techStack = [
  { name: "Python", emoji: "💻" },
  { name: "JavaScript", emoji: "⚡" },
  { name: "React / Next.js", emoji: "🌐" },
  { name: "Node.js", emoji: "🖥️" },
  { name: "MongoDB", emoji: "🗄️" },
  { name: "Discord.py", emoji: "🤖" },
  { name: "Lua", emoji: "⭐" },
  { name: "Git", emoji: "🛡️" },
];

const codeSnippets = [
  {
    title: "economy.py",
    label: "Economy System",
    emoji: "⚡",
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
            color=0x3B82F6
        )
        embed.add_field(
            name="Wallet", value=f"$\{wallet:,}"
        )
        embed.add_field(
            name="Bank", value=f"$\{bank:,}"
        )
        await interaction.response.send_message(
            embed=embed
        )`,
  },
  {
    title: "erlcmod.py",
    label: "ERLC Moderation",
    emoji: "🛡️",
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
    emoji: "🚀",
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
      <div
        className="glow-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
            <span className="emoji" style={{ fontSize: '1rem', marginRight: '4px' }}>🔥</span>
            Elite Arsenal
          </span>
          <h2>
            My <span className="gradient-text">Tech Stack</span>
            <br />&amp; Code Craft
          </h2>
          <p className={styles.sectionDesc}>
            A glimpse into the tools I use daily and the code architectures I build.
          </p>
        </motion.div>

        {/* Tech Marquee */}
        <motion.div
          className={styles.marqueeWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                <div key={i} className={styles.marqueeItem}>
                  <span className="emoji" style={{ fontSize: '1.2rem', marginRight: '6px' }}>{tech.emoji}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Code Panel */}
        <motion.div
          className={styles.codeSection}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className={styles.codeWindow}>
            {/* Header / Tab Bar */}
            <div className={styles.codeHeader}>
              <div className={styles.windowControls}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <div className={styles.tabList}>
                {codeSnippets.map((snippet, i) => (
                  <button
                    key={snippet.title}
                    className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <span className="emoji" style={{ fontSize: '1rem' }}>{snippet.emoji}</span>
                    {snippet.title}
                    {activeTab === i && (
                      <motion.div
                        className={styles.tabIndicator}
                        layoutId="activeCodeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content Body */}
            <div className={styles.codeBody}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={styles.codeContent}
                >
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function syntaxHighlight(line) {
  let processed = line;
  processed = processed.replace(/(#.*)$/, '<span class="cm">$1</span>');
  processed = processed.replace(/(@\w+(?:\.\w+)*)/g, '<span class="dec">$1</span>');
  processed = processed.replace(/(f?"[^"]*"|f?'[^']*'|"""[\s\S]*?""")/g, '<span class="str">$1</span>');
  processed = processed.replace(/\b(import|from|class|def|async|await|return|for|if|in|not|and|or|with|as|self|isinstance)\b/g, '<span class="kw">$1</span>');
  processed = processed.replace(/\b(True|False|None)\b/g, '<span class="bi">$1</span>');
  processed = processed.replace(/def\s+(\w+)/g, 'def <span class="fn-def">$1</span>');
  processed = processed.replace(/class\s+(\w+)/g, 'class <span class="class-def">$1</span>');
  processed = processed.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  processed = processed.replace(/(\w+)\(/g, '<span class="fn">$1</span>(');
  return <span dangerouslySetInnerHTML={{ __html: processed }} />;
}
