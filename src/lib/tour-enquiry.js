/**
 * Customize-tour enquiry – shared by the browser form AND /api/tour-enquiries,
 * so client and server always apply identical rules (spec p.8–9).
 *
 *   createInitialState()      UI state (with in-memory values for hidden fields)
 *   buildPayload(state)       UI state → canonical submission payload (inactive keys → null)
 *   normalizeEnquiry(raw)     untrusted JSON → canonical payload (server side)
 *   validateEnquiry(payload)  → { "contact.full_name": "Enter your name.", ... }
 *   formatEnquiry(payload)    → grouped, human-readable rows (email + WhatsApp)
 */
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  CONTACT_METHODS,
  FLIGHTS_OPTIONS,
  DESTINATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  TRANSPORT_OPTIONS,
  VEHICLE_OPTIONS,
  ACCOMMODATION_OPTIONS,
  ROOM_OPTIONS,
  BUDGET_STYLES,
  CURRENCIES,
  ERRORS,
} from "@/data/tour-enquiry";

export const SCHEMA_VERSION = "1.0";
const ids = (list) => list.map((o) => o.id);
const HANDLE_METHODS = ["instagram", "telegram", "wechat"];

/* ------------------------------------------------------------------ helpers */

/** Today's date in Sri Lanka as YYYY-MM-DD (spec: "today" uses Asia/Colombo). */
export function todayInColombo(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Parses user phone input (with optional ISO country) to E.164 where possible. */
export function toInternationalPhone(input, country) {
  const raw = String(input ?? "").trim();
  if (!raw) return "";
  const parsed = raw.startsWith("+")
    ? parsePhoneNumberFromString(raw)
    : country
      ? parsePhoneNumberFromString(raw, country)
      : null;
  if (parsed) return parsed.number;
  return raw.startsWith("+") ? raw.replace(/[^\d+]/g, "") : raw;
}

export function isValidPhone(value) {
  if (typeof value !== "string" || !value.startsWith("+")) return false;
  const p = parsePhoneNumberFromString(value);
  return Boolean(p && p.isValid());
}

/** Returns the ISO country of a valid international number (used to sync the dial-code select). */
export function phoneCountry(value) {
  const p = typeof value === "string" && value.startsWith("+") ? parsePhoneNumberFromString(value) : null;
  return p?.country || "";
}

const trimOrNull = (v) => {
  if (v === null || v === undefined) return null;
  const t = String(v).trim();
  return t === "" ? null : t;
};
/** "12" → 12, "" → null, "1.5"/"abc" → kept as string so validation can flag it. */
const intOrRaw = (v) => {
  const t = String(v ?? "").trim();
  if (t === "") return null;
  return /^\d+$/.test(t) ? Number(t) : t;
};
const isInt = (v, min, max) => Number.isInteger(v) && v >= min && v <= max;
const isISODate = (v) => {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------ initial state */

export function createInitialState(prefill = {}) {
  return {
    // 01 Your Details
    full_name: "",
    mobile_country: "",
    mobile_input: "",
    email: "",
    contact_method: "phone_call",
    whatsapp_same_as_mobile: true,
    whatsapp_country: "",
    whatsapp_input: "",
    contact_handle: "",
    other_contact_app: "",
    other_contact_details: "",
    // 02 Your Tour – statuses start unanswered
    travellers_status: "unanswered",
    travellers_total: "",
    duration_status: "unanswered",
    duration_days: "",
    arrival_status: "unanswered",
    arrival_date: "",
    flights_booked: "",
    // 03–09 optional
    adults: "",
    children: "",
    children_ages: [],
    destinations: [],
    recommend_destinations: false,
    other_destinations: "",
    experiences: [],
    recommend_experiences: false,
    transport_required: "",
    vehicle_type: "",
    accommodation_type: "",
    room_type: "",
    budget_style: "",
    budget_amount: "",
    budget_currency: "",
    budget_currency_other: "",
    budget_undecided: false,
    special_requests: "",
    // honeypot – must stay empty
    website: "",
    ...prefill,
  };
}

/* --------------------------------------------------------- state → payload */

export function buildPayload(s) {
  const cm = s.contact_method;
  const usingWhatsApp = cm === "whatsapp";
  const status = (st) => (st === "known" || st === "undecided" ? st : null);
  const children = intOrRaw(s.children);
  const undecidedBudget = Boolean(s.budget_undecided);
  const currency = undecidedBudget ? null : s.budget_currency || null;
  const amountRaw = undecidedBudget ? null : trimOrNull(s.budget_amount);

  return {
    schema_version: SCHEMA_VERSION,
    contact: {
      full_name: String(s.full_name ?? "").trim(),
      mobile_number: toInternationalPhone(s.mobile_input, s.mobile_country),
      contact_method: cm,
      email: trimOrNull(s.email),
      whatsapp_same_as_mobile: usingWhatsApp ? Boolean(s.whatsapp_same_as_mobile) : null,
      whatsapp_number:
        usingWhatsApp && !s.whatsapp_same_as_mobile
          ? toInternationalPhone(s.whatsapp_input, s.whatsapp_country) || null
          : null,
      contact_handle: HANDLE_METHODS.includes(cm) ? trimOrNull(s.contact_handle) : null,
      other_contact_app: cm === "other" ? trimOrNull(s.other_contact_app) : null,
      other_contact_details: cm === "other" ? trimOrNull(s.other_contact_details) : null,
    },
    tour: {
      travellers_status: status(s.travellers_status),
      travellers_total: s.travellers_status === "known" ? intOrRaw(s.travellers_total) : null,
      duration_status: status(s.duration_status),
      duration_days: s.duration_status === "known" ? intOrRaw(s.duration_days) : null,
      arrival_status: status(s.arrival_status),
      arrival_date: s.arrival_status === "known" ? s.arrival_date || null : null,
      flights_booked: s.flights_booked || null,
    },
    preferences: {
      adults: intOrRaw(s.adults),
      children,
      children_ages:
        Number.isInteger(children) && children > 0 && children <= 100
          ? Array.from({ length: children }, (_, i) => intOrRaw(s.children_ages?.[i] ?? ""))
          : [],
      destinations: s.recommend_destinations ? [] : [...(s.destinations || [])],
      recommend_destinations: Boolean(s.recommend_destinations),
      other_destinations: trimOrNull(s.other_destinations),
      experiences: s.recommend_experiences ? [] : [...(s.experiences || [])],
      recommend_experiences: Boolean(s.recommend_experiences),
      transport_required: s.transport_required || null,
      vehicle_type: s.transport_required === "yes" ? s.vehicle_type || null : null,
      accommodation_type: s.accommodation_type || null,
      room_type: s.accommodation_type === "own" ? null : s.room_type || null,
      budget_style: s.budget_style || null,
      budget_amount: amountRaw === null ? null : /^\d+(\.\d{1,2})?$/.test(amountRaw) ? Number(amountRaw) : amountRaw,
      budget_currency: currency,
      budget_currency_other:
        currency === "other" ? trimOrNull(s.budget_currency_other)?.toUpperCase() ?? null : null,
      budget_undecided: undecidedBudget,
      special_requests: trimOrNull(s.special_requests),
    },
  };
}

/* ------------------------------------------- untrusted JSON → payload (API) */

/**
 * Server-side: keeps only contract keys, re-applies every conditional rule
 * (inactive values → null) and normalizes phones. Never trusts client nulling.
 */
export function normalizeEnquiry(raw) {
  const r = raw && typeof raw === "object" ? raw : {};
  const c = r.contact && typeof r.contact === "object" ? r.contact : {};
  const t = r.tour && typeof r.tour === "object" ? r.tour : {};
  const p = r.preferences && typeof r.preferences === "object" ? r.preferences : {};
  const str = (v) => (typeof v === "string" ? v.trim() : v ?? null);
  const nullable = (v) => {
    const s = str(v);
    return s === "" ? null : s;
  };
  const arr = (v) => (Array.isArray(v) ? v : []);
  const bool = (v) => v === true;

  const cm = str(c.contact_method);
  const usingWhatsApp = cm === "whatsapp";
  const sameAsMobile = usingWhatsApp ? c.whatsapp_same_as_mobile !== false : null;
  const mobile = typeof c.mobile_number === "string" ? toInternationalPhone(c.mobile_number) : c.mobile_number ?? "";

  const travellersStatus = str(t.travellers_status);
  const durationStatus = str(t.duration_status);
  const arrivalStatus = str(t.arrival_status);
  const transport = nullable(p.transport_required);
  const accommodation = nullable(p.accommodation_type);
  const budgetUndecided = bool(p.budget_undecided);
  const currency = budgetUndecided ? null : nullable(p.budget_currency);
  const children = p.children ?? null;

  return {
    schema_version: str(r.schema_version),
    contact: {
      full_name: typeof c.full_name === "string" ? c.full_name.trim() : "",
      mobile_number: mobile,
      contact_method: cm,
      email: nullable(c.email),
      whatsapp_same_as_mobile: sameAsMobile,
      // spec: when same-as-mobile, the server sets whatsapp_number = mobile_number
      whatsapp_number: usingWhatsApp
        ? sameAsMobile
          ? mobile
          : typeof c.whatsapp_number === "string"
            ? toInternationalPhone(c.whatsapp_number) || null
            : c.whatsapp_number ?? null
        : null,
      contact_handle: HANDLE_METHODS.includes(cm) ? nullable(c.contact_handle) : null,
      other_contact_app: cm === "other" ? nullable(c.other_contact_app) : null,
      other_contact_details: cm === "other" ? nullable(c.other_contact_details) : null,
    },
    tour: {
      travellers_status: travellersStatus,
      travellers_total: travellersStatus === "known" ? t.travellers_total ?? null : null,
      duration_status: durationStatus,
      duration_days: durationStatus === "known" ? t.duration_days ?? null : null,
      arrival_status: arrivalStatus,
      arrival_date: arrivalStatus === "known" ? nullable(t.arrival_date) : null,
      flights_booked: nullable(t.flights_booked),
    },
    preferences: {
      adults: p.adults ?? null,
      children,
      children_ages: Number.isInteger(children) ? arr(p.children_ages) : [],
      destinations: arr(p.destinations),
      recommend_destinations: bool(p.recommend_destinations),
      other_destinations: nullable(p.other_destinations),
      experiences: arr(p.experiences),
      recommend_experiences: bool(p.recommend_experiences),
      transport_required: transport,
      vehicle_type: transport === "yes" ? nullable(p.vehicle_type) : null,
      accommodation_type: accommodation,
      room_type: accommodation === "own" ? null : nullable(p.room_type),
      budget_style: nullable(p.budget_style),
      budget_amount: budgetUndecided ? null : p.budget_amount ?? null,
      budget_currency: currency,
      budget_currency_other:
        currency === "other" && typeof p.budget_currency_other === "string"
          ? p.budget_currency_other.trim().toUpperCase() || null
          : null,
      budget_undecided: budgetUndecided,
      special_requests: nullable(p.special_requests),
    },
  };
}

/* --------------------------------------------------------------- validation */

function validateHandle(method, value) {
  if (typeof value !== "string" || value.length < 1 || value.length > 300) return false;
  if (method === "instagram") {
    return /^@[A-Za-z0-9._]{1,30}$/.test(value) || /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?(\?.*)?$/i.test(value);
  }
  if (method === "telegram") {
    return (
      /^@[A-Za-z0-9_]{4,32}$/.test(value) ||
      /^(https:\/\/)?t\.me\/[A-Za-z0-9_+]{4,64}\/?$/i.test(value) ||
      isValidPhone(toInternationalPhone(value))
    );
  }
  return /\S/.test(value); // WeChat ID
}

/**
 * Validates a canonical payload. Returns {} when valid, otherwise errors
 * keyed by field path (e.g. "tour.arrival_date"). Only active values are checked.
 */
export function validateEnquiry(payload, { today = todayInColombo() } = {}) {
  const e = {};
  const c = payload?.contact || {};
  const t = payload?.tour || {};
  const p = payload?.preferences || {};
  const oneOf = (v, list) => v === null || list.includes(v);

  /* 01 – contact */
  if (typeof c.full_name !== "string" || c.full_name.length < 1) e["contact.full_name"] = ERRORS.name;
  else if (c.full_name.length > 100) e["contact.full_name"] = ERRORS.nameTooLong;

  if (!isValidPhone(c.mobile_number)) e["contact.mobile_number"] = ERRORS.phone;

  if (!ids(CONTACT_METHODS).includes(c.contact_method)) e["contact.contact_method"] = ERRORS.contactMethod;

  if (c.email !== null && c.email !== undefined) {
    if (typeof c.email !== "string" || c.email.length > 254 || !EMAIL_RE.test(c.email)) e["contact.email"] = ERRORS.email;
  } else if (c.contact_method === "email") {
    e["contact.email"] = ERRORS.email;
  }

  if (c.contact_method === "whatsapp" && c.whatsapp_same_as_mobile === false && !isValidPhone(c.whatsapp_number)) {
    e["contact.whatsapp_number"] = ERRORS.phone;
  }
  if (HANDLE_METHODS.includes(c.contact_method) && !validateHandle(c.contact_method, c.contact_handle)) {
    e["contact.contact_handle"] = ERRORS.contactRoute;
  }
  if (c.contact_method === "other") {
    const app = c.other_contact_app;
    const details = c.other_contact_details;
    if (typeof app !== "string" || app.length < 1 || app.length > 50) e["contact.other_contact_app"] = ERRORS.contactRoute;
    if (typeof details !== "string" || details.length < 1 || details.length > 300)
      e["contact.other_contact_details"] = ERRORS.contactRoute;
  }

  /* 02 – tour */
  if (t.travellers_status !== "known" && t.travellers_status !== "undecided") e["tour.travellers_total"] = ERRORS.travellers;
  else if (t.travellers_status === "known" && !isInt(t.travellers_total, 1, 100))
    e["tour.travellers_total"] = ERRORS.travellersRange;

  if (t.duration_status !== "known" && t.duration_status !== "undecided") e["tour.duration_days"] = ERRORS.duration;
  else if (t.duration_status === "known" && !isInt(t.duration_days, 1, 90)) e["tour.duration_days"] = ERRORS.durationRange;

  if (t.arrival_status !== "known" && t.arrival_status !== "undecided") e["tour.arrival_date"] = ERRORS.arrival;
  else if (t.arrival_status === "known") {
    if (!isISODate(t.arrival_date)) e["tour.arrival_date"] = ERRORS.arrival;
    else if (t.arrival_date < today) e["tour.arrival_date"] = ERRORS.arrivalPast;
  }

  if (!oneOf(t.flights_booked ?? null, ids(FLIGHTS_OPTIONS))) e["tour.flights_booked"] = ERRORS.invalidOption;

  /* 03 – travellers */
  const a = p.adults ?? null;
  const ch = p.children ?? null;
  if (a !== null && !isInt(a, 0, 100)) e["preferences.adults"] = ERRORS.breakdownRange;
  if (ch !== null && !isInt(ch, 0, 100)) e["preferences.children"] = ERRORS.breakdownRange;
  if (!e["preferences.adults"] && !e["preferences.children"]) {
    if (a !== null && ch === null) e["preferences.children"] = ERRORS.breakdownBoth;
    else if (a === null && ch !== null) e["preferences.adults"] = ERRORS.breakdownBoth;
    else if (a !== null && ch !== null) {
      const sum = a + ch;
      if (sum < 1 || sum > 100) e["preferences.adults"] = ERRORS.breakdownTotal;
      else if (t.travellers_status === "known" && isInt(t.travellers_total, 1, 100) && sum !== t.travellers_total)
        e["preferences.adults"] = ERRORS.breakdownSum;
    }
  }
  const ages = Array.isArray(p.children_ages) ? p.children_ages : [];
  if (isInt(ch, 0, 100) && ages.length !== ch) e["preferences.children_ages"] = ERRORS.childAge;
  ages.forEach((age, i) => {
    if (age !== null && !isInt(age, 0, 17)) e[`preferences.children_ages.${i}`] = ERRORS.childAge;
  });

  /* 04 – destinations */
  const dests = Array.isArray(p.destinations) ? p.destinations : [];
  if (dests.some((d) => !ids(DESTINATION_OPTIONS).includes(d)) || new Set(dests).size !== dests.length)
    e["preferences.destinations"] = ERRORS.invalidOption;
  else if (p.recommend_destinations && dests.length) e["preferences.destinations"] = ERRORS.exclusive;
  if (p.other_destinations && p.other_destinations.length > 500) e["preferences.other_destinations"] = ERRORS.tooLong(500);

  /* 05 – experiences */
  const exps = Array.isArray(p.experiences) ? p.experiences : [];
  if (exps.some((x) => !ids(EXPERIENCE_OPTIONS).includes(x)) || new Set(exps).size !== exps.length)
    e["preferences.experiences"] = ERRORS.invalidOption;
  else if (p.recommend_experiences && exps.length) e["preferences.experiences"] = ERRORS.exclusive;

  /* 06 / 07 – transport & accommodation */
  if (!oneOf(p.transport_required ?? null, ids(TRANSPORT_OPTIONS))) e["preferences.transport_required"] = ERRORS.invalidOption;
  if (!oneOf(p.vehicle_type ?? null, ids(VEHICLE_OPTIONS))) e["preferences.vehicle_type"] = ERRORS.invalidOption;
  if (!oneOf(p.accommodation_type ?? null, ids(ACCOMMODATION_OPTIONS))) e["preferences.accommodation_type"] = ERRORS.invalidOption;
  if (!oneOf(p.room_type ?? null, ids(ROOM_OPTIONS))) e["preferences.room_type"] = ERRORS.invalidOption;

  /* 08 – budget */
  if (!oneOf(p.budget_style ?? null, ids(BUDGET_STYLES))) e["preferences.budget_style"] = ERRORS.invalidOption;
  if (!p.budget_undecided) {
    const amt = p.budget_amount ?? null;
    const cur = p.budget_currency ?? null;
    if (amt !== null) {
      const ok = typeof amt === "number" && amt > 0 && amt <= 1_000_000_000 && Math.round(amt * 100) === amt * 100;
      if (!ok) e["preferences.budget_amount"] = ERRORS.amount;
      if (cur === null) e["preferences.budget_currency"] = ERRORS.currencyRequired;
    } else if (cur !== null) {
      e["preferences.budget_amount"] = ERRORS.amountRequired;
    }
    if (!oneOf(cur, ids(CURRENCIES))) e["preferences.budget_currency"] = ERRORS.invalidOption;
    if (cur === "other" && amt !== null && !/^[A-Z]{3}$/.test(p.budget_currency_other || ""))
      e["preferences.budget_currency_other"] = ERRORS.currencyCode;
  }

  /* 09 – anything else */
  if (p.special_requests && p.special_requests.length > 2000) e["preferences.special_requests"] = ERRORS.tooLong(2000);

  return e;
}

/* ---------------------------------------------------------- section mapping */

const SECTION_BY_FIELD = {
  adults: "travellers",
  children: "travellers",
  children_ages: "travellers",
  destinations: "destinations",
  recommend_destinations: "destinations",
  other_destinations: "destinations",
  experiences: "experiences",
  recommend_experiences: "experiences",
  transport_required: "transport",
  vehicle_type: "transport",
  accommodation_type: "accommodation",
  room_type: "accommodation",
  budget_style: "budget",
  budget_amount: "budget",
  budget_currency: "budget",
  budget_currency_other: "budget",
  budget_undecided: "budget",
  special_requests: "extra",
};

export function sectionForPath(path) {
  const [group, field] = path.split(".");
  if (group === "contact") return "details";
  if (group === "tour") return "tour";
  return SECTION_BY_FIELD[field] || "extra";
}

/** Visual order of fields – used to focus the FIRST invalid field. */
export const FIELD_ORDER = [
  "contact.full_name",
  "contact.mobile_number",
  "contact.email",
  "contact.contact_method",
  "contact.whatsapp_number",
  "contact.contact_handle",
  "contact.other_contact_app",
  "contact.other_contact_details",
  "tour.travellers_total",
  "tour.duration_days",
  "tour.arrival_date",
  "tour.flights_booked",
  "preferences.adults",
  "preferences.children",
  "preferences.children_ages",
  "preferences.destinations",
  "preferences.other_destinations",
  "preferences.experiences",
  "preferences.transport_required",
  "preferences.vehicle_type",
  "preferences.accommodation_type",
  "preferences.room_type",
  "preferences.budget_style",
  "preferences.budget_amount",
  "preferences.budget_currency",
  "preferences.budget_currency_other",
  "preferences.special_requests",
];

export function sortErrorPaths(paths) {
  const rank = (path) => {
    const m = path.match(/^preferences\.children_ages\.(\d+)$/);
    if (m) return FIELD_ORDER.indexOf("preferences.children_ages") + (Number(m[1]) + 1) / 1000;
    const i = FIELD_ORDER.indexOf(path);
    return i === -1 ? 999 : i;
  };
  return [...paths].sort((x, y) => rank(x) - rank(y));
}

/** DOM id for a field path – every input/fieldset uses this. */
export const fieldDomId = (path) => `tef-${path.replace(/\./g, "-")}`;

/** Does a section hold any answer? (drives the "Added" badge) */
export function sectionHasAnswer(sectionId, payload) {
  const p = payload.preferences;
  switch (sectionId) {
    case "travellers":
      return p.adults !== null || p.children !== null;
    case "destinations":
      return p.destinations.length > 0 || p.recommend_destinations || Boolean(p.other_destinations);
    case "experiences":
      return p.experiences.length > 0 || p.recommend_experiences;
    case "transport":
      return Boolean(p.transport_required);
    case "accommodation":
      return Boolean(p.accommodation_type || p.room_type);
    case "budget":
      return Boolean(p.budget_style || p.budget_undecided || p.budget_amount !== null || p.budget_currency);
    case "extra":
      return Boolean(p.special_requests);
    default:
      return false;
  }
}

/* --------------------------------------------------------------- formatting */

const label = (list, id) => list.find((o) => o.id === id)?.label ?? id;
const NOT_SPECIFIED = "Not specified";
const NOT_DECIDED = "Not decided yet";

/**
 * Grouped, human-readable answers (spec p.10: skipped → "Not specified",
 * undecided → "Not decided yet"). Shared by the email and WhatsApp messages.
 */
export function formatEnquiry(payload) {
  const c = payload.contact;
  const t = payload.tour;
  const p = payload.preferences;
  const orNS = (v) => (v === null || v === undefined || v === "" ? NOT_SPECIFIED : String(v));
  const statusValue = (status, value, suffix = "") =>
    status === "undecided" ? NOT_DECIDED : value === null ? NOT_SPECIFIED : `${value}${suffix}`;

  const contactRoute = (() => {
    if (c.contact_method === "whatsapp") return `WhatsApp: ${c.whatsapp_number || c.mobile_number}`;
    if (HANDLE_METHODS.includes(c.contact_method)) return `${label(CONTACT_METHODS, c.contact_method)}: ${c.contact_handle}`;
    if (c.contact_method === "other") return `${c.other_contact_app}: ${c.other_contact_details}`;
    if (c.contact_method === "email") return `Email: ${c.email}`;
    return `Phone call: ${c.mobile_number}`;
  })();

  const budget = p.budget_undecided
    ? NOT_DECIDED
    : p.budget_amount !== null
      ? `${p.budget_currency === "other" ? p.budget_currency_other : p.budget_currency} ${Number(p.budget_amount).toLocaleString("en-US")} per person`
      : NOT_SPECIFIED;

  return [
    {
      title: "Your Details",
      rows: [
        ["Full name", c.full_name],
        ["Mobile number", c.mobile_number],
        ["Email", orNS(c.email)],
        ["Preferred contact", label(CONTACT_METHODS, c.contact_method)],
        ["Contact route", contactRoute],
      ],
    },
    {
      title: "Your Tour",
      rows: [
        ["Travellers", statusValue(t.travellers_status, t.travellers_total)],
        ["Days in Sri Lanka", statusValue(t.duration_status, t.duration_days)],
        ["Arrival date", statusValue(t.arrival_status, t.arrival_date)],
        ["Flights booked", t.flights_booked ? label(FLIGHTS_OPTIONS, t.flights_booked) : NOT_SPECIFIED],
      ],
    },
    {
      title: "Travellers",
      rows: [
        ["Adults (18+)", orNS(p.adults)],
        ["Children (under 18)", orNS(p.children)],
        [
          "Children's ages",
          p.children_ages.length ? p.children_ages.map((x) => (x === null ? "?" : x)).join(", ") : NOT_SPECIFIED,
        ],
      ],
    },
    {
      title: "Destinations",
      rows: [
        [
          "Destinations",
          p.recommend_destinations
            ? "Team recommendation requested"
            : p.destinations.length
              ? p.destinations.map((d) => label(DESTINATION_OPTIONS, d)).join(", ")
              : NOT_SPECIFIED,
        ],
        ["Other places", orNS(p.other_destinations)],
      ],
    },
    {
      title: "Experiences",
      rows: [
        [
          "Experiences",
          p.recommend_experiences
            ? "Team recommendation requested"
            : p.experiences.length
              ? p.experiences.map((x) => label(EXPERIENCE_OPTIONS, x)).join(", ")
              : NOT_SPECIFIED,
        ],
      ],
    },
    {
      title: "Transport",
      rows: [
        ["Transport required", p.transport_required ? label(TRANSPORT_OPTIONS, p.transport_required) : NOT_SPECIFIED],
        ["Preferred vehicle", p.vehicle_type ? label(VEHICLE_OPTIONS, p.vehicle_type) : NOT_SPECIFIED],
      ],
    },
    {
      title: "Accommodation",
      rows: [
        ["Accommodation", p.accommodation_type ? label(ACCOMMODATION_OPTIONS, p.accommodation_type) : NOT_SPECIFIED],
        ["Room type", p.room_type ? label(ROOM_OPTIONS, p.room_type) : NOT_SPECIFIED],
      ],
    },
    {
      title: "Budget",
      rows: [
        ["Travel style", p.budget_style ? label(BUDGET_STYLES, p.budget_style) : NOT_SPECIFIED],
        ["Approximate budget", budget],
      ],
    },
    { title: "Anything Else?", rows: [["Special requests", orNS(p.special_requests)]] },
  ];
}

/** Plain-text WhatsApp message to the Seren Lanka number (WhatsApp *bold* headings). */
export function formatWhatsAppMessage(payload, { reference } = {}) {
  const lines = [
    "Hi Seren Lanka Travels, I would like a customized Sri Lanka tour.",
    reference ? `Reference: ${reference}` : null,
  ].filter(Boolean);
  formatEnquiry(payload).forEach((group) => {
    const rows = group.rows.filter(([, v]) => v !== NOT_SPECIFIED);
    if (!rows.length) return;
    lines.push("", `*${group.title}*`, ...rows.map(([k, v]) => `${k}: ${v}`));
  });
  let text = lines.join("\n");
  // keep the wa.me link comfortably under URL limits
  if (text.length > 3500) text = `${text.slice(0, 3480)}…`;
  return text;
}
