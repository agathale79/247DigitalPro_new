"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const INTRO_IMAGE =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80";

function WavyAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M0 52 C 40 28, 80 76, 120 48 S 200 20, 280 44"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M0 68 C 50 44, 90 82, 140 58 S 220 36, 280 60"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function ProductPlatformsIntro() {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-surface overflow-hidden">
      <Container>
        <div className="relative lg:min-h-88 xl:min-h-96">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative z-10 bg-brand-mint/55 border border-mid-mint/25 rounded-3xl sm:rounded-4xl px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 lg:max-w-[58%] xl:max-w-[56%]"
          >
            <p className="text-overline mb-4">Products & Platforms</p>
            <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] tracking-tight">
              Our Product Ecosystem
            </h2>
            <p className="mt-5 text-base sm:text-lead text-slate leading-relaxed max-w-xl">
              Tools and platforms that support your marketing systems — from lead
              capture to reporting and optimization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative mt-8 mx-auto w-full max-w-md lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(44%,30rem)] xl:w-[min(42%,34rem)] lg:max-w-none z-20"
          >
            <div className="relative aspect-5/3 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(13,31,60,0.22)] border border-white/10">
              <Image
                src={INTRO_IMAGE}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 34rem"
              />
            </div>
            <WavyAccent className="absolute -bottom-2 left-[-12%] w-[112%] h-16 pointer-events-none hidden sm:block" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
