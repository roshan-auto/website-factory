'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface TiltCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: 'gravitate' | 'evade';
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function TiltCard({
  tiltLimit = 15,
  scale = 1.04,
  perspective = 1200,
  effect = 'gravitate',
  spotlight = true,
  className,
  style,
  children,
  onPointerEnter: externalPointerEnter,
  onPointerMove: externalPointerMove,
  onPointerLeave: externalPointerLeave,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
  );
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const dir = effect === 'evade' ? -1 : 1;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
      setTransform(
        `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale},${scale},${scale})`,
      );
      if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 });
      externalPointerMove?.(e);
    },
    [tiltLimit, scale, perspective, dir, spotlight, externalPointerMove],
  );

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsHovered(true);
    externalPointerEnter?.(e);
  }, [externalPointerEnter]);

  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
    );
    setIsHovered(false);
    externalPointerLeave?.(e);
  }, [perspective, externalPointerLeave]);

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
      className={cn('will-change-transform relative overflow-hidden', className)}
      style={{
        transform,
        transition: 'transform 0.18s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          <div
            className="absolute w-[200%] h-[200%] rounded-full"
            style={{
              left: `${spotlightPos.x}%`,
              top: `${spotlightPos.y}%`,
              transform: 'translate(-50%,-50%)',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 45%)',
            }}
          />
        </div>
      )}
    </div>
  );
}
