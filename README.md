# Website Factory Monorepo

A high-performance monorepo for building, deploying, and maintaining premium boutique websites.

## Project Structure

```bash
apps/
  demos/               # Canonical demo host app (shared Vercel target)
  manawatu-plumbing/   # Legacy standalone plumbing demo app
  hearth-and-bloom/    # Legacy standalone cafe demo app
  infynt-site/         # Main studio website
  electrician-site/    # Electrician demo
packages/
  ui/                  # Shared UI primitives (Radix, Framer Motion)
  sections/            # Shared page sections and templates
resources/             # Global design assets and styleguides
```

## Key Workflows

### Creating a New Standalone App
1. Create a new directory in `apps/`.
2. Link shared packages in `package.json` using `file:` references:
   ```json
   "@packages/ui": "file:../../packages/ui",
   "@packages/sections": "file:../../packages/sections"
   ```
3. Configure Tailwind CSS v4 in `globals.css` to scan shared packages:
   ```css
   @import "tailwindcss";
   @source "../";
   @source "../../../packages";
   ```

### Using Shared Templates
Shared templates like `ManawatuFlow` live in `packages/sections/templates/` and can be rendered by any app route.

### Hosting Portfolio Demos
Use `apps/demos` for the shared demo domain flow. Add each new demo as a route folder inside that app instead of placing demo routes inside production sites like `infynt-site` or `orellie`.

## Deployment (Vercel)

Set the Vercel **Root Directory** to the specific app folder you want to deploy, for example:

- `apps/demos`
- `apps/manawatu-plumbing`
- `apps/hearth-and-bloom`

For demo-style apps that should be reachable at a path like `/demo-name`, prefer a real route folder (`app/demo-name/page.tsx`) rather than custom dashboard rewrites.

## App Documentation

- Every standalone app should keep an app-local `README.md` describing purpose, setup, build, and deployment.
- If an app introduces custom reusable local components or special media rules, add an app-local `ARCHITECTURE.md` so future agents can understand the structure without reverse engineering the page.

## Rules for AI Agents

Refer to [AGENTS.md](./AGENTS.md) for detailed coding standards, UI quality bars, and architectural guidelines.
