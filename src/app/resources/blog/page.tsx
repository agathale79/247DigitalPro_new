"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { brandVoice } from "@/config/brand";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { BlogCard } from "@/components/sections/resources/BlogCard";
import { allPosts } from "@/data/blog-posts";

const categories = [
  "All",
  ...Array.from(new Set(allPosts.map((p) => p.category))).sort(),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
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
            <p className="text-overline mb-4">Blog & Insights</p>
            <h1 className="font-heading font-bold text-wordmark text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] tracking-tight">
              Ideas that drive{" "}
              <span className="text-primary">measurable growth</span>
            </h1>
            <p className="mt-6 text-lead text-slate max-w-xl mx-auto">
              Industry insights, AI trends, SEO strategies, and actionable
              guides from the 247 Digital Pro team.
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
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-sm text-ink placeholder:text-slate/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border transition-shadow"
                aria-label="Search blog articles"
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

          {filteredPosts.length === 0 ? (
            <p className="text-center text-slate py-16">
              No articles match your search. Try a different keyword or category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <BrandCTA
        title="Stay ahead of AI search and measurable growth"
        description={brandVoice.ctaConsultation}
      />
    </>
  );
}
