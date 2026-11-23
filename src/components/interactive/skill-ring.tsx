"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SkillRingProps {
  label: string;
  percentage: number;
  color: string;
  size?: number;
  delay?: number;
}

export function SkillRing({
  label,
  percentage,
  color,
  size = 100,
  delay = 0,
}: SkillRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg]"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="progress-ring-track"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="progress-ring-fill"
            stroke={color}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{
              duration: 1.5,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-lg font-bold text-text-primary"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-medium text-text-secondary text-center max-w-[90px] leading-tight">
        {label}
      </span>
    </div>
  );
}
