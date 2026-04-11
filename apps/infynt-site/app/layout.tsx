import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
