/**
 * POST /api/reviews – "Submit a Review" (multipart/form-data).
 *
 * Reviews are NEVER auto-published: each submission is emailed to the
 * Seren Lanka inbox (ENQUIRY_TO_EMAIL, or REVIEWS_TO_EMAIL if set) so the team
 * can confirm it relates to a real trip, then add it to src/data/reviews.js
 * (or the admin dashboard later) with isSample: false.
 *
 * Rate limiting is in-memory (exact on one server, best-effort on serverless).
 */
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { validateReview, REVIEW_LIMITS } from "@/lib/review-validation";
import { getAllowedReviewTours } from "@/lib/review-options";
import { sendMail } from "@/lib/mailer";
import { site } from "@/data/site";

const MAX_BYTES = REVIEW_LIMITS.photoBytes + 200_000;
const RATE = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = globalThis.__reviewHits || (globalThis.__reviewHits = new Map());

function rateLimited(ip) {
  const now = Date.now();
  for (const [k, list] of hits) if (!list.some((t) => now - t < RATE.windowMs)) hits.delete(k);
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) return Math.ceil((RATE.windowMs - (now - recent[0])) / 1000);
  recent.push(now);
  hits.set(ip, recent);
  return 0;
}

/** Checks the file really is the image type it claims (magic bytes). */
function looksLikeImage(buf, type) {
  if (type === "image/jpeg") return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (type === "image/png") return buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (type === "image/webp") return buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export async function POST(request) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) {
    return NextResponse.json({ errors: { photo: "Choose a photo smaller than 4 MB." } }, { status: 413 });
  }
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  const retry = rateLimited(ip);
  if (retry) return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(retry) } });

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot – pretend success, send nothing
  if (String(form.get("website") || "").trim()) return NextResponse.json({ status: "received" }, { status: 201 });

  const str = (k) => String(form.get(k) ?? "").trim();
  const values = {
    name: str("name"),
    email: str("email"),
    country: str("country"),
    tour: str("tour"),
    rating: Number.parseInt(str("rating"), 10),
    text: str("text"),
    consent: form.get("consent") === "yes",
  };
  const file = form.get("photo");
  const photo = file && typeof file === "object" && file.size > 0 ? file : null;

  const errors = validateReview(values, {
    allowedTours: getAllowedReviewTours(),
    photo: photo ? { type: photo.type, size: photo.size } : null,
  });

  let attachment = null;
  if (photo && !errors.photo) {
    const buf = Buffer.from(await photo.arrayBuffer());
    if (!looksLikeImage(buf, photo.type)) errors.photo = "Upload a JPG, PNG or WebP image.";
    else {
      const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[photo.type];
      attachment = { filename: `review-photo.${ext}`, content: buf, contentType: photo.type };
    }
  }
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const id = `REV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(2).toString("hex").toUpperCase()}`;
  const stars = "★".repeat(values.rating) + "☆".repeat(5 - values.rating);
  const rows = [
    ["Reference", id],
    ["Name", values.name],
    ["Email (not published)", values.email],
    ["Country", values.country || "Not specified"],
    ["Tour / service", values.tour],
    ["Rating", `${stars} (${values.rating}/5)`],
    ["Photo", attachment ? "Attached" : "None"],
    ["Publishing consent", "Yes – name, country, review and photo (if provided)"],
  ];
  const text = [
    "New guest review submitted on the website – NOT yet published.",
    "Check it relates to a real trip, then add it to the reviews data with isSample: false.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Review:",
    values.text,
  ].join("\n");
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;background:#f5f7fb;margin:0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;padding:24px">
<tr><td style="background:#0b1f5c;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
<div style="font-size:13px;opacity:.75">${escapeHtml(site.name)} – website review (not yet published)</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">${escapeHtml(stars)} from ${escapeHtml(values.name)}</div></td></tr>
<tr><td style="background:#fff;padding:20px 24px;border-radius:0 0 12px 12px">
<table role="presentation" width="100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid #e6eaf1;width:40%;font-size:13px;color:#5b6478">${escapeHtml(k)}</td><td style="padding:6px 0;border-bottom:1px solid #e6eaf1;font-size:14px">${escapeHtml(v)}</td></tr>`
    )
    .join("")}</table>
<p style="font-size:13px;color:#5b6478;margin:20px 0 6px">Review</p>
<p style="font-size:15px;line-height:1.6;white-space:pre-wrap;margin:0">${escapeHtml(values.text)}</p>
</td></tr></table></body></html>`;

  try {
    const to = process.env.REVIEWS_TO_EMAIL;
    await sendMail({
      subject: `New website review | ${values.rating}/5 | ${values.name}`,
      text,
      html,
      replyTo: values.email,
      attachments: attachment ? [attachment] : undefined,
      ...(to ? { to } : {}),
    });
  } catch (err) {
    console.error(`[reviews] delivery failed for ${id}: ${err?.message || err}`);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ status: "received", reference: id }, { status: 201 });
}
