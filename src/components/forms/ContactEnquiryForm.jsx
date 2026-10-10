"use client";

import { useState } from "react";
import { Send, CheckCircle2, LoaderCircle, AlertCircle } from "lucide-react";

const INTERESTED_IN_OPTIONS = [
  "Day Tour",
  "Multi-Day Itinerary",
  "Tailor-Made / Custom Tour",
  "Airport Transfer",
  "Private Transport / Vehicle Hire",
  "Luxury Tour",
  "Honeymoon / Special Occasion",
  "Wildlife Safari",
  "Beach Holiday",
  "Cultural & Heritage Tour",
  "Other / Not Sure Yet",
];

const inputClass =
  "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-[15px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-blue focus:outline-none transition-colors duration-200";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-brand-ink";

function Field({ id, label, required, span2 = false, children }) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-brand-blue">*</span>}
      </label>
      {children}
    </div>
  );
}

/**
 * Contact / general enquiry form.
 * Submits via POST /api/contact-enquiry which delivers the enquiry by email.
 */
export default function ContactEnquiryForm() {
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure

  async function onSubmit(e) {
    e.preventDefault();
    if (phase === "sending") return;
    setPhase("sending");

    const d = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (res.status === 201 || res.status === 200) {
        setPhase("success");
      } else {
        setPhase("failure");
      }
    } catch {
      setPhase("failure");
    }
  }

  if (phase === "success") {
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-10">
        <span className="grid size-16 place-items-center rounded-full bg-brand-sky">
          <CheckCircle2 className="size-8 text-brand-blue" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xl font-bold text-brand-navy">Enquiry sent!</p>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
            Thank you for reaching out. We&apos;ll get back to you via email or WhatsApp typically within a few hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPhase("idle")}
          className="text-[13px] font-semibold text-brand-blue underline-offset-2 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <Field id="cf-name" label="Name" required>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </Field>

        {/* Country */}
        <Field id="cf-country" label="Country" required>
          <input
            id="cf-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder="Where are you from?"
            className={inputClass}
          />
        </Field>

        {/* Email */}
        <Field id="cf-email" label="Email" required span2>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className={inputClass}
          />
        </Field>

        {/* WhatsApp */}
        <Field id="cf-whatsapp" label="WhatsApp number" span2>
          <input
            id="cf-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 000 0000 (include country code)"
            className={inputClass}
          />
        </Field>

        {/* Arrival date */}
        <Field id="cf-arrival" label="Arrival date">
          <input
            id="cf-arrival"
            name="arrival"
            type="date"
            className={inputClass}
          />
        </Field>

        {/* Departure date */}
        <Field id="cf-departure" label="Departure date">
          <input
            id="cf-departure"
            name="departure"
            type="date"
            className={inputClass}
          />
        </Field>

        {/* Travellers */}
        <Field id="cf-travellers" label="Number of travellers" required>
          <input
            id="cf-travellers"
            name="travellers"
            type="number"
            min="1"
            defaultValue="2"
            required
            className={inputClass}
          />
        </Field>

        {/* Interested in */}
        <Field id="cf-interested" label="Interested tour / service">
          <select
            id="cf-interested"
            name="interested"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              What are you looking for?
            </option>
            {INTERESTED_IN_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field id="cf-message" label="Message / Special Request" span2>
          <textarea
            id="cf-message"
            name="message"
            rows="4"
            placeholder="Tell us anything else that might help us plan the perfect trip for you…"
            className={inputClass}
          />
        </Field>
      </div>

      {phase === "failure" && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or contact us directly via WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={phase === "sending"}
        className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {phase === "sending" ? (
          <LoaderCircle className="size-[17px] animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-[17px]" aria-hidden="true" />
        )}
        {phase === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Fields marked <span className="text-brand-blue">*</span> are required. We typically reply
        within a few hours via WhatsApp or email.
      </p>
    </form>
  );
}
