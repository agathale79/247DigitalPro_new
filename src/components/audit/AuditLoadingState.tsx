"use client";

import { Loader2 } from "lucide-react";

export function AuditLoadingState({ label = "Running audit…" }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16 px-6 rounded-xl border border-border bg-white"
      role="status"
    >
      <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
      <div className="text-center max-w-md">
        <p className="font-heading font-semibold text-ink">{label}</p>
        <p className="text-sm text-slate mt-2">
          This usually takes 30–90 seconds. We analyze SEO, AEO, GEO, performance, security,
          and compliance signals.
        </p>
      </div>
    </div>
  );
}
