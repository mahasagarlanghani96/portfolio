"use client";

import { useRef } from "react";
import { ShieldCheck, Eye, AlertTriangle, TrendingUp, Ban } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";

const principles = [
  {
    icon: Eye,
    title: "Quality starts before testing",
    short: "Push quality upstream — catch ambiguity before it becomes a defect.",
    color: "#00E5FF",
  },
  {
    icon: AlertTriangle,
    title: "Risks identified early",
    short: "Allocate testing effort where bugs are most likely and most costly.",
    color: "#FBBF24",
  },
  {
    icon: ShieldCheck,
    title: "Release quality is non-negotiable",
    short: "Go/no-go decisions based on evidence, not conversation.",
    color: "#34D399",
  },
  {
    icon: TrendingUp,
    title: "QA drives business outcomes",
    short: "Every critical bug caught = revenue protected, trust maintained.",
    color: "#A78BFA",
  },
  {
    icon: Ban,
    title: "No-go is a valid decision",
    short: "Professional courage to hold, fix, and release with confidence.",
    color: "#F472B6",
  },
];

export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="philosophy" className="relative overflow-hidden">
      <GradientBlob colors={["#A78BFA", "#F472B6", "#00E5FF"]} />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-border-accent bg-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent shimmer">
            Philosophy
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            QA Is the Quality <span className="gradient-text-animated">Gatekeeper</span>
          </h2>
        </motion.div>

        {/* Visual philosophy cards — horizontal layout with colored left accent */}
        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
            >
              {/* Top gradient bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}60)` }}
              />

              {/* Background glow */}
              <div
                className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: p.color }}
              />

              <div className="relative">
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${p.color}15` }}
                >
                  <p.icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-text-primary">
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {p.short}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
