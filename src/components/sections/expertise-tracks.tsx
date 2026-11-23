"use client";

import { useState } from "react";
import {
  ClipboardList,
  ShieldCheck,
  Users,
  Settings,
  Monitor,
  AlertTriangle,
  LayoutGrid,
  Zap,
  MessageSquare,
  BarChart3,
  Rocket,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";
import { expertiseTracks } from "@/data";
import type { ExpertiseTrack } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  ClipboardList, ShieldCheck, Users, Settings, Monitor, AlertTriangle,
  LayoutGrid, Zap, MessageSquare, BarChart3, Rocket, FileText,
};

const trackColors = {
  "quality-engineering": ["#00E5FF", "#A78BFA"],
  "project-delivery": ["#F472B6", "#FBBF24"],
};

const capColors = ["#00E5FF", "#A78BFA", "#F472B6", "#34D399", "#FBBF24", "#FB923C"];

export function ExpertiseTracks() {
  const [activeTrack, setActiveTrack] = useState<ExpertiseTrack["id"]>("quality-engineering");
  const track = expertiseTracks.find((t) => t.id === activeTrack)!;
  const colors = trackColors[activeTrack as keyof typeof trackColors] || trackColors["quality-engineering"];

  return (
    <Section id="expertise" className="relative overflow-hidden">
      <GradientBlob colors={[colors[0], colors[1], "var(--accent-tertiary)"]} />
      <SectionHeader
        label="Expertise"
        title="Two Tracks, One Mission"
        description="Quality engineering and project delivery — two sides of shipping software that works."
      />

      {/* Animated tab switcher */}
      <div className="mb-12 flex justify-center">
        <div className="relative inline-flex rounded-2xl border border-border bg-bg-card p-1.5 shadow-sm">
          {expertiseTracks.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTrack === t.id}
              onClick={() => setActiveTrack(t.id)}
              className="relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all sm:px-8"
            >
              {activeTrack === t.id && (
                <motion.div
                  layoutId="activeTrackBg"
                  className="absolute inset-0 rounded-xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${trackColors[t.id as keyof typeof trackColors][0]}, ${trackColors[t.id as keyof typeof trackColors][1]})`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeTrack === t.id ? "text-white font-semibold" : "text-text-secondary hover:text-text-primary"}`}>
                {t.id === "quality-engineering" ? "Quality Engineering" : "Project Delivery"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {track.capabilities.map((cap, i) => {
              const Icon = iconMap[cap.icon] || ShieldCheck;
              const color = capColors[i % capColors.length];
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
                >
                  {/* Top gradient bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: color }}
                  />
                  <div
                    className="absolute -top-10 -right-10 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                    style={{ background: color }}
                  />
                  <div className="relative">
                    <div
                      className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <h4 className="mb-1.5 text-sm font-bold text-text-primary">
                      {cap.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {cap.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
