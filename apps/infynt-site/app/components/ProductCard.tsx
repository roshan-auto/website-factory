"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type WooProduct } from "@/lib/woo-client";

interface ProductCardProps {
  product: WooProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-surface-raised/50 border border-border-subtle hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(var(--color-accent-rgb),0.3)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-base">
        <Image
          src={product.image?.sourceUrl ?? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"}
          alt={product.image?.altText ?? product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Sale badge */}
        {product.onSale && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-accent text-white border-0 font-semibold text-xs px-2.5 py-1 shadow-lg">
              Sale
            </Badge>
          </div>
        )}
        {/* Stock badge */}
        {product.stockStatus === "OUT_OF_STOCK" && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs">
              Sold Out
            </Badge>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-accent text-white rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ShoppingCart className="w-4 h-4" />
            View Details
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        {product.categories[0] && (
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            {product.categories[0].name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-heading font-bold text-base md:text-lg text-text-primary leading-snug group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2 border-t border-border-subtle mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-heading font-bold text-text-primary">
              {product.price}
            </span>
            {product.onSale && product.regularPrice && (
              <span className="text-sm text-text-muted line-through">
                {product.regularPrice}
              </span>
            )}
          </div>
          {Number(product.reviewCount) > 0 && (
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.averageRating}</span>
              <span>({product.reviewCount})</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
