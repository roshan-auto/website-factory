# Orellie - Boutique E-Commerce Website

**Note to AI Agents:** This README contains the critical architectural context, deployment rules, and current state of the Orellie website. Always read this file before modifying the Orellie codebase to ensure you do not break the split-repo deployment architecture.

## 🏗️ Architecture: Headless WooCommerce
Orellie is a Headless E-Commerce site using the Monorepo "Website Factory" pattern. It separates the Code (Next.js/React & Custom Theme) from the Data (WordPress MySQL & User Uploads).

1. **Frontend (Next.js)**: Lives in `apps/orellie/`. This is the user-facing site deployed to Vercel. It fetches product data from the WordPress backend via GraphQL (`WPGraphQL`).
2. **Backend (WordPress Theme)**: Lives in `apps/orellie/content/themes/orellie-theme`. This contains the custom PHP, assets, and styling for the WordPress dashboard and native checkout flows.

## 🚀 Local Development Setup
1. **Next.js Frontend**: Run `npm run dev` from the root of the workspace.
2. **WordPress Backend**: We use a local Docker container for theme development. Navigate to `apps/orellie/metadata/` and run `docker-compose up -d`. 
   *Note: The Docker `wp-content/themes` folder is volume-mapped directly to `apps/orellie/content/themes` so local PHP edits instantly reflect in the local sandbox.*

## 🌍 Deployment Process (Split-Repo Strategy)
**CRITICAL:** Never manually copy files to the live server. We use a Split-Repo Strategy to deploy the backend to Hostinger.

1. **Frontend**: Simply commit and push to the `website-factory` repository on GitHub. Vercel automatically builds and deploys the Next.js app.
2. **Backend (Hostinger)**: 
   - Run the automated script from the workspace root: `./apps/orellie/deploy-to-hostinger.ps1`
   - This script uses `git subtree split` to cleanly extract the `content/` folder and pushes it to a standalone GitHub repository (`orellie.git`).
   - **Hostinger Quirk**: Hostinger's auto-deploy webhook is wired to pull this repo into a nested directory: `~/domains/orellie.nz/public_html/public_html/orellie-sync/`.
   - **Symlink**: The live WordPress site is permanently symlinked to this nested auto-deploy folder. Do not alter the Hostinger paths or symlinks.

## ⚠️ Known Issues, Bugs & Strict Rules
1. **Video/Media File Sizes**: Never commit a video larger than 10MB to the repository. It will break GitHub's file limits and cause browser buffering. The current `hero.mp4` was successfully optimized down to 2.6MB.
2. **LiteSpeed Byte-Range Caching**: Hostinger uses LiteSpeed server caching. If you ever update a media file (like `hero.mp4`) with a new file of the same name, **you must append a cache-buster query string** (e.g., `hero.mp4?v=2`) in the HTML/PHP. Otherwise, the browser's HTTP 206 Partial Content cache will crash and return a silent `404 ()` fallback.
3. **PowerShell Encoding**: Never use UTF-8 multi-byte emojis (🚀, 📦) in `.ps1` deployment scripts. Windows PowerShell will swallow trailing commands and silently fail.

## 🚧 Current Project Status
**What is Done:**
- Brand aesthetic established (Boutique, Serif, #fb6593 primary color).
- Split-Repo Hostinger Deployment pipeline is fully operational.
- Local Docker WordPress environment is configured.
- Signature Grid UI is built.

**What Needs to be Built/Fixed Next:**
- Complete the WPGraphQL connection to fetch real products from the live Hostinger database.
- Wire up the dynamic `/shop/[slug]` product detail pages.
- Implement the Cart Drawer state management.
- Integrate the secure checkout redirect back to the native WooCommerce endpoints.
