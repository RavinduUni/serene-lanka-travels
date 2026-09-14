/** Tiny className joiner (avoids an extra dependency). */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
