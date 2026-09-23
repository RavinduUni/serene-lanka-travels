import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, Sparkles, Backpack, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import QuickFacts from "@/components/tours/QuickFacts";
import PlacesCarousel from "@/components/tours/PlacesCarousel";
import InclusionsExclusions from "@/components/tours/InclusionsExclusions";
import RelatedTours from "@/components/tours/RelatedTours";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/seo/JsonLd";
import { getDayTours, getDayTourBySlug, getRelatedDayTours } from "@/lib/content";
import { standardInclusions, standardExclusions } from "@/data/day-tours";
import { whatsappTemplates, site } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

/** Prerender all published day tours at build time. */
export function generateStaticParams() {
  return getDayTours().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getDayTourBySlug(slug);
  if (!tour) return {};
  return buildMetadata({
    title: tour.seoTitle,
    description: tour.metaDescription,
    path: `/day-tours/${tour.slug}`,
    image: tour.heroImage,
  });
}

export default async function DayTourPage({ params }) {
  const { slug } = await params;
  const tour = getDayTourBySlug(slug);
  if (!tour) notFound();

  const related = getRelatedDayTours(tour);
  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.metaDescription,
    url: new URL(`/day-tours/${tour.slug}`, site.url).toString(),
    touristType: "International travellers",
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.places.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
      })),
    },
  };

  return (
    <>
      {/* Hero */}
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.45)_0%,rgba(6,19,59,0.15)_40%,rgba(6,19,59,0.85)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative pb-24 pt-36 text-white lg:pb-28">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Day Tours", href: "/day-tours" },
              { label: tour.name },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {tour.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            {tour.shortDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg">
              Request a Quote
            </Button>
            <WhatsAppButton size="lg" label="WhatsApp Enquiry" message={whatsappTemplates.tour(tour.name)} />
          </div>
        </Container>
      </section>


      {/* Intro + highlights */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading lines={["About this", "Day Tour"]} size="sm" />
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                {tour.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-card bg-brand-sky p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                  Tour highlights
                </h3>
                <ul className="mt-5 space-y-3">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[14px] font-medium leading-relaxed text-brand-ink">
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

      {/* Places you will visit – animated showcase */}
      <section className="border-y border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Places", "You Will Visit"]} align="center" className="mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-black">
            The stops that shape this day. The order and timing are planned around traffic, weather
            and your interests.
          </p>
          <div className="mt-10 lg:mt-12">
            <PlacesCarousel places={tour.places} />
          </div>
        </Container>
      </section>

      {/* Activities + what to bring + suitability */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                Things you will do
              </h3>
              <ul className="mt-4 space-y-2.5">
                {tour.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-brand-ink">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                What to bring
              </h3>
              <ul className="mt-4 space-y-2.5">
                {tour.whatToBring.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-brand-ink">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                Who it suits
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-brand-ink">{tour.suitability}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Inclusions / exclusions */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading lines={["Inclusions &", "Exclusions"]} size="sm" />
          <div className="mt-8">
            <InclusionsExclusions inclusions={standardInclusions} exclusions={standardExclusions} />
          </div>
        </Container>
      </section>

      {/* FAQ + quote form */}
      <section id="quote" className="scroll-mt-24 border-t border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading lines={["Frequently Asked", "Questions"]} size="sm" />
              <div className="mt-8 rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
                <Accordion items={tour.faqs} />
              </div>
            </div>
            <div className="lg:col-span-6">
              <QuoteForm tourName={tour.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* Related tours */}
      <section className="py-16 lg:py-24">
        <Container>
          <RelatedTours tours={related} />
        </Container>
      </section>

      <FloatingWhatsApp message={whatsappTemplates.tour(tour.name)} />
      <JsonLd data={touristTripJsonLd} />
      <JsonLd data={faqJsonLd(tour.faqs)} />

      <FinalCta />
    </>
  );
}
