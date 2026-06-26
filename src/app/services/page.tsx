"use client";

import { type MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { brandVoice } from "@/config/brand";
import { serviceIconMap } from "@/config/service-icons";
import type { LucideIcon } from "lucide-react";
import {
  getServiceIconTheme,
  serviceIconNeedsBorder,
} from "@/config/service-icon-themes";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { BLOG_CARD_GRADIENT } from "@/data/blog-posts";
import { serviceHeroImages } from "@/data/service-images";

const services = [
  {
    title: "Brand Strategy",
    subtitle: "Positioning & Identity",
    description:
      "Positioning, identity, and messaging systems that differentiate you and build lasting authority.",
    iconKey: "palette",
    image: serviceHeroImages.branding,
    href: "/services/branding",
  },
  {
    title: "Website Design",
    subtitle: "Conversion-Focused",
    description:
      "Websites designed for qualified lead generation, authority, and seamless user experience.",
    iconKey: "globe",
    image: serviceHeroImages["web-development"],
    href: "/services/web-development",
  },
  {
    title: "SEO Optimization",
    subtitle: "Organic Growth",
    description:
      "Technical SEO, on-page strategy, and authority content that drives organic traffic.",
    iconKey: "search",
    image: serviceHeroImages.seo,
    href: "/services/seo",
  },
  {
    title: "Meta Ads",
    subtitle: "Paid Social",
    description:
      "Facebook and Instagram campaigns with precise targeting, creative, and optimization.",
    iconKey: "megaphone",
    image: serviceHeroImages["social-media"],
    href: "/services/social-media",
  },
  {
    title: "Google Ads",
    subtitle: "High-Intent Demand",
    description:
      "Search, display, and Performance Max campaigns that maximize ad spend ROI.",
    iconKey: "bar-chart-3",
    image: serviceHeroImages["digital-marketing"],
    href: "/services/digital-marketing",
  },
  {
    title: "Content & AEO",
    subtitle: "AI Search Visibility",
    description:
      "Content that builds authority plus AEO/GEO for AI-generated answers and results.",
    iconKey: "file-text",
    image: serviceHeroImages["content-marketing"],
    href: "/services/content-marketing",
  },
] as const;

function ServiceIcon({
  service,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  service: (typeof services)[number];
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const Icon = serviceIconMap[service.iconKey] as LucideIcon | undefined;
  const theme = getServiceIconTheme(service.iconKey);
  const isHovered = hoveredIndex === index;
  const isSibling =
    hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
  const isRightEdgeIcon = index >= services.length - 2;

  const rotations = [-3, 2, -1.5, 3, -2, 1.5];
  const baseRotate = rotations[index % rotations.length];

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isMobileLike =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (!isMobileLike) return;

    // Mobile/touch behavior: first tap shows hover state, second tap navigates.
    if (hoveredIndex !== index) {
      e.preventDefault();
      onHover(index);
    }
  };

  return (
    <Link
      href={service.href}
      className="relative flex flex-col items-center outline-none"
      onClick={handleClick}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        zIndex: isHovered ? 20 : 6 - index,
        marginLeft: index === 0 ? 0 : "clamp(-14px, -2vw, -8px)",
      }}
    >
      <motion.div
        animate={{
          y: isHovered ? -32 : 0,
          scale: isHovered ? 1.15 : isSibling ? 0.97 : 1,
          rotate: isHovered ? 0 : baseRotate,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="relative cursor-pointer"
      >
        <div
          className="rounded-3xl sm:rounded-[2rem] flex items-center justify-center transition-shadow duration-300"
          style={{
            width: "clamp(56px, 14.5vw, 170px)",
            height: "clamp(56px, 14.5vw, 170px)",
            backgroundColor: theme.bg,
            boxShadow: isHovered
              ? "0 24px 50px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.1)"
              : "0 6px 20px rgba(0,0,0,0.12)",
            border: serviceIconNeedsBorder(theme.bg)
              ? "1px solid var(--border)"
              : "none",
          }}
        >
          {Icon && (
          <Icon
            style={{
              width: "clamp(22px, 5.5vw, 56px)",
              height: "clamp(22px, 5.5vw, 56px)",
              color: theme.color,
            }}
            strokeWidth={1.5}
          />
          )}
        </div>
      </motion.div>

      {/* Info tooltip — appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute flex flex-col items-center text-center sm:left-1/2 sm:right-auto sm:-translate-x-1/2",
              isRightEdgeIcon
                ? "left-auto right-0 translate-x-0"
                : "left-1/2 right-auto -translate-x-1/2"
            )}
            style={{
              top: "calc(100% + 12px)",
              whiteSpace: "nowrap",
            }}
          >
            <div
              className="rounded-2xl px-5 py-3"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }}
            >
              <p
                className="font-heading font-bold"
                style={{ color: "#ffffff", fontSize: "0.9375rem" }}
              >
                {service.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8125rem" }}>
                {service.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ========== GRADIENT BACKGROUND ========== */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "var(--gradient-services-page)",
        }}
      >
        {/* Soft radial overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,158,128,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 80%, rgba(30,90,152,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 60%, rgba(30,90,152,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-36 pb-8 sm:pt-44 sm:pb-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-overline mb-4"
          >
            What We Do
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading font-bold"
            style={{
              color: "var(--wordmark)",
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            These are our services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1875rem)",
              color: "var(--text-secondary)",
              maxWidth: "42ch",
            }}
          >
            {brandVoice.servicesIntro}
          </motion.p>
        </div>
      </section>

      {/* ========== SERVICE ICONS GRID ========== */}
      <section className="relative pt-12 pb-44 sm:pt-16 sm:pb-56">
        <div className="mx-auto px-4 overflow-visible">
          {/* Single row of 6 icons — tightly packed, slightly rotated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center"
          >
            {services.map((service, i) => (
              <ServiceIcon
                key={service.title}
                service={service}
                index={i}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== SERVICES DETAIL SECTION ========== */}
      <section className="relative pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-heading font-bold"
              style={{ color: "var(--wordmark)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Everything you need to{" "}
              <span className="text-deep-mint">grow</span>
            </h2>
            <p
              className="mt-4 mx-auto leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "var(--text-secondary)", maxWidth: "48ch" }}
            >
              Each service is designed to work independently or together as a
              unified growth engine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="h-full"
              >
                <Link
                  href={service.href}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_8px_40px_rgba(30,90,152,0.12)] hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={cn(
                      "relative w-full h-44 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden",
                      `bg-linear-to-br ${BLOG_CARD_GRADIENT}`
                    )}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <span className="absolute bottom-4 left-4 z-10 inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium text-white backdrop-blur-sm">
                      {service.subtitle}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-ink leading-snug mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate leading-relaxed flex-1 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-border text-xs font-heading font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Explore
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BrandCTA
        title="Not sure where to start?"
        description="We'll identify your highest-impact growth channels and build a 90-day roadmap — strategy driven by real data, not guesswork."
      />
    </main>
  );
}
