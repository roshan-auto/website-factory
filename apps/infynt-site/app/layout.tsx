import type { Metadata } from "next";
import { Inter, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Infynt — Web Design & Development Studio",
  description:
    "We build stunning, conversion-optimized websites and client solutions. Modern design, blazing performance, results that matter.",
  keywords: ["web design", "web development", "e-commerce", "client solutions", "website builder"],
  openGraph: {
    title: "Infynt — Web Design & Development Studio",
    description: "We build stunning, conversion-optimized websites and client solutions.",
    type: "website",
    url: "https://www.infynt.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(outfit.variable, inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="antialiased font-body bg-surface-base text-text-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
