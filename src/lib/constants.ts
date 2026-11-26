import type { NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "Mahasagar Langhani",
  title: "Mahasagar Langhani — Quality Leadership & Technical Delivery",
  description:
    "Senior QA Lead and Project Manager with 8+ years delivering quality software across 300+ projects. Specializing in QA leadership, release governance, and technical project delivery.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mahasagar.dev",
  locale: "en_US",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#overview" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const SECTION_IDS = {
  hero: "hero",
  overview: "overview",
  expertise: "expertise",
  philosophy: "philosophy",
  lifecycle: "lifecycle",
  experience: "experience",
  caseStudies: "case-studies",
  skills: "skills",
  releaseDemo: "release-demo",
  projectHealth: "project-health",
  about: "about",
  contact: "contact",
} as const;
