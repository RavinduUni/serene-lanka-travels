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
    logo: new URL(site.logo, site.url).toString(),
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
