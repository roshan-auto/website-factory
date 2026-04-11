import React from "react";

export interface CtaBannerSectionProps {
  heading: React.ReactNode;
  supportingText?: React.ReactNode;
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
  className?: string;
}

export default function CtaBannerSection({
  heading,
  supportingText,
  primaryCta,
  secondaryCta,
  className = "",
}: CtaBannerSectionProps) {
  return (
    <section className={`px-6 py-20 md:px-12 ${className}`}>
      <div className="max-w-5xl mx-auto bg-blue-900 text-white rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            {heading}
          </h2>
          {supportingText && (
            <p className="text-lg opacity-80 leading-relaxed max-w-xl">
              {supportingText}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
          {primaryCta.href ? (
            <a href={primaryCta.href} className="w-full sm:w-auto bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all text-center">
              {primaryCta.text}
            </a>
          ) : (
            <button onClick={primaryCta.onClick} className="w-full sm:w-auto bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all text-center">
              {primaryCta.text}
            </button>
          )}

          {secondaryCta && (
            secondaryCta.href ? (
              <a href={secondaryCta.href} className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
                {secondaryCta.text}
              </a>
            ) : (
              <button onClick={secondaryCta.onClick} className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
                {secondaryCta.text}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
