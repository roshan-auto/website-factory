'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

export interface SiteLink {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  links: SiteLink[];
}

export function SiteHeader({ links }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(18,9,6,0.72)] px-4 py-3 shadow-[0_18px_60px_rgba(8,4,2,0.35)] backdrop-blur-xl md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(255,205,134,0.95),rgba(241,154,57,0.95))] text-[var(--color-roast)] shadow-[0_12px_28px_rgba(245,178,79,0.25)]">
            <span
              className="text-2xl leading-none"
              style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.08em' }}
            >
              H
            </span>
          </div>
          <div>
            <p className="font-serif text-lg italic text-white">Hearth &amp; Bloom</p>
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/48">
              Cafe &amp; Pearl Bar
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm font-medium text-white/66 transition-colors hover:text-white"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="cta-secondary" href="#moments">
            Watch the reveal
          </a>
          <a className="cta-primary" href="#visit">
            Join the list <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-3 max-w-7xl rounded-[32px] border border-white/10 bg-[rgba(18,9,6,0.88)] p-4 shadow-[0_18px_60px_rgba(8,4,2,0.35)] backdrop-blur-xl lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/6 hover:text-white"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <a className="cta-secondary justify-center" href="#moments" onClick={() => setOpen(false)}>
                Watch the reveal
              </a>
              <a className="cta-primary justify-center" href="#visit" onClick={() => setOpen(false)}>
                Join the list <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
