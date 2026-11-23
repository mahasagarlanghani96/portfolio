import type { PersonalInfo, Education, SocialLink } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Mahasagar Langhani",
  title: "Quality Leadership. Technical Delivery. Software That Works.",
  tagline:
    "QA operations leader turned Project Manager — building quality into every release, not just testing for it.",
  location: "Karachi, Pakistan",
  email: "sagar_langhani@hotmail.com",
  phone: "+92 331 2142033",
  linkedin: "https://www.linkedin.com/in/mahasagar-langhani",
  summary:
    "I've spent 8+ years making sure software actually works before it reaches users. Starting as the only QA in a fast-paced agency, I built and led a department of 9–15 engineers, defined how we plan tests, run regressions, and decide whether a release is ready to ship. Along the way I caught the bugs that would have cost real money — currency mismatches in auctions, duplicate disaster records from offline sync, pricing errors that compounded silently. Now, as a Project Manager leading six concurrent projects, I bring that same quality-first mindset to delivery: scope it right, staff it right, test it right, ship it right.",
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Urdu", level: "Fluent" },
    { name: "Hindi", level: "Fluent" },
    { name: "Sindhi", level: "Native" },
  ],
};

export const education: Education[] = [
  {
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "Sindh Madressatul Islam University",
    location: "Karachi",
    startYear: 2014,
    endYear: 2018,
    gpa: "3.34",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/mahasagar-langhani",
    label: "Connect on LinkedIn",
  },
  {
    platform: "Email",
    url: "mailto:sagar_langhani@hotmail.com",
    label: "Send an email",
  },
  {
    platform: "WhatsApp",
    url: "https://wa.me/923312142033",
    label: "Message on WhatsApp",
  },
];
