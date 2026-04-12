import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Zap, Shield, Clock } from "lucide-react";
import { getAllProducts } from "@/lib/woo-client";
import { ProductCard } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export const revalidate = 60;

export const metadata = {
  title: "Shop — Infynt Web Design & Development Studio",
  description: "Browse our range of website packages, e-commerce builds, and digital services. Built to convert, priced to deliver value.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  const categories = ["All", ...Array.from(new Set(products.flatMap((p) => p.categories.map((c) => c.name))))];

  return (
    <main className="min-h-screen w-full bg-surface-base">
      <Navbar />

      {/* ── Shop Hero ── */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 gradient-mesh overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-raised/60 backdrop-blur-sm mb-8 text-sm">
            <ShoppingCart className="w-4 h-4 text-accent" />
            <span className="text-text-secondary">Transparent pricing — no hidden fees</span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight mb-6">
            Everything You Need
            <br />
            <span className="text-accent">to Grow Online</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            From launch-ready website packages to ongoing retainers — each service is crafted to deliver measurable results for your business.
          </p>
        </div>

        {/* Trust signals */}
        <div className="relative z-10 mt-14 max-w-3xl mx-auto grid grid-cols-3 gap-4 md:gap-8">
          {[
            { icon: <Shield className="w-5 h-5" />, text: "No Lock-In Contracts" },
            { icon: <Zap className="w-5 h-5" />, text: "Fast Delivery" },
            { icon: <Clock className="w-5 h-5" />, text: "Post-Launch Support" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Category filters — client-side interaction handled via URL or can be wired up */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  cat === "All"
                    ? "bg-accent text-white border-accent"
                    : "border-border-subtle text-text-secondary hover:border-accent/50 hover:text-text-primary bg-surface-raised/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center glass-card rounded-2xl p-12 md:p-16">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
              Need Something Custom?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Not every project fits a package. If you have a specific vision, let&apos;s talk. We quote custom projects within 48 hours.
            </p>
            <Link href="/#contact" className="btn-primary text-base">
              Get a Custom Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-10 md:px-12 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-heading font-bold text-lg">infynt</span>
          <span className="text-text-muted text-sm">© {new Date().getFullYear()} Infynt. All rights reserved.</span>
          <Link href="/#contact" className="text-sm text-text-muted hover:text-accent transition-colors">
            Back to main site
          </Link>
        </div>
      </footer>
    </main>
  );
}
