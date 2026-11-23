import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { caseStudies } from "@/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real examples of quality engineering and project delivery — from offline sync integrity to multi-project coordination.",
};

export default function CaseStudiesPage() {
  const published = caseStudies.filter((cs) => !cs.draft);

  return (
    <Section className="pt-32">
      <SectionHeader
        label="Case Studies"
        title="Quality Engineering in Action"
        description="Real examples of how quality-focused approaches solve real problems across different domains and project types."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {published.map((cs, i) => (
          <AnimateIn key={cs.slug} delay={i * 0.08}>
            <Link href={`/case-studies/${cs.slug}`} className="block h-full">
              <Card hover className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-2">
                  <Badge variant="accent">{cs.domain}</Badge>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-text-primary">
                  {cs.title}
                </h2>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-text-secondary">
                  {cs.subtitle}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read case study <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
