# Demo Fleet

`apps/demos` is the dedicated host application for portfolio demos and showcase slugs.

## Purpose

- Keep real production websites like `orellie` and `infynt-site` free from demo routing.
- Host multiple demos under one deployable app.
- Provide a repeatable pattern for future slugs like `/demo-name`.

## Current Routes

- `/`
  - Demo index / landing page
- `/hearth-and-bloom`
  - Cinematic cafe landing page demo
- `/manawatu-plumbing`
  - Plumbing showcase demo

## Local Development

```bash
npm run dev
```

Open `http://127.0.0.1:3804`.

## Build

```bash
npm run build
```

## Vercel

Set the **Root Directory** to `apps/demos`.

## Future Demo Workflow

1. Add a new route at `app/<slug>/page.tsx`.
2. Add route-specific components under `app/components/<slug>/`.
3. Add scoped media under `public/demos/<slug>/`.
4. Add the demo to the index page so it is discoverable from `/`.

For the structural details and the current conventions, see [ARCHITECTURE.md](./ARCHITECTURE.md).
