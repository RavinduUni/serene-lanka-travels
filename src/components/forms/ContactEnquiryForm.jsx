"use client";

import { useState } from "react";
import { Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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
 * On submit, composes a structured WhatsApp message and sends it via wa.me —
 * the confirmed enquiry channel. An email fallback is planned once the backend
 * route is ready; the payload shape is kept compatible with that future POST.
 */
export default function ContactEnquiryForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());

    const lines = [
      "Hi Seren Lanka Travels, I have a travel enquiry.",
      "",
      `Name: ${d.name}`,
      `Country: ${d.country}`,
      `Email: ${d.email}`,
      d.whatsapp && `WhatsApp: ${d.whatsapp}`,
      d.arrival && `Arrival date: ${d.arrival}`,
      d.departure && `Departure date: ${d.departure}`,
      `Travellers: ${d.travellers}`,
      d.interested && `Interested in: ${d.interested}`,
      d.message && `Message: ${d.message}`,
    ].filter(Boolean);

    window.open(
      buildWhatsAppLink(lines.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-10">
        <span className="grid size-16 place-items-center rounded-full bg-brand-sky">
          <CheckCircle2 className="size-8 text-brand-blue" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xl font-bold text-brand-navy">Message sent via WhatsApp!</p>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
            Your enquiry should now be open in WhatsApp. If it did not open
            automatically, please allow pop-ups and try the button below.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
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

      {/* Submit – WhatsApp primary */}
      <button
        type="submit"
        className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-blue-dark"
      >
        <Send className="size-[17px]" aria-hidden="true" />
        Send via WhatsApp
      </button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Fields marked <span className="text-brand-blue">*</span> are required. We typically reply
        within a few hours via WhatsApp or email.
      </p>
    </form>
  );
}
