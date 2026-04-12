// lib/woo-client.ts
// Fetches products from WooCommerce via WPGraphQL.
// Falls back to rich mock data when the API URL is not configured.

export interface WooProduct {
  id: string;
  slug: string;
  name: string;
  price: string;
  regularPrice: string;
  salePrice: string | null;
  onSale: boolean;
  shortDescription: string;
  description: string;
  averageRating: string;
  reviewCount: number;
  categories: { name: string; slug: string }[];
  image: { sourceUrl: string; altText: string } | null;
  galleryImages: { sourceUrl: string; altText: string }[];
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
}

/* ─────────────────────────────────────────────
   Mock data — used until WordPress API URL is set
   ───────────────────────────────────────────── */
const MOCK_PRODUCTS: WooProduct[] = [
  {
    id: "1",
    slug: "starter-website-package",
    name: "Starter Website Package",
    price: "$1,499",
    regularPrice: "$1,999",
    salePrice: "$1,499",
    onSale: true,
    shortDescription: "A blazing-fast, conversion-optimised 5-page website built on Next.js. Perfect for service businesses launching online.",
    description: "<p>The Starter Package includes everything you need to launch a professional online presence. Fully responsive across all devices, optimised for search engines, and built with performance scores above 95.</p><ul><li>5 custom-designed pages</li><li>Contact form with email notifications</li><li>Google Analytics integration</li><li>1 month of post-launch support</li><li>SEO foundations setup</li></ul>",
    averageRating: "5.0",
    reviewCount: 12,
    categories: [{ name: "Website Packages", slug: "website-packages" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      altText: "Starter Website Package",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
  {
    id: "2",
    slug: "ecommerce-store-build",
    name: "E-Commerce Store Build",
    price: "$3,499",
    regularPrice: "$3,499",
    salePrice: null,
    onSale: false,
    shortDescription: "A fully headless WooCommerce storefront with Stripe payments, product management, and a stunning shopping experience.",
    description: "<p>Launch your online store with a design that converts. Our E-Commerce package is built headless for maximum speed, with a WooCommerce backend so you control everything.</p><ul><li>Custom storefront design</li><li>WooCommerce backend setup</li><li>Stripe payment integration</li><li>Product & inventory management</li><li>Cart, checkout & confirmation flows</li><li>3 months post-launch support</li></ul>",
    averageRating: "5.0",
    reviewCount: 8,
    categories: [{ name: "E-Commerce", slug: "ecommerce" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      altText: "E-Commerce Store Build",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
  {
    id: "3",
    slug: "client-portal-platform",
    name: "Client Portal Platform",
    price: "$5,999",
    regularPrice: "$5,999",
    salePrice: null,
    onSale: false,
    shortDescription: "A bespoke internal dashboard or client-facing portal. Custom user roles, API integrations, and real-time data — all beautifully designed.",
    description: "<p>Streamline your operations with a custom-built platform tailored exactly to your workflow. No off-the-shelf tools, no compromises.</p><ul><li>Custom dashboard UI</li><li>User authentication & roles</li><li>Third-party API integrations</li><li>Data visualisation & reporting</li><li>Mobile-responsive interface</li><li>6 months post-launch support</li></ul>",
    averageRating: "5.0",
    reviewCount: 5,
    categories: [{ name: "Client Platforms", slug: "client-platforms" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      altText: "Client Portal Platform",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
  {
    id: "4",
    slug: "seo-performance-audit",
    name: "SEO & Performance Audit",
    price: "$299",
    regularPrice: "$399",
    salePrice: "$299",
    onSale: true,
    shortDescription: "A comprehensive technical audit of your existing website covering SEO health, Core Web Vitals, accessibility, and conversion opportunities.",
    description: "<p>Get a crystal-clear picture of what's holding your website back. We analyse every layer of your site and deliver a prioritised action plan.</p><ul><li>Full technical SEO audit</li><li>Core Web Vitals deep-dive</li><li>Accessibility report</li><li>Conversion rate analysis</li><li>Prioritised action list</li><li>1-hour strategy call</li></ul>",
    averageRating: "4.9",
    reviewCount: 22,
    categories: [{ name: "Audits & Consulting", slug: "audits-consulting" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
      altText: "SEO and Performance Audit",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
  {
    id: "5",
    slug: "monthly-retainer-care",
    name: "Monthly Care Retainer",
    price: "$199",
    regularPrice: "$199",
    salePrice: null,
    onSale: false,
    shortDescription: "Ongoing technical support, updates, security monitoring, and up to 3 hours of design/development changes per month.",
    description: "<p>Keep your website healthy, secure, and evolving. Our Monthly Care Retainer means you always have an expert in your corner.</p><ul><li>Plugin & CMS updates</li><li>Security monitoring & backups</li><li>Up to 3h design/dev changes</li><li>Monthly performance report</li><li>Priority support response</li></ul>",
    averageRating: "5.0",
    reviewCount: 31,
    categories: [{ name: "Retainers", slug: "retainers" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      altText: "Monthly Care Retainer",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
  {
    id: "6",
    slug: "brand-identity-kit",
    name: "Brand Identity Kit",
    price: "$799",
    regularPrice: "$999",
    salePrice: "$799",
    onSale: true,
    shortDescription: "A complete brand identity system: logo, colour palette, typography, and brand guidelines delivered in 2 weeks.",
    description: "<p>Your brand is the first thing customers judge you by. Make it count with a professional brand identity system designed for consistency and impact.</p><ul><li>Logo suite (primary, secondary, icon)</li><li>Colour palette & typography system</li><li>Brand guidelines document</li><li>Business card & letterhead templates</li><li>Social media asset templates</li></ul>",
    averageRating: "4.8",
    reviewCount: 17,
    categories: [{ name: "Design", slug: "design" }],
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80",
      altText: "Brand Identity Kit",
    },
    galleryImages: [],
    stockStatus: "IN_STOCK",
  },
];

/* ─────────────────────────────────────────────
   GraphQL queries
   ───────────────────────────────────────────── */
const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 100) {
      nodes {
        id
        slug
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
          shortDescription
          description
          averageRating
          reviewCount
          stockStatus
          image { sourceUrl altText }
          galleryImages { nodes { sourceUrl altText } }
        }
        productCategories { nodes { name slug } }
      }
    }
  }
`;

const PRODUCT_BY_SLUG_QUERY = `
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      slug
      name
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
        shortDescription
        description
        averageRating
        reviewCount
        stockStatus
        image { sourceUrl altText }
        galleryImages { nodes { sourceUrl altText } }
      }
      productCategories { nodes { name slug } }
    }
  }
`;

async function wpgraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (!apiUrl) return null;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });
    const json = await res.json();
    if (json.errors) {
      console.error("WPGraphQL errors:", json.errors);
      return null;
    }
    return json.data as T;
  } catch (err) {
    console.error("WPGraphQL fetch failed:", err);
    return null;
  }
}

/* ─────────────────────────────────────────────
   Public API
   ───────────────────────────────────────────── */
export async function getAllProducts(): Promise<WooProduct[]> {
  const data = await wpgraphql<{ products: { nodes: unknown[] } }>(PRODUCTS_QUERY);
  if (!data) return MOCK_PRODUCTS;
  // TODO: map WPGraphQL response to WooProduct shape
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const data = await wpgraphql<{ product: unknown }>(PRODUCT_BY_SLUG_QUERY, { slug });
  if (!data) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  // TODO: map WPGraphQL response to WooProduct shape
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function buildCheckoutUrl(product: WooProduct, quantity = 1): string {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace("/graphql", "") ?? "#";
  return `${baseUrl}/checkout/?add-to-cart=${product.id}&quantity=${quantity}`;
}
