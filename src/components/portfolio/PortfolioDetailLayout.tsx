"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CircleHelp,
  Info,
  Lightbulb,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { PortfolioDetail, PortfolioDetailSection } from "@/data/portfolio-details";

const sectionMeta = {
  what: {
    icon: CircleHelp,
    label: "Overview",
  },
  how: {
    icon: Workflow,
    label: "Process",
  },
  why: {
    icon: Lightbulb,
    label: "Impact",
  },
  info: {
    icon: Info,
    label: "Details",
  },
} as const;

type SectionVariant = keyof typeof sectionMeta;

function DetailCard({
  section,
  accent,
  variant,
  index,
}: {
  section: PortfolioDetailSection;
  accent: string;
  variant: SectionVariant;
  index: number;
}) {
  const meta = sectionMeta[variant];
  const Icon = meta.icon;
  const isSteps = variant === "how" && Boolean(section.bullets?.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_2px_24px_rgba(30,90,152,0.06)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_12px_40px_rgba(30,90,152,0.1)] sm:rounded-3xl sm:p-8">
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 35%, white))`,
          }}
        />

        <div className="mb-5 flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-surface"
            style={{ color: accent }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-overline mb-1 text-[0.65rem]">{meta.label}</p>
            <h2 className="font-heading text-xl font-bold leading-snug text-wordmark sm:text-2xl">
              {section.title}
            </h2>
          </div>
        </div>

        {section.paragraphs?.map((paragraph) => (
          <p
            key={paragraph}
            className="mb-4 text-sm leading-relaxed text-slate last:mb-0 sm:text-base"
          >
            {paragraph}
          </p>
        ))}

        {section.bullets && section.bullets.length > 0 && (
          <ul className={cn("space-y-3", section.subsections?.length ? "mb-5" : "")}>
            {section.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className={cn(
                  "flex gap-3 text-sm leading-relaxed text-slate sm:text-[0.95rem]",
                  isSteps && "rounded-xl border border-border/80 bg-surface/70 px-4 py-3"
                )}
              >
                {isSteps ? (
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-heading text-xs font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : (
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
                <span className={isSteps ? "pt-0.5" : ""}>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {section.subsections?.map((sub) => (
          <div
            key={sub.heading}
            className="mt-4 rounded-xl border border-border/80 bg-surface/60 p-4 sm:p-5"
          >
            <h3 className="mb-3 font-heading text-base font-semibold text-ink sm:text-lg">
              {sub.heading}
            </h3>
            <ul className="space-y-2.5">
              {sub.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2.5 text-sm leading-relaxed text-slate sm:text-[0.95rem]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface PortfolioDetailLayoutProps {
  project: PortfolioDetail;
}

export function PortfolioDetailLayout({ project }: PortfolioDetailLayoutProps) {
  const { openStrategyCall } = useStrategyCall();

  const handleBookDemo = () => {
    openStrategyCall({
      overline: project.title,
      title: "Book Demo",
      submitLabel: "Submit Request",
      selectedProject: project.title,
      successMessage: `We'll reach out shortly to schedule your ${project.title} demo.`,
    });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-surface pb-12 pt-20 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,90,152,0.08),transparent_55%)]" />
        <div
          className="absolute -right-24 top-10 h-64 w-64 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: project.accent }}
        />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-brand-mint/40 blur-3xl" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/portfolio"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-slate shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-block rounded-full bg-pale-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {project.category}
              </span>
              <span className="inline-block rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-slate">
                {project.client}
              </span>
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-wordmark">
              {project.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lead">
              {project.heroDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative mx-auto mt-8 w-full max-w-4xl sm:mt-10"
          >
            <div
              className="absolute -inset-3 rounded-[1.75rem] opacity-30 blur-2xl sm:-inset-4 sm:rounded-4xl"
              style={{ backgroundColor: project.accent }}
            />
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_24px_64px_rgba(13,31,60,0.14)] sm:rounded-3xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-deep-navy/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="relative bg-surface pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center sm:mb-10"
          >
            <p className="text-overline mb-2">Case Study</p>
            <h2 className="font-heading text-2xl font-bold text-wordmark sm:text-3xl">
              Project Breakdown
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <DetailCard
              section={project.whatIsIt}
              accent={project.accent}
              variant="what"
              index={0}
            />
            <DetailCard
              section={project.howItWorks}
              accent={project.accent}
              variant="how"
              index={1}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
            <DetailCard
              section={project.why}
              accent={project.accent}
              variant="why"
              index={2}
            />
            <DetailCard
              section={project.otherInfo}
              accent={project.accent}
              variant="info"
              index={3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="surface-dark relative mt-10 overflow-hidden rounded-2xl border border-deep-navy/10 bg-deep-navy p-8 text-center sm:rounded-3xl sm:p-10 lg:mt-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(125,212,192,0.14),transparent_60%)]" />
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: project.accent }}
            />

            <div className="relative z-10">
              <p className="text-overline mb-3 text-mid-mint">Next Step</p>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                {project.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {project.ctaDescription}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button variant="mint" size="lg" onClick={handleBookDemo}>
                  Book Demo
                </Button>
                {project.externalUrl && (
                  <Button
                    href={project.externalUrl}
                    variant="outlineDark"
                    size="lg"
                    icon={<ArrowUpRight className="h-4 w-4" />}
                  >
                    Visit Website
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
