/**
 * Email delivery for enquiries (server only).
 *
 * Production: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO_EMAIL
 * (and optionally ENQUIRY_FROM_EMAIL). Works with Hostinger, Google Workspace,
 * Zoho or any SMTP provider.
 *
 * Development with no SMTP configured: messages are rendered and printed to the
 * terminal instead of sent, so the full flow can be tested locally.
 */
import nodemailer from "nodemailer";
import { site } from "@/data/site";

let cached;

export function getMailer() {
  if (cached !== undefined) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT || 465);
    cached = {
      mode: "smtp",
      transport: nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      }),
    };
  } else if (process.env.NODE_ENV !== "production") {
    cached = { mode: "dev-log", transport: nodemailer.createTransport({ jsonTransport: true }) };
  } else {
    cached = null; // production without SMTP → enquiries cannot be delivered
  }
  return cached;
}

/**
 * Spec: "do not hard-code an unverified recipient". ENQUIRY_TO_EMAIL is required
 * in production; in development it falls back to the address in site.js.
 */
export function getRecipient() {
  if (process.env.ENQUIRY_TO_EMAIL) return process.env.ENQUIRY_TO_EMAIL;
  return process.env.NODE_ENV !== "production" ? site.email : null;
}

export async function sendMail({ subject, text, html, replyTo }) {
  const mailer = getMailer();
  const to = getRecipient();
  if (!mailer || !to) throw new Error("Email delivery is not configured (SMTP_* / ENQUIRY_TO_EMAIL).");
  const from = process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER || `no-reply@${new URL(site.url).hostname}`;
  const info = await mailer.transport.sendMail({
    from: `${site.name} Website <${from}>`,
    to,
    subject,
    text,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
  if (mailer.mode === "dev-log") {
    console.info(`\n[dev] Enquiry email (not sent – no SMTP configured) → ${to}\n${subject}\n\n${text}\n`);
  }
  return info;
}
