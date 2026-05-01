# Portable Component Builder Agent - Playbook (Project 0)

This is a standalone instruction set for a brand-new agent with zero context. The agent's purpose is to build portable, animated UI components that can be plugged into any website.

---

## Step 0: Clone The Base Skill (Start Here)

Clone the upstream `frontend-design` skill and use it as the foundation:

```bash
git clone https://github.com/anthropics/skills.git
```

The skill lives here inside that repo:
```text
skills/frontend-design/
```

Copy that skill into your agent's local "skills" folder (wherever your agent runtime expects skills) and rename it to something like:
```text
frontend-design-portable
```

Then apply the upgrades below on top of it.

Upstream reference:
```text
https://github.com/anthropics/skills/tree/main/skills/frontend-design
```

---

## Step 1: Create A Fresh "Component Lab" Repo

Create a new empty GitHub repo for the agent's work (name suggestion: `component-lab`).

Clone it locally:
```bash
git clone <your-repo-url>
cd <your-repo>
```

Create these folders (minimal, portable-first):
```bash
mkdir -p exports docs
```

---

## Step 2: Create The Core Docs (Copy/Paste Templates)

These files are the "memory" and rulebook for the agent. Create them in the repo root.

### `AGENTS.md` (minimal template)

```md
# Component Lab Operating Rules

## Mission
Build portable UI components and sections that can be plugged into any website.

## Default stack
- React + TypeScript
- Tailwind CSS (preferred, optional)
- framer-motion (preferred for animation)

## Quality bar
- No generic layouts; commit to a strong visual direction each time.
- Motion-first, but respects prefers-reduced-motion.
- Accessible by default (keyboard + semantics + ARIA where needed).
- Responsive (mobile-first; verify 390 / 768 / 1440).

## Portability contract
- Every deliverable ships as `exports/<name>/` with `EXPORT.md` and code files.
- Components must be props-driven, themed, and not tied to one app/router.
- Avoid Next.js-only imports in the core component (adapters allowed).

## Delivery checklist
- Component pack exists under `exports/<name>/`
- `EXPORT.md` has deps + copy paths + usage snippet
- Reduced-motion safe
- No horizontal overflow on mobile
```

### `README.md` (minimal template)

```md
# Component Lab

This repo contains portable, animated UI component packs under `exports/`.

## How To Use
Pick a folder under `exports/<name>/` and follow `EXPORT.md`.
```

### `docs/STYLE_GUIDE.md` (minimal template)

```md
# Style Guide

- Always choose an aesthetic direction (editorial/luxury/industrial/organic/etc).
- Use a dominant neutral base plus 1-2 accent colors.
- Use one signature motion language (stagger + reveal + hover lift), not random effects.
- Prefer CSS variables for theme tokens so consumers can restyle quickly.
```

---

## Mission

Build reusable components and sections that are:
- Portable (copy into any project with minimal edits)
- Configurable (props-driven, themable, variant-friendly)
- Motion-first (but respects reduced motion)
- Accessible (keyboard, semantics, ARIA when needed)
- Responsive (mobile-first, no overflow, good spacing rhythm)

The agent should default to shipping components with a high design bar: memorable typography, clear hierarchy, intentional motion, and non-generic layout choices.

---

## The Upgrades You Must Add To The Base Skill

When you fork `frontend-design` into `frontend-design-portable`, add these rules:

### 1) Portability Contract (Non-negotiable)

Every component must ship as a "component pack" folder that is easy to copy:
```text
exports/<component-name>/
  EXPORT.md
  <ComponentName>.tsx
  optional-subcomponents.tsx
  optional-styles.css (only if Tailwind is not available)
```

`EXPORT.md` must include:
- What the component is
- Dependencies to install
- Files to copy and where
- A minimal usage example
- Theming knobs (props and/or CSS variables)

### 2) Framework-Agnostic First

Default to plain React + TypeScript compatible code.

Avoid hard dependencies on:
- Next.js-only imports (`next/link`, `next/image`)
- App-specific routing assumptions

If a framework-specific wrapper is helpful:
- Create a small adapter file (for example `NextAdapter.tsx`) and keep the core component framework-agnostic.

### 3) Motion-First, Reduced-Motion Safe

Default motion should include:
- Entry animation (staggered reveal)
- Scroll reveal for below-the-fold
- Hover micro-interaction (lift/tilt/glow)

But it must respect user preferences:
- If `prefers-reduced-motion: reduce`, disable or heavily soften animations.
- Avoid motion that harms readability or causes layout shift.

### 4) Configuration-First API Design

Components must be easy to reuse in any brand context:
- Content comes from props (arrays/objects), not hardcoded text
- Accept `className`
- Prefer `variant`/`tone` props or CSS-variable tokens for theme overrides
- Provide sensible defaults

### 5) Accessibility Defaults

Minimum expectations:
- Correct HTML semantics (headings, lists, buttons, nav)
- Keyboard navigation (tab order, focus rings, Escape to close dialogs)
- `aria-*` where required (accordion, menu, dialog)
- No "div button" patterns

---

## Recommended Tech Stack (Keep It Simple)

You can build portable components that work in most modern sites with:
- React + TypeScript
- Tailwind CSS (optional but recommended)
- framer-motion (for high-quality motion)
- Headless UI primitives (Radix or equivalent) only when needed

If the consumer project does not use Tailwind:
- Include a lightweight CSS file in the export pack
- Keep selectors scoped to a single top-level class to avoid collisions

---

## What "Done" Means For Any Component Request

Each time the user asks for a component (FAQ, Hero, Pricing, etc), the agent must deliver:

1. A reusable component pack under `exports/<component-name>/`
2. `EXPORT.md` with install + usage instructions
3. A demo usage snippet (inside `EXPORT.md`)
4. Motion included by default, reduced-motion safe
5. Mobile-first layout (works at 390px, 768px, 1440px)

Optional but encouraged:
- A small preview page/app so the user can view it live quickly

---

## Media (If The Component Uses Video)

If a component includes a hero/background video:
- Encode for web delivery (no audio, fast start)
- Provide both MP4 and WebM when possible

```bash
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 -crf 23 -preset slow \
  -profile:v main -level 4.0 -pix_fmt yuv420p \
  -movflags +faststart -an \
  OUTPUT-web.mp4
```

```bash
ffmpeg -y -i INPUT.mp4 \
  -vf "scale=1280:720" \
  -c:v libvp9 -crf 30 -b:v 0 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p -an \
  OUTPUT-web.webm
```

---

## Prompt Template You Should Use With This Agent

Use this exact structure when you ask the agent to build something:

```text
Build a [FAQ/Hero/Pricing/Testimonial] component pack.

Requirements:
- Portable: works in any React+TS project
- Props-driven content and configuration
- Motion-first (stagger + scroll reveal + hover), reduced-motion safe
- Accessible semantics and keyboard support
- Responsive: 390 / 768 / 1440 layouts

Deliverables:
- exports/<name>/EXPORT.md
- exports/<name>/<Name>.tsx (+ any helper files)
```

---

## Minimal Templates (Copy/Paste)

### EXPORT.md template

````md
# <Component Name>

## What It Is
Short description.

## Dependencies
```bash
npm i framer-motion lucide-react
```

## Files
- Copy `./<ComponentName>.tsx` into `src/components/<ComponentName>.tsx`

## Usage
```tsx
import { ComponentName } from "./ComponentName";

export function Page() {
  return (
    <ComponentName
      variant="lux"
      items={[{ title: "Question", content: "Answer" }]}
    />
  );
}
```

## Theming
- `variant`: "lux" | "studio" | "neutral"
- `className`: string
- CSS variables (optional): `--accent`, `--surface`, `--text`
````

---

## Optional: Remotion (Only If You Need Generated Video)

Only add Remotion if the job explicitly requires rendering new video content.
For normal web UI components, do not add Remotion by default.
