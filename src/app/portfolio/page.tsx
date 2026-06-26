"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brandVoice } from "@/config/brand";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { Container } from "@/components/layout/Container";
import { MarketingPortfolioSection } from "@/components/portfolio/MarketingPortfolioSection";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

function PortfolioCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        href={project.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-[0_2px_20px_rgba(30,90,152,0.06)] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(30,90,152,0.12)]"
      >
      <div className="relative h-48 overflow-hidden sm:h-56">
        {!imageError && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-deep-navy/70 via-deep-navy/10 to-transparent" />

        <div className="absolute left-5 top-5 z-10">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-3">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-white/80">
            {project.client}
          </p>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-heading text-lg font-bold text-ink transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-pale-blue px-2.5 py-1 text-[11px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-baseline gap-2 border-t border-border pt-4">
          <span
            className="font-mono text-2xl font-bold"
            style={{ color: project.accent }}
          >
            {project.metric}
          </span>
          <span className="text-xs text-slate">{project.metricLabel}</span>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="relative">
      <div className="fixed inset-0 -z-10 bg-surface">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-10%",
            right: "-8%",
            backgroundColor: "var(--pale-blue)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            left: "-5%",
            backgroundColor: "var(--brand-mint)",
            opacity: 0.4,
          }}
        />
      </div>

      <section className="relative overflow-hidden pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,90,152,0.06),transparent_70%)]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-overline mb-4">Case Studies & Portfolio</p>
            <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-wordmark">
              Projects that drive{" "}
              <span className="text-primary">measurable growth</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lead text-slate">
              Qualified leads, conversions, and revenue outcomes — strategy backed
              by real data across entrepreneurs and growth-stage businesses.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <Container className="relative z-10">
          <div className="mb-12">
            <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-widest text-deep-mint">
              Featured Work
            </p>
            <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
              Our Projects
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {portfolioProjects.map((project, index) => (
              <PortfolioCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <MarketingPortfolioSection />

      <BrandCTA
        title="Not sure where to start?"
        description={brandVoice.ctaConsultation}
      />
    </main>
  );
}
