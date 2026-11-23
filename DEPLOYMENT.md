# Deployment Guide

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier is sufficient)
- Node.js 20+

## Initial Setup

### 1. GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (default)
5. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g., `https://mahasagar.dev`)
6. Deploy

### 3. Custom Domain (Optional)

1. In Vercel project settings, go to Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` to match

## Deployment Flow

### Preview Deployments
Every pull request gets an automatic preview deployment.
URL format: `https://portfolio-git-BRANCH-USERNAME.vercel.app`

### Production Deployment
Merging to `main` triggers a production deployment automatically.

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs:
1. TypeScript validation
2. Linting
3. Format checking
4. Unit tests
5. Production build
6. E2E tests (Chromium)

**Recommended branch protection:**
- Require status checks to pass before merging
- Require the "Quality Checks" job to pass
- Require the "E2E Tests" job to pass

## Rollback

Vercel keeps all deployments. To rollback:
1. Go to Vercel dashboard → Deployments
2. Find the previous working deployment
3. Click the three-dot menu → "Promote to Production"

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO | Yes |

No secrets or API keys are required. The site is fully static.

## Monitoring

- Vercel provides basic analytics and Web Vitals on the free tier
- Check Vercel dashboard for build logs and deployment status
- Lighthouse audits can be run against the production URL
