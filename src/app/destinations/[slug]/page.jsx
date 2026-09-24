import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Sparkles, Users, CalendarDays, BedDouble, Car, Compass, MapPin, ArrowRight, Dot } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GalleryGrid from "@/components/shared/GalleryGrid";
import PlacesCarousel from "@/components/tours/PlacesCarousel";
import DayTourCard from "@/components/tours/DayTourCard";
import ItineraryCard from "@/components/tours/ItineraryCard";
import DestinationCard from "@/components/destinations/DestinationCard";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import {
  getDestinations,
  getDestinationBySlug,
  getNearbyDestinations,
  getDestinationTours,
} from "@/lib/content";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import Image from "next/image";

/** Prerender every published destination at build time. */
export function generateStaticParams() {
  return getDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) return {};
  return buildMetadata({
    title: d.seoTitle,
    description: d.metaDescription,
    path: `/destinations/${d.slug}`,
    image: d.heroImage,
  });
}

/** Key-less Google Maps embed centred on the destination. */
function mapEmbedUrl(name) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${name}, Sri Lanka`)}&z=11&output=embed`;
}

function FactRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div>
        <p className="text-[16px] font-semibold text-brand-navy">{label}</p>
        <p className="mt-0.5 text-[14px] leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) notFound();

  const nearby = getNearbyDestinations(d);
  const { dayTours, itineraries } = getDestinationTours(d);
  const whatsappMessage = whatsappTemplates.generic.replace(
    "a trip to Sri Lanka",
    `a trip to ${d.name}, Sri Lanka`
  );

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${d.name}, Sri Lanka`,
    description: d.metaDescription,
    url: new URL(`/destinations/${d.slug}`, site.url).toString(),
    image: d.heroImage,
    touristType: "International travellers",
    includesAttraction: d.attractions.map((a) => ({ "@type": "TouristAttraction", name: a.name })),
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/sigiriya.jpg"
          alt="Sigiriya rock fortress and lush Sri Lanka landscape"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay — same as discover page */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,19,59,0.5) 0%, rgba(6,19,59,0.28) 35%, rgba(6,19,59,0.72) 68%, rgba(6,19,59,0.97) 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Discover Sri Lanka", href: d.parentSlug },
              { label: "Destinations" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              Sri Lanka {" "}
              <span className="font-light">Destinations</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            From ancient cities and sacred temples to tea-covered mountains, national parks and tropical beaches, Sri Lanka offers a remarkable variety of experiences within one island. Explore the places our guests ask for most and where every great itinerary begins.
          </p>
        </Container>
      </section>
      {/* 1. Hero – image left (reference), title + intro right */}
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card rounded-tr-[5rem] rounded-bl-[5rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/4.2] lg:rounded-tr-[8rem] lg:rounded-bl-[8rem]">
                <SmartImage
                  src={d.heroImage}
                  alt={`${d.name}, Sri Lanka`}
                  fill
                  priority
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:pl-4">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Destinations", href: "/destinations" },
                  { label: d.name },
                ]}
              />
              <h1 className="mt-4 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-navy sm:text-5xl lg:text-6xl">
                {d.name}
              </h1>
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                {d.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#tours" size="lg">
                  Explore Tours
                </Button>
                <Button href="/tailor-made-tours/build" variant="outline" size="lg">
                  Tailor-Make a Trip
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Map + "Why visit / Best time / Stay / Getting there" card (reference "Hidden Gems" layout) */}
      <section className="border-y border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-card border border-brand-line bg-brand-sky shadow-card">
                <iframe
                  title={`${d.name} map`}
                  src={mapEmbedUrl(d.name)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[560px]"
                />
              </div>
            </div>
            <div className="lg:col-span-5 lg:-ml-10 lg:self-start lg:pt-10">
              <div className="rounded-card border border-brand-line bg-white p-7 shadow-lift sm:p-9">
                <SectionHeading lines={["Why Visit", d.name]} size="sm" />
                <ul className="mt-6 space-y-3">
                  {d.whyVisit.map((w) => (
                    <li key={w} className="flex items-start text-[15px] leading-relaxed text-brand-ink">
                      <span className="mt-0.5 grid shrink-0 place-items-center ">
                        <Dot aria-hidden="true" />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 grid gap-5 border-t border-brand-line pt-6">
                  <FactRow Icon={CalendarDays} label="Best time to visit" value={d.bestTime} />
                  <FactRow Icon={BedDouble} label="Suggested length of stay" value={d.suggestedStay} />
                  <FactRow Icon={Car} label="Getting there" value={d.gettingThere} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Top attractions – animated showcase */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading lines={["Top", "Attractions"]} align="center" className="mx-auto" />
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-brand-muted">
            The places that define {d.name} – all can be built into a private day or a longer journey.
          </p>
          <div className="mt-10 lg:mt-12">
            <PlacesCarousel places={d.attractions} />
          </div>
        </Container>
      </section>

      {/* 8. Nearby destination cards */}
      {nearby.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <SectionHeading lines={["Explore", "Nearby"]} size="sm" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <DestinationCard destination={n} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta />
      <FloatingWhatsApp message={whatsappMessage} />
      <JsonLd data={placeJsonLd} />
      <JsonLd data={faqJsonLd(d.faqs)} />
    </>
  );
}
