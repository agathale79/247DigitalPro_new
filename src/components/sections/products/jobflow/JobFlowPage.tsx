"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Calculator,
  ChartColumn,
  Check,
  ChevronDown,
  Clock,
  History,
  Inbox,
  PhoneCall,
  ShieldCheck,
  SquareKanban,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { Button } from "@/components/ui/Button";
import {
  faqs,
  highlights,
  integrations,
  jobflowMeta,
  painPoints,
  process,
  roadmap,
} from "@/data/jobflow";
import { JobFlowPipelineMock, ProductionBoardMock } from "./JobFlowMocks";

const highlightIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  inbox: Inbox,
  phone: PhoneCall,
  calendar: CalendarClock,
  kanban: SquareKanban,
  calculator: Calculator,
  chart: ChartColumn,
  shield: ShieldCheck,
  history: History,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function SectionIntro({ overline, title, lead }: { overline: string; title: React.ReactNode; lead?: string }) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
      <p className="text-overline mb-3">{overline}</p>
      <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">{title}</h2>
      {lead && <p className="mt-4 text-lead text-slate leading-relaxed">{lead}</p>}
    </motion.div>
  );
}

export function JobFlowPage() {
  const { openStrategyCall } = useStrategyCall();
  const reduceMotion = useReducedMotion();

  const requestDemo = () =>
    openStrategyCall({
      overline: jobflowMeta.name,
      title: "Demo Request",
      submitLabel: "Request Demo",
      selectedProduct: jobflowMeta.name,
      successMessage: `Thanks! We'll reach out shortly to schedule your ${jobflowMeta.name} demo.`,
    });

  return (
    <div className="bg-surface">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-pale-blue/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-brand-mint/50"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-overline mb-4"
              >
                Products · {jobflowMeta.name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading font-bold text-wordmark text-[clamp(2.5rem,6vw,4rem)] leading-[1.06] tracking-[-0.025em]"
              >
                From first lead to <span className="text-primary">finished job</span>,{" "}
                <span className="text-deep-mint">in one system</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 max-w-xl text-lead text-slate leading-relaxed"
              >
                {jobflowMeta.name} brings in leads from every channel, keeps follow-ups on schedule, and tracks each
                sold job stage by stage, so sales and production work from the same live picture.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={requestDemo}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {jobflowMeta.demoCta}
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg">
                  See how it works
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <JobFlowPipelineMock />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== PROBLEM → SOLUTION ========== */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro
            overline="Why JobFlow"
            title={<>Stop running the business from <span className="text-primary">five inboxes and a spreadsheet</span></>}
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:gap-5">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.before}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2 sm:gap-6 sm:p-5"
              >
                <p className="flex gap-3 text-slate">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-slate/60" aria-label="Before" />
                  {p.before}
                </p>
                <p className="flex gap-3 font-semibold text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-deep-mint" aria-label="With JobFlow" />
                  {p.after}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionIntro
            overline="How it works"
            title={<>One path for every job, <span className="text-deep-mint">start to finish</span></>}
            lead="Each lead follows the same clear path, so everyone knows what happens next and nothing waits on someone's memory."
          />
          <div className="relative mt-14">
            <motion.div
              className="absolute left-[8%] right-[8%] top-6 hidden h-0.5 origin-left bg-deep-mint/40 lg:block"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              aria-hidden
            />
            <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
              {process.map((step, i) => (
                <motion.li
                  key={step.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-surface bg-deep-navy font-heading text-lg font-bold text-brand-mint">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed text-slate">{step.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ========== HIGHLIGHTS ========== */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro
            overline="Key highlights"
            title={<>Built for the way <span className="text-primary">service businesses</span> actually work</>}
            lead="Everything below is live and running in a working business today."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => {
              const Icon = highlightIcons[h.icon];
              return (
                <motion.article
                  key={h.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                  className="rounded-xl border border-border bg-surface/50 p-6 transition-shadow hover:shadow-lg"
                >
                  {Icon && (
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-pale-blue text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  <h3 className="font-heading text-lg font-semibold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{h.description}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========== PRODUCTION BOARD ========== */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="lg:col-span-2">
              <p className="text-overline mb-3">Production</p>
              <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
                See every job, <span className="text-deep-mint">every stage</span>, at a glance
              </h2>
              <p className="mt-4 text-lead text-slate leading-relaxed">
                Once a job is sold, it moves onto the production board. Your shop team updates each stage as work
                happens, and the office sees it live, without calls or status meetings.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "13 production stages per job",
                  "Hold flags show what's blocked and why",
                  "Cost close-out when the job is done",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-deep-mint" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3">
              <ProductionBoardMock />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== INTEGRATIONS ========== */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionIntro
            overline="Connected"
            title="Works with the tools you already use"
          />
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {integrations.map((tool, i) => (
              <motion.li
                key={tool.name}
                {...fadeUp}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="rounded-xl border border-border bg-surface/50 px-4 py-5 text-center"
              >
                <p className="font-heading font-semibold text-ink">{tool.name}</p>
                <p className="mt-1 text-xs leading-snug text-slate">{tool.detail}</p>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ========== ROADMAP (planned, not live) ========== */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionIntro
            overline="On the roadmap"
            title={<>Coming next: <span className="text-primary">lead to cash</span> in one place</>}
            lead="These features are planned and in development. They are not available yet."
          />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
            {roadmap.map((group, i) => (
              <motion.div
                key={group.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl border border-dashed border-primary/40 bg-white/70 p-6"
              >
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-pale-blue px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Planned
                </span>
                <h3 className="font-heading text-lg font-semibold text-ink">{group.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionIntro overline="FAQ" title="Questions about JobFlow" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-xl border border-border">
            {faqs.map((f) => (
              <details key={f.question} className="group px-5 py-4 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-slate transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-slate">{f.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="primary" size="lg" onClick={requestDemo} icon={<ArrowRight className="h-4 w-4" />}>
              {jobflowMeta.demoCta}
            </Button>
          </div>
        </Container>
      </section>

      <div className="pt-16 md:pt-24">
        <BrandCTA
          title="Need the leads to fill JobFlow, too?"
          description="We run the marketing that brings qualified leads in, and JobFlow makes sure every one is followed up and delivered."
        />
      </div>
    </div>
  );
}
