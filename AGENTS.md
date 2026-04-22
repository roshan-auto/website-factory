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
- **MANDATORY LOCAL BUILD**: Always run a full local build (`npm run build`) to test compilation and strict type-checking *before* executing any `git push` command. Never push untested deliverables to GitHub or Vercel.
- **Fix ALL TypeScript warnings** before shipping (Vercel strictly enforces types).
- **MONOREPO DISCIPLINE**: All new applications MUST be created strictly within the `apps/` folder to prevent Vercel configuration nightmares.
- **CI/CD EXCLUSIVITY**: Never use `vercel` CLI to manually deploy. Force Vercel to build automatically by committing and pushing strictly through GitHub (this links code history to live builds properly).
- Verify before shipping:
    - Check for horizontal overflow
    - Verify no vertical stretching (especially icons and text)
    - Test on at least 3 viewports: Desktop (1440p), Tablet (768p), Mobile (390p)
- Prefer preview deployment before production

## Media & Asset Quality
- **Hero Videos**: Never commit raw, unoptimized 50MB+ videos to the repository. They will breach GitHub limits and cause aggressive browser buffering or playback failure. Always downsize/compress to <10MB (preferably ~2-3MB) before tracking in Git.
- **Cache Busting**: When updating media files, stylesheets, or static assets while keeping the same filename, always append a cache-buster query string (`?v=2`) to the HTML output to override aggressive server caches (like LiteSpeed) and browser byte-range caching.

## WordPress / Hostinger Architecture (Split-Repo Strategy)
- **Code vs Data**: All PHP code, custom themes, CSS, and layouts are managed strictly in the Website Factory (`website-factory` monorepo). Database entries (products, orders, user uploads) are managed *exclusively* on the live Hostinger WordPress Admin panel. Never attempt to sync a local database to the live server.
- **Deployment Automation**: Extract the custom theme code using `git subtree split` and push it to a standalone GitHub repository (e.g., `orellie.git`).
- **Hostinger Git Hook**: When configuring Hostinger's automatic Git Deployment, simply type the exact repository name in the Install Path (e.g., `orellie-sync`). Be aware that Hostinger defaults its execution to `public_html/`. Do NOT manually type `public_html/orellie-sync` or it will create a broken, nested directory (`public_html/public_html/orellie-sync`).
- **Symlink Enforcement**: Connect the Hostinger server's live `wp-content/themes/` directly to the `orellie-sync/themes` folder using a persistent SSH symlink (`ln -s`). This ensures all automated webhooks instantly map to the live engine without manual file moving.
