import { site } from "@/data/site";
import { getDayTours, getItineraries, getTransferServices } from "@/lib/content";

/**
 * Only routes that exist are emitted. Add dynamic routes here as each
 * content model is implemented (itineraries, destinations …).
 */
export default function sitemap() {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/day-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...getDayTours().map((t) => ({
      url: `${site.url}/day-tours/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${site.url}/sri-lanka-itineraries`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...getItineraries().map((t) => ({
      url: `${site.url}/sri-lanka-itineraries/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${site.url}/transfers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getTransferServices().map((s) => ({
      url: `${site.url}/transfers/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
