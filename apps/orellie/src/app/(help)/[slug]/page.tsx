import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Map of slugs to their respective markdown files
const SLUG_MAP: Record<string, string> = {
  "shipping-delivery": "01-shipping-and-delivery.md",
  "returns-exchanges": "02-returns-and-exchanges.md",
  "jewellery-care": "03-jewellery-care.md",
  "orders": "04-orders.md",
  "privacy-policy": "05-privacy-policy.md",
  "terms-of-use": "06-terms-of-use.md",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} — Orellie`,
  };
}

export default async function HelpPage({ params }: PageProps) {
  const { slug } = await params;
  const fileName = SLUG_MAP[slug];

  if (!fileName) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "documents", fileName);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf8");

  // Simple Markdown to JSX converter for basic elements
  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) {
        return <h1 key={i} className="text-4xl md:text-5xl font-serif mb-8">{line.replace("# ", "")}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-serif mt-12 mb-6">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-xl font-serif mt-8 mb-4">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="ml-6 mb-2">{line.replace("- ", "")}</li>;
      }
      if (line === "---") {
        return <hr key={i} className="my-12 border-border/50" />;
      }
      if (line.trim() === "") return <br key={i} />;
      
      // Handle bold text
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <p 
          key={i} 
          className="text-muted-foreground leading-relaxed mb-4" 
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="pt-32 pb-24">
      <header className="bg-muted/30 py-20 mb-16 border-y border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">{title}</h1>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto prose prose-neutral">
          {renderMarkdown(content)}
        </article>
      </div>
    </div>
  );
}
