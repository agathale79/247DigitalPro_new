"use client";

import type { ReactNode } from "react";
import {
  Search,
  Lightbulb,
  PenTool,
  Rocket,
  TrendingUp,
  BarChart3,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { brandProcessSteps } from "@/config/brand";
import { cn } from "@/lib/cn";

const stepIcons: LucideIcon[] = [
  Search,
  Lightbulb,
  PenTool,
  Rocket,
  TrendingUp,
  BarChart3,
  LineChart,
];

const steps = brandProcessSteps.map((step, i) => ({
  ...step,
  icon: stepIcons[i] ?? Search,
}));

export interface ProcessStepsProps {
  overline?: string;
  title?: ReactNode;
  subtitle?: string;
  className?: string;
}

const CONNECTOR_STROKE = "var(--cloud)";

function ConnectorMarker({ id }: { id: string }) {
  return (
    <marker
      id={id}
      markerWidth="8"
      markerHeight="8"
      refX="4"
      refY="4"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,8 L8,4 Z" fill={CONNECTOR_STROKE} />
    </marker>
  );
}

/** L-shaped dashed connector between zigzag cards (desktop) */
function ZigzagConnector({
  fromRight,
  markerId,
}: {
  fromRight: boolean;
  markerId: string;
}) {
  const path = fromRight
    ? "M 340 0 L 200 0 L 200 56"
    : "M 60 0 L 200 0 L 200 56";

  return (
    <svg
      viewBox="0 0 400 56"
      className="hidden h-12 w-full max-w-xl shrink-0 sm:h-14 lg:block"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <ConnectorMarker id={markerId} />
      </defs>
      <path
        d={path}
        fill="none"
        stroke={CONNECTOR_STROKE}
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}

function MobileConnector({ markerId }: { markerId: string }) {
  return (
    <svg
      viewBox="0 0 24 40"
      className="mx-auto h-10 w-6 shrink-0 lg:hidden"
      aria-hidden
    >
      <defs>
        <ConnectorMarker id={markerId} />
      </defs>
      <path
        d="M 12 0 L 12 36"
        fill="none"
        stroke={CONNECTOR_STROKE}
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}

function ProcessStepCard({
  step,
  index,
  align,
}: {
  step: (typeof steps)[number];
  index: number;
  align: "left" | "right";
}) {
  const Icon = step.icon;
  const isMint = index % 2 === 0;

  return (
    <article
      className={cn(
        "relative flex w-full max-w-full overflow-hidden rounded-2xl border shadow-sm sm:max-w-[520px]",
        align === "left" ? "mr-auto" : "ml-auto",
        isMint ? "border-mid-mint/35 bg-brand-mint/45" : "border-cloud bg-white"
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center px-3 py-5 sm:px-4 sm:py-6",
          isMint ? "bg-deep-mint" : "bg-primary"
        )}
        aria-hidden
      >
        <span
          className="font-heading text-xs font-bold tracking-wide text-on-dark [writing-mode:vertical-rl] rotate-180"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="mb-3 flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pale-blue sm:h-11 sm:w-11">
            <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="pt-1 font-heading text-base font-bold leading-snug text-wordmark sm:text-lg">
            <span className="text-primary">{index + 1}</span> {step.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-slate sm:text-[0.9375rem]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function ZigzagTimeline() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col lg:max-w-4xl">
      {steps.map((step, index) => {
        const align = index % 2 === 0 ? "left" : "right";
        return (
          <div key={step.title} className="flex flex-col items-stretch">
            {index > 0 && (
              <>
                <ZigzagConnector
                  fromRight={index % 2 === 1}
                  markerId={`process-arrow-desktop-${index}`}
                />
                <MobileConnector markerId={`process-arrow-mobile-${index}`} />
              </>
            )}
            <ProcessStepCard step={step} index={index} align={align} />
          </div>
        );
      })}
    </div>
  );
}

export function ProcessSteps({
  overline = "How We Work",
  title = (
    <>
      From audit to <span className="text-primary">measurable growth</span>
    </>
  ),
  subtitle = "A proven methodology — audit, strategy, execution, and optimization driven by real data, not guesswork.",
  className,
}: ProcessStepsProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface py-16 md:py-24",
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-overline mb-3">{overline}</p>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight text-wordmark">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lead text-slate">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 md:mt-16 px-2 sm:px-0">
          <ZigzagTimeline />
        </div>
      </Container>
    </section>
  );
}
