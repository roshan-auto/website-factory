import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className ?? ''}`}>
      <span
        className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] ${
          isLight
            ? 'border-white/12 bg-white/6 text-white/72'
            : 'border-black/10 bg-black/5 text-black/55'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`max-w-2xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl ${
          isLight ? 'text-white' : 'text-[var(--color-ink)]'
        }`}
        style={{ fontFamily: 'var(--font-bebas-neue)', letterSpacing: '0.04em' }}
      >
        {title}
      </h2>
      <p
        className={`max-w-xl text-sm leading-7 sm:text-base ${
          isLight ? 'text-white/70' : 'text-[var(--color-ink-soft)]'
        }`}
      >
        {description}
      </p>
    </div>
  );
}
