import { apiFetch } from "@/lib/api/client";
import { getApiBase } from "@/lib/config";

export type AuditProfile = {
  uid: string;
  displayName: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
};

export type AuditListItem = {
  id: string;
  url: string;
  auditType: string;
  provider: string;
  overallScore: number;
  createdAt: string;
  brand: string | null;
  title: string;
  grade: string;
  platformScores?: Record<string, number | null>;
  hasPdf: boolean;
};

export type WebsiteAuditResponse = {
  auditId: string;
  reportId?: string;
  provider?: string;
  scraped?: Record<string, unknown>;
  audit?: Record<string, unknown>;
  reportPaths?: { html?: string; pdf?: string | null };
};

export type SocialAuditBody = {
  brand: string;
  websiteUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  useFallback?: boolean;
};

const SOCIAL_PATH_CANDIDATES = [
  process.env.NEXT_PUBLIC_SOCIAL_AUDIT_PATH,
  "/social-audit",
].filter(Boolean) as string[];

function isRouteNotFound(status: number, message: string): boolean {
  const msg = message.toLowerCase();
  return status === 404 && (msg.includes("route not found") || msg.includes("not found"));
}

async function postJson(path: string, idToken: string, body: unknown) {
  const response = await fetch(`${getApiBase()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

export async function fetchProfile(token: string): Promise<AuditProfile> {
  const { data } = await apiFetch<AuditProfile>("/me/profile", { token });
  return data;
}

export async function patchProfile(
  token: string,
  body: { displayName: string | null; company: string | null }
): Promise<AuditProfile> {
  const { data } = await apiFetch<AuditProfile>("/me/profile", {
    token,
    method: "PATCH",
    body,
  });
  return data;
}

export async function fetchMyAudits(token: string): Promise<AuditListItem[]> {
  const { data } = await apiFetch<AuditListItem[] | { error?: string }>(
    "/me/audits",
    { token }
  );
  return Array.isArray(data) ? data : [];
}

export async function postWebsiteAudit(
  token: string,
  body: { url: string; useFallback?: boolean }
): Promise<WebsiteAuditResponse> {
  const { data } = await apiFetch<WebsiteAuditResponse>("/audit", {
    token,
    method: "POST",
    body,
  });
  return data;
}

export async function postSocialAudit(
  idToken: string,
  body: SocialAuditBody
): Promise<WebsiteAuditResponse> {
  let lastError = "Social audit endpoint not found.";

  for (const path of SOCIAL_PATH_CANDIDATES) {
    const { response, data } = await postJson(path, idToken, body);
    if (response.ok) return data as WebsiteAuditResponse;
    const errMsg =
      (data as { error?: string }).error ??
      `Request failed (${response.status})`;
    lastError = errMsg;
    if (!isRouteNotFound(response.status, errMsg)) {
      throw new Error(errMsg);
    }
  }

  throw new Error(lastError);
}

export async function fetchReport(
  token: string,
  auditId: string
): Promise<Record<string, unknown>> {
  const { data } = await apiFetch<Record<string, unknown>>(
    `/report/${encodeURIComponent(auditId)}`,
    { token }
  );
  return data;
}

export async function downloadReportPdf(
  token: string,
  auditId: string,
  filename: string
): Promise<void> {
  const response = await fetch(
    `${getApiBase()}/report/${encodeURIComponent(auditId)}/pdf`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) {
    const j = await response.json().catch(() => ({}));
    throw new Error((j as { error?: string }).error ?? "PDF download failed");
  }
  const blob = await response.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
