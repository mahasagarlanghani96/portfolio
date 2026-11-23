"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Briefcase, Award, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { experiences } from "@/data";
import { formatDateRange } from "@/lib/utils";

const roleColors: Record<string, string> = {
  "Project Manager": "#F472B6",
  "Lead SQA Engineer": "#A78BFA",
  "Senior SQA Engineer": "#00E5FF",
  "SQA Engineer": "#34D399",
  "Junior QA": "#FBBF24",
};

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  const allRoles = experiences.flatMap((exp) =>
    exp.roles.map((role) => ({ ...role, company: exp.company }))
  );

  return (
    <Section id="experience" className="relative overflow-hidden">
      <GradientBlob />
      <SectionHeader
        label="Career"
        title="Experience Timeline"
        description="From sole QA engineer to building a department to managing multi-project delivery."
      />

      <div ref={containerRef} className="relative mx-auto max-w-2xl">
        {/* Animated gradient line */}
        <div className="absolute left-6 top-0 h-full w-0.5 sm:left-8">
          <div className="h-full w-full bg-border/30 rounded-full" />
          <motion.div
            className="absolute left-0 top-0 w-full rounded-full"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, #00E5FF, #A78BFA, #F472B6)",
            }}
          />
        </div>

        <div className="space-y-8">
          {allRoles.map((role, i) => {
            const color = roleColors[role.title] || "#00E5FF";
            return (
              <motion.div
                key={`${role.company}-${role.title}`}
                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="absolute left-3.5 top-3 sm:left-5.5"
                  style={{ left: "18px" }}
                >
                  <div className="relative">
                    <div
                      className="h-5 w-5 rounded-full border-[3px] bg-bg-primary sm:h-6 sm:w-6"
                      style={{ borderColor: color }}
                    />
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-40"
                      style={{ background: color }}
                    />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="glow-card rounded-2xl border border-border bg-bg-card p-5 transition-all hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-text-primary text-base">
                          {role.title}
                        </h3>
                        {role.title === "Project Manager" && (
                          <span className="rounded-full bg-gradient-to-r from-[#F472B6] to-[#A78BFA] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium" style={{ color }}>
                        {role.company}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: `${color}15`, color }}
                    >
                      {formatDateRange(role.startDate, role.endDate)}
                    </span>
                  </div>

                  {/* Key highlights — compact visual */}
                  <div className="space-y-1.5">
                    {role.responsibilities.slice(0, 2).map((resp, ri) => (
                      <div key={ri} className="flex gap-2 text-xs leading-relaxed text-text-secondary">
                        <ArrowUpRight
                          className="mt-0.5 h-3 w-3 shrink-0"
                          style={{ color }}
                        />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  {role.technologies && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {role.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md px-2 py-0.5 text-[10px] font-medium border"
                          style={{
                            borderColor: `${color}30`,
                            color,
                            background: `${color}08`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
