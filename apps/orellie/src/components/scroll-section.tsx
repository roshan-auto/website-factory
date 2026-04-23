"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const contentBlocks = [
  {
    title: "Handmade purely from affection.",
    description: "Every piece is thoughtfully designed and created by hand in our studio. We believe in the slow craft of making things that last.",
  },
  {
    title: "Incredibly lightweight.",
    description: "We use premium polymer clay designed to be so light, you'll forget you're wearing them. Statement earrings that don't weigh you down.",
  },
  {
    title: "Hypoallergenic fittings.",
    description: "Your comfort is our priority. We exclusively use 316L Surgical steel posts only, safe for even the most sensitive ears.",
  }
];

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Soft Parallax on the image itself
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <section ref={containerRef} className="relative bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Elegant Image */}
          <div className="flex justify-center lg:justify-end order-base 2 lg:order-1">
            <div className="relative w-full max-w-sm h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                <Image
                  src="/scroll-model.png"
                  alt="Model wearing delicate handmade pink earrings"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Side: Feature List */}
          <div className="flex flex-col justify-center space-y-10 lg:order-2">
            {contentBlocks.map((block, index) => (
              <div 
                key={index}
                className="group flex gap-6 items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold tracking-widest text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    0{index + 1}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-foreground mb-3">
                    {block.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
