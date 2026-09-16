/**
 * Single data-access layer. Pages and components import ONLY from here –
 * when the admin dashboard / API exists, rewrite these functions and
 * nothing else in the app changes.
 */
import { dayTours } from "@/data/day-tours";

export function getDayTours() {
  return dayTours.filter((t) => t.published);
}

export function getDayTourBySlug(slug) {
  return getDayTours().find((t) => t.slug === slug) || null;
}

export function getRelatedDayTours(tour, limit = 3) {
  const bySlug = new Map(getDayTours().map((t) => [t.slug, t]));
  return (tour.related || [])
    .map((slug) => bySlug.get(slug))
    .filter(Boolean)
    .slice(0, limit);
}
