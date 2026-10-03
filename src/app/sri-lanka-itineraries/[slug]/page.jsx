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
          <li key={item} className="flex items-start gap-2.5 text-[14px] sm:text-base leading-relaxed text-black">
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
    
    // Generate highly detailed fallback points if explicit points aren't provided
    const fallbackPoints = [
      `Arrive in ${name} and settle into your carefully selected accommodation`,
      `Explore the unique landscapes, culture, and iconic sights that make ${name} a must-visit destination`,
      `Enjoy personalized experiences like ${tour.activities?.[0]?.toLowerCase() || 'guided tours'} and ${tour.activities?.[1]?.toLowerCase() || 'local sightseeing'}`,
      `Take advantage of the flexible schedule to discover hidden gems or simply relax and take in the atmosphere`
    ];

    let rawPoints = custom.points?.length ? custom.points : pointsByDestination[name]?.length ? pointsByDestination[name] : fallbackPoints;
    
    // Enhance existing short points to be more detailed
    const points = rawPoints.map(p => {
       if (p.length < 60) {
          if (p.toLowerCase().includes('airport')) return `${p}, where your private driver will warmly welcome you and ensure a seamless transfer.`;
          if (p.toLowerCase().includes('temple')) return `${p}, discovering the rich history and spiritual significance with your knowledgeable guide.`;
          if (p.toLowerCase().includes('safari')) return `${p}, venturing deep into the park to spot majestic wildlife in their natural habitat.`;
          if (p.toLowerCase().includes('beach')) return `${p}, offering the perfect opportunity to unwind by the ocean and enjoy the tropical breeze.`;
          if (p.toLowerCase().includes('drive')) return `${p}, allowing you to take in the breathtaking scenery and stop for photos along the way.`;
          return `${p}, ensuring you have plenty of time to fully experience everything the area has to offer.`;
       }
       return p;
    });

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
  
  // Generate a detailed Day by Day array for tours that don't have one
  const displayDayByDay = hasDays ? tour.dayByDay : tour.destinations.map((dest, i) => ({
    day: i + 1,
    title: i === 0 ? `Arrival · ${dest}` : `${tour.destinations[i - 1]} → ${dest}`,
    points: [
      `Travel comfortably to ${dest} in your private air-conditioned vehicle`,
      `Check in to your selected accommodation and take some time to refresh`,
      `Set out to explore the key highlights of ${dest}, guided by your experienced driver`,
      `Spend the evening at your leisure, enjoying authentic local dining or relaxing at your hotel`
    ]
  }));

  // Enhance existing short points in dayByDay to be more detailed
  const detailedDayByDay = displayDayByDay.map(day => ({
    ...day,
    points: day.points.map(p => {
       if (p.length < 60) {
          if (p.toLowerCase().includes('airport')) return `${p}, where your private driver will warmly welcome you and ensure a seamless transfer.`;
          if (p.toLowerCase().includes('temple')) return `${p}, discovering the rich history and spiritual significance with your knowledgeable guide.`;
          if (p.toLowerCase().includes('safari')) return `${p}, venturing deep into the park to spot majestic wildlife in their natural habitat.`;
          if (p.toLowerCase().includes('beach')) return `${p}, offering the perfect opportunity to unwind by the ocean and enjoy the tropical breeze.`;
          if (p.toLowerCase().includes('drive')) return `${p}, allowing you to take in the breathtaking scenery and stop for photos along the way.`;
          return `${p}, ensuring you have plenty of time to fully experience everything the area has to offer.`;
       }
       return p;
    })
  }));
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
      {/* Hero – full-bleed image with breadcrumbs, title, summary and CTAs overlaid */}
      <section className="relative flex min-h-[62svh] -mt-[76px] lg:-mt-[88px] items-end overflow-hidden bg-brand-navy-deep">
        <Image
          src={tour.heroImage}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative pb-24 pt-36 text-white lg:pb-28">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Itineraries", href: "/sri-lanka-itineraries" },
              { label: tour.name },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {tour.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            {tour.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg">
              Request a Quote
            </Button>
            <WhatsAppButton size="lg" label="WhatsApp Enquiry" message={whatsappMessage} />
          </div>
        </Container>
      </section>

      {/* Intro + highlights */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading lines={["About this", "Itinerary"]} size="sm" />
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                <p>
                  {tour.summary} Designed to offer a seamless and authentic experience, this journey ensures that every detail is taken care of so you can simply relax and enjoy the wonders of Sri Lanka.
                </p>
                <p>
                  Throughout your {tour.duration ? tour.duration.toLowerCase() : "trip"}, you will travel comfortably in a {tour.transportation ? tour.transportation.toLowerCase() : "private vehicle"}. With an {tour.driverGuide ? tour.driverGuide.toLowerCase() : "experienced driver"} handling the logistics, you have the freedom to fully immerse yourself in the experience. Like all our journeys, this is a fully customizable starting point—whether you want to upgrade your accommodation, adjust the pace, or add more time to explore {tour.destinations ? tour.destinations.slice(0, 2).join(" and ") : "the sights"}.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-card bg-brand-sky p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                  Tour highlights
                </h3>
                <ul className="mt-5 space-y-3">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[14px] sm:text-base font-medium leading-relaxed text-brand-ink">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand-blue">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* 7. Day-by-day – mist band like the reference */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Through the journey", "Day by Day"]} size="sm" />
          <div className="mt-6">
            <DayByDay items={detailedDayByDay} />
          </div>
        </Container>
      </section>

      {/* 6, 8, 11, 16. Destinations map + highlights, activities, optional experiences */}
      <section className="py-16 lg:py-24">
        <Container>
          
          {/* 8. Destinations Covered – stacked cards (reference day-card design) */}
          <div>
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
                          <li key={p} className="flex items-start gap-2.5 text-[14px] sm:text-base leading-relaxed text-black">
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

          <div className="grid gap-6 lg:grid-cols-2 pt-12 lg:pt-24">
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
