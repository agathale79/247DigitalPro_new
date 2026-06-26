"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Button } from "@/components/ui/Button";
import { RequireAuth } from "@/components/tools/RequireAuth";
import { AuditLoadingState } from "@/components/audit/AuditLoadingState";
import { SocialAuditReport } from "@/components/audit/SocialAuditReport";
import { useAuth } from "@/contexts/AuthContext";
import { downloadReportPdf, postSocialAudit } from "@/lib/api/audit";

function SocialAuditContent() {
  const { idToken } = useAuth();
  const [brand, setBrand] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [useFallback, setUseFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    auditId?: string;
    audit?: Record<string, unknown>;
    collected?: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("audit:socialReport");
      if (!raw) return;
      sessionStorage.removeItem("audit:socialReport");
      const parsed = JSON.parse(raw);
      setResult(parsed);
      if (parsed.audit?.brand) setBrand(String(parsed.audit.brand));
      setTimeout(() => {
        document.getElementById("social-report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      // ignore
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idToken) return;
    if (!brand.trim()) {
      setError("Brand name is required.");
      return;
    }
    const hasUrl =
      websiteUrl.trim() ||
      facebookUrl.trim() ||
      instagramUrl.trim() ||
      linkedinUrl.trim();
    if (!hasUrl) {
      setError("Add at least one website or social profile URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await postSocialAudit(idToken, {
        brand: brand.trim(),
        websiteUrl: websiteUrl.trim() || undefined,
        facebookUrl: facebookUrl.trim() || undefined,
        instagramUrl: instagramUrl.trim() || undefined,
        linkedinUrl: linkedinUrl.trim() || undefined,
        useFallback,
      });
      setResult({
        auditId: data.auditId,
        audit: data.audit as Record<string, unknown>,
        collected: data.scraped,
      });
      setTimeout(() => {
        document.getElementById("social-report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handlePdf() {
    if (!idToken || !result?.auditId) return;
    setPdfLoading(true);
    try {
      await downloadReportPdf(
        idToken,
        result.auditId,
        `social-audit-${result.auditId}.pdf`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPdfLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border-2 border-border px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50";

  return (
    <RequireAuth>
      <BrandedPageHero
        overline="Free tool"
        title="Social Media Audit"
        description="Score Facebook, Instagram, and LinkedIn presence — profile quality, content, engagement, and compliance."
      />
      <Container className="pb-20">
        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-4 -mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">Brand name *</label>
            <input
              className={inputClass}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              disabled={loading}
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">Website URL</label>
            <input
              type="url"
              className={inputClass}
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={loading}
              placeholder="https://yourbusiness.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">Facebook URL</label>
            <input
              type="url"
              className={inputClass}
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">Instagram URL</label>
            <input
              type="url"
              className={inputClass}
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">LinkedIn URL</label>
            <input
              type="url"
              className={inputClass}
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-slate">
            <input
              type="checkbox"
              checked={useFallback}
              onChange={(e) => setUseFallback(e.target.checked)}
            />
            Use reliability fallback chain
          </label>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Analyzing…" : "Run social audit"}
          </Button>
        </form>

        <p className="max-w-2xl mx-auto mt-4 text-sm">
          <Link href="/tools/reports/" className="text-primary font-semibold hover:underline">
            View saved reports
          </Link>
        </p>

        {error ? (
          <p className="max-w-2xl mx-auto mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        ) : null}

        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          {loading ? <AuditLoadingState label="Running social audit…" /> : null}
          {result && !loading ? (
            <>
              {result.auditId ? (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePdf}
                    disabled={pdfLoading}
                  >
                    {pdfLoading ? "Preparing PDF…" : "Download PDF"}
                  </Button>
                </div>
              ) : null}
              <SocialAuditReport result={result} />
            </>
          ) : null}
        </div>
      </Container>
    </RequireAuth>
  );
}

export default function SocialAuditPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate">Loading…</div>}>
      <SocialAuditContent />
    </Suspense>
  );
}
