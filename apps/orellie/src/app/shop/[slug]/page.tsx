import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/woo-client";
import { ProductDetailClient } from "@/components/product-detail-client";

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
  if (!product) return { title: "Not Found — Orellie" };
  return {
    title: `${product.name} — Orellie`,
    description: product.short_description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ]);
  if (!product) notFound();

  const related = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categories.some((c) => product.categories.some((pc) => pc.slug === c.slug))
    )
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
