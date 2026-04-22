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
- **Hero Videos**: Never commit raw, unoptimized 50MB+ videos to the repository. Always downsize/compress to <10MB before tracking in Git.
- **Asset Cache Busting**: 
    - **In HTML/PHP**: Append `?v=n` to media URLs (e.g., `hero.mp4?v=3`).
    - **In WordPress functions.php**: NEVER use static versions. ALWAYS use `filemtime( get_stylesheet_directory() . '/style.css' )` for `wp_enqueue_style` to bypass stubborn server-side object caching.

## WordPress / Hostinger Architecture (Split-Repo Strategy)
- **Mirrored UI Principle**: If an application (like Orellie) has both a Next.js Frontend and a WordPress Theme Backend, you MUST keep the design and layouts perfectly in sync across both codebases. Never update one without the other.
- **Deployment Script**: All WordPress deployments MUST be executed via the local automation script (e.g., `./apps/orellie/deploy-to-hostinger.ps1`). This script extracts the `content/` folder and pushes it to the standalone deployment repository.
- **Hostinger Pathing**: Hostinger defaults its auto-deploy execution to `public_html/`. Do NOT manually type `public_html/` in the installation path or it will create a nested `public_html/public_html/` directory.
- **Symlink Enforcement**: Connect the Hostinger server's live `wp-content/themes/` directly to the `orellie-sync/themes` folder using a persistent SSH symlink (`ln -s`). This ensures all automated webhooks instantly map to the live engine without manual file moving.
