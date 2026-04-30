'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

type RevealState = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
};

const revealOffsets: Record<RevealDirection, Omit<RevealState, 'opacity'>> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.92 },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.24,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const initialState: RevealState = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...revealOffsets[direction] };

  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0.24 : 0.82,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
