import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="font-serif text-2xl tracking-tight">
              orellie
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Handcrafted luxury earrings designed in Aotearoa New Zealand. 
              Premium polymer clay. Hypoallergenic. Impossibly lightweight.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif text-lg mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Earrings</Link></li>
              <li><Link href="/shop?sort=popularity" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop?sort=date" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/product/gift-card" className="text-muted-foreground hover:text-primary transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-lg mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shipping-delivery" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns-exchanges" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/jewellery-care" className="text-muted-foreground hover:text-primary transition-colors">Jewellery Care</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary transition-colors">Orders & Tracking</Link></li>
            </ul>
          </div>

          {/* The Studio */}
          <div>
            <h4 className="font-serif text-lg mb-6">The Studio</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">Meet the Maker</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Orellie. Handcrafted in Aotearoa 🇳🇿</p>
          <div className="flex items-center gap-6">
            <Link href="https://www.instagram.com/orellienzart/" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="https://www.facebook.com/orellienzart" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Facebook</Link>
            <Link href="https://www.tiktok.com/@orellienz" target="_blank" rel="noopener" className="hover:text-primary transition-colors">TikTok</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
