import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Lightbulb, 
  Wrench, 
  Home as HomeIcon, 
  Building2,
  CheckCircle2
} from "lucide-react";
import { 
  HeroSection, 
  ServicesGridSection, 
  ContactSection 
} from "@packages/sections";

export default function Home() {
  const services = [
    {
      id: "residential",
      icon: <HomeIcon className="w-8 h-8" />,
      title: "Residential",
      description: "Wiring, lighting installation, panel upgrades, and smart home integration.",
    },
    {
      id: "commercial",
      icon: <Building2 className="w-8 h-8" />,
      title: "Commercial",
      description: "Complex wiring, maintenance contracts, and specialized equipment power.",
    },
    {
      id: "emergency",
      icon: <Clock className="w-8 h-8" />,
      title: "Emergency",
      description: "24/7 rapid response for power outages, faulty circuits, and safety hazards.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#023E8A] p-2 rounded-lg">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#03045E]">Vivid Glow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#services" className="hover:text-[#0077B6] transition-colors">Services</a>
          <a href="#about" className="hover:text-[#0077B6] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#0077B6] transition-colors">Contact</a>
          <a href="tel:5550123" className="flex items-center gap-2 bg-[#023E8A] text-white px-5 py-2.5 rounded-full hover:bg-[#0077B6] transition-all">
            <PhoneCall className="w-4 h-4" />
            (555) 012-3456
          </a>
        </div>
      </nav>

      {/* Shared Hero Section */}
      <HeroSection 
        headline={<>Smart Power Solutions For <span className="text-[#0077B6]">Modern Living</span>.</>}
        subheadline="From emergency repairs to complex industrial installations, we provide clean, safe, and efficient electrical services you can trust."
        eyebrow={<><ShieldCheck className="w-4 h-4" /> Licensed & Insured Professional</>}
        primaryCta={{ text: "Request a Free Quote", href: "#contact" }}
        secondaryCta={{ text: "See Our Services", href: "#services" }}
        className="bg-gradient-to-b from-white to-[#F0F8FF]"
      />

      {/* Shared Services Section */}
      <div id="services">
        <ServicesGridSection 
          title="Comprehensive Services"
          intro="We handle everything from residential fuse box upgrades to full-scale commercial wiring projects."
          services={services}
          className="bg-white"
        />
      </div>

      {/* Why Choose Us (Custom Layout - remained local) */}
      <section className="px-6 py-24 md:px-12 bg-[#03045E] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Safety First. <br />Quality Always.</h2>
            <div className="space-y-6">
              <FeatureItem text="Certified Master Electrician" />
              <FeatureItem text="Transparent, No-Hidden-Fee Pricing" />
              <FeatureItem text="100% Satisfaction Guarantee" />
              <FeatureItem text="Prompt and Professional Crew" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-2">15+</span>
              <span className="text-white/60 text-sm">Years Experience</span>
            </div>
            <div className="bg-[#0077B6] p-8 rounded-3xl flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-2">2k+</span>
              <span className="text-white/90 text-sm">Happy Clients</span>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center col-span-2">
              <span className="text-4xl font-bold mb-2">No. 1</span>
              <span className="text-white/60 text-sm">Rated Local Electrician</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Contact Section with Local Form */}
      <div id="contact">
        <ContactSection 
          title="Ready to wire up?"
          intro="Send us a message and we'll get back to you within 24 hours."
          phone="(555) 012-3456"
          className="bg-[#F0F8FF]"
        >
          <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-[#023E8A]/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#03045E]/70 px-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#F0F8FF] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#0077B6] transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#03045E]/70 px-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#F0F8FF] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#0077B6] transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#03045E]/70 px-1">Service Needed</label>
                <select className="w-full bg-[#F0F8FF] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#0077B6] transition-all outline-none appearance-none">
                  <option>Residential Repair</option>
                  <option>Commercial Installation</option>
                  <option>Emergency Service</option>
                  <option>Quote Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#03045E]/70 px-1">Message</label>
                <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-[#F0F8FF] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#0077B6] transition-all outline-none"></textarea>
              </div>
              <button className="w-full bg-[#023E8A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#0077B6] shadow-lg shadow-[#023E8A]/20 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </ContactSection>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12 bg-white border-t border-[#F0F8FF]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-[#023E8A] w-6 h-6" />
            <span className="text-xl font-bold text-[#03045E]">Vivid Glow</span>
          </div>
          <div className="text-[#03045E]/40 text-sm">
            © 2026 Vivid Glow Electrical. All rights reserved.
          </div>
          <div className="flex gap-6 text-[#03045E]/60 text-sm font-bold">
            <a href="#" className="hover:text-[#023E8A]">Privacy</a>
            <a href="#" className="hover:text-[#023E8A]">Terms</a>
            <a href="#" className="hover:text-[#023E8A]">Facebook</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-[#0077B6] p-1 rounded-full">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
      <span className="text-lg font-medium text-white/90">{text}</span>
    </div>
  );
}
