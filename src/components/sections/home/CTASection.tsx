"use client";

import { brandVoice } from "@/config/brand";
import { BrandCTA } from "@/components/ui/BrandCTA";

/* Get Started section — commented out for now
import { motion } from "framer-motion";
import { ArrowRight, LineChart, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BookStrategyCallButton } from "@/components/ui/BookStrategyCallButton";

const leadMagnets = [
  { icon: Search, label: brandVoice.ctaAudit, href: "/tools/seo-audit/" as const },
  {
    icon: LineChart,
    label: "Growth Strategy Session",
    action: "strategy-call" as const,
  },
];
*/

export function CTASection() {
  return (
    <>
      {/* <section className="py-16 md:py-20 bg-brand-mint/30">
        <Container>
          <div className="text-center mb-10">
            <p className="text-overline mb-3">Get Started</p>
            <h2 className="font-heading font-bold text-wordmark text-2xl md:text-3xl">
              Replace guesswork with measurable growth
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {leadMagnets.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <div className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-xl border border-border hover:border-deep-mint/40 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-mint flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-deep-navy" />
                  </div>
                  <span className="text-sm font-semibold text-ink leading-tight">
                    {item.label}
                  </span>
                  {"href" in item ? (
                    <Button
                      href={item.href}
                      variant={i === 0 ? "emphasis" : "outline"}
                      size="sm"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <BookStrategyCallButton
                      variant="outline"
                      size="sm"
                      className="w-full"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      {item.label}
                    </BookStrategyCallButton>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section> */}

      <BrandCTA description={brandVoice.ctaDarkDescription} />
    </>
  );
}
