---
name: ecommerce-builder
description: Use this skill when the user requests an e-commerce website, shop page, or product grid integration with WooCommerce. Follows standard Headless WooCommerce architectural guidelines using WPGraphQL.
---

# WooCommerce Builder Skill

## Overview
This skill defines the standard operating procedure for building beautiful, conversion-optimized E-Commerce sites using Next.js and Headless WooCommerce.

## Architecture Guidelines
- **Approach:** Headless Frontend (Next.js) + Native WooCommerce Backend checkout.
- **Fetching:** Use GraphQL queries pointing to the WooCommerce `WPGraphQL` endpoint, or the Next.js Store API REST fallback. Use the `woocommerce-client` utility (if available) for retrieving data.
- **Aesthetic:** Apply the existing UI components and themes from the `theme-factory` so the shop fits the exact visual identity of the landing pages. Avoid generic shop templates.

## Standard E-Commerce Components
When building an e-commerce page, utilize or build the following shared sections:
1. **`HeroProduct`**: A massive, beautifully lit feature section for the marquee product displaying clear Call to Actions.
2. **`ProductGridSection`**: A responsive, masonry or structured grid of products showcasing high-quality images, pricing, and hover states.
3. **`ProductDetailsView`**: The inner page for a product containing robust imagery, dynamic add-to-cart functionality, variation selection, and styled accordions for description/reviews.
4. **`ShoppingCartSheet`**: A slide-out (Drawer) component that collects user actions quickly without them leaving the page.

## Implementation Workflow
1. **Environment Config:** Ask the user or verify that `NEXT_PUBLIC_WORDPRESS_API_URL` is set in the environment payload.
2. **Scaffold Pages:** Build `/shop` and `/product/[slug]` routes correctly utilizing Next.js Dynamic Routing and ISR.
3. **Build the Interface:** Retrieve products using predefined GraphQL structures and pass them into the `ProductGridSection`.
4. **Checkout Handoff:** For the highest conversion and security, funnel users to a unified checkout redirect URL containing the user's cart session parameters, managed by native WordPress handling, rather than a custom React checkout UI.

## UI Quality Bar
- Utilize `shadcn/ui` where applicable for interactive components (Accordions, Drawers, Select menus).
- Stick strictly to the `theme-factory` color palettes—no default browser blues or hard-coded hexes outside the theme variables.
- Optimize images drastically, ensuring heavy product imagery does not tank Core Web Vitals.
