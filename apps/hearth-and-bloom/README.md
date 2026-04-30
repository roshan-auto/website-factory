# Hearth & Bloom Cafe

## Design Brief

- Direction: espresso-noir editorial landing page with cream highlights, amber calls to action, and a polished "showreel" feel.
- Purpose: a highly animated showcase site that demonstrates premium frontend craft while still feeling like a believable cafe brand.
- Tone: sleek, cinematic, modern, and a little theatrical rather than rustic or generic.
- Assumption: this first pass is a marketing landing page rather than a full ecommerce build.

## Visual System

- Palette:
  - `Roast` - near-black espresso background
  - `Mocha` - warm brown surface tones
  - `Crema` - soft ivory for major content bands
  - `Amber` - CTA and interaction accent
  - `Pearl` - bright highlights and borders
- Typography:
  - Bold condensed display for hero moments
  - Elegant serif accent for ritual/storytelling copy
  - Clean sans body for readability
- Layout:
  - Full-width masked hero video with copy anchored left
  - Floating category cards and offset overlapping sections
  - Portrait product videos presented as reusable motion cards
  - Large editorial statement section and a dark-to-light section rhythm

## Motion Strategy

- Staggered hero entrance with layered fades and scale pops
- Scroll reveal wrappers reused across sections
- Product cards that tilt, lift, and animate into place
- Sticky or scroll-reactive showcase moment for the drink videos
- Gentle ambient background motion to keep the page feeling alive

## Reusable Components Plan

- `app/components/site-header.tsx`
- `app/components/scroll-reveal.tsx`
- `app/components/section-heading.tsx`
- `app/components/category-card.tsx`
- `app/components/product-video-card.tsx`
- `app/components/site-footer.tsx`
- `app/components/home-page.tsx`

## Media Plan

- Hero media:
  - Source: `public/media/hero.mp4`
  - Deliverables: `hero-web.mp4` and `hero-web.webm`
- Product media:
  - Sources: `product_1.mp4` to `product_4.mp4`
  - Deliverables: portrait web-optimized versions plus poster stills
- Usage:
  - Hero video for the main masked section
  - Product clips for the signature drinks showcase and detail cards

## Verification Plan

- Run a local production build after implementation
- Check layout behavior across mobile, tablet, and desktop proportions
- Confirm no horizontal overflow and that motion still feels clean on smaller screens

## Getting Started

### Development

```bash
npm run dev
```

Open `http://127.0.0.1:3803/hearth-and-bloom`.

### Build

```bash
npm run build
```

## Deployment

This app is ready for Vercel preview deployment. In Vercel, set the **Root Directory** to `apps/hearth-and-bloom`.
