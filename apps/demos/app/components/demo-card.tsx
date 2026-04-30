import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DemoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  accent: string;
  tags: string[];
}

export function DemoCard({
  eyebrow,
  title,
  description,
  href,
  image,
  accent,
  tags,
}: DemoCardProps) {
  return (
    <article className="hub-panel group overflow-hidden rounded-[32px]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.18)_48%,rgba(2,6,23,0.88)_100%)]" />
        <div
          className="absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950"
          style={{ backgroundColor: accent }}
        >
          {eyebrow}
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h2
          className="text-4xl leading-none text-white sm:text-[2.8rem]"
          style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.04em" }}
        >
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/54"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[var(--color-accent)]"
          href={href}
        >
          Open demo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
