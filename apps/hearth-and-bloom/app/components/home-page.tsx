'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  Coffee,
  CupSoda,
  MapPin,
  MoonStar,
  Play,
  Sparkles,
  Star,
} from 'lucide-react';
import { CategoryCard } from './category-card';
import { ProductVideoCard } from './product-video-card';
import { ScrollReveal } from './scroll-reveal';
import { SectionHeading } from './section-heading';
import { SiteFooter } from './site-footer';
import { SiteHeader, type SiteLink } from './site-header';

const BASE_PATH = '/hearth-and-bloom';

const asset = (path: string) => `${BASE_PATH}${path}`;

const NAV_LINKS: SiteLink[] = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Moments', href: '#moments' },
  { label: 'Visit', href: '#visit' },
];

const CATEGORY_ITEMS = [
  {
    icon: CupSoda,
    title: 'Pearl Lattes',
    description: 'Milk tea textures, espresso depth, and glossy tapioca pearls.',
  },
  {
    icon: Coffee,
    title: 'Classic Brews',
    description: 'Slow, rich coffee made for the no-rush part of the day.',
  },
  {
    icon: Sparkles,
    title: 'Signature Finishes',
    description: 'Foam peaks, drizzle work, and camera-ready final touches.',
  },
  {
    icon: MoonStar,
    title: 'After-Dark Drinks',
    description: 'Dessert-style pours with a moodier, indulgent edge.',
  },
  {
    icon: Star,
    title: 'Showpiece Service',
    description: 'Presentation-led menu design for memorable first impressions.',
  },
];

const MENU_ITEMS = [
  {
    badge: '01',
    eyebrow: 'Pearl bar',
    title: 'Iced Boba Latte',
    note: 'Vanilla gloss',
    description: 'Silky milk tea, black pearls, and a chilled finish that reads clean and modern.',
    poster: asset('/media/posters/iced-boba-poster.jpg'),
    mp4: asset('/media/iced-boba-web.mp4'),
    webm: asset('/media/iced-boba-web.webm'),
    accent: '#f3c57a',
  },
  {
    badge: '02',
    eyebrow: 'After dark',
    title: 'Midnight Mocha',
    note: 'Chocolate cascade',
    description: 'Whipped, drenched, and unapologetically rich with layered cocoa drama.',
    poster: asset('/media/posters/midnight-mocha-poster.jpg'),
    mp4: asset('/media/midnight-mocha-web.mp4'),
    webm: asset('/media/midnight-mocha-web.webm'),
    accent: '#d4b4ff',
  },
  {
    badge: '03',
    eyebrow: 'Bloom special',
    title: 'Caramel Pearl',
    note: 'Soft gold finish',
    description: 'Creamy caramel ribbons, pearl texture, and a dessert-style silhouette.',
    poster: asset('/media/posters/caramel-pearl-poster.jpg'),
    mp4: asset('/media/caramel-pearl-web.mp4'),
    webm: asset('/media/caramel-pearl-web.webm'),
    accent: '#efb35e',
  },
  {
    badge: '04',
    eyebrow: 'House espresso',
    title: 'Velvet Cappuccino',
    note: 'Cocoa bloom art',
    description: 'A clean porcelain moment with dense foam, cocoa dusting, and quiet confidence.',
    poster: asset('/media/posters/velvet-cappuccino-poster.jpg'),
    mp4: asset('/media/velvet-cappuccino-web.mp4'),
    webm: asset('/media/velvet-cappuccino-web.webm'),
    accent: '#f1dcc4',
  },
];

const STORY_CARDS = [
  {
    label: 'Rituals',
    title: 'Morning scenes shaped for the first slow sip.',
    copy: 'Layered light, clean typography, and a menu that feels considered before the first order is placed.',
    image: asset('/media/posters/hero-poster.jpg'),
  },
  {
    label: 'Indulgence',
    title: 'Dessert-style coffee that knows how to steal the frame.',
    copy: 'High-drama chocolate finishes and sculpted whipped textures turn every drink into a visual anchor.',
    image: asset('/media/posters/midnight-mocha-poster.jpg'),
  },
  {
    label: 'Craft',
    title: 'Classic espresso moments with a cleaner, boutique finish.',
    copy: 'Refined presentation balances the louder hero drinks and keeps the brand grounded in cafe craft.',
    image: asset('/media/posters/velvet-cappuccino-poster.jpg'),
  },
];

const VALUE_POINTS = [
  'Slow-poured espresso foundations',
  'Texture-led pearls and foam work',
  'Responsive layouts with cinematic motion',
];

const TICKER_ITEMS = [
  'specialty coffee',
  'pearl textures',
  'cinematic menus',
  'responsive motion',
  'boutique presentation',
];

export function HomePage() {
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [72, -72]);
  const cardOneY = useTransform(scrollYProgress, [0, 1], [44, -24]);
  const cardTwoY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const cardThreeY = useTransform(scrollYProgress, [0, 1], [56, -10]);
  const cardFourY = useTransform(scrollYProgress, [0, 1], [12, 42]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground" id="top">
      <SiteHeader links={NAV_LINKS} />

      <main>
        <section className="relative isolate min-h-[100svh] overflow-hidden rounded-b-[44px] border-b border-white/10">
          <div className="absolute inset-0">
            <video
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
              loop
              muted
              playsInline
              poster={asset('/media/posters/hero-poster.jpg')}
              style={{ objectPosition: '78% center' }}
            >
              <source src={asset('/media/hero-web.webm')} type="video/webm" />
              <source src={asset('/media/hero-web.mp4')} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/58" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, oklch(0.11 0.02 35 / 0.96) 0%, oklch(0.13 0.02 32 / 0.84) 34%, oklch(0.12 0.02 30 / 0.28) 74%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,184,95,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_26%)]" />
            <div className="grain-overlay absolute inset-0 opacity-45" />
          </div>

          <motion.div
            animate={{ y: [0, -18, 0], opacity: [0.48, 0.72, 0.48] }}
            className="absolute -left-16 top-32 h-56 w-56 rounded-full bg-[rgba(246,184,95,0.22)] blur-3xl"
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.24, 0.4, 0.24] }}
            className="absolute bottom-20 right-14 h-72 w-72 rounded-full bg-[rgba(255,255,255,0.12)] blur-3xl"
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="section-shell relative flex min-h-[100svh] items-center pt-28 pb-20 md:pt-32 md:pb-24">
            <div className="max-w-2xl">
              <ScrollReveal direction="scale">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/74 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(245,178,79,0.75)]" />
                  Boutique bubble coffee bar
                </div>
              </ScrollReveal>

              <ScrollReveal className="mt-8" delay={0.06}>
                <h1
                  className="max-w-3xl text-[4.2rem] leading-[0.88] text-white sm:text-[5.7rem] lg:text-[7.8rem]"
                  style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.05em' }}
                >
                  COFFEE,
                  <span className="block text-[var(--color-accent)]">PEARLS,</span>
                  <span className="block">AND A LITTLE DRAMA.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
                  Hearth &amp; Bloom turns coffee into a visual ritual with rich
                  espresso, pearl-laced signatures, and presentation designed to
                  feel alive on screen and even better in hand.
                </p>
              </ScrollReveal>

              <ScrollReveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.22}>
                <a className="cta-primary" href="#menu">
                  Explore the menu <ArrowRight className="h-4 w-4" />
                </a>
                <a className="cta-secondary" href="#moments">
                  <Play className="h-4 w-4" /> Watch signature pours
                </a>
              </ScrollReveal>

              <ScrollReveal className="mt-10 grid gap-4 sm:grid-cols-3" delay={0.3}>
                {[
                  '4 showcase drink loops',
                  'Layered editorial motion',
                  'Responsive dark-light rhythm',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/70 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </ScrollReveal>
            </div>

            <ScrollReveal
              className="absolute bottom-10 right-5 hidden max-w-xs lg:block"
              delay={0.34}
              direction="left"
            >
              <div className="glass-panel rounded-[30px] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/42">
                      Open late
                    </p>
                    <p className="mt-2 text-2xl text-white" style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.05em' }}>
                      Golden hour to close
                    </p>
                  </div>
                  <div className="rounded-full bg-[rgba(245,178,79,0.92)] p-3 text-[var(--color-roast)]">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative z-20 -mt-16 pb-20 md:-mt-20">
          <div className="section-shell">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {CATEGORY_ITEMS.map((item, index) => (
                <ScrollReveal
                  key={item.title}
                  delay={0.06 * index}
                  direction={index % 2 === 0 ? 'up' : 'scale'}
                >
                  <CategoryCard {...item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative mx-4 overflow-hidden rounded-[40px] bg-[var(--color-crema)] text-[var(--color-ink)] md:mx-6 lg:mx-8"
          id="story"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            className="absolute left-[8%] top-20 hidden rounded-full border border-black/8 bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-ink-soft)] shadow-[0_18px_60px_rgba(39,22,14,0.1)] md:block"
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            house pearls
          </motion.div>
          <motion.div
            animate={{ y: [0, 18, 0] }}
            className="absolute right-[8%] top-32 hidden rounded-full border border-black/8 px-5 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_18px_60px_rgba(39,22,14,0.1)] md:block"
            style={{ backgroundColor: 'rgba(245, 178, 79, 0.28)' }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            cocoa bloom
          </motion.div>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            className="absolute bottom-14 right-[14%] hidden rounded-full border border-black/8 bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-ink-soft)] shadow-[0_18px_60px_rgba(39,22,14,0.1)] lg:block"
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            soft-light mornings
          </motion.div>

          <div className="section-shell py-20 md:py-24">
            <ScrollReveal direction="scale">
              <div className="text-center">
                <p className="font-serif text-5xl italic text-[var(--color-accent-deep)] sm:text-6xl">
                  Hearth &amp; Bloom
                </p>
                <h2
                  className="mx-auto mt-6 max-w-5xl text-[3rem] leading-[0.96] text-[var(--color-ink)] sm:text-[4rem] lg:text-[5.6rem]"
                  style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
                >
                  WE BELIEVE A DRINK SHOULD FEEL LIKE A MOMENT. TEXTURE, LIGHT,
                  AND PRESENTATION ALL MATTER BEFORE THE FIRST SIP.
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal className="mx-auto mt-8 max-w-3xl text-center" delay={0.08}>
              <p className="text-base leading-8 text-[var(--color-ink-soft)]">
                This concept page borrows the warmth of boutique cafes and pushes
                it through a motion-first web experience: strong hierarchy,
                reusable content blocks, and enough visual energy to feel premium
                without tipping into clutter.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {VALUE_POINTS.map((point, index) => (
                <ScrollReveal key={point} delay={0.1 + index * 0.05}>
                  <div className="rounded-[26px] border border-black/10 bg-white/76 px-5 py-5 shadow-[0_18px_60px_rgba(39,22,14,0.08)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-roast)] text-[var(--color-crema)]">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">
                        {point}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/8 bg-[var(--color-background-alt)] py-4">
          <div className="ticker-track flex min-w-max items-center gap-6 text-sm font-semibold uppercase tracking-[0.28em] text-white/56">
            {Array.from({ length: 3 }).flatMap((_, repeatIndex) =>
              TICKER_ITEMS.map((item) => (
                <span className="inline-flex items-center gap-6" key={`${repeatIndex}-${item}`}>
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                </span>
              )),
            )}
          </div>
        </section>

        <section className="py-24 md:py-28" id="menu" ref={showcaseRef}>
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
            <motion.div className="self-start lg:sticky lg:top-28" style={{ y: headingY }}>
              <SectionHeading
                description="Portrait product clips become the core of the menu experience here. Each card is reusable, optimized for mobile delivery, and designed to pop on scroll without breaking the overall layout rhythm."
                eyebrow="Signature pours"
                title="MENU REELS THAT FEEL ALIVE."
              />

              <ScrollReveal className="mt-8 grid gap-4 sm:grid-cols-2" delay={0.08}>
                {[
                  { label: 'Optimized media', value: '5 web-ready video assets' },
                  { label: 'Motion language', value: 'scroll reveal + tilt + parallax' },
                ].map((item) => (
                  <div key={item.label} className="soft-card rounded-[28px] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                      {item.label}
                    </p>
                    <p
                      className="mt-3 text-2xl text-white"
                      style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </ScrollReveal>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              <motion.div style={{ y: cardOneY }}>
                <ScrollReveal delay={0.04}>
                  <ProductVideoCard {...MENU_ITEMS[0]} />
                </ScrollReveal>
              </motion.div>
              <motion.div style={{ y: cardTwoY }}>
                <ScrollReveal delay={0.1}>
                  <ProductVideoCard {...MENU_ITEMS[1]} />
                </ScrollReveal>
              </motion.div>
              <motion.div style={{ y: cardThreeY }}>
                <ScrollReveal delay={0.14}>
                  <ProductVideoCard {...MENU_ITEMS[2]} />
                </ScrollReveal>
              </motion.div>
              <motion.div style={{ y: cardFourY }}>
                <ScrollReveal delay={0.18}>
                  <ProductVideoCard {...MENU_ITEMS[3]} />
                </ScrollReveal>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-background-alt)] py-24 md:py-28" id="moments">
          <div className="section-shell">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <ScrollReveal>
                <SectionHeading
                  description="A softer editorial band gives the page breathing room and shows how the visual system adapts from product-heavy motion into calmer storytelling cards."
                  eyebrow="Explore the mood"
                  title="SCENES THAT ROUND OUT THE BRAND."
                />
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <a className="inline-flex items-center gap-2 text-sm font-semibold text-white/68 transition-colors hover:text-white" href="#visit">
                  See the final CTA <ChevronRight className="h-4 w-4" />
                </a>
              </ScrollReveal>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {STORY_CARDS.map((card, index) => (
                <ScrollReveal key={card.title} delay={0.06 * index}>
                  <article className="group relative min-h-[460px] overflow-hidden rounded-[34px] border border-white/10">
                    <Image
                      alt={card.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      src={card.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,5,3,0.16),rgba(9,5,3,0.82)_78%,rgba(9,5,3,0.96)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_48%)] opacity-60" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="rounded-full border border-white/12 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-md">
                        {card.label}
                      </span>
                      <h3
                        className="mt-4 text-[2.1rem] leading-[0.94] text-white"
                        style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
                      >
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">
                        {card.copy}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                        Read the scene <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24" id="visit">
          <div className="section-shell">
            <ScrollReveal direction="scale">
              <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,178,79,0.96),rgba(255,221,176,0.96))] p-8 text-[var(--color-roast)] shadow-[0_30px_100px_rgba(245,178,79,0.16)] md:p-10">
                <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.45),transparent_48%)] lg:block" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(44,20,10,0.58)]">
                      Join the bloom list
                    </p>
                    <h2
                      className="mt-4 max-w-3xl text-[3rem] leading-[0.94] md:text-[4.2rem]"
                      style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
                    >
                      GET THE NEXT DROP OF MENU MOMENTS, OFFERS, AND DESIGN WORTH SAVING.
                    </h2>
                    <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-[rgba(44,20,10,0.68)]">
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Boutique cafe positioning
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Motion tuned for mobile
                      </span>
                    </div>
                  </div>

                  <form className="flex w-full max-w-xl flex-col gap-3 rounded-[28px] bg-[rgba(44,20,10,0.12)] p-3 backdrop-blur-sm sm:flex-row">
                    <input
                      className="min-w-0 flex-1 rounded-[22px] border border-[rgba(44,20,10,0.12)] bg-white/80 px-5 py-4 text-sm text-[var(--color-roast)] outline-none placeholder:text-[rgba(44,20,10,0.42)]"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <button className="rounded-[22px] bg-[var(--color-roast)] px-6 py-4 text-sm font-semibold text-[var(--color-crema)] transition-transform hover:-translate-y-0.5" type="button">
                      Join now
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <SiteFooter links={NAV_LINKS} />
    </div>
  );
}
