# CLAUDE.md — Portfolio Project Instructions

## Project Overview
Personal portfolio website for Mahasagar Langhani — QA Lead / Project Manager.
Built with Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, Motion for React.

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — React components (ui/, layout/, sections/, interactive/)
- `src/data/` — Typed content data modules (personal, experience, skills, case studies, expertise)
- `src/lib/` — Utilities and constants
- `src/hooks/` — Custom React hooks
- `src/types/` — TypeScript type definitions
- `src/__tests__/` — Vitest unit and component tests
- `e2e/` — Playwright E2E tests

## Key Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests (needs build first)
npm run typecheck    # TypeScript validation
npm run lint         # ESLint
npm run format:check # Prettier check
```

## Rules for Future Sessions

### Before Editing
- Read the relevant data file in `src/data/` before changing content
- Check `src/types/index.ts` for type definitions before adding fields
- Review affected components and their imports

### When Making Changes
- Update tests alongside functional changes
- Run `npm test` after changes to data or utility functions
- Run `npm run build` before considering work complete
- Preserve accessibility: semantic HTML, ARIA, keyboard navigation, focus indicators
- Preserve responsiveness: test at 375px, 768px, 1024px, 1440px
- Keep content separated from components — edit data files, not component markup

### Content Integrity
- All professional content is sourced from verified resume PDFs in `reference-docs/`
- Do not invent employers, dates, certifications, or numerical achievements
- Case studies are based on real project types — do not add fabricated metrics
- Sample data in the release demo is explicitly fictional and labeled as such

### Design System
- Design tokens are in `src/app/globals.css` as CSS custom properties
- Dark theme is default, light theme is fully supported
- Use `cn()` utility for conditional class names
- Use `AnimateIn` component for scroll-triggered animations
- Respect `prefers-reduced-motion`

### Testing
- Unit tests: `src/__tests__/unit/` — Vitest
- E2E tests: `e2e/` — Playwright
- Accessibility: `e2e/accessibility.spec.ts` — axe-core
- All tests must pass before deployment

### Do Not
- Add unverified personal information
- Publish confidential client details
- Create fake testimonials or statistics
- Add paid API dependencies (keep Vercel free tier compatible)
- Skip accessibility or responsive testing
- Commit .env files or secrets
