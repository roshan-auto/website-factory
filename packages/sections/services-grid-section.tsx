import React from "react";

export interface ServiceItem {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ServicesGridSectionProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  services: ServiceItem[];
  className?: string;
}

export default function ServicesGridSection({
  title,
  intro,
  services,
  className = "",
}: ServicesGridSectionProps) {
  return (
    <section className={`px-6 py-24 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4">{title}</h2>
            {intro && (
              <div className="text-lg opacity-70 leading-relaxed">
                {intro}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
              {service.icon && (
                <div className="mb-6 text-blue-700">
                  {service.icon}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="opacity-70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
