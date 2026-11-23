# Test Strategy

## Overview

Testing is built into the development process, not bolted on after.
The strategy prioritizes automated checks for correctness, accessibility,
and content integrity, while acknowledging that some aspects require manual review.

## Test Pyramid

### Unit Tests (Vitest)
**Location:** `src/__tests__/unit/`
**What they cover:**
- Utility functions (`cn`, `formatDateRange`, `generateMailtoLink`, `slugify`)
- Release decision logic (`evaluateRelease`)
- Data integrity checks (all data files have required fields, unique slugs, valid formats)

### E2E Tests (Playwright)
**Location:** `e2e/`
**What they cover:**
- Homepage rendering and all sections
- Navigation between all routes
- Contact form validation (empty fields, invalid email, error clearing)
- Interactive expertise tab switching
- Release readiness demo (toggle criteria, evaluate decision)
- 404 page for invalid routes
- Case study navigation and back links

### Accessibility Tests (axe-core + Playwright)
**Location:** `e2e/accessibility.spec.ts`
**What they cover:**
- WCAG 2.2 AA automated checks on every page
- Keyboard navigation (Tab order, skip link, theme toggle)
- Critical and serious violations fail the test

## Test Execution

```bash
# Unit tests
npm test

# E2E tests (all browsers)
npm run test:e2e

# Accessibility tests only
npm run test:a11y

# E2E with UI mode
npm run test:e2e:ui
```

## CI Integration

GitHub Actions runs on every PR:
1. TypeScript check
2. Lint
3. Format check
4. Unit tests
5. Production build
6. E2E tests (Chromium)

Playwright traces and screenshots are uploaded as artifacts on failure.

## What Automated Tests Don't Cover

These require manual verification:
- Visual design quality and aesthetic consistency
- Animation smoothness and timing feel
- Typography readability across real devices
- Color contrast in edge cases (gradients, overlays)
- Mobile touch target sizes in real usage
- Content accuracy (factual correctness of professional claims)
- Cross-device testing beyond emulation
- Print stylesheet behavior
- Screen reader narrative flow (automated checks catch structure, not experience)

## Coverage Goals

- Unit test coverage: >80% for utility functions and data modules
- E2E: All routes accessible and rendering
- Accessibility: Zero critical/serious axe violations
- Build: Zero TypeScript errors, zero lint errors
