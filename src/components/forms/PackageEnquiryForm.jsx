"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { Field, PhoneField, inputBase, inputState } from "@/components/forms/tour-enquiry/fields";
import {
  CUSTOM_PACKAGE,
  LIMITS,
  normalizePackageEnquiry,
  packageWhatsAppMessage,
  validatePackageEnquiry,
} from "@/lib/package-enquiry";
import { todayInColombo } from "@/lib/tour-enquiry";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const ORDER = ["name", "email", "whatsapp", "travelDate", "adults", "children", "packageSlug", "message"];
const domId = (field) => `tef-pkg-${field}`;

/**
 * "Plan Your Private Sri Lanka Tour" lead form (guide §11).
 * Posts to /api/package-enquiry, which emails the Seren Lanka team with the
 * selected tour, travel date, party size and the price reference.
 *
 * packages: [{ slug, title, priceLabel }]
 */
export default function PackageEnquiryForm({ packages, defaultSlug, countries }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    whatsappCountry: "",
    whatsapp: "",
    travelDate: "",
    dateFlexible: false,
    adults: "2",
    children: "0",
    packageSlug: defaultSlug || CUSTOM_PACKAGE,
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const validSlugs = packages.map((p) => p.slug);
  const selected = packages.find((p) => p.slug === values.packageSlug);

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const fieldError = (field) => {
    const e = validatePackageEnquiry(normalizePackageEnquiry({ ...values }), { validSlugs });
    setErrors((prev) => {
      const next = { ...prev };
      if (e[field]) next[field] = e[field];
      else delete next[field];
      return next;
    });
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (phase === "sending") return;
    const normalized = normalizePackageEnquiry(values);
    const found = validatePackageEnquiry(normalized, { validSlugs });
    setErrors(found);
    const first = ORDER.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector(`#${domId(first)}`)?.focus();
      return;
    }

    setPhase("sending");
    try {
      const res = await fetch("/api/package-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setPhase("idle");
        return;
      }
      if (!res.ok) throw new Error(data.error || "failed");
      setResult({ reference: data.enquiry_id, normalized, tourTitle: selected?.title || "A custom private tour" });
      setPhase("success");
    } catch {
      setPhase("failure");
    }
  }

  if (phase === "success" && result) {
    const message = packageWhatsAppMessage({ reference: result.reference, tourTitle: result.tourTitle, d: result.normalized });
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-10" role="status">
        <span className="grid size-16 place-items-center rounded-full bg-brand-sky">
          <CheckCircle2 className="size-8 text-brand-blue" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xl font-bold text-brand-navy">Thank you – your enquiry has been sent</p>
          {result.reference && (
            <p className="mt-2 text-[14px] text-brand-muted">
              Reference: <strong className="text-brand-navy">{result.reference}</strong>
            </p>
          )}
          <p className="mt-3 text-[14.5px] leading-relaxed text-brand-muted">
            Our team will review your plans for <strong className="text-brand-navy">{result.tourTitle}</strong> and reply
            by email{result.normalized.whatsapp ? " or WhatsApp" : ""} with your quotation.
          </p>
        </div>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-[15px] font-semibold text-white hover:brightness-95"
        >
          <MessageCircle className="size-[18px]" aria-hidden="true" />
          Continue on WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setPhase("idle");
            setResult(null);
          }}
          className="text-[13px] font-semibold text-brand-blue underline-offset-2 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      {errorCount > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </div>
      )}

      {/* Honeypot – hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="pkg-website">Website</label>
        <input id="pkg-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field path="pkg.name" label="Full Name" required error={errors.name} className="sm:col-span-2">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              maxLength={LIMITS.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => values.name && fieldError("name")}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              aria-required="true"
              className={cn(inputBase, inputState(invalid))}
            />
          )}
        </Field>

        <Field path="pkg.email" label="Email Address" required error={errors.email} className="sm:col-span-2">
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => values.email && fieldError("email")}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              aria-required="true"
              className={cn(inputBase, inputState(invalid))}
            />
          )}
        </Field>

        <div className="sm:col-span-2">
          <PhoneField
            path="pkg.whatsapp"
            label="WhatsApp Number"
            helper="Optional – include your country code so we can message you."
            error={errors.whatsapp}
            countries={countries}
            country={values.whatsappCountry}
            value={values.whatsapp}
            onCountry={(c) => set("whatsappCountry", c)}
            onValue={(v) => set("whatsapp", v)}
            onBlur={() => values.whatsapp && fieldError("whatsapp")}
          />
        </div>

        <Field
          path="pkg.travelDate"
          label="Travel Date"
          error={errors.travelDate}
          helper={values.dateFlexible ? "We'll suggest the best time for this tour." : null}
          className="sm:col-span-2"
        >
          {({ id, describedBy, invalid }) => (
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <input
                id={id}
                type="date"
                min={todayInColombo()}
                value={values.dateFlexible ? "" : values.travelDate}
                disabled={values.dateFlexible}
                onChange={(e) => set("travelDate", e.target.value)}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={cn(inputBase, inputState(invalid))}
              />
              <label className="inline-flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-brand-ink">
                <input
                  type="checkbox"
                  checked={values.dateFlexible}
                  onChange={(e) => {
                    set("dateFlexible", e.target.checked);
                    if (e.target.checked) set("travelDate", "");
                  }}
                  className="size-[18px] rounded accent-brand-blue"
                />
                My dates are flexible / undecided
              </label>
            </div>
          )}
        </Field>

        <Field path="pkg.adults" label="Number of Adults" required error={errors.adults}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min="1"
              max={LIMITS.people}
              step="1"
              placeholder="2"
              value={values.adults}
              onChange={(e) => set("adults", e.target.value)}
              onBlur={() => fieldError("adults")}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              aria-required="true"
              className={cn(inputBase, inputState(invalid))}
            />
          )}
        </Field>

        <Field path="pkg.children" label="Number of Children" error={errors.children}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min="0"
              max={LIMITS.people}
              step="1"
              placeholder="0"
              value={values.children}
              onChange={(e) => set("children", e.target.value)}
              onBlur={() => fieldError("children")}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={cn(inputBase, inputState(invalid))}
            />
          )}
        </Field>

        <Field
          path="pkg.packageSlug"
          label="Tour Package"
          required
          error={errors.packageSlug}
          helper={selected ? `Starting from ${selected.priceLabel} per person (estimate).` : null}
          className="sm:col-span-2"
        >
          {({ id, describedBy, invalid }) => (
            <select
              id={id}
              value={values.packageSlug}
              onChange={(e) => set("packageSlug", e.target.value)}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              aria-required="true"
              className={cn(inputBase, inputState(invalid), "cursor-pointer")}
            >
              {packages.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
              <option value={CUSTOM_PACKAGE}>A different / custom private tour</option>
            </select>
          )}
        </Field>

        <Field
          path="pkg.message"
          label="Special Requests"
          error={errors.message}
          helper="Optional – interests, hotel preferences, celebrations or anything we should know."
          className="sm:col-span-2"
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              rows={4}
              maxLength={LIMITS.message}
              placeholder="Tell us about hotel preferences, room arrangements, celebrations, dietary requirements, or any specific sights..."
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={cn(inputBase, inputState(invalid), "resize-y")}
            />
          )}
        </Field>
      </div>

      {phase === "failure" && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          We couldn&apos;t send your enquiry just now. Please try again, or message us on WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={phase === "sending"}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {phase === "sending" ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-5" aria-hidden="true" />
        )}
        {phase === "sending" ? "Sending…" : "Request a Quote"}
      </button>

      <p className="mt-4 text-center text-[12.5px] leading-relaxed text-brand-muted">
        We use your details only to reply to this enquiry. See our{" "}
        <Link href="/legal/privacy-policy" className="font-semibold text-brand-blue hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
