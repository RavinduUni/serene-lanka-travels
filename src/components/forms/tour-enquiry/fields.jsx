"use client";

/**
 * Accessible form controls for the Customize Your Sri Lanka Tour form.
 * All controls are labelled native inputs; chips/cards are visually styled
 * checkboxes/radios so assistive tech gets real checked state (spec p.8).
 * Inputs are 16px on mobile (no iOS zoom) and ≥ 44px tall.
 */
import * as Icons from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldDomId } from "@/lib/tour-enquiry";

export const inputBase =
  "w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-base text-brand-ink placeholder:text-brand-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 disabled:cursor-not-allowed disabled:bg-brand-mist disabled:text-brand-muted sm:text-[15px]";
export const inputState = (invalid) =>
  invalid ? "border-red-600 focus:border-red-600" : "border-brand-line focus:border-brand-blue";

/** Visible error with icon (never colour alone). */
export function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] font-semibold text-red-700">
      <Icons.CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function Helper({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] leading-relaxed text-brand-muted">
      {children}
    </p>
  );
}

/**
 * Label + control + helper + error. `children` is a render function that
 * receives { id, describedBy, invalid } for the input.
 */
export function Field({ path, label, required, helper, error, children, className }) {
  const id = fieldDomId(path);
  const helpId = helper ? `${id}-help` : null;
  const errId = error ? `${id}-error` : null;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
        {label}
        {required && (
          <>
            <span className="text-brand-blue" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      <Helper id={helpId}>{helper}</Helper>
      <FieldError id={errId} message={error} />
    </div>
  );
}

/** Country dial-code select + telephone input (no country preselected). */
export function PhoneField({ path, label, required, helper, error, countries, country, value, onCountry, onValue, onBlur }) {
  const id = fieldDomId(path);
  const helpId = helper ? `${id}-help` : null;
  const errId = error ? `${id}-error` : null;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
        {label}
        {required && (
          <>
            <span className="text-brand-blue" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <div className="grid grid-cols-[minmax(0,9.5rem)_1fr] gap-2 sm:grid-cols-[minmax(0,12rem)_1fr]">
        <select
          id={`${id}-country`}
          aria-label={`${label} – country code`}
          value={country}
          onChange={(e) => onCountry(e.target.value)}
          className={cn(inputBase, inputState(false), "px-3")}
        >
          <option value="">Country code</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} (+{c.dial})
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={value}
          onChange={(e) => onValue(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          placeholder="e.g. 77 123 4567"
          className={cn(inputBase, inputState(Boolean(error)))}
        />
      </div>
      <Helper id={helpId}>{helper}</Helper>
      <FieldError id={errId} message={error} />
    </div>
  );
}

/** Whole-number input paired with a "Not decided yet" checkbox. */
export function CountOrUndecided({
  path,
  label,
  helper,
  error,
  value,
  undecided,
  onValue,
  onUndecided,
  onBlur,
  undecidedLabel = "Not decided yet",
  type = "count",
  min,
}) {
  const id = fieldDomId(path);
  const helpId = helper ? `${id}-help` : null;
  const errId = error ? `${id}-error` : null;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset>
      <legend className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
        {label}
        <span className="text-brand-blue" aria-hidden="true"> *</span>
        <span className="sr-only"> (required – enter a value or choose {undecidedLabel})</span>
      </legend>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          type={type === "date" ? "date" : "text"}
          inputMode={type === "date" ? undefined : "numeric"}
          min={type === "date" ? min : undefined}
          value={value}
          disabled={undecided}
          onChange={(e) => onValue(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          placeholder={type === "date" ? undefined : "e.g. 2"}
          className={cn(inputBase, inputState(Boolean(error)), type === "date" ? "sm:max-w-[15rem]" : "sm:max-w-[10rem]")}
        />
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[14px] font-medium text-brand-ink">
          <input
            type="checkbox"
            checked={undecided}
            onChange={(e) => onUndecided(e.target.checked)}
            className="size-5 shrink-0 cursor-pointer accent-brand-blue"
          />
          {undecidedLabel}
        </label>
      </div>
      <Helper id={helpId}>{helper}</Helper>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

/**
 * Single-select pill group (radios). Optional groups get a "Clear" button,
 * because blank means skipped (spec p.6).
 */
export function OptionPills({ path, legend, helper, error, options, value, onChange, clearable = true, name }) {
  const id = fieldDomId(path);
  const helpId = helper ? `${id}-help` : null;
  const errId = error ? `${id}-error` : null;
  return (
    <fieldset id={id} aria-describedby={[helpId, errId].filter(Boolean).join(" ") || undefined}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <legend className="text-[14px] font-semibold text-brand-ink">{legend}</legend>
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex min-h-9 items-center gap-1 rounded-full px-2.5 text-[13px] font-semibold text-brand-blue hover:bg-brand-sky"
          >
            <X className="size-3.5" aria-hidden="true" />
            Clear<span className="sr-only"> {legend}</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o.id;
          return (
            <label key={o.id} className="relative cursor-pointer">
              <input
                type="radio"
                name={name || path}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2",
                  checked
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-line bg-white text-brand-ink hover:border-brand-blue hover:text-brand-blue"
                )}
              >
                {checked && <Icons.Check className="size-4" aria-hidden="true" />}
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
      <Helper id={helpId}>{helper}</Helper>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

/** Multi-select checkbox chips (destinations). */
export function ChipGroup({ path, legend, error, options, values, onToggle }) {
  const id = fieldDomId(path);
  const errId = error ? `${id}-error` : null;
  return (
    <fieldset id={id} aria-describedby={errId || undefined}>
      <legend className="mb-2 text-[14px] font-semibold text-brand-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = values.includes(o.id);
          return (
            <label key={o.id} className="relative cursor-pointer">
              <input type="checkbox" checked={checked} onChange={() => onToggle(o.id)} className="peer sr-only" />
              <span
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2",
                  checked
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-line bg-white text-brand-ink hover:border-brand-blue hover:text-brand-blue"
                )}
              >
                {checked ? (
                  <Icons.Check className="size-4" aria-hidden="true" />
                ) : (
                  <Icons.Plus className="size-4 opacity-60" aria-hidden="true" />
                )}
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

/** Multi-select checkbox cards with a decorative icon (experiences). */
export function CardGroup({ path, legend, error, options, values, onToggle }) {
  const id = fieldDomId(path);
  const errId = error ? `${id}-error` : null;
  return (
    <fieldset id={id} aria-describedby={errId || undefined}>
      <legend className="mb-2 text-[14px] font-semibold text-brand-ink">{legend}</legend>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {options.map((o) => {
          const Icon = Icons[o.icon] || Icons.Sparkles;
          const checked = values.includes(o.id);
          return (
            <label key={o.id} className="relative cursor-pointer">
              <input type="checkbox" checked={checked} onChange={() => onToggle(o.id)} className="peer sr-only" />
              <span
                className={cn(
                  "flex h-full min-h-[4.5rem] flex-col items-start gap-2 rounded-2xl border p-3.5 text-[14px] font-semibold leading-snug transition-colors",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2",
                  checked
                    ? "border-brand-blue bg-brand-sky text-brand-navy"
                    : "border-brand-line bg-white text-brand-ink hover:border-brand-blue"
                )}
              >
                <span className="flex w-full items-center justify-between">
                  <Icon className={cn("size-5", checked ? "text-brand-blue" : "text-brand-muted")} aria-hidden="true" />
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-full border",
                      checked ? "border-brand-blue bg-brand-blue text-white" : "border-brand-line"
                    )}
                    aria-hidden="true"
                  >
                    {checked && <Icons.Check className="size-3.5" />}
                  </span>
                </span>
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

/** Exclusive "recommend for me" checkbox styled as a highlighted option. */
export function RecommendToggle({ checked, onChange, children }) {
  return (
    <label
      className={cn(
        "flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-colors",
        checked ? "border-brand-blue bg-brand-sky text-brand-navy" : "border-dashed border-brand-line bg-white text-brand-ink hover:border-brand-blue"
      )}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 shrink-0 cursor-pointer accent-brand-blue" />
      <Icons.Sparkles className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
      {children}
    </label>
  );
}
