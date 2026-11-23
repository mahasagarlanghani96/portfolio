# Mahasagar Langhani — Portfolio

Personal portfolio website showcasing QA leadership and technical project delivery expertise.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Animation:** Motion for React
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library + Playwright + axe-core
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── case-studies/
│   │   └── [slug]/
│   ├── contact/
│   ├── project-delivery/
│   ├── quality-engineering/
│   ├── globals.css         # Design tokens and global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Reusable UI primitives
│   ├── layout/             # Header, Footer, structured data
│   ├── sections/           # Homepage sections
│   └── interactive/        # Delivery lifecycle, release demo
├── data/                   # Typed content data modules
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
└── types/                  # TypeScript type definitions
e2e/                        # Playwright E2E tests
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/quality-engineering` | QA leadership expertise |
| `/project-delivery` | Technical PM expertise |
| `/case-studies` | Case study listing |
| `/case-studies/[slug]` | Individual case study |
| `/about` | Career background |
| `/contact` | Contact information and form |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:a11y` | Run accessibility tests |
| `npm run typecheck` | TypeScript validation |
| `npm run lint` | ESLint check |
| `npm run format:check` | Prettier format check |

## Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Set `NEXT_PUBLIC_SITE_URL` environment variable to your production URL
4. Deploy

Preview deployments are created automatically for pull requests.

## Content Management

All content is managed through typed data files in `src/data/`:
- `personal.ts` — Name, contact info, summary
- `experience.ts` — Career timeline
- `skills.ts` — Skill categories
- `case-studies.ts` — Case study content
- `expertise.ts` — Expertise tracks and lifecycle phases
- `release-demo.ts` — Interactive demo data

See `CONTENT_GUIDE.md` for detailed editing instructions.

## License

All rights reserved. This is a personal portfolio website.
