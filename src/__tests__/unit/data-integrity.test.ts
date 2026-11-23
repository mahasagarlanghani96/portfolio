import { describe, it, expect } from "vitest";
import { personalInfo, education, socialLinks } from "@/data/personal";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { caseStudies } from "@/data/case-studies";
import { expertiseTracks, lifecyclePhases } from "@/data/expertise";
import { sampleReleaseMetrics, sampleReleaseCriteria } from "@/data/release-demo";

describe("data integrity", () => {
  describe("personalInfo", () => {
    it("has required fields", () => {
      expect(personalInfo.name).toBeTruthy();
      expect(personalInfo.email).toBeTruthy();
      expect(personalInfo.location).toBeTruthy();
      expect(personalInfo.summary).toBeTruthy();
    });

    it("has valid email format", () => {
      expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe("experiences", () => {
    it("has at least one experience", () => {
      expect(experiences.length).toBeGreaterThan(0);
    });

    it("each experience has roles", () => {
      experiences.forEach((exp) => {
        expect(exp.roles.length).toBeGreaterThan(0);
        exp.roles.forEach((role) => {
          expect(role.title).toBeTruthy();
          expect(role.startDate).toBeTruthy();
          expect(role.responsibilities.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe("skillGroups", () => {
    it("has at least one group", () => {
      expect(skillGroups.length).toBeGreaterThan(0);
    });

    it("each group has skills", () => {
      skillGroups.forEach((group) => {
        expect(group.skills.length).toBeGreaterThan(0);
        expect(group.label).toBeTruthy();
      });
    });
  });

  describe("caseStudies", () => {
    it("has at least one case study", () => {
      expect(caseStudies.length).toBeGreaterThan(0);
    });

    it("each case study has unique slug", () => {
      const slugs = caseStudies.map((cs) => cs.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("each case study has required content", () => {
      caseStudies.forEach((cs) => {
        expect(cs.title).toBeTruthy();
        expect(cs.background).toBeTruthy();
        expect(cs.problem).toBeTruthy();
        expect(cs.role).toBeTruthy();
        expect(cs.challenges.length).toBeGreaterThan(0);
        expect(cs.approach.length).toBeGreaterThan(0);
        expect(cs.lessons.length).toBeGreaterThan(0);
      });
    });
  });

  describe("expertiseTracks", () => {
    it("has two tracks", () => {
      expect(expertiseTracks).toHaveLength(2);
    });

    it("has quality-engineering and project-delivery", () => {
      const ids = expertiseTracks.map((t) => t.id);
      expect(ids).toContain("quality-engineering");
      expect(ids).toContain("project-delivery");
    });
  });

  describe("lifecyclePhases", () => {
    it("has 7 phases", () => {
      expect(lifecyclePhases).toHaveLength(7);
    });

    it("each phase has qa and pm activities", () => {
      lifecyclePhases.forEach((phase) => {
        expect(phase.qaActivities.length).toBeGreaterThan(0);
        expect(phase.pmActivities.length).toBeGreaterThan(0);
        expect(phase.deliverables.length).toBeGreaterThan(0);
      });
    });
  });

  describe("releaseDemo", () => {
    it("has metrics with valid statuses", () => {
      sampleReleaseMetrics.forEach((m) => {
        expect(["pass", "fail", "warning"]).toContain(m.status);
      });
    });

    it("has criteria with boolean met values", () => {
      sampleReleaseCriteria.forEach((c) => {
        expect(typeof c.met).toBe("boolean");
      });
    });
  });
});
