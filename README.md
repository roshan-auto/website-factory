# Website Factory Monorepo

A high-performance monorepo for building, deploying, and maintaining premium boutique websites.

## Project Structure

```bash
├── apps/                   # Standalone Next.js Applications
│   ├── manawatu-plumbing/  # Standalone Plumbing Demo (Vercel target)
│   ├── hearth-and-bloom/   # Cinematic Cafe Landing Page (Vercel target)
│   ├── infynt-site/        # Main Studio Website
│   └── electrician-site/   # Electrician Demo
├── packages/               # Shared Monorepo Packages
│   ├── ui/                 # Shared UI Primitives (Radix, Framer Motion)
│   └── sections/           # Shared Page Sections & Templates
└── resources/              # Global Design Assets & Styleguides
```

## Key Workflows

### Creating a New Standalone App
1. Create a new directory in `apps/`.
2. Link shared packages in `package.json` using `file:` references:
   ```json
   "@packages/ui": "file:../../packages/ui",
   "@packages/sections": "file:../../packages/sections"
   ```
3. Configure **Tailwind CSS v4** in `globals.css` to scan shared packages:
   ```css
   @import "tailwindcss";
   @source "../";
   @source "../../../packages";
   ```

### Using Shared Templates
Shared templates (like `ManawatuFlow`) are located in `packages/sections/templates/`. These are "mega-components" that can be imported and rendered in any standalone app route.

## Deployment (Vercel)
When deploying to Vercel, ensure the **Root Directory** is set to the specific app folder (for example, `apps/manawatu-plumbing` or `apps/hearth-and-bloom`). This prevents configuration conflicts with other apps in the monorepo.

## Rules for AI Agents
Refer to [AGENTS.md](./AGENTS.md) for detailed coding standards, UI quality bars, and architectural guidelines.
