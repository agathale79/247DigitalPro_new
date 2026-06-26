"use client";

import { Suspense, useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Button } from "@/components/ui/Button";
import { RequireAuth } from "@/components/tools/RequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { patchProfile } from "@/lib/api/audit";

function ProfileContent() {
  const { user, idToken, profile, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDisplayName(profile?.displayName ?? "");
    setCompany(profile?.company ?? "");
  }, [profile]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idToken) return;
    setBusy(true);
    setMessage("");
    try {
      await patchProfile(idToken, {
        displayName: displayName.trim() || null,
        company: company.trim() || null,
      });
      await refreshProfile();
      setMessage("Profile saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  const phone = profile?.phone ?? user?.phoneNumber ?? "—";

  return (
    <RequireAuth>
      <BrandedPageHero
        overline="Account"
        title="Profile"
        description="Add your name and company so reports show a friendly identity."
      />
      <Container className="pb-20">
        <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4 -mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate mb-1">Phone</label>
            <p className="text-sm text-ink font-medium">{phone}</p>
            <p className="text-xs text-slate mt-0.5">Managed by secure sign-in (cannot edit here)</p>
          </div>
          <div>
            <label htmlFor="displayName" className="block text-xs font-semibold text-slate mb-1">
              Display name
            </label>
            <input
              id="displayName"
              className="w-full rounded-lg border-2 border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-slate mb-1">
              Company
            </label>
            <input
              id="company"
              className="w-full rounded-lg border-2 border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={busy}
            />
          </div>
          {message ? (
            <p
              className={`text-sm ${message === "Profile saved." ? "text-green-700" : "text-red-700"}`}
            >
              {message}
            </p>
          ) : null}
          <Button type="submit" variant="primary" disabled={busy}>
            {busy ? "Saving…" : "Save profile"}
          </Button>
        </form>
      </Container>
    </RequireAuth>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate">Loading…</div>}>
      <ProfileContent />
    </Suspense>
  );
}
