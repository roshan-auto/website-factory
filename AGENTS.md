# Website Factory Operating Rules

## Mission
Build fast, polished, production-ready websites from reusable foundations.
Optimize for speed, conversion, clean code, accessibility, SEO, and maintainability.

## Default stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui where useful
- Vercel deployment target
- Playwright for E2E and visual regression

## Working style
- For any non-trivial task, create or update a written plan before coding.
- Prefer reuse over reinvention.
- Keep all site-specific decisions documented in markdown files inside the repo.
- Do not mark UI work complete without checking desktop and mobile layouts.

## UI quality bar
- Mobile-first
- Strong spacing rhythm
- Clear visual hierarchy
- No generic AI-looking layouts
- Consistent typography, spacing, border radius, and CTA styles

## Delivery flow
- Work on branches
- Lint, typecheck, build
- Verify before shipping
- Prefer preview deployment before production
