"use client";

import Link from "next/link";
import { FileText, Globe, LogIn, Share2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Button } from "@/components/ui/Button";
import { BookStrategyCallButton } from "@/components/ui/BookStrategyCallButton";
import { useAuth } from "@/contexts/AuthContext";
import { brandVoice } from "@/config/brand";

const tools = [
  {
    href: "/tools/seo-audit/",
    icon: Globe,
    title: "Website AI Visibility Audit",
    description:
      "SEO, AEO, GEO, performance, security, accessibility, and compliance — with prioritized fixes.",
    cta: brandVoice.ctaAudit,
  },
  {
    href: "/tools/social-audit/",
    icon: Share2,
    title: "Social Media Audit",
    description:
      "Facebook, Instagram, and LinkedIn scores with cross-platform recommendations.",
    cta: "Run social audit",
  },
  {
    href: "/tools/reports/",
    icon: FileText,
    title: "My Reports",
    description: "Reopen past audits, filter by type, and download PDF exports.",
    cta: "View history",
    requiresAuth: true,
  },
];

export default function ToolsHubPage() {
  const { user, loading } = useAuth();

  return (
    <>
      <BrandedPageHero
        overline="Free growth tools"
        title="Audit your visibility"
        description="Sign in with your mobile number, run free website and social audits, and save professional PDF reports — built for measurable marketing growth."
      />
      <Container className="pb-24">
        {!loading && !user ? (
          <div className="max-w-2xl mx-auto -mt-4 mb-10 rounded-xl border border-brand-mint/50 bg-brand-mint/25 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-ink">
              <strong>Get started:</strong> verify your phone once to run audits and capture leads
              securely.
            </p>
            <Button href="/tools/login/" variant="primary" size="sm" icon={<LogIn className="w-4 h-4" />}>
              Sign in
            </Button>
          </div>
        ) : null}

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const href =
              tool.requiresAuth && !user ? `/tools/login/?next=${encodeURIComponent(tool.href)}` : tool.href;
            return (
              <article
                key={tool.href}
                className="rounded-2xl border border-border bg-white p-6 flex flex-col hover:border-deep-mint/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-mint flex items-center justify-center text-deep-navy mb-4">
                  <tool.icon className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-lg text-wordmark">{tool.title}</h2>
                <p className="text-sm text-slate mt-2 flex-1 leading-relaxed">{tool.description}</p>
                <Button href={href} variant="emphasis" size="sm" className="mt-6 w-full">
                  {tool.cta}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center surface-dark rounded-2xl px-8 py-12 bg-deep-navy">
          <h2 className="font-heading font-bold text-white text-xl mb-3">
            Want a strategy call on your results?
          </h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto mb-6">
            {brandVoice.ctaConsultation}
          </p>
          <BookStrategyCallButton variant="mint" size="lg" />
        </div>
      </Container>
    </>
  );
}
