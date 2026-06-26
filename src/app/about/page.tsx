"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  BarChart3,
  Target,
  Eye,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { brandVoice } from "@/config/brand";
import { siteConfig } from "@/config/site";

const vision =
  "A world where every small business owner has access to enterprise-grade marketing strategy and execution, delivered with transparency and accountability.";

const brandValues =
  "Reliability. Transparency. ROI-focus. We are a strategic partner, not just a service provider — every engagement is built around qualified leads, conversions, and revenue outcomes.";

const brandPersonality =
  "We're not a vendor — we're an invested partner. Tone is collaborative, not transactional. We use \"we\" and \"together\" often.";

const coreValues = [
  {
    icon: Shield,
    title: "Reliability",
    description:
      "A strategic partner you can count on — consistent delivery, clear accountability, and systems built to last.",
  },
  {
    icon: Target,
    title: "Transparency",
    description:
      "Open communication at every stage — you always know what we are doing, why, and how it ties to your goals.",
  },
  {
    icon: BarChart3,
    title: "ROI-Focus",
    description:
      "Every engagement centers on qualified leads, conversions, and revenue outcomes — not vanity metrics.",
  },
];

function StoryCards() {
  return (
    <section
      className="relative pt-8 pb-20 md:pt-12 md:pb-32"
      style={{ background: "var(--gradient-story)" }}
    >
      <div className="mx-auto max-w-3xl lg:max-w-[780px] px-4 flex flex-col gap-6">
        {/* Who We Are */}
        <div
          className="rounded-3xl p-8 md:p-10 lg:p-12 shadow-lg border border-border bg-white w-full"
        >
          <h2
            className="font-heading font-bold mb-5 md:mb-6 italic tracking-tight text-wordmark"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Who We Are
          </h2>
          <div className="space-y-4 md:space-y-5">
            <p className="text-lead text-slate leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="font-heading font-semibold leading-snug italic text-wordmark text-lg">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
          </div>
          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border">
            <p className="font-heading font-semibold text-sm text-primary">
              {siteConfig.name}
            </p>
            <p className="text-sm text-slate mt-1">
              Brand Strategy &bull; SEO &bull; Meta Ads &bull; Google Ads &bull; AEO
              &bull; GEO
            </p>
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 md:p-7 shadow-lg border border-border bg-white">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-pale-blue">
              <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-[1.375rem] text-wordmark mb-2 md:mb-3">
              Mission
            </h3>
            <p className="text-base leading-relaxed text-slate">
              {siteConfig.mission}
            </p>
          </div>

          <div className="rounded-2xl p-6 md:p-7 shadow-lg border border-border bg-white">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-pale-blue">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-[1.375rem] text-wordmark mb-2 md:mb-3">
              Vision
            </h3>
            <p className="text-base leading-relaxed text-slate">{vision}</p>
          </div>
        </div>

        {/* Values + Brand Personality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 md:p-7 shadow-lg h-full border border-border bg-white">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-pale-blue">
              <HeartHandshake className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-[1.375rem] text-wordmark mb-2 md:mb-3">
              Values
            </h3>
            <p className="text-base leading-relaxed text-slate">{brandValues}</p>
          </div>

          <div className="rounded-2xl p-6 md:p-7 shadow-lg h-full border border-border bg-white">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-pale-blue">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-[1.375rem] text-wordmark mb-2 md:mb-3">
              Brand Personality
            </h3>
            <p className="text-base leading-relaxed text-slate">
              {brandPersonality}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="relative">
      {/* ========== HERO ========== */}
      <section
        className="relative pt-36 pb-8 sm:pt-44 sm:pb-10 overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-overline mb-4"
          >
            About Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading font-bold"
            style={{
              color: "var(--wordmark)",
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            The team behind{" "}
            <span className="text-primary">247</span>{" "}
            <span style={{ color: "var(--deep-mint)" }}>Digital</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1875rem)",
              color: "var(--text-secondary)",
              maxWidth: "44ch",
            }}
          >
            {siteConfig.description}
          </motion.p>
        </div>

        {/* Subtle decorative circles */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, top: "-15%", right: "-8%",
            backgroundColor: "color-mix(in srgb, var(--primary) 6%, transparent)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300, bottom: "-10%", left: "-5%",
            backgroundColor: "color-mix(in srgb, var(--deep-mint) 6%, transparent)",
          }}
        />
      </section>

      {/* ========== STORY + MISSION + VISION CARDS ========== */}
      <StoryCards />

      {/* ========== VALUES ========== */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-overline mb-3">Brand Foundation</p>
            <h2
              className="font-heading font-bold"
              style={{ color: "var(--wordmark)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-2xl p-5 sm:p-7 bg-white border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-pale-blue">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3
                    className="font-heading font-bold mb-2"
                    style={{ fontSize: "1.125rem", color: "var(--wordmark)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <BrandCTA
        title={brandVoice.ctaDarkTitle}
        description={brandVoice.ctaConsultation}
        className="py-20 md:py-24"
      />
    </main>
  );
}
