import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CategoryCard({
  icon: Icon,
  title,
  description,
}: CategoryCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-black/8 bg-white/80 p-6 shadow-[0_22px_80px_rgba(39,22,14,0.08)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,174,78,0.18),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-roast)] text-[var(--color-crema)] shadow-[0_12px_24px_rgba(44,20,10,0.18)]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
