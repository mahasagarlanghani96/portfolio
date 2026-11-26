"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Folder } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { TiltCard } from "@/components/interactive/tilt-card";
import { caseStudies } from "@/data";

const cardColors = ["#00E5FF", "#A78BFA", "#F472B6"];

export function CaseStudiesPreview() {
  const featured = caseStudies.filter((cs) => !cs.draft).slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="case-studies" className="relative overflow-hidden">
      <GradientBlob colors={["#F472B6", "#A78BFA", "#00E5FF"]} />
      <SectionHeader
        label="Case Studies"
        title="Quality in Action"
        description="Real examples of how quality engineering and delivery coordination solve problems."
      />

      <div ref={ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((cs, i) => {
          const color = cardColors[i % cardColors.length];
          return (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/case-studies/${cs.slug}`} className="block h-full group">
                <TiltCard className="relative flex h-full flex-col p-6" glowColor={color}>
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}60)`, opacity: 0.6 }}
                  />
                  <div className="relative">
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `${color}15`, color }}
                    >
                      {cs.domain}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                      {cs.title}
                    </h3>
                    <p className="mb-4 flex-grow text-xs text-text-secondary leading-relaxed">
                      {cs.subtitle}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2 py-0.5 text-[10px] font-medium text-text-tertiary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 rounded-2xl border border-border-accent bg-bg-card px-6 py-3 font-medium text-accent transition-all hover:shadow-lg"
        >
          View All Case Studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </Section>
  );
}
