"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-foreground hover:text-primary transition-colors"
        >
          orellie
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link
            href="/shop"
            className="px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Shop Now
          </Link>

          {/* Cart icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="mt-2 mx-4 px-5 py-3 rounded-full bg-primary text-white text-sm font-semibold text-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Shop Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
