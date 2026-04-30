'use client';

import { TiltCard } from '@packages/ui';

interface ProductVideoCardProps {
  badge: string;
  eyebrow: string;
  title: string;
  note: string;
  description: string;
  poster: string;
  mp4: string;
  webm: string;
  accent: string;
  className?: string;
}

export function ProductVideoCard({
  badge,
  eyebrow,
  title,
  note,
  description,
  poster,
  mp4,
  webm,
  accent,
  className,
}: ProductVideoCardProps) {
  return (
    <TiltCard
      className={className}
      perspective={1600}
      scale={1.02}
      tiltLimit={12}
    >
      <article className="group relative h-full overflow-hidden rounded-[34px] border border-white/12 bg-[var(--color-roast)] shadow-[0_30px_100px_rgba(12,6,3,0.45)]">
        <div className="relative aspect-[9/14] h-full">
          <video
            autoPlay
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            loop
            muted
            playsInline
            poster={poster}
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,6,3,0.06)_0%,rgba(12,6,3,0.24)_42%,rgba(12,6,3,0.94)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_66%)]" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur-md"
              style={{ backgroundColor: 'rgba(16, 8, 5, 0.48)' }}
            >
              {eyebrow}
            </span>
          </div>

          <div
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold text-[var(--color-roast)] shadow-[0_12px_24px_rgba(39,22,14,0.16)]"
            style={{ backgroundColor: accent }}
          >
            {badge}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-[26px] border border-white/10 bg-black/42 p-5 backdrop-blur-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: accent }}>
                {note}
              </p>
              <h3
                className="mt-2 text-3xl leading-none text-white sm:text-[2.25rem]"
                style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.05em' }}
              >
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
