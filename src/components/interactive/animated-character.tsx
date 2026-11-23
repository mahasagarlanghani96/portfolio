"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "motion/react";

export function AnimatedCharacter() {
  const [isWaving, setIsWaving] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveControls = useAnimation();

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      waveControls.start({
        rotate: [0, 20, -10, 20, -10, 0],
        transition: { duration: 1.5, ease: "easeInOut" },
      });
      setTimeout(() => setIsWaving(false), 1500);
    }, 5000);

    return () => clearInterval(waveInterval);
  }, [waveControls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientX - centerX) / window.innerWidth) * 8;
      const y = ((e.clientY - centerY) / window.innerHeight) * 5;
      setEyePos({ x: Math.max(-8, Math.min(8, x)), y: Math.max(-5, Math.min(5, y)) });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400px] w-[320px] select-none sm:h-[480px] sm:w-[380px]">
      {/* Glow behind character */}
      <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

      <svg viewBox="0 0 380 480" className="relative h-full w-full" aria-hidden="true">
        {/* Body */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Shadow */}
          <ellipse cx="190" cy="460" rx="80" ry="12" fill="var(--accent-primary)" opacity="0.1" />

          {/* Legs */}
          <rect x="150" y="340" width="30" height="80" rx="15" fill="var(--bg-tertiary)" />
          <rect x="200" y="340" width="30" height="80" rx="15" fill="var(--bg-tertiary)" />

          {/* Shoes */}
          <ellipse cx="165" cy="420" rx="22" ry="10" fill="var(--accent-primary)" />
          <ellipse cx="215" cy="420" rx="22" ry="10" fill="var(--accent-primary)" />

          {/* Body/Torso */}
          <rect x="130" y="200" width="120" height="160" rx="40" fill="var(--bg-card)" stroke="var(--border-secondary)" strokeWidth="2" />

          {/* Shirt detail */}
          <rect x="170" y="200" width="40" height="80" rx="4" fill="var(--accent-primary)" opacity="0.15" />

          {/* Left arm */}
          <motion.g
            style={{ originX: "140px", originY: "220px" }}
            animate={isWaving ? undefined : { rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="90" y="220" width="28" height="90" rx="14" fill="var(--bg-card)" stroke="var(--border-secondary)" strokeWidth="2" />
            <circle cx="104" cy="315" r="14" fill="var(--bg-card)" stroke="var(--border-secondary)" strokeWidth="2" />
          </motion.g>

          {/* Right arm (waving) */}
          <motion.g
            animate={waveControls}
            style={{ originX: "250px", originY: "220px" }}
          >
            <rect x="260" y="200" width="28" height="90" rx="14" fill="var(--bg-card)" stroke="var(--border-secondary)" strokeWidth="2" />
            <circle cx="274" cy="195" r="14" fill="var(--bg-card)" stroke="var(--border-secondary)" strokeWidth="2" />
            {/* Fingers when waving */}
            {isWaving && (
              <>
                <line x1="268" y1="183" x2="265" y2="173" stroke="var(--bg-card)" strokeWidth="5" strokeLinecap="round" />
                <line x1="274" y1="181" x2="274" y2="170" stroke="var(--bg-card)" strokeWidth="5" strokeLinecap="round" />
                <line x1="280" y1="183" x2="283" y2="173" stroke="var(--bg-card)" strokeWidth="5" strokeLinecap="round" />
              </>
            )}
          </motion.g>

          {/* Neck */}
          <rect x="175" y="175" width="30" height="35" rx="10" fill="#e8b4a0" />

          {/* Head */}
          <motion.g
            animate={{ rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "190px", originY: "140px" }}
          >
            <ellipse cx="190" cy="130" rx="65" ry="72" fill="#e8b4a0" />

            {/* Hair */}
            <path
              d="M125 120 Q130 55 190 50 Q250 55 255 120 Q255 90 240 75 Q220 60 190 55 Q160 60 140 75 Q125 90 125 120Z"
              fill="var(--text-primary)"
            />

            {/* Ears */}
            <ellipse cx="126" cy="135" rx="12" ry="16" fill="#d9a08c" />
            <ellipse cx="254" cy="135" rx="12" ry="16" fill="#d9a08c" />

            {/* Eyes */}
            <g>
              {isBlinking ? (
                <>
                  <line x1="160" y1="130" x2="180" y2="130" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                  <line x1="200" y1="130" x2="220" y2="130" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Left eye */}
                  <ellipse cx="170" cy="128" rx="14" ry="15" fill="white" />
                  <motion.circle
                    cx={170 + eyePos.x}
                    cy={128 + eyePos.y}
                    r="7"
                    fill="var(--text-primary)"
                  />
                  <motion.circle
                    cx={168 + eyePos.x}
                    cy={125 + eyePos.y}
                    r="2.5"
                    fill="white"
                  />

                  {/* Right eye */}
                  <ellipse cx="210" cy="128" rx="14" ry="15" fill="white" />
                  <motion.circle
                    cx={210 + eyePos.x}
                    cy={128 + eyePos.y}
                    r="7"
                    fill="var(--text-primary)"
                  />
                  <motion.circle
                    cx={208 + eyePos.x}
                    cy={125 + eyePos.y}
                    r="2.5"
                    fill="white"
                  />
                </>
              )}
            </g>

            {/* Eyebrows */}
            <motion.line
              x1="157" y1="108" x2="183" y2="110"
              stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"
              animate={{ y1: isWaving ? 104 : 108 }}
            />
            <motion.line
              x1="197" y1="110" x2="223" y2="108"
              stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"
              animate={{ y1: isWaving ? 106 : 110 }}
            />

            {/* Nose */}
            <path d="M187 140 Q190 148 193 140" fill="none" stroke="#d9a08c" strokeWidth="2" />

            {/* Mouth */}
            <motion.path
              d="M172 158 Q190 172 208 158"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                d: isWaving
                  ? "M168 155 Q190 178 212 155"
                  : "M172 158 Q190 172 208 158",
              }}
            />

            {/* Glasses */}
            <circle cx="170" cy="128" r="20" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" opacity="0.8" />
            <circle cx="210" cy="128" r="20" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" opacity="0.8" />
            <line x1="190" y1="128" x2="190" y2="128" stroke="var(--accent-primary)" strokeWidth="2.5" opacity="0.8" />
            <path d="M150 128 L126 124" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.6" />
            <path d="M230 128 L254 124" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.6" />
          </motion.g>

          {/* Laptop */}
          {!isWaving && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <rect x="100" y="295" width="80" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--border-secondary)" strokeWidth="1.5" />
              <rect x="108" y="300" width="64" height="36" rx="2" fill="var(--accent-primary)" opacity="0.2" />
              {/* Code lines on screen */}
              <rect x="114" y="308" width="30" height="3" rx="1.5" fill="var(--accent-primary)" opacity="0.6" />
              <rect x="114" y="315" width="45" height="3" rx="1.5" fill="var(--accent-primary)" opacity="0.4" />
              <rect x="114" y="322" width="20" height="3" rx="1.5" fill="var(--accent-primary)" opacity="0.5" />
              {/* Keyboard */}
              <path d="M90 345 L100 295 L180 295 L190 345 Z" fill="var(--bg-tertiary)" stroke="var(--border-secondary)" strokeWidth="1.5" />
            </motion.g>
          )}
        </motion.g>

        {/* Floating thought bubbles */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0], y: [0, -10, -10, -20] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        >
          <circle cx="300" cy="80" r="6" fill="var(--accent-primary)" opacity="0.3" />
          <circle cx="310" cy="60" r="10" fill="var(--accent-primary)" opacity="0.3" />
          <rect x="295" y="20" width="70" height="35" rx="17" fill="var(--accent-primary)" opacity="0.2" stroke="var(--accent-primary)" strokeWidth="1" />
          <text x="330" y="42" textAnchor="middle" fontSize="14" fill="var(--accent-primary)" fontFamily="monospace">QA ✓</text>
        </motion.g>
      </svg>
    </div>
  );
}
