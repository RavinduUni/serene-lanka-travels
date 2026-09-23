import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, Sparkles, MapPin, Compass, Binoculars, Heart, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GalleryGrid from "@/components/shared/GalleryGrid";
import ItineraryFactsCarousel from "@/components/tours/ItineraryFactsCarousel";
import RouteStrip from "@/components/tours/RouteStrip";
import DayByDay from "@/components/tours/DayByDay";
import InclusionsExclusions from "@/components/tours/InclusionsExclusions";
import PriceBlock from "@/components/tours/PriceBlock";
import RelatedItineraries from "@/components/tours/RelatedItineraries";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/seo/JsonLd";
import {
  getItineraries,
  getItineraryBySlug,
  getRelatedItineraries,
  getItineraryCategoryLabel,
} from "@/lib/content";
import { itineraryInclusions, itineraryExclusions, pricingNotice } from "@/data/itineraries";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

/** Prerender every published itinerary at build time. */
export function generateStaticParams() {
  return getItineraries().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getItineraryBySlug(slug);
  if (!tour) return {};
  return buildMetadata({
    title: tour.seoTitle,
    description: tour.metaDescription,
    path: `/sri-lanka-itineraries/${tour.slug}`,
    image: tour.heroImage,
  });
}

/** Small card used for "Things you will do" / "Optional experiences" columns. */
function ListCard({ title, Icon, items }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
      <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-brand-ink">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Google Maps embed for the "Journey Highlights" section (reference design).
 * Tours with a confirmed route get a driving route drawn between the stops;
 * concept tours (no route) show the island with the destinations listed beside it.
 * The key-less legacy embed endpoint is used, so no API key is required.
 */
function mapEmbedUrl(tour) {
  const place = (s) =>
    encodeURIComponent(`${/airport/i.test(s) ? "Bandaranaike International Airport" : s}, Sri Lanka`);
  if (Array.isArray(tour.route) && tour.route.length > 1) {
    const [first, ...rest] = tour.route;
    return `https://maps.google.com/maps?saddr=${place(first)}&daddr=${rest.map(place).join("+to:")}&output=embed`;
  }
  return "https://maps.google.com/maps?q=Sri+Lanka&z=7&output=embed";
}

/**
 * Builds the "Destinations Covered" cards from data that already exists on the tour:
 *  - bullets: `tour.destinationDetails[].points` if provided, else the day-by-day
 *    points of the days that end at that destination, else a short fallback line
 *  - images: `tour.destinationDetails[].images` if provided, else two gallery photos
 * Adding `destinationDetails: [{ name, points: [], images: [] }]` to a tour in
 * itineraries.js overrides both without touching this page.
 */
function buildDestinationCards(tour) {
  const days = Array.isArray(tour.dayByDay) ? tour.dayByDay : [];
  const gallery = tour.gallery || [];
  const details = tour.destinationDetails || [];

  // Assign each day to the LAST destination named in its title ("Kandy → Ella" → Ella)
  const pointsByDestination = {};
  days.forEach((d) => {
    const hit = tour.destinations
      .map((name) => ({ name, pos: d.title.lastIndexOf(name) }))
      .filter((x) => x.pos >= 0)
      .sort((a, b) => b.pos - a.pos)[0];
    if (hit) pointsByDestination[hit.name] = [...(pointsByDestination[hit.name] || []), ...d.points];
  });

  return tour.destinations.map((name, i) => {
    const custom = details.find((d) => d.name === name) || {};
    const points =
      custom.points?.length
        ? custom.points
        : pointsByDestination[name]?.length
          ? pointsByDestination[name]
          : [`Included in your tailor-made ${tour.name} – tell us how many nights you'd like here.`];
    const images =
      custom.images?.length
        ? custom.images.slice(0, 2)
        : gallery.length
          ? [gallery[(i * 2) % gallery.length], gallery[(i * 2 + 1) % gallery.length]]
          : [];
    return { name, points, images };
  });
}

export default async function ItineraryPage({ params }) {
  const { slug } = await params;
  const tour = getItineraryBySlug(slug);
  if (!tour) notFound();

  const related = getRelatedItineraries(tour);
  const hasRoute = Array.isArray(tour.route) && tour.route.length > 1;
  const hasDays = Array.isArray(tour.dayByDay) && tour.dayByDay.length > 0;
  const faqs = tour.faqs || [];
  const whatsappMessage = whatsappTemplates.tour(tour.name);

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.metaDescription,
    url: new URL(`/sri-lanka-itineraries/${tour.slug}`, site.url).toString(),
    touristType: "International travellers",
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    ...(hasRoute
      ? {
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.route.map((stop, i) => ({ "@type": "ListItem", position: i + 1, name: stop })),
        },
      }
      : {}),
  };

  return (
    <>
      {/* 3. Hero image band (reference: full-bleed photo, title block below) */}
      <section className="relative h-[52svh] min-h-[340px] overflow-hidden bg-brand-navy-deep lg:h-[60svh] -mt-[76px] lg:-mt-[88px]">
        <Image src={tour.heroImage} alt={tour.name} fill priority sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.45)_0%,rgba(6,19,59,0)_45%,rgba(6,19,59,0.35)_100%)]"
          aria-hidden="true"
        />
      </section>

      {/* 1, 2, 4. Title, duration, summary – centered like the reference */}
      <section className="py-14 lg:py-20">
        <Container className="text-center">
          <h1 className="heading-split mx-auto mt-5 max-w-4xl text-[2.25rem] sm:text-5xl lg:text-6xl">
            {tour.tagline}
            <strong>{tour.name}</strong>
          </h1>
          <p className="mx-auto mt-6 flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-navy">
            <span className="h-px w-10 bg-brand-blue" aria-hidden="true" />
            {tour.duration}
            <span className="h-px w-10 bg-brand-blue" aria-hidden="true" />
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-[1.85] text-black sm:text-base">
            {tour.summary}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/tailor-made-tours/build" size="lg">
              {tour.cta || "Customize This Tour"}
            </Button>
            <Button href="#quote" variant="outline" size="lg">
              Request a Quote
            </Button>
          </div>
        </Container>
      </section>

      {/* 2, 9–13. Tour at a glance */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Tour at", "a Glance"]} align="center" className="mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-black">
            Everything you need to know before you go — tap through each fact below.
          </p>
          <div className="mt-10 lg:mt-12">
            <ItineraryFactsCarousel tour={tour} />
          </div>
        </Container>
      </section>


      {/* 7. Day-by-day – mist band like the reference (highlights moved to the map section below) */}
      {hasDays && (
        <section className="bg-brand-mist py-16 lg:py-24">
          <Container>
            <SectionHeading lines={["Through the journey", "Day by Day"]} size="sm" />
            <div className="mt-6">
              <DayByDay items={tour.dayByDay} />
            </div>
          </Container>
        </section>
      )}

      {/* 6, 8, 11, 16. Destinations map + highlights, activities, optional experiences */}
      <section className="py-16 lg:py-24">
        <Container>
          {/* 6 + 8. Destinations map with the Journey Highlights card overlapping it (reference design) */}
          <div className="mb-12 grid items-center gap-6 lg:mb-16 lg:grid-cols-12 lg:gap-0">
            {/* Map */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-card border border-brand-line bg-brand-sky shadow-card">
                <iframe
                  title={`${tour.name} – destinations map`}
                  src={mapEmbedUrl(tour)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[520px]"
                />
              </div>
            </div>

            {/* Journey Highlights card – overlaps the map on desktop */}
            <div className="lg:col-span-5 lg:-ml-10 lg:self-start lg:pt-10">
              <div className="rounded-card border border-brand-line bg-white p-7 shadow-lift sm:p-9">
                <SectionHeading lines={["Journey", "Highlights"]} size="sm" />
                <ul className="mt-6 space-y-3.5">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[15px] leading-relaxed text-brand-ink">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-sky text-brand-blue">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                {tour.possibleSightings && (
                  <div className="mt-7 border-t border-brand-line pt-6">
                    <h3 className="flex items-center gap-2 text-[15px] font-bold text-brand-navy">
                      <Binoculars className="size-4 text-brand-blue" aria-hidden="true" />
                      Possible sightings
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {tour.possibleSightings.map((s) => (
                        <li key={s} className="rounded-full border border-brand-line bg-white px-3 py-1 text-[13px] font-semibold text-brand-ink">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* 8. Destinations Covered – stacked cards (reference day-card design) */}
          <div className="py-16 lg:py-24">
            <SectionHeading lines={["Destinations", "Covered"]} size="sm" />
            <ol className="mt-8 space-y-8">
              {buildDestinationCards(tour).map((d, i) => (
                <li
                  key={d.name}
                  className="relative rounded-2xl border border-brand-line bg-white p-6 pt-8 shadow-card sm:p-8 sm:pl-14"
                >
                  {/* Numbered badge overlapping the card corner */}
                  <span
                    className="absolute -left-3 -top-4 flex size-14 sm:size-16 flex-col items-center justify-center rounded-full bg-brand-blue text-white shadow-[0_10px_24px_-10px_rgba(26,140,255,0.8)] sm:-left-5 sm:-top-5 sm:size-20"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] font-semibold uppercase leading-none tracking-wide text-white/80 sm:text-[11px]">
                      Stop
                    </span>
                    <span className="mt-0.5 text-xl font-bold leading-none sm:text-2xl">{i + 1}</span>
                  </span>

                  <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <div className="lg:col-span-6">
                      <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-navy sm:text-[1.75rem]">
                        <MapPin className="size-5 shrink-0 text-brand-blue" aria-hidden="true" />
                        <span className="sr-only">Stop {i + 1}: </span>
                        {d.name}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {d.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-brand-ink">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {d.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:gap-4">
                        {d.images.map((src, j) => (
                          <div key={`${src}-${j}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-navy">
                            <SmartImage
                              src={src}
                              alt={`${d.name}, Sri Lanka`}
                              fill
                              sizes="(min-width:1024px) 22vw, 45vw"
                              className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ListCard title="Things you will do" Icon={Sparkles} items={tour.activities} />
            <ListCard title="Optional experiences" Icon={Star} items={tour.optionalExperiences} />
          </div>
        </Container>
      </section>

      {/* 14 + 15. Inclusions / exclusions */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading lines={["Inclusions &", "Exclusions"]} size="sm" />
          <div className="mt-8">
            <InclusionsExclusions inclusions={itineraryInclusions} exclusions={itineraryExclusions} />
          </div>
        </Container>
      </section>

      {/* 17. Pricing */}
      <PriceBlock tour={tour} notice={pricingNotice} whatsappMessage={whatsappTemplates.customize(tour.name)} image={tour.heroImage} />

      {/* 18. Gallery */}
      <section className="border-t border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Visual", "Journeys"]} align="center" size="sm" className="mx-auto" />
          <div className="mt-10">
            <GalleryGrid images={tour.gallery} alt={`${tour.name} – Sri Lanka`} />
          </div>
        </Container>
      </section>

      {/* 19. FAQ + quote form (reference "Everything you need to know") */}
      <section id="quote" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="relative mb-8 hidden aspect-[16/9] overflow-hidden rounded-card lg:block">
                <SmartImage src={tour.gallery?.[1] || tour.heroImage} alt="" fill sizes="45vw" className="object-cover" />
              </div>
              <SectionHeading lines={["Everything", "You Need to Know"]} size="sm" />
              <div className="mt-6 rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
                <Accordion items={faqs} />
              </div>
            </div>
            <div className="lg:col-span-6">
              <QuoteForm tourName={tour.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* 20. Related tours */}
      <section className="border-t border-brand-line py-16 lg:py-24">
        <Container>
          <RelatedItineraries tours={related} />
        </Container>
      </section>

      <FinalCta />

      <FloatingWhatsApp message={whatsappMessage} />
      <JsonLd data={touristTripJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
