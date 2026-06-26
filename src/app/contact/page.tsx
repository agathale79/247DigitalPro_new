"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { brandServiceOptions, brandVoice } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { socials } from "@/config/socials";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { Button } from "@/components/ui/Button";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "var(--primary)",
    bg: "var(--pale-blue)",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneTel}`,
    color: "var(--deep-mint)",
    bg: "var(--brand-mint)",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "New York, NY, USA",
    href: "#",
    color: "var(--wordmark)",
    bg: "var(--brand-mint)",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 9AM – 6PM EST",
    href: "#",
    color: "var(--primary-light)",
    bg: "var(--pale-blue)",
  },
];

const budgetRanges = [
  "Under $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K+",
  "Not sure yet",
];

export default function ContactPage() {
  const { openStrategyCall } = useStrategyCall();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-pale-blue/60 via-white to-brand-mint/35 pt-20 pb-14 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,90,152,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,158,128,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-deep-mint/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-overline mb-4">Get in Touch</p>
            <h1
              className="font-heading font-bold text-wordmark leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}
            >
              Let&apos;s replace guesswork with{" "}
              <span className="text-primary">measurable growth</span>
            </h1>
            <p className="mt-5 text-lead text-slate max-w-xl mx-auto">
              {brandVoice.ctaConsultation}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="relative -mt-2 pb-12 md:pb-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="text-xs font-semibold text-slate uppercase tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-ink leading-snug">
                  {item.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section id="consultation" className="py-16 md:py-24 bg-surface scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form — takes 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 md:p-10 shadow-[0_2px_20px_rgba(30,90,152,0.06)]">
                <h2 className="font-heading font-bold text-ink text-xl sm:text-2xl mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-slate mb-8">
                  Fill out the form and we&apos;ll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-mint/40 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-8 h-8 text-deep-mint" />
                    </div>
                    <h3 className="font-heading font-bold text-ink text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-slate max-w-sm">
                      Thank you for reaching out. Our team will review your
                      message and get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
                      }}
                      className="mt-6 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-ink mb-1.5">
                          Full Name <span className="text-deep-mint">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
                          Email Address <span className="text-deep-mint">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-ink mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={siteConfig.phone}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-xs font-semibold text-ink mb-1.5">
                          Company Name
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Service + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-xs font-semibold text-ink mb-1.5">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all appearance-none"
                        >
                          <option value="">Select a service</option>
                          {brandServiceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-xs font-semibold text-ink mb-1.5">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all appearance-none"
                        >
                          <option value="">Select budget</option>
                          {budgetRanges.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-ink mb-1.5">
                        Your Message <span className="text-deep-mint">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar — takes 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-[0_2px_20px_rgba(30,90,152,0.06)]">
                <h3 className="font-heading font-bold text-ink text-lg mb-5">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => openStrategyCall()}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-brand-mint/40 hover:bg-brand-mint border border-transparent hover:border-deep-mint/20 transition-all duration-300 w-full text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-deep-mint flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{brandVoice.ctaPrimary}</p>
                      <p className="text-xs text-slate">30-min strategy session</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-deep-mint ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-brand-mint hover:bg-brand-mint/80 border border-transparent hover:border-mid-mint/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-mid-mint flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Email Directly</p>
                      <p className="text-xs text-slate">{siteConfig.email}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-mid-mint ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              {/* Why Work With Us */}
              <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-[0_2px_20px_rgba(30,90,152,0.06)]">
                <h3 className="font-heading font-bold text-ink text-lg mb-5">
                  Why Work With Us
                </h3>
                <ul className="space-y-4">
                  {[
                    "Free initial consultation & strategy call",
                    "Dedicated project manager assigned",
                    "Transparent pricing, no hidden fees",
                    "24/7 support during active projects",
                    "100+ successful projects delivered",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-deep-mint mt-0.5 shrink-0" />
                      <span className="text-sm text-slate leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-[0_2px_20px_rgba(30,90,152,0.06)]">
                <h3 className="font-heading font-bold text-ink text-lg mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-xl bg-pale-blue flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BrandCTA />
    </main>
  );
}
