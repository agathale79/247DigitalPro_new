"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { brandVoice } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { BookStrategyCallButton } from "@/components/ui/BookStrategyCallButton";
import { getServiceBySlug } from "@/data/service-details";
import type { ServicePanel } from "@/types/service-detail";

/** Fixed header height — sticky panel area sits below this */
const HEADER_OFFSET_PX = 72;

interface ServicePageLayoutProps {
  slug: string;
}

function ServicePanelCard({
  panel,
  accent,
  accentMuted,
  index,
  compact = false,
}: {
  panel: ServicePanel;
  accent: string;
  accentMuted: string;
  index: number;
  compact?: boolean;
}) {
  const isCta = panel.id === "cta";
  const rotation = compact ? 0 : index % 2 === 0 ? -1.25 : 1.25;

  const card = (
    <div
      className={cn(
        "relative rounded-2xl sm:rounded-3xl flex flex-col",
        compact
          ? "h-full max-h-full p-5 sm:p-8"
          : "min-h-[420px] sm:min-h-[460px] p-7 sm:p-8",
        isCta && "justify-between"
      )}
      style={{
        backgroundColor: isCta ? "var(--deep-navy)" : "#ffffff",
        border: isCta ? "none" : "1px solid var(--border-light)",
        boxShadow: isCta
          ? "0 24px 60px rgba(28,43,58,0.2)"
          : "0 8px 32px rgba(30,90,152,0.08)",
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
      }}
    >
      {!isCta && (
        <div
          className="absolute top-6 right-6 w-10 h-10 rounded-full opacity-60"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accentMuted})`,
          }}
        />
      )}

      <div>
        {panel.subtitle && (
          <p
            className="font-heading font-semibold uppercase mb-3"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: accent,
            }}
          >
            {panel.subtitle}
          </p>
        )}
        <h3
          className="font-heading font-bold leading-tight"
          style={{
            fontSize: compact
              ? "clamp(1.2rem, 2vw, 1.5rem)"
              : "clamp(1.35rem, 2.5vw, 1.75rem)",
            color: isCta ? "#ffffff" : "var(--wordmark)",
            letterSpacing: "-0.02em",
          }}
        >
          {panel.title}
        </h3>
        {panel.body && (
          <p
            className="mt-3 leading-relaxed line-clamp-4"
            style={{
              fontSize: "0.9375rem",
              color: isCta ? "rgba(255,255,255,0.78)" : "#4a6075",
            }}
          >
            {panel.body}
          </p>
        )}
      </div>

      {panel.bullets && panel.bullets.length > 0 && (
        <ul className="mt-5 space-y-3 flex-1 overflow-y-auto">
          {panel.bullets.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              <div>
                <p
                  className="font-heading font-semibold"
                  style={{
                    fontSize: "0.875rem",
                    color: isCta ? "#fff" : "var(--wordmark)",
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-0.5 leading-relaxed"
                  style={{
                    fontSize: "0.8125rem",
                    color: isCta ? "rgba(255,255,255,0.7)" : "#4a6075",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {panel.list && panel.list.length > 0 && (
        <ul className="mt-5 space-y-2 flex-1 overflow-y-auto">
          {panel.list.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5"
              style={{
                fontSize: "0.8125rem",
                color: isCta ? "rgba(255,255,255,0.85)" : "#4a6075",
              }}
            >
              <span style={{ color: accent }} className="font-bold shrink-0">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {isCta && (
        <div className="mt-6 flex flex-wrap gap-3 shrink-0">
          <BookStrategyCallButton
            variant="mint"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </div>
      )}
    </div>
  );

  return (
    <article
      className="shrink-0 h-full flex"
      style={{
        width: compact
          ? "clamp(272px, 88vw, 400px)"
          : "clamp(300px, 38vw, 440px)",
      }}
    >
      {compact ? (
        card
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          {card}
        </motion.div>
      )}
    </article>
  );
}

function useMeasuredHorizontalScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  panelCount: number,
  enabled: boolean
) {
  const [maxScrollPx, setMaxScrollPx] = useState(0);

  const measure = () => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    const scrollWidth = track.scrollWidth;
    const visibleWidth = viewport.clientWidth;
    setMaxScrollPx(Math.max(0, scrollWidth - visibleWidth));
  };

  useLayoutEffect(() => {
    if (!enabled) return;

    const runMeasure = () => measure();
    runMeasure();

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(runMeasure);
    });

    const track = trackRef.current;
    if (!track) {
      return () => cancelAnimationFrame(rafId);
    }

    const ro = new ResizeObserver(runMeasure);
    ro.observe(track);
    if (track.parentElement) ro.observe(track.parentElement);

    window.addEventListener("resize", runMeasure, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", runMeasure);
    };
  }, [enabled, panelCount]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => -progress * maxScrollPx);

  return { scrollYProgress, x, maxScrollPx };
}

export function ServicePageLayout({ slug }: ServicePageLayoutProps) {
  const service = getServiceBySlug(slug);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPanels = service.panels;
  const Icon = service.icon;
  const panelCount = scrollPanels.length;

  /** ~1 viewport of vertical scroll per panel (extra on small screens for touch) */
  const scrollSectionHeightVh = panelCount * 110 + 60;

  const { scrollYProgress, x, maxScrollPx } = useMeasuredHorizontalScroll(
    sectionRef,
    trackRef,
    panelCount,
    true
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const idx = Math.min(
      Math.floor(v * panelCount),
      panelCount - 1
    );
    setActiveIndex(idx);
  });

  const activePanel = scrollPanels[activeIndex] ?? scrollPanels[0];

  const scrollToPanel = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionScrollable = rect.height - window.innerHeight;
    const target =
      sectionTop + (sectionScrollable * index) / Math.max(panelCount - 1, 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <motion.div className="relative min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{ background: service.heroGradient }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 80% 20%, ${service.accent}18 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm mb-8 transition-colors hover:opacity-80"
            style={{ color: service.accent }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <motion.div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: service.accent }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.6} />
                </div>
                <div>
                  <p
                    className="font-heading font-semibold uppercase"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      color: service.accent,
                    }}
                  >
                    {service.subtitle}
                  </p>
                  <h1
                    className="font-heading font-bold"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.25rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.025em",
                      color: "var(--wordmark)",
                    }}
                  >
                    {service.title}
                  </h1>
                </div>
              </motion.div>

              <p
                className="font-heading font-semibold leading-snug"
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                  color: "var(--wordmark)",
                  maxWidth: "36ch",
                }}
              >
                {service.tagline}
              </p>
              <p
                className="mt-4 leading-relaxed"
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--text-secondary)",
                  maxWidth: "52ch",
                }}
              >
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookStrategyCallButton variant="primary" size="lg" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 w-full"
            >
              <div
                className="relative w-full aspect-[16/10] sm:aspect-[5/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-white/95 border shrink-0"
                style={{
                  borderColor: "var(--border-light)",
                  boxShadow: "0 8px 32px rgba(30,90,152,0.08)",
                }}
              >
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                  unoptimized={service.heroImage.endsWith(".gif")}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {service.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-3 sm:p-5 text-center"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid var(--border-light)",
                      boxShadow: "0 4px 20px rgba(30,90,152,0.06)",
                    }}
                  >
                    <p
                      className="font-heading font-bold"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                        color: service.accent,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-1 leading-tight"
                      style={{
                        fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex items-center gap-2 mt-10 sm:mt-12"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="text-xs uppercase tracking-widest font-heading font-semibold">
              Scroll down to explore
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* Vertical scroll drives horizontal panel movement (all screen sizes) */}
      <section
        ref={sectionRef}
        className="relative"
        style={{
          backgroundColor: "var(--surface)",
          height: `${scrollSectionHeightVh}vh`,
        }}
        aria-label={`${service.title} details`}
      >
        <div
          className="sticky z-10 overflow-hidden"
          style={{
            top: HEADER_OFFSET_PX,
            height: `calc(100dvh - ${HEADER_OFFSET_PX}px)`,
          }}
        >
          <div className="flex h-full w-full max-w-[100vw]">
            {/* Sticky service name — desktop sidebar */}
            <aside
              className="hidden lg:flex shrink-0 flex-col justify-center px-6 xl:px-8 border-r h-full"
              style={{
                width: "clamp(140px, 12vw, 200px)",
                borderColor: "var(--border-light)",
                backgroundColor: "var(--surface)",
              }}
            >
              <p
                className="font-heading font-bold leading-none select-none"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "clamp(1.5rem, 2vw, 2.25rem)",
                  letterSpacing: "-0.03em",
                  color: service.accent,
                  opacity: 0.35,
                }}
              >
                {service.title}
              </p>
              <nav className="mt-8 space-y-2" aria-label="Section navigation">
                {scrollPanels.map((panel, i) => (
                  <button
                    key={panel.id}
                    type="button"
                    className="block text-left font-heading text-xs font-semibold transition-all duration-300"
                    style={{
                      color: i === activeIndex ? service.accent : "#a8ccec",
                      paddingLeft: i === activeIndex ? 8 : 0,
                      borderLeft:
                        i === activeIndex
                          ? `2px solid ${service.accent}`
                          : "2px solid transparent",
                    }}
                    onClick={() => scrollToPanel(i)}
                  >
                    {panel.navLabel}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main: sticky heading + horizontal track */}
            <div className="relative flex flex-1 flex-col min-w-0 h-full overflow-hidden px-4 py-3 sm:px-5 sm:py-4 lg:px-0 lg:py-6 xl:py-8 lg:pr-6 xl:pr-10">
              {/* Mobile: service title + section pills */}
              <div
                className="lg:hidden shrink-0 pb-3 border-b mb-3"
                style={{ borderColor: "var(--border-light)" }}
              >
                <p
                  className="font-heading font-bold truncate"
                  style={{ fontSize: "1.125rem", color: service.accent }}
                >
                  {service.title}
                </p>
                <nav
                  className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Section navigation"
                >
                  {scrollPanels.map((panel, i) => (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => scrollToPanel(i)}
                      className="shrink-0 rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-all duration-300"
                      style={{
                        backgroundColor:
                          i === activeIndex ? service.accent : service.accentMuted,
                        color: i === activeIndex ? "#ffffff" : service.accent,
                      }}
                    >
                      {panel.navLabel}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Heading — fixed height, does not grow */}
              <div className="shrink-0 pb-3 sm:pb-4 bg-surface">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="font-heading font-semibold uppercase mb-1.5"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        color: service.accent,
                      }}
                    >
                      {activePanel.navLabel}
                    </p>
                    <h2
                      className="font-heading font-bold"
                      style={{
                        fontSize: "clamp(1.25rem, 4vw, 2.25rem)",
                        lineHeight: 1.12,
                        letterSpacing: "-0.02em",
                        color: "var(--wordmark)",
                        maxWidth: "22ch",
                      }}
                    >
                      {activePanel.title}
                    </h2>
                    {activePanel.subtitle && (
                      <p
                        className="mt-1.5 hidden sm:block"
                        style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}
                      >
                        {activePanel.subtitle}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="flex-1 max-w-xs h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: service.accentMuted }}
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-150 ease-out"
                      style={{
                        backgroundColor: service.accent,
                        width: `${Math.min(progress * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span
                    className="font-mono tabular-nums shrink-0"
                    style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(panelCount).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Horizontal track — fills remaining viewport, clips overflow */}
              <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                <motion.div
                  ref={trackRef}
                  className="flex h-full items-center gap-4 sm:gap-6 pl-1 pr-4 will-change-transform"
                  style={{ x }}
                >
                  {scrollPanels.map((panel, i) => (
                    <ServicePanelCard
                      key={panel.id}
                      panel={panel}
                      accent={service.accent}
                      accentMuted={service.accentMuted}
                      index={i}
                      compact
                    />
                  ))}
                  <div className="shrink-0 w-12" aria-hidden />
                </motion.div>
              </div>

              {progress < 0.95 && maxScrollPx > 0 && (
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-3 right-4 sm:bottom-6 sm:right-8 flex items-center gap-2 pointer-events-none"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="text-xs uppercase tracking-widest font-heading font-semibold">
                    Scroll
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom links */}
      <section
        className="py-12 sm:py-16 border-t"
        style={{
          borderColor: "var(--border-light)",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
            Explore more from 247 Digital Pro
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/services" variant="outline" size="md">
              {brandVoice.ctaServices}
            </Button>
            <BookStrategyCallButton variant="primary" size="md" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
