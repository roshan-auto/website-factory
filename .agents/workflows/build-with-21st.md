---
description: Workflow for sourcing and integrating components from 21st.dev via MCP
---

# 21st.dev Component Workflow

This workflow guides the agent and user in building high-quality, modern web components by utilizing the **21st.dev MCP Server** rather than scaffolding UIs from scratch.

## Prerequisites
- The **21st.dev Magic MCP Server** must be configured in your environment.
- An active API key from [21st.dev](https://21st.dev).

## Step-by-Step Process

### 1. Identify the Component Need
Instead of asking the agent to "build a pricing section from scratch", formulate a specific need based on modern standards (e.g., "We need a dark-mode optimized pricing table with a toggle for annual billing").

### 2. Search 21st.dev via MCP
- The agent will use the available 21st.dev MCP tools (typically via a `/ui` command or direct tool call to the server) to query the 21st.dev registry.
- Provide descriptive search terms: `pricing table`, `hero section`, `bento grid`, etc.

### 3. Review & Select
- The MCP server will return several state-of-the-art component variants curated from top designers.
- The agent will present these options or directly select the one that best matches the current design system (Tailwind v4, React/Next.js, Dark Mode).

### 4. Integration & Customization
- Once the component is selected, use the MCP tool to pull the code into the workspace.
- **Critical Agent Task:** The agent must *not* leave the component unstyled or disconnected.
- The agent will refactor the downloaded component to integrate seamlessly with the `.agents/skills/theme-factory` (mapping colors to our CSS variables like `var(--color-accent)`).
- Ensure any missing dependencies (like specific lucide-react icons, framer-motion, or shadcn utilities) are installed.

### 5. Validate & Test
- Run the local dev server.
- Verify aspects like responsiveness (mobile vs desktop), contrast ratios, and interactive states (hover/focus).
- Capture screenshots via the browser subagent if needed to verify no layout stretching is occurring.

## Why this is better
By using 21st.dev, we eliminate the generic "AI aesthetic". We inherit pixel-perfect margins, refined typography, and complex animations that would otherwise take hours to meticulously prompt and refine.
