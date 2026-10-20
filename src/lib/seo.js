import { site } from "@/data/site";

/** Default social-share image used when no page-specific heroImage is available. */
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=75";

/**
 * Builds a Next.js Metadata object with sensible defaults.
 * @param {{title?: string, description?: string, path?: string, image?: string, rawTitle?: boolean}} opts
 * When `rawTitle` is true the title is used verbatim (for SEO-spec titles
 * that already include the brand suffix). Otherwise `| Site Name` is appended.
 */
export function buildMetadata({ title, description, path = "/", image, rawTitle } = {}) {
  const fullTitle = rawTitle && title
    ? title
    : title
      ? `${title} | ${site.name}`
      : `${site.name} – Private & Tailor-Made Sri Lanka Tours`;
  const desc =
    description ||
    "Private and tailor-made Sri Lanka tours, day trips, transfers and authentic local travel experiences designed around your time, interests and budget.";
  const url = new URL(path, site.url).toString();
  const ogImage = image || DEFAULT_OG_IMAGE;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [ogImage] },
  };
}

/** schema.org TravelAgency for the Organization */
export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    logo: new URL("/logo/seren-lanka-travels.png", site.url).toString(),
    image: new URL("/logo/seren-lanka-travels.png", site.url).toString(),
    foundingDate: String(site.founded),
    areaServed: "LK",
    telephone: site.phones[0],
    sameAs: Object.values(site.social).filter((s) => s && s !== "#"),
  };
}

/** schema.org FAQPage */
export function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
