# Hearth & Bloom Architecture

## Purpose

`hearth-and-bloom` is a standalone Next.js landing page app inside the monorepo.
It is a motion-first cafe showcase intended to demonstrate premium frontend craft,
reusable section patterns, and web-optimized media handling.

## Route Model

- App root: `apps/hearth-and-bloom`
- Runtime route: `/hearth-and-bloom`
- Route source: `app/hearth-and-bloom/page.tsx`
- Root-path redirect: `app/page.tsx` forwards `/` to `/hearth-and-bloom`
- Vercel root directory: `apps/hearth-and-bloom`

## Page Structure

- `app/page.tsx`
  - Thin server entry that renders `HomePage`
- `app/components/home-page.tsx`
  - Main page composition and section ordering

## Reusable Local Components

- `site-header.tsx`
  - Shared page header/navigation pattern for this app
  - Mobile menu behavior lives here
- `scroll-reveal.tsx`
  - Reusable reveal wrapper for section-level motion
  - Uses `framer-motion`
- `section-heading.tsx`
  - Shared heading/eyebrow/description block for dark and light sections
- `category-card.tsx`
  - Reusable intro/category card used near the hero
- `product-video-card.tsx`
  - Reusable signature product card
  - Accepts video, poster, copy, and accent props
- `site-footer.tsx`
  - Shared footer and app-level contact/visit messaging

## Shared Package Usage

- `@packages/ui`
  - `TiltCard` is used by `product-video-card.tsx`
- No app component should import from another app
- Shared logic that could serve multiple apps belongs in `packages/`

## Media Rules

- Source media lives in `public/media/`
- The page should use only the web-ready files:
  - `hero-web.mp4`
  - `hero-web.webm`
  - `iced-boba-web.*`
  - `midnight-mocha-web.*`
  - `caramel-pearl-web.*`
  - `velvet-cappuccino-web.*`
- Poster images live in `public/media/posters/`
- Original source files are kept only as raw inputs for future re-encodes

## Styling Model

- Theme tokens live in `app/globals.css`
- Tailwind v4 scanning must include:
  - `@source "../";`
  - `@source "../../../packages";`
- Typography is managed with `next/font` in `app/layout.tsx`
- New section-level styles should prefer reusable utility classes or small local component styles over one-off inline sprawl

## Motion Rules

- Prefer reusing `ScrollReveal` for entry motion
- Prefer reusing `TiltCard` through `product-video-card.tsx` rather than duplicating tilt logic
- Keep motion decorative, readable, and responsive
- If a screenshot or test captures unrevealed content below the fold, remember that `whileInView` content may appear hidden until scrolled into view

## Verification Checklist

- Run `npm run build` before push
- Confirm `/` redirects to `/hearth-and-bloom`
- Verify hero, story, menu, and CTA sections at:
  - Desktop: 1440px wide
  - Tablet: 768px wide
  - Mobile: 390px wide
- Confirm there is no horizontal overflow
- Confirm the app still resolves correctly at `/hearth-and-bloom`

## Known Caveat

- The provided hero source media includes a visible `Veo` watermark.
  Replace the hero source clip if a watermark-free production hero is required.
