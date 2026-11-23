# Content Guide

## How to Update Content

All personal and professional content lives in `src/data/`. Each file is strongly typed —
TypeScript will flag errors if you add or modify fields incorrectly.

### Personal Information
**File:** `src/data/personal.ts`

Update your name, email, phone, LinkedIn URL, location, and professional summary.
The `tagline` appears in the hero section. The `summary` appears on the About page.

### Experience Timeline
**File:** `src/data/experience.ts`

Each entry has a company with one or more roles. Roles include:
- `title` — Job title
- `startDate` / `endDate` — Display dates (e.g., "Jan 2022", "Present")
- `responsibilities` — Array of bullet points
- `technologies` — Optional array of tech/tool tags

### Skills
**File:** `src/data/skills.ts`

Skills are organized into groups by category. Each group has:
- `category` — Machine-readable key
- `label` — Display name
- `description` — One-line context
- `skills` — Array of skill names

### Case Studies
**File:** `src/data/case-studies.ts`

Each case study has:
- `slug` — URL-friendly identifier
- `title`, `subtitle`, `domain` — Display content
- `tags` — Keyword tags
- `background`, `problem`, `role` — Context sections
- `challenges`, `approach` — Array sections
- `collaboration`, `outcome` — Narrative sections
- `lessons` — Array of takeaway points
- `draft` — Set to `true` to hide from the published site

To add a new case study, copy an existing entry and modify the content.
The page at `/case-studies/[slug]` is generated automatically.

### Expertise Tracks
**File:** `src/data/expertise.ts`

Two tracks: `quality-engineering` and `project-delivery`. Each has:
- Capabilities with title, description, and icon name (from Lucide)
- The `lifecyclePhases` array defines the interactive delivery lifecycle

### Release Demo
**File:** `src/data/release-demo.ts`

Sample data for the interactive Go/No-Go demonstration.
All data is explicitly fictional. Update metrics and criteria as needed.

## Adding New Pages

1. Create a directory in `src/app/` with a `page.tsx` file
2. Add the route to `NAV_ITEMS` in `src/lib/constants.ts` (if it should appear in navigation)
3. Export metadata for SEO
4. Add E2E test coverage in `e2e/`

## Content Verification

Content sourced from resumes in `reference-docs/` is verified.
Any content not from these sources should be clearly marked with
a comment `// PENDING VERIFICATION` until confirmed.
