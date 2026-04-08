import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Vivid Glow | Professional Electrician Services",
  description: "Reliable, high-quality electrical work for homes and businesses. Licensed and insured.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} style={{ '--font-heading': 'var(--font-outfit)', '--font-body': 'var(--font-inter)' } as any}>
        {children}
      </body>
    </html>
  );
}
