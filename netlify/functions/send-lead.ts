import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

/**
 * Sends form submissions (Book Strategy Call popup, Contact page form) as an
 * email through the mailbox's own SMTP server — no third-party form relay.
 *
 * Required environment variables (set in Netlify Site settings → Environment
 * variables, not in this repo):
 *   SMTP_HOST   e.g. smtp.office365.com
 *   SMTP_PORT   e.g. 587
 *   SMTP_USER   the mailbox login, e.g. info@247digitalpro.com
 *   SMTP_PASS   the mailbox password / app password
 *   SMTP_TO     (optional) recipient, defaults to SMTP_USER
 */

interface LeadPayload {
  subject: string;
  fields: Record<string, string>;
}

function isLeadPayload(value: unknown): value is LeadPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.subject === "string" &&
    typeof v.fields === "object" &&
    v.fields !== null &&
    !Array.isArray(v.fields)
  );
}

function renderHtmlTable(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;border:1px solid #e2e8f0;">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${escapeHtml(
          String(value),
        )}</td></tr>`,
    )
    .join("");

  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid JSON body" }),
    };
  }

  if (!isLeadPayload(payload)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Expected { subject: string, fields: Record<string,string> }",
      }),
    };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("send-lead: missing SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS env vars");
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Email is not configured on the server yet.",
      }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"247 Digital Pro Website" <${SMTP_USER}>`,
      to: SMTP_TO || SMTP_USER,
      replyTo: payload.fields.Email || undefined,
      subject: payload.subject,
      html: renderHtmlTable(payload.fields),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("send-lead: sendMail failed", err);
    return {
      statusCode: 502,
      body: JSON.stringify({
        success: false,
        message: "Failed to send email.",
      }),
    };
  }
};
