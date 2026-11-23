export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  languages: Language[];
}

export interface Language {
  name: string;
  level: "Native" | "Fluent" | "Professional" | "Conversational";
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  roles: Role[];
}

export interface Role {
  title: string;
  startDate: string;
  endDate: string | "Present";
  responsibilities: string[];
  technologies?: string[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | "testing"
  | "qa-leadership"
  | "project-management"
  | "tools"
  | "automation"
  | "methodologies";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  description: string;
  skills: Skill[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  tags: string[];
  background: string;
  problem: string;
  role: string;
  challenges: string[];
  approach: string[];
  collaboration: string;
  outcome: string;
  lessons: string[];
  draft: boolean;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: number;
  endYear: number;
  gpa?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ExpertiseTrack {
  id: "quality-engineering" | "project-delivery";
  title: string;
  subtitle: string;
  description: string;
  capabilities: Capability[];
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
}

export interface LifecyclePhase {
  id: string;
  title: string;
  description: string;
  qaActivities: string[];
  pmActivities: string[];
  deliverables: string[];
}

export interface ReleaseMetric {
  label: string;
  value: number;
  threshold: number;
  unit: string;
  status: "pass" | "fail" | "warning";
}

export interface ReleaseCriteria {
  id: string;
  label: string;
  met: boolean;
  details: string;
}
