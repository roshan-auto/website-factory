# Workflow: Build E-Commerce Website

Use this workflow to construct a fully integrated Next.js + Headless WooCommerce website. 

## Phase 1: Environment & Tooling Setup
1. Verify `NEXT_PUBLIC_WORDPRESS_API_URL` environment variables exist in the target application (`apps/<app-name>/.env.local`).
2. Read the `.agents/skills/ecommerce-builder/SKILL.md` to establish architectural boundaries for Headless WooCommerce.
3. Validate that the UI aesthetic uses `theme-factory`.

## Phase 2: Create Core Shared E-Commerce Components
Before building the actual pages, execute the creation of standard E-Commerce components in `packages/sections`.
1. Create `product-grid-section.tsx`: A robust grid taking in an array of product data objects (title, price, image URL, slug).
2. Create `featured-product-section.tsx`: For singular hero products.
3. Optionally create primitive UI components in `packages/ui` (e.g. `ProductCard`, `Button`, `Badge` for "Sale" items).

## Phase 3: Construct Pages
Utilize the newly created components to build the Next.js routes.
1. Update `apps/<app-name>/src/app/page.tsx` with a `FeaturedProductSection` and a preview `ProductGridSection` displaying top items.
2. Construct the main shop route: `apps/<app-name>/src/app/shop/page.tsx`. This should query the WooCommerce WPGraphQL endpoint to fetch all active products and render them using `ProductGridSection`.
3. Construct the product detail route: `apps/<app-name>/src/app/shop/[slug]/page.tsx` utilizing dynamic params.

## Phase 4: Cart and Checkout Handoff Integration
1. Ensure product sections allow caching the "Cart Session" id.
2. Funnel all checkout CTAs to redirect to the raw WooCommerce target (e.g., `https://api.yourdomain.com/checkout`).

## Phase 5: UI QA & Mobile Polish
1. Run `next build` inside the app folder to verify absolute TypeScript compliance.
2. Fix all margin/padding layout bugs and ensure Mobile-First layout holds up for product grids.
