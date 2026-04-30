import { Clock, Mail, MapPin, Sparkles } from 'lucide-react';
import type { SiteLink } from './site-header';

interface SiteFooterProps {
  links: SiteLink[];
}

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-roast)]">
      <div className="section-shell grid gap-12 py-14 lg:grid-cols-[1.1fr_0.7fr_0.7fr]">
        <div>
          <p className="font-serif text-3xl italic text-white">Hearth &amp; Bloom</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/64">
            A boutique cafe concept built to showcase cinematic product media,
            layered motion, and a refined reusable component system.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/42">
            Navigate
          </p>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a className="text-sm text-white/66 transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/42">
            Visit The Mood
          </p>
          <ul className="mt-5 space-y-4 text-sm text-white/66">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
              <span>Late-night latte bar concept with a boutique downtown feel.</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
              <span>Built for slow mornings, golden hour catch-ups, and after-dark cravings.</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
              <span>hello@hearthandbloom.cafe</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
              <span>Built to feel social-first, polished, and save-worthy.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="section-shell flex flex-col gap-3 py-5 text-xs text-white/36 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Hearth &amp; Bloom Cafe. Concept landing page.</p>
          <p>Built as a reusable motion-first demo inside the Website Factory monorepo.</p>
        </div>
      </div>
    </footer>
  );
}
