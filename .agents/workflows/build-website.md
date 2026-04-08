---
description: How to build a new website from scratch using the project's skills
---

# Build a New Website

This workflow guides building a beautiful, modern website from a user's requirements.

## Prerequisites
- Skills loaded: `frontend-design`, `theme-factory`, `web-app-builder`
- Google Fonts access (via CDN)

## Steps

### 1. Understand Requirements
- Read the user's brief carefully
- Identify: purpose, audience, number of pages, content, any brand constraints
- Ask clarifying questions if the brief is vague

### 2. Read the Frontend Design Skill
// turbo
```
view_file d:\Website Developer\.agents\skills\frontend-design\SKILL.md
```
Follow its **Design Thinking** process:
- Define the purpose, tone, constraints, and differentiator
- Choose a BOLD aesthetic direction — never generic

### 3. Choose or Create a Theme
- Read the theme-factory skill for available themes
- If the user wants a specific look, create a custom theme
- Generate CSS custom properties for the chosen theme

### 4. Determine Complexity
- **Simple site** (1-5 static pages): Use HTML + CSS + vanilla JS (frontend-design skill)
- **Complex app** (routing, state, components): Use React/Vite (web-app-builder skill)

### 5. Build the Website

#### For Simple Sites:
1. Create `index.html` with semantic HTML5 structure
2. Create `styles.css` with the theme's CSS custom properties
3. Add responsive layout, animations, and interactivity
4. Create additional pages as needed

#### For Complex Apps:
1. Initialize Vite + React project
2. Install dependencies (Tailwind, shadcn/ui if needed)
3. Build component tree
4. Implement routing and state
5. Add styling and animations

### 6. Preview the Website
// turbo
Start a local dev server to preview:
```
For HTML sites: npx -y serve .
For Vite apps: npm run dev
```

### 7. Polish & Refine
- Check responsiveness at all breakpoints
- Verify animations and transitions are smooth
- Ensure all interactive elements work
- Validate SEO meta tags and heading hierarchy
- Test accessibility (contrast, keyboard nav, screen readers)
