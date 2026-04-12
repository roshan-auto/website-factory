import { HeroSection } from "@/components/hero";
import { ScrollSection } from "@/components/scroll-section";
import { SignatureGrid } from "@/components/signature-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ScrollSection />
      <SignatureGrid />
    </main>
  );
}
