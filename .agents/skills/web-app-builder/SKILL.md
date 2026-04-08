---
name: web-app-builder
description: Build multi-component web applications using modern frontend technologies (React/Vite, TypeScript, Tailwind CSS, shadcn/ui). Use this skill for complex web apps requiring state management, routing, component architecture, or full-stack features. For simpler single-page sites, use the frontend-design skill instead.
---

# Web Application Builder

Build production-quality web applications using a modern stack. This skill is for when the user needs more than a single HTML page — full applications with routing, state, and component architecture.

## Technology Stack

- **Framework**: React 18 + TypeScript via Vite
- **Styling**: Tailwind CSS 3.x + shadcn/ui components
- **Routing**: React Router (if multi-page)
- **State**: React hooks + Context API (or Zustand for complex state)
- **Build**: Vite for dev server and production bundling

## Design & Style Guidelines

**CRITICAL**: Avoid "AI slop" — never use excessive centered layouts, purple gradients, uniform rounded corners, or Inter font as defaults.

Follow the **frontend-design** skill's aesthetic guidelines for all visual decisions. Every web app must look like it was designed by a premium design agency.

## Quick Start

### Step 1: Initialize Project

```bash
npx -y create-vite@latest ./ --template react-ts
npm install
```

### Step 2: Add Tailwind CSS (if requested)

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Configure in `vite.config.ts`:
```typescript
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Step 3: Add shadcn/ui (if needed)

```bash
npx -y shadcn@latest init
npx -y shadcn@latest add button card dialog input
```

### Step 4: Develop

```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/         # shadcn/ui base components
│   └── ...         # Custom components
├── pages/          # Page-level components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── styles/         # Global styles & design tokens
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

## Development Workflow

1. **Understand Requirements** — Fully grasp what the user needs
2. **Plan Component Tree** — Sketch out the component hierarchy
3. **Build Design System** — Define tokens (colors, fonts, spacing) in CSS/Tailwind config
4. **Implement Components** — Build from atomic → composite → page-level
5. **Add Interactivity** — State management, event handlers, API integration
6. **Polish** — Animations, responsive design, accessibility, performance

## Best Practices

- Use semantic HTML in all components
- Implement proper loading and error states
- Add smooth page transitions and micro-interactions
- Ensure responsive design at all breakpoints
- Use lazy loading for routes and heavy components
- Implement proper SEO with meta tags and heading hierarchy
