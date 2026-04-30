# Manawatū Flow Plumbing - Standalone Demo

This is a standalone, production-ready demo for Manawatū Flow Plumbing, built as part of the Infynt Studio Website Factory.

## Features
- **Standalone Architecture**: Isolated from the main studio site for easier client handover.
- **Shared Components**: Utilizes `@packages/ui` and `@packages/sections` for consistent design.
- **Premium Design**: High-end industrial aesthetic with optimized typography (Inter & Outfit).
- **Fully Responsive**: Tested for Desktop, Tablet, and Mobile.

## Getting Started

### Installation
Run npm install from the root directory or this folder:
```bash
npm install
```

### Development
Start the local dev server:
```bash
npm run dev -p 3801
```

### Build
Verify production build:
```bash
npm run build
```

## Deployment
This app is ready for Vercel deployment. Ensure the **Root Directory** in Vercel settings is set to `apps/manawatu-plumbing`.

The live app route is `/manawatu-plumbing`, and `app/page.tsx` redirects `/` there automatically so the bare project domain no longer lands on a 404.
