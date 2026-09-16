"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Request-a-Quote form (§11 CTA model). There is no booking backend yet:
 * on submit the enquiry is composed into a structured WhatsApp message and
 * opened in WhatsApp, which is the confirmed enquiry channel. When the
 * /api/enquiry route is implemented, POST the same payload there first.
 */
const fields = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "country", label: "Country", type: "text", required: true, autoComplete: "country-name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp number", type: "tel", required: false, autoComplete: "tel" },
  { name: "date", label: "Preferred travel date", type: "date", required: false },
];

export default function QuoteForm({ tourName }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const lines = [
      `Hi Seren Lanka Travels, I would like a quote for the ${tourName}.`,
      "",
      `Name: ${data.name}`,
      `Country: ${data.country}`,
      `Email: ${data.email}`,
      data.whatsapp && `WhatsApp: ${data.whatsapp}`,
      data.date && `Preferred date: ${data.date}`,
      `Travellers: ${data.adults} adult(s), ${data.children} child(ren)`,
      data.message && `Message: ${data.message}`,
    ].filter(Boolean);
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputClass =
    "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-[15px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-blue focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">Request a quote</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
        Tell us about your group and dates. We reply with your quotation via WhatsApp or a call –
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

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
      >
        {sent ? <MessageCircle className="size-[18px]" aria-hidden="true" /> : <Send className="size-[18px]" aria-hidden="true" />}
        {sent ? "Sent – continue in WhatsApp" : "Send via WhatsApp"}
      </button>
      {sent && (
        <p className="mt-3 text-center text-[13px] text-brand-muted" role="status">
          Your enquiry opened in WhatsApp. If it didn&apos;t, allow pop-ups and press the button again.
        </p>
      )}
      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Prices vary with travel dates, group size and selected options. Your final quotation is
        confirmed before booking.
      </p>
    </form>
  );
}
