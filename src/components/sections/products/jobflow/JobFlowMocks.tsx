"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { heroStages } from "@/data/jobflow";

/* Sample data only. These mock-ups must never show real client records. */

const sampleLeads = [
  { name: "Harbor View Dental", source: "Facebook", tone: "bg-pale-blue text-primary" },
  { name: "M. Rivera", source: "Angi", tone: "bg-brand-mint text-deep-navy" },
  { name: "Oakline Builders", source: "Website", tone: "bg-surface text-wordmark border border-border" },
];

const STEP_MS = 1600;

function MockWindow({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl lg:rounded-2xl border border-border bg-white shadow-[0_20px_60px_rgba(30,90,152,0.14)]",
        className
      )}
    >
      <div className="flex items-center gap-2.5 bg-deep-navy px-4 py-3 sm:px-5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-deep-mint" />
          <span className="h-2.5 w-2.5 rounded-full bg-mid-mint" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-light" />
        </div>
        <span className="font-metric text-xs tracking-wide text-on-dark/60">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Hero visual: leads arrive in the queue while one sample job walks the pipeline. */
export function JobFlowPipelineMock() {
  const reduceMotion = useReducedMotion();
  const lastStage = heroStages.length - 1;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setStage((s) => (s >= lastStage ? 0 : s + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, lastStage]);

  const active = reduceMotion ? lastStage : stage;
  const progress = active / lastStage;

  return (
    <MockWindow title="JobFlow · Pipeline" className="w-full">
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate">New leads</p>
          <ul className="space-y-2">
            {sampleLeads.map((lead, i) => (
              <motion.li
                key={lead.name}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.5 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between rounded-lg border border-border bg-surface/60 px-3 py-2"
              >
                <span className="text-sm font-semibold text-ink">{lead.name}</span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold", lead.tone)}>
                  {lead.source}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate">Job #2048 · sample</p>
              <p className="font-heading text-base font-semibold text-ink">Oakline Builders</p>
            </div>
            <div className="relative h-7 min-w-30 text-right">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "absolute right-0 top-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
                    active === lastStage ? "bg-deep-mint text-on-dark" : "bg-pale-blue text-primary"
                  )}
                >
                  {heroStages[active]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative mt-4" aria-hidden>
            <div className="absolute left-2 right-2 top-2 h-0.5 rounded bg-cloud" />
            <motion.div
              className="absolute left-2 top-2 h-0.5 origin-left rounded bg-deep-mint"
              style={{ width: "calc(100% - 1rem)" }}
              animate={{ scaleX: progress }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
            />
            <ol className="relative flex justify-between">
              {heroStages.map((label, i) => (
                <li key={label} className="flex w-4 flex-col items-center">
                  <motion.span
                    animate={{
                      scale: i === active ? 1.25 : 1,
                      backgroundColor: i <= active ? "var(--deep-mint)" : "#ffffff",
                      borderColor: i <= active ? "var(--deep-mint)" : "var(--cloud)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                  >
                    {i < active && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                  </motion.span>
                </li>
              ))}
            </ol>
          </div>
          <span className="sr-only">
            A sample job moving through the stages: {heroStages.join(", ")}.
          </span>
        </div>
      </div>
    </MockWindow>
  );
}

const boardStages = ["Measure", "Design", "Order", "Build", "Install", "Clean up"];

type CellState = "complete" | "inprogress" | "todo" | "hold" | "na";

const boardJobs: { name: string; cells: CellState[] }[] = [
  { name: "Harbor View Dental", cells: ["complete", "complete", "complete", "inprogress", "todo", "todo"] },
  { name: "M. Rivera", cells: ["complete", "complete", "inprogress", "todo", "todo", "na"] },
  { name: "Oakline Builders", cells: ["complete", "hold", "todo", "todo", "todo", "todo"] },
  { name: "Seaside Café", cells: ["complete", "complete", "complete", "complete", "complete", "inprogress"] },
];

const cellStyles: Record<CellState, { className: string; label: string }> = {
  complete: { className: "bg-deep-mint", label: "Complete" },
  inprogress: { className: "bg-primary-light", label: "In progress" },
  todo: { className: "bg-white border border-cloud", label: "To do" },
  hold: { className: "bg-amber-400", label: "On hold" },
  na: { className: "bg-cloud/50", label: "N/A" },
};

/** Production board visual: cells fill in as the section scrolls into view. */
export function ProductionBoardMock() {
  const reduceMotion = useReducedMotion();

  return (
    <MockWindow title="JobFlow · Active Jobs" className="w-full">
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-120 border-separate border-spacing-1.5 text-left">
          <caption className="sr-only">Sample production board with four jobs across six stages</caption>
          <thead>
            <tr>
              <th scope="col" className="pb-1 text-xs font-semibold text-slate">Job</th>
              {boardStages.map((s) => (
                <th key={s} scope="col" className="pb-1 text-center text-[0.7rem] font-semibold text-slate">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {boardJobs.map((job, row) => (
              <tr key={job.name}>
                <th scope="row" className="whitespace-nowrap pr-2 text-sm font-semibold text-ink">
                  {job.name}
                </th>
                {job.cells.map((state, col) => (
                  <td key={col} className="p-0">
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3, delay: (row * boardStages.length + col) * 0.035 }}
                      className={cn("mx-auto h-6 w-full rounded-md", cellStyles[state].className)}
                      title={cellStyles[state].label}
                    >
                      <span className="sr-only">{cellStyles[state].label}</span>
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Legend">
          {(Object.keys(cellStyles) as CellState[]).map((state) => (
            <li key={state} className="flex items-center gap-1.5 text-xs text-slate">
              <span className={cn("h-3 w-3 rounded-sm", cellStyles[state].className)} aria-hidden />
              {cellStyles[state].label}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.7rem] text-slate/80">Sample jobs and stages shown for illustration.</p>
      </div>
    </MockWindow>
  );
}
