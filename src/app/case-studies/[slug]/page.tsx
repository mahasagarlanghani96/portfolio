import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { caseStudies } from "@/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies
    .filter((cs) => !cs.draft)
    .map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug && !c.draft);

  if (!cs) notFound();

  const currentIndex = caseStudies.filter((c) => !c.draft).findIndex((c) => c.slug === slug);
  const published = caseStudies.filter((c) => !c.draft);
  const next = published[currentIndex + 1];
  const prev = published[currentIndex - 1];

  return (
    <article>
      <Section className="pt-32">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <Link
              href="/case-studies"
              className="mb-8 inline-flex items-center gap-1 text-sm text-text-tertiary hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Case Studies
            </Link>

            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="accent">{cs.domain}</Badge>
              {cs.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-4 text-xl text-text-secondary">{cs.subtitle}</p>
          </AnimateIn>
        </div>
      </Section>

      <Section className="bg-bg-secondary pt-10">
        <div className="mx-auto max-w-3xl space-y-12">
          <AnimateIn>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Background</h2>
            <p className="leading-relaxed text-text-secondary">{cs.background}</p>
          </AnimateIn>

          <AnimateIn delay={0.05}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">The Problem</h2>
            <p className="leading-relaxed text-text-secondary">{cs.problem}</p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">My Role</h2>
            <p className="leading-relaxed text-text-secondary">{cs.role}</p>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Challenges</h2>
            <ul className="space-y-2">
              {cs.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {challenge}
                </li>
              ))}
            </ul>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Approach</h2>
            <ul className="space-y-2">
              {cs.approach.map((step, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {step}
                </li>
              ))}
            </ul>
          </AnimateIn>

          <AnimateIn delay={0.25}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Collaboration</h2>
            <p className="leading-relaxed text-text-secondary">{cs.collaboration}</p>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Outcome</h2>
            <p className="leading-relaxed text-text-secondary">{cs.outcome}</p>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <h2 className="mb-3 text-xl font-semibold text-text-primary">Lessons Learned</h2>
            <ul className="space-y-3">
              {cs.lessons.map((lesson, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border bg-bg-card p-4 text-sm leading-relaxed text-text-secondary"
                >
                  {lesson}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          {prev ? (
            <Button variant="ghost" href={`/case-studies/${prev.slug}`}>
              <ArrowLeft className="h-4 w-4" /> {prev.title}
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button variant="ghost" href={`/case-studies/${next.slug}`}>
              {next.title} <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </Section>
    </article>
  );
}
