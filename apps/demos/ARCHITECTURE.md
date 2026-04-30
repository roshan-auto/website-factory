# Demo Fleet Architecture

## Purpose

`apps/demos` is the canonical demo host app for future portfolio deployments.

It exists so demo routing no longer lives inside real production sites and no longer requires a separate Vercel project per concept page.

## Route Model

- App root: `apps/demos`
- Demo index: `/`
- Current demo routes:
  - `/hearth-and-bloom`
  - `/manawatu-plumbing`

## Component Structure

- `app/components/demo-card.tsx`
  - Reusable listing card for the demo index
- `app/components/hearth-and-bloom/*`
  - Local component set for the cafe demo
- `@packages/sections`
  - `ManawatuFlowDemo` remains shared and is rendered inside the demos host route

## Asset Structure

- `public/demos/hearth-and-bloom/...`
  - Web-ready cafe media and posters
- `public/demos/manawatu-plumbing/images/manawatu-flow/...`
  - Scoped plumbing demo images and hero video

Each demo owns a namespaced public asset folder so future slugs do not collide.

## Theme Strategy

- `app/globals.css` defines one neutral hub theme for the index page
- `.theme-hearth` scopes the Hearth & Bloom token set
- `.theme-manawatu` scopes the plumbing token set

This allows multiple visually distinct demos to live inside one Next.js app without sharing one global palette.

## Future Demo Rules

1. Create the route under `app/<slug>/page.tsx`.
2. Keep demo-specific components under `app/components/<slug>/`.
3. Keep assets under `public/demos/<slug>/`.
4. Prefer shared packages only when the section is genuinely reusable across demos.

## Verification Checklist

- Run `npm run build` in `apps/demos`
- Verify:
  - `/`
  - `/hearth-and-bloom`
  - `/manawatu-plumbing`
- Rebuild affected shared consumers if a package template changes:
  - `apps/manawatu-plumbing`
  - `apps/infynt-site`
