"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Calculator,
  ClipboardList,
  FileText,
  Layout,
  Settings,
  Check,
  ArrowRight,
} from "lucide-react";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { Button } from "@/components/ui/Button";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";
import { brandVoice } from "@/config/brand";
import { products, type ProductItem } from "@/data/products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  calculator: Calculator,
  "clipboard-list": ClipboardList,
  "file-text": FileText,
  layout: Layout,
  settings: Settings,
};

const cardThemes = [
  {
    bg: "#1e5a98",
    text: "#ffffff",
    sub: "rgba(255,255,255,0.8)",
    iconBg: "rgba(255,255,255,0.15)",
    size: "large" as const,
  },
  {
    bg: "#ffffff",
    text: "#0f1e30",
    sub: "#4e6580",
    iconBg: "#d6e8f8",
    size: "small" as const,
  },
  {
    bg: "#1a9e80",
    text: "#ffffff",
    sub: "rgba(255,255,255,0.82)",
    iconBg: "rgba(255,255,255,0.18)",
    size: "small" as const,
  },
  {
    bg: "#0d1f3c",
    text: "#ffffff",
    sub: "rgba(255,255,255,0.8)",
    iconBg: "rgba(255,255,255,0.12)",
    size: "large" as const,
  },
  {
    bg: "#d1f5ee",
    text: "#0d1f3c",
    sub: "#4e6580",
    iconBg: "rgba(30,90,152,0.12)",
    size: "large" as const,
  },
  {
    bg: "#f3f7fc",
    text: "#0f1e30",
    sub: "#4e6580",
    iconBg: "#d1f5ee",
    size: "small" as const,
  },
];

function ProductCard({
  product,
  theme,
  index,
  onRequestDemo,
}: {
  product: ProductItem;
  theme: (typeof cardThemes)[number];
  index: number;
  onRequestDemo: (product: ProductItem) => void;
}) {
  const Icon = iconMap[product.icon];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: theme.bg,
        border:
          theme.bg === "#ffffff" || theme.bg === "#f3f7fc"
            ? "1px solid var(--border)"
            : "none",
      }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12">
        <div>
          {Icon && (
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
              style={{ backgroundColor: theme.iconBg }}
            >
              <span style={{ color: theme.text }}>
                <Icon className="w-7 h-7" />
              </span>
            </div>
          )}
          <h3
            className="font-heading font-bold mb-3"
            style={{
              color: theme.text,
              fontSize: theme.size === "large" ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.25rem, 2vw, 1.5rem)",
            }}
          >
            {product.title}
          </h3>
          <p
            className="leading-relaxed mb-7"
            style={{
              color: theme.sub,
              fontSize: theme.size === "large" ? "1.0625rem" : "0.9375rem",
              maxWidth: "32ch",
            }}
          >
            {product.description}
          </p>
        </div>

        <div>
          <ul className="space-y-2.5 mb-7">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5"
                style={{ color: theme.sub, fontSize: "0.9375rem" }}
              >
                <span style={{ color: theme.text }}><Check className="w-4 h-4 shrink-0" /></span>
                {feature}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onRequestDemo(product)}
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm group/btn transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
            style={{ color: theme.text }}
          >
            Request demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Decorative shapes */}
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-[0.07]"
        style={{ backgroundColor: theme.text }}
      />
      <div
        className="absolute -top-8 -left-8 w-24 h-24 rounded-full opacity-[0.05]"
        style={{ backgroundColor: theme.text }}
      />
    </motion.div>
  );
}

function ProductRow({
  items,
  rowIndex,
  onRequestDemo,
}: {
  items: { product: ProductItem; theme: (typeof cardThemes)[number]; globalIndex: number }[];
  rowIndex: number;
  onRequestDemo: (product: ProductItem) => void;
}) {
  const isReversed = rowIndex % 2 === 1;
  const [first, second] = items;

  const firstIsLarge = first.theme.size === "large";

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
      style={{
        direction: isReversed ? "rtl" : "ltr",
      }}
    >
      {/* Larger card */}
      <div
        className={firstIsLarge ? "lg:col-span-7" : "lg:col-span-5"}
        style={{ direction: "ltr" }}
      >
        <ProductCard
          product={first.product}
          theme={first.theme}
          index={first.globalIndex}
          onRequestDemo={onRequestDemo}
        />
      </div>

      {/* Smaller card — offset vertically for stagger */}
      {second && (
        <div
          className={firstIsLarge ? "lg:col-span-5 lg:mt-24" : "lg:col-span-7 lg:mt-24"}
          style={{ direction: "ltr" }}
        >
          <ProductCard
            product={second.product}
            theme={second.theme}
            index={second.globalIndex}
            onRequestDemo={onRequestDemo}
          />
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const { openStrategyCall } = useStrategyCall();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const handleRequestDemo = (product: ProductItem) => {
    openStrategyCall({
      overline: product.title,
      title: "Demo Request",
      submitLabel: "Submit Request",
      selectedProduct: product.title,
      successMessage: `We'll reach out shortly to schedule your ${product.title} demo.`,
    });
  };

  const rows: { product: ProductItem; theme: (typeof cardThemes)[number]; globalIndex: number }[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    const row = [{ product: products[i], theme: cardThemes[i], globalIndex: i }];
    if (products[i + 1]) {
      row.push({ product: products[i + 1], theme: cardThemes[i + 1], globalIndex: i + 1 });
    }
    rows.push(row);
  }

  return (
    <main ref={sectionRef} className="relative">
      {/* Fixed background — stays in place while cards scroll */}
      <div className="fixed inset-0 -z-10 bg-surface">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
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
        </motion.div>
      </div>

      {/* ========== HERO (scrolls normally) ========== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-overline mb-4"
              >
                Products &amp; Platforms
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading font-bold"
                style={{
                  color: "var(--wordmark)",
                  fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                }}
              >
                Tools built to{" "}
                <span className="text-primary">scale</span> your
                <br className="hidden sm:block" /> business{" "}
                <span style={{ color: "var(--deep-mint)" }}>effortlessly</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 leading-relaxed max-w-2xl"
                style={{ fontSize: "1.1875rem", color: "var(--text-secondary)" }}
              >
                A suite of interconnected SaaS products designed to power every
                aspect of your business — from lead capture to final invoice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button
                  href="#products"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Products
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Request a Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 flex flex-wrap gap-10 sm:gap-12"
              >
                {[
                  { value: "6", label: "Products" },
                  { value: "500+", label: "Businesses Powered" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-heading font-bold"
                      style={{ fontSize: "2rem", color: "var(--wordmark)" }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_60px_rgba(30,90,152,0.14)] sm:rounded-3xl">
                <Image
                  src="/images/Product page.png"
                  alt="Business professional reviewing analytics dashboard on laptop"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STICKY HEADING + SCROLLABLE CARDS ========== */}
      <section id="products" className="relative lg:grid lg:grid-cols-12 lg:gap-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
        {/* Sticky heading — pinned on top (mobile) / left (desktop) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div
            className="sticky z-20"
            style={{ top: 0 }}
          >
            <div className="pt-6 pb-5 lg:pt-32 lg:pb-0 bg-surface">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading font-bold"
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--wordmark)",
                }}
              >
                Our{" "}
                <span className="text-primary">Products</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 leading-relaxed"
                style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "28ch" }}
              >
                Six interconnected tools that power your entire business workflow.
              </motion.p>
            </div>
            {/* Fade-out edge on mobile so cards appear smoothly underneath */}
            <div
              className="h-6 lg:hidden"
              style={{
                background: "linear-gradient(to bottom, var(--surface), transparent)",
              }}
            />
          </div>
        </div>

        {/* Scrollable cards — alternating left / right rows */}
        <div className="lg:col-span-8 xl:col-span-9 pt-4 lg:pt-0">
          <div className="flex flex-col gap-12 lg:gap-16">
            {rows.map((rowItems, rowIdx) => (
              <ProductRow
                key={rowIdx}
                items={rowItems}
                rowIndex={rowIdx}
                onRequestDemo={handleRequestDemo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <BrandCTA
        title="Ready to unify your marketing systems?"
        description={brandVoice.ctaConsultation}
      />
    </main>
  );
}
