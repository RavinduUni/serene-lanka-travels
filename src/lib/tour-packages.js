/**
 * Pure helpers for the Tour Packages pages (safe on server and client).
 */
import {
  tourTypes,
  packageThemes,
  packageDestinations,
  packageExperiences,
} from "@/data/tour-packages";

const nf = new Intl.NumberFormat("en-US");

/** "USD 1,245" / "LKR 410,590" */
export function formatMoney(amount, currency = "USD") {
  return `${currency} ${nf.format(amount)}`;
}

export function durationLabel(pkg) {
  return `${pkg.days} Days / ${pkg.nights} Nights`;
}

export function tourTypeLabel(id) {
  return tourTypes.find((t) => t.id === id)?.label.replace(/s$/, "") || "Private Tour";
}

const labelFrom = (list) => (id) => list.find((o) => o.id === id)?.label || id;
export const themeLabel = labelFrom(packageThemes);
export const destinationLabel = labelFrom(packageDestinations);
export const experienceLabel = labelFrom(packageExperiences);

/** Plain, serialisable card object passed to the client-side explorer. */
export function toPackageCard(pkg) {
  return {
    slug: pkg.slug,
    href: `/tour-packages/${pkg.slug}`,
    title: pkg.title,
    shortName: pkg.shortName,
    order: pkg.order,
    days: pkg.days,
    nights: pkg.nights,
    durationLabel: durationLabel(pkg),
    tourType: pkg.tourType,
    tourTypeLabel: tourTypeLabel(pkg.tourType),
    themes: pkg.themes,
    themeLabels: pkg.themes.map(themeLabel),
    destinations: pkg.destinations,
    experiences: pkg.experiences,
    route: pkg.routeShort,
    description: pkg.cardDescription,
    image: pkg.cardImage,
    transportShort: pkg.transportShort,
    activityCount: pkg.activities.length,
    priceUsd: pkg.pricing.usd,
    priceLkr: pkg.pricing.lkr,
    searchText: [
      pkg.title,
      pkg.shortName,
      ...pkg.routeShort,
      ...pkg.activities,
      ...pkg.themes.map(themeLabel),
      ...pkg.destinations.map(destinationLabel),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

/* --------------------------------------------------------------------- Maps */

/**
 * Google Maps embed that draws the driving route through each stop in day
 * order. Google resolves the place names, so pins land in the right place
 * (guide §10 – no hand-placed markers). The key-less embed is used, matching
 * the itinerary pages.
 */
export function mapEmbedUrl(stops) {
  const q = (s) => encodeURIComponent(s.query);
  const [first, ...rest] = stops;
  return `https://maps.google.com/maps?saddr=${q(first)}&daddr=${rest.map(q).join("+to:")}&output=embed`;
}

/** Opens the same route in Google Maps (useful on mobile for zooming). */
export function directionsUrl(stops) {
  return `https://www.google.com/maps/dir/${stops.map((s) => encodeURIComponent(s.query)).join("/")}`;
}
