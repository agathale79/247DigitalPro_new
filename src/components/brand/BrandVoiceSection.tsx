"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  brandAvoidThis,
  brandToneIntro,
  brandTonePillars,
  brandWriteLikeThis,
} from "@/config/brand";
import { cn } from "@/lib/cn";

const pillarSurfaceClass = {
  pale: "bg-surface border-cloud",
  mint: "bg-brand-mint/50 border-brand-mint",
} as const;

export function BrandVoiceSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-overline mb-3">Brand Voice</p>
          <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
            Tone of Voice
          </h2>
          <div className="mt-5 max-w-2xl mx-auto space-y-3">
            {brandToneIntro.map((line) => (
              <p key={line} className="text-lead text-slate leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {brandTonePillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className={cn(
                "rounded-2xl p-6 md:p-7 border",
                pillarSurfaceClass[pillar.surface]
              )}
            >
              <span className="text-2xl mb-3 block" aria-hidden>
                {pillar.emoji}
              </span>
              <h3 className="font-heading font-bold text-lg text-wordmark mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-deep-mint/25 bg-brand-mint/35 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 bg-brand-mint/80 border-b border-deep-mint/20">
              <Check className="w-5 h-5 text-deep-mint shrink-0" strokeWidth={2.5} />
              <h3 className="font-heading font-bold text-deep-navy text-sm uppercase tracking-wide">
                Write Like This
              </h3>
            </div>
            <ul className="p-5 md:p-6 space-y-4">
              {brandWriteLikeThis.map((line) => (
                <li
                  key={line}
                  className="text-sm text-ink leading-relaxed pl-4 border-l-2 border-deep-mint"
                >
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-2xl border border-cloud bg-surface overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 bg-pale-blue/80 border-b border-cloud">
              <X className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
              <h3 className="font-heading font-bold text-wordmark text-sm uppercase tracking-wide">
                Avoid This
              </h3>
            </div>
            <ul className="p-5 md:p-6 space-y-4">
              {brandAvoidThis.map((line) => (
                <li
                  key={line}
                  className="text-sm text-slate leading-relaxed pl-4 border-l-2 border-cloud line-through decoration-slate/40"
                >
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
