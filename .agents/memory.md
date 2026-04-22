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

### Framer Motion TypeScript Variants
*   **The Problem:** Vercel's strict `next build` fails when custom bezier curves in animation `transition` blocks (e.g., `ease: [0.25, 0.4, 0.25, 1]`) are implicitly inferred as a generic `number[]` rather than an explicit 4-point tuple, leading to a `Variants` type mismatch.
*   **The Fix:** Always explicitly type arrays used for easing in framer-motion variants by appending `as [number, number, number, number]` or `as const` to satisfy the strict TypeScript compiler.

## 🪄 AI Workflows
*   **UI Component Sourcing (21st.dev):** We utilize the **21st.dev Magic MCP Server** to quickly seed professional, fast-loading components. See `.agents/workflows/build-with-21st.md`.
    *   *Configuration Quirk:* When setting up the `mcp_config.json`, the command must point directly to `@21st-dev/magic@latest` (not the CLI). 
    *   *Env Variables:* The server relies strictly on specific environment variable mappings for API authentication. Always map multiple keys in the `env` block (e.g., `API_KEY_21ST`, `TWENTY_FIRST_API_KEY`, `21ST_API_KEY`) to ensure successful initialization.

## 🚀 PowerShell & Scripting Constraints
*   **The Problem:** Windows PowerShell can silently choke on UTF-8 multi-byte characters (like emojis 🚀, 📦) in standard `.ps1` scripts, causing it to completely ignore trailing executable lines without throwing an error.
*   **The Fix:** Always write automation scripts (e.g., `deploy-to-hostinger.ps1`) strictly in plain ASCII text. Use standard brackets `[1/3]` instead of emojis for logging.

## 🌐 WordPress & Hostinger Deployment Glitches
### Hostinger Git Path Duplication
*   **The Problem:** When setting the "Install Path" in Hostinger's automatic Git tool, typing `public_html/folder-name` creates a deeply nested path (`public_html/public_html/folder-name`) because Hostinger inherently executes relative to `public_html/`.
*   **The Fix:** Instruct users to set the Install Path *exactly* to the folder name (`folder-name`), or if a nested path is already accidentally created by Hostinger during a pull, dynamically adapt to it by pointing the server's SSH symlink directly to that nested path (`ln -s ~/domains/.../public_html/public_html/folder...`).

### WordPress Static Asset Caching (LiteSpeed)
*   **The Problem:** Overwriting a large media file (like a 58MB video) with an optimized file (2MB) under the exact same filename breaks the browser's HTTP 206 Partial Content byte-range cache. The browser will try to "resume" downloading the 58MB file, fail against the 2MB file boundaries, and silently return a broken `404 ()` in the console or fallback to the poster image. LiteSpeed server cache also exacerbates this by serving stale HTML.
*   **The Fix:** Never hot-swap media sizes blindly. Always inject a cache-busting string into the PHP template (e.g., `<source src="hero.mp4?v=2">`) to violently force the browser and CDN to drop the Range requests and fetch the new size map. Ensure videos are compressed heavily prior to git tracking.
