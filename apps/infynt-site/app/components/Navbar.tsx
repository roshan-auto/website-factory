"use client";

import { useState } from "react";
import { Code2, ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between bg-surface-base/70 backdrop-blur-xl border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 aspect-square">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">infynt</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#services" className="hover:text-text-primary transition-colors duration-200">Services</a>
          <a href="#work" className="hover:text-text-primary transition-colors duration-200">Work</a>
          <a href="#process" className="hover:text-text-primary transition-colors duration-200">Process</a>
          <a href="#testimonials" className="hover:text-text-primary transition-colors duration-200">Testimonials</a>
          <a href="/shop" className="border border-accent/50 text-accent hover:bg-accent/10 rounded-lg px-4 py-2 transition-all duration-200 font-semibold">Shop</a>
          <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-sm">
            Start Your Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-text-primary hover:text-accent transition-colors" 
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-surface-base/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
          <a href="#services" onClick={closeMenu} className="text-2xl font-heading font-bold hover:text-accent transition-colors">Services</a>
          <a href="#work" onClick={closeMenu} className="text-2xl font-heading font-bold hover:text-accent transition-colors">Work</a>
          <a href="#process" onClick={closeMenu} className="text-2xl font-heading font-bold hover:text-accent transition-colors">Process</a>
          <a href="#testimonials" onClick={closeMenu} className="text-2xl font-heading font-bold hover:text-accent transition-colors">Testimonials</a>
          <a href="/shop" onClick={closeMenu} className="text-2xl font-heading font-bold text-accent hover:text-accent/80 transition-colors">Shop</a>
          <a href="#contact" onClick={closeMenu} className="btn-primary mt-4">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </>
  );
}
