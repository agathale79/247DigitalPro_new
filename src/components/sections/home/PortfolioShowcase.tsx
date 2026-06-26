"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { portfolioHighlights, type PortfolioItem } from "@/data/portfolio";

export function PortfolioShowcase() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          overline="Our Work"
          title="Portfolio & Results"
          subtitle="Real projects, real results. See how we've helped businesses grow through technology and marketing."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {portfolioHighlights.map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            href="/portfolio"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Full Portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(item.image) && !imageError;

  const cardContent = (
    <>
      <div
        className={`relative h-44 overflow-hidden ${
          showImage ? "" : `bg-linear-to-br ${item.gradient}`
        }`}
      >
        {showImage && (
          <Image
            src={item.image!}
            alt={item.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-deep-navy/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
          <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {item.category}
          </span>
          {item.href && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-1.5 font-heading text-base font-semibold text-ink transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate">
          {item.description}
        </p>

        <div className="flex items-baseline gap-2 border-t border-border pt-3">
          <span className="font-mono text-xl font-medium text-primary">
            {item.metric}
          </span>
          <span className="text-xs text-slate">{item.metricLabel}</span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {item.href ? (
        <Link
          href={item.href}
          className="group block overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}
