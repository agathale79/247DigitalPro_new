"use client";

import {
  clampScore,
  scoreToLetterGrade,
  scoreTone,
} from "@/components/audit/websiteAuditUi";
import { cn } from "@/lib/cn";

const PLATFORMS = [
  { key: "facebook", label: "Facebook", color: "#1877F2" },
  { key: "instagram", label: "Instagram", color: "#E4405F" },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2" },
] as const;

type PlatformBlock = {
  score?: number;
  issues?: string[];
  recommendations?: string[];
  quick_wins?: string[];
};

export function SocialAuditReport({
  result,
}: {
  result: {
    auditId?: string;
    audit?: Record<string, unknown>;
    collected?: Record<string, unknown>;
  };
}) {
  const audit = result.audit ?? {};
  const overall = clampScore(audit.overall_social_score ?? 0);
  const grade = String(audit.overall_grade ?? scoreToLetterGrade(overall));
  const brand = String(audit.brand ?? "Your brand");
  const tone = scoreTone(overall);

  return (
    <div id="social-report" className="space-y-6 scroll-mt-8">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <p className="text-overline mb-1">Social audit complete</p>
        <h2 className="font-heading font-bold text-2xl text-wordmark">{brand}</h2>
        <div className="flex items-center gap-4 mt-4">
          <span
            className={cn(
              "text-4xl font-heading font-bold",
              `audit-tone-${tone}`
            )}
          >
            {overall}
          </span>
          <span className="text-sm font-semibold text-slate">/100 · Grade {grade}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {PLATFORMS.map((p) => {
          const block = audit[p.key] as PlatformBlock | undefined;
          if (!block) return null;
          const s = clampScore(block.score ?? 0);
          const t = scoreTone(s);
          return (
            <article
              key={p.key}
              className="rounded-xl border border-border bg-white p-4"
              style={{ borderTopWidth: 3, borderTopColor: p.color }}
            >
              <h3 className="font-heading font-semibold text-ink">{p.label}</h3>
              <p className={cn("text-3xl font-bold mt-2", `audit-tone-${t}`)}>{s}</p>
              {(block.issues ?? []).slice(0, 3).map((issue, i) => (
                <p key={i} className="text-xs text-slate mt-2">
                  • {issue}
                </p>
              ))}
              {(block.recommendations ?? []).slice(0, 2).map((r, i) => (
                <p key={`r-${i}`} className="text-xs text-primary mt-1">
                  → {r}
                </p>
              ))}
            </article>
          );
        })}
      </div>

      {(audit.top_5_priorities as Array<Record<string, unknown>>)?.length ? (
        <section className="rounded-xl border border-border bg-pale-blue/30 p-5">
          <h3 className="font-heading font-semibold text-ink mb-3">Top priorities</h3>
          <div className="space-y-2">
            {(audit.top_5_priorities as Array<Record<string, unknown>>).map((item, i) => (
              <div key={i} className="text-sm text-slate">
                <strong className="text-ink">{String(item.platform ?? item.category)}:</strong>{" "}
                {String(item.issue ?? item.recommendation ?? item.action)}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {(audit.cross_platform as Record<string, unknown>)?.summary ? (
        <p className="text-sm text-slate leading-relaxed">
          {String((audit.cross_platform as Record<string, unknown>).summary)}
        </p>
      ) : null}
    </div>
  );
}
