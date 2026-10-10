/**
 * POST /api/transfer-enquiry – Transfer booking form.
 * Validates the payload, renders an HTML email and delivers it via sendMail.
 */
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { site } from "@/data/site";

const MAX_BYTES = 10_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = globalThis.__transferEnquiryHits || (globalThis.__transferEnquiryHits = new Map());

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function makeId() {
  return `TEQ-${randomBytes(3).toString("hex").toUpperCase()}`;
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
  const subject = `New transfer booking | ${enquiryId} | ${d.name} – ${d.pickup} → ${d.dropoff}`;
  const text = [
    `Reference: ${enquiryId}`,
    `Received: ${receivedAt} (UTC)`,
    "",
    d.serviceName && `Service: ${d.serviceName}`,
    `Pickup: ${d.pickup}`,
    `Drop-off: ${d.dropoff}`,
    `Date: ${d.date}`,
    `Pickup time: ${d.time}`,
    d.flight && `Flight number: ${d.flight}`,
    `Passengers: ${d.passengers}`,
    `Bags: ${d.bags}`,
    `Vehicle type: ${d.vehicle}`,
    `Child seat: ${d.childSeat ? "Yes" : "No"}`,
    d.requests && `Special requests: ${d.requests}`,
    "",
    `Name: ${d.name}`,
    d.contact && `Contact (WhatsApp / email): ${d.contact}`,
  ].filter(Boolean).join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:24px">
<tr><td style="background:#0b1f5c;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
<div style="font-size:13px;opacity:.75">${escapeHtml(site.name)} – Transfer Booking</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">New booking ${escapeHtml(enquiryId)}</div>
<div style="font-size:13px;opacity:.75;margin-top:4px">Received ${escapeHtml(receivedAt)} (UTC)</div></td></tr>
<tr><td style="background:#fff;padding:8px 24px 24px;border-radius:0 0 12px 12px">
<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Transfer Details</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Service", d.serviceName)}
${row("Pickup", d.pickup)}
${row("Drop-off", d.dropoff)}
${row("Date", d.date)}
${row("Pickup time", d.time)}
${row("Flight number", d.flight)}
${row("Vehicle", d.vehicle)}
${row("Passengers", d.passengers)}
${row("Bags", d.bags)}
${row("Child seat", d.childSeat ? "Yes" : "No")}
</table>
<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Contact</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", d.name)}
${row("WhatsApp / Email", d.contact)}
</table>
${d.requests ? `<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">Special Requests</h3>
<p style="font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(d.requests)}</p>` : ""}
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
  const pickup = String(d?.pickup || "").trim();
  const dropoff = String(d?.dropoff || "").trim();
  if (!name || !pickup || !dropoff) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  const enquiryId = makeId();
  const receivedAt = new Date().toISOString();
  const { subject, text, html } = renderEmail(d, enquiryId, receivedAt);

  // Use contact email for replyTo if it looks like an email
  const replyTo = /^[^@]+@[^@]+\.[^@]+$/.test(d?.contact || "") ? d.contact : undefined;

  try {
    await sendMail({ subject, text, html, replyTo });
    return NextResponse.json({ status: "received", enquiry_id: enquiryId }, { status: 201 });
  } catch (err) {
    console.error(`[transfer-enquiry] delivery failed for ${enquiryId}: ${err?.message || err}`);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
