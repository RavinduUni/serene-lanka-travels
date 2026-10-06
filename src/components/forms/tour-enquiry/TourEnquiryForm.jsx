"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CircleCheck, Info, Send, MessageCircle, LoaderCircle, CircleAlert, RotateCcw } from "lucide-react";
import FormSection from "@/components/forms/tour-enquiry/FormSection";
import {
  Field,
  PhoneField,
  CountOrUndecided,
  OptionPills,
  ChipGroup,
  CardGroup,
  RecommendToggle,
  FieldError,
  Helper,
  inputBase,
  inputState,
} from "@/components/forms/tour-enquiry/fields";
import {
  SECTIONS,
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
  COPY,
} from "@/data/tour-enquiry";
import {
  createInitialState,
  buildPayload,
  validateEnquiry,
  sectionForPath,
  sectionHasAnswer,
  sortErrorPaths,
  fieldDomId,
  phoneCountry,
  todayInColombo,
  formatWhatsAppMessage,
} from "@/lib/tour-enquiry";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/* Human-readable field names for the error summary. */
const FIELD_LABELS = {
  "contact.full_name": "Full name",
  "contact.mobile_number": "Mobile number",
  "contact.email": "Email address",
  "contact.contact_method": "Preferred contact method",
  "contact.whatsapp_number": "WhatsApp number",
  "contact.contact_handle": "Profile link or username",
  "contact.other_contact_app": "Messaging app name",
  "contact.other_contact_details": "Contact details",
  "tour.travellers_total": "Number of travellers",
  "tour.duration_days": "Number of days",
  "tour.arrival_date": "Expected arrival date",
  "tour.flights_booked": "Flights booked",
  "preferences.adults": "Adults",
  "preferences.children": "Children",
  "preferences.children_ages": "Children's ages",
  "preferences.destinations": "Destinations",
  "preferences.other_destinations": "Other places",
  "preferences.experiences": "Experiences",
  "preferences.transport_required": "Transportation",
  "preferences.vehicle_type": "Preferred vehicle",
  "preferences.accommodation_type": "Preferred accommodation",
  "preferences.room_type": "Room preference",
  "preferences.budget_style": "Travel style",
  "preferences.budget_amount": "Budget amount",
  "preferences.budget_currency": "Currency",
  "preferences.budget_currency_other": "Currency code",
  "preferences.special_requests": "Special requests",
};
const labelFor = (path) => {
  const m = path.match(/^preferences\.children_ages\.(\d+)$/);
  return m ? `Child ${Number(m[1]) + 1} age` : FIELD_LABELS[path] || path;
};

/** UI state key → payload path (so editing a field clears its server error). */
const STATE_TO_PATH = {
  full_name: "contact.full_name",
  mobile_input: "contact.mobile_number",
  mobile_country: "contact.mobile_number",
  email: "contact.email",
  contact_method: "contact.contact_method",
  whatsapp_input: "contact.whatsapp_number",
  whatsapp_country: "contact.whatsapp_number",
  whatsapp_same_as_mobile: "contact.whatsapp_number",
  contact_handle: "contact.contact_handle",
  other_contact_app: "contact.other_contact_app",
  other_contact_details: "contact.other_contact_details",
  travellers_total: "tour.travellers_total",
  travellers_status: "tour.travellers_total",
  duration_days: "tour.duration_days",
  duration_status: "tour.duration_days",
  arrival_date: "tour.arrival_date",
  arrival_status: "tour.arrival_date",
  flights_booked: "tour.flights_booked",
};
const pathForKey = (key) => STATE_TO_PATH[key] || `preferences.${key}`;

const newKey = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (ch) =>
        (Number(ch) ^ (Math.random() * 16) >> (Number(ch) / 4)).toString(16)
      );

const HANDLE_HELP = {
  instagram: "Your @username or an https:// profile link.",
  telegram: "Your @username, a t.me link or a phone number with country code.",
  wechat: "Your WeChat ID.",
};

export default function TourEnquiryForm({ countries, prefill, privacyHref = "/legal/privacy-policy" }) {
  const [state, setState] = useState(() => createInitialState(prefill));
  const [open, setOpen] = useState(() => new Set(["details"]));
  const [touched, setTouched] = useState(() => new Set());
  const [attempted, setAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure | rate
  const [enquiryId, setEnquiryId] = useState("");
  const [lastPayload, setLastPayload] = useState(null);
  const [retryUntil, setRetryUntil] = useState(0);
  const [focusPath, setFocusPath] = useState(null);
  const [live, setLive] = useState("");
  const [today] = useState(() => todayInColombo());
  const submissionKey = useRef(null);
  const successRef = useRef(null);
  const summaryRef = useRef(null);
  const wasReady = useRef(false);

  if (submissionKey.current === null) submissionKey.current = newKey();

  /* ------------------------------------------------ derived payload & errors */
  const payload = useMemo(() => buildPayload(state), [state]);
  const clientErrors = useMemo(() => validateEnquiry(payload, { today }), [payload, today]);
  const errors = useMemo(() => {
    const known = Object.fromEntries(
      Object.entries(serverErrors).filter(([k]) => /^(contact|tour|preferences)\./.test(k))
    );
    return { ...known, ...clientErrors };
  }, [clientErrors, serverErrors]);
  const requiredValid = !Object.keys(clientErrors).some((k) => k.startsWith("contact.") || k.startsWith("tour."));

  const errorFor = (path) => (attempted || touched.has(path) ? errors[path] : undefined);
  const visibleErrorPaths = attempted ? sortErrorPaths(Object.keys(errors)) : [];

  /* Readiness announcement – once per change, not on every keystroke */
  useEffect(() => {
    if (requiredValid && !wasReady.current) setLive(COPY.statusReady);
    wasReady.current = requiredValid;
  }, [requiredValid]);

  /* Open-then-focus: runs after the section panel is un-hidden */
  useEffect(() => {
    if (!focusPath) return;
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(fieldDomId(focusPath));
      const target = el && (el.matches("input,select,textarea,button") ? el : el.querySelector("input,select,textarea,button"));
      if (target) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        target.focus({ preventScroll: true });
      }
      setFocusPath(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [focusPath]);

  useEffect(() => {
    if (phase === "success") successRef.current?.focus();
  }, [phase]);

  /* ------------------------------------------------------------- updaters */
  const clearServerError = (key) =>
    setServerErrors((prev) => {
      const path = pathForKey(key);
      const next = Object.fromEntries(Object.entries(prev).filter(([k]) => k !== path && !k.startsWith(`${path}.`)));
      return Object.keys(next).length === Object.keys(prev).length ? prev : next;
    });

  const set = (key, value) => {
    setState((s) => ({ ...s, [key]: value }));
    clearServerError(key);
  };
  const touch = (path) => setTouched((t) => (t.has(path) ? t : new Set(t).add(path)));
  const setAndTouch = (key, value) => {
    set(key, value);
    touch(pathForKey(key));
  };

  /** Value + status pair for "Not decided yet" questions. */
  const setStatusValue = (statusKey, valueKey, value) => {
    setState((s) => ({ ...s, [valueKey]: value, [statusKey]: String(value).trim() ? "known" : "unanswered" }));
    clearServerError(valueKey);
  };
  const setUndecided = (statusKey, valueKey, checked) => {
    setState((s) => ({
      ...s,
      [statusKey]: checked ? "undecided" : String(s[valueKey]).trim() ? "known" : "unanswered",
    }));
    clearServerError(valueKey);
    touch(pathForKey(valueKey));
  };

  const toggleIn = (listKey, recommendKey, id) => {
    setState((s) => {
      const list = s[listKey];
      return {
        ...s,
        [recommendKey]: false, // choosing a chip unchecks "recommend"
        [listKey]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
      };
    });
    clearServerError(listKey);
  };
  const setRecommend = (listKey, recommendKey, checked) => {
    setState((s) => ({ ...s, [recommendKey]: checked, [listKey]: checked ? [] : s[listKey] }));
    clearServerError(listKey);
  };

  const syncCountryFromPaste = (inputKey, countryKey) => {
    const iso = phoneCountry(String(state[inputKey]).replace(/[^\d+]/g, ""));
    if (iso && iso !== state[countryKey]) set(countryKey, iso);
  };

  const toggleSection = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /* --------------------------------------------------------------- submit */
  const handleInvalid = (errs) => {
    const paths = sortErrorPaths(Object.keys(errs).filter((k) => /^(contact|tour|preferences)\./.test(k)));
    if (!paths.length) return;
    setOpen((prev) => new Set([...prev, ...paths.map(sectionForPath)]));
    setFocusPath(paths[0]);
    setLive(`There ${paths.length === 1 ? "is 1 answer" : `are ${paths.length} answers`} to check.`);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (phase === "sending") return;
    setAttempted(true);
    if (Object.keys(clientErrors).length) {
      setPhase("idle");
      handleInvalid(clientErrors);
      return;
    }
    if (retryUntil > Date.now()) {
      setPhase("rate");
      setLive(COPY.rateLimited);
      return;
    }

    setPhase("sending");
    setLive(COPY.submitting);
    try {
      const res = await fetch("/api/tour-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submission_key: submissionKey.current,
          source_path: window.location.pathname,
          website: state.website,
        }),
      });

      if (res.status === 201 || res.status === 200) {
        const data = await res.json();
        setEnquiryId(data.enquiry_id);
        setLastPayload(payload);
        // Clear only after confirmed success (spec p.8)
        setState(createInitialState());
        setTouched(new Set());
        setAttempted(false);
        setServerErrors({});
        setOpen(new Set(["details"]));
        submissionKey.current = newKey();
        setPhase("success");
        setLive(COPY.successHeading);
        return;
      }
      if (res.status === 422) {
        const data = await res.json().catch(() => ({}));
        setServerErrors(data.errors || {});
        setPhase("idle");
        handleInvalid(data.errors || {});
        return;
      }
      if (res.status === 409) {
        submissionKey.current = newKey(); // edited request → new key
      }
      if (res.status === 429) {
        const wait = Number(res.headers.get("Retry-After")) || 60;
        setRetryUntil(Date.now() + wait * 1000);
        setPhase("rate");
        setLive(COPY.rateLimited);
        return;
      }
      setPhase("failure");
      setLive(COPY.failure);
    } catch {
      // Network error: keep data, keep the same key so a retry cannot duplicate
      setPhase("failure");
      setLive(COPY.failure);
    }
  }

  /** Secondary route – same validation, then opens WhatsApp to the Seren Lanka number. */
  function onWhatsApp() {
    setAttempted(true);
    if (Object.keys(clientErrors).length) {
      handleInvalid(clientErrors);
      return;
    }
    window.open(buildWhatsAppLink(formatWhatsAppMessage(payload)), "_blank", "noopener,noreferrer");
    setLive("Your tour details opened in WhatsApp.");
  }

  const sectionStatus = (section) => {
    const has = Object.keys(errors).some((p) => sectionForPath(p) === section.id);
    if (attempted && has) return "attention";
    if (section.required) return has ? "required" : "complete";
    return sectionHasAnswer(section.id, payload) ? "added" : "optional";
  };

  /* -------------------------------------------------------------- success */
  if (phase === "success") {
    return (
      <div className="rounded-card border border-brand-line bg-white p-7 text-center shadow-card sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-sky text-brand-blue">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-6 text-2xl font-bold tracking-tight text-brand-navy outline-none sm:text-3xl"
        >
          {COPY.successHeading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-brand-muted sm:text-base">
          {COPY.successMessage}
        </p>
        {enquiryId && (
          <p className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-brand-mist px-5 py-3 text-[14px] text-brand-ink">
            Your reference
            <strong className="font-mono text-[15px] tracking-wide text-brand-navy">{enquiryId}</strong>
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {lastPayload && (
            <a
              href={buildWhatsAppLink(formatWhatsAppMessage(lastPayload, { reference: enquiryId }))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-[15px] font-semibold text-white hover:brightness-95"
            >
              <MessageCircle className="size-[18px]" aria-hidden="true" />
              Also send on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setPhase("idle");
              setEnquiryId("");
              setLastPayload(null);
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-navy/20 bg-white px-6 text-[15px] font-semibold text-brand-navy hover:border-brand-navy hover:bg-brand-mist"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Start a new enquiry
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {live}
        </p>
      </div>
    );
  }

  /* ----------------------------------------------------------------- form */
  const ageCount = Number.isInteger(payload.preferences.children) ? Math.min(payload.preferences.children, 100) : 0;
  const breakdownTotal =
    Number.isInteger(payload.preferences.adults) && Number.isInteger(payload.preferences.children)
      ? payload.preferences.adults + payload.preferences.children
      : null;
  const sec = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="tef-intro-status">
      {/* Live region for readiness, loading, success and failure */}
      <p className="sr-only" aria-live="polite" role="status">
        {live}
      </p>

      {/* Status (spec p.2) */}
      <div
        id="tef-intro-status"
        className={cn(
          "mb-5 flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-[14px] leading-relaxed sm:px-5",
          requiredValid ? "border-brand-blue/30 bg-brand-sky text-brand-navy" : "border-brand-line bg-white text-brand-ink"
        )}
      >
        {requiredValid ? (
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
        ) : (
          <Info className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
        )}
        <div>
          {requiredValid ? (
            <>
              <p className="font-bold">{COPY.statusReady}</p>
              <p className="text-brand-muted">{COPY.statusInvite}</p>
            </>
          ) : (
            <p>{COPY.statusInitial}</p>
          )}
        </div>
      </div>

      {/* Error summary (spec p.8) */}
      {visibleErrorPaths.length > 0 && (
        <div
          ref={summaryRef}
          role="region"
          aria-labelledby="tef-error-summary-title"
          className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-4 py-4 sm:px-5"
        >
          <h2 id="tef-error-summary-title" className="flex items-center gap-2 text-[15px] font-bold text-red-800">
            <CircleAlert className="size-5" aria-hidden="true" />
            Please check {visibleErrorPaths.length === 1 ? "this answer" : `these ${visibleErrorPaths.length} answers`}
          </h2>
          <ul className="mt-2 space-y-1 pl-7">
            {visibleErrorPaths.map((p) => (
              <li key={p} className="text-[14px]">
                <a
                  href={`#${fieldDomId(p)}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpen((prev) => new Set(prev).add(sectionForPath(p)));
                    setFocusPath(p);
                  }}
                  className="font-semibold text-red-800 underline underline-offset-2 hover:text-red-900"
                >
                  {labelFor(p)}: {errors[p]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot – hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="tef-website">Website</label>
        <input
          id="tef-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={state.website}
          onChange={(e) => setState((s) => ({ ...s, website: e.target.value }))}
        />
      </div>

      <div className="space-y-4">
        {/* ── 01 Your Details ─────────────────────────────────────────── */}
        <FormSection section={sec.details} status={sectionStatus(sec.details)} open={open.has("details")} onToggle={() => toggleSection("details")}>
          <div className="grid gap-5">
            <Field path="contact.full_name" label="Full name" required error={errorFor("contact.full_name")}>
              {({ id, describedBy, invalid }) => (
                <input
                  id={id}
                  type="text"
                  autoComplete="name"
                  value={state.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  onBlur={() => touch("contact.full_name")}
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  aria-required="true"
                  className={cn(inputBase, inputState(invalid))}
                />
              )}
            </Field>

            <PhoneField
              path="contact.mobile_number"
              label="Mobile number"
              required
              helper="Choose your country code, or type the full number starting with +."
              error={errorFor("contact.mobile_number")}
              countries={countries}
              country={state.mobile_country}
              value={state.mobile_input}
              onCountry={(v) => set("mobile_country", v)}
              onValue={(v) => set("mobile_input", v)}
              onBlur={() => {
                touch("contact.mobile_number");
                syncCountryFromPaste("mobile_input", "mobile_country");
              }}
            />

            <Field
              path="contact.email"
              label="Email address"
              required={state.contact_method === "email"}
              helper={state.contact_method === "email" ? null : "Optional."}
              error={errorFor("contact.email")}
            >
              {({ id, describedBy, invalid }) => (
                <input
                  id={id}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={state.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("contact.email")}
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  className={cn(inputBase, inputState(invalid))}
                />
              )}
            </Field>

            <OptionPills
              path="contact.contact_method"
              legend="How would you prefer us to contact you?"
              options={CONTACT_METHODS}
              value={state.contact_method}
              onChange={(v) => setAndTouch("contact_method", v)}
              clearable={false}
              error={errorFor("contact.contact_method")}
            />

            {state.contact_method === "whatsapp" && (
              <div className="grid gap-4 rounded-2xl bg-brand-mist p-4 sm:p-5">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[14px] font-semibold text-brand-ink">
                  <input
                    type="checkbox"
                    checked={state.whatsapp_same_as_mobile}
                    onChange={(e) => set("whatsapp_same_as_mobile", e.target.checked)}
                    className="size-5 shrink-0 cursor-pointer accent-brand-blue"
                  />
                  Use my mobile number for WhatsApp
                </label>
                {!state.whatsapp_same_as_mobile && (
                  <PhoneField
                    path="contact.whatsapp_number"
                    label="WhatsApp number"
                    required
                    error={errorFor("contact.whatsapp_number")}
                    countries={countries}
                    country={state.whatsapp_country}
                    value={state.whatsapp_input}
                    onCountry={(v) => set("whatsapp_country", v)}
                    onValue={(v) => set("whatsapp_input", v)}
                    onBlur={() => {
                      touch("contact.whatsapp_number");
                      syncCountryFromPaste("whatsapp_input", "whatsapp_country");
                    }}
                  />
                )}
              </div>
            )}

            {["instagram", "telegram", "wechat"].includes(state.contact_method) && (
              <Field
                path="contact.contact_handle"
                label="Profile link or username"
                required
                helper={HANDLE_HELP[state.contact_method]}
                error={errorFor("contact.contact_handle")}
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={state.contact_handle}
                    onChange={(e) => set("contact_handle", e.target.value)}
                    onBlur={() => touch("contact.contact_handle")}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    className={cn(inputBase, inputState(invalid))}
                  />
                )}
              </Field>
            )}

            {state.contact_method === "other" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field path="contact.other_contact_app" label="Messaging app name" required error={errorFor("contact.other_contact_app")}>
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      type="text"
                      value={state.other_contact_app}
                      onChange={(e) => set("other_contact_app", e.target.value)}
                      onBlur={() => touch("contact.other_contact_app")}
                      aria-invalid={invalid || undefined}
                      aria-describedby={describedBy}
                      className={cn(inputBase, inputState(invalid))}
                    />
                  )}
                </Field>
                <Field
                  path="contact.other_contact_details"
                  label="Contact details"
                  required
                  helper="A phone number, username or https:// profile link."
                  error={errorFor("contact.other_contact_details")}
                >
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      type="text"
                      value={state.other_contact_details}
                      onChange={(e) => set("other_contact_details", e.target.value)}
                      onBlur={() => touch("contact.other_contact_details")}
                      aria-invalid={invalid || undefined}
                      aria-describedby={describedBy}
                      className={cn(inputBase, inputState(invalid))}
                    />
                  )}
                </Field>
              </div>
            )}
          </div>
        </FormSection>

        {/* ── 02 Your Tour ────────────────────────────────────────────── */}
        <FormSection section={sec.tour} status={sectionStatus(sec.tour)} open={open.has("tour")} onToggle={() => toggleSection("tour")}>
          <div className="grid gap-6">
            <CountOrUndecided
              path="tour.travellers_total"
              label="How many people are travelling?"
              error={errorFor("tour.travellers_total")}
              value={state.travellers_total}
              undecided={state.travellers_status === "undecided"}
              onValue={(v) => setStatusValue("travellers_status", "travellers_total", v)}
              onUndecided={(c) => setUndecided("travellers_status", "travellers_total", c)}
              onBlur={() => touch("tour.travellers_total")}
            />
            <CountOrUndecided
              path="tour.duration_days"
              label="How many days are you planning to travel?"
              helper="Days of touring in Sri Lanka – not including your flights."
              error={errorFor("tour.duration_days")}
              value={state.duration_days}
              undecided={state.duration_status === "undecided"}
              onValue={(v) => setStatusValue("duration_status", "duration_days", v)}
              onUndecided={(c) => setUndecided("duration_status", "duration_days", c)}
              onBlur={() => touch("tour.duration_days")}
            />
            <CountOrUndecided
              path="tour.arrival_date"
              label="Expected arrival date"
              type="date"
              min={today}
              undecidedLabel="I have not decided my travel dates yet"
              error={errorFor("tour.arrival_date")}
              value={state.arrival_date}
              undecided={state.arrival_status === "undecided"}
              onValue={(v) => setStatusValue("arrival_status", "arrival_date", v)}
              onUndecided={(c) => setUndecided("arrival_status", "arrival_date", c)}
              onBlur={() => touch("tour.arrival_date")}
            />
            <OptionPills
              path="tour.flights_booked"
              legend="Have you booked your flights?"
              options={FLIGHTS_OPTIONS}
              value={state.flights_booked}
              onChange={(v) => setAndTouch("flights_booked", v)}
              error={errorFor("tour.flights_booked")}
            />
          </div>
        </FormSection>

        {/* ── 03 Travellers ───────────────────────────────────────────── */}
        <FormSection section={sec.travellers} status={sectionStatus(sec.travellers)} open={open.has("travellers")} onToggle={() => toggleSection("travellers")}>
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["adults", "Adults (18+)"],
                ["children", "Children (under 18)"],
              ].map(([key, lbl]) => (
                <Field key={key} path={`preferences.${key}`} label={lbl} error={errorFor(`preferences.${key}`)}>
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      type="text"
                      inputMode="numeric"
                      value={state[key]}
                      onChange={(e) => set(key, e.target.value)}
                      onBlur={() => touch(`preferences.${key}`)}
                      aria-invalid={invalid || undefined}
                      aria-describedby={describedBy}
                      placeholder="0"
                      className={cn(inputBase, inputState(invalid))}
                    />
                  )}
                </Field>
              ))}
            </div>
            {breakdownTotal !== null && state.travellers_status !== "known" && (
              <p className="text-[13px] text-brand-muted">
                Total from this breakdown: <strong className="text-brand-navy">{breakdownTotal}</strong>{" "}
                {breakdownTotal === 1 ? "traveller" : "travellers"}.
              </p>
            )}
            {ageCount > 0 && (
              <fieldset id={fieldDomId("preferences.children_ages")}>
                <legend className="mb-1 text-[14px] font-semibold text-brand-ink">Children&apos;s ages at arrival</legend>
                <Helper id="tef-ages-help">Enter 0 for under 1 year. You can leave an age blank if you are not sure.</Helper>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {Array.from({ length: ageCount }, (_, i) => {
                    const path = `preferences.children_ages.${i}`;
                    const err = errorFor(path);
                    const id = fieldDomId(path);
                    return (
                      <div key={path}>
                        <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-brand-ink">
                          Child {i + 1}
                        </label>
                        <input
                          id={id}
                          type="text"
                          inputMode="numeric"
                          value={state.children_ages[i] ?? ""}
                          onChange={(e) => {
                            const v = e.target.value;
                            setState((s) => {
                              const ages = [...s.children_ages];
                              ages[i] = v;
                              return { ...s, children_ages: ages };
                            });
                            clearServerError("children_ages");
                          }}
                          onBlur={() => touch(path)}
                          aria-invalid={Boolean(err) || undefined}
                          aria-describedby={err ? `${id}-error tef-ages-help` : "tef-ages-help"}
                          placeholder="Age"
                          className={cn(inputBase, inputState(Boolean(err)))}
                        />
                        <FieldError id={`${id}-error`} message={err} />
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </div>
        </FormSection>

        {/* ── 04 Destinations ─────────────────────────────────────────── */}
        <FormSection section={sec.destinations} status={sectionStatus(sec.destinations)} open={open.has("destinations")} onToggle={() => toggleSection("destinations")}>
          <div className="grid gap-5">
            <ChipGroup
              path="preferences.destinations"
              legend="Where would you like to go?"
              options={DESTINATION_OPTIONS}
              values={state.destinations}
              onToggle={(id) => toggleIn("destinations", "recommend_destinations", id)}
              error={errorFor("preferences.destinations")}
            />
            <RecommendToggle
              checked={state.recommend_destinations}
              onChange={(c) => setRecommend("destinations", "recommend_destinations", c)}
            >
              I am not sure – recommend the best route for me
            </RecommendToggle>
            <Field
              path="preferences.other_destinations"
              label="Any other places you would like to visit?"
              helper={`${500 - state.other_destinations.length} characters remaining.`}
              error={errorFor("preferences.other_destinations")}
            >
              {({ id, describedBy, invalid }) => (
                <textarea
                  id={id}
                  rows={2}
                  value={state.other_destinations}
                  onChange={(e) => set("other_destinations", e.target.value)}
                  onBlur={() => touch("preferences.other_destinations")}
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  className={cn(inputBase, inputState(invalid), "resize-y")}
                />
              )}
            </Field>
          </div>
        </FormSection>

        {/* ── 05 Experiences ──────────────────────────────────────────── */}
        <FormSection section={sec.experiences} status={sectionStatus(sec.experiences)} open={open.has("experiences")} onToggle={() => toggleSection("experiences")}>
          <div className="grid gap-5">
            <CardGroup
              path="preferences.experiences"
              legend="What would you love to experience?"
              options={EXPERIENCE_OPTIONS}
              values={state.experiences}
              onToggle={(id) => toggleIn("experiences", "recommend_experiences", id)}
              error={errorFor("preferences.experiences")}
            />
            <RecommendToggle
              checked={state.recommend_experiences}
              onChange={(c) => setRecommend("experiences", "recommend_experiences", c)}
            >
              Recommend experiences for me
            </RecommendToggle>
          </div>
        </FormSection>

        {/* ── 06 Transport ────────────────────────────────────────────── */}
        <FormSection section={sec.transport} status={sectionStatus(sec.transport)} open={open.has("transport")} onToggle={() => toggleSection("transport")}>
          <div className="grid gap-6">
            <OptionPills
              path="preferences.transport_required"
              legend="Would you like us to arrange transportation?"
              options={TRANSPORT_OPTIONS}
              value={state.transport_required}
              onChange={(v) => setAndTouch("transport_required", v)}
              error={errorFor("preferences.transport_required")}
            />
            {state.transport_required === "yes" && (
              <OptionPills
                path="preferences.vehicle_type"
                legend="Preferred vehicle"
                helper="We can recommend a suitable vehicle for your group."
                options={VEHICLE_OPTIONS}
                value={state.vehicle_type}
                onChange={(v) => setAndTouch("vehicle_type", v)}
                error={errorFor("preferences.vehicle_type")}
              />
            )}
          </div>
        </FormSection>

        {/* ── 07 Accommodation ────────────────────────────────────────── */}
        <FormSection section={sec.accommodation} status={sectionStatus(sec.accommodation)} open={open.has("accommodation")} onToggle={() => toggleSection("accommodation")}>
          <div className="grid gap-6">
            <OptionPills
              path="preferences.accommodation_type"
              legend="Preferred accommodation"
              helper="Choose the style of stay you prefer. Our team will recommend suitable options."
              options={ACCOMMODATION_OPTIONS}
              value={state.accommodation_type}
              onChange={(v) => setAndTouch("accommodation_type", v)}
              error={errorFor("preferences.accommodation_type")}
            />
            {state.accommodation_type !== "own" && (
              <OptionPills
                path="preferences.room_type"
                legend="Room preference"
                options={ROOM_OPTIONS}
                value={state.room_type}
                onChange={(v) => setAndTouch("room_type", v)}
                error={errorFor("preferences.room_type")}
              />
            )}
          </div>
        </FormSection>

        {/* ── 08 Budget ───────────────────────────────────────────────── */}
        <FormSection section={sec.budget} status={sectionStatus(sec.budget)} open={open.has("budget")} onToggle={() => toggleSection("budget")}>
          <div className="grid gap-6">
            <OptionPills
              path="preferences.budget_style"
              legend="Preferred travel style"
              options={BUDGET_STYLES}
              value={state.budget_style}
              onChange={(v) => setAndTouch("budget_style", v)}
              error={errorFor("preferences.budget_style")}
            />
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[14px] font-semibold text-brand-ink">
              <input
                type="checkbox"
                checked={state.budget_undecided}
                onChange={(e) => setAndTouch("budget_undecided", e.target.checked)}
                className="size-5 shrink-0 cursor-pointer accent-brand-blue"
              />
              I am not sure about my budget yet
            </label>
            <div className="grid gap-5 sm:grid-cols-[1fr_12rem]">
              <Field
                path="preferences.budget_amount"
                label="Approximate budget per person"
                helper="For the full tour in Sri Lanka, excluding international flights."
                error={state.budget_undecided ? undefined : errorFor("preferences.budget_amount")}
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="text"
                    inputMode="decimal"
                    disabled={state.budget_undecided}
                    value={state.budget_amount}
                    onChange={(e) => set("budget_amount", e.target.value)}
                    onBlur={() => touch("preferences.budget_amount")}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    placeholder="e.g. 1500"
                    className={cn(inputBase, inputState(invalid))}
                  />
                )}
              </Field>
              <Field
                path="preferences.budget_currency"
                label="Currency"
                error={state.budget_undecided ? undefined : errorFor("preferences.budget_currency")}
              >
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    disabled={state.budget_undecided}
                    value={state.budget_currency}
                    onChange={(e) => setAndTouch("budget_currency", e.target.value)}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    className={cn(inputBase, inputState(invalid))}
                  >
                    <option value="">No currency</option>
                    {CURRENCIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
            {state.budget_currency === "other" && !state.budget_undecided && (
              <Field
                path="preferences.budget_currency_other"
                label="Other currency code"
                helper="The 3-letter code, for example NZD or SGD."
                error={errorFor("preferences.budget_currency_other")}
                className="sm:max-w-[16rem]"
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="text"
                    maxLength={3}
                    autoCapitalize="characters"
                    value={state.budget_currency_other}
                    onChange={(e) => set("budget_currency_other", e.target.value.toUpperCase())}
                    onBlur={() => touch("preferences.budget_currency_other")}
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    className={cn(inputBase, inputState(invalid), "uppercase")}
                  />
                )}
              </Field>
            )}
          </div>
        </FormSection>

        {/* ── 09 Anything Else? ───────────────────────────────────────── */}
        <FormSection section={sec.extra} status={sectionStatus(sec.extra)} open={open.has("extra")} onToggle={() => toggleSection("extra")}>
          <Field
            path="preferences.special_requests"
            label="Tell us anything that would help us create your perfect trip."
            helper={`${2000 - state.special_requests.length} characters remaining.`}
            error={errorFor("preferences.special_requests")}
          >
            {({ id, describedBy, invalid }) => (
              <textarea
                id={id}
                rows={5}
                value={state.special_requests}
                onChange={(e) => set("special_requests", e.target.value)}
                onBlur={() => touch("preferences.special_requests")}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                placeholder="Celebrating a honeymoon, travelling with elderly guests, dietary preferences, special interests or anything else you would like us to know."
                className={cn(inputBase, inputState(invalid), "resize-y")}
              />
            )}
          </Field>
        </FormSection>
      </div>

      {/* ── Submission area – outside every accordion (spec p.1) ───────── */}
      <div className="mt-6 rounded-card border border-brand-line bg-white p-5 shadow-card sm:p-7">
        {(phase === "failure" || phase === "rate") && (
          <p role="alert" className="mb-5 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-800">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {phase === "rate" ? COPY.rateLimited : COPY.failure}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={phase === "sending"}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-8 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(26,140,255,0.7)] transition-colors hover:bg-brand-blue-dark disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:flex-1"
          >
            {phase === "sending" ? (
              <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            ) : (
              <Send className="size-5" aria-hidden="true" />
            )}
            {phase === "sending" ? COPY.submitting : COPY.cta}
          </button>
          <button
            type="button"
            onClick={onWhatsApp}
            disabled={phase === "sending"}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60 sm:w-auto"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Send on WhatsApp
          </button>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-brand-ink">{COPY.belowCta}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">
          {COPY.contactNotice}{" "}
          <Link href={privacyHref} className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-blue-dark">
            Read our Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
