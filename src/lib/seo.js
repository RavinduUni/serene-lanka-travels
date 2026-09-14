import { site } from "@/data/site";

/**
 * Builds a Next.js Metadata object with sensible defaults.
 * @param {{title?: string, description?: string, path?: string, image?: string}} opts
 */
export function buildMetadata({ title, description, path = "/", image } = {}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} – Private & Tailor-Made Sri Lanka Tours`;
  const desc =
    description ||
    "Private and tailor-made Sri Lanka tours, day trips, transfers and authentic local travel experiences designed around your time, interests and budget.";
  const url = new URL(path, site.url).toString();
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
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
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
