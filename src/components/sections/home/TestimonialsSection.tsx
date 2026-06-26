"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { testimonials, type Testimonial } from "@/data/testimonials";

const avatarColors = [
  "bg-primary",
  "bg-deep-mint",
  "bg-mid-mint",
  "bg-primary-light",
  "bg-deep-navy",
  "bg-wordmark",
];

/* ─── Testimonial Card ─── */
function TestimonialCard({
  testimonial,
  index,
  className,
}: {
  testimonial: Testimonial;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 12px 40px rgba(30,90,152,0.18)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "bg-white rounded-2xl p-7 border border-border shadow-[0_2px_16px_rgba(30,90,152,0.06)]",
        "flex flex-col cursor-pointer relative z-20",
        "transition-[border-color] duration-200 hover:border-primary-light/30",
        className
      )}
    >
      <p className="text-base text-ink leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-border">
        <div
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center shrink-0",
            avatarColors[index % avatarColors.length]
          )}
        >
          <span className="text-white font-heading font-bold text-xs">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="text-base font-heading font-semibold text-ink">
            {testimonial.name}
          </p>
          <p className="text-sm text-slate">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Swiper ─── */
function MobileSwiper() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1)),
    []
  );

  return (
    <div className="lg:hidden">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.08em] uppercase text-deep-mint font-heading mb-3">
          Testimonials
        </p>
        <h2 className="font-heading font-bold text-ink text-2xl sm:text-3xl">
          What Our Clients Say
        </h2>
        <p className="mt-3 text-sm text-slate max-w-md mx-auto leading-relaxed">
          Don&rsquo;t just take our word for it — hear from the businesses
          we&rsquo;ve helped grow.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="px-1"
          >
            <TestimonialCard
              testimonial={testimonials[current]}
              index={current}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-ink hover:bg-surface transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === current
                  ? "bg-primary w-6"
                  : "bg-pale-blue hover:bg-primary-light/30"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-ink hover:bg-surface transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Build pages of 4 from testimonials ─── */
const CARDS_PER_PAGE = 4;
const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);
const AUTO_INTERVAL = 5000;

function getPage(page: number) {
  const start = page * CARDS_PER_PAGE;
  const items = testimonials.slice(start, start + CARDS_PER_PAGE);
  while (items.length < CARDS_PER_PAGE) {
    items.push(testimonials[items.length % testimonials.length]);
  }
  return { left: [items[0], items[1]], right: [items[2], items[3]] };
}

/* ─── Desktop Bento Layout ─── */
function DesktopLayout() {
  const [page, setPage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveringRef = useRef(false);

  const goNext = useCallback(
    () => setPage((p) => (p + 1) % totalPages),
    []
  );
  const goPrev = useCallback(
    () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1)),
    []
  );

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!hoveringRef.current) {
        setPage((p) => (p + 1) % totalPages);
      }
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const handlePrev = () => {
    goPrev();
    startAutoPlay();
  };
  const handleNext = () => {
    goNext();
    startAutoPlay();
  };

  const { left, right } = getPage(page);

  return (
    <div
      className="hidden lg:block"
      onMouseEnter={() => { hoveringRef.current = true; }}
      onMouseLeave={() => { hoveringRef.current = false; }}
    >
      <div className="relative max-w-[1200px] mx-auto">
        {/* ── Center heading (absolute, always centered) ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center max-w-[400px] px-4">
            <p className="text-sm font-semibold tracking-[0.08em] uppercase text-deep-mint font-heading mb-4">
              Testimonials
            </p>
            <h2 className="font-heading font-bold text-ink text-4xl xl:text-[2.75rem] xl:leading-[1.12]">
              What Our Clients Say
            </h2>
            <p className="mt-5 text-base text-slate leading-relaxed">
              Don&rsquo;t just take our word for it — hear from the businesses
              we&rsquo;ve helped grow.
            </p>

            {/* Nav buttons + dots */}
            <div className="flex items-center justify-center gap-3 mt-8 pointer-events-auto">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-ink hover:bg-surface transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); startAutoPlay(); }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === page
                        ? "bg-primary w-6"
                        : "bg-pale-blue w-2 hover:bg-primary-light/30"
                    )}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-ink hover:bg-surface transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Two-column staggered layout (4 cards: 2 left, 2 right) ── */}
        <div className="flex justify-between gap-6">
          {/* Left column */}
          <div className="w-[350px] xl:w-[380px] flex flex-col gap-7 shrink-0">
            <AnimatePresence mode="wait">
              {left.map((t, i) => (
                <motion.div
                  key={`${page}-l-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <TestimonialCard testimonial={t} index={page * CARDS_PER_PAGE + i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Center spacer */}
          <div className="flex-1 min-w-[240px]" />

          {/* Right column — offset down for organic stagger */}
          <div className="w-[350px] xl:w-[380px] flex flex-col gap-7 shrink-0 mt-12">
            <AnimatePresence mode="wait">
              {right.map((t, i) => (
                <motion.div
                  key={`${page}-r-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.15 }}
                >
                  <TestimonialCard testimonial={t} index={page * CARDS_PER_PAGE + i + 2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-mint overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DesktopLayout />
        <MobileSwiper />
      </div>
    </section>
  );
}
