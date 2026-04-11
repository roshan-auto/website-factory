# Handover Rule

- Shared components must be designed so they can be copied into a standalone app if needed.
- Avoid deep coupling between app code and shared packages.
- Prefer simple props over hidden dependencies.
- Do not hardcode business-specific content inside shared components.
- Keep imports predictable and easy to rewrite during handover.
- Shared components should not depend on unrelated app-only utilities.
- When creating reusable sections, keep styling self-contained where practical.
- If a site may be handed over, the app must be able to receive copied versions of the shared components it uses.

## Handover modes
- Managed mode: app continues using shared packages in the monorepo.
- Standalone mode: required shared components are copied into the app and imports are updated.

## Rules for shared components
- Prefer explicit props
- Avoid circular dependencies
- Avoid importing from another app
- Avoid hidden global assumptions
- Keep each component portable
