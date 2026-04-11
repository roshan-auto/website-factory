import React from "react";

export interface TestimonialItem {
  id: string | number;
  quote: string;
  name: string;
  roleOrLocation?: string;
}

export interface TestimonialsSectionProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  testimonials: TestimonialItem[];
  className?: string;
}

export default function TestimonialsSection({
  title,
  intro,
  testimonials,
  className = "",
}: TestimonialsSectionProps) {
  return (
    <section className={`px-6 py-24 md:px-12 bg-slate-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">{title}</h2>
          {intro && (
            <div className="text-lg opacity-70 leading-relaxed">
              {intro}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <blockquote className="text-lg italic opacity-80 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex flex-col">
                <span className="font-bold">{testimonial.name}</span>
                {testimonial.roleOrLocation && (
                  <span className="text-sm opacity-60 mt-1">{testimonial.roleOrLocation}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
