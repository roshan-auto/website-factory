"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Minus, Plus, ShoppingBag, Trash2, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const {
    items, itemCount, subtotal,
    removeItem, updateQuantity, clearCart,
    isOpen, closeCart,
  } = useCart();

  const overlayRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.aside
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-background shadow-2xl border-l border-border"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-serif tracking-tight text-foreground">
                  Your Bag
                </h2>
                {itemCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground font-light text-sm">
                    Your bag is empty.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-6 border-primary/30 hover:bg-primary hover:text-white hover:border-primary transition-all"
                    onClick={closeCart}
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4"
                    >
                      {/* Thumb */}
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={closeCart}
                        className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-secondary/20"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm font-semibold text-foreground mt-0.5">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty */}
                          <div className="flex items-center gap-2 border border-border rounded-full px-2.5 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-medium select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold text-foreground tracking-tight">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-light">
                  Shipping & taxes calculated at checkout.
                </p>

                {/* CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full h-12 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                  onClick={closeCart}
                >
                  <Link href="/shop/cart" className="flex items-center justify-center gap-2">
                    View Cart & Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Clear */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors py-1"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
