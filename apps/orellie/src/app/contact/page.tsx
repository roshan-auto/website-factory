"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-6">Get in touch</Badge>
            <h1 className="text-5xl sm:text-6xl font-serif tracking-tight text-foreground mb-6">
              How can we help?
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Whether you have a question about our jewellery, an existing order, 
              or just want to say hi, we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-16">
          
          {/* Form / Success State */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-border/50"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-serif mb-4">Thank you for your message!</h2>
                <p className="text-muted-foreground font-light mb-10 max-w-sm mx-auto">
                  We&apos;ve received your inquiry and will get back to you as soon as possible.
                </p>
                <Button variant="outline" className="rounded-full px-8" onClick={() => setSubmitted(false)}>
                  Back to Form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Name"
                      className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="What is this regarding?"
                    className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Tell us more..."
                    className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-center">
                  <Button type="submit" size="lg" className="rounded-full px-12 h-14 text-base gap-2 group shadow-lg shadow-primary/20">
                    Send Message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-6 p-8 bg-secondary/30 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-2">Studio Location</h4>
                <p className="text-muted-foreground text-sm font-light">Handcrafted in Auckland,<br />New Zealand</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-6 p-8 bg-secondary/30 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-serif text-lg mb-2">Direct Email</h4>
                <p className="text-muted-foreground text-sm font-light">
                  <a href="mailto:hello@orellie.nz" className="hover:text-primary transition-colors">hello@orellie.nz</a>
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
