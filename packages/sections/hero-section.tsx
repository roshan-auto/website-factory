import React from "react";

export interface HeroSectionProps {
  headline: React.ReactNode;
  subheadline: React.ReactNode;
  primaryCta: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  eyebrow?: React.ReactNode;
  trustNote?: React.ReactNode;
  className?: string;
}

export default function HeroSection({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  eyebrow,
  trustNote,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`relative px-6 py-20 md:px-12 md:py-32 overflow-hidden ${className}`}>
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8 bg-blue-100 text-blue-800">
            {eyebrow}
          </div>
        )}
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter">
          {headline}
        </h1>
        
        <div className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {primaryCta.href ? (
            <a href={primaryCta.href} className="w-full sm:w-auto bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all text-center">
              {primaryCta.text}
            </a>
          ) : (
            <button onClick={primaryCta.onClick} className="w-full sm:w-auto bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all text-center">
              {primaryCta.text}
            </button>
          )}

          {secondaryCta && (
            secondaryCta.href ? (
              <a href={secondaryCta.href} className="w-full sm:w-auto bg-transparent border-2 border-slate-200 text-slate-800 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-400 transition-all text-center">
                {secondaryCta.text}
              </a>
            ) : (
              <button onClick={secondaryCta.onClick} className="w-full sm:w-auto bg-transparent border-2 border-slate-200 text-slate-800 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-400 transition-all text-center">
                {secondaryCta.text}
              </button>
            )
          )}
        </div>

        {trustNote && (
          <div className="mt-8 text-sm opacity-70 font-medium">
            {trustNote}
          </div>
        )}
      </div>
    </section>
  );
}
