"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { SkillRing } from "@/components/interactive/skill-ring";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";

const coreSkills = [
  { label: "Test Strategy", percentage: 95, color: "#00E5FF" },
  { label: "QA Leadership", percentage: 92, color: "#A78BFA" },
  { label: "Release Governance", percentage: 90, color: "#F472B6" },
  { label: "Agile Delivery", percentage: 88, color: "#34D399" },
  { label: "Project Management", percentage: 85, color: "#FBBF24" },
  { label: "Automation", percentage: 70, color: "#FB923C" },
];

const toolCategories = [
  {
    label: "Testing",
    color: "#00E5FF",
    tools: ["Manual Testing", "API Testing", "Regression", "Cross-browser", "Mobile", "UAT", "Performance"],
  },
  {
    label: "Tools",
    color: "#A78BFA",
    tools: ["Jira", "Postman", "BrowserStack", "LambdaTest", "Confluence", "Figma", "Slack"],
  },
  {
    label: "Automation",
    color: "#F472B6",
    tools: ["Selenium", "Playwright", "Appium", "JMeter", "Locust", "JavaScript"],
  },
  {
    label: "Delivery",
    color: "#34D399",
    tools: ["Agile/Scrum", "Sprint Planning", "Release Planning", "Risk Management", "SOWs", "Stakeholder Mgmt"],
  },
];

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="skills" className="relative overflow-hidden">
      <GradientBlob />
      <div className="relative">
        <SectionHeader
          label="Toolkit"
          title="Skills & Expertise"
          description="Core competencies built across 8+ years and 300+ projects."
        />

        {/* Core Skills — Visual Rings */}
        <div ref={ref} className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-sm font-semibold uppercase tracking-widest text-text-tertiary mb-8"
          >
            Core Competencies
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12">
            {coreSkills.map((skill, i) => (
              <SkillRing
                key={skill.label}
                label={skill.label}
                percentage={skill.percentage}
                color={skill.color}
                size={100}
                delay={i * 0.12}
              />
            ))}
          </div>
        </div>

        {/* Tool Categories — Visual Cards with colored tags */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {toolCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}40` }}
                  />
                  <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: cat.color }}>
                    {cat.label}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((tool, ti) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + ti * 0.03, duration: 0.3 }}
                      className="skill-tag cursor-default rounded-lg border border-border bg-bg-secondary px-2.5 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
