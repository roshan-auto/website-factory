"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Check,
  Minus,
  Plus,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type WooProduct } from "@/lib/woo-client";

interface ProductDetailClientProps {
  product: WooProduct;
  checkoutUrl: string;
}

export function ProductDetailClient({ product, checkoutUrl }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);

  const handleCheckout = () => {
    const url = new URL(checkoutUrl === "#" ? "/#contact" : checkoutUrl, typeof window !== "undefined" ? window.location.origin : "https://infynt.com");
    if (quantity > 1) url.searchParams.set("quantity", String(quantity));
    window.location.href = url.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Breadcrumb */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* ── Left: Image(s) ── */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-raised border border-border-subtle">
            <Image
              src={product.image?.sourceUrl ?? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"}
              alt={product.image?.altText ?? product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.onSale && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-white border-0 font-semibold px-3 py-1.5 text-sm">
                  On Sale
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Details ── */}
        <div className="flex flex-col gap-6">
          {/* Category */}
          {product.categories[0] && (
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">
              {product.categories[0].name}
            </span>
          )}

          {/* Name */}
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-text-primary leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          {Number(product.reviewCount) > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(product.averageRating))
                        ? "fill-amber-400 text-amber-400"
                        : "text-border-subtle"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-muted">
                {product.averageRating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-heading font-bold text-text-primary">
              {product.price}
            </span>
            {product.onSale && product.regularPrice && (
              <span className="text-xl text-text-muted line-through">{product.regularPrice}</span>
            )}
            {product.onSale && (
              <Badge className="bg-accent/10 text-accent border-accent/20 font-semibold">
                Save{" "}
                {Math.round(
                  ((parseFloat(product.regularPrice.replace(/[^0-9.]/g, "")) -
                    parseFloat(product.price.replace(/[^0-9.]/g, ""))) /
                    parseFloat(product.regularPrice.replace(/[^0-9.]/g, ""))) *
                    100
                )}
                %
              </Badge>
            )}
          </div>

          {/* Short description */}
          <p className="text-text-secondary leading-relaxed text-base">
            {product.shortDescription}
          </p>

          {/* Divider */}
          <div className="border-t border-border-subtle" />

          {/* Quantity + CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quantity picker */}
            <div className="flex items-center gap-3 border border-border-subtle rounded-xl px-4 py-3 w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-text-primary select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to cart / checkout */}
            <button
              onClick={handleCheckout}
              disabled={product.stockStatus === "OUT_OF_STOCK"}
              className="btn-primary text-base flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stockStatus === "OUT_OF_STOCK"
                ? "Out of Stock"
                : "Enquire / Order Now"}
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Secure Stripe Checkout" },
              { icon: <Zap className="w-4 h-4" />, text: "Fast Turnaround" },
              { icon: <Check className="w-4 h-4" />, text: "No Lock-In Contracts" },
              { icon: <Star className="w-4 h-4" />, text: "5-Star Rated Service" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                <span className="text-accent">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border-subtle" />

          {/* Accordion details */}
          <Accordion type="single" collapsible defaultValue="description">
            <AccordionItem value="description" className="border-border-subtle">
              <AccordionTrigger className="font-heading font-semibold text-text-primary hover:no-underline hover:text-accent">
                What&apos;s Included
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="prose prose-sm prose-invert max-w-none text-text-secondary [&_ul]:space-y-1.5 [&_li]:flex [&_li]:items-start [&_li]:gap-2"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="process" className="border-border-subtle">
              <AccordionTrigger className="font-heading font-semibold text-text-primary hover:no-underline hover:text-accent">
                Our Process
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary space-y-3 text-sm leading-relaxed">
                <p>After purchase (or enquiry), we&apos;ll schedule a discovery call within 24 hours to align on requirements, timeline, and access. You&apos;ll be kept in the loop at every stage with clear milestones and review rounds.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment" className="border-border-subtle">
              <AccordionTrigger className="font-heading font-semibold text-text-primary hover:no-underline hover:text-accent">
                Payment & Refunds
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary space-y-3 text-sm leading-relaxed">
                <p>Payments are processed securely via Stripe. For project-based services, we typically invoice 50% upfront and 50% on delivery. For audits and retainers, payment is taken in full at the start of each period.</p>
                <p>If we&apos;re unable to deliver the agreed scope, a full refund is issued. Satisfaction guaranteed.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
