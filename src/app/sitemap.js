import { site } from "@/data/site";
import { getDayTours, getItineraries, getTransferServices, getDestinations } from "@/lib/content";

/**
 * Only routes that exist are emitted. Add dynamic routes here as each
 * content model is implemented (itineraries, destinations …).
 */
export default function sitemap() {
  const lastMod = new Date("2026-10-18T00:00:00.000Z");
  return [
    { url: site.url, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about-us`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/day-tours`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.9 },
    ...getDayTours().map((t) => ({
      url: `${site.url}/day-tours/${t.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${site.url}/sri-lanka-itineraries`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.9 },
    ...getItineraries().map((t) => ({
      url: `${site.url}/sri-lanka-itineraries/${t.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    { url: `${site.url}/transfers`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    ...getTransferServices().map((s) => ({
      url: `${site.url}/transfers/${s.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    { url: `${site.url}/destinations`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    ...getDestinations().map((d) => ({
      url: `${site.url}/destinations/${d.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
