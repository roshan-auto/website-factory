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
    <section className="relative flex items-center bg-background overflow-hidden py-16 lg:py-24">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10 transform translate-x-1/4" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-12 z-10">
        
        {/* Badge: Full Width Top */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center self-start gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary tracking-wide font-medium shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span className="uppercase text-xs tracking-widest font-semibold">The Aura Collection</span>
        </motion.div>

        {/* Split Section: Title/Desc (Left) + Video (Right) */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col items-start text-left max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-xl sm:text-5xl lg:text-7xl font-serif tracking-tight text-foreground leading-[1.1] mb-2 lg:mb-6"
            >
              Express your inner <br className="hidden sm:block" />
              <span className="text-primary italic font-light">radiance.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[10px] sm:text-lg text-muted-foreground/80 mb-0 lg:mb-8 font-light leading-relaxed"
            >
              Handcrafted luxury earrings designed to turn heads without weighing you down.
            </motion.p>
          </motion.div>

          {/* Right Side: Video Box */}
          <motion.div 
            className="relative h-[220px] lg:h-[500px] w-full max-w-md mx-auto lg:ml-auto rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/hero-model.png"
              className="w-full h-full object-cover object-[15%_center] lg:object-center"
            >
              <source src="/hero.mp4?v=3" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
          </motion.div>
        </div>

        {/* Buttons: Full Width Bottom */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
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
      </div>
    </section>
  );
}
