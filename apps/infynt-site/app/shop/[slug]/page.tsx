import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getProductBySlug, buildCheckoutUrl, getAllProducts } from "@/lib/woo-client";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Infynt" };
  return {
    title: `${product.name} — Infynt`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ]);

  if (!product) notFound();

  const checkoutUrl = buildCheckoutUrl(product);

  // Related: same category, excluding current
  const related = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categories.some((c) => product.categories.some((pc) => pc.slug === c.slug))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen w-full bg-surface-base">
      <Navbar />

      <div className="pt-28">
        <ProductDetailClient product={product} checkoutUrl={checkoutUrl} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="px-6 py-20 md:px-12 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl mb-8">
              You Might Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-10 md:px-12 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-heading font-bold text-lg">infynt</span>
          <span className="text-text-muted text-sm">
            © {new Date().getFullYear()} Infynt. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
