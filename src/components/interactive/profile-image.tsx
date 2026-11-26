"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const ORBIT_COLORS = ["#00E5FF", "#A78BFA", "#F472B6", "#34D399", "#FBBF24", "#FB923C"];

function OrbitDot({
  color,
  radius,
  duration,
  size,
  delay,
}: {
  color: string;
  radius: number;
  duration: number;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}80`,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      animate={{
        x: [
          Math.cos(0) * radius,
          Math.cos(Math.PI * 0.5) * radius,
          Math.cos(Math.PI) * radius,
          Math.cos(Math.PI * 1.5) * radius,
          Math.cos(Math.PI * 2) * radius,
        ],
        y: [
          Math.sin(0) * radius,
          Math.sin(Math.PI * 0.5) * radius,
          Math.sin(Math.PI) * radius,
          Math.sin(Math.PI * 1.5) * radius,
          Math.sin(Math.PI * 2) * radius,
        ],
        opacity: [0.4, 0.9, 0.4, 0.9, 0.4],
        scale: [1, 1.3, 1, 1.3, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}

export function ProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-8, 8]);
  const orbX = useTransform(springX, [-1, 1], [6, -6]);
  const orbY = useTransform(springY, [-1, 1], [6, -6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-[320px] select-none sm:h-[480px] sm:w-[380px]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5FF]/20 via-[#A78BFA]/15 to-[#F472B6]/20 blur-3xl" />

      {/* Orbiting dots — behind and in front for depth */}
      <motion.div className="absolute inset-0" style={{ x: orbX, y: orbY }}>
        {ORBIT_COLORS.map((color, i) => (
          <OrbitDot
            key={color}
            color={color}
            radius={140 + i * 12}
            duration={8 + i * 2.5}
            size={4 + (i % 3) * 2}
            delay={i * 1.2}
          />
        ))}
      </motion.div>

      {/* Animated glowing ring */}
      <div className="absolute inset-[10%] sm:inset-[8%]">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from var(--ring-angle, 0deg), #00E5FF, #A78BFA, #F472B6, #34D399, #00E5FF)",
            padding: 3,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-1 rounded-full blur-xl"
          style={{
            background:
              "conic-gradient(from var(--ring-angle, 0deg), #00E5FF40, #A78BFA40, #F472B640, #34D39940, #00E5FF40)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Photo container */}
      <motion.div
        className="absolute inset-[12%] sm:inset-[10%] overflow-hidden rounded-full border-2 border-white/10"
        style={{ x: imgX, y: imgY }}
      >
        <Image
          src="/images/profile.png"
          alt="Mahasagar Langhani"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 640px) 280px, 340px"
        />
        {/* Inner overlay for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0C1222]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Floating accent sparkles */}
      {[
        { x: "10%", y: "15%", color: "#00E5FF", size: 6, delay: 0 },
        { x: "85%", y: "20%", color: "#A78BFA", size: 5, delay: 1.5 },
        { x: "90%", y: "70%", color: "#F472B6", size: 7, delay: 3 },
        { x: "5%", y: "75%", color: "#34D399", size: 4, delay: 4.5 },
      ].map((spark, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            background: spark.color,
            boxShadow: `0 0 ${spark.size * 4}px ${spark.color}`,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, -5, 3, 0],
            opacity: [0.3, 1, 0.3, 0.8, 0.3],
            scale: [1, 1.5, 1, 1.3, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}
