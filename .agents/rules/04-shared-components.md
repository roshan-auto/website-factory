# Shared Components Rule

- Before creating new UI components, first check whether a reusable component already exists in packages/ui or packages/sections.
- Prefer reuse over duplication.
- Shared UI should be generic and reusable across multiple industries and websites.
- Site-specific styling or wording should stay inside the app, not inside shared packages unless broadly reusable.
- Avoid copying and pasting full sections between apps when a shared section component can be used.
- Keep shared components simple, clean, and easy to extend.
- Shared components must be portable enough to be copied into a standalone app during client handover.
- Avoid tightly coupling shared components to monorepo-only helpers unless clearly necessary.
- Prefer local, explicit dependencies that can be extracted easily.
- When practical, create components in a way that allows import paths to be rewritten with minimal effort.
