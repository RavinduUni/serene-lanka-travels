/**
 * POST /api/quote-enquiry – Request-a-Quote form.
 * Validates the payload, renders an HTML email and delivers it via sendMail.
 */
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { site } from "@/data/site";

const MAX_BYTES = 10_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = globalThis.__quoteEnquiryHits || (globalThis.__quoteEnquiryHits = new Map());

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function makeId() {
  return `QEQ-${randomBytes(3).toString("hex").toUpperCase()}`;
}

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 0;border-bottom:1px solid #e6eaf1;width:40%;font-size:13px;color:#5b6478;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:6px 0;border-bottom:1px solid #e6eaf1;font-size:14px">${escapeHtml(value)}</td>
  </tr>`;
}

function renderEmail(d, enquiryId, receivedAt) {
  const tourName = d.tourName || "Unknown tour";
  const subject = `New quote request | ${enquiryId} | ${d.name} – ${tourName}`;
  const text = [
    `Reference: ${enquiryId}`,
    `Received: ${receivedAt} (UTC)`,
    "",
    `Tour: ${tourName}`,
    `Name: ${d.name}`,
    `Country: ${d.country}`,
    `Email: ${d.email}`,
    d.whatsapp && `WhatsApp: ${d.whatsapp}`,
    d.date && `Preferred date: ${d.date}`,
    `Adults: ${d.adults}`,
    d.children && `Children: ${d.children}`,
    d.message && `Message: ${d.message}`,
  ].filter(Boolean).join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:24px">
<tr><td style="background:#0b1f5c;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
<div style="font-size:13px;opacity:.75">${escapeHtml(site.name)} – Quote Request</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">New quote ${escapeHtml(enquiryId)}</div>
<div style="font-size:13px;opacity:.75;margin-top:4px">Received ${escapeHtml(receivedAt)} (UTC)</div></td></tr>
<tr><td style="background:#fff;padding:8px 24px 24px;border-radius:0 0 12px 12px">
<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Tour</h3>
<p style="font-size:15px;font-weight:bold;margin:0">${escapeHtml(tourName)}</p>
<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Contact Details</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", d.name)}
${row("Country", d.country)}
${row("Email", d.email)}
${row("WhatsApp", d.whatsapp)}
${row("Preferred date", d.date)}
${row("Adults", d.adults)}
${row("Children", d.children)}
</table>
${d.message ? `<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Message / Special Requests</h3>
<p style="font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>` : ""}
</td></tr></table></body></html>`;

  return { subject, text, html };
}

export async function POST(request) {
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let d;
  try {
    const body = await request.text();
    if (body.length > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    d = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot
  if (typeof d?.website === "string" && d.website.trim() !== "") {
    return NextResponse.json({ status: "received" }, { status: 201 });
  }

  const name = String(d?.name || "").trim();
  const email = String(d?.email || "").trim();
  const country = String(d?.country || "").trim();
  if (!name || !email || !country) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  const enquiryId = makeId();
  const receivedAt = new Date().toISOString();
  const { subject, text, html } = renderEmail(d, enquiryId, receivedAt);

  try {
    await sendMail({ subject, text, html, replyTo: email || undefined });
    return NextResponse.json({ status: "received", enquiry_id: enquiryId }, { status: 201 });
  } catch (err) {
    console.error(`[quote-enquiry] delivery failed for ${enquiryId}: ${err?.message || err}`);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
