"use client";

import { cn } from "@/lib/cn";

const RING_CIRC = 2 * Math.PI * 42;

export const CORE_PILLARS = [
  { key: "seo", label: "SEO", desc: "Technical foundation and on-page quality.", accent: "#1E5A98" },
  { key: "aeo", label: "AEO", desc: "Readiness for AI-generated answers.", accent: "#1A9E80" },
  { key: "geo", label: "GEO", desc: "Visibility across generative AI engines.", accent: "#0d9488" },
] as const;

export const WEBSITE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "categories", label: "Categories" },
  { id: "priorities", label: "Priorities" },
] as const;

export type WebsiteTabId = (typeof WEBSITE_TABS)[number]["id"];

export function clampScore(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function scoreTone(score: number): "good" | "warn" | "bad" {
  const s = clampScore(score);
  if (s >= 80) return "good";
  if (s >= 60) return "warn";
  return "bad";
}

export function scoreColor(score: number): string {
  const tone = scoreTone(score);
  if (tone === "good") return "#16a34a";
  if (tone === "warn") return "#d97706";
  return "#dc2626";
}

export function scoreToLetterGrade(score: number): string {
  const s = clampScore(score);
  if (s >= 90) return "A+";
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  if (s >= 50) return "D";
  return "F";
}

export function stripSeverity(issue: unknown): string {
  return String(issue ?? "").replace(/^\[(CRITICAL|HIGH|MEDIUM|LOW)\]\s*/i, "");
}

export function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return String(url ?? "")
      .replace(/^https?:\/\//, "")
      .split("/")[0];
  }
}

export function ScoreRing({ score, size = "lg" }: { score: number; size?: "lg" | "sm" }) {
  const s = clampScore(score);
  const fill = RING_CIRC * (s / 100);
  const stroke = scoreColor(s);
  const dim = size === "sm" ? "w-20 h-20" : "w-28 h-28";
  return (
    <div className={cn("relative", dim)} aria-hidden="true">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={stroke}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${fill} ${RING_CIRC - fill}`}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-heading font-bold text-xl"
        style={{ color: stroke }}
      >
        {s}
      </span>
    </div>
  );
}

export function ScorePill({ score }: { score: number }) {
  const s = clampScore(score);
  const tone = scoreTone(s);
  return <span className={cn("audit-pill", `audit-pill--${tone}`)}>{s}</span>;
}

export function SeverityBadge({ issue }: { issue: unknown }) {
  const t = String(issue ?? "");
  const sev = t.match(/^\[(CRITICAL|HIGH|MEDIUM|LOW)\]/i)?.[1]?.toUpperCase();
  const cls =
    sev === "CRITICAL"
      ? "critical"
      : sev === "HIGH"
        ? "high"
        : sev === "MEDIUM"
          ? "medium"
          : "low";
  return <span className={cn("audit-sev", `audit-sev--${cls}`)}>{sev ?? "LOW"}</span>;
}

export function formatCheckDisplay(value: unknown) {
  if (value === null || value === undefined) {
    return { icon: "—", className: "text-slate", text: "Unknown" };
  }
  const str = String(value).toLowerCase();
  if (value === true || str === "pass" || str === "true") {
    return { icon: "✓", className: "text-green-600", text: "Pass" };
  }
  if (str === "warn" || str === "partial") {
    return { icon: "!", className: "text-amber-600", text: "Warning" };
  }
  if (value === false || str === "fail" || str === "false") {
    return { icon: "✗", className: "text-red-600", text: "Fail" };
  }
  return { icon: "·", className: "text-slate", text: String(value) };
}

export function PillarCard({
  label,
  score,
  description,
  accent,
}: {
  label: string;
  score: number;
  description: string;
  accent: string;
}) {
  const s = clampScore(score);
  const tone = scoreTone(s);
  return (
    <article className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex justify-between text-xs font-semibold text-slate mb-2">
        <span>{label}</span>
        <span>{s}/100</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="font-heading text-3xl font-bold text-ink">{s}</span>
        <span className="text-sm font-semibold text-slate mb-1">
          {scoreToLetterGrade(s)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface overflow-hidden mb-2">
        <div
          className={cn("h-full rounded-full", `audit-bar-${tone}`)}
          style={{ width: `${s}%`, backgroundColor: accent }}
        />
      </div>
      <p className="text-xs text-slate leading-relaxed">{description}</p>
    </article>
  );
}

export function DimensionGrid({
  items,
}: {
  items: { key: string; label: string; score: number }[];
}) {
  if (!items?.length) return null;
  const sorted = [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sorted.map((item) => {
        const s = clampScore(item.score ?? 0);
        const tone = scoreTone(s);
        return (
          <div key={item.key} className="rounded-lg border border-border bg-white p-3">
            <div className="flex justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-ink truncate" title={item.label}>
                {item.label}
              </span>
              <span className={cn("text-sm font-bold", `audit-tone-${tone}`)}>{s}</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface overflow-hidden">
              <div
                className={cn("h-full rounded-full", `audit-bar-${tone}`)}
                style={{ width: `${s}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function buildCategoryBlocks(audit: Record<string, unknown> | undefined) {
  if (!audit) return [];
  const entries: { key: string; title: string; data: Record<string, unknown> }[] = [
    { key: "seo", title: "SEO", data: audit.seo as Record<string, unknown> },
    { key: "aeo", title: "AEO (AI Readiness)", data: audit.aeo as Record<string, unknown> },
    { key: "geo", title: "GEO (Generative)", data: audit.geo as Record<string, unknown> },
    { key: "ai_citation", title: "AI Citation", data: audit.ai_citation as Record<string, unknown> },
    {
      key: "trust_and_entity",
      title: "Trust & Entity",
      data: audit.trust_and_entity as Record<string, unknown>,
    },
    { key: "local_seo", title: "Local SEO", data: audit.local_seo as Record<string, unknown> },
    {
      key: "structured_data",
      title: "Structured Data",
      data: audit.structured_data as Record<string, unknown>,
    },
    {
      key: "accessibility",
      title: "Accessibility",
      data: audit.accessibility as Record<string, unknown>,
    },
    { key: "performance", title: "Performance", data: audit.performance as Record<string, unknown> },
    { key: "security", title: "Security", data: audit.security as Record<string, unknown> },
    {
      key: "usa_compliance",
      title: "Compliance",
      data: audit.usa_compliance as Record<string, unknown>,
    },
    { key: "content", title: "Content", data: audit.content as Record<string, unknown> },
    { key: "mobile_ux", title: "Mobile UX", data: audit.mobile_ux as Record<string, unknown> },
  ];
  return entries.filter((item) => item.data && typeof item.data === "object");
}
