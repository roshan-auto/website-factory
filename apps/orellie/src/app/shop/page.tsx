import { getAllProducts } from "@/lib/woo-client";
import { ShopClient } from "@/components/shop-client";

export const revalidate = 60;

export const metadata = {
  title: "Shop — Orellie",
  description: "Browse the full Orellie collection of handcrafted, hypoallergenic luxury earrings. Made from premium polymer clay in Aotearoa New Zealand.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  return <ShopClient products={products} />;
}
