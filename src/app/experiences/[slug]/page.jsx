import { notFound } from "next/navigation";
import {
  Dot, CalendarDays, Sparkles,
  Binoculars, Mountain, Waves, Wind, Coffee, Leaf, Car,
  Star, Music, Palette, Fish, Sailboat, UtensilsCrossed, ShoppingBag,
  Zap, Bike, TreePine, Droplets, Train, Brain, PersonStanding, Camera,
  Bird,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PlacesCarousel from "@/components/tours/PlacesCarousel";
import DayTourCard from "@/components/tours/DayTourCard";
import ItineraryCard from "@/components/tours/ItineraryCard";
import DestinationCard from "@/components/destinations/DestinationCard";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import {
  getExperiences,
  getExperienceBySlug,
  getExperienceTours,
  getExperienceDestinations,
} from "@/lib/content";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

/** Prerender every published experience at build time. */
export function generateStaticParams() {
  return getExperiences().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = getExperienceBySlug(slug);
  if (!e) return {};
  return buildMetadata({
    title: e.seoTitle,
    description: e.metaDescription,
    path: `/experiences/${e.slug}`,
    image: e.heroImage,
  });
}

/* ── Icon resolver – maps icon name string in data to a Lucide component ── */
const ICON_MAP = {
  Binoculars, Mountain, Waves, Wind, Coffee, Leaf, Car, Star, Music,
  Palette, Fish, Sailboat, UtensilsCrossed, ShoppingBag, Zap, Bike,
  TreePine, Droplets, Train, Brain, PersonStanding, Camera, Bird, Sparkles,
};

function ActivityIcon({ name }) {
  const Icon = ICON_MAP[name] || Sparkles;
  return <Icon className="size-5 shrink-0 text-brand-blue" aria-hidden="true" />;
}

export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const e = getExperienceBySlug(slug);
  if (!e) notFound();

  const { dayTours, itineraries } = getExperienceTours(e);
  const relatedDestinations = getExperienceDestinations(e, 3);

  const whatsappMessage = `Hi Seren Lanka Travels, I'd love to learn more about ${e.name} experiences in Sri Lanka. Please help me plan a trip.`;

  const activityJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: `${e.name} in Sri Lanka`,
    description: e.metaDescription,
    url: new URL(`/experiences/${e.slug}`, site.url).toString(),
    image: e.heroImage,
    touristType: "International travellers",
  };

  return (
    <>
      {/* ── Hero banner (identical pattern to destinations slug page) ── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/sigiriya.jpg"
          alt="Sri Lanka experiences"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
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
              { label: "Discover Sri Lanka", href: "/discover-sri-lanka" },
              { label: "Experiences", href: "/experiences" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              Sri Lanka{" "}
              <span className="font-light">Experiences</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            From leopard safaris and ancient temples to beach escapes, hill-country hikes and Ayurvedic
            retreats – build your journey around what you love most.
          </p>
        </Container>
      </section>

      {/* ── 1. EXPERIENCE OVERVIEW ──────────────────────────────────── */}
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card rounded-tr-[5rem] rounded-bl-[5rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/4.2] lg:rounded-tr-[8rem] lg:rounded-bl-[8rem]">
                <SmartImage
                  src={e.heroImage}
                  alt={`${e.name} in Sri Lanka`}
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
                  { label: "Experiences", href: "/experiences" },
                  { label: e.name },
                ]}
              />
              <h2 className="mt-4 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-navy sm:text-5xl lg:text-6xl">
                {e.name}
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                {e.intro.map((p) => (
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

      {/* ── 3. BEST LOCATIONS – PlacesCarousel ──────────────────────── */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading lines={["Best", "Locations"]} align="center" className="mx-auto" />
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-brand-muted">
            The places in Sri Lanka where {e.name.toLowerCase()} experiences are at their most rewarding.
          </p>
          <div className="mt-10 lg:mt-12">
            <PlacesCarousel places={e.bestLocations} />
          </div>
        </Container>
      </section>

      {/* ── 6. RELATED DESTINATIONS ─────────────────────────────────── */}
      {relatedDestinations.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <Reveal>
              <SectionHeading lines={["Related", "Destinations"]} />
            </Reveal>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-muted">
              The Sri Lanka destinations where {e.name.toLowerCase()} experiences are most concentrated.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDestinations.map((d) => (
                <li key={d.slug}>
                  <DestinationCard destination={d} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta />
      <FloatingWhatsApp message={whatsappMessage} />
      <JsonLd data={activityJsonLd} />
    </>
  );
}

