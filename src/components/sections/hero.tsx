"use client";

import { Mail, ArrowDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ProfileImage } from "@/components/interactive/profile-image";
import { TypingEffect } from "@/components/interactive/typing-effect";
import { StatRing } from "@/components/interactive/stat-ring";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { personalInfo, socialLinks } from "@/data";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const stats = [
  { value: 8, suffix: "+", label: "Years", color: "#00E5FF", max: 10 },
  { value: 300, suffix: "+", label: "Projects", color: "#A78BFA", max: 350 },
  { value: 15, suffix: "", label: "Team Size", color: "#F472B6", max: 20 },
];

const typingTexts = [
  "Quality Assurance Leader",
  "Project Manager",
  "Release Gatekeeper",
  "Process Builder",
  "Team Developer",
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <GradientBlob />
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-accent bg-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent shimmer">
                <Sparkles className="h-3 w-3" />
                QA Leadership &middot; Project Delivery
              </span>
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="terminal-window mb-6 inline-block shadow-lg">
                <div className="terminal-header">
                  <span className="terminal-dot" style={{ background: "#EF4444" }} />
                  <span className="terminal-dot" style={{ background: "#F59E0B" }} />
                  <span className="terminal-dot" style={{ background: "#10B981" }} />
                  <span className="ml-2 text-xs text-text-tertiary">portfolio.sh</span>
                </div>
                <div className="terminal-body">
                  <div>
                    <span className="terminal-prompt">sagar@portfolio:~$</span>{" "}
                    <span className="text-text-primary">whoami</span>
                  </div>
                  <div className="mt-1 gradient-text font-semibold">{personalInfo.name}</div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="gradient-text-animated">{personalInfo.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-10 text-xl font-medium sm:text-2xl"
            >
              <TypingEffect
                texts={typingTexts}
                className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0 mx-auto"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start justify-center"
            >
              <MagneticButton>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[var(--accent-secondary)]/25 transition-all hover:shadow-xl hover:shadow-[var(--accent-secondary)]/30 active:scale-[0.97]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Mail className="h-4 w-4" />
                  Get In Touch
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={socialLinks.find((l) => l.platform === "LinkedIn")?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border-accent bg-bg-card px-7 py-3.5 font-semibold text-text-primary transition-all hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-lg active:scale-[0.97]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </MagneticButton>
            </motion.div>

            {/* Visual Stats — ring infographics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-14 flex flex-wrap justify-center gap-10 lg:justify-start"
            >
              {stats.map((stat, i) => (
                <StatRing
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  color={stat.color}
                  maxValue={stat.max}
                  size={110}
                  delay={1 + i * 0.2}
                />
              ))}
            </motion.div>
          </div>

          {/* Right side — Animated Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <ProfileImage />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-text-tertiary transition-colors hover:text-accent"
            aria-label="Scroll down"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
