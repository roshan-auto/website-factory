'use client';

/**
 * CardStackCarousel
 *
 * A swipeable, auto-cycling stack of coloured cards.
 *
 * Features
 * ─────────
 * • Three cards visible at once in a fanned stack.
 * • Auto-advances on a configurable interval (default 4 s).
 * • Pauses when the user hovers over the stack.
 * • Live drag feedback via the Pointer Events API + setPointerCapture
 *   (works identically for mouse and touch; the pointer is tracked even
 *   when it leaves the element boundary).
 * • Swipe left/right past a threshold to advance or go back.
 * • Optional "reveal" side toggled by a button on the front card.
 * • Optional large display label and dot-navigation row below the stack.
 *
 * Usage
 * ─────
 * import { CardStackCarousel } from '@/components/ui/card-stack-carousel';
 *
 * const items = faqs.map((faq, i) => ({
 *   id: i,
 *   color: COLORS[i % COLORS.length],
 *   front: faq.question,
 *   reveal: faq.answer,       // optional — shows a "View answer" button
 * }));
 *
 * <CardStackCarousel
 *   items={items}
 *   label="FAQs"              // large display text below the stack
 *   labelClassName="text-white"
 *   autoInterval={4000}       // ms between auto-advances; 0 to disable
 * />
 *
 * Props
 * ─────
 * See CardStackCarouselProps below.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye } from 'lucide-react';

// ─── Public types ───────────────────────────────────────────────────────────

export interface CardStackItem {
  id: string | number;
  /** Card background colour */
  color: string;
  /** Content shown on the active front card (normal state) */
  front: React.ReactNode;
  /** Content shown when the user taps "View answer" (optional) */
  reveal?: React.ReactNode;
  /**
   * Condensed content shown on the two behind-stack cards.
   * Defaults to `front` when omitted.
   */
  preview?: React.ReactNode;
}

export interface CardStackCarouselProps {
  items: CardStackItem[];
  /** Ms between auto-advances. Default 4 000. Set 0 to disable. */
  autoInterval?: number;
  /** Large display label rendered below the stack, e.g. "FAQs". */
  label?: string;
  /** Extra Tailwind classes applied to the label span. */
  labelClassName?: string;
  /** Button label when showing the front side. Default "View answer". */
  expandLabel?: string;
  /** Button label when showing the reveal side. Default "Hide answer". */
  collapseLabel?: string;
  /** Icon inside the expand/collapse button. Default <Eye />. */
  expandIcon?: React.ReactNode;
  /** Show dot-navigation below the stack. Default true. */
  showDots?: boolean;
  /** Helper hint shown beside the dots. Pass "" to hide. */
  hint?: string;
  /** Extra className on the root wrapper. */
  className?: string;
  /** CSS width of the stack container. Default "min(480px, calc(100vw - 40px))". */
  cardWidth?: string;
  /** CSS height of the stack container. Default "clamp(270px, 48vw, 340px)". */
  cardHeight?: string;
}

// ─── Internal geometry ───────────────────────────────────────────────────────

/** Rest positions for [front, second, third] slots */
const SLOTS = [
  { tx: 0,   ty: 0,   rot: 0,  scale: 1.00, z: 30 },
  { tx: -18, ty: -24, rot: -4, scale: 0.96, z: 20 },
  { tx: -34, ty: -46, rot: -8, scale: 0.92, z: 10 },
] as const;

function restTransform(pos: number): string {
  const s = SLOTS[Math.min(pos, 2)];
  return `translate(${s.tx}px, ${s.ty}px) rotate(${s.rot}deg) scale(${s.scale})`;
}

/** Real-time transform applied to the front card while the user is dragging */
function liveTransform(dx: number): string {
  const dy  = Math.abs(dx) * 0.06;
  const rot = Math.max(-22, Math.min(22, dx * 0.04));
  return `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1)`;
}

const SWIPE_THRESHOLD = 60; // px — minimum drag to trigger an advance
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const TRANSITION = `transform 0.48s ${SPRING}, opacity 0.4s ease`;

// ─── Component ───────────────────────────────────────────────────────────────

export function CardStackCarousel({
  items,
  autoInterval  = 4000,
  label,
  labelClassName = '',
  expandLabel   = 'View answer',
  collapseLabel = 'Hide answer',
  expandIcon,
  showDots      = true,
  hint          = 'Hover to pause · swipe to advance',
  className     = '',
  cardWidth     = 'min(480px, calc(100vw - 40px))',
  cardHeight    = 'clamp(270px, 48vw, 340px)',
}: CardStackCarouselProps) {
  const [frontIdx, setFrontIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const [exitDir,  setExitDir]  = useState<'left' | 'right'>('left');
  const [revealed, setRevealed] = useState(false);
  // dragDx drives the live card position while the user holds and drags
  const [dragDx,   setDragDx]   = useState(0);

  // Keep drag state in refs — mutations don't need to trigger renders
  const isDragging = useRef(false);
  const startX     = useRef(0);

  // ── Advance / retreat ─────────────────────────────────────────────
  const advance = useCallback((dir: 'left' | 'right' = 'left') => {
    if (exiting || items.length < 2) return;
    setRevealed(false);
    setExitDir(dir);
    setExiting(true);
    setTimeout(() => {
      setFrontIdx(i =>
        dir === 'left'
          ? (i + 1) % items.length
          : (i - 1 + items.length) % items.length,
      );
      setExiting(false);
    }, 500);
  }, [exiting, items.length]);

  // ── Auto-cycle ────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoInterval || hovering || dragDx !== 0) return;
    const t = setInterval(() => advance('left'), autoInterval);
    return () => clearInterval(t);
  }, [autoInterval, hovering, dragDx, advance]);

  // ── Pointer handlers ──────────────────────────────────────────────
  // setPointerCapture routes ALL subsequent pointer events (move, up, cancel)
  // to this element even when the pointer moves outside it — this is what
  // makes swipe reliable on both mouse and touch without separate handlers.
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (exiting) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
    startX.current     = e.clientX;
  }, [exiting]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setDragDx(e.clientX - startX.current);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - startX.current;
    // Reset drag offset first; advance() will handle the exit animation
    setDragDx(0);
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      advance(dx < 0 ? 'left' : 'right');
    }
  }, [advance]);

  // ── Per-card style calculation ────────────────────────────────────
  function cardStyle(relPos: number): React.CSSProperties {
    const draggingFront = isDragging.current && relPos === 0 && dragDx !== 0;

    if (!exiting) {
      return {
        transform:     draggingFront ? liveTransform(dragDx) : restTransform(relPos),
        opacity:       relPos < 3 ? 1 : 0,
        zIndex:        relPos < 3 ? SLOTS[relPos].z : 0,
        // Disable CSS transition during drag — card tracks the pointer in real time
        transition:    draggingFront ? 'none' : TRANSITION,
        pointerEvents: relPos === 0 ? 'auto' : 'none',
        willChange:    'transform, opacity',
      };
    }

    // Exit state: front flies away; second and third advance one slot each
    const exitTx = exitDir === 'left' ? -130 : 130;
    if (relPos === 0) return {
      transform:     `translate(${exitTx}px, 55px) rotate(${exitTx * 0.1}deg) scale(0.82)`,
      opacity:       0,
      zIndex:        5,
      transition:    TRANSITION,
      pointerEvents: 'none',
      willChange:    'transform, opacity',
    };
    if (relPos === 1) return { transform: restTransform(0), opacity: 1, zIndex: SLOTS[0].z, transition: TRANSITION, pointerEvents: 'none', willChange: 'transform, opacity' };
    if (relPos === 2) return { transform: restTransform(1), opacity: 1, zIndex: SLOTS[1].z, transition: TRANSITION, pointerEvents: 'none', willChange: 'transform, opacity' };
    return { transform: restTransform(2), opacity: 0, zIndex: 0, transition: TRANSITION, pointerEvents: 'none' };
  }

  return (
    <div className={`relative select-none ${className}`}>

      {/* ── Stack container ─────────────────────────────────────── */}
      <div
        className="relative mx-auto"
        style={{
          width:       cardWidth,
          height:      cardHeight,
          // Prevent browser from handling the touch gesture as a scroll —
          // essential for reliable touch-swipe on mobile
          touchAction: 'none',
          cursor:      isDragging.current ? 'grabbing' : 'grab',
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item, idx) => {
          const n      = items.length;
          const relPos = ((idx - frontIdx) % n + n) % n;
          // During exit, show the incoming card (relPos 1) as top so its content
          // is already visible as it glides into the front position
          const isTop  = exiting ? relPos === 1 : relPos === 0;
          const behind = relPos > 0 && relPos < 3;

          return (
            <div
              key={idx}
              className="absolute inset-0 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between"
              style={{ background: item.color, ...cardStyle(relPos) }}
            >
              {/* Front card: full content + reveal button */}
              {isTop && (
                <>
                  <div
                    className="font-bold leading-snug overflow-y-auto text-slate-900"
                    style={{ fontSize: 'clamp(17px, 3.8vw, 28px)', maxHeight: '62%' }}
                  >
                    {revealed && item.reveal != null ? item.reveal : item.front}
                  </div>

                  {item.reveal != null && (
                    <button
                      className="flex items-center gap-2 self-start rounded-full px-4 py-2.5 text-sm font-semibold text-slate-900 hover:opacity-80 transition-opacity mt-3"
                      style={{ background: 'rgba(0,0,0,0.15)' }}
                      // Stop propagation so tapping the button never starts a drag
                      onPointerDown={e => e.stopPropagation()}
                      onClick={e => { e.stopPropagation(); setRevealed(v => !v); }}
                    >
                      {expandIcon ?? <Eye className="w-4 h-4" />}
                      {revealed ? collapseLabel : expandLabel}
                    </button>
                  )}
                </>
              )}

              {/* Behind cards: faded preview text only */}
              {behind && (
                <div
                  className="font-bold leading-snug text-slate-900/35 overflow-hidden"
                  style={{
                    fontSize: 'clamp(15px, 3vw, 20px)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.preview ?? item.front}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Label + dot navigation row ──────────────────────────── */}
      {(label || showDots) && (
        <div className="flex items-end justify-between mt-5 md:mt-3">
          {label ? (
            <span
              className={`font-black leading-[0.85] ${labelClassName}`}
              style={{ fontSize: 'clamp(56px, 10.5vw, 136px)' }}
            >
              {label}
            </span>
          ) : <div />}

          {showDots && (
            <div className="flex flex-col items-end gap-2 mb-1">
              {hint && (
                <p className="text-[11px] text-right opacity-25 hidden sm:block">
                  {hint}
                </p>
              )}
              <div className="flex gap-1.5">
                {items.map((item, i) => (
                  <button
                    key={i}
                    // Stop propagation so clicking a dot never starts a drag
                    onPointerDown={e => e.stopPropagation()}
                    onClick={() => { if (!exiting) { setFrontIdx(i); setRevealed(false); } }}
                    aria-label={`Go to card ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      i === frontIdx ? '22px' : '8px',
                      height:     '8px',
                      background: i === frontIdx
                        ? item.color
                        : 'rgba(128,128,128,0.35)',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
