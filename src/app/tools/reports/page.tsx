"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { RequireAuth } from "@/components/tools/RequireAuth";
import { ReportCard } from "@/components/tools/ReportCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  downloadReportPdf,
  fetchMyAudits,
  fetchReport,
  type AuditListItem,
} from "@/lib/api/audit";
import { cn } from "@/lib/cn";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "website", label: "Website" },
  { id: "social", label: "Social" },
] as const;

function ReportsContent() {
  const router = useRouter();
  const { idToken } = useAuth();
  const [audits, setAudits] = useState<AuditListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyKey, setBusyKey] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  useEffect(() => {
    if (!idToken) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const list = await fetchMyAudits(idToken);
        if (!cancelled) setAudits(list);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [idToken]);

  const filtered = useMemo(() => {
    let list = audits;
    if (filter === "website") list = list.filter((a) => a.auditType !== "social");
    if (filter === "social") list = list.filter((a) => a.auditType === "social");
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((a) => {
      const hay = [a.url, a.title, a.brand, a.id].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [audits, filter, query]);

  async function openReport(item: AuditListItem) {
    if (!idToken) return;
    setActionError("");
    setBusyKey(`open:${item.id}`);
    try {
      const j = await fetchReport(idToken, item.id);
      if (j.auditType === "social" || item.auditType === "social") {
        sessionStorage.setItem(
          "audit:socialReport",
          JSON.stringify({
            auditId: item.id,
            audit: j.audit,
            collected: j.scraped,
          })
        );
        router.push("/tools/social-audit/");
        return;
      }
      sessionStorage.setItem(
        "audit:websiteReport",
        JSON.stringify({
          auditId: item.id,
          provider: j.provider,
          scraped: j.scraped,
          audit: j.audit,
        })
      );
      router.push("/tools/seo-audit/");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyKey("");
    }
  }

  async function downloadPdf(item: AuditListItem) {
    if (!idToken) return;
    setBusyKey(`pdf:${item.id}`);
    setActionError("");
    try {
      const prefix = item.auditType === "social" ? "social" : "website";
      await downloadReportPdf(idToken, item.id, `${prefix}-audit-${item.id}.pdf`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyKey("");
    }
  }

  return (
    <RequireAuth>
      <BrandedPageHero
        overline="Your account"
        title="My Reports"
        description="Every website and social audit you run is saved here — reopen results or download PDFs."
      />
      <Container className="pb-20">
        <div className="flex flex-col sm:flex-row gap-4 -mt-2 mb-8">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by URL or brand…"
            className="flex-1 rounded-lg border-2 border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-colors",
                  filter === f.id
                    ? "bg-primary text-on-dark"
                    : "border border-border text-slate hover:text-ink"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-700 mb-4">{error}</p>
        ) : null}
        {actionError ? (
          <p className="text-sm text-red-700 mb-4">{actionError}</p>
        ) : null}

        {loading ? (
          <p className="text-sm text-slate" role="status">
            Loading reports…
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate">
            No reports yet. Run a{" "}
            <a href="/tools/seo-audit/" className="text-primary font-semibold">
              website audit
            </a>{" "}
            or{" "}
            <a href="/tools/social-audit/" className="text-primary font-semibold">
              social audit
            </a>
            .
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <ReportCard
                key={item.id}
                item={item}
                busy={busyKey.startsWith(`open:${item.id}`) || busyKey === `pdf:${item.id}`}
                onOpen={() => openReport(item)}
                onPdf={item.hasPdf ? () => downloadPdf(item) : undefined}
              />
            ))}
          </div>
        )}
      </Container>
    </RequireAuth>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate">Loading…</div>}>
      <ReportsContent />
    </Suspense>
  );
}
