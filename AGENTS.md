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
- Prefer reuse over reinvention. **Always explore 21st.dev MCP components** before scaffolding standard UI like pricing or heroes.
- Keep all site-specific decisions documented in markdown files inside the repo.
- Extract interactive UI (e.g. Navbars, toggles) into `app/components/` as Client Components (`"use client"`). Keep pages as Server Components.
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
- **Fix ALL TypeScript warnings** before shipping (Vercel strictly enforces types).
- Verify before shipping:
    - Check for horizontal overflow
    - Verify no vertical stretching (especially icons and text)
    - Test on at least 3 viewports: Desktop (1440p), Tablet (768p), Mobile (390p)
- Prefer preview deployment before production
