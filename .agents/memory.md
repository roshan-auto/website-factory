# System Memory & Lessons Learned

This document serves as the long-term memory for the Website Factory agent. It contains critical lessons learned, recurring bugs and their fixes, and evolved design patterns. Review these before starting new complex tasks to avoid repeating past mistakes.

## 🎨 UI & Layout Stability

### CSS Coordinate Distortion & Aspect Ratios
*   **The Problem:** Using generic resets like `img, svg { max-width: 100%; height: auto; }` combined with `height: 100%` on `html`/`body` can cause severe horizontal or vertical stretching of elements (like icons and SVGs) on certain high-DPI viewports.
*   **The Fix:**
    1.  Remove `height: 100%` or `min-height: 100%` from `html` and `body`.
    2.  Use explicit font constraints: give headings `line-height: 1.2` and body `line-height: 1.5` globally so text containers don't stretch weirdly.
    3.  **Mandatory Icon Pattern:** Any flex/grid child that serves as an icon container MUST have `.shrink-0` and an explicit `.aspect-square` utility or `aspect-auto` to prevent flexbox from squishing or stretching it.

### Font Rendering Consistency
*   **The Problem:** Ultra-wide variable fonts (like Syne) can cause erratic container sizing if the text spills over in unpredictable ways across browsers.
*   **The Fix:** Prefer robust geometric sans-serif pairs (like **Outfit** for headings and **Inter** for body text) using `next/font/google` for predictable bounding box behavior.

## 🛠️ Integrations & APIs

### Resend Email Integration (Contact Forms)
*   **The Problem:** Forms using Resend fail silently or confusingly in local development because the domain isn't verified.
*   **The Fix:**
    1.  Implement "Sandbox Intelligence" in the Server Action: detect if the error states "You can only send testing emails", and return a UI-friendly error prompting the user to update `CONTACT_EMAIL` in `.env` to their registered Resend email address.
    2.  Always use a `.env.example` to document required API keys.
    3.  Always provide loading, success, and error states in the Client Component executing the Server Action.

## 📄 Repository Guidelines
*   **Env Security:** Root `.gitignore` must explicitly ignore `.env*` and `*.local` to prevent workspace packages from leaking credentials.

## 🏗️ Next.js Framework Quirks

### Vercel Deployment vs Local Dev
*   **The Problem:** The local `next dev` server often tolerates missing TypeScript imports (like not importing the `Metadata` type), but Vercel's strict `next build` pipelines will outright fail the deployment.
*   **The Fix:** Never ignore TypeScript compiler warnings. Ensure types like `import type { Metadata } from "next";` are correctly referenced in layout files before pushing to remote.

### Interactivity in the App Router
*   **The Problem:** Adding `onClick` handlers directly in `page.tsx` causes errors because Next.js App Router defaults to Server Components.
*   **The Fix:** Always extract interactive UI elements (like a Navbar with a hamburger menu or contact form) into a dedicated component inside `app/components/` and prepend it with `"use client";`. Keep the main page as a Server Component for SEO and performance.

## 🪄 AI Workflows
*   **UI Component Sourcing:** To prevent hallucinating "generic AI layouts", we integrated the **21st.dev Magic MCP Server**. See `.agents/workflows/build-with-21st.md`. Always check the MCP registry for complex UI features (pricing, heroes, bentos) rather than building from scratch.
