"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";
import { lifecyclePhases } from "@/data";

const phaseColors = ["#00E5FF", "#A78BFA", "#F472B6", "#34D399", "#FBBF24", "#FB923C", "#00E5FF"];

export function DeliveryLifecycle() {
  const [activePhase, setActivePhase] = useState(lifecyclePhases[0].id);
  const phase = lifecyclePhases.find((p) => p.id === activePhase)!;
  const activeIndex = lifecyclePhases.findIndex((p) => p.id === activePhase);
  const activeColor = phaseColors[activeIndex];

  return (
    <Section id="lifecycle" className="relative overflow-hidden">
      <GradientBlob />
      <SectionHeader
        label="Process"
        title="Delivery Lifecycle"
        description="Quality activities woven through every phase of delivery."
      />

      {/* Visual phase selector — circles connected by line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="relative mx-auto max-w-3xl">
          {/* Connecting line */}
          <div className="absolute top-5 left-[8%] right-[8%] h-0.5 bg-border hidden sm:block" />
          <motion.div
            className="absolute top-5 left-[8%] h-0.5 hidden sm:block"
            style={{
              background: `linear-gradient(90deg, ${phaseColors.slice(0, activeIndex + 1).join(", ")})`,
            }}
            animate={{ width: `${(activeIndex / (lifecyclePhases.length - 1)) * 84}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />

          <div className="flex justify-between gap-1">
            {lifecyclePhases.map((p, i) => {
              const isActive = activePhase === p.id;
              const isPast = i <= activeIndex;
              const color = phaseColors[i];
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(p.id)}
                  className="group flex flex-col items-center gap-2 relative z-10"
                  aria-pressed={isActive}
                >
                  <motion.div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all"
                    style={{
                      borderColor: isPast ? color : "var(--border-secondary)",
                      background: isActive ? color : "var(--bg-primary)",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: isActive ? "white" : isPast ? color : "var(--text-tertiary)" }}
                    >
                      {i + 1}
                    </span>
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-full blur-md opacity-30"
                        style={{ background: color }}
                      />
                    )}
                  </motion.div>
                  <span
                    className="text-[10px] font-semibold sm:text-xs transition-colors"
                    style={{ color: isActive ? color : "var(--text-tertiary)" }}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-text-primary">{phase.title}</h3>
            <p className="mt-1 text-sm text-text-secondary">{phase.description}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "QA Activities", items: phase.qaActivities, color: "#00E5FF" },
              { title: "PM Activities", items: phase.pmActivities, color: "#A78BFA" },
              { title: "Deliverables", items: phase.deliverables, color: "#F472B6" },
            ].map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: section.color, opacity: 0.5 }}
                />
                <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: section.color }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: section.color }} />
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.1 + ii * 0.04, duration: 0.3 }}
                      className="flex gap-2 text-xs text-text-secondary"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: `${section.color}80` }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
