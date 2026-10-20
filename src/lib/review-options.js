import { getDayTours, getItineraries, getTransferServices } from "@/lib/content";

/**
 * "Tour / service" options for the review form, grouped for a <select>.
 * Built on the server from the site's real content, and re-checked by
 * /api/reviews so only known values are accepted.
 */
export function getReviewTourOptions() {
  return [
    { group: "Multi-day tours", options: getItineraries().map((t) => t.name) },
    { group: "Day tours", options: getDayTours().map((t) => t.name) },
    { group: "Transfers", options: getTransferServices().map((s) => s.name) },
    { group: "Other", options: ["Tailor-made tour", "Something else"] },
  ];
}

export function getAllowedReviewTours() {
  return new Set(getReviewTourOptions().flatMap((g) => g.options));
}
