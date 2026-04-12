"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Star, Shield, Package, Sparkles,
  Minus, Plus, ExternalLink, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildAddToCartUrl, type WooProduct } from "@/lib/woo-client";

interface ProductDetailClientProps {
  product: WooProduct;
  related: WooProduct[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const savePct =
    product.on_sale && product.regular_price && product.sale_price
      ? Math.round(
          ((parseFloat(product.regular_price) - parseFloat(product.sale_price)) /
            parseFloat(product.regular_price)) *
            100
        )
      : null;

  const handleAddToCart = () => {
    window.location.href = buildAddToCartUrl(product, quantity);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left: Images ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/20 shadow-xl">
              {product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              )}
              {product.on_sale && savePct && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white border-0 font-semibold text-sm px-3 py-1 shadow">
                    Save {savePct}%
                  </Badge>
                </div>
              )}
               {/* Wishlist button */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition-transform"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${wishlisted ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              </button>
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Category */}
            {product.categories[0] && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary tracking-widest font-semibold uppercase w-fit">
                <Sparkles className="w-3 h-3" />
                {product.categories[0].name}
              </div>
            )}

            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {Number(product.rating_count) > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(product.average_rating))
                          ? "fill-primary text-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.average_rating} · {product.rating_count} reviews
                </span>
              </div>
            )}

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-foreground tracking-tight">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.on_sale && (
                <span className="text-xl text-muted-foreground line-through">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              {product.short_description}
            </p>

            {/* Stock notice */}
            {product.manage_stock && product.stock_quantity && product.stock_quantity <= 5 && (
              <p className="text-xs text-primary font-medium">
                ⚡ Only {product.stock_quantity} pairs remaining
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4">
              {/* Qty */}
              <div className="flex items-center gap-3 border border-border rounded-full px-4 py-2.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock_status === "outofstock"}
                className="flex-1 rounded-full h-12 text-base relative overflow-hidden group shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  {product.stock_status === "outofstock" ? "Sold Out" : "Add to Cart"}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-shimmer" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Shield className="w-4 h-4" />, text: "Secure Checkout" },
                { icon: <Package className="w-4 h-4" />, text: "Free NZ Shipping" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Gift Packaging" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 text-center text-xs text-muted-foreground border border-border rounded-xl p-3"
                >
                  <span className="text-primary">{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Accordion */}
            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="font-medium text-foreground hover:no-underline hover:text-primary text-sm">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className="text-sm text-muted-foreground leading-relaxed font-light [&_ul]:space-y-1.5 [&_li]:list-disc [&_li]:ml-4"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="font-medium text-foreground hover:no-underline hover:text-primary text-sm">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-light space-y-2 leading-relaxed">
                  <p>Store in the dust bag provided. Avoid direct sunlight and water. Wipe gently with a soft, dry cloth. Polymer clay is durable but artisanal — treat with the care they deserve.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="font-medium text-foreground hover:no-underline hover:text-primary text-sm">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-light space-y-2 leading-relaxed">
                  <p>Free standard shipping within New Zealand on orders over $80. International shipping available from $18. All orders are dispatched within 2–3 business days. Returns accepted within 14 days in original condition.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-28 pt-16 border-t border-border">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-foreground">
                You Might Also Love
              </h2>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                View all
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {related.map((p) => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="group">
                  <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl bg-secondary/20">
                    {p.images[0] && (
                      <Image
                        src={p.images[0].src}
                        alt={p.images[0].alt || p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-light">{p.categories[0]?.name}</p>
                    </div>
                    <span className="text-base font-semibold">${parseFloat(p.price).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
