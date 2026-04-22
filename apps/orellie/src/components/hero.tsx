"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as const, delay: 0.3 } 
    },
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-background overflow-hidden">
      {/* Background Video Focused Center (User Preferred) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/woman-revealing-earring.jpg"
          className="w-full h-full object-cover object-[50%_center]"
        >
          <source src="/hero.mp4?v=3" type="video/mp4" />
        </video>
        {/* Gradient Mask: Left (Solid) to Right (Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10 w-full lg:w-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          className="flex flex-col items-start text-left max-w-[220px] sm:max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary tracking-wide font-medium shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="uppercase text-xs tracking-widest font-semibold">The Aura Collection</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Express your inner <br className="hidden sm:block" />
            <span className="text-primary italic font-light">radiance.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground/80 mb-10 font-light leading-relaxed max-w-md"
          >
            Handcrafted luxury earrings designed to turn heads without weighing you down. Experience the perfect blend of bold aesthetics and delicate craftsmanship.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base relative overflow-hidden group shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40">
              <Link href="/shop">
                <span className="relative z-10 flex items-center">
                  Shop the Collection
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-shimmer" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-background/50 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-colors">
              Explore Styles
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </section>
  );
}
