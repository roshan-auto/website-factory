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

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 overflow-hidden bg-gradient-to-b from-white to-[#F0F8FF]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#90E0EF]/30 text-[#023E8A] px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            Licensed & Insured Professional
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-[#03045E] leading-tight tracking-tighter">
            Smart Power Solutions For <span className="text-[#0077B6]">Modern Living</span>.
          </h1>
          <p className="text-xl md:text-2xl text-[#03045E]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            From emergency repairs to complex industrial installations, we provide clean, safe, and efficient electrical services you can trust.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto bg-[#023E8A] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#0077B6] hover:shadow-xl hover:-translate-y-1 transition-all">
              Request a Free Quote
            </a>
            <a href="#services" className="w-full sm:w-auto bg-white border-2 border-[#023E8A]/10 text-[#023E8A] px-10 py-5 rounded-2xl font-bold text-lg hover:border-[#023E8A]/30 transition-all">
              See Our Services
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#90E0EF]/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0077B6]/10 blur-3xl rounded-full translate-x-1/4 translate-y-1/4"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-24 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#0077B6] font-bold uppercase tracking-widest text-sm mb-4">What We Do</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#03045E]">Comprehensive Services</h2>
            </div>
            <p className="max-w-md text-[#03045E]/60 text-lg">
              We handle everything from residential fuse box upgrades to full-scale commercial wiring projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<HomeIcon className="w-8 h-8" />}
              title="Residential"
              description="Wiring, lighting installation, panel upgrades, and smart home integration."
            />
            <ServiceCard 
              icon={<Building2 className="w-8 h-8" />}
              title="Commercial"
              description="Complex wiring, maintenance contracts, and specialized equipment power."
            />
            <ServiceCard 
              icon={<Clock className="w-8 h-8" />}
              title="Emergency"
              description="24/7 rapid response for power outages, faulty circuits, and safety hazards."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 md:px-12 bg-[#F0F8FF]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-[#023E8A]/10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-[#03045E]">Ready to wire up?</h2>
            <p className="text-[#03045E]/60 text-lg">Send us a message and we'll get back to you within 24 hours.</p>
          </div>
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
      </section>

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

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-10 rounded-[32px] bg-[#F0F8FF] hover:bg-[#023E8A] transition-all duration-500 cursor-default">
      <div className="mb-6 text-[#023E8A] group-hover:text-[#90E0EF] transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold mb-4 text-[#03045E] group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[#03045E]/60 group-hover:text-white/70 transition-colors leading-relaxed">
        {description}
      </p>
    </div>
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
