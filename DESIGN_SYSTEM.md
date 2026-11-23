# Design System

## Color Palette

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#f8fafc` | Page background |
| `--bg-secondary` | `#f1f5f9` | Alternate section background |
| `--bg-card` | `#ffffff` | Card background |
| `--text-primary` | `#0f172a` | Headings, body text |
| `--text-secondary` | `#475569` | Descriptions, supporting text |
| `--text-tertiary` | `#94a3b8` | Captions, metadata |
| `--accent-primary` | `#0891b2` | Primary accent (cyan-600) |
| `--accent-secondary` | `#06b6d4` | Hover accent (cyan-500) |

### Dark Theme (Default)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0f1a` | Page background (deep navy) |
| `--bg-secondary` | `#111827` | Alternate section background |
| `--bg-card` | `#152033` | Card background |
| `--text-primary` | `#f1f5f9` | Headings, body text |
| `--text-secondary` | `#94a3b8` | Descriptions |
| `--accent-primary` | `#06b6d4` | Primary accent (cyan-500) |

### Status Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--status-pass` | `#10b981` | Success, criteria met |
| `--status-fail` | `#ef4444` | Error, criteria not met |
| `--status-warning` | `#f59e0b` | Warning, threshold close |

## Typography

- **Font:** Geist Sans (via `next/font/google`)
- **Mono:** Geist Mono
- **Scale:** Tailwind default + custom sizes for hero (text-5xl to text-7xl)
- **Line height:** 1.7 for body text

## Spacing

Standard Tailwind spacing scale. Key patterns:
- Section padding: `py-20 md:py-28`
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 md:p-8`
- Section header margin: `mb-14 md:mb-20`

## Components

### Button (`src/components/ui/button.tsx`)
Variants: `primary`, `secondary`, `ghost`, `outline`
Sizes: `sm`, `md`, `lg`
Renders as `<a>` when `href` is provided, `<button>` otherwise.

### Card (`src/components/ui/card.tsx`)
Props: `hover` (adds hover effect), `glass` (glass morphism style)

### Badge (`src/components/ui/badge.tsx`)
Variants: `default`, `accent`, `pass`, `fail`, `warning`

### Section (`src/components/ui/section.tsx`)
Wrapper with consistent padding and max-width container.
`SectionHeader` provides label badge, title, and description.

### AnimateIn (`src/components/ui/animate-in.tsx`)
Scroll-triggered animation wrapper.
Props: `direction` (up/down/left/right/none), `delay`, `duration`, `once`

## Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out expo)
- Duration: 300-500ms for reveals, 150ms for interactions
- Reduced motion: All animations disabled via CSS and `prefers-reduced-motion`

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Default | 0px+ | Mobile-first base |
| `sm` | 640px+ | Small tablets |
| `md` | 768px+ | Tablets, navigation switch |
| `lg` | 1024px+ | Desktop, grid layouts |
| `xl` | 1280px+ | Wide desktop |
