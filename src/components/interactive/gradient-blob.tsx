"use client";

import { motion } from "motion/react";

interface GradientBlobProps {
  className?: string;
  colors?: [string, string, string];
}

export function GradientBlob({
  className = "",
  colors = ["var(--accent-cyan)", "var(--accent-secondary)", "var(--accent-tertiary)"],
}: GradientBlobProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-[0.10]"
        style={{
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, -20, 50, 0],
          y: [0, -30, 20, -10, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-[0.10]"
        style={{
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 30, -20, 0],
          y: [0, 20, -30, 15, 0],
          scale: [1, 0.95, 1.1, 0.98, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full opacity-[0.07]"
        style={{
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -40, 20, 0],
          y: [0, -40, 10, -30, 0],
          scale: [1, 1.08, 0.92, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
