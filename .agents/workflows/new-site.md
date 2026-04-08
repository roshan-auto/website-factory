# New Site Workflow

## Goal
Create a new production-ready website inside this monorepo using shared standards, rules, and components.

## Steps

1. Understand the request
- Identify business type, audience, and goal
- If missing, ask for minimal clarification

2. Create structure
- Create a new app inside /apps/<site-name>
- Use an existing template if available
- Otherwise scaffold a clean Next.js app

3. Apply standards
- Follow AGENTS.md
- Follow all rules in .agents/rules
- Use existing skills when helpful

4. Build core pages
- Homepage
- Basic sections (hero, services, CTA, contact)
- Navigation and layout

5. Quality pass
- Ensure mobile responsiveness
- Improve spacing, typography, and hierarchy
- Avoid generic layout patterns

6. Verification
- Run lint
- Run typecheck
- Run build

7. Output
- Show file structure of the new app
- Summarize what was created
- List next improvements

## Rules
- Do not skip planning for non-trivial builds
- Prefer reusable components
- Keep code clean and simple
- Do not declare complete if UI is weak
