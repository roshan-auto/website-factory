import React from "react";

export interface ContactSectionProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  phone?: string;
  email?: string;
  address?: string;
  businessHours?: React.ReactNode;
  contactNote?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function ContactSection({
  title,
  intro,
  phone,
  email,
  address,
  businessHours,
  contactNote,
  className = "",
  children,
}: ContactSectionProps) {
  return (
    <section className={`px-6 py-24 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6">{title}</h2>
          {intro && (
            <div className="text-lg opacity-70 leading-relaxed mb-12">
              {intro}
            </div>
          )}

          <div className="space-y-8">
            {phone && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Phone</h4>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-2xl font-semibold hover:opacity-70 transition-opacity">
                  {phone}
                </a>
              </div>
            )}
            
            {email && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Email</h4>
                <a href={`mailto:${email}`} className="text-xl font-medium hover:opacity-70 transition-opacity">
                  {email}
                </a>
              </div>
            )}
            
            {address && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Address</h4>
                <address className="text-lg not-italic opacity-80 whitespace-pre-line">
                  {address}
                </address>
              </div>
            )}
            
            {businessHours && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Business Hours</h4>
                <div className="text-lg opacity-80 whitespace-pre-line">
                  {businessHours}
                </div>
              </div>
            )}
          </div>
          
          {contactNote && (
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl text-sm opacity-80">
              {contactNote}
            </div>
          )}
        </div>
        
        {/* Render children (like app-specific forms) */}
        <div className="flex-1">
          {children || (
            <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl border border-slate-100 h-full min-h-[400px] flex items-center justify-center text-center text-slate-400">
              <p>App-specific contact form integration goes here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
