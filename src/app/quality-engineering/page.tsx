import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { expertiseTracks } from "@/data";

export const metadata: Metadata = {
  title: "Quality Engineering",
  description:
    "QA leadership expertise — test strategy, release governance, team building, and cross-platform testing across 300+ projects.",
};

export default function QualityEngineeringPage() {
  const track = expertiseTracks.find((t) => t.id === "quality-engineering")!;

  return (
    <>
      <Section className="pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn>
            <Badge variant="accent" className="mb-6">
              Quality Engineering
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {track.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {track.description}
            </p>
          </AnimateIn>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <SectionHeader
          label="Capabilities"
          title="What I Bring to Quality"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {track.capabilities.map((cap, i) => (
            <AnimateIn key={cap.title} delay={i * 0.08}>
              <Card className="h-full">
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {cap.description}
                </p>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            label="Approach"
            title="How I Think About Quality"
          />
          <div className="space-y-8 text-text-secondary">
            <AnimateIn>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                Quality is a system, not a checkpoint
              </h3>
              <p>
                Testing at the end of a sprint catches bugs — but the most expensive defects are the ones
                baked into requirements and designs before code is written. I push quality upstream: reviewing
                requirements for testability, challenging assumptions in design reviews, and making sure the
                team agrees on what &ldquo;done&rdquo; looks like before building starts.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                Not all features deserve equal coverage
              </h3>
              <p>
                Test strategy means understanding where risk lives. A payment flow needs deeper testing than
                a static content page. An offline sync module needs different test design than a simple CRUD
                form. I allocate testing effort based on risk profile, business impact, and historical defect
                patterns — not uniformly across every feature.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                Build-health feedback loops prevent recurring failures
              </h3>
              <p>
                Post-release build-health reports aren&apos;t just documentation — they&apos;re a feedback mechanism.
                When the team sees which modules consistently introduce regressions, they address root causes
                rather than repeatedly patching symptoms. The developer-to-QA demonstration process I introduced
                works similarly: developers catch their own issues when they walk QA through completed work.
              </p>
            </AnimateIn>
          </div>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-text-primary">
              See Quality Engineering in Action
            </h2>
            <p className="mt-3 text-text-secondary">
              Explore real case studies showing how quality engineering solves real problems.
            </p>
            <div className="mt-8">
              <Button href="/case-studies">
                View Case Studies <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
