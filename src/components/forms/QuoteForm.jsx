"use client";

import { useState } from "react";
import { Send, CheckCircle2, LoaderCircle, AlertCircle } from "lucide-react";

/**
 * Request-a-Quote form.
 * Submits via POST /api/quote-enquiry which delivers the enquiry by email.
 */
const fields = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "country", label: "Country", type: "text", required: true, autoComplete: "country-name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp number", type: "tel", required: false, autoComplete: "tel" },
  { name: "date", label: "Preferred travel date", type: "date", required: false },
];

export default function QuoteForm({ tourName }) {
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure

  async function onSubmit(e) {
    e.preventDefault();
    if (phase === "sending") return;
    setPhase("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/quote-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tourName }),
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

  const inputClass =
    "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-[15px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-blue focus:outline-none";

  if (phase === "success") {
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-10">
        <span className="grid size-16 place-items-center rounded-full bg-brand-sky">
          <CheckCircle2 className="size-8 text-brand-blue" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xl font-bold text-brand-navy">Quote request sent!</p>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
            We&apos;ll review your request and reply with a detailed quotation via email or WhatsApp – typically within 4 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPhase("idle")}
          className="text-[13px] font-semibold text-brand-blue underline-offset-2 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">Request a quote</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
        Tell us about your group and dates. We reply with your quotation via email or a call –
        typically within 4 hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.name === "email" ? "sm:col-span-2" : ""}>
            <label htmlFor={`qf-${f.name}`} className="mb-1.5 block text-[13px] font-semibold text-brand-ink">
              {f.label}
              {f.required && <span className="text-brand-blue"> *</span>}
            </label>
            <input
              id={`qf-${f.name}`}
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label htmlFor="qf-adults" className="mb-1.5 block text-[13px] font-semibold text-brand-ink">
            Adults <span className="text-brand-blue">*</span>
          </label>
          <input id="qf-adults" name="adults" type="number" min="1" defaultValue="2" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="qf-children" className="mb-1.5 block text-[13px] font-semibold text-brand-ink">
            Children
          </label>
          <input id="qf-children" name="children" type="number" min="0" defaultValue="0" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-message" className="mb-1.5 block text-[13px] font-semibold text-brand-ink">
            Message / special requests
          </label>
          <textarea id="qf-message" name="message" rows="3" className={inputClass} />
        </div>
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
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {phase === "sending" ? (
          <LoaderCircle className="size-[18px] animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-[18px]" aria-hidden="true" />
        )}
        {phase === "sending" ? "Sending…" : "Send Quote Request"}
      </button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Prices vary with travel dates, group size and selected options. Your final quotation is
        confirmed before booking.
      </p>
    </form>
  );
}
