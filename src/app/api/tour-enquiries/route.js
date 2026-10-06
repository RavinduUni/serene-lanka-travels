/**
 * POST /api/tour-enquiries – Customize Your Sri Lanka Tour (spec p.9).
 *
 * Sequence: size limit → rate limit → honeypot → normalize + validate (same
 * rules as the browser) → idempotency on submission_key → DELIVER → respond.
 *
 * IMPORTANT – durable storage: the spec requires saving each enquiry to a
 * database/CRM BEFORE responding with success. This project has no database
 * yet, so the email to the Seren Lanka inbox is currently the system of record.
 * Add the save at the marked line below when the admin database exists.
 *
 * The idempotency and rate-limit stores are in-memory: correct on a single
 * server (Hostinger VPS / `next start`), best-effort on serverless (Vercel),
 * where instances do not share memory. Move them to the database/Redis with
 * the durable save.
 */
import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { normalizeEnquiry, validateEnquiry, formatEnquiry, todayInColombo, SCHEMA_VERSION } from "@/lib/tour-enquiry";
import { sendMail } from "@/lib/mailer";
import { site } from "@/data/site";

const MAX_BYTES = 20_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const hits = globalThis.__tourEnquiryHits || (globalThis.__tourEnquiryHits = new Map());
const keys = globalThis.__tourEnquiryKeys || (globalThis.__tourEnquiryKeys = new Map());

/** Drop idempotency/rate entries older than 24 h so memory stays bounded. */
function prune() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [k, v] of keys) if (v.at < cutoff) keys.delete(k);
  for (const [ip, list] of hits) if (!list.some((ts) => ts > cutoff)) hits.delete(ip);
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return Math.ceil((RATE_LIMIT.windowMs - (now - recent[0])) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  return 0;
}

function makeEnquiryId() {
  const d = todayInColombo().replace(/-/g, "");
  return `SLT-${d}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

function renderEmail(payload, enquiryId, receivedAt) {
  const groups = formatEnquiry(payload);
  const subject = `New custom tour enquiry | ${enquiryId} | ${payload.contact.full_name}`;
  const text = [
    `Reference: ${enquiryId}`,
    `Received: ${receivedAt} (UTC)`,
    ...groups.flatMap((g) => ["", g.title.toUpperCase(), ...g.rows.map(([k, v]) => `${k}: ${v}`)]),
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:24px">
<tr><td style="background:#0b1f5c;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
<div style="font-size:13px;opacity:.75">${escapeHtml(site.name)} – Customize Your Sri Lanka Tour</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">New enquiry ${escapeHtml(enquiryId)}</div>
<div style="font-size:13px;opacity:.75;margin-top:4px">Received ${escapeHtml(receivedAt)} (UTC)</div></td></tr>
<tr><td style="background:#fff;padding:8px 24px 24px;border-radius:0 0 12px 12px">
${groups
  .map(
    (g) => `<h3 style="font-size:14px;color:#1a8cff;margin:20px 0 8px;text-transform:uppercase;letter-spacing:.04em">${escapeHtml(g.title)}</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${g.rows
      .map(
        ([k, v]) => `<tr><td style="padding:6px 0;border-bottom:1px solid #e6eaf1;width:40%;font-size:13px;color:#5b6478;vertical-align:top">${escapeHtml(k)}</td>
<td style="padding:6px 0;border-bottom:1px solid #e6eaf1;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
      )
      .join("")}</table>`
  )
  .join("")}
</td></tr></table></body></html>`;
  return { subject, text, html };
}

export async function POST(request) {
  // 1a. Request size
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });

  prune();

  // 1b. Rate limit
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  const retryAfter = rateLimited(ip);
  if (retryAfter) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let raw;
  try {
    const body = await request.text();
    if (body.length > MAX_BYTES) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // 1c. Honeypot – bots fill hidden fields. Pretend success, deliver nothing.
  if (typeof raw?.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ enquiry_id: makeEnquiryId(), status: "received" }, { status: 201 });
  }

  // 1d. Server validation (identical rules to the browser)
  const submissionKey = raw?.submission_key;
  if (typeof submissionKey !== "string" || !UUID_RE.test(submissionKey)) {
    return NextResponse.json({ errors: { submission_key: "Invalid submission key." } }, { status: 422 });
  }
  const payload = normalizeEnquiry(raw);
  if (payload.schema_version !== SCHEMA_VERSION) {
    return NextResponse.json({ errors: { schema_version: "Unsupported schema version." } }, { status: 422 });
  }
  const errors = validateEnquiry(payload);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  // 2. Idempotency – same key + same content replays; same key + different content conflicts
  const hash = createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  const existing = keys.get(submissionKey);
  if (existing) {
    if (existing.hash !== hash) return NextResponse.json({ error: "conflict" }, { status: 409 });
    const done = await existing.promise.catch(() => null);
    if (done) return NextResponse.json({ enquiry_id: done.enquiry_id, status: "received" }, { status: 200 });
  }

  const enquiryId = makeEnquiryId();
  const receivedAt = new Date().toISOString();
  const sourcePath = typeof raw.source_path === "string" ? raw.source_path.slice(0, 200) : null;

  const promise = (async () => {
    // ── DURABLE SAVE GOES HERE ────────────────────────────────────────────
    // await db.enquiries.insert({ enquiry_id: enquiryId, submission_key: submissionKey,
    //   received_at: receivedAt, status: "new", source_path: sourcePath,
    //   notification_state: "pending", ...payload });
    // Then send the notification separately (and retry it independently).
    // ─────────────────────────────────────────────────────────────────────
    const { subject, text, html } = renderEmail(payload, enquiryId, receivedAt);
    await sendMail({
      subject,
      text: sourcePath ? `${text}\n\nSubmitted from: ${sourcePath}` : text,
      html,
      replyTo: payload.contact.email || undefined,
    });
    return { enquiry_id: enquiryId };
  })();

  keys.set(submissionKey, { hash, promise, at: Date.now() });

  try {
    const result = await promise;
    return NextResponse.json({ enquiry_id: result.enquiry_id, status: "received" }, { status: 201 });
  } catch (err) {
    keys.delete(submissionKey); // allow a clean retry with the same key
    // Log without personal data (spec p.10)
    console.error(`[tour-enquiries] delivery failed for ${enquiryId}: ${err?.message || err}`);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
