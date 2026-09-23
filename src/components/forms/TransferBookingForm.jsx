"use client";

import { useState } from "react";
import { Send, MessageCircle, Clock } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Transfer booking form – all confirmed fields from Content Plan §19, plus
 * contact details so the team can reply. No backend yet: the enquiry is
 * composed into a WhatsApp message (the confirmed enquiry channel). When
 * /api/enquiry exists, POST the same payload there first.
 *
 * Props: vehicles (from getVehicles()), notes (driverServiceNotes), serviceName?
 */
const inputClass =
  "w-full rounded-xl border border-brand-line bg-white px-4 py-3 text-[15px] text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-blue focus:outline-none";

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-brand-ink">
        {label}
        {required && <span className="text-brand-blue"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function TransferBookingForm({ vehicles = [], notes = [], serviceName }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    const lines = [
      `Hi Seren Lanka Travels, I would like a quote for a private transfer from ${d.pickup} to ${d.dropoff}.`,
      serviceName && `Service: ${serviceName}`,
      "",
      `Date: ${d.date}`,
      `Pickup time: ${d.time}`,
      d.flight && `Flight number: ${d.flight}`,
      `Passengers: ${d.passengers}`,
      `Bags: ${d.bags}`,
      `Vehicle type: ${d.vehicle}`,
      `Child seat: ${d.childSeat ? "Yes" : "No"}`,
      d.requests && `Special requests: ${d.requests}`,
      "",
      `Name: ${d.name}`,
      d.contact && `Contact: ${d.contact}`,
    ].filter(Boolean);
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">Book a transfer</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
        Tell us where and when. We confirm the vehicle and price by WhatsApp or a call – typically within 4 hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="tf-pickup" label="Pickup location" required>
          <input id="tf-pickup" name="pickup" type="text" required placeholder="e.g. Bandaranaike International Airport" className={inputClass} />
        </Field>
        <Field id="tf-dropoff" label="Drop-off location" required>
          <input id="tf-dropoff" name="dropoff" type="text" required placeholder="e.g. Hotel name, Kandy" className={inputClass} />
        </Field>
        <Field id="tf-date" label="Date" required>
          <input id="tf-date" name="date" type="date" required className={inputClass} />
        </Field>
        <Field id="tf-time" label="Pickup time" required>
          <input id="tf-time" name="time" type="time" required className={inputClass} />
        </Field>
        <Field id="tf-flight" label="Flight number">
          <input id="tf-flight" name="flight" type="text" placeholder="For airport transfers" className={inputClass} />
        </Field>
        <Field id="tf-vehicle" label="Vehicle type" required>
          <select id="tf-vehicle" name="vehicle" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} – {v.capacityLabel}
              </option>
            ))}
          </select>
        </Field>
        <Field id="tf-passengers" label="Number of passengers" required>
          <input id="tf-passengers" name="passengers" type="number" min="1" defaultValue="2" required className={inputClass} />
        </Field>
        <Field id="tf-bags" label="Number of bags" required>
          <input id="tf-bags" name="bags" type="number" min="0" defaultValue="2" required className={inputClass} />
        </Field>
        <Field id="tf-name" label="Your name" required>
          <input id="tf-name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </Field>
        <Field id="tf-contact" label="WhatsApp number or email">
          <input id="tf-contact" name="contact" type="text" autoComplete="tel" className={inputClass} />
        </Field>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-brand-line px-4 py-3 text-[14px] font-semibold text-brand-ink">
            <input type="checkbox" name="childSeat" value="yes" className="size-4 accent-brand-blue" />
            Child seat required
          </label>
        </div>
        <div className="sm:col-span-2">
          <Field id="tf-requests" label="Special requests">
            <textarea id="tf-requests" name="requests" rows="3" className={inputClass} />
          </Field>
        </div>
      </div>

      {/* §19 – confirmed operational notes, required on the booking form */}
      {notes.length > 0 && (
        <ul className="mt-5 space-y-1.5 rounded-xl bg-brand-sky p-4 text-[13px] leading-relaxed text-brand-navy">
          {notes.map((n) => (
            <li key={n} className="flex items-start gap-2">
              {n}
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
      >
        {sent ? <MessageCircle className="size-[18px]" aria-hidden="true" /> : <Send className="size-[18px]" aria-hidden="true" />}
        {sent ? "Sent – continue in WhatsApp" : "Send Booking Request via WhatsApp"}
      </button>
      {sent && (
        <p className="mt-3 text-center text-[13px] text-brand-muted" role="status">
          Your request opened in WhatsApp. If it didn&apos;t, allow pop-ups and press the button again.
        </p>
      )}
      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Vehicle rates may change monthly or by season. Your price is confirmed before booking.
      </p>
    </form>
  );
}
