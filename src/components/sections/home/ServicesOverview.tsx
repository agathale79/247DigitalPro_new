"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandVoice } from "@/config/brand";
import { aeoGeoFeature, servicesOverview } from "@/data/services";
import { ServicesCurvedCarousel } from "./ServicesCurvedCarousel";

function AeoGeoFeatureCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`mt-5 md:mt-6 ${className ?? ""}`}
    >
      <Link
        href={aeoGeoFeature.href}
        className="surface-dark group flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-xl p-6 sm:p-8 bg-deep-navy border border-deep-navy hover:shadow-[0_12px_40px_rgba(13,31,60,0.25)] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-lg bg-brand-mint flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-deep-navy" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-semibold text-lg sm:text-xl leading-snug mb-3 group-hover:text-brand-mint transition-colors">
            {aeoGeoFeature.title}
          </h3>
          <p className="text-sm sm:text-base text-on-dark/85 leading-relaxed">
            {aeoGeoFeature.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-surface/80">
      <Container>
        <SectionHeading
          overline="Our Services"
          title="Our Services Offering"
          subtitle={brandVoice.servicesIntro}
        />
      </Container>

      <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:mt-12 sm:px-6 mb-12 sm:mb-14 lg:mb-20 lg:px-8">
        <ServicesCurvedCarousel services={servicesOverview} />
      </div>

      <Container>
        <AeoGeoFeatureCard />
      </Container>
    </section>
  );
}
