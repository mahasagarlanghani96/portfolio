"use client";

import { FloatingParticles } from "@/components/interactive/floating-particles";
import { HeroSection } from "@/components/sections/hero";
import { ProfessionalOverview } from "@/components/sections/professional-overview";
import { ExpertiseTracks } from "@/components/sections/expertise-tracks";
import { PhilosophySection } from "@/components/sections/philosophy";
import { DeliveryLifecycle } from "@/components/interactive/delivery-lifecycle";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { CaseStudiesPreview } from "@/components/sections/case-studies-preview";
import { SkillsSection } from "@/components/sections/skills-section";
import { ReleaseReadiness } from "@/components/interactive/release-readiness";
import { ProjectHealth } from "@/components/interactive/project-health";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <FloatingParticles count={35} />
      <div className="noise-overlay relative z-10">
        <HeroSection />
        <div className="section-divider" />
        <ProfessionalOverview />
        <div className="section-divider" />
        <ExpertiseTracks />
        <div className="section-divider" />
        <PhilosophySection />
        <div className="section-divider" />
        <DeliveryLifecycle />
        <div className="section-divider" />
        <ExperienceTimeline />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <CaseStudiesPreview />
        <div className="section-divider" />
        <ReleaseReadiness />
        <div className="section-divider" />
        <ProjectHealth />
        <div className="section-divider" />
        <ContactCTA />
      </div>
    </>
  );
}
