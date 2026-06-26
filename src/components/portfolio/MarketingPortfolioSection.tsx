"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ExternalLink,
  Megaphone,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import {
  marketingPortfolioItems,
  type MarketingAdPreview,
  type MarketingPortfolioItem,
} from "@/data/marketing-portfolio";

const platformStyles: Record<
  MarketingAdPreview["platform"],
  { badge: string; dot: string }
> = {
  Meta: { badge: "bg-[#1877F2]/15 text-[#1877F2]", dot: "bg-[#1877F2]" },
  Google: { badge: "bg-[#EA4335]/12 text-[#C5221F]", dot: "bg-[#EA4335]" },
  LinkedIn: { badge: "bg-[#0A66C2]/15 text-[#0A66C2]", dot: "bg-[#0A66C2]" },
};

function AdPreviewCard({
  ad,
  accent,
}: {
  ad: MarketingAdPreview;
  accent: string;
}) {
  const style = platformStyles[ad.platform];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_2px_16px_rgba(30,90,152,0.06)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface/50">
        <span className={cn("h-2 w-2 rounded-full", style.dot)} />
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            style.badge,
          )}
        >
          {ad.platform} Ad
        </span>
        <span className="ml-auto text-[10px] font-medium text-slate">
          Sample creative
        </span>
      </div>

      <div
        className="relative min-h-[7.5rem] px-4 py-5 text-white"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 70%, #0d1f3c) 100%)`,
        }}
      >
        <p className="font-heading text-sm font-bold leading-snug sm:text-base">
          {ad.headline}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/85 line-clamp-3 sm:text-sm">
          {ad.body}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-[11px] text-slate">Sponsored</span>
        <span
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          {ad.cta}
        </span>
      </div>
    </div>
  );
}

function MarketingClientCard({
  item,
  index,
}: {
  item: MarketingPortfolioItem;
  index: number;
}) {
  const initials = item.client
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_2px_24px_rgba(30,90,152,0.06)]"
    >
      <div className="border-b border-border px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-heading text-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: item.accent }}
            >
              {initials || "AD"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-deep-mint">
                Marketing Portfolio
              </p>
              <h3 className="mt-1 font-heading text-xl font-bold text-ink sm:text-2xl break-words">
                {item.client}
              </h3>
              <p className="mt-1 text-sm text-slate">{item.industry}</p>
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors break-all"
              >
                {item.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
            {item.channels.map((channel) => (
              <span
                key={channel}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: item.accentSoft,
                  color: item.accent,
                }}
              >
                {channel}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate sm:text-base">
          {item.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[1fr_minmax(0,1.1fr)] lg:gap-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" />
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
              Campaign Creatives
            </h4>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {item.adPreviews.map((ad) => (
              <AdPreviewCard key={ad.headline} ad={ad} accent={item.accent} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
              Campaign Highlights
            </h4>
            <span className="rounded-full bg-pale-blue px-2 py-0.5 text-[10px] font-medium text-primary">
              Sample metrics
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 sm:gap-4">
            {item.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-surface/60 px-4 py-4"
              >
                <p
                  className="font-mono text-2xl font-bold"
                  style={{ color: item.accent }}
                >
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-slate leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-surface/40 px-4 py-4">
            <div className="flex items-start gap-3">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-deep-mint" />
              <div>
                <p className="text-sm font-semibold text-ink">
                  What we delivered
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  Ad concepting, audience segmentation, campaign setup, and
                  performance reporting — dummy figures shown until live case
                  study data is finalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function MarketingPortfolioSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/70 bg-surface/40 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-deep-mint/5 blur-[100px]" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-primary-light/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-widest text-deep-mint">
            Digital Marketing
          </p>
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
            Marketing &amp; Ads Portfolio
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate sm:text-base">
            Paid campaigns, creatives, and demand generation work for education
            and enterprise brands. Sample ad concepts and placeholder metrics
            below — full case studies coming soon.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10">
          {marketingPortfolioItems.map((item, index) => (
            <MarketingClientCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
