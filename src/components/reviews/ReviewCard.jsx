"use client";

import { useState } from "react";
import StarRating from "@/components/reviews/StarRating";
import { cn } from "@/lib/utils";

const CLAMP_AT = 200; // characters before "Read more"

const getInitial = (name) => {
  if (!name) return "G";
  return name.trim().charAt(0).toUpperCase();
};

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Recently";
  if (dateStr.includes("ago")) return dateStr;

  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m) return dateStr;

  const reviewDate = new Date(Date.UTC(y, m - 1, d || 1));
  const now = new Date();
  const diffMonths =
    (now.getFullYear() - reviewDate.getFullYear()) * 12 +
    (now.getMonth() - reviewDate.getMonth());

  if (diffMonths <= 0) return "Recently";
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
};

/** Official 4-color Google "G" logo badge overlapping bottom right of avatar */
function GoogleBadge({ className }) {
  return (
    <span
      className={cn(
        "absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-white shadow-sm ring-[1.5px] ring-white select-none",
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-3.5">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.89 0 12s.45 3.86 1.24 5.42l4.04-3.15Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
        />
      </svg>
    </span>
  );
}

/** 12-point scalloped blue verified checkmark badge */
function VerifiedBadge({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 shrink-0 text-[#1a73e8]", className)} aria-label="Verified" role="img">
      <path
        fill="currentColor"
        d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
    </svg>
  );
}

/** One Google-style review card matching the reference design */
export default function ReviewCard({ review, className }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text && review.text.length > CLAMP_AT;
  const textId = `${review.id}-text`;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-gray-100 bg-slate-100 p-6 shadow-[0_2px_14px_rgba(0,0,0,0.06)] sm:p-7",
        className
      )}
    >
      {/* Header: Avatar with Google badge + Name & Date */}
      <header className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <span
            className="grid size-12 place-items-center rounded-full bg-[#37474f] text-[18px] font-semibold text-white select-none"
            aria-hidden="true"
          >
            {getInitial(review.name)}
          </span>
          <GoogleBadge />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[16px] font-bold text-gray-900 tracking-tight">
              {review.name}
            </h3>
            <VerifiedBadge />
          </div>
          <p className="mt-0.5 text-[13.5px] font-normal text-gray-500">
            {formatTimeAgo(review.date)}
          </p>
        </div>
      </header>

      {/* Gold star rating */}
      <div className="mt-4">
        <StarRating rating={review.rating || 5} size="size-[18px]" />
      </div>

      {/* Review body text & Read more */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between">
        <p
          id={textId}
          className="text-[15px] font-normal leading-relaxed text-gray-800"
        >
          {expanded || !long ? review.text : `${review.text.slice(0, CLAMP_AT).trimEnd()}...`}
        </p>

        {long && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={textId}
            className="mt-2.5 self-start text-[14.5px] font-medium text-[#1a73e8] transition-colors hover:text-[#1557b0]"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}

