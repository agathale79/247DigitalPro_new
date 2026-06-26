"use client";

import { SeverityBadge, stripSeverity } from "@/components/audit/websiteAuditUi";

const RATING_CLASS: Record<string, string> = {
  pass: "bg-green-100 text-green-800",
  warn: "bg-amber-100 text-amber-800",
  fail: "bg-red-100 text-red-800",
};

export function WebsiteReconPanel({
  scraped,
  audit,
}: {
  scraped?: Record<string, unknown>;
  audit?: Record<string, unknown>;
}) {
  const meta = scraped?.collection_meta as Record<string, unknown> | undefined;
  if (!meta) return null;

  const confidence =
    (audit?.data_confidence as string) ?? (meta.data_confidence as string) ?? "medium";
  const blockers = (audit?.hard_blockers as string[]) ?? [];
  const signals = (meta.technical_signals as Array<Record<string, unknown>>) ?? [];

  return (
    <div className="rounded-xl border border-border bg-pale-blue/30 p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading font-semibold text-ink">Live site recon</h3>
          <p className="text-sm text-slate mt-1">
            Technical signals captured from your URL before AI analysis.
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-white border border-border text-primary">
          {confidence} confidence
        </span>
      </div>

      {signals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {signals.map((sig) => (
            <div
              key={String(sig.id ?? sig.label)}
              className="rounded-lg bg-white border border-border p-3"
            >
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  RATING_CLASS[String(sig.rating)] ?? RATING_CLASS.warn
                }`}
              >
                {String(sig.rating).toUpperCase()}
              </span>
              <div className="font-semibold text-sm text-ink mt-2">{String(sig.label)}</div>
              <div className="text-xs text-slate mt-0.5">{String(sig.detail)}</div>
            </div>
          ))}
        </div>
      ) : null}

      {(meta.recon_notes as string[])?.length ? (
        <ul className="text-sm text-slate list-disc pl-5 space-y-1">
          {(meta.recon_notes as string[]).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}

      {blockers.length > 0 ? (
        <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
          <strong className="text-sm text-red-900">Hard blockers</strong>
          <p className="text-xs text-red-800/80 mt-1 mb-2">
            Resolve before scaling ads or major SEO pushes.
          </p>
          {blockers.map((b, i) => (
            <div key={`hb-${i}`} className="flex gap-2 text-sm mt-2">
              <SeverityBadge issue={b} />
              <span>{stripSeverity(b)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
