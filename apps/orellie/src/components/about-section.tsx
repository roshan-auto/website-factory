"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary/10 text-primary border-0 mb-6 hover:bg-primary/20">
                About Me
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-foreground mb-8">
                Meet the maker
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  Hi, I’m Nadee, a mum of two little ones and the maker behind Orellie.
                  Handcraft has always been my passion. I started with sugarcraft, and over time that love grew into creating handmade earrings. What began as curiosity quickly turned into something I truly fell in love with.
                </p>
                <p>
                  Because I have sensitive skin, I struggled to wear many beautiful earrings. This inspired me to create my own using hypoallergenic, 316L surgical steel posts—so they are comfortable and safe to wear.
                </p>
                <p>
                  Now, every pair I make is designed with care, using hypoallergenic materials, so others can enjoy them too. Each piece is handmade with love, made to bring a little joy to your everyday.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/nadiee.jpg"
                alt="Nadee - Creator of Orellie"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
