"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Bot, Zap, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BookStrategyCallButton } from "@/components/ui/BookStrategyCallButton";
import { brandVoice } from "@/config/brand";
import { siteConfig } from "@/config/site";

function useCountUp(target: number, duration = 2000, delay = 400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now() + delay;
          const step = (now: number) => {
            const elapsed = Math.max(0, now - start);
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay]);

  return { count, ref };
}

export function HeroSection() {
  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-overline mb-4">
              Digital Marketing · {siteConfig.experienceYears} Years
            </p>

            <h1 className="text-display max-w-2xl mx-auto lg:mx-0">
              We Build Marketing Systems That Drive{" "}
              <span className="text-primary">Measurable Growth</span>
            </h1>

            <p className="mt-6 text-lead text-slate max-w-xl mx-auto lg:mx-0">
              {brandVoice.heroLead}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <BookStrategyCallButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              />
              <Button href="/services" variant="outline" size="lg">
                {brandVoice.ctaServices}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[400px] xl:max-w-[440px] mx-auto lg:mx-0 lg:shrink-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  const revenue = useCountUp(124, 2000, 400);
  const leads = useCountUp(2847, 2200, 600);

  return (
    <div className="relative w-full lg:scale-[1.03] lg:origin-center">
      <div className="absolute -inset-5 sm:-inset-6 bg-linear-to-br from-pale-blue via-surface to-brand-mint/40 rounded-2xl -z-10" />

      <div className="relative bg-white rounded-xl lg:rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="bg-deep-navy px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-deep-mint" />
            <div className="w-2.5 h-2.5 rounded-full bg-mid-mint" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary-light" />
          </div>
          <span className="font-metric text-xs text-on-dark/60 tracking-wide">
            247 Growth Dashboard
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-pale-blue rounded-lg p-3.5 sm:p-5">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-deep-mint" />
                <span className="text-xs text-deep-mint font-semibold">+47%</span>
              </div>
              <p className="font-metric text-xl sm:text-2xl text-ink">
                <span ref={revenue.ref}>${revenue.count}K</span>
              </p>
              <p className="text-xs text-slate mt-0.5">Revenue Growth</p>
            </div>
            <div className="bg-brand-mint/60 rounded-lg p-3.5 sm:p-5">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-semibold">+32%</span>
              </div>
              <p className="font-metric text-xl sm:text-2xl text-ink">
                <span ref={leads.ref}>{leads.count.toLocaleString()}</span>
              </p>
              <p className="text-xs text-slate mt-0.5">Leads This Month</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            <ProgressBar label="SEO Performance" value={78} color="var(--primary)" />
            <ProgressBar label="Conversion Rate" value={64} color="var(--deep-mint)" />
            <ProgressBar label="Ad Spend ROI" value={91} color="var(--mid-mint)" />
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-2 sm:-right-5 bg-white rounded-full px-3 py-1.5 shadow-md border border-brand-mint flex items-center gap-1.5 z-10"
      >
        <Search className="w-3.5 h-3.5 text-deep-mint" />
        <span className="text-xs font-semibold text-ink">SEO Optimized</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="absolute -bottom-3 -left-2 sm:-left-5 bg-white rounded-full px-3 py-1.5 shadow-md border border-pale-blue flex items-center gap-1.5 z-10"
      >
        <Bot className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-ink">AEO Ready</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-8 bg-brand-mint rounded-full px-3 py-1.5 shadow-md border border-mid-mint/30 flex items-center gap-1.5 z-10"
      >
        <Zap className="w-3.5 h-3.5 text-deep-mint" />
        <span className="text-xs font-semibold text-ink">Data-Driven</span>
      </motion.div>
    </div>
  );
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate">{label}</span>
        <span className="font-metric text-ink">{value}%</span>
      </div>
      <div className="h-2 bg-pale-blue rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
