"use client";

import { useRef } from "react";
import {
  ClipboardList,
  ShieldCheck,
  Users,
  Settings,
  Target,
  TrendingUp,
  Zap,
  MessageSquare,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";

const areas = [
  { icon: ShieldCheck, title: "QA Leadership", color: "#00E5FF" },
  { icon: ClipboardList, title: "Test Strategy", color: "#A78BFA" },
  { icon: Target, title: "Full Coverage Testing", color: "#F472B6" },
  { icon: Settings, title: "Automation Strategy", color: "#34D399" },
  { icon: ShieldCheck, title: "Release Governance", color: "#FBBF24" },
  { icon: TrendingUp, title: "Risk Management", color: "#FB923C" },
  { icon: Zap, title: "Project Management", color: "#00E5FF" },
  { icon: BarChart3, title: "Agile Delivery", color: "#A78BFA" },
  { icon: MessageSquare, title: "Stakeholder Mgmt", color: "#F472B6" },
  { icon: Users, title: "Team Development", color: "#34D399" },
];

export function ProfessionalOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="overview" className="relative overflow-hidden">
      <GradientBlob />
      <div className="relative">
        <SectionHeader
          label="What I Do"
          title="Professional Expertise"
          description="Combining quality assurance leadership with technical project delivery."
        />

        {/* Visual grid of expertise areas — icon-focused, minimal text */}
        <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="flex flex-col items-center gap-3 p-5 text-center cursor-default" glowColor={area.color}>
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: `${area.color}15` }}
                >
                  <area.icon className="h-7 w-7" style={{ color: area.color }} />
                </div>
                <span className="text-xs font-semibold text-text-primary">
                  {area.title}
                </span>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
