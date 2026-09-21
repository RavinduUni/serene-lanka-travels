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
      <section className="border-y border-brand-line bg-brand-mist py-16 lg:py-24">
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

      {/* 5. Route – sky band (reference route section) */}
      {hasRoute && (
        <section className="border-y border-brand-line bg-brand-sky py-14 lg:py-20">
          <Container>
            <SectionHeading lines={["Here is your", `${tour.name} Route`]} align="center" size="sm" className="mx-auto" />
            <div className="mt-10">
              <RouteStrip stops={tour.route} />
            </div>
          </Container>
        </section>
      )}

      {/* 6 + 7. Highlights and day-by-day – mist band like the reference */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className={hasDays ? "lg:col-span-4" : "lg:col-span-12"}>
              <SectionHeading lines={["Tour", "Highlights"]} size="sm" />
              <ul className={`mt-6 grid gap-3 ${hasDays ? "sm:grid-cols-2 lg:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-[14px] font-semibold text-brand-ink shadow-[0_1px_0_0_#e6eaf1]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-sky text-brand-blue">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              {tour.possibleSightings && (
                <div className="mt-8">
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

            {hasDays && (
              <div className="lg:col-span-8">
                <SectionHeading lines={["Through the journey", "Day by Day"]} size="sm" />
                <div className="mt-6">
                  <DayByDay items={tour.dayByDay} />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 8, 11, 16. Destinations, activities, optional experiences */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-10">
            <SectionHeading lines={["Destinations", "Covered"]} size="sm" />
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {tour.destinations.map((d) => (
                <li key={d} className="flex items-center gap-1.5 rounded-full bg-brand-sky px-4 py-2 text-[14px] font-semibold text-brand-navy">
                  <MapPin className="size-4 text-brand-blue" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
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
