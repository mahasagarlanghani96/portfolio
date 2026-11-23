"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

interface StatRingProps {
  value: number;
  suffix?: string;
  label: string;
  color: string;
  maxValue?: number;
  size?: number;
  delay?: number;
}

export function StatRing({
  value,
  suffix = "",
  label,
  color,
  maxValue,
  size = 140,
  delay = 0,
}: StatRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const max = maxValue || value;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    setTimeout(() => requestAnimationFrame(animate), delay * 1000);
  }, [isInView, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3"
    >
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
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="7"
            opacity="0.5"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${label.replace(/\s/g, "")})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient
              id={`gradient-${label.replace(/\s/g, "")}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary leading-none">
            {count}{suffix}
          </span>
        </div>
        {/* Glow */}
        <div
          className="absolute inset-2 rounded-full blur-2xl opacity-15"
          style={{ background: color }}
        />
      </div>
      <span className="text-sm font-medium text-text-secondary">{label}</span>
    </motion.div>
  );
}
