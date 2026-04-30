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

## Documentation memory
- When you create or significantly reshape an app in `apps/`, update that app's markdown documentation in the same task.
- At minimum, standalone apps should maintain a `README.md` with:
  - purpose
  - local dev command
  - build command
  - Vercel root directory
- If the app introduces reusable local components, special motion systems, or non-trivial media workflows, add an `ARCHITECTURE.md` describing:
  - route/basePath behavior
  - local reusable components
  - shared package usage
  - media file conventions
  - verification expectations
- When a new standalone app changes the monorepo shape, update the root `README.md` so future agents can see it in the project map.
- Treat markdown docs as shared project memory for future agents. Do not leave important app decisions only in commit messages or chat history.

## UI quality bar
- Mobile-first
- Strong spacing rhythm
- Clear visual hierarchy
- No generic AI-looking layouts
- Consistent typography, spacing, border radius, and CTA styles
- **Boutique Hero Masking**: Prefer full-width background video/images with `linear-gradient` masks (e.g. `var(--bg)` to `transparent`) to create a solid text zone on the left while anchoring media subjects (faces, products) on the right.
- **Precision Media Anchoring**: Use `object-position` (e.g. `50% center`) to ensure focal points remain visible and clear of overlays across all breakpoints.

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

## Standalone app rules
- Every standalone app in `apps/` must own its own:
  - `package.json`
  - `next.config.ts`
  - `README.md`
- If a standalone Vercel app needs to open on a subpath like `/demo-name`, prefer a route-based subpath pattern:
  - create a real route at `app/demo-name/page.tsx`
  - make `app/page.tsx` redirect to that route
  - keep public assets root-relative (for example `/media/...` or `/images/...`)
- Reserve `proxy.ts` for hostname-aware or request-aware routing, not for basic standalone subpath bootstrapping.
- When adding a new standalone app, verify that existing Vercel-targeted apps still build locally before merging to `main`.
- If an app uses heavy motion or media, keep the motion primitives reusable and isolate them in `app/components/` or shared packages instead of burying them in one page file.

## Media & Asset Quality

### Hero Video Workflow
When a new hero video is provided, run these two steps before touching any code:

**Step 1 — Encode web MP4** (H.264, 720p, ~2–6 MB, no audio, faststart):
```bash
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 -crf 23 -preset slow \
  -profile:v main -level 4.0 -pix_fmt yuv420p \
  -movflags +faststart -an \
  OUTPUT-web.mp4
```

**Step 2 — Encode WebM fallback** (VP9, 720p, ~1–3 MB, broader support — skip if `libvp9` unavailable):
```bash
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720" \
  -c:v libvp9 -crf 30 -b:v 0 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p -an \
  OUTPUT-web.webm
```

**Step 3 — Use in JSX hero** (always list WebM first for better browser prioritisation):
```tsx
<video autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover"
  style={{ objectPosition: 'center 30%' }}>
  <source src="/images/.../OUTPUT-web.webm" type="video/webm" />
  <source src="/images/.../OUTPUT-web.mp4"  type="video/mp4" />
</video>
```

**Overlay pattern** for left-side text readability:
```tsx
{/* Dark base */}
<div className="absolute inset-0 bg-black/50" />
{/* Left-gradient — solid text zone left, fades right */}
<div className="absolute inset-0"
  style={{ background: 'linear-gradient(105deg, oklch(0.12 0.02 250 / 0.95) 0%, oklch(0.14 0.02 250 / 0.75) 40%, oklch(0.1 0.02 250 / 0.25) 75%, transparent 100%)' }} />
{/* Frosted text backdrop */}
<div className="rounded-3xl p-8 md:p-10"
  style={{ background: 'oklch(0.14 0.02 250 / 0.6)', backdropFilter: 'blur(24px)', border: '1px solid oklch(0.3 0.04 250 / 0.7)' }}>
  {/* text content */}
</div>
```

**Rules:**
- Never commit raw source video (>10 MB) to Git — encode first, commit only `*-web.mp4`
- Strip audio track (`-an`) — hero videos never need sound
- `-movflags +faststart` is mandatory so the video begins playing before fully downloaded
- CRF 23 = high visual quality; raise to 28 for even smaller files on drone/scenic footage

- **Asset Cache Busting**: 
    - **In HTML/PHP**: Append `?v=n` to media URLs (e.g., `hero.mp4?v=3`).
    - **In WordPress functions.php**: NEVER use static versions. ALWAYS use `filemtime( get_stylesheet_directory() . '/style.css' )` for `wp_enqueue_style` to bypass stubborn server-side object caching.

## WordPress / Hostinger Architecture (Split-Repo Strategy)
- **Mirrored UI Principle**: If an application (like Orellie) has both a Next.js Frontend and a WordPress Theme Backend, you MUST keep the design and layouts perfectly in sync across both codebases. Never update one without the other.
- **Deployment Script**: All WordPress deployments MUST be executed via the local automation script (e.g., `./apps/orellie/deploy-to-hostinger.ps1`). This script extracts the `content/` folder and pushes it to the standalone deployment repository.
- **Hostinger Pathing**: Hostinger defaults its auto-deploy execution to `public_html/`. Do NOT manually type `public_html/` in the installation path or it will create a nested `public_html/public_html/` directory.
- **Symlink Enforcement**: Connect the Hostinger server's live `wp-content/themes/` directly to the `orellie-sync/themes` folder using a persistent SSH symlink (`ln -s`). This ensures all automated webhooks instantly map to the live engine without manual file moving.
## Monorepo Architecture & Package Management
- **Local Package Linking**: Always use `file:` protocol for internal package references in `package.json`.
- **Package Encapsulation**: Shared components in `packages/` MUST NOT import from `apps/`. They should be self-contained or only depend on other `packages/`.
- **Shared Utils**: Use `packages/ui/utils.ts` for all shared class-merging logic (`cn`).

## Tailwind CSS v4 Pathing (CRITICAL)
- **Relative @source**: Tailwind v4 `@source` paths are relative to the CSS file location.
- In a standard `apps/[name]/app/globals.css` file, use exactly these paths to ensure shared components are styled:
  ```css
  @source "../";              /* Scans the local app directory */
  @source "../../../packages"; /* Scans the shared packages directory */
  ```
- Failure to include the triple-up `../../../` will result in 0 utility classes being generated for shared components.

## Current app memory
- `apps/manawatu-plumbing`
  - standalone demo app
  - deployed under `/manawatu-plumbing`
  - uses a route-based subpath with `app/page.tsx` redirecting to `/manawatu-plumbing`
  - must keep building cleanly when other standalone apps are introduced
- `apps/hearth-and-bloom`
  - standalone cafe showcase app
  - deployed under `/hearth-and-bloom`
  - uses a route-based subpath with `app/page.tsx` redirecting to `/hearth-and-bloom`
  - uses local reusable components in `app/components/`
  - uses web-optimized media in `public/media/` and detailed app memory in `apps/hearth-and-bloom/ARCHITECTURE.md`
