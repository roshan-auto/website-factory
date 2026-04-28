'use client';

import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CardItem {
  id: number;
  color: string;
  front: string;
  reveal: string;
}

export interface CardStackCarouselProps {
  items: CardItem[];
  label?: string;
  labelClassName?: string;
  className?: string;
}

export function CardStackCarousel({ items, label, labelClassName, className }: CardStackCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const goNext = useCallback(() => { setFlipped(false); setActiveIdx(i => (i + 1) % items.length); }, [items.length]);
  const goPrev = useCallback(() => { setFlipped(false); setActiveIdx(i => (i - 1 + items.length) % items.length); }, [items.length]);

  const item = items[activeIdx];

  return (
    <div className={className}>
      {label && (
        <p className={`text-[11px] font-bold uppercase tracking-widest mb-8 opacity-40 ${labelClassName ?? ''}`}>{label}</p>
      )}

      {/* Card stack */}
      <div className="relative h-60 md:h-72 mb-6">
        {[2, 1].map(offset => (
          <div
            key={offset}
            className="absolute rounded-2xl"
            style={{
              inset: 0,
              top: `${offset * 10}px`,
              left: `${offset * 6}px`,
              right: `${offset * 6}px`,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '1rem',
            }}
          />
        ))}

        {/* Active card — tap to flip */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between cursor-pointer select-none"
          onClick={() => setFlipped(f => !f)}
          style={{
            background: 'rgba(255,255,255,0.055)',
            border: `1px solid ${item.color}55`,
            boxShadow: `0 0 48px ${item.color}18, 0 8px 32px rgba(0,0,0,0.3)`,
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          <div>
            <span
              className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
              style={{ background: `${item.color}22`, color: item.color }}
            >
              {flipped ? 'Answer' : 'Question'}
            </span>
            <p className="text-white text-[15px] md:text-[16px] font-medium leading-relaxed">
              {flipped ? item.reveal : item.front}
            </p>
          </div>
          <p className="text-[11px] text-white/25 mt-3">{flipped ? 'Tap to close' : 'Tap to reveal answer'}</p>
        </div>
      </div>

      {/* Nav row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFlipped(false); setActiveIdx(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? '24px' : '8px',
                height: '8px',
                background: i === activeIdx ? item.color : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={goPrev} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={goNext} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
