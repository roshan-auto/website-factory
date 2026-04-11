import {
  ArrowRight,
  Code2,
  Globe,
  ShoppingCart,
  Monitor,
  Star,
  ChevronRight,
  Menu,
  Sparkles,
  Quote,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Layers,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

/* =============================================
   Data
   ============================================= */

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Website Design",
    description:
      "Bespoke, conversion-focused websites that leave lasting impressions. We craft every pixel to tell your brand story.",
    features: ["Responsive Design", "SEO Optimised", "Performance Focused"],
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "E-Commerce Solutions",
    description:
      "Powerful online stores built on WooCommerce and headless architectures. Sell more with beautiful storefronts.",
    features: ["WooCommerce", "Payment Integration", "Inventory Management"],
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    title: "Client Platforms",
    description:
      "Custom dashboards, portals, and internal tools that streamline your business operations and delight your team.",
    features: ["Custom Dashboards", "API Integrations", "User Management"],
  },
];

const portfolioItems = [
  {
    title: "Vivid Glow Electrical",
    category: "Business Website",
    description: "A modern, conversion-optimized website for a local electrical services company.",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "#0077B6",
  },
  {
    title: "Urban Roast Coffee",
    category: "E-Commerce",
    description: "A sleek online store with subscription management and curated product experiences.",
    color: "from-amber-500/20 to-orange-500/20",
    accent: "#D97706",
  },
  {
    title: "Meridian Health",
    category: "Client Platform",
    description: "An internal patient management dashboard with real-time analytics and scheduling.",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "#10B981",
  },
];

const testimonials = [
  {
    text: "Infynt completely transformed our online presence. The new site loads in under a second and our enquiry rate has tripled since launch.",
    author: "James Mitchell",
    role: "Director, Vivid Glow Electrical",
    rating: 5,
  },
  {
    text: "Working with Infynt felt effortless. They understood our vision immediately and delivered a store that our customers genuinely love using.",
    author: "Sarah Chen",
    role: "Founder, Urban Roast Coffee",
    rating: 5,
  },
  {
    text: "The client portal they built has saved our admin team over 20 hours a week. It's beautifully designed and incredibly intuitive.",
    author: "Dr. Rachel Ouma",
    role: "CEO, Meridian Health",
    rating: 5,
  },
];

const stats = [
  { value: "50+", label: "Websites Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "<1s", label: "Avg. Load Time" },
  { value: "3×", label: "Avg. Conversion Lift" },
];

const processSteps = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Discovery",
    description: "We learn your goals, audience, and brand to shape a clear creative direction.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Design",
    description: "High-fidelity mockups crafted for every screen size, reviewed and refined with you.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Development",
    description: "Clean, performant code using modern frameworks. Built for speed and scalability.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Launch",
    description: "Rigorous QA, SEO setup, and deployment. We stick around for post-launch support.",
  },
];

/* =============================================
   Page
   ============================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between bg-surface-base/70 backdrop-blur-xl border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">infynt</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#services" className="hover:text-text-primary transition-colors duration-200">Services</a>
          <a href="#work" className="hover:text-text-primary transition-colors duration-200">Work</a>
          <a href="#process" className="hover:text-text-primary transition-colors duration-200">Process</a>
          <a href="#testimonials" className="hover:text-text-primary transition-colors duration-200">Testimonials</a>
          <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-sm">
            Start Your Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button className="md:hidden text-text-primary" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="gradient-mesh relative pt-36 pb-24 md:pt-48 md:pb-36 px-6 md:px-12">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Availability badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-raised/60 backdrop-blur-sm mb-8 text-sm">
            <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
            <span className="text-text-secondary">Available for new projects</span>
          </div>

          <h1 className="animate-fade-in-up delay-100 font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8">
            We Build Websites
            <br />
            That{" "}
            <span className="text-accent relative">
              Convert
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Modern web design and development for businesses that demand more.
            Stunning aesthetics, blazing performance, measurable results.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary text-base">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#work" className="btn-secondary text-base">
              View Our Work
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats row */}
          <div className="animate-fade-in-up delay-500 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-text-muted mt-1 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">What We Do</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-6">
              Services Built for Growth
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              From eye-catching landing pages to full-scale e-commerce platforms,
              we engineer digital experiences that drive real business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-8 md:p-10 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, j) => (
                    <span
                      key={j}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface-base/60 text-text-secondary border border-border-subtle"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="work" className="px-6 py-24 md:px-12 md:py-32 bg-surface-raised/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">Our Work</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-6">
              Selected Projects
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              A curated look at recent builds for clients across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-xl overflow-hidden group cursor-pointer"
              >
                {/* Preview area */}
                <div className={`h-56 md:h-64 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-3/4 h-3/4 rounded-xl bg-surface-base/40 backdrop-blur-sm border border-border-subtle flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Globe className="w-10 h-10 text-text-muted" />
                  </div>
                  {/* Floating badge */}
                  <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-surface-base/80 backdrop-blur-sm text-text-secondary border border-border-subtle">
                    {item.category}
                  </span>
                </div>
                {/* Info */}
                <div className="p-6 md:p-8">
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                    <ExternalLink className="w-3.5 h-3.5 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">How We Work</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-6">
              From Brief to Launch
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              A proven four-phase process that keeps your project on time, on budget, and on brand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector line (hidden on last item) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-border-subtle z-0" />
                )}
                <div className="glass-card rounded-xl p-8 text-center relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">Step {i + 1}</span>
                  <h3 className="font-heading font-bold text-lg mt-2 mb-3">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Infynt ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-raised/30">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">Why Infynt</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-8 leading-tight">
              Design That Performs.
              <br />
              Code That Scales.
            </h2>
            <div className="space-y-5">
              <WhyItem
                icon={<Shield className="w-5 h-5" />}
                title="No Templates, Ever"
                description="Every site is designed and coded from scratch to match your exact brand and goals."
              />
              <WhyItem
                icon={<Zap className="w-5 h-5" />}
                title="Performance Obsessed"
                description="Sub-second load times, 95+ Lighthouse scores, optimised for every device and connection."
              />
              <WhyItem
                icon={<Clock className="w-5 h-5" />}
                title="Reliable Delivery"
                description="Clear timelines, transparent communication, and no scope-creep surprises."
              />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center">
              <span className="text-4xl font-heading font-bold mb-2 text-accent">50+</span>
              <span className="text-text-muted text-sm">Sites Launched</span>
            </div>
            <div className="bg-accent p-8 rounded-xl flex flex-col items-center text-center">
              <span className="text-4xl font-heading font-bold mb-2 text-white">99%</span>
              <span className="text-white/70 text-sm">Client Retention</span>
            </div>
            <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center col-span-2">
              <span className="text-4xl font-heading font-bold mb-2">5★</span>
              <span className="text-text-muted text-sm">Average Review Score</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-6">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-xl p-8 md:p-10 flex flex-col">
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-heading font-bold text-sm">{t.author}</div>
                  <div className="text-text-muted text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 gradient-mesh relative">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl mb-6">
            Let&rsquo;s Build Something{" "}
            <span className="text-accent">Remarkable</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Ready to elevate your online presence? Tell us about your project
            and we&rsquo;ll get back to you within 24 hours.
          </p>
          <a href="#contact" className="btn-primary text-base">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-6 py-24 md:px-12 md:py-32 bg-surface-raised/30">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <span className="text-accent font-heading font-semibold text-sm uppercase tracking-[0.2em]">Get In Touch</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl mt-4 mb-6">
              Start a Conversation
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-12">
              Whether you have a detailed brief or just a spark of an idea,
              we&rsquo;d love to hear from you.
            </p>

            <div className="space-y-6">
              <ContactInfo icon={<Mail className="w-5 h-5" />} label="Email" value="hello@infynt.com" href="mailto:hello@infynt.com" />
              <ContactInfo icon={<Phone className="w-5 h-5" />} label="Phone" value="+64 21 123 4567" href="tel:+6421234567" />
              <ContactInfo icon={<MapPin className="w-5 h-5" />} label="Location" value="Auckland, New Zealand" />
            </div>
          </div>

          <div className="flex-1">
            <div className="glass-card rounded-xl p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" placeholder="John Doe" type="text" />
                  <InputField label="Email" placeholder="john@company.com" type="email" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">
                    Project Type
                  </label>
                  <select className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none">
                    <option>Website Design</option>
                    <option>E-Commerce Store</option>
                    <option>Client Platform</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="A brief description of what you need..."
                    className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base">
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-12 md:px-12 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-accent" />
            <span className="font-heading font-bold text-lg">infynt</span>
          </div>
          <div className="text-text-muted text-sm">
            © {new Date().getFullYear()} Infynt. All rights reserved.
          </div>
          <div className="flex gap-6 text-text-muted text-sm font-medium">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =============================================
   Sub-components
   ============================================= */

function WhyItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="font-heading font-bold mb-1">{title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-text-muted uppercase tracking-widest font-semibold">{label}</div>
        {href ? (
          <a href={href} className="text-text-primary hover:text-accent transition-colors font-medium">{value}</a>
        ) : (
          <span className="text-text-primary font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

function InputField({ label, placeholder, type }: { label: string; placeholder: string; type: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
      />
    </div>
  );
}
