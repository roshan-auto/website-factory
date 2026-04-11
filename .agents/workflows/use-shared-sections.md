# Use Shared Sections Workflow

## Goal
Build or update website pages using reusable shared components and sections before creating new custom ones.

## Steps

1. Inspect shared packages
- Check packages/ui for reusable primitives
- Check packages/sections for reusable website sections

2. Reuse first
- If a suitable shared component or section exists, use it
- Only create a new shared component if the need is clearly reusable across multiple sites

3. Keep separation clean
- Shared logic and reusable layouts go into packages/ui or packages/sections
- Site-specific content, copy, and branding stay inside the app folder

4. When adding new shared items
- Give them clear names
- Keep them generic
- Avoid industry-specific hardcoding unless intentional
- Keep them portable for future standalone handover if needed

5. Output
- State which shared components were reused
- State which new shared components were created
- Explain why

## Rules
- Reuse before creating
- Avoid duplication
- Keep shared pieces generic and maintainable
- Keep shared pieces portable for handover
