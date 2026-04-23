"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Music2 } from "lucide-react";

export function SocialConnect() {
  const socials = [
    {
      name: "Instagram",
      label: "Follow us on Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/orellienzart/",
      color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
      hover: "shadow-pink-500/20"
    },
    {
      name: "Facebook",
      label: "Visit our Facebook page",
      icon: Facebook,
      url: "https://www.facebook.com/orellienzart",
      color: "bg-[#1877F2]",
      hover: "shadow-blue-500/20"
    },
    {
      name: "TikTok",
      label: "See us on TikTok",
      icon: Music2,
      url: "https://www.tiktok.com/@orellienz",
      color: "bg-black relative overflow-hidden",
      hover: "shadow-gray-500/20",
      isTikTok: true
    }
  ];

  return (
    <section className="py-20 bg-background border-t border-border/50">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${social.color} flex items-center justify-center gap-4 p-8 rounded-3xl text-white font-semibold text-lg transition-all hover:shadow-2xl ${social.hover}`}
            >
              {social.isTikTok && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0050]/20 to-[#00f2ea]/20 pointer-events-none" />
              )}
              <social.icon className="w-8 h-8 relative z-10" />
              <span className="relative z-10">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
