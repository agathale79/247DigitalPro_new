"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Loader2, Search, Share2, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth, getFirebaseInitError } from "@/lib/firebase";
import { OtpInput } from "@/components/tools/OtpInput";
import { siteConfig } from "@/config/site";
import { brandVoice } from "@/config/brand";

const DEFAULT_PHONE = "+1";

const FEATURES = [
  {
    icon: Search,
    title: "Website SEO Audit",
    desc: "SEO, AEO, GEO, performance, security, and compliance in one report.",
  },
  {
    icon: Share2,
    title: "Social Media Audit",
    desc: "Facebook, Instagram, and LinkedIn presence with actionable fixes.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    desc: "Save history and download professional reports to share with your team.",
  },
];

function LoginContent() {
  const { user, firebaseError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/tools/seo-audit/";

  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<Awaited<
    ReturnType<typeof signInWithPhoneNumber>
  > | null>(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState("");

  const cleanedPhone = String(phone ?? "").replace(/\s+/g, "");
  const e164 = (() => {
    const parsed = parsePhoneNumberFromString(cleanedPhone);
    return parsed?.isValid() ? parsed.number : null;
  })();

  const canSendOtp = Boolean(e164) && resendIn <= 0;
  const canVerify = otp.replace(/\D/g, "").length === 6;

  useEffect(() => {
    if (user) router.replace(nextPath);
  }, [user, router, nextPath]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  async function sendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError("");
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error(getFirebaseInitError() ?? "Firebase not configured");
      if (!e164) throw new Error("Enter a valid mobile number");

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      const conf = await signInWithPhoneNumber(auth, e164, window.recaptchaVerifier);
      setConfirmation(conf);
      setStep("otp");
      setResendIn(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!confirmation) throw new Error("Please request an OTP first.");
      await confirmation.confirm(otp.replace(/\D/g, "").slice(0, 6));
      router.replace(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-surface">
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-deep-navy text-white px-10 py-12">
        <div>
          <Link href="/" className="font-heading font-bold text-brand-mint text-lg">
            {siteConfig.name}
          </Link>
          <h2 className="font-heading font-bold text-2xl mt-10 leading-tight">
            Free AI visibility audits for your business
          </h2>
          <p className="text-sm text-white/75 mt-4 leading-relaxed">
            {brandVoice.heroLead}
          </p>
          <div className="space-y-5 mt-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-mint/20 flex items-center justify-center text-brand-mint shrink-0">
                  <f.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className="text-xs text-white/65 mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-8 border-t border-white/15 text-center text-xs">
          <div>
            <div className="font-bold text-brand-mint">13+</div>
            <div className="text-white/60">Categories</div>
          </div>
          <div>
            <div className="font-bold text-brand-mint">SEO·AEO·GEO</div>
            <div className="text-white/60">Pillars</div>
          </div>
          <div>
            <div className="font-bold text-brand-mint">PDF</div>
            <div className="text-white/60">Export</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {(firebaseError || error) && (
            <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm">
              {firebaseError ?? error}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={sendOtp} noValidate>
              <h1 className="font-heading font-bold text-2xl text-wordmark">Sign in</h1>
              <p className="text-sm text-slate mt-2 mb-6">
                Verify your mobile number to run free audits and save your report history.
              </p>
              <label className="block text-xs font-semibold text-slate mb-1.5" htmlFor="phone">
                Mobile number
              </label>
              <div className="wa-phone-field mb-2">
                <PhoneInput
                  defaultCountry="us"
                  value={phone}
                  onChange={setPhone}
                  disabled={busy}
                  placeholder="(555) 000-0000"
                />
              </div>
              <p className="text-xs text-slate mb-4">
                OTP will be sent to{" "}
                <span className="font-semibold text-ink">{e164 ?? "—"}</span>
              </p>
              <div id="recaptcha-container" />
              <button
                type="submit"
                disabled={busy || !canSendOtp}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-heading font-semibold text-sm bg-primary text-on-dark disabled:opacity-50"
              >
                {busy ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
              <p className="mt-6 text-center text-xs text-slate">
                By continuing, you agree to our{" "}
                <Link href="/legal/privacy-policy/" className="text-primary font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          ) : (
            <form onSubmit={verifyOtp} noValidate>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setConfirmation(null);
                  setOtp("");
                }}
                className="text-xs font-semibold text-slate hover:text-ink mb-4"
              >
                ← Back
              </button>
              <h1 className="font-heading font-bold text-2xl text-wordmark">Enter OTP</h1>
              <p className="text-sm text-slate mt-2 mb-6">
                6-digit code sent to <span className="font-semibold">{e164}</span>
              </p>
              <OtpInput value={otp} onChange={setOtp} disabled={busy} />
              <button
                type="submit"
                disabled={busy || !canVerify}
                className="w-full mt-6 py-3 rounded-lg font-heading font-semibold text-sm bg-primary text-on-dark disabled:opacity-50"
              >
                {busy ? "Verifying…" : "Verify & continue"}
              </button>
              <button
                type="button"
                onClick={() => sendOtp()}
                disabled={busy || resendIn > 0}
                className="w-full mt-3 text-xs text-slate disabled:opacity-50"
              >
                {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate text-sm">
          Loading…
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
