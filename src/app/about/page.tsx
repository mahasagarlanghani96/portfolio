import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Globe, Award } from "lucide-react";
import { personalInfo, education, experiences } from "@/data";

export const metadata: Metadata = {
  title: "About",
  description: `About ${personalInfo.name} — QA operations leader turned Project Manager with 8+ years of experience across 300+ projects.`,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <Badge variant="accent" className="mb-6">
              About Me
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {personalInfo.name}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-text-secondary">
              {personalInfo.summary}
            </p>
          </AnimateIn>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <h2 className="mb-6 text-2xl font-bold text-text-primary">
              The Journey
            </h2>
            <div className="space-y-6 text-text-secondary">
              <p>
                I started at the bottom — the only QA in a fast-moving agency, handling 15–20 website
                tasks daily alongside complex cross-department projects. That experience taught me to
                prioritize ruthlessly, understand systems quickly, and communicate quality issues in terms
                developers and product managers actually care about.
              </p>
              <p>
                When I noticed QA engineers were scattered across departments with no unified standards,
                I proposed centralizing them. That proposal led to my first leadership role, and eventually
                to building and running a 9–15 person QA department. Along the way, I defined how the
                company plans tests, runs regressions, and decides whether releases are ready to ship.
              </p>
              <p>
                The transition to project management was natural — I was already doing delivery coordination
                as QA Lead: joining client calls, managing stakeholder expectations, planning resources,
                and making release decisions. Now I bring that quality-first perspective to managing six
                concurrent projects across web, mobile, desktop, and IoT platforms.
              </p>
            </div>
          </AnimateIn>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="Education" title="Academic Background" align="left" />

          {education.map((edu) => (
            <AnimateIn key={edu.institution}>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-sm text-accent">{edu.institution}</p>
                    <p className="text-sm text-text-tertiary">
                      {edu.startYear} — {edu.endYear}
                      {edu.gpa && ` • CGPA: ${edu.gpa}`}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          ))}

          <AnimateIn delay={0.1}>
            <div className="mt-10">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary">
                <Globe className="h-5 w-5 text-accent" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.languages.map((lang) => (
                  <Badge key={lang.name} variant="accent">
                    {lang.name} ({lang.level})
                  </Badge>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="mt-10">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary">
                <Award className="h-5 w-5 text-accent" />
                Recognition
              </h3>
              <Card>
                <p className="font-medium text-text-primary">Best SQA Engineer Award</p>
                <p className="text-sm text-text-secondary">
                  Recognized for outstanding performance during the initial period at KoderLabs,
                  where I was the sole QA engineer handling all projects from design through delivery.
                </p>
              </Card>
            </div>
          </AnimateIn>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-text-primary">
              Want to work together?
            </h2>
            <p className="mt-3 text-text-secondary">
              I&apos;m always open to discussing quality engineering, project delivery, and how to ship better software.
            </p>
            <div className="mt-8">
              <Button href="/contact">
                Get In Touch <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
