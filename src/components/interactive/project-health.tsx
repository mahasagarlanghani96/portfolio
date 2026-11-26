"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Info,
  Activity,
  ShieldAlert,
  CircleX,
  RotateCcw,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { MetricInput } from "@/components/interactive/metric-input";
import { healthMetricDefinitions, HEALTH_DEMO_DISCLAIMER } from "@/data";
import { evaluateProjectHealth } from "@/lib/evaluate-health";
import type { HealthEvaluationResult, HealthStatus } from "@/types";

const statusConfig: Record<
  HealthStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  "on-track": {
    label: "On Track",
    color: "#34D399",
    icon: <Activity className="h-14 w-14 text-[#34D399]" />,
  },
  "at-risk": {
    label: "At Risk",
    color: "#FBBF24",
    icon: <ShieldAlert className="h-14 w-14 text-[#FBBF24]" />,
  },
  critical: {
    label: "Critical",
    color: "#EF4444",
    icon: <CircleX className="h-14 w-14 text-[#EF4444]" />,
  },
};

function getThresholdLabel(def: (typeof healthMetricDefinitions)[number]): string {
  if (def.direction === "gte") {
    return `Green: ≥ ${def.thresholdGreen}${def.unit} · Yellow: ≥ ${def.thresholdYellow}${def.unit}`;
  }
  return `Green: ≤ ${def.thresholdGreen} ${def.unit} · Yellow: ≤ ${def.thresholdYellow} ${def.unit}`;
}

export function ProjectHealth() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<HealthEvaluationResult | null>(null);

  const handleChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    setResult(null);
  };

  const handleEvaluate = () => {
    const parsed: Record<string, number> = {};
    for (const def of healthMetricDefinitions) {
      const raw = inputs[def.id];
      parsed[def.id] = raw !== undefined && raw !== "" ? parseFloat(raw) : 0;
    }
    setResult(evaluateProjectHealth(parsed, healthMetricDefinitions));
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
  };

  const statusMap = result
    ? Object.fromEntries(result.metrics.map((m) => [m.id, m.status]))
    : {};

  return (
    <Section id="project-health" className="relative overflow-hidden">
      <GradientBlob colors={["#FBBF24", "#A78BFA", "#34D399"]} />
      <div className="relative">
        <SectionHeader
          label="Interactive Demo"
          title="Project Health Assessment"
          description="Enter your project metrics and see how a project manager evaluates overall project health."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-4xl rounded-2xl border border-border-accent/50 bg-bg-card p-4"
        >
          <p className="flex items-start gap-2 text-sm text-text-secondary">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {HEALTH_DEMO_DISCLAIMER}
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-tertiary">
              Enter Your Project Metrics
            </h3>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {healthMetricDefinitions.map((def, i) => (
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
                Assess Project Health
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
                className="mt-8 rounded-2xl border-2 p-8"
                style={{
                  borderColor: statusConfig[result.overallStatus].color,
                  backgroundColor: `${statusConfig[result.overallStatus].color}08`,
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    {statusConfig[result.overallStatus].icon}
                  </motion.div>

                  {/* Health Score Ring */}
                  <div className="relative h-28 w-28">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="var(--border-secondary)"
                        strokeWidth="6"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={statusConfig[result.overallStatus].color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                        animate={{
                          strokeDashoffset:
                            2 * Math.PI * 42 * (1 - result.score / 100),
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-2xl font-bold"
                        style={{ color: statusConfig[result.overallStatus].color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {result.score}
                      </motion.span>
                      <span className="text-[10px] text-text-tertiary">/ 100</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold">
                    Status:{" "}
                    <span
                      style={{
                        color: statusConfig[result.overallStatus].color,
                      }}
                    >
                      {statusConfig[result.overallStatus].label}
                    </span>
                  </h3>
                  <p className="max-w-md text-center text-sm text-text-secondary">
                    {result.summary}
                  </p>
                  <div className="flex gap-4 text-xs text-text-tertiary">
                    <span>
                      <span className="font-semibold text-[#34D399]">{result.passCount}</span> healthy
                    </span>
                    <span>
                      <span className="font-semibold text-[#FBBF24]">{result.warningCount}</span> at risk
                    </span>
                    <span>
                      <span className="font-semibold text-[#EF4444]">{result.criticalCount}</span> critical
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
