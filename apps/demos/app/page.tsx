import Link from "next/link";
import { ArrowRight, Layers3, MoveRight, ShieldCheck, Workflow } from "lucide-react";
import { DemoCard } from "./components/demo-card";

const DEMOS = [
  {
    eyebrow: "Cafe concept",
    title: "Hearth & Bloom",
    description:
      "Cinematic coffee storytelling with layered motion, reusable product cards, and web-optimized drink reels.",
    href: "/hearth-and-bloom",
    image: "/demos/hearth-and-bloom/media/posters/hero-poster.jpg",
    accent: "#f3c57a",
    tags: ["motion-first", "video hero", "editorial"],
  },
  {
    eyebrow: "Trades demo",
    title: "Manawatu Plumbing",
    description:
      "A premium services demo that blends glassmorphism, before-and-after proof, and strong mobile conversion pathways.",
    href: "/manawatu-plumbing",
    image: "/demos/manawatu-plumbing/images/manawatu-flow/hero-plumber.jpg",
    accent: "#68d7ff",
    tags: ["service business", "lead gen", "shared template"],
  },
];

const WORKFLOW_STEPS = [
  {
    icon: Layers3,
    title: "Route-first demos",
    description:
      "Each new demo now lives under its own slug inside `apps/demos/app/<slug>/page.tsx`.",
  },
  {
    icon: Workflow,
    title: "Scoped assets",
    description:
      "Media belongs under `apps/demos/public/demos/<slug>/...` so routes stay portable and collision-free.",
  },
  {
    icon: ShieldCheck,
    title: "Real sites stay isolated",
    description:
      "Production apps like `orellie` and `infynt-site` are no longer used as demo containers.",
  },
];

export default function DemosPage() {
  return (
    <main className="pb-20">
      <section className="section-shell pt-6 sm:pt-8">
        <div className="hub-panel rounded-full px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(104,215,255,0.95),rgba(255,206,123,0.95))] text-slate-950 shadow-[0_12px_28px_rgba(104,215,255,0.22)]">
                <span
                  className="text-xl leading-none"
                  style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.06em" }}
                >
                  D
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/44">
                  Infynt Demo Fleet
                </p>
                <p className="text-sm text-white/64">
                  Dedicated host app for portfolio demos and future slugs.
                </p>
              </div>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/74 transition-colors hover:bg-white/8 hover:text-white"
              href="/hearth-and-bloom"
            >
              Jump into a demo <MoveRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/64">
              Demo-only deployment lane
            </span>
            <h1
              className="mt-6 text-[3.5rem] leading-[0.9] text-white sm:text-[5rem] lg:text-[6.4rem]"
              style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.04em" }}
            >
              ONE HOST.
              <span className="block text-[var(--color-accent)]">MANY SLUGS.</span>
              <span className="block">NO REAL-SITE SPILLOVER.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              This app is the new home for portfolio demos. It keeps demo routing,
              demo assets, and future showcase pages isolated from production
              websites while still staying quick to deploy through one Vercel
              project.
            </p>
          </div>

          <div className="hub-panel rounded-[34px] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/44">
              Future workflow
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Create a new route under `apps/demos/app/<slug>/page.tsx`.",
                "Place route-specific components in `app/components/<slug>/`.",
                "Add scoped media in `public/demos/<slug>/`.",
                "Register the demo on this index page and deploy one shared demos project.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/68"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.href} {...demo} />
          ))}
        </div>
      </section>

      <section className="section-shell pt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {WORKFLOW_STEPS.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="hub-panel rounded-[28px] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-[var(--color-accent)]">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/64">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
