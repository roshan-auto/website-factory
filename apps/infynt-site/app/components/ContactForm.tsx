"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail } from "../actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      setMessage(result.success);
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-status-green/10 text-status-green flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-2xl mb-2">Message Sent!</h3>
        <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
          {message}
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 text-accent hover:text-accent-hover font-semibold transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-8 md:p-12">
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@company.com"
              className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">
            Project Type
          </label>
          <div className="relative">
            <select 
              name="subject"
              className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
            >
              <option>Website Design</option>
              <option>E-Commerce Store</option>
              <option>Client Platform</option>
              <option>Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 block">
            Tell Us About Your Project
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="A brief description of what you need..."
            className="w-full bg-surface-base/60 border border-border-subtle rounded-xl px-5 py-4 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
          />
        </div>
        
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-wait"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
