"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Button } from "@/components/ui/Button";
import { RequireAuth } from "@/components/tools/RequireAuth";
import { AuditLoadingState } from "@/components/audit/AuditLoadingState";
import {
  WebsiteAuditResults,
  type WebsiteAuditResult,
} from "@/components/audit/WebsiteAuditResults";
import { useAuth } from "@/contexts/AuthContext";
import { downloadReportPdf, postWebsiteAudit } from "@/lib/api/audit";
import { brandVoice } from "@/config/brand";

function SeoAuditContent() {
  const { idToken } = useAuth();
  const [url, setUrl] = useState("https://");
  const [useFallback, setUseFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WebsiteAuditResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("audit:websiteReport");
      if (!raw) return;
      sessionStorage.removeItem("audit:websiteReport");
      const parsed = JSON.parse(raw);
      setResult({
        auditId: parsed.auditId,
        provider: parsed.provider,
        scraped: parsed.scraped,
        audit: parsed.audit,
      });
      if (parsed.audit?.url) setUrl(String(parsed.audit.url));
      setTimeout(() => {
        document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      // ignore
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idToken) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await postWebsiteAudit(idToken, { url, useFallback });
      setResult({
        auditId: data.auditId,
        provider: data.provider,
        scraped: data.scraped,
        audit: data.audit as Record<string, unknown>,
      });
      setTimeout(() => {
        document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handlePdf(auditId: string) {
    if (!idToken) return;
    setPdfLoading(true);
    try {
      await downloadReportPdf(idToken, auditId, `website-audit-${auditId}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <RequireAuth>
      <BrandedPageHero
        overline="Free tool"
        title="Website AI Visibility Audit"
        description="Scan SEO, AEO, GEO, performance, accessibility, security, and compliance — with a prioritized fix plan."
      />
      <Container className="pb-20">
        <form
          onSubmit={onSubmit}
          className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 -mt-4"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
            placeholder="https://yourbusiness.com"
            className="flex-1 rounded-lg border-2 border-border px-4 py-3 text-sm outline-none focus:border-primary disabled:opacity-50"
            aria-label="Website URL"
          />
          <Button type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? "Scanning…" : brandVoice.ctaAudit}
          </Button>
        </form>

        <div className="max-w-3xl mx-auto mt-4 flex flex-wrap items-center gap-4 text-sm text-slate">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useFallback}
              onChange={(e) => setUseFallback(e.target.checked)}
              className="rounded border-border"
            />
            Use reliability fallback chain
          </label>
          <Link href="/tools/reports/" className="text-primary font-semibold hover:underline">
            View saved reports
          </Link>
        </div>

        {error ? (
          <p className="max-w-3xl mx-auto mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        ) : null}

        <div className="max-w-4xl mx-auto mt-10">
          {loading ? <AuditLoadingState /> : null}
          {result && !loading ? (
            <WebsiteAuditResults
              result={result}
              onDownloadPdf={handlePdf}
              pdfLoading={pdfLoading}
            />
          ) : null}
        </div>
      </Container>
    </RequireAuth>
  );
}

export default function SeoAuditPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate">Loading…</div>}>
      <SeoAuditContent />
    </Suspense>
  );
}
