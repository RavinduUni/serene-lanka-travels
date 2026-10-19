import { site } from "@/data/site";
import { getDayTours, getItineraries, getTransferServices, getDestinations, getExperiences } from "@/lib/content";
import { getBlogPosts } from "@/data/blog";
import { legalDocuments } from "@/data/legal";

/**
 * All public, indexable routes. Private API routes, utility pages
 * (/_not-found, /robots.txt, /sitemap.xml, /apple-icon.png, /icon.png)
 * and redirect-only pages (/tailor-made-tours/build) are intentionally omitted.
 */
export default function sitemap() {
  const lastMod = new Date("2026-10-18T00:00:00.000Z");
  return [
    // ── Core pages ────────────────────────────────────────────────────
    { url: site.url, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about-us`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact-us`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/discover-sri-lanka`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/tailor-made-tours`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    // ── Day Tours ─────────────────────────────────────────────────────
    { url: `${site.url}/day-tours`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.9 },
    ...getDayTours().map((t) => ({
      url: `${site.url}/day-tours/${t.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    // ── Itineraries ───────────────────────────────────────────────────
    { url: `${site.url}/sri-lanka-itineraries`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.9 },
    ...getItineraries().map((t) => ({
      url: `${site.url}/sri-lanka-itineraries/${t.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    // ── Transfers ─────────────────────────────────────────────────────
    { url: `${site.url}/transfers`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    ...getTransferServices().map((s) => ({
      url: `${site.url}/transfers/${s.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    // ── Destinations ──────────────────────────────────────────────────
    { url: `${site.url}/destinations`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    ...getDestinations().map((d) => ({
      url: `${site.url}/destinations/${d.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    // ── Experiences ───────────────────────────────────────────────────
    { url: `${site.url}/experiences`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    ...getExperiences().map((e) => ({
      url: `${site.url}/experiences/${e.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    // ── Blog ──────────────────────────────────────────────────────────
    { url: `${site.url}/blog`, lastModified: lastMod, changeFrequency: "weekly", priority: 0.7 },
    ...getBlogPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(`${p.date}T00:00:00.000Z`) : lastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    // ── Legal ─────────────────────────────────────────────────────────
    ...legalDocuments
      .filter((d) => d.published)
      .map((d) => ({
        url: `${site.url}/legal/${d.slug}`,
        lastModified: d.lastUpdated ? new Date(`${d.lastUpdated}T00:00:00.000Z`) : lastMod,
        changeFrequency: "yearly",
        priority: 0.3,
      })),
  ];
}
