# QA Checklist

## Pre-Release Verification

### Functional
- [ ] All navigation links work (desktop and mobile)
- [ ] All pages render without errors
- [ ] Case study pages load with correct content
- [ ] Expertise tab switcher works
- [ ] Delivery lifecycle phase selector works
- [ ] Release readiness demo: criteria toggle, evaluate, GO/NO-GO logic
- [ ] Contact form validation: empty fields, invalid email, error clearing
- [ ] Contact form opens email client with pre-filled content
- [ ] Theme toggle switches between light and dark
- [ ] Theme preference persists across page navigations
- [ ] 404 page renders for invalid routes
- [ ] Skip navigation link works
- [ ] Social links open correct destinations
- [ ] Back-to-case-studies link works

### Responsive
- [ ] 375px (mobile) — no horizontal overflow, readable text, touch targets
- [ ] 768px (tablet) — layout transitions, navigation switch
- [ ] 1024px (desktop) — grid layouts, timeline alternating
- [ ] 1440px (wide) — max-width containers, comfortable reading

### Accessibility
- [ ] axe-core: zero critical/serious violations on all pages
- [ ] Keyboard: Tab through all interactive elements
- [ ] Focus indicators visible on all focusable elements
- [ ] Screen reader: heading hierarchy is logical (h1 → h2 → h3)
- [ ] Images have alt text (or are decorative)
- [ ] Form fields have associated labels
- [ ] Error messages are announced (role="alert")
- [ ] Reduced motion: animations disabled when preference is set

### Performance
- [ ] Production build succeeds
- [ ] No console errors on any page
- [ ] Images use Next.js Image component where applicable
- [ ] No layout shift on initial load
- [ ] Fonts loaded via next/font (no FOUT)

### SEO
- [ ] Each page has unique title and description
- [ ] Open Graph metadata present
- [ ] Structured data (JSON-LD) validates
- [ ] Sitemap.xml includes all published routes
- [ ] Robots.txt allows indexing
- [ ] Canonical URLs resolve correctly

### Content
- [ ] All professional claims match resume PDFs
- [ ] No placeholder or Lorem Ipsum text
- [ ] No confidential client information exposed
- [ ] Release demo disclaimer is visible
- [ ] Contact information is current and correct

### Cross-Browser
- [ ] Chrome/Edge — rendering, animations, interactions
- [ ] Firefox — rendering, focus styles
- [ ] Safari — animations, backdrop-filter
- [ ] Mobile Safari — touch targets, viewport

### Security
- [ ] No secrets in committed files
- [ ] No `dangerouslySetInnerHTML` with user input
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No unnecessary JavaScript exposure
