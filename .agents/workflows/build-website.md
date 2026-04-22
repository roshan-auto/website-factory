---
description: How to build a new website from scratch using the project's monorepo skills
---

# Build a New Website (Website Factory)

This workflow defines the mandatory paths for constructing new websites within our Next.js + Tailwind v4 Monorepo environment.

## 1. Initial Assessment (The Fork in the Road)
When a user requests a new website, you must immediately determine the required architecture. 
Ask yourself: **Does this site require an administrative backend, a CMS, or E-Commerce?**

### Path A: Standard Next.js Landing Page / Web App
*For portfolios, corporate sites, simple SaaS marketing, and electrician/contractor sites.*
- **Architecture**: 100% Next.js App Router (Server & Client Components)
- **Location**: Generated as a new Next.js app strictly inside `apps/site-name`
- **Shared UI**: Utilize `packages/sections` and `packages/ui` for rapid development.
- **Deployment**: Automatic Vercel deployment through GitHub.

### Path B: Headless WordPress & WooCommerce
*For e-commerce (Orellie), heavy CMS blogs, or client-managed data environments.*
- **Architecture**: Headless Next.js Frontend + Standalone WordPress Backend Theme.
- **Frontend Location**: `apps/site-name` (Handles UI, routing, and GraphQL fetches via WPGraphQL).
- **Backend Location**: `apps/site-name/content/themes/site-theme` (Contains custom PHP templates, functions, and CSS).
- **Local Dev**: Use Docker Compose to spin up a local WordPress instance mapping to the backend location.
- **Deployment**: 
  - Frontend: Vercel.
  - Backend: **Split-Repo Strategy**. Use a script like `deploy-to-hostinger.ps1` to extract the backend theme to a standalone GitHub repository (`site-name.git`), which Hostinger auto-pulls via webhooks to its nested symlink.

## 2. Shared Development Workflow (Both Paths)

1. **Design & Components (21st.dev)**
   - Read the frontend-design skill.
   - Always explore the **21st.dev MCP components** before scaffolding standard UI like pricing, grids, or heroes.
   - Maintain the UI quality bar: mobile-first, strict spacing rhythm, bold aesthetics.

2. **Monorepo Discipline**
   - Never place apps in the root directory. 
   - Share logic across apps using `packages/` when applicable.
   - Ensure `npm run build` succeeds locally before committing.

3. **Quality & Asset Management**
   - **Videos**: Compress all hero videos to < 10MB (ideally 2-3MB). Never commit raw 50MB+ media.
   - **Cache Busting**: When updating media, stylesheets, or static assets, append `?v=2` (or similar) to force CDN/Browser updates.
   - **TypeScript**: Fix ALL strict TypeScript warnings before marking a task complete.

## 3. Final Verification Before Push
Before using `git push`, verify:
- Desktop, Tablet, and Mobile layouts do not break or horizontally overflow.
- Local build passes (`npm run build`).
- (For Path B) Ensure Hostinger symlinks are documented or automated correctly if configuring a new deployment pipeline.
