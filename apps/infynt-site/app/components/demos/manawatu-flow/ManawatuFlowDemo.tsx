'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ManawatuFlowDemo() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ── Portfolio Header ── */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
            Portfolio Demo
          </Badge>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Manawatū Flow Plumbing & Drainage
          </span>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Infynt
          </Button>
        </Link>
      </div>

      {/* ── Demo Hero Placeholder ── */}
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-blue-200">
          <Droplets className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Manawatū Flow <span className="text-blue-600">Plumbing</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium local plumbing website demo for Palmerston North, New Zealand. 
          Expert solutions for residential and commercial maintenance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">
            <MapPin className="w-4 h-4 text-blue-500" />
            Palmerston North
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            Certified Professionals
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-lg mx-auto">
          <h3 className="font-bold text-slate-900 mb-2">Design in Progress</h3>
          <p className="text-sm text-slate-500 mb-6">
            We are currently building this high-performance demo to showcase boutique design patterns for service-based businesses.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-6 h-auto text-lg font-bold shadow-lg shadow-blue-200">
            Full Demo Coming Soon
          </Button>
        </div>
      </main>

      {/* ── Footer Info ── */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
          Developed by Infynt Studio &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
