# Manawatu Flow Plumbing - Legacy Standalone Demo

This app is the legacy standalone build target for the Manawatu Flow Plumbing demo.
The canonical shared demo-domain route now lives in `apps/demos` at `/manawatu-plumbing`.

## Features
- **Standalone Architecture**: Retained as an isolated reference and fallback build target.
- **Shared Components**: Utilizes `@packages/ui` and `@packages/sections` for consistent design.
- **Premium Design**: High-end industrial aesthetic with optimized typography (Inter and Outfit).
- **Fully Responsive**: Tested for Desktop, Tablet, and Mobile.

## Getting Started

### Installation
Run `npm install` from the repo root or this folder:

```bash
npm install
```

### Development
Start the local dev server:

```bash
npm run dev -p 3801
```

### Build
Verify the production build:

```bash
npm run build
```

## Deployment

If you need to deploy this app by itself, set the Vercel **Root Directory** to `apps/manawatu-plumbing`.

The live app route is `/manawatu-plumbing`, and `app/page.tsx` redirects `/` there automatically so the bare project domain no longer lands on a 404.

For the preferred shared demo deployment flow, deploy `apps/demos` instead.
