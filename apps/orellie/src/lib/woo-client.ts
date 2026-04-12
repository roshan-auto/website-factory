// src/lib/woo-client.ts
// Fetches products from WooCommerce REST API.
// Falls back to rich mock data when API credentials are not configured.

export interface WooProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  short_description: string;
  description: string;
  average_rating: string;
  rating_count: number;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  manage_stock: boolean;
  stock_quantity: number | null;
}

/* ─────────────────────────────────────────────
   Mock data — earrings products for Orellie
   ───────────────────────────────────────────── */
export const MOCK_PRODUCTS: WooProduct[] = [
  {
    id: 1,
    slug: "rose-drop-serenity",
    name: "Rose Drop Serenity",
    price: "65.00",
    regular_price: "65.00",
    sale_price: "",
    on_sale: false,
    short_description: "Softly curved rose-hued drops that catch the light with effortless grace.",
    description: "<p>The Rose Drop Serenity earrings are a study in understated femininity. Handcrafted from premium polymer clay in our Auckland studio, each pair is shaped by hand to ensure no two are exactly alike. Lightweight yet statement-making, they pair beautifully with both casual daywear and elegant evening looks.</p><ul><li>Handcrafted premium polymer clay</li><li>Titanium hypoallergenic posts</li><li>Approx. 4.5cm drop length</li><li>Lightweight — under 3g per earring</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "5.0",
    rating_count: 14,
    categories: [{ id: 1, name: "Drops", slug: "drops" }],
    images: [
      { id: 1, src: "/product1.png", alt: "Rose Drop Serenity earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 2,
    slug: "aura-blush-orbits",
    name: "Aura Blush Orbits",
    price: "72.00",
    regular_price: "85.00",
    sale_price: "72.00",
    on_sale: true,
    short_description: "Circular orbit forms in soft blush — a signature of the Aura Collection.",
    description: "<p>Inspired by the quiet beauty of celestial movement, the Aura Blush Orbits are our most sought-after piece. Their flowing circular form commands attention while remaining impossibly light on the ear.</p><ul><li>Handcrafted premium polymer clay</li><li>Surgical steel hypoallergenic hooks</li><li>Approx. 5cm drop including hook</li><li>Signature blush and ivory glaze</li><li>Gift-wrapped in our signature box</li></ul>",
    average_rating: "4.9",
    rating_count: 27,
    categories: [{ id: 2, name: "Hoops & Orbits", slug: "hoops-orbits" }],
    images: [
      { id: 2, src: "/product2.png", alt: "Aura Blush Orbits earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 3,
    slug: "signature-clay-dangle",
    name: "Signature Clay Dangle",
    price: "45.00",
    regular_price: "45.00",
    sale_price: "",
    on_sale: false,
    short_description: "The earring that started it all. A timeless Orellie classic.",
    description: "<p>The piece that put Orellie on the map. Simple, elegant, and endlessly wearable. The Signature Clay Dangle is the entry point to the Orellie world — and once you try them, you'll understand why they never go out of style.</p><ul><li>Original Orellie shape</li><li>Titanium hypoallergenic posts</li><li>Approx. 3cm drop length</li><li>Available in 6 colourways</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "5.0",
    rating_count: 42,
    categories: [{ id: 1, name: "Drops", slug: "drops" }],
    images: [
      { id: 3, src: "/hero-model.png", alt: "Signature Clay Dangle earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 4,
    slug: "gilded-petal-hoops",
    name: "Gilded Petal Hoops",
    price: "70.00",
    regular_price: "70.00",
    sale_price: "",
    on_sale: false,
    short_description: "Oversize petal forms with a touch of gold — bold, beautiful, unforgettable.",
    description: "<p>The Gilded Petal Hoops are designed for those who believe more is more. A dramatic, architectural hoop with delicate petal reliefs across the surface, finished with a brushed gold dust glaze that catches every source of light.</p><ul><li>Handcrafted polymer clay with gold dust glaze</li><li>Surgical steel hypoallergenic hoops</li><li>Approx. 6cm diameter</li><li>Lightweight — under 5g per earring</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "4.8",
    rating_count: 9,
    categories: [{ id: 2, name: "Hoops & Orbits", slug: "hoops-orbits" }],
    images: [
      { id: 4, src: "/product2.png", alt: "Gilded Petal Hoops earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 5,
    slug: "ethereal-arc",
    name: "Ethereal Arc",
    price: "95.00",
    regular_price: "95.00",
    sale_price: "",
    on_sale: false,
    short_description: "A sweeping architectural arc — our most sculptural and coveted design.",
    description: "<p>The Ethereal Arc is the pinnacle of Orellie's design language. An asymmetric, flowing arc that sweeps from the lobe to cascade gracefully, capturing attention from every angle. Limited run — once they're gone, they're gone.</p><ul><li>Handcrafted premium polymer clay</li><li>Titanium hypoallergenic posts</li><li>Approx. 7cm length at widest point</li><li>Ultra-lightweight — under 4g per earring</li><li>Individually numbered, limited edition</li><li>Luxury gift packaging</li></ul>",
    average_rating: "5.0",
    rating_count: 6,
    categories: [{ id: 3, name: "Limited Edition", slug: "limited-edition" }],
    images: [
      { id: 5, src: "/scroll-model.png", alt: "Ethereal Arc earrings" },
    ],
    stock_status: "instock",
    manage_stock: true,
    stock_quantity: 8,
  },
  {
    id: 6,
    slug: "soft-silk-tear",
    name: "Soft Silk Tear",
    price: "40.00",
    regular_price: "55.00",
    sale_price: "40.00",
    on_sale: true,
    short_description: "Teardrop perfection in the softest ivory and blush — a gentle everyday essential.",
    description: "<p>Sometimes the most beautiful things are the most simple. The Soft Silk Tear is an everyday essential — a gentle teardrop that works with everything from your favourite denim to a flowing dress at dusk.</p><ul><li>Handcrafted premium polymer clay</li><li>Surgical steel hypoallergenic hooks</li><li>Approx. 3.5cm drop length</li><li>Six colourways available</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "4.9",
    rating_count: 18,
    categories: [{ id: 1, name: "Drops", slug: "drops" }],
    images: [
      { id: 6, src: "/product1.png", alt: "Soft Silk Tear earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 7,
    slug: "morning-dew-drops",
    name: "Morning Dew Drops",
    price: "60.00",
    regular_price: "60.00",
    sale_price: "",
    on_sale: false,
    short_description: "Tiny, jewel-like spheres that catch light like morning dew on petals.",
    description: "<p>Inspired by the quiet magic of an early New Zealand morning, these petite spherical drops are detailed with a subtle texture that refracts light into a subtle shimmer. Perfect for those who love elegance in small packages.</p><ul><li>Handcrafted premium polymer clay</li><li>Titanium hypoallergenic posts</li><li>Approx. 2cm diameter sphere</li><li>Pearlescent surface treatment</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "4.7",
    rating_count: 11,
    categories: [{ id: 1, name: "Drops", slug: "drops" }],
    images: [
      { id: 7, src: "/product2.png", alt: "Morning Dew Drops earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 8,
    slug: "velvet-sculpt",
    name: "Velvet Sculpt",
    price: "50.00",
    regular_price: "50.00",
    sale_price: "",
    on_sale: false,
    short_description: "Matte-finished sculptural forms with a velvety, luxurious surface texture.",
    description: "<p>The Velvet Sculpt explores surface and texture, with a hand-applied matte finish that creates a deeply luxurious, almost tactile quality. Organic, free-form shapes that make a quiet but confident statement.</p><ul><li>Handcrafted premium polymer clay</li><li>Surgical steel hypoallergenic hooks</li><li>Approx. 4cm drop length</li><li>Matte velvet surface finish</li><li>Comes in a signature Orellie gift box</li></ul>",
    average_rating: "4.8",
    rating_count: 8,
    categories: [{ id: 1, name: "Drops", slug: "drops" }],
    images: [
      { id: 8, src: "/product1.png", alt: "Velvet Sculpt earrings" },
    ],
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: null,
  },
  {
    id: 9,
    slug: "the-statement-aura",
    name: "The Statement Aura",
    price: "110.00",
    regular_price: "110.00",
    sale_price: "",
    on_sale: false,
    short_description: "Our most dramatic and celebrated piece. Wear it once and it's yours forever.",
    description: "<p>The Statement Aura is Orellie's crown jewel — an oversized, architectural form that makes no apologies. Designed for the woman who walks into a room and instantly defines it. Hand-built over several hours, each pair is truly one of a kind.</p><ul><li>Handcrafted premium polymer clay — multi-day build process</li><li>Titanium hypoallergenic posts</li><li>Each pair individually unique</li><li>Approx. 8–9cm length</li><li>Ultra-lightweight — under 6g per earring</li><li>Museum-quality luxury gift packaging</li><li>Certificate of authenticity included</li></ul>",
    average_rating: "5.0",
    rating_count: 4,
    categories: [{ id: 3, name: "Limited Edition", slug: "limited-edition" }],
    images: [
      { id: 9, src: "/hero-model.png", alt: "The Statement Aura earrings" },
    ],
    stock_status: "instock",
    manage_stock: true,
    stock_quantity: 3,
  },
];

/* ─────────────────────────────────────────────
   WooCommerce REST API client
   ───────────────────────────────────────────── */
const WC_BASE = process.env.NEXT_PUBLIC_WC_API_URL; // e.g. https://store.orellie.nz/wp-json/wc/v3
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

async function wcFetch<T>(endpoint: string): Promise<T | null> {
  if (!WC_BASE || !WC_KEY || !WC_SECRET) return null;
  try {
    const url = `${WC_BASE}${endpoint}`;
    const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────
   Public API
   ───────────────────────────────────────────── */
export async function getAllProducts(): Promise<WooProduct[]> {
  const live = await wcFetch<WooProduct[]>("/products?per_page=100&status=publish");
  return live ?? MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const live = await wcFetch<WooProduct[]>(`/products?slug=${slug}`);
  if (live && live.length > 0) return live[0];
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function buildAddToCartUrl(product: WooProduct, quantity = 1): string {
  const base = process.env.NEXT_PUBLIC_WC_API_URL?.replace("/wp-json/wc/v3", "") ?? "#";
  return `${base}/checkout/?add-to-cart=${product.id}&quantity=${quantity}`;
}
