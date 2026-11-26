"use client";

import { motion } from "motion/react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { MetricStatus } from "@/types";

interface MetricInputProps {
  id: string;
  label: string;
  unit: string;
  placeholder: string;
  description: string;
  value: string;
  onChange: (id: string, value: string) => void;
  status?: MetricStatus;
  thresholdLabel: string;
  min?: number;
  max?: number;
  step?: number;
  index: number;
}

const statusColors: Record<MetricStatus, string> = {
  pass: "#34D399",
  fail: "#EF4444",
  warning: "#FBBF24",
};

const statusIcons: Record<MetricStatus, React.ReactNode> = {
  pass: <CheckCircle2 className="h-5 w-5 text-[#34D399]" />,
  fail: <XCircle className="h-5 w-5 text-[#EF4444]" />,
  warning: <AlertTriangle className="h-5 w-5 text-[#FBBF24]" />,
};

export function MetricInput({
  id,
  label,
  unit,
  placeholder,
  description,
  value,
  onChange,
  status,
  thresholdLabel,
  min,
  max,
  step,
  index,
}: MetricInputProps) {
  const inputId = `metric-${id}`;
  const descId = `metric-desc-${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
    >
      <div
        className="absolute top-0 right-0 left-0 h-0.5"
        style={{
          background: status ? statusColors[status] : "var(--border-secondary)",
          opacity: status ? 0.8 : 0.3,
        }}
      />

      <div className="mb-3 flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-semibold text-text-primary">
          {label}
        </label>
        {status && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {statusIcons[status]}
          </motion.div>
        )}
      </div>

      <div className="relative">
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          aria-describedby={descId}
          className="w-full rounded-xl border border-border bg-bg-primary px-4 py-2.5 pr-14 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-text-tertiary">
          {unit}
        </span>
      </div>

      <p id={descId} className="mt-2 text-[10px] text-text-tertiary">
        {description}
      </p>
      <p className="mt-1 text-[10px] text-text-tertiary">{thresholdLabel}</p>
    </motion.div>
  );
}
