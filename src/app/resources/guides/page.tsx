"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { brandVoice } from "@/config/brand";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { GuideCard } from "@/components/sections/resources/GuideCard";
import { GuideDetailModal } from "@/components/sections/resources/GuideDetailModal";
import { allGuides, type GuidePreview } from "@/data/guides";

const categories = [
  "All",
  ...Array.from(new Set(allGuides.map((g) => g.category))).sort(),
];

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<GuidePreview | null>(null);

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allGuides.filter((guide) => {
      const matchesCategory =
        activeCategory === "All" || guide.category === activeCategory;
      const matchesQuery =
        !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.excerpt.toLowerCase().includes(q) ||
        guide.category.toLowerCase().includes(q) ||
        guide.difficulty.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,90,152,0.06),transparent_70%)]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-overline mb-4">Guides & Playbooks</p>
            <h1 className="font-heading font-bold text-wordmark text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] tracking-tight">
              Step-by-step guides for{" "}
              <span className="text-primary">real results</span>
            </h1>
            <p className="mt-6 text-lead text-slate max-w-xl mx-auto">
              Practical playbooks for entrepreneurs and small teams — clear
              actions, no fluff, built to execute this week.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="relative py-12 md:py-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-deep-mint/5 blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-light/5 blur-[120px]" />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col gap-6 mb-10 md:mb-12">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
              <input
                type="search"
                placeholder="Search guides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border transition-shadow"
                aria-label="Search guides"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors",
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-white text-slate border border-border hover:text-ink hover:border-primary/30"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredGuides.length === 0 ? (
            <p className="text-center text-slate py-16">
              No guides match your search. Try a different keyword or category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredGuides.map((guide, i) => (
                <motion.div
                  key={guide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="h-full"
                >
                  <GuideCard
                    guide={guide}
                    onOpen={() => setSelectedGuide(guide)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <GuideDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />

      <BrandCTA
        title="Need help executing these playbooks?"
        description={brandVoice.ctaConsultation}
      />
    </>
  );
}
