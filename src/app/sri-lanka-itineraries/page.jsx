import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FinalCta from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { whatsappTemplates } from "@/data/site";
import {
  durationFilters,
  itineraryCategories,
  featuredItinerary,
  itineraryUsps,
} from "@/data/itineraries";

export const metadata = buildMetadata({
  title: "Sri Lanka Tours & Itineraries – Private Holidays for Every Style",
  description:
    "Discover private Sri Lanka holidays for different travel styles, interests, durations and budgets. Start with one of our planned itineraries and customize it to make the journey your own.",
  path: "/sri-lanka-itineraries",
});

export default function ItinerariesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-brand-navy-deep -mt-[76px] lg:-mt-[88px]">
        <Image
          src="https://images.unsplash.com/photo-1619531065298-1a34dce6d4c9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Aerial view of Sri Lanka coastline with turquoise ocean and palm trees"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay – lighter at top, darker toward bottom for text legibility */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.18)_0%,rgba(6,19,59,0.22)_55%,rgba(6,19,59,0.62)_100%)]"
          aria-hidden="true"
        />

        {/* Hero text – pinned to bottom left */}
        {/* <div className="absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
          <Container>
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Sri Lanka Itineraries" }]}
              light
            />
            <h1 className="mt-4 max-w-3xl text-[2.1rem] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Sri Lanka Tours &amp;{" "}
              <span className="text-brand-blue">Itineraries</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-white/80 sm:text-base">
              Discover private Sri Lanka holidays for different travel styles,
              interests, durations and budgets.
            </p>
          </Container>
        </div> */}
      </section>

      {/* ── Intro + Featured Card ── */}
      <section className="py-16 lg:py-24">
        <Container>
          {/* Intro copy */}
          <Reveal>
            <SectionHeading
              lines={["Handcrafted Journeys", "Made for You"]}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.8] text-black sm:text-base">
            Start with one of our planned itineraries and customise it to make
            the journey your own. Every tour is private – only your group, your
            pace, your Sri Lanka.
          </p>

          

          {/* Featured itinerary card */}
          <div className="mt-12 grid overflow-hidden rounded-card bg-white shadow-lift lg:mt-16 lg:grid-cols-12">
            {/* Image */}
            <div className="relative min-h-[260px] lg:col-span-7 lg:min-h-[460px]">
              <SmartImage
                src={featuredItinerary.image}
                alt={featuredItinerary.imageAlt}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5">
              <span className="inline-flex w-fit items-center rounded-full bg-brand-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {featuredItinerary.badge}
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                {featuredItinerary.heading}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-black sm:text-[15px]">
                {featuredItinerary.copy}
              </p>
              <div>
                <Button
                  href={featuredItinerary.href}
                  variant="link"
                  className="mt-8 text-[15px]"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                  Explore Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Duration Filters + Category Grid ── */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              lines={["Browse by Travel Style", "Find Your Perfect Tour"]}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-brand-muted sm:text-base">
            Choose a category below, then filter by duration to find an
            itinerary that fits your schedule and interests.
          </p>

          {/* Duration filter chips */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {durationFilters.map((d) => (
              <Link
                key={d.id}
                href={`/sri-lanka-itineraries?duration=${d.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-2.5 text-[13px] font-semibold text-brand-navy shadow-sm transition-all duration-200 hover:border-brand-navy hover:bg-brand-navy hover:text-white sm:text-[14px]"
              >
                
                {d.label}
              </Link>
            ))}
          </div>

          {/* Category grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5">
            {itineraryCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group relative aspect-square overflow-hidden rounded-card bg-brand-navy shadow-card sm:aspect-[4/3]"
              >
                {/* Background image – scales on hover */}
                <SmartImage
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Permanent bottom gradient – always visible */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay – full dark tint slides up from bottom */}
                <div className="absolute inset-0 translate-y-full bg-linear-to-t from-brand-navy-deep/95 via-brand-navy/70 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

                {/* Default state – label pinned to bottom, fades out on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0 sm:p-5">
                  <span className="text-[13px] font-bold uppercase leading-tight tracking-widest text-white sm:text-[15px]">
                    {cat.label}
                  </span>
                </div>

                {/* Hover state – label + Explore button slides up into view */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col items-start gap-3 p-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                  <span className="text-[13px] font-bold uppercase leading-tight tracking-widest text-white sm:text-[15px]">
                    {cat.label}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-[12px] font-semibold text-white transition-colors duration-200 group-hover:bg-white group-hover:text-brand-navy sm:text-[13px]">
                    Explore
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <FinalCta />
    </>
  );
}
