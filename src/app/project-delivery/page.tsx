import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { expertiseTracks } from "@/data";

export const metadata: Metadata = {
  title: "Project Delivery",
  description:
    "Technical project delivery expertise — multi-project management, Agile delivery, stakeholder coordination, and release management.",
};

export default function ProjectDeliveryPage() {
  const track = expertiseTracks.find((t) => t.id === "project-delivery")!;

  return (
    <>
      <Section className="pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn>
            <Badge variant="accent" className="mb-6">
              Project Delivery
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
          title="What I Bring to Delivery"
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
            label="Perspective"
            title="PM With a QA Foundation"
          />
          <div className="space-y-8 text-text-secondary">
            <AnimateIn>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                I know what &ldquo;done&rdquo; actually looks like
              </h3>
              <p>
                Most PMs track progress by feature completion — a task moves to &ldquo;done&rdquo; when development
                finishes. Having built a QA department, I know that &ldquo;done&rdquo; means tested, regression-verified,
                and release-ready. That perspective changes how I plan sprints, estimate effort, and
                communicate timelines to clients.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                Resource allocation is the real game
              </h3>
              <p>
                In an agency managing concurrent projects with shared resources, every staffing decision
                creates a cascade. Adding a developer to Project A means less capacity on Project B.
                I make these tradeoffs explicitly — factoring in project priority, team skill match,
                delivery timelines, and commercial impact.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                Stakeholder communication is not a status update
              </h3>
              <p>
                Different clients need different communication. A US enterprise client wants structured
                updates with clear risk flags. A startup founder wants to know what shipped this week.
                I adjust cadence, format, and framing to match each stakeholder&apos;s decision-making
                context — the goal is informed clients, not just informed clients.
              </p>
            </AnimateIn>
          </div>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-text-primary">
              See Delivery in Practice
            </h2>
            <p className="mt-3 text-text-secondary">
              Case studies showing how quality-focused delivery coordination works across real projects.
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
