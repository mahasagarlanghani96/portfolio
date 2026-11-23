# Architecture

## Overview

This is a statically generated Next.js 16 portfolio website using the App Router.
Most pages are prerendered at build time. Client-side interactivity is limited to:
theme switching, the expertise track tab switcher, the delivery lifecycle explorer,
the release readiness demo, contact form validation, and scroll-triggered animations.

## Technology Decisions

### Next.js 16 with App Router
Chosen for static generation, built-in image/font optimization, metadata API,
and Vercel deployment integration. App Router allows server components by default,
reducing client-side JavaScript.

### Tailwind CSS 4
CSS-first configuration with design tokens as CSS custom properties.
Theme switching uses `data-theme` attribute on `<html>` with token overrides.

### Motion for React
Lightweight animation library (successor to Framer Motion).
Used for scroll-triggered reveal animations and tab transitions.
All animations respect `prefers-reduced-motion`.

### Content as TypeScript Modules
Professional content lives in typed data files rather than a CMS or MDX.
This keeps the site fully static with zero runtime data fetching,
while TypeScript ensures content structure integrity at build time.

## Design System

### Theme Architecture
- CSS custom properties define all design tokens
- Light theme is the base; dark theme overrides via `[data-theme="dark"]`
- System preference is respected via `prefers-color-scheme` media query
- User choice persists in `localStorage` and is applied before first paint (inline script)

### Component Hierarchy
```
Layout Components (Header, Footer)
  └── Page Components (app/*/page.tsx)
       └── Section Components (sections/*)
            └── UI Primitives (ui/*)
                 └── Design Tokens (globals.css)
```

### Animation Strategy
- `AnimateIn` component wraps content for scroll-triggered reveal
- `motion` from Motion for React handles tab/panel transitions
- All animations are `once: true` to avoid re-triggering
- Durations are short (300-500ms) with custom easing

## Data Flow

```
Data Files (src/data/)
  → Type Definitions (src/types/)
  → Section Components (read data, render UI)
  → Pages (compose sections)
  → Static HTML (generated at build time)
```

## SEO & Metadata

- Each page exports `Metadata` using Next.js Metadata API
- Structured data (JSON-LD) for Person and WebSite schemas
- Sitemap and robots.txt generated from route and data files
- Open Graph metadata on all pages
- Canonical URLs via `metadataBase`

## Testing Strategy

- **Unit tests (Vitest):** Utilities, data integrity, release decision logic
- **E2E tests (Playwright):** Navigation, page rendering, form validation, interactive features
- **Accessibility tests (axe-core):** Automated WCAG 2.2 AA checks on all pages
- **Build verification:** TypeScript strict mode, ESLint, production build

## Deployment

- Vercel Git integration with automatic preview deployments
- Production deploys from `main` branch
- GitHub Actions CI runs quality checks and E2E tests on PRs
- Static generation means minimal server-side compute
