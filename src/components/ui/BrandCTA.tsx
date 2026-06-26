"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { brandVoice } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { BookStrategyCallButton } from "@/components/ui/BookStrategyCallButton";

interface BrandCTAProps {
  title?: string;
  description?: string;
  className?: string;
}

/** §08 / §09 — Dark navy CTA block with mint + outline actions */
export function BrandCTA({
  title = brandVoice.ctaDarkTitle,
  description = brandVoice.ctaConsultation,
  className = "pb-24",
}: BrandCTAProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden surface-dark rounded-2xl px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <Image
            src={siteConfig.ctaBackgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div
            className="absolute inset-0 bg-linear-to-br from-deep-navy/72 via-deep-navy/65 to-deep-navy/58"
            aria-hidden
          />

          <div className="relative z-10">
            <h2 className="font-heading font-bold text-[clamp(1.75rem,4vw,2.75rem)] mb-4 leading-tight">
              {title}
            </h2>
            <p className="max-w-xl mx-auto mb-8 text-lead text-white/80">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 max-w-lg mx-auto">
              <BookStrategyCallButton variant="mint" size="lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
