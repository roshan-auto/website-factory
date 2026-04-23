"use client";

import { motion } from "framer-motion";
import { Mail, Gift, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-6">Gifts</Badge>
            <h1 className="text-5xl sm:text-6xl font-serif tracking-tight text-foreground mb-6">
              The Gift of Choice
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Can&apos;t decide? Give them the opportunity to choose their own perfect piece of handcrafted radiance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center max-w-6xl mx-auto">
          
          {/* Card Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[1.6/1] w-full max-w-md mx-auto lg:mx-0 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-hover rounded-[2.5rem] shadow-2xl shadow-primary/30 flex flex-col justify-between p-10 text-white overflow-hidden">
              {/* Card Design Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 font-serif text-3xl tracking-tight">orellie</div>
              <div className="relative z-10 text-7xl font-bold tracking-tighter">$100</div>
              <div className="relative z-10 text-xs uppercase tracking-[0.3em] font-semibold opacity-80">Gift Certificate</div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif mb-6">Orellie Digital Gift Cards</h2>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-light">Delivered instantly to their inbox</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-light">Redeemable on any item in our store</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-light">No expiration date</p>
                </div>
              </div>

              <div className="bg-card p-8 rounded-3xl border border-border/50 space-y-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong>Note:</strong> We are currently setting up our automated gift card system. 
                  To purchase a gift card today, please contact us and we&apos;ll arrange a custom code for you manually.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="w-full rounded-full gap-2 h-12">
                    Contact Us to Order
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
