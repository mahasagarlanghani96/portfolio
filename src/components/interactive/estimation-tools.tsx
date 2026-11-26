"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Info,
  ShieldCheck,
  ShieldX,
  Activity,
  ShieldAlert,
  CircleX,
  RotateCcw,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { MetricInput } from "@/components/interactive/metric-input";
import { releaseMetricDefinitions, RELEASE_DEMO_DISCLAIMER } from "@/data";
import { healthMetricDefinitions, HEALTH_DEMO_DISCLAIMER } from "@/data";
import { evaluateReleaseReadiness } from "@/lib/evaluate-release";
import { evaluateProjectHealth } from "@/lib/evaluate-health";
import type {
  ReleaseEvaluationResult,
  HealthEvaluationResult,
  HealthStatus,
} from "@/types";

type ActiveTab = "qa" | "pm";

const tabs = [
  { id: "qa" as const, label: "QA Release Readiness", gradient: "linear-gradient(135deg, #34D399, #00E5FF)" },
  { id: "pm" as const, label: "PM Project Health", gradient: "linear-gradient(135deg, #FBBF24, #A78BFA)" },
];

const blobColors: Record<ActiveTab, [string, string, string]> = {
  qa: ["#34D399", "#00E5FF", "#A78BFA"],
  pm: ["#FBBF24", "#A78BFA", "#34D399"],
};

function getReleaseThresholdLabel(def: (typeof releaseMetricDefinitions)[number]): string {
  if (def.direction === "gte") {
    return `Pass: ≥ ${def.thresholdPass}${def.unit} · Warning: ≥ ${def.thresholdWarning}${def.unit}`;
  }
  return `Pass: ≤ ${def.thresholdPass} ${def.unit} · Warning: ≤ ${def.thresholdWarning} ${def.unit}`;
}

function getHealthThresholdLabel(def: (typeof healthMetricDefinitions)[number]): string {
  if (def.direction === "gte") {
    return `Green: ≥ ${def.thresholdGreen}${def.unit} · Yellow: ≥ ${def.thresholdYellow}${def.unit}`;
  }
  return `Green: ≤ ${def.thresholdGreen} ${def.unit} · Yellow: ≤ ${def.thresholdYellow} ${def.unit}`;
}

const healthStatusConfig: Record<
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

export function EstimationTools() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("qa");

  const [qaInputs, setQaInputs] = useState<Record<string, string>>({});
  const [qaResult, setQaResult] = useState<ReleaseEvaluationResult | null>(null);

  const [pmInputs, setPmInputs] = useState<Record<string, string>>({});
  const [pmResult, setPmResult] = useState<HealthEvaluationResult | null>(null);

  const handleQaChange = (id: string, value: string) => {
    setQaInputs((prev) => ({ ...prev, [id]: value }));
    setQaResult(null);
  };

  const handlePmChange = (id: string, value: string) => {
    setPmInputs((prev) => ({ ...prev, [id]: value }));
    setPmResult(null);
  };

  const handleQaEvaluate = () => {
    const parsed: Record<string, number> = {};
    for (const def of releaseMetricDefinitions) {
      const raw = qaInputs[def.id];
      parsed[def.id] = raw !== undefined && raw !== "" ? parseFloat(raw) : 0;
    }
    setQaResult(evaluateReleaseReadiness(parsed, releaseMetricDefinitions));
  };

  const handlePmEvaluate = () => {
    const parsed: Record<string, number> = {};
    for (const def of healthMetricDefinitions) {
      const raw = pmInputs[def.id];
      parsed[def.id] = raw !== undefined && raw !== "" ? parseFloat(raw) : 0;
    }
    setPmResult(evaluateProjectHealth(parsed, healthMetricDefinitions));
  };

  const qaStatusMap = qaResult
    ? Object.fromEntries(qaResult.metrics.map((m) => [m.id, m.status]))
    : {};
  const pmStatusMap = pmResult
    ? Object.fromEntries(pmResult.metrics.map((m) => [m.id, m.status]))
    : {};

  return (
    <Section id="estimation" className="relative overflow-hidden">
      <GradientBlob colors={blobColors[activeTab]} />
      <div className="relative">
        <SectionHeader
          label="Interactive Tools"
          title="Estimation Toolkit"
          description="Hands-on tools demonstrating how I evaluate release readiness and project health."
        />

        {/* Tab Switcher */}
        <div className="mb-12 flex justify-center">
          <div className="relative inline-flex rounded-2xl border border-border bg-bg-card p-1.5 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all sm:px-8"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="estimationTabBg"
                    className="absolute inset-0 rounded-xl shadow-lg"
                    style={{ background: tab.gradient }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === tab.id
                      ? "text-white font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "qa" ? (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Disclaimer */}
              <div className="mx-auto mb-6 max-w-4xl rounded-2xl border border-border-accent/50 bg-bg-card p-4">
                <p className="flex items-start gap-2 text-sm text-text-secondary">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {RELEASE_DEMO_DISCLAIMER}
                </p>
              </div>

              <div className="mx-auto max-w-5xl">
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
                      value={qaInputs[def.id] ?? ""}
                      onChange={handleQaChange}
                      status={qaStatusMap[def.id]}
                      thresholdLabel={getReleaseThresholdLabel(def)}
                      min={def.min}
                      max={def.max}
                      step={def.step}
                      index={i}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <MagneticButton>
                    <button
                      onClick={handleQaEvaluate}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#34D399] via-[#00E5FF] to-[#A78BFA] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                      Evaluate Release Decision
                    </button>
                  </MagneticButton>

                  {(qaResult || Object.keys(qaInputs).length > 0) && (
                    <button
                      onClick={() => { setQaInputs({}); setQaResult(null); }}
                      className="flex items-center gap-1.5 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {qaResult && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-8 rounded-2xl border-2 p-8 ${
                        qaResult.decision === "go"
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
                          {qaResult.decision === "go" ? (
                            <ShieldCheck className="h-14 w-14 text-[#34D399]" />
                          ) : (
                            <ShieldX className="h-14 w-14 text-[#EF4444]" />
                          )}
                        </motion.div>
                        <h3 className="text-2xl font-bold">
                          Decision:{" "}
                          <span style={{ color: qaResult.decision === "go" ? "#34D399" : "#EF4444" }}>
                            {qaResult.decision === "go" ? "GO" : "NO-GO"}
                          </span>
                        </h3>
                        <p className="max-w-md text-center text-sm text-text-secondary">
                          {qaResult.summary}
                        </p>
                        <div className="mt-2 flex gap-4 text-xs text-text-tertiary">
                          <span>
                            <span className="font-semibold text-[#34D399]">{qaResult.passCount}</span> passed
                          </span>
                          <span>
                            <span className="font-semibold text-[#FBBF24]">{qaResult.warningCount}</span> warning
                          </span>
                          <span>
                            <span className="font-semibold text-[#EF4444]">{qaResult.failCount}</span> failed
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pm"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Disclaimer */}
              <div className="mx-auto mb-6 max-w-4xl rounded-2xl border border-border-accent/50 bg-bg-card p-4">
                <p className="flex items-start gap-2 text-sm text-text-secondary">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {HEALTH_DEMO_DISCLAIMER}
                </p>
              </div>

              <div className="mx-auto max-w-5xl">
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
                      value={pmInputs[def.id] ?? ""}
                      onChange={handlePmChange}
                      status={pmStatusMap[def.id]}
                      thresholdLabel={getHealthThresholdLabel(def)}
                      min={def.min}
                      max={def.max}
                      step={def.step}
                      index={i}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <MagneticButton>
                    <button
                      onClick={handlePmEvaluate}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FBBF24] via-[#A78BFA] to-[#F472B6] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                      Assess Project Health
                    </button>
                  </MagneticButton>

                  {(pmResult || Object.keys(pmInputs).length > 0) && (
                    <button
                      onClick={() => { setPmInputs({}); setPmResult(null); }}
                      className="flex items-center gap-1.5 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {pmResult && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-8 rounded-2xl border-2 p-8"
                      style={{
                        borderColor: healthStatusConfig[pmResult.overallStatus].color,
                        backgroundColor: `${healthStatusConfig[pmResult.overallStatus].color}08`,
                      }}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        >
                          {healthStatusConfig[pmResult.overallStatus].icon}
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
                              stroke={healthStatusConfig[pmResult.overallStatus].color}
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 42}
                              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                              animate={{
                                strokeDashoffset:
                                  2 * Math.PI * 42 * (1 - pmResult.score / 100),
                              }}
                              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                              className="text-2xl font-bold"
                              style={{ color: healthStatusConfig[pmResult.overallStatus].color }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {pmResult.score}
                            </motion.span>
                            <span className="text-[10px] text-text-tertiary">/ 100</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold">
                          Status:{" "}
                          <span style={{ color: healthStatusConfig[pmResult.overallStatus].color }}>
                            {healthStatusConfig[pmResult.overallStatus].label}
                          </span>
                        </h3>
                        <p className="max-w-md text-center text-sm text-text-secondary">
                          {pmResult.summary}
                        </p>
                        <div className="flex gap-4 text-xs text-text-tertiary">
                          <span>
                            <span className="font-semibold text-[#34D399]">{pmResult.passCount}</span> healthy
                          </span>
                          <span>
                            <span className="font-semibold text-[#FBBF24]">{pmResult.warningCount}</span> at risk
                          </span>
                          <span>
                            <span className="font-semibold text-[#EF4444]">{pmResult.criticalCount}</span> critical
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
