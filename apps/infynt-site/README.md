This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Custom UI Components

Reusable components live in `app/components/ui/`. They are framework-agnostic — drop them into any page or demo.

### `CardStackCarousel`

**File:** [`app/components/ui/card-stack-carousel.tsx`](app/components/ui/card-stack-carousel.tsx)

A swipeable, auto-cycling stack of coloured cards. Currently used in the FAQ section of the Manawatū Flow demo.

**Features**
- Three cards visible at once in a fanned stack
- Auto-advances on a configurable interval (hover pauses it)
- Live drag feedback — the front card follows the pointer in real time
- Swipe left/right past 60 px to advance or go back (mouse _and_ touch, using Pointer Events `setPointerCapture`)
- Optional "reveal" side toggled by a button on the front card
- Large display label + dot-navigation row below the stack

**Quick start**

```tsx
import { CardStackCarousel } from '@/components/ui/card-stack-carousel';

const items = faqs.map((faq, i) => ({
  id: i,
  color: COLORS[i % COLORS.length],   // any CSS colour string
  front: faq.question,
  reveal: faq.answer,                  // optional — adds "View answer" button
}));

<CardStackCarousel
  items={items}
  label="FAQs"              // large display label below the stack (optional)
  labelClassName="text-white"
  autoInterval={4000}       // ms between auto-advances; 0 to disable
/>
```

**All props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `CardStackItem[]` | — | Cards to display (see type below) |
| `autoInterval` | `number` | `4000` | Ms between auto-advances; `0` disables |
| `label` | `string` | — | Large display label below the stack |
| `labelClassName` | `string` | `''` | Extra Tailwind classes on the label |
| `expandLabel` | `string` | `'View answer'` | Reveal-button label (front state) |
| `collapseLabel` | `string` | `'Hide answer'` | Reveal-button label (revealed state) |
| `expandIcon` | `ReactNode` | `<Eye />` | Icon inside the reveal button |
| `showDots` | `boolean` | `true` | Show dot-navigation |
| `hint` | `string` | `'Hover to pause · swipe to advance'` | Small hint text beside dots |
| `className` | `string` | `''` | Extra classes on the root wrapper |
| `cardWidth` | `string` | `'min(480px, calc(100vw - 40px))'` | CSS width of the stack |
| `cardHeight` | `string` | `'clamp(270px, 48vw, 340px)'` | CSS height of the stack |

`CardStackItem` shape:

```ts
{
  id: string | number;
  color: string;          // card background colour
  front: ReactNode;       // content on the active front card
  reveal?: ReactNode;     // optional reveal-side content
  preview?: ReactNode;    // condensed content on behind-stack cards (defaults to front)
}
```

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
