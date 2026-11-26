"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, ShieldCheck, ShieldX, RotateCcw } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { MetricInput } from "@/components/interactive/metric-input";
import { releaseMetricDefinitions, RELEASE_DEMO_DISCLAIMER } from "@/data";
import { evaluateReleaseReadiness } from "@/lib/evaluate-release";
import type { ReleaseEvaluationResult } from "@/types";

function getThresholdLabel(def: (typeof releaseMetricDefinitions)[number]): string {
  if (def.direction === "gte") {
    return `Pass: ≥ ${def.thresholdPass}${def.unit} · Warning: ≥ ${def.thresholdWarning}${def.unit}`;
  }
  return `Pass: ≤ ${def.thresholdPass} ${def.unit} · Warning: ≤ ${def.thresholdWarning} ${def.unit}`;
}

export function ReleaseReadiness() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReleaseEvaluationResult | null>(null);

  const handleChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    setResult(null);
  };

  const handleEvaluate = () => {
    const parsed: Record<string, number> = {};
    for (const def of releaseMetricDefinitions) {
      const raw = inputs[def.id];
      parsed[def.id] = raw !== undefined && raw !== "" ? parseFloat(raw) : 0;
    }
    setResult(evaluateReleaseReadiness(parsed, releaseMetricDefinitions));
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
  };

  const statusMap = result
    ? Object.fromEntries(result.metrics.map((m) => [m.id, m.status]))
    : {};

  return (
    <Section id="release-demo" className="relative overflow-hidden">
      <GradientBlob colors={["#34D399", "#00E5FF", "#A78BFA"]} />
      <div className="relative">
        <SectionHeader
          label="Interactive Demo"
          title="Release Readiness — Go or No-Go?"
          description="Enter your release metrics and see how a QA leader evaluates whether a release is ready to ship."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-4xl rounded-2xl border border-border-accent/50 bg-bg-card p-4"
        >
          <p className="flex items-start gap-2 text-sm text-text-secondary">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {RELEASE_DEMO_DISCLAIMER}
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-tertiary">
              Enter Your Release Metrics
            </h3>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {releaseMetricDefinitions.map((def, i) => (
                <MetricInput
                  key={def.id}
                  id={def.id}
                  label={def.label}
                  unit={def.unit}
                  placeholder={def.placeholder}
                  description={def.description}
                  value={inputs[def.id] ?? ""}
                  onChange={handleChange}
                  status={statusMap[def.id]}
                  thresholdLabel={getThresholdLabel(def)}
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-3">
            <MagneticButton>
              <button
                onClick={handleEvaluate}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                Evaluate Release Decision
              </button>
            </MagneticButton>

            {(result || Object.keys(inputs).length > 0) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`mt-8 rounded-2xl border-2 p-8 ${
                  result.decision === "go"
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
                    {result.decision === "go" ? (
                      <ShieldCheck className="h-14 w-14 text-[#34D399]" />
                    ) : (
                      <ShieldX className="h-14 w-14 text-[#EF4444]" />
                    )}
                  </motion.div>
                  <h3 className="text-2xl font-bold">
                    Decision:{" "}
                    <span
                      style={{
                        color: result.decision === "go" ? "#34D399" : "#EF4444",
                      }}
                    >
                      {result.decision === "go" ? "GO" : "NO-GO"}
                    </span>
                  </h3>
                  <p className="max-w-md text-center text-sm text-text-secondary">
                    {result.summary}
                  </p>
                  <div className="mt-2 flex gap-4 text-xs text-text-tertiary">
                    <span>
                      <span className="font-semibold text-[#34D399]">{result.passCount}</span> passed
                    </span>
                    <span>
                      <span className="font-semibold text-[#FBBF24]">{result.warningCount}</span> warning
                    </span>
                    <span>
                      <span className="font-semibold text-[#EF4444]">{result.failCount}</span> failed
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
