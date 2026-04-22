import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orellie — Handcrafted Luxury Earrings",
  description: "Discover Orellie — premium handcrafted polymer clay earrings made in Aotearoa New Zealand. Hypoallergenic, impossibly lightweight, and designed to express your inner radiance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ── Sticky Nav ── */}
        <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="font-serif text-xl tracking-tight text-foreground hover:text-primary transition-colors">
              orellie
            </a>
            <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <a href="/shop" className="hover:text-foreground transition-colors">Shop</a>
              <a href="/shop" className="px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Shop Now
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
