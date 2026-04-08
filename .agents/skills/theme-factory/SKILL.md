---
name: theme-factory
description: Toolkit for styling websites with a curated theme. Apply professional color palettes and font pairings to any website, landing page, or web component. Choose from 10 pre-set themes or generate custom themes on-the-fly.
---

# Theme Factory Skill

This skill provides a curated collection of professional font and color themes, each with carefully selected color palettes and font pairings. Apply any theme to a website project for instant professional styling.

## Purpose

To apply consistent, professional styling to websites. Each theme includes:
- A cohesive color palette with hex codes and CSS custom properties
- Complementary font pairings for headings and body text
- A distinct visual identity suitable for different contexts and audiences

## Usage

1. **Present available themes** — Show the user the 10 themes below
2. **Ask for selection** — Let the user choose, or create a custom theme
3. **Apply theme** — Generate CSS custom properties and apply to the project

## Available Themes

### 1. Ocean Depths
**Vibe**: Professional, calming, trustworthy
- **Primary**: `#0B2545` (Deep Navy)
- **Secondary**: `#13315C` (Midnight Blue)
- **Accent**: `#8DA9C4` (Steel Blue)
- **Surface**: `#EEF4ED` (Seafoam White)
- **Text**: `#0B2545`
- **Heading Font**: Merriweather (serif)
- **Body Font**: Open Sans

### 2. Sunset Boulevard
**Vibe**: Warm, vibrant, energetic
- **Primary**: `#E63946` (Warm Red)
- **Secondary**: `#F4A261` (Sandy Orange)
- **Accent**: `#E76F51` (Burnt Sienna)
- **Surface**: `#FFF8F0` (Cream)
- **Text**: `#264653`
- **Heading Font**: Playfair Display
- **Body Font**: Lato

### 3. Forest Canopy
**Vibe**: Natural, grounded, earthy
- **Primary**: `#2D6A4F` (Forest Green)
- **Secondary**: `#40916C` (Sage)
- **Accent**: `#B7E4C7` (Mint)
- **Surface**: `#F5F7F2` (Natural White)
- **Text**: `#1B4332`
- **Heading Font**: Libre Baskerville
- **Body Font**: Source Sans 3

### 4. Modern Minimalist
**Vibe**: Clean, contemporary, sophisticated
- **Primary**: `#1A1A2E` (Near Black)
- **Secondary**: `#16213E` (Dark Slate)
- **Accent**: `#E94560` (Hot Pink)
- **Surface**: `#F7F7F7` (Light Gray)
- **Text**: `#1A1A2E`
- **Heading Font**: DM Sans
- **Body Font**: IBM Plex Sans

### 5. Golden Hour
**Vibe**: Rich, warm, autumnal
- **Primary**: `#BC6C25` (Amber)
- **Secondary**: `#DDA15E` (Gold)
- **Accent**: `#606C38` (Olive)
- **Surface**: `#FEFAE0` (Parchment)
- **Text**: `#283618`
- **Heading Font**: Cormorant Garamond
- **Body Font**: Nunito

### 6. Arctic Frost
**Vibe**: Cool, crisp, modern
- **Primary**: `#023E8A` (Ice Blue)
- **Secondary**: `#0077B6` (Ocean Blue)
- **Accent**: `#90E0EF` (Frost)
- **Surface**: `#F0F8FF` (Alice Blue)
- **Text**: `#03045E`
- **Heading Font**: Outfit
- **Body Font**: Inter

### 7. Desert Rose
**Vibe**: Soft, sophisticated, romantic
- **Primary**: `#B5838D` (Dusty Rose)
- **Secondary**: `#6D6875` (Muted Purple)
- **Accent**: `#FFB4A2` (Peach)
- **Surface**: `#FFF5F5` (Rose White)
- **Text**: `#3D3D3D`
- **Heading Font**: Fraunces
- **Body Font**: Karla

### 8. Tech Innovation
**Vibe**: Bold, modern, cutting-edge
- **Primary**: `#7209B7` (Electric Purple)
- **Secondary**: `#3A0CA3` (Deep Violet)
- **Accent**: `#4CC9F0` (Neon Cyan)
- **Surface**: `#0F0F0F` (Near Black) — *Dark theme*
- **Text**: `#F0F0F0`
- **Heading Font**: Syne
- **Body Font**: Space Mono

### 9. Botanical Garden
**Vibe**: Fresh, organic, lively
- **Primary**: `#386641` (Leaf Green)
- **Secondary**: `#6A994E` (Grass)
- **Accent**: `#F2E8CF` (Chamomile)
- **Surface**: `#FAFFF5` (Garden White)
- **Text**: `#1B2A1B`
- **Heading Font**: Bitter
- **Body Font**: Quicksand

### 10. Midnight Galaxy
**Vibe**: Dramatic, cosmic, premium
- **Primary**: `#240046` (Deep Space)
- **Secondary**: `#3C096C` (Nebula)
- **Accent**: `#FF6D00` (Stellar Orange)
- **Surface**: `#10002B` (Void) — *Dark theme*
- **Text**: `#E0AAFF`
- **Heading Font**: Rajdhani
- **Body Font**: Exo 2

## CSS Custom Properties Template

When applying a theme, generate these CSS custom properties:

```css
:root {
  /* Theme: [Theme Name] */
  --color-primary: [primary];
  --color-secondary: [secondary];
  --color-accent: [accent];
  --color-surface: [surface];
  --color-text: [text];
  --color-text-muted: [text with reduced opacity];
  
  --font-heading: '[Heading Font]', [fallback];
  --font-body: '[Body Font]', [fallback];
  
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Custom Theme Creation

If none of the existing themes fit, create a custom theme by:
1. Understanding the brand/project requirements
2. Selecting a cohesive color palette (tools: coolors.co, colorhunt.co)
3. Choosing complementary Google Fonts
4. Generating the CSS custom properties
5. Applying consistently across all components
