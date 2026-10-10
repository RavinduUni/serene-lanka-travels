"use client";

import { useState } from "react";
import { Send, CheckCircle2, LoaderCircle, AlertCircle } from "lucide-react";

/**
 * Transfer booking form – submits via POST /api/transfer-enquiry which
 * delivers the booking request by email.
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
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure

  async function onSubmit(e) {
    e.preventDefault();
    if (phase === "sending") return;
    setPhase("sending");

    const d = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/transfer-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, serviceName }),
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
          <p className="text-xl font-bold text-brand-navy">Booking request sent!</p>
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
            We&apos;ll confirm the vehicle and price via email or WhatsApp – typically within 4 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPhase("idle")}
          className="text-[13px] font-semibold text-brand-blue underline-offset-2 hover:underline"
        >
          Submit another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">Book a transfer</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">
        Tell us where and when. We confirm the vehicle and price via email or a call – typically within 4 hours.
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
        <Field id="tf-contact" label="Email or WhatsApp number">
          <input id="tf-contact" name="contact" type="text" autoComplete="email" placeholder="your@email.com or +1 555 000 0000" className={inputClass} />
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

      {/* §19 – confirmed operational notes */}
      {notes.length > 0 && (
        <ul className="mt-5 space-y-1.5 rounded-xl bg-brand-sky p-4 text-[13px] leading-relaxed text-brand-navy">
          {notes.map((n) => (
            <li key={n} className="flex items-start gap-2">
              {n}
            </li>
          ))}
        </ul>
      )}

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
        {phase === "sending" ? "Sending…" : "Send Booking Request"}
      </button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-muted">
        Vehicle rates may change monthly or by season. Your price is confirmed before booking.
      </p>
    </form>
  );
}
