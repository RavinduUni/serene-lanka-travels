/**
 * POST /api/package-enquiry – "Plan Your Private Sri Lanka Tour" form on the
 * tour package pages. Validates with the same rules as the browser, looks up
 * the selected package on the server (so the price reference can't be
 * tampered with) and emails the Seren Lanka team via sendMail.
 */
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { getTourPackages } from "@/lib/content";
import { formatMoney, durationLabel } from "@/lib/tour-packages";
import { CUSTOM_PACKAGE, normalizePackageEnquiry, validatePackageEnquiry } from "@/lib/package-enquiry";
import { site } from "@/data/site";

const MAX_BYTES = 12_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = globalThis.__packageEnquiryHits || (globalThis.__packageEnquiryHits = new Map());

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const makeId = () => `TPK-${randomBytes(3).toString("hex").toUpperCase()}`;

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

function row(label, value) {
  if (!value && value !== 0) return "";
  return `<tr>
    <td style="padding:7px 0;border-bottom:1px solid #e6eaf1;width:38%;font-size:13px;color:#5b6478;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:7px 0;border-bottom:1px solid #e6eaf1;font-size:14px">${escapeHtml(value)}</td>
  </tr>`;
}

function renderEmail({ d, pkg, enquiryId, receivedAt }) {
  const tour = pkg ? pkg.title : "A different / custom private tour";
  const tourUrl = pkg ? new URL(`/tour-packages/${pkg.slug}`, site.url).toString() : "";
  const priceRef = pkg
    ? `From ${formatMoney(pkg.pricing.usd)} / person (approx. ${formatMoney(pkg.pricing.lkr, "LKR")})${pkg.pricing.verified ? "" : " – price not yet verified"}`
    : "";
  const travelDate = d.dateFlexible || !d.travelDate ? "Flexible / undecided" : d.travelDate;
  const party = `${d.adults} adult(s), ${d.children} child(ren)`;

  const subject = `New tour package enquiry | ${enquiryId} | ${d.name} – ${pkg ? pkg.shortName : "Custom tour"}`;
  const text = [
    `Reference: ${enquiryId}`,
    `Received: ${receivedAt} (UTC)`,
    "",
    `Tour: ${tour}`,
    pkg && `Duration: ${durationLabel(pkg)}`,
    priceRef && `Price reference: ${priceRef}`,
    tourUrl && `Page: ${tourUrl}`,
    `Travel date: ${travelDate}`,
    `Party size: ${party}`,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.whatsapp && `WhatsApp: ${d.whatsapp}`,
    d.message && `\nSpecial requests:\n${d.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const h3 = 'style="font-size:13px;color:#1a8cff;margin:22px 0 8px;text-transform:uppercase;letter-spacing:.05em"';
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:24px">
<tr><td style="background:#0b1f5c;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
<div style="font-size:13px;opacity:.75">${escapeHtml(site.name)} – Tour Package Enquiry</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">${escapeHtml(tour)}</div>
<div style="font-size:13px;opacity:.75;margin-top:4px">${escapeHtml(enquiryId)} · received ${escapeHtml(receivedAt)} (UTC)</div></td></tr>
<tr><td style="background:#fff;padding:4px 24px 24px;border-radius:0 0 12px 12px">
<h3 ${h3}>Trip</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Tour package", tour)}
${pkg ? row("Duration", durationLabel(pkg)) : ""}
${row("Price reference", priceRef)}
${row("Travel date", travelDate)}
${row("Party size", party)}
${tourUrl ? `<tr><td style="padding:7px 0;font-size:13px;color:#5b6478">Page</td><td style="padding:7px 0;font-size:14px"><a href="${escapeHtml(tourUrl)}" style="color:#1a8cff">${escapeHtml(tourUrl)}</a></td></tr>` : ""}
</table>
<h3 ${h3}>Contact</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", d.name)}
${row("Email", d.email)}
${row("WhatsApp", d.whatsapp)}
</table>
${d.message ? `<h3 ${h3}>Special requests</h3><p style="font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>` : ""}
</td></tr></table></body></html>`;

  return { subject, text, html };
}

export async function POST(request) {
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let raw;
  try {
    const body = await request.text();
    if (body.length > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const d = normalizePackageEnquiry(raw);

  // Honeypot – pretend success so bots learn nothing.
  if (d.website) return NextResponse.json({ status: "received" }, { status: 201 });

  const packages = getTourPackages();
  const errors = validatePackageEnquiry(d, { validSlugs: packages.map((p) => p.slug) });
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation_failed", errors }, { status: 422 });

  const pkg = d.packageSlug === CUSTOM_PACKAGE ? null : packages.find((p) => p.slug === d.packageSlug);
  const enquiryId = makeId();
  const receivedAt = new Date().toISOString();
  const { subject, text, html } = renderEmail({ d, pkg, enquiryId, receivedAt });

  try {
    await sendMail({ subject, text, html, replyTo: d.email });
    return NextResponse.json({ status: "received", enquiry_id: enquiryId }, { status: 201 });
  } catch (err) {
    console.error(`[package-enquiry] delivery failed for ${enquiryId}: ${err?.message || err}`);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
