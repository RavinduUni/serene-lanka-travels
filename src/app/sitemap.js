import { site } from "@/data/site";

/**
 * Only routes that exist are emitted. Add dynamic routes here as each
 * content model is implemented (day tours, itineraries, destinations …).
 */
export default function sitemap() {
  const now = new Date();
  return [{ url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 }];
}
