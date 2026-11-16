import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Clock,
  Compass,
  Route,
  Sparkles,
  TriangleAlert,
  Wallet,
  Wand2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import PackageGallery from "@/components/tour-packages/PackageGallery";
import PackageItinerary from "@/components/tour-packages/PackageItinerary";
import PackagePriceCard from "@/components/tour-packages/PackagePriceCard";
import PackageCard from "@/components/tour-packages/PackageCard";
import RouteMap from "@/components/tour-packages/RouteMap";
import TourInfoTabs from "@/components/tour-packages/TourInfoTabs";
import MobileEnquiryBar from "@/components/tour-packages/MobileEnquiryBar";
import PackageEnquiryForm from "@/components/forms/PackageEnquiryForm";
import { getTourPackages, getTourPackageBySlug, getRelatedTourPackages } from "@/lib/content";
import {
  durationLabel,
  formatMoney,
  themeLabel,
  toPackageCard,
  tourTypeLabel,
} from "@/lib/tour-packages";
import { getPhoneCountries } from "@/lib/phone-countries";
import { enquiryCopy, priceCondition } from "@/data/tour-packages";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

/** Only the packages in tour-packages.js exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getTourPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = getTourPackageBySlug(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: pkg.seoTitle,
    rawTitle: true,
    description: pkg.metaDescription,
    path: `/tour-packages/${pkg.slug}`,
    image: pkg.heroImage.src,
  });
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "route-map", label: "Route Map" },
  { id: "tour-info", label: "Tour Info" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

export default async function TourPackagePage({ params }) {
  const { slug } = await params;
  const pkg = getTourPackageBySlug(slug);
  if (!pkg) notFound();

  const related = getRelatedTourPackages(pkg).map(toPackageCard);
  const whatsappMessage = whatsappTemplates.tour(pkg.title);
  const formPackages = getTourPackages().map((p) => ({
    slug: p.slug,
    title: p.title,
    priceLabel: formatMoney(p.pricing.usd),
  }));

  const facts = [
    { image: '/tour-packages/01-duration.svg', label: "Duration", value: durationLabel(pkg) },
    { image: '/tour-packages/02-tour-type.svg', label: "Tour Type", value: tourTypeLabel(pkg.tourType) },
    { image: '/tour-packages/03-tour-themes.svg', label: "Tour Themes", value: pkg.themes.map(themeLabel).join(", ") },
    { image: '/tour-packages/04-private-transport.svg', label: "Private Transport", value: pkg.transport },
    {
      image: '/tour-packages/05-starting-price.svg',
      label: "Starting Price",
      value: `${formatMoney(pkg.pricing.usd)} / Person · approx. ${formatMoney(pkg.pricing.lkr, "LKR")}`,
      wide: true,
    },
    { image: '/tour-packages/06-route.svg', label: "Route", value: pkg.routeLabel, wide: true },
  ];

  const infoTabs = [
    { id: "included", label: "What's Included", kind: "included", items: pkg.inclusions },
    { id: "excluded", label: "Not Included", kind: "excluded", items: pkg.exclusions },
    { id: "good-to-know", label: "Good to Know", kind: "info", items: [priceCondition, ...pkg.goodToKnow] },
  ];

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.metaDescription,
    url: new URL(`/tour-packages/${pkg.slug}`, site.url).toString(),
    image: new URL(pkg.heroImage.src, site.url).toString(),
    touristType: "International travellers",
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    itinerary: {
      "@type": "ItemList",
      itemListElement: pkg.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        name: `Day ${d.day}: ${d.title}`,
        description: d.intro,
      })),
    },
  };

  const titleParts = (pkg.h1 || pkg.title || "").includes(" – ")
    ? (pkg.h1 || pkg.title).split(" – ")
    : (pkg.h1 || pkg.title || "").includes(" - ")
    ? (pkg.h1 || pkg.title).split(" - ")
    : [pkg.h1 || pkg.title];

  return (
    <>
      {/* ── 01 Hero ──────────────────────────────────────────────────────────── */}
      <section
        id="package-hero"
        className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24"
      >
        <Image
          src={pkg.heroImage.src}
          alt={pkg.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tour Packages", href: "/tour-packages" },
              { label: pkg.shortName },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4rem]">
              {titleParts[0]}{" "}
              {titleParts[1] && <span className="font-light">{titleParts.slice(1).join(" – ")}</span>}
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[14px] leading-[1.85] text-white/80 sm:text-base">
            {pkg.cardDescription || pkg.summary}
          </p>
        </Container>
      </section>

      {/* ── 02 Main: 8/4 two-column layout ───────────────────────────────────── */}
      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

            {/* ── LEFT: Main reading column ──────────────────────────────── */}
            <div className="min-w-0 lg:col-span-8">

              {/* Mobile price card (between gallery and nav) */}
              <div className="mt-8 lg:hidden">
                <PackagePriceCard pkg={pkg} />
              </div>

              {/* Overview ─────────────────────────────────────────────────── */}
              <div id="overview" className="scroll-mt-28 pt-12">
                <SectionHeading lines={["Tour", "Overview"]} size="md" />
                <p className="mt-5 text-[15px] leading-[1.85] text-brand-ink sm:text-base">{pkg.summary}</p>

                {/* Quick-facts grid */}
                <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-brand-line bg-brand-line sm:grid-cols-2">
                  {facts.map(({ image, label, value, wide }) => (
                    <div
                      key={label}
                      className={`flex items-start gap-3.5 bg-white p-5 ${wide ? "sm:col-span-2" : ""}`}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl">
                        <Image src={image} width={40} height={40} alt="package-details"/>
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[12px] font-semibold uppercase tracking-wide text-brand-muted">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-[15px] font-semibold leading-snug text-brand-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {/* Activities tag cloud */}
                <h3 className="mt-10 text-lg font-bold text-black">Planned sightseeing &amp; activities</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pkg.activities.map((a) => (
                    <li
                      key={a}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3.5 py-2 text-[13.5px] font-semibold text-brand-navy"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary ────────────────────────────────────────────────── */}
              <div id="itinerary" className="scroll-mt-28 pt-16">
                <SectionHeading lines={["Day by Day", "Itinerary"]} size="sm" />
                <div className="mt-6">
                  <PackageItinerary days={pkg.itinerary} />
                </div>
              </div>

              {/* Route map ────────────────────────────────────────────────── */}
              <div id="route-map" className="scroll-mt-28 pt-16">
                <SectionHeading lines={["Your", "Route Map"]} size="sm" />
                <div className="mt-8">
                  <RouteMap stops={pkg.mapStops} title={pkg.title} note={pkg.mapNote} />
                </div>
              </div>

              {/* Tour info tabs ───────────────────────────────────────────── */}
              <div id="tour-info" className="scroll-mt-28 pt-16">
                <SectionHeading lines={["Tour", "Information"]} size="sm" />
                <div className="mt-8">
                  <TourInfoTabs tabs={infoTabs} />
                </div>
              </div>

              {/* FAQs ─────────────────────────────────────────────────────── */}
              <div id="faqs" className="scroll-mt-28 pt-16">
                <SectionHeading lines={["Frequently Asked", "Questions"]} size="sm" />
                <div className="mt-8 rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
                  <Accordion items={pkg.faqs} />
                </div>
              </div>

              {/* Request a Quote Form ──────────────────────────────────────── */}
              <div id="enquire" className="scroll-mt-28 pt-16">
                <SectionHeading lines={["Request a", "Quote"]} size="sm" />
                <div className="mt-8">
                  <PackageEnquiryForm
                    packages={formPackages}
                    defaultSlug={pkg.slug}
                    countries={getPhoneCountries()}
                  />
                </div>
              </div>

            </div>

            {/* ── RIGHT: Sticky sidebar (desktop only) ──────────────────── */}
            <aside aria-label="Price and enquiry" className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">

                {/* Pricing card */}
                <PackagePriceCard pkg={pkg} />

              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FinalCta />

      {/* Floating WhatsApp on desktop; bottom bar on phones */}
      <div className="hidden lg:block">
        <FloatingWhatsApp message={whatsappMessage} />
      </div>
      <MobileEnquiryBar
        price={formatMoney(pkg.pricing.usd)}
        priceNote={`Approx. ${formatMoney(pkg.pricing.lkr, "LKR")}`}
        whatsappMessage={whatsappMessage}
      />

      <JsonLd data={touristTripJsonLd} />
      <JsonLd data={faqJsonLd(pkg.faqs)} />
    </>
  );
}
