import { HeroSection } from "@/components/hero";
import { ScrollSection } from "@/components/scroll-section";
import { SignatureGrid } from "@/components/signature-grid";
import { AboutSection } from "@/components/about-section";
import { SocialConnect } from "@/components/social-connect";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ScrollSection />
      <SignatureGrid />
      <AboutSection />
      <SocialConnect />
    </main>
  );
}
