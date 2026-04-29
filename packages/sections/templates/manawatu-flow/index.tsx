'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Droplets, Wrench, Clock, ShieldCheck, MapPin, Phone, 
  ChevronRight, CheckCircle2, Star, Award, ThumbsUp, 
  Calendar, Users, ArrowRight, ArrowLeft, Building2, 
  Thermometer, Settings, Menu, X, Mail, Play, MessageSquare, Bot
} from 'lucide-react';
import { CardStackCarousel, TiltCard } from '@packages/ui';

// ─── Tokens ───────────────────────────────────────────────────────
const BG      = 'var(--color-background)';
const BG_ALT  = 'var(--color-background-alt)';
const NAVY    = 'var(--color-card)';
const SURFACE = 'var(--color-surface-card)';
const LINE    = 'var(--color-line)';
const PHONE = '06 000 0000';
const EMAIL = 'hello@manawatuflow.co.nz';

const grid: React.CSSProperties = {
  backgroundImage: [
    'repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0,rgba(255,255,255,.018) 1px,transparent 0,transparent 64px)',
    'repeating-linear-gradient(90deg,rgba(255,255,255,.018) 0,rgba(255,255,255,.018) 1px,transparent 0,transparent 64px)',
  ].join(','),
};

// ─── Scroll-reveal hook ────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Reveal wrapper ────────────────────────────────────────────────
function Reveal({
  children, className, style, delay = 0,
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Particle canvas ───────────────────────────────────────────────
function ParticleCanvas({ count = 90 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number };
    const pts: P[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      pts.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r:  Math.random() * 1.5 + 0.4,
        a:  Math.random(),
        da: (Math.random() - 0.5) * 0.004,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${0.07 * (1 - d / 140)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        p.a += p.da;
        if (p.a <= 0.1 || p.a >= 0.95) p.da *= -1;
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.a * 0.6})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Gradient text ─────────────────────────────────────────────────
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-shift inline">
      {children}
    </span>
  );
}

/** Editorial serif-italic accent */
function Serif({ children, color = '#22d3ee' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="font-display italic" style={{ color }}>
      {children}
    </span>
  );
}

/** Glass card */
function GlassCard({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={className} style={{
      ...style,
      background: 'rgba(255,255,255,0.055)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.09)',
    }}>
      {children}
    </div>
  );
}

// ─── Portfolio bar ─────────────────────────────────────────────────
function PortfolioBar() {
  return (
    <div className="bg-slate-950 border-b border-white/[0.06] px-5 py-2 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/25 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          Portfolio Demo
        </span>
        <span className="text-[11px] text-white/30 hidden sm:inline">
          Manawatū Flow Plumbing — concept by Infynt Studio
        </span>
      </div>
      <Link href="https://infynt.com" className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/70 transition-colors">
        <ArrowLeft className="w-3 h-3" /> Back to Infynt
      </Link>
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────
function SiteNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Services',     href: '#services' },
    { label: 'Why us',       href: '#why-us'   },
    { label: 'Reviews',      href: '#reviews'  },
    { label: 'Service area', href: '#area'     },
    { label: 'FAQ',          href: '#faq'      },
    { label: 'Contact',      href: '#contact'  },
  ];
  return (
    <header
      style={{ background: 'rgba(4,17,31,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      className="text-white sticky top-[37px] z-40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-[60px] md:h-[68px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 0 16px rgba(6,182,212,0.4)' }}>
              <Droplets className="w-4 h-4 text-white relative z-10" />
            </div>
            <div className="leading-none">
              <div className="font-sans font-bold text-[16px] tracking-tight">Manawatū Flow</div>
              <div className="text-primary/60 text-[11px] font-sans uppercase tracking-widest mt-0.5">Plumbing &amp; Drainage</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-[14px] font-medium text-white/60 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> {PHONE}
            </a>
            <a href="#quote"
              className="relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5">
              Request a quote
            </a>
          </div>

          <button onClick={() => setOpen(v => !v)}
            className="lg:hidden p-1.5 text-white/40 hover:text-white transition-colors"
            aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.05)' }}
          className="lg:hidden px-5 pb-5">
          <nav className="flex flex-col">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 text-[13px] text-white/60 hover:text-white border-b border-white/5 transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm text-white/50">
              <Phone className="w-4 h-4 text-cyan-400" /> {PHONE}
            </a>
            <a href="#quote" onClick={() => setOpen(false)}
              className="bg-amber-500 text-white font-bold text-sm px-4 py-3 rounded-full text-center">
              Request a quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ background: BG, ...grid }} className="text-white relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Deep aurora glows */}
      <div className="absolute -top-60 -right-60 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)', animation: 'pulse 8s ease-in-out infinite' }} />
      <div className="absolute bottom-0 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 68%)', animation: 'pulse 10s ease-in-out infinite 2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-24 lg:py-28 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 xl:gap-16 items-center">

          {/* ── Left column ── */}
          <div>
            <div className="flex items-center gap-3 mb-7 animate-fade-in-up">
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px]"
                style={{ border: `1px solid ${LINE}`, background: 'oklch(0.22 0.035 250 / 0.5)', color: 'var(--color-muted-foreground)', backdropFilter: 'blur(8px)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Palmerston North
              </div>
              <span className="text-[12px] text-white/30">Local team · on the road today</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] mb-6 animate-fade-in-up delay-100 tracking-tight">
              Reliable plumbing<br />help,{' '}
              <GradientText>when you<br />need it most.</GradientText>
            </h1>

            <p className="text-white/45 text-base md:text-[1.05rem] leading-relaxed mb-8 max-w-[480px] animate-fade-in-up delay-200">
              A friendly, local plumbing &amp; drainlaying team serving Palmerston North
              and the wider Manawatū. From burst pipes to bathroom upgrades — we&apos;ll
              show up, sort it, and tidy up before we go.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up delay-300">
              <a href="#quote" className="btn-primary">
                Request a quote <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${PHONE}`} className="btn-secondary">
                <Phone className="w-4 h-4 text-primary" /> Call for urgent help
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 animate-fade-in-up delay-400">
              {['Local Palmy team', 'Fast same-day response', 'Residential & rentals', 'Clear, honest quotes'].map(t => (
                <div key={t} className="flex items-center gap-2 text-[13px] text-white/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — hero image + floating cards ── */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Hero image — fills full column */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 0 60px rgba(6,182,212,0.14)' }}>
              <Image
                src={`${IMG}/hero-plumber.jpg`}
                alt="Manawatū Flow plumber on the job"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04111f]/70 via-[#04111f]/10 to-transparent" />
            </div>

            {/* Response card — overlaid top-right */}
            <GlassCard
              className="absolute top-5 right-5 z-10 rounded-2xl p-4 flex items-center gap-3.5 w-[250px] shadow-2xl animate-float"
              style={{ boxShadow: '0 0 32px rgba(6,182,212,0.12), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)' }}>
                <Clock className="w-[18px] h-[18px] text-cyan-400" />
              </div>
              <div>
                <div className="text-[13px] font-semibold">Usually replies in 30 min</div>
                <div className="text-[11px] text-white/35 mt-0.5">Mon–Sat, 7am–7pm</div>
              </div>
            </GlassCard>

            {/* Availability card — overlaid bottom-right */}
            <GlassCard
              className="absolute bottom-5 right-5 z-10 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-2xl"
              style={{ animation: 'float 6s ease-in-out infinite 1.5s', boxShadow: '0 0 32px rgba(16,185,129,0.1), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <div>
                <div className="text-[13px] font-semibold">Available today</div>
                <div className="text-[11px] text-white/35 mt-0.5">2 slots left for same-day call-outs</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${BG})` }} />

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(250px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

// ─── Urgent callout ────────────────────────────────────────────────
function UrgentSection() {
  const quickServices = [
    { icon: Droplets,    label: 'Blocked drains',  tag: 'Fast response' },
    { icon: Thermometer, label: 'Hot water issues', tag: 'Same day'    },
    { icon: Wrench,      label: 'Leaks & repairs',  tag: 'Fixed price'  },
    { icon: Building2,   label: 'New builds',       tag: 'Full service' },
  ];
  return (
    <section style={{ background: BG }} className="text-white pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="border-t border-white/[0.06] pt-14">

          <Reveal>
            <div className="flex items-center gap-2.5 mb-7">
              <span className="flex items-center gap-2 bg-amber-500/12 border border-amber-400/25 text-amber-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                Need help right now?
              </span>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <Reveal delay={100}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] max-w-2xl">
                Tell us what&apos;s{' '}
                <Serif color="#fb7185">gone wrong</Serif>
                {' '}— we&apos;ll take it from there.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <a href="#quote"
                className="shrink-0 flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-xl"
                style={{ background: 'var(--color-amber)', boxShadow: '0 4px 24px oklch(0.78 0.18 55 / 0.35)' }}>
                Tell us what&apos;s wrong <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickServices.map(({ icon: Icon, label, tag }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div
                  className="rounded-2xl p-5 cursor-default group transition-all hover:-translate-y-1 h-full"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.065)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(6,182,212,0.25)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(6,182,212,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.065)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                    style={{ background: 'rgba(6,182,212,0.1)' }}>
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-[13px] font-semibold mb-1">{label}</div>
                  <div className="text-[11px] text-white/30">{tag}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Quote pre-fill bridge (module-level, safe for 'use client') ───
let _quoteSetService: ((s: string) => void) | null = null;
let _quoteSetStep:    ((n: number) => void) | null = null;
let _quoteSetSubmitted: ((b: boolean) => void) | null = null;

function preselectService(opt: string) {
  _quoteSetSubmitted?.(false);
  _quoteSetService?.(opt);
  _quoteSetStep?.(1);
  setTimeout(() => {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

// ─── Services ──────────────────────────────────────────────────────
const SERVICES = [
  { icon: Droplets,    title: 'Blocked Drains',          quoteOpt: 'Blocked drain',       desc: 'Fast diagnosis and clearing using modern equipment. Sorted quickly with minimal disruption to your home.' },
  { icon: Thermometer, title: 'Hot Water Systems',        quoteOpt: 'Hot water issue',     desc: 'Installation, repair, and replacement of cylinders and heat pump systems. No hot water? We\'ll sort it fast.' },
  { icon: Wrench,      title: 'Bathroom & Kitchen',       quoteOpt: 'Bathroom / kitchen',  desc: 'Taps, toilets, showers, sinks — all bathroom and kitchen plumbing from minor repairs to full fit-outs.' },
  { icon: Settings,    title: 'Pipe Repair & Relining',   quoteOpt: 'General repair',      desc: 'No-dig pipe relining for damaged or corroded pipes. Less mess, faster results, long-lasting fix.' },
  { icon: Building2,   title: 'New Builds & Renovations', quoteOpt: 'New build plumbing',  desc: 'From reading plans to final sign-off, we work alongside your builder to get plumbing done right.' },
  { icon: ShieldCheck, title: 'Preventative Maintenance', quoteOpt: 'General repair',      desc: 'Regular check-ups to catch issues early before they become expensive problems. Peace of mind included.' },
];

function ServicesSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleCardClick = (idx: number, quoteOpt: string) => {
    setSelectedIdx(idx);
    preselectService(quoteOpt);
  };

  return (
    <section id="services" className="py-20 md:py-28 text-white" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue)', border: '1px solid var(--color-line-2)' }}>
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Everything Plumbing, All Under One Roof
          </h2>
          <p className="max-w-xl mx-auto text-[15px]" style={{ color: 'var(--color-muted-foreground)' }}>
            From dripping taps to full new-build plumbing, our licensed team handles residential
            and light commercial work across the Manawatū region.
            <span className="block mt-1 font-medium text-[13px]" style={{ color: 'var(--color-blue)' }}>
              Click any service to request a quote →
            </span>
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, quoteOpt }, i) => {
            const active = selectedIdx === i;
            return (
              <Reveal key={title} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => handleCardClick(i, quoteOpt)}
                  className="w-full text-left rounded-2xl p-7 border h-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary -translate-y-0 hover:-translate-y-1"
                  style={{
                    background: SURFACE,
                    borderColor: active ? 'var(--color-blue)' : LINE,
                    boxShadow: active ? '0 0 40px oklch(0.78 0.15 220 / 0.2), 0 8px 32px rgba(0,0,0,0.4)' : 'none',
                    transform: active ? 'translateY(-4px)' : undefined,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{ background: 'var(--color-blue-soft)' }}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-[1.05rem] mb-2.5 text-foreground">{title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-primary">
                    {active ? 'Quote form below' : 'Get a quote'} <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Quote form ────────────────────────────────────────────────────
const SERVICE_OPTS = ['Blocked drain', 'Hot water issue', 'Burst or leaking pipe', 'Bathroom / kitchen', 'New build plumbing', 'General repair', 'Other'];
const WHEN_OPTS    = ["ASAP — today or tomorrow", "This week", "Next week or later", "I'm flexible"];

function QuoteSection() {
  const [step, setStep]           = useState(1);
  const [service, setService]     = useState('');
  const [when, setWhen]           = useState('');
  const [form, setForm]           = useState({ name: '', phone: '', suburb: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  // Register with the bridge so ServicesSection can pre-fill this form
  useEffect(() => {
    _quoteSetService   = setService;
    _quoteSetStep      = setStep;
    _quoteSetSubmitted = setSubmitted;
    return () => { _quoteSetService = null; _quoteSetStep = null; _quoteSetSubmitted = null; };
  }, []);

  const submit = () => {
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 md:py-28 text-white" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <Reveal className="lg:pt-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'var(--color-amber-soft)', color: 'var(--color-amber)', border: '1px solid oklch(0.78 0.18 55 / 0.25)' }}>
              Free Quotes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">
              Tell Us What<br />You Need
            </h2>
            <p className="mb-7 leading-relaxed text-[15px]" style={{ color: 'var(--color-muted-foreground)' }}>
              Fill in a few quick details and we&apos;ll call you back at a time that suits you.
              No obligation, no pushy sales — just honest advice and a fair price.
            </p>
            <ul className="space-y-3.5">
              {[
                'Response within 2 hours during business hours',
                'Free over-the-phone advice for simple queries',
                'Upfront pricing before any work begins',
                '5-year workmanship guarantee on all jobs',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--color-blue)' }} /> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border p-7 md:p-9" style={{ background: SURFACE, borderColor: LINE }}>
              {!submitted ? (
                <>
                  <div className="flex items-center gap-2 mb-7">
                    {[1,2,3].map(n => (
                      <React.Fragment key={n}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all`}
                          style={step >= n
                            ? { background: 'var(--color-blue)', color: '#fff' }
                            : { background: 'var(--color-line)', color: 'var(--color-muted-foreground)' }}>
                          {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
                        </div>
                        {n < 3 && <div className="flex-1 h-px transition-colors"
                          style={{ background: step > n ? 'var(--color-blue)' : 'var(--color-line)' }} />}
                      </React.Fragment>
                    ))}
                  </div>

                  {step === 1 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-1">What do you need help with?</h3>
                      <p className="text-[13px] mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                        Tap to select — we&apos;ll move on automatically
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {SERVICE_OPTS.map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setService(opt);
                              setTimeout(() => setStep(2), 380);
                            }}
                            className="text-left text-[13px] px-3.5 py-2.5 rounded-xl border transition-all duration-200 active:scale-95"
                            style={service === opt
                              ? { background: 'var(--color-blue)', color: '#fff', borderColor: 'var(--color-blue)', transform: 'scale(1.03)' }
                              : { background: 'var(--color-background)', color: 'var(--color-foreground)', borderColor: LINE }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {service && (
                        <button onClick={() => setStep(2)}
                          className="mt-4 w-full text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
                          style={{ background: 'var(--color-blue)' }}>
                          Continue →
                        </button>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-1">When do you need us?</h3>
                      <p className="text-[13px] mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                        Tap to select — we&apos;ll move on automatically
                      </p>
                      <div className="flex flex-col gap-2">
                        {WHEN_OPTS.map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setWhen(opt);
                              setTimeout(() => setStep(3), 380);
                            }}
                            className="text-left text-[13px] px-4 py-3 rounded-xl border transition-all duration-200 active:scale-95"
                            style={when === opt
                              ? { background: 'var(--color-blue)', color: '#fff', borderColor: 'var(--color-blue)' }
                              : { background: 'var(--color-background)', color: 'var(--color-foreground)', borderColor: LINE }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => { setWhen(''); setStep(1); }}
                          className="flex-1 font-medium py-3 rounded-xl transition-colors text-sm border"
                          style={{ borderColor: LINE, color: 'var(--color-muted-foreground)' }}>
                          ← Back
                        </button>
                        {when && (
                          <button onClick={() => setStep(3)}
                            className="flex-[2] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                            style={{ background: 'var(--color-blue)' }}>
                            Continue →
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Your contact details</h3>
                      <p className="text-[13px] mb-4" style={{ color: 'var(--color-muted-foreground)' }}>We&apos;ll call you back as soon as possible</p>
                      <div className="space-y-3">
                        {(['name','phone','suburb'] as const).map(k => (
                          <input key={k} type={k === 'phone' ? 'tel' : 'text'}
                            placeholder={k === 'name' ? 'Your name' : k === 'phone' ? 'Phone number' : 'Suburb / area'}
                            value={form[k]}
                            onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                            className="w-full rounded-xl px-4 py-3 text-[13px] outline-none transition-all"
                            style={{ background: 'var(--color-background)', border: `1px solid ${LINE}`, color: 'var(--color-foreground)' }} />
                        ))}
                        <textarea placeholder="Anything else? (optional)"
                          rows={2} value={form.notes}
                          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                          className="w-full rounded-xl px-4 py-3 text-[13px] outline-none transition-all resize-none"
                          style={{ background: 'var(--color-background)', border: `1px solid ${LINE}`, color: 'var(--color-foreground)' }} />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => setStep(2)}
                          className="flex-1 font-medium py-3 rounded-xl transition-colors text-sm border"
                          style={{ borderColor: LINE, color: 'var(--color-muted-foreground)' }}>
                          ← Back
                        </button>
                        <button onClick={submit} disabled={!form.name || !form.phone}
                          className="flex-[2] bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm">
                          Request Call Back
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'oklch(0.3 0.1 155 / 0.3)' }}>
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground text-xl mb-2">Request Received!</h3>
                  <p className="text-sm mb-1" style={{ color: 'var(--color-muted-foreground)' }}>
                    Thanks, <strong className="text-foreground">{form.name}</strong>. We&apos;ll be in touch on <strong className="text-foreground">{form.phone}</strong>.
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>{service} · {when}</p>
                  <button
                    onClick={() => { setStep(1); setService(''); setWhen(''); setForm({ name:'', phone:'', suburb:'', notes:'' }); setSubmitted(false); }}
                    className="mt-6 text-[13px] hover:underline" style={{ color: 'var(--color-blue)' }}>
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Why choose us ─────────────────────────────────────────────────
const WHY = [
  { icon: Award,      title: 'Licensed Master Plumber',       desc: 'Fully certified and registered under New Zealand\'s plumbing regulations. You\'re in safe hands.' },
  { icon: ThumbsUp,   title: 'Upfront, Honest Pricing',       desc: 'You\'ll always know the cost before we start. No hidden extras, no surprises on the invoice.' },
  { icon: Calendar,   title: 'Same-Day Response',              desc: 'Most jobs attended within the day. Emergency call-outs available around the clock.' },
  { icon: MapPin,     title: 'Locally Owned & Operated',      desc: 'Based right here in Palmerston North. We\'re your neighbours, and we care about our reputation.' },
  { icon: ShieldCheck,title: '5-Year Guarantee',               desc: 'All our work is backed by a five-year guarantee. If something isn\'t right, we\'ll fix it.' },
  { icon: Users,      title: 'Tidy, Respectful Tradespeople', desc: 'We turn up on time, keep your home clean, and leave the site as tidy as we found it.' },
] as { icon: React.ElementType; title: string; desc: string }[];

function WhyUsSection() {
  return (
    <section id="why-us" style={{ background: NAVY, ...grid }} className="py-20 md:py-28 text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue)', border: '1px solid var(--color-line-2)' }}>
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Plumbing You Can Actually Count On
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-[15px]">
            We built our reputation on doing the job properly, the first time.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 70} className="h-full">
              <TiltCard
                tiltLimit={10}
                scale={1.03}
                effect="gravitate"
                spotlight
                className="rounded-2xl h-full cursor-default group/card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'transform 0.18s ease-out, border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onPointerEnter={(e: React.PointerEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(6,182,212,0.1)';
                }}
                onPointerLeave={(e: React.PointerEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,182,212,0.12)' }}>
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ──────────────────────────────────────────────────
function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-28 overflow-hidden text-white" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue)', border: '1px solid var(--color-line-2)' }}>
              Our People
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">
              The Faces Behind<br />Manawatū Flow
            </h2>
            <p className="mb-7 text-[15px] leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
              We&apos;re a small, tight-knit team of local professionals who take pride in our craft.
              When you call us, you&apos;re talking to someone who knows the area and understands
              the importance of a job well done.
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-blue-soft)' }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: 'var(--color-blue)' }} />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-foreground">Licensed & Registered</div>
                  <div className="text-[13px]" style={{ color: 'var(--color-muted-foreground)' }}>Certified Master Plumbers for your safety</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-amber-soft)' }}>
                  <Users className="w-6 h-6" style={{ color: 'var(--color-amber)' }} />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-foreground">Local Experts</div>
                  <div className="text-[13px]" style={{ color: 'var(--color-muted-foreground)' }}>Living and working in the Manawatū for 15+ years</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-80 md:h-[500px]" style={{ border: `1px solid ${LINE}` }}>
              <Image 
                src={`${IMG}/team-photo.jpg`} 
                alt="Manawatū Flow Team" 
                fill 
                className="object-cover object-center" 
                sizes="(max-width:1024px) 100vw, 600px" 
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Before / After ────────────────────────────────────────────────
const IMG = '/images/manawatu-flow';
const JOBS = [
  {
    before: { label: 'Old rusty hot water cylinder',         img: `${IMG}/before-hot-water-cylinder.jpg`, tc: '#fb923c' },
    after:  { label: 'New heat pump water heater',           img: `${IMG}/after-heat-pump-heater.jpg`,    tc: '#38bdf8' },
    loc: 'Hokowhitu, Palmerston North',
    desc: 'Replaced a 25-year-old cylinder with a modern heat pump system — cut the power bill significantly.',
  },
  {
    before: { label: 'Blocked kitchen drain — backed up',    img: `${IMG}/before-blocked-drain.jpg`,      tc: '#f9a8d4' },
    after:  { label: 'Cleared and relined — flowing freely', img: `${IMG}/after-cleared-drain.jpg`,       tc: '#34d399' },
    loc: 'Roslyn, Palmerston North',
    desc: 'No-dig relining for a collapsed kitchen drain running under the slab.',
  },
  {
    before: { label: 'Dripping tap — 20L wasted daily',       img: `${IMG}/before-dripping-tap.jpg`,     tc: '#fbbf24' },
    after:  { label: 'New mixer tap — done in under an hour', img: `${IMG}/after-mixer-tap.jpg`,          tc: '#2dd4bf' },
    loc: 'Fitzherbert, Palmerston North',
    desc: 'Quick bathroom tap replacement — fixed price, no mess, five-year guarantee.',
  },
];

function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos]     = useState(50);
  const [isDragging, setIsDragging]   = useState(false);
  const [animating, setAnimating]     = useState(false);
  const [slideDir, setSlideDir]       = useState<'left' | 'right'>('left');
  const [hintVisible, setHintVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const job = JOBS[activeIndex];

  const goTo = useCallback((dir: 'prev' | 'next') => {
    if (animating) return;
    setSlideDir(dir === 'next' ? 'left' : 'right');
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(i => dir === 'next' ? (i + 1) % JOBS.length : (i - 1 + JOBS.length) % JOBS.length);
      setSliderPos(50);
      setHintVisible(true);
      setAnimating(false);
    }, 280);
  }, [animating]);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
    setHintVisible(false);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (isDragging) updateSlider(e.clientX); };
    const onUp   = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [isDragging, updateSlider]);

  return (
    <section className="py-20 md:py-28 overflow-hidden text-white" style={{ background: BG_ALT }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: SURFACE, color: 'var(--color-muted-foreground)', border: `1px solid ${LINE}` }}>
            Real Jobs
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Before &amp; After — Our Work Speaks for Itself
          </h2>
          <p className="max-w-xl mx-auto text-[15px]" style={{ color: 'var(--color-muted-foreground)' }}>
            Drag the centre slider to reveal the transformation. Browse real jobs with the arrows.
          </p>
        </Reveal>

        <Reveal delay={100}>
          {/* Carousel card */}
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              border: `1px solid ${LINE}`,
              opacity:   animating ? 0 : 1,
              transform: animating ? `translateX(${slideDir === 'left' ? '-36px' : '36px'})` : 'translateX(0)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
            }}
          >
            {/* ── Comparison viewport ── */}
            <div
              ref={containerRef}
              className="relative h-80 md:h-[440px] cursor-col-resize overflow-hidden select-none"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onTouchMove={e => updateSlider(e.touches[0].clientX)}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* BEFORE — full base layer */}
              <div className="absolute inset-0">
                <Image src={job.before.img} alt={job.before.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 800px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> Before
                  </div>
                  <div className="text-sm font-semibold drop-shadow-lg" style={{ color: job.before.tc }}>
                    {job.before.label}
                  </div>
                </div>
              </div>

              {/* AFTER — clipped to reveal right portion */}
              <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
                <Image src={job.after.img} alt={job.after.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 800px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 right-5 text-right">
                  <div className="inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> After
                  </div>
                  <div className="text-sm font-semibold drop-shadow-lg" style={{ color: job.after.tc }}>
                    {job.after.label}
                  </div>
                </div>
              </div>

              {/* Divider line + handle */}
              <div
                className="absolute top-0 bottom-0 z-10 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/90"
                  style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center pointer-events-auto cursor-col-resize"
                  style={{ boxShadow: '0 0 0 3px rgba(255,255,255,0.55), 0 4px 24px rgba(0,0,0,0.4)' }}
                  onMouseDown={e => { e.stopPropagation(); setIsDragging(true); }}
                >
                  <ArrowLeft className="w-3 h-3 text-slate-700" />
                  <ArrowRight className="w-3 h-3 text-slate-700" />
                </div>
              </div>

              {/* Drag hint */}
              {hintVisible && (
                <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none z-20">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold px-4 py-2 rounded-full"
                    style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                    <ArrowLeft className="w-3 h-3" /> Drag to compare <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5" style={{ background: SURFACE }}>
              <div className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: 'var(--color-muted-foreground)' }}>
                <MapPin className="w-3 h-3" /> {job.loc}
              </div>
              <p className="text-[14px] leading-relaxed text-foreground/80">{job.desc}</p>
            </div>
          </div>

          {/* Carousel nav */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2 items-center">
              {JOBS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (i !== activeIndex && !animating) goTo(i > activeIndex ? 'next' : 'prev'); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === activeIndex ? '28px' : '10px',
                    height:     '10px',
                    background: i === activeIndex ? 'var(--color-blue)' : 'var(--color-line)',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => goTo('prev')} disabled={animating}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
                style={{ border: `1px solid ${LINE}`, color: 'var(--color-muted-foreground)' }}>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => goTo('next')} disabled={animating}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40"
                style={{ background: 'var(--color-blue)' }}>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Sarah M.',      suburb: 'Hokowhitu',   stars: 5, text: 'Called at 7am about a burst pipe and they were here by 9am. Sorted the whole thing quickly and cleanly. Couldn\'t recommend them highly enough.' },
  { name: 'Dave T.',       suburb: 'Roslyn',       stars: 5, text: 'Very happy with the bathroom renovation job. Professional, kept us informed throughout, and the price matched the quote exactly. Great service.' },
  { name: 'Jo & Craig F.', suburb: 'Fitzherbert',  stars: 5, text: 'We\'ve used Manawatū Flow for three jobs now — always prompt, always tidy, always fair pricing. Wouldn\'t go anywhere else.' },
  { name: 'Mike L.',       suburb: 'Awapuni',      stars: 5, text: 'Brilliant job on our new hot water system. Explained all the options, helped us choose the right one for our family, and installed it the same week.' },
];

function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 text-white" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'var(--color-amber-soft)', color: 'var(--color-amber)', border: '1px solid oklch(0.78 0.18 55 / 0.25)' }}>
            Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-[13px]" style={{ color: 'var(--color-muted-foreground)' }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span>5.0 average · 47+ Google Reviews</span>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <div className="rounded-2xl p-6 hover:-translate-y-1 transition-all h-full"
                style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--color-muted-foreground)' }}>&ldquo;{r.text}&rdquo;</p>
                <div className="text-[13px] font-semibold text-foreground">{r.name}</div>
                <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>
                  <MapPin className="w-3 h-3" /> {r.suburb}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Service area ──────────────────────────────────────────────────
const SUBURBS = [
  'Palmerston North CBD','Hokowhitu','Roslyn','Fitzherbert',
  'Awapuni','Terrace End','Cloverlea','Kelvin Grove',
  'Milson','Highbury','Takaro','Ashhurst',
  'Feilding','Foxton','Levin','Woodville',
];

function ServiceAreaSection() {
  return (
    <section id="area" className="py-20 md:py-28 text-white" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue)', border: '1px solid var(--color-line-2)' }}>
              Where We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5">
              Serving Palmerston North &amp; the Wider Manawatū
            </h2>
            <p className="mb-7 text-[15px] leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
              We&apos;re based in Palmerston North and cover the wider Manawatū district.
              If you&apos;re nearby and not on this list, just give us a ring.
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-6">
              {SUBURBS.map(s => (
                <div key={s} className="flex items-center gap-2 text-[13px] text-foreground/75">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--color-blue)' }} /> {s}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl overflow-hidden shadow-xl relative h-72 md:h-[420px]" style={{ border: `1px solid ${LINE}` }}>
              <Image src={`${IMG}/service-area-map.jpg`} alt="Manawatū service area map" fill className="object-cover" sizes="(max-width:1024px) 100vw, 600px" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Process ───────────────────────────────────────────────────────
const STEPS = [
  { n:'01', icon: Phone,        title: 'Contact Us',     desc: 'Call, text, or fill out the quote form. Tell us what\'s going on and we\'ll give you an idea of cost right away if we can.' },
  { n:'02', icon: Calendar,     title: 'We\'ll Assess',  desc: 'We\'ll book a time that suits you — often same-day. Our plumber will inspect and confirm the price before starting.' },
  { n:'03', icon: CheckCircle2, title: 'Job Done Right', desc: 'We complete the work to a high standard, clean up after ourselves, and make sure you\'re happy before we leave.' },
];

function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 text-white" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{ background: SURFACE, color: 'var(--color-muted-foreground)', border: `1px solid ${LINE}` }}>
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Simple, Stress-Free Process
          </h2>
          <p className="max-w-md mx-auto text-[15px]" style={{ color: 'var(--color-muted-foreground)' }}>
            Getting your plumbing sorted shouldn&apos;t be a hassle.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ n, icon: Icon, title, desc }, i) => (
            <Reveal key={n} delay={i * 100} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative"
                style={{ background: BG, border: `1px solid ${LINE}`, boxShadow: '0 0 40px oklch(0.78 0.15 220 / 0.12), 0 8px 32px rgba(0,0,0,0.3)' }}>
                <Icon className="w-8 h-8" style={{ color: 'var(--color-blue)' }} />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-mono font-medium shadow-md"
                  style={{ background: 'var(--color-amber)' }}>
                  {n}
                </div>
              </div>
              <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Automation section ────────────────────────────────────────────
const FEED = [
  { dot:'bg-amber-400',   event:'New quote request — Blocked drain, Roslyn',  time:'Just now'  },
  { dot:'bg-cyan-400',    event:'SMS confirmation sent to customer',           time:'2 min ago' },
  { dot:'bg-cyan-400',    event:'Job details emailed to on-call plumber',      time:'2 min ago' },
  { dot:'bg-emerald-400', event:'Job #0042 marked complete — Fitzherbert',     time:'4 hrs ago' },
  { dot:'bg-slate-400',   event:'Automated follow-up sent — no response',      time:'Yesterday' },
];

function AutomationSection() {
  return (
    <section className="py-20 md:py-28 text-white" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue)', border: '1px solid var(--color-line-2)' }}>
              Smart Business
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-5">
              Never Miss a Lead — Even When You&apos;re on the Tools
            </h2>
            <p className="mb-7 leading-relaxed text-[15px]" style={{ color: 'var(--color-muted-foreground)' }}>
              When a customer submits the quote form, everything happens automatically —
              instant confirmation, job details to the plumber on call, and a follow-up
              reminder if there&apos;s no response within two hours.
            </p>
            <ul className="space-y-3.5">
              {[
                { icon: MessageSquare, text: 'Instant SMS confirmation sent to the customer' },
                { icon: Mail,          text: 'Job details emailed to the plumber on call' },
                { icon: Bot,           text: 'Automated follow-up if no response within 2 hours' },
                { icon: Calendar,      text: 'Job logged in your scheduling system automatically' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[14px] text-foreground/80">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-blue-soft)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--color-blue)' }} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl p-7 space-y-1" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                Live lead flow (demo)
              </div>
              {FEED.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 last:border-0" style={{ borderBottom: `1px solid ${LINE}` }}>
                  <div className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 shrink-0`} />
                  <div>
                    <div className="text-[13px] font-medium text-foreground/85">{item.event}</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>{item.time}</div>
                  </div>
                </div>
              ))}
              <p className="text-[11px] pt-2" style={{ color: 'var(--color-muted-foreground)' }}>This feed would connect to your live job management system.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────
const FAQS = [
  { q:'How quickly can you get to me?',                    a:'For non-emergency jobs, we aim to attend within 24–48 hours. For emergencies — burst pipes, no hot water, flooding — we aim to be there the same day, often within a few hours.' },
  { q:'Do you charge a call-out fee?',                     a:'We charge a standard call-out fee for the first visit, covering travel and initial assessment. This is included in your upfront quote, so there are no surprises.' },
  { q:'Are you a licensed plumber in New Zealand?',        a:'Yes. All our plumbers are licensed under the Plumbers, Gasfitters, and Drainlayers Act 2006. You can ask to see our licences at any time.' },
  { q:'What areas do you cover?',                          a:'We cover Palmerston North and the wider Manawatū district, including Feilding, Ashhurst, Foxton, and Levin. For jobs slightly further afield, just give us a call.' },
  { q:'Do you offer a guarantee on your work?',            a:'Yes — all our workmanship is backed by a 5-year guarantee. If anything we\'ve done fails due to our installation or repair, we\'ll come back and fix it at no extra cost.' },
  { q:'Can you give me a quote over the phone?',           a:'For simple jobs — like a dripping tap or toilet replacement — we can often give you a price over the phone. For bigger jobs, we prefer to visit first so we can give you an accurate, fixed price.' },
  { q:'What payment methods do you accept?',               a:'We accept bank transfer, credit card, and debit card. Payment is due on completion unless otherwise arranged.' },
];

const FAQ_COLORS = ['#c084fc', '#4ade80', '#fde047', '#fb923c', '#38bdf8', '#f472b6'];

function FaqSection() {
  const items = FAQS.map((faq, i) => ({
    id: i,
    color: FAQ_COLORS[i % FAQ_COLORS.length],
    front: faq.q,
    reveal: faq.a,
  }));

  return (
    <section id="faq" style={{ background: BG, ...grid }} className="py-16 md:py-24 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <CardStackCarousel
          items={items}
          label="FAQs"
          labelClassName="text-white"
        />
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────
function FinalCtaSection() {
  return (
    <section id="contact" style={{ background: BG, ...grid }} className="py-24 md:py-32 text-white text-center relative overflow-hidden">
      <ParticleCanvas count={50} />

      {/* Animated aurora */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)', animation: 'pulse 6s ease-in-out infinite' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 30% 60%, rgba(139,92,246,0.05) 0%, transparent 65%)', animation: 'pulse 9s ease-in-out infinite 1s' }} />

      <Reveal className="max-w-3xl mx-auto px-5 relative z-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', boxShadow: '0 0 40px rgba(245,158,11,0.3), 0 8px 32px rgba(0,0,0,0.4)' }}>
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
          Got a Plumbing Problem?{' '}
          <GradientText>Let&apos;s Sort It Today.</GradientText>
        </h2>
        <p className="text-white/40 text-[16px] mb-9 max-w-lg mx-auto leading-relaxed">
          Call us now for fast, friendly service — or fill out the form and we&apos;ll be in touch shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2.5 text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-[15px]"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              boxShadow: '0 0 28px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)',
            }}>
            <Phone className="w-5 h-5" /> Call {PHONE}
          </a>
          <a href="#quote"
            className="flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-[15px] hover:border-white/20"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
            Request a Quote <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-[13px] text-white/30">
          {['No obligation','Upfront pricing','Licensed & insured','24/7 emergencies'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> {t}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer style={{ background: '#020a14' }} className="text-white py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 0 16px rgba(6,182,212,0.3)' }}>
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-[14px]">Manawatū Flow Plumbing</div>
                <div className="text-cyan-400/50 text-[10px] mt-0.5">Licensed Plumbers · Palmerston North</div>
              </div>
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-xs">
              Trusted plumbing and drainage services for homes and businesses across
              Palmerston North and the wider Manawatū region.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[11px] text-white/30 uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2 text-[13px] text-white/40">
              {['Blocked Drains','Hot Water Systems','Bathroom & Kitchen','Pipe Relining','New Builds','Maintenance'].map(s => (
                <li key={s} className="hover:text-white/70 cursor-pointer transition-colors">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[11px] text-white/30 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3 text-[13px] text-white/40">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-cyan-500" />
                <div>{PHONE}<div className="text-[10px] mt-0.5 text-white/25">24/7 emergencies</div></div>
              </li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-500" />{EMAIL}</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />Palmerston North, Manawatū<br />New Zealand</li>
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />Mon–Sat 7am–6pm<br />Emergency 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">&copy; {new Date().getFullYear()} Manawatū Flow Plumbing. All rights reserved.</p>
          <p className="text-[11px] text-white/15 font-mono">⚠ Portfolio demo concept only — not a real business. Designed by Infynt Studio.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky mobile bar ─────────────────────────────────────────────
function StickyMobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex">
      <a href={`tel:${PHONE}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold text-sm active:opacity-80 transition-opacity"
        style={{ background: BG }}>
        <Phone className="w-4 h-4 text-cyan-400" /> Call Now
      </a>
      <a href="#quote"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold text-sm active:opacity-80 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
        <MessageSquare className="w-4 h-4" /> Request Quote
      </a>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────
export default function ManawatuFlowDemo() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      <PortfolioBar />
      <SiteNav />
      <HeroSection />
      <UrgentSection />
      <ServicesSection />
      <QuoteSection />
      <WhyUsSection />
      <TeamSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <ServiceAreaSection />
      <ProcessSection />
      <AutomationSection />
      <FaqSection />
      <FinalCtaSection />
      <SiteFooter />
      <StickyMobileBar />
    </div>
  );
}
