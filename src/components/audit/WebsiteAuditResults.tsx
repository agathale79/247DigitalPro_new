"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WebsiteReconPanel } from "@/components/audit/WebsiteReconPanel";
import {
  CORE_PILLARS,
  DimensionGrid,
  PillarCard,
  ScorePill,
  ScoreRing,
  SeverityBadge,
  WEBSITE_TABS,
  WebsiteTabId,
  buildCategoryBlocks,
  clampScore,
  extractDomain,
  formatCheckDisplay,
  scoreToLetterGrade,
  stripSeverity,
} from "@/components/audit/websiteAuditUi";
import { cn } from "@/lib/cn";

type SectionData = {
  score?: number;
  issues?: string[];
  recommendations?: string[];
  checks?: Record<string, unknown>;
};

function SectionCard({ title, section }: { title: string; section: SectionData }) {
  const checks = section?.checks ?? {};
  const checkEntries = Object.entries(checks);
  const score = clampScore(section?.score ?? 0);
  const issueCount = (section?.issues ?? []).length;
  const recoCount = (section?.recommendations ?? []).length;

  return (
    <article className="rounded-xl border border-border bg-white overflow-hidden">
      <header className="flex items-start justify-between gap-4 p-4 border-b border-border bg-surface/50">
        <div>
          <h3 className="font-heading font-semibold text-ink">{title}</h3>
          <p className="text-xs text-slate mt-0.5">
            {issueCount} {issueCount === 1 ? "issue" : "issues"} · {recoCount}{" "}
            {recoCount === 1 ? "action" : "actions"}
          </p>
        </div>
        <ScorePill score={score} />
      </header>
      <div className="p-4 grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-red-700 uppercase mb-2">Issues</h4>
          <div className="space-y-2">
            {(section?.issues ?? []).slice(0, 8).map((item, idx) => (
              <div key={`i-${idx}`} className="flex gap-2 text-sm">
                <SeverityBadge issue={item} />
                <span className="text-slate">{stripSeverity(item)}</span>
              </div>
            ))}
            {issueCount === 0 ? (
              <p className="text-xs text-slate">No issues found</p>
            ) : null}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-primary uppercase mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {(section?.recommendations ?? []).slice(0, 8).map((item, idx) => (
              <li key={`r-${idx}`} className="text-sm text-slate flex gap-2">
                <span className="text-deep-mint">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {checkEntries.length > 0 ? (
        <details className="px-4 pb-4">
          <summary className="text-xs font-semibold text-primary cursor-pointer">
            View {checkEntries.length} technical checks
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {checkEntries.map(([key, value]) => {
              const check = formatCheckDisplay(value);
              return (
                <div
                  key={key}
                  className="text-xs rounded-lg border border-border p-2 bg-surface/30"
                >
                  <div className="font-semibold text-ink capitalize">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className={cn("mt-0.5", check.className)}>
                    {check.icon} {check.text}
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      ) : null}
    </article>
  );
}

export type WebsiteAuditResult = {
  auditId: string;
  provider?: string;
  scraped?: Record<string, unknown>;
  audit?: Record<string, unknown>;
};

export function WebsiteAuditResults({
  result,
  onDownloadPdf,
  pdfLoading,
}: {
  result: WebsiteAuditResult;
  onDownloadPdf?: (auditId: string) => void;
  pdfLoading?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<WebsiteTabId>("overview");
  const audit = result.audit;
  const categoryBlocks = useMemo(() => buildCategoryBlocks(audit), [audit]);
  const overall = clampScore(audit?.overall_score ?? 0);
  const grade = String(audit?.grade ?? scoreToLetterGrade(overall));
  const url = String(audit?.url ?? "");

  const priorities = (audit?.top_priorities as Array<Record<string, unknown>>) ?? [];
  const quickWins = (audit?.quick_wins as string[]) ?? [];

  return (
    <div id="report" className="space-y-8 scroll-mt-8">
      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <ScoreRing score={overall} />
          <div className="flex-1 min-w-0">
            <p className="text-overline mb-1">Audit complete</p>
            <h2 className="font-heading font-bold text-2xl text-wordmark truncate">
              {extractDomain(url)}
            </h2>
            <p className="text-sm text-slate mt-1 break-all">{url}</p>
            <div className="flex flex-wrap gap-3 mt-4 items-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pale-blue text-sm font-semibold text-primary">
                Grade {grade}
              </span>
              {result.provider ? (
                <span className="text-xs text-slate">Provider: {result.provider}</span>
              ) : null}
              {onDownloadPdf && result.auditId ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownloadPdf(result.auditId)}
                  disabled={pdfLoading}
                  icon={<Download className="w-4 h-4" />}
                >
                  {pdfLoading ? "Preparing…" : "Download PDF"}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <WebsiteReconPanel scraped={result.scraped} audit={audit} />

      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {WEBSITE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
              activeTab === tab.id
                ? "bg-primary text-on-dark"
                : "text-slate hover:bg-surface"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          <section>
            <h3 className="font-heading font-bold text-xl text-wordmark mb-2">
              SEO · AEO · GEO
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {CORE_PILLARS.map((p) => (
                <PillarCard
                  key={p.key}
                  label={p.label}
                  score={Number((audit?.[p.key] as SectionData)?.score ?? 0)}
                  description={p.desc}
                  accent={p.accent}
                />
              ))}
            </div>
          </section>
          {audit?.summary ? (
            <p className="text-lead text-slate leading-relaxed">{String(audit.summary)}</p>
          ) : null}
          <section>
            <h3 className="font-heading font-semibold text-ink mb-3">All dimensions</h3>
            <DimensionGrid
              items={categoryBlocks.map((item) => ({
                key: item.key,
                label: item.title,
                score: Number((item.data as SectionData)?.score ?? 0),
              }))}
            />
          </section>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="space-y-4">
          {categoryBlocks.map((block) => (
            <SectionCard
              key={block.key}
              title={block.title}
              section={block.data as SectionData}
            />
          ))}
        </div>
      )}

      {activeTab === "priorities" && (
        <div className="space-y-6">
          {priorities.length > 0 ? (
            <div className="space-y-3">
              {priorities.map((p) => (
                <article
                  key={`${p.rank}-${p.category}`}
                  className="rounded-xl border border-border bg-white p-4 flex gap-4"
                >
                  <span className="font-heading font-bold text-primary text-lg">
                    #{String(p.rank)}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate uppercase">
                      {String(p.category)}
                    </div>
                    <div className="text-sm text-ink mt-1">{String(p.issue)}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          {quickWins.length > 0 ? (
            <div className="rounded-xl border border-brand-mint/50 bg-brand-mint/20 p-5">
              <h3 className="font-heading font-semibold text-ink mb-3">Quick wins</h3>
              <ul className="space-y-2">
                {quickWins.map((q, idx) => (
                  <li key={idx} className="text-sm text-slate flex gap-2">
                    <span className="text-deep-mint font-bold">✓</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {!priorities.length && !quickWins.length ? (
            <p className="text-sm text-slate">No priority data for this audit.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
