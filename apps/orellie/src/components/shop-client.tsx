"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type WooProduct } from "@/lib/woo-client";

interface ShopClientProps {
  products: WooProduct[];
}

function ProductCard({ product, index }: { product: WooProduct; index: number }) {
  const mainImage = product.images[0];
  const savePct = product.on_sale && product.regular_price && product.sale_price
    ? Math.round(
        ((parseFloat(product.regular_price) - parseFloat(product.sale_price)) /
          parseFloat(product.regular_price)) *
          100
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] as const }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/5] mb-5 overflow-hidden rounded-2xl bg-secondary/20">
          {mainImage && (
            <Image
              src={mainImage.src}
              alt={mainImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
          {/* Overlay tint on hover */}
          <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.on_sale && savePct && (
              <Badge className="bg-primary text-white border-0 text-xs font-semibold shadow">
                Save {savePct}%
              </Badge>
            )}
            {product.manage_stock && product.stock_quantity && product.stock_quantity <= 5 && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur text-xs border-primary/30 text-primary">
                Only {product.stock_quantity} left
              </Badge>
            )}
          </div>

          {/* Quick View pill */}
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex justify-center">
            <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-foreground tracking-wide group-hover:text-primary transition-colors truncate">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-light">
              {product.categories[0]?.name ?? "Handcrafted"}
            </p>
            {Number(product.rating_count) > 0 && (
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span className="text-xs text-muted-foreground">
                  {product.average_rating} ({product.rating_count})
                </span>
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-semibold text-foreground">
              ${parseFloat(product.price).toFixed(2)}
            </div>
            {product.on_sale && (
              <div className="text-xs text-muted-foreground line-through">
                ${parseFloat(product.regular_price).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ShopClient({ products }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.flatMap((p) => p.categories.map((c) => c.name))))],
    [products]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.categories.some((c) => c.name === activeCategory)),
    [products, activeCategory]
  );

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background blob */}
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-secondary/40 via-background to-background pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary tracking-wide font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="uppercase text-xs tracking-widest font-semibold">The Full Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-foreground leading-[1.05] mb-6"
          >
            Wear What You{" "}
            <span className="text-primary italic font-light">Feel.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed mb-10"
          >
            Every Orellie piece is handcrafted by hand in Aotearoa New Zealand from premium polymer clay.
            Hypoallergenic. Impossibly lightweight. Built to last a lifetime.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            {["🇳🇿 Made in New Zealand", "💎 Hypoallergenic fittings", "📦 Free NZ shipping over $80", "✨ Gift packaging included"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary bg-background"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              No products in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>


    </main>
  );
}
