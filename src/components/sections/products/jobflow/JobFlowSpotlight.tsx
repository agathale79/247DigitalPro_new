"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { jobflowMeta } from "@/data/jobflow";

/** Featured JobFlow banner for the Products page and the home product section. */
export function JobFlowSpotlight({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link
        href="/products/jobflow/"
        className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl surface-dark bg-deep-navy px-7 py-8 transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--brand-mint)] sm:px-10 md:flex-row md:items-center md:justify-between"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-light/30"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <span className="mb-3 inline-block rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold text-deep-navy">
            New · Featured product
          </span>
          <h3 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight">
            {jobflowMeta.name}: {jobflowMeta.tagline}
          </h3>
          <p className="mt-2 text-white/75">
            Lead capture, follow-ups, scheduling, and stage-by-stage production tracking for service businesses.
          </p>
        </div>
        <span className="relative inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-lg bg-brand-mint px-6 py-3 font-heading font-semibold text-deep-navy transition group-hover:brightness-95 md:self-center">
          Explore {jobflowMeta.name}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </Link>
    </motion.div>
  );
}
