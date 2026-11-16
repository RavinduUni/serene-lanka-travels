/**
 * Tour package enquiry – shared normalisation + validation used by the
 * browser form and POST /api/package-enquiry (one set of rules, no drift).
 */
import { isValidPhone, todayInColombo, toInternationalPhone } from "@/lib/tour-enquiry";

export const CUSTOM_PACKAGE = "custom";
export const LIMITS = { name: 100, email: 254, message: 2000, people: 50 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const str = (v) => (v === null || v === undefined ? "" : String(v)).trim();

/** Turns raw form/JSON input into a clean payload. */
export function normalizePackageEnquiry(raw = {}) {
  const phoneRaw = str(raw.whatsapp);
  return {
    name: str(raw.name).replace(/\s+/g, " "),
    email: str(raw.email).toLowerCase(),
    whatsapp: phoneRaw ? toInternationalPhone(phoneRaw, str(raw.whatsappCountry) || undefined) : "",
    travelDate: raw.dateFlexible === true || raw.dateFlexible === "true" ? "" : str(raw.travelDate),
    dateFlexible: raw.dateFlexible === true || raw.dateFlexible === "true",
    adults: str(raw.adults),
    children: str(raw.children) || "0",
    packageSlug: str(raw.packageSlug),
    message: str(raw.message),
    website: str(raw.website), // honeypot
  };
}

const isInt = (v) => /^\d+$/.test(v);

/**
 * Returns { field: message } – empty object when valid.
 * validSlugs: slugs the package select may submit (plus "custom").
 */
export function validatePackageEnquiry(d, { validSlugs = [], today = todayInColombo() } = {}) {
  const e = {};
  if (!d.name) e.name = "Please enter your full name.";
  else if (d.name.length < 2 || d.name.length > LIMITS.name) e.name = "Please enter a name between 2 and 100 characters.";

  if (!d.email) e.email = "Please enter your email address.";
  else if (d.email.length > LIMITS.email || !EMAIL_RE.test(d.email)) e.email = "Please enter a valid email address, e.g. name@example.com.";

  if (d.whatsapp && !isValidPhone(d.whatsapp)) {
    e.whatsapp = "Please choose your country code and enter a valid WhatsApp number.";
  }

  if (!d.dateFlexible && d.travelDate) {
    if (!DATE_RE.test(d.travelDate)) e.travelDate = "Please choose a valid date.";
    else if (d.travelDate < today) e.travelDate = "Please choose a date from today onwards.";
  }

  if (!isInt(d.adults) || Number(d.adults) < 1 || Number(d.adults) > LIMITS.people) {
    e.adults = "Please enter at least 1 adult (up to 50).";
  }
  if (!isInt(d.children) || Number(d.children) > LIMITS.people) {
    e.children = "Please enter 0 or more children (up to 50).";
  }

  if (![...validSlugs, CUSTOM_PACKAGE].includes(d.packageSlug)) e.packageSlug = "Please choose a tour package.";
  if (d.message.length > LIMITS.message) e.message = `Please keep special requests under ${LIMITS.message} characters.`;
  return e;
}

/** Prefilled WhatsApp text used after a successful submission. */
export function packageWhatsAppMessage({ reference, tourTitle, d }) {
  const party = `${d.adults} adult${d.adults === "1" ? "" : "s"}${Number(d.children) ? `, ${d.children} child${d.children === "1" ? "" : "ren"}` : ""}`;
  return [
    `Hi Seren Lanka Travels, I just sent a tour enquiry${reference ? ` (ref ${reference})` : ""}.`,
    `Tour: ${tourTitle}`,
    `Travel date: ${d.dateFlexible || !d.travelDate ? "Flexible / undecided" : d.travelDate}`,
    `Travellers: ${party}`,
  ].join("\n");
}
