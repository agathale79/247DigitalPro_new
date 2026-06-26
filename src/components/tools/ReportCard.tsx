"use client";

import { FileText, Globe, Share2 } from "lucide-react";
import type { AuditListItem } from "@/lib/api/audit";
import { cn } from "@/lib/cn";

export function ReportCard({
  item,
  busy,
  onOpen,
  onPdf,
}: {
  item: AuditListItem;
  busy?: boolean;
  onOpen: () => void;
  onPdf?: () => void;
}) {
  const isSocial = item.auditType === "social";
  const Icon = isSocial ? Share2 : Globe;

  return (
    <article className="rounded-xl border border-border bg-white p-4 hover:border-deep-mint/40 transition-colors">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            isSocial ? "bg-pale-blue text-primary" : "bg-brand-mint/40 text-deep-navy"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-semibold text-sm text-ink truncate">
            {item.title || item.brand || item.url || "Audit report"}
          </h3>
          <p className="text-xs text-slate mt-0.5 truncate">{item.url || item.brand}</p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            <span className="font-bold text-primary">{item.overallScore ?? "—"}/100</span>
            {item.grade ? (
              <span className="text-slate">Grade {item.grade}</span>
            ) : null}
            <span className="text-slate">
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onOpen}
          disabled={busy}
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-primary text-on-dark disabled:opacity-50"
        >
          {busy ? "Opening…" : "Open report"}
        </button>
        {item.hasPdf && onPdf ? (
          <button
            type="button"
            onClick={onPdf}
            disabled={busy}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border-2 border-primary text-primary disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </button>
        ) : null}
      </div>
    </article>
  );
}
