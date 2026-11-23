"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import {
  sampleReleaseMetrics,
  sampleReleaseCriteria,
  DEMO_DISCLAIMER,
} from "@/data";

export function evaluateRelease(
  criteria: { met: boolean }[]
): "go" | "no-go" {
  return criteria.every((c) => c.met) ? "go" : "no-go";
}

export function ReleaseReadiness() {
  const [criteria, setCriteria] = useState(sampleReleaseCriteria);
  const [showDecision, setShowDecision] = useState(false);
  const decision = useMemo(() => evaluateRelease(criteria), [criteria]);

  const toggleCriterion = (id: string) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, met: !c.met } : c))
    );
    setShowDecision(false);
  };

  const statusIcon = {
    pass: <CheckCircle2 className="h-5 w-5 text-[#34D399]" />,
    fail: <XCircle className="h-5 w-5 text-[#EF4444]" />,
    warning: <AlertTriangle className="h-5 w-5 text-[#FBBF24]" />,
  };

  return (
    <Section id="release-demo" className="relative overflow-hidden">
      <GradientBlob colors={["#34D399", "#00E5FF", "#A78BFA"]} />
      <div className="relative">
        <SectionHeader
          label="Interactive Demo"
          title="Release Readiness — Go or No-Go?"
          description="Explore how a QA leader evaluates whether a release is ready to ship."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-4xl rounded-2xl border border-border-accent/50 bg-bg-card p-4"
        >
          <p className="flex items-start gap-2 text-sm text-text-secondary">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {DEMO_DISCLAIMER}
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-tertiary">
              Release Metrics
            </h3>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sampleReleaseMetrics.map((metric, i) => {
                const colors = { pass: "#34D399", fail: "#EF4444", warning: "#FBBF24" };
                const color = colors[metric.status];
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: color, opacity: 0.6 }}
                    />
                    <div className="flex items-start gap-3">
                      {statusIcon[metric.status]}
                      <div>
                        <p className="text-xs font-medium text-text-secondary">{metric.label}</p>
                        <p className="text-2xl font-bold" style={{ color }}>
                          {metric.value}
                          <span className="ml-1 text-xs font-normal text-text-tertiary">{metric.unit}</span>
                        </p>
                        <p className="text-[10px] text-text-tertiary">
                          Threshold: {metric.threshold} {metric.unit}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Criteria */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-tertiary">
              Release Criteria
            </h3>
            <div className="mb-10 space-y-3">
              {criteria.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleCriterion(c.id)}
                  className="flex w-full items-start gap-4 rounded-2xl border border-border bg-bg-card p-4 text-left transition-all hover:border-border-accent hover:shadow-md"
                  aria-pressed={c.met}
                >
                  <motion.div animate={{ scale: c.met ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
                    {c.met ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#34D399]" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#EF4444]" />
                    )}
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-primary">{c.label}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{c.details}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: c.met ? "#34D39915" : "#EF444415",
                      color: c.met ? "#34D399" : "#EF4444",
                    }}
                  >
                    {c.met ? "Met" : "Not Met"}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Evaluate */}
          <div className="text-center">
            <MagneticButton>
              <button
                onClick={() => setShowDecision(true)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Evaluate Release Decision
              </button>
            </MagneticButton>

            <AnimatePresence>
              {showDecision && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`mt-8 rounded-2xl border-2 p-8 ${
                    decision === "go"
                      ? "border-[#34D399] bg-[#34D399]/5"
                      : "border-[#EF4444] bg-[#EF4444]/5"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      {decision === "go" ? (
                        <ShieldCheck className="h-14 w-14 text-[#34D399]" />
                      ) : (
                        <ShieldX className="h-14 w-14 text-[#EF4444]" />
                      )}
                    </motion.div>
                    <h3 className="text-2xl font-bold">
                      Decision:{" "}
                      <span style={{ color: decision === "go" ? "#34D399" : "#EF4444" }}>
                        {decision === "go" ? "GO" : "NO-GO"}
                      </span>
                    </h3>
                    <p className="max-w-md text-sm text-text-secondary">
                      {decision === "go"
                        ? "All release criteria are met. This release is ready for production."
                        : `${criteria.filter((c) => !c.met).length} of ${criteria.length} release criteria are not met. Hold until all blocking criteria are resolved.`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
