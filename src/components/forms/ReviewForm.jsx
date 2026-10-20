"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, ImagePlus, X, Send, LoaderCircle, CircleCheck, CircleAlert } from "lucide-react";
import { inputBase, inputState, FieldError } from "@/components/forms/tour-enquiry/fields";
import { validateReview, REVIEW_LIMITS } from "@/lib/review-validation";
import { cn } from "@/lib/utils";

const RATING_WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
const ORDER = ["name", "email", "country", "tour", "rating", "text", "photo", "consent"];
const empty = { name: "", email: "", country: "", tour: "", rating: 0, text: "", consent: false, website: "" };

/** Submit a Review – sends to the Seren Lanka inbox for checking before publication. */
export default function ReviewForm({ tourOptions, privacyHref = "/legal/privacy-policy" }) {
  const [v, setV] = useState(empty);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [phase, setPhase] = useState("idle"); // idle | sending | success | failure | rate
  const [hover, setHover] = useState(0);
  const fileRef = useRef(null);
  const successRef = useRef(null);

  const previewRef = useRef("");
  /** Sets the photo and its preview URL together, revoking the previous blob URL. */
  const choosePhoto = (file) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = file ? URL.createObjectURL(file) : "";
    setPreview(previewRef.current);
    setPhoto(file);
  };
  useEffect(() => () => previewRef.current && URL.revokeObjectURL(previewRef.current), []);

  useEffect(() => {
    if (phase === "success") successRef.current?.focus();
  }, [phase]);

  const trimmed = { ...v, name: v.name.trim(), email: v.email.trim(), country: v.country.trim(), text: v.text.trim() };
  const clientErrors = validateReview(trimmed, { photo: photo ? { type: photo.type, size: photo.size } : null });
  const errors = { ...serverErrors, ...clientErrors };
  const show = (k) => (attempted || touched[k] ? errors[k] : undefined);

  const set = (k, val) => {
    setV((s) => ({ ...s, [k]: val }));
    setServerErrors((e) => {
      if (!e[k]) return e;
      const { [k]: _omit, ...rest } = e;
      return rest;
    });
  };
  const touch = (k) => setTouched((t) => (t[k] ? t : { ...t, [k]: true }));

  const focusFirst = (errs) => {
    const first = ORDER.find((k) => errs[k]);
    if (!first) return;
    const el = document.getElementById(`rv-${first}`) || document.querySelector(`[name="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (phase === "sending") return;
    setAttempted(true);
    if (Object.keys(clientErrors).length) return focusFirst(clientErrors);

    setPhase("sending");
    const fd = new FormData();
    Object.entries(trimmed).forEach(([k, val]) => {
      if (k === "consent") fd.append(k, val ? "yes" : "");
      else fd.append(k, String(val));
    });
    if (photo) fd.append("photo", photo);

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: fd });
      if (res.status === 201) {
        setPhase("success");
        setV(empty);
        choosePhoto(null);
        setTouched({});
        setAttempted(false);
        return;
      }
      if (res.status === 422 || res.status === 413) {
        const data = await res.json().catch(() => ({}));
        setServerErrors(data.errors || {});
        setPhase("idle");
        focusFirst(data.errors || {});
        return;
      }
      setPhase(res.status === 429 ? "rate" : "failure");
    } catch {
      setPhase("failure");
    }
  }

  if (phase === "success") {
    return (
      <div className="rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-sky text-brand-blue">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-5 text-2xl font-bold tracking-tight text-brand-navy outline-none">
          Thank you for your review!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-brand-muted">
          It has been sent to our team. Once we have confirmed it relates to a trip with us, we will publish it on this page.
        </p>
        <button
          type="button"
          onClick={() => setPhase("idle")}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full border border-brand-navy/20 px-6 text-[15px] font-semibold text-brand-navy hover:bg-brand-mist"
        >
          Write another review
        </button>
      </div>
    );
  }

  const shownRating = hover || v.rating;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-8">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="rv-website">Website</label>
        <input id="rv-website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-name" className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
            Name <span className="text-brand-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="rv-name"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => touch("name")}
            aria-invalid={Boolean(show("name")) || undefined}
            aria-describedby={show("name") ? "rv-name-error" : undefined}
            className={cn(inputBase, inputState(Boolean(show("name"))))}
          />
          <FieldError id="rv-name-error" message={show("name")} />
        </div>
        <div>
          <label htmlFor="rv-email" className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
            Email <span className="text-brand-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="rv-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => touch("email")}
            aria-invalid={Boolean(show("email")) || undefined}
            aria-describedby={["rv-email-help", show("email") && "rv-email-error"].filter(Boolean).join(" ")}
            className={cn(inputBase, inputState(Boolean(show("email"))))}
          />
          <p id="rv-email-help" className="mt-1.5 text-[13px] text-brand-muted">Never published.</p>
          <FieldError id="rv-email-error" message={show("email")} />
        </div>
        <div>
          <label htmlFor="rv-country" className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
            Country
          </label>
          <input
            id="rv-country"
            autoComplete="country-name"
            value={v.country}
            onChange={(e) => set("country", e.target.value)}
            onBlur={() => touch("country")}
            aria-invalid={Boolean(show("country")) || undefined}
            aria-describedby={show("country") ? "rv-country-error" : undefined}
            placeholder="e.g. United Kingdom"
            className={cn(inputBase, inputState(Boolean(show("country"))))}
          />
          <FieldError id="rv-country-error" message={show("country")} />
        </div>
        <div>
          <label htmlFor="rv-tour" className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
            Tour or service <span className="text-brand-blue" aria-hidden="true">*</span>
          </label>
          <select
            id="rv-tour"
            value={v.tour}
            onChange={(e) => {
              set("tour", e.target.value);
              touch("tour");
            }}
            aria-invalid={Boolean(show("tour")) || undefined}
            aria-describedby={show("tour") ? "rv-tour-error" : undefined}
            className={cn(inputBase, inputState(Boolean(show("tour"))))}
          >
            <option value="">Select a tour or service</option>
            {tourOptions.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <FieldError id="rv-tour-error" message={show("tour")} />
        </div>
      </div>

      {/* Star rating – real radio inputs */}
      <fieldset className="mt-6" aria-describedby={show("rating") ? "rv-rating-error" : undefined}>
        <legend className="mb-2 text-[14px] font-semibold text-brand-ink">
          Your rating <span className="text-brand-blue" aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer p-1" onMouseEnter={() => setHover(n)}>
                <input
                  id={n === 1 ? "rv-rating" : undefined}
                  type="radio"
                  name="rating"
                  value={n}
                  checked={v.rating === n}
                  onChange={() => {
                    set("rating", n);
                    touch("rating");
                  }}
                  className="peer sr-only"
                />
                <span className="sr-only">{`${n} star${n > 1 ? "s" : ""} – ${RATING_WORDS[n]}`}</span>
                <Star
                  aria-hidden="true"
                  className={cn(
                    "size-8 rounded-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue",
                    n <= shownRating ? "fill-brand-blue text-brand-blue" : "fill-transparent text-brand-line"
                  )}
                />
              </label>
            ))}
          </div>
          <span className="text-[14px] font-semibold text-brand-navy" aria-hidden="true">
            {RATING_WORDS[shownRating]}
          </span>
        </div>
        <FieldError id="rv-rating-error" message={show("rating")} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor="rv-text" className="mb-1.5 block text-[14px] font-semibold text-brand-ink">
          Your review <span className="text-brand-blue" aria-hidden="true">*</span>
        </label>
        <textarea
          id="rv-text"
          rows={5}
          value={v.text}
          onChange={(e) => set("text", e.target.value)}
          onBlur={() => touch("text")}
          aria-invalid={Boolean(show("text")) || undefined}
          aria-describedby={["rv-text-help", show("text") && "rv-text-error"].filter(Boolean).join(" ")}
          placeholder="Tell us about your trip – the places you visited, your driver, or anything that stood out."
          className={cn(inputBase, inputState(Boolean(show("text"))), "resize-y")}
        />
        <p id="rv-text-help" className="mt-1.5 text-[13px] text-brand-muted">
          {REVIEW_LIMITS.textMax - v.text.length} characters remaining.
        </p>
        <FieldError id="rv-text-error" message={show("text")} />
      </div>

      {/* Optional photo */}
      <div className="mt-6">
        <p className="mb-1.5 text-[14px] font-semibold text-brand-ink">Photo (optional)</p>
        {photo ? (
          <div className="flex items-center gap-4 rounded-2xl border border-brand-line p-3">
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not an optimisable asset
              <img src={preview} alt="Selected photo preview" className="size-16 rounded-xl object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-brand-ink">{photo.name}</p>
              <p className="text-[13px] text-brand-muted">
                {photo.size < 1024 * 1024 ? `${Math.max(1, Math.round(photo.size / 1024))} KB` : `${(photo.size / 1024 / 1024).toFixed(1)} MB`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                choosePhoto(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-[13px] font-semibold text-brand-blue hover:bg-brand-sky"
            >
              <X className="size-4" aria-hidden="true" />
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="rv-photo"
            className="flex min-h-[4.5rem] cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-brand-line px-4 py-3 text-[14px] text-brand-muted transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            <ImagePlus className="size-6 shrink-0 text-brand-blue" aria-hidden="true" />
            <span>
              <span className="font-semibold text-brand-ink">Add a photo from your trip</span>
              <span className="block text-[13px]">JPG, PNG or WebP, up to 4 MB</span>
            </span>
          </label>
        )}
        <input
          ref={fileRef}
          id="rv-photo"
          type="file"
          accept={REVIEW_LIMITS.photoTypes.join(",")}
          onChange={(e) => {
            choosePhoto(e.target.files?.[0] || null);
            touch("photo");
            setServerErrors((er) => ({ ...er, photo: undefined }));
          }}
          aria-describedby={show("photo") ? "rv-photo-error" : undefined}
          className="sr-only"
        />
        <FieldError id="rv-photo-error" message={show("photo")} />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-brand-ink">
          <input
            id="rv-consent"
            type="checkbox"
            checked={v.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              touch("consent");
            }}
            aria-invalid={Boolean(show("consent")) || undefined}
            aria-describedby={show("consent") ? "rv-consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-blue"
          />
          <span>
            I agree that my review, name, country and photo (if provided) may be published on this website and Seren Lanka
            Travels’ social channels. See our{" "}
            <Link href={privacyHref} className="font-semibold text-brand-blue underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id="rv-consent-error" message={show("consent")} />
      </div>

      {(phase === "failure" || phase === "rate") && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-800">
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {phase === "rate"
            ? "Too many attempts. Please wait a moment and try again."
            : "We could not send your review. Your details are still here – please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={phase === "sending"}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-8 text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(26,140,255,0.7)] transition-colors hover:bg-brand-blue-dark disabled:cursor-wait disabled:opacity-80"
      >
        {phase === "sending" ? (
          <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <Send className="size-5" aria-hidden="true" />
        )}
        {phase === "sending" ? "Sending your review..." : "Submit Review"}
      </button>
      <p className="mt-3 text-center text-[13px] text-brand-muted">
        Reviews are checked by our team before they appear on this page.
      </p>
      <p className="sr-only" aria-live="polite">
        {phase === "sending" ? "Sending your review" : ""}
      </p>
    </form>
  );
}
