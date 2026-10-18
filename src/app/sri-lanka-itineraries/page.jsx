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
  title: "Sri Lanka Tour Packages & Itineraries | Seren Lanka",
  rawTitle: true,
  description:
    "Explore Sri Lanka tour packages and themed itineraries, including cultural, wildlife, beach, family and honeymoon travel. Find a journey that fits your plans.",
  path: "/sri-lanka-itineraries",
});

export default function ItinerariesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden py-24 lg:py-32">
        <Image
          src="/itineraries/hero/popular.png"
          alt="Aerial view of Sri Lanka coastline with turquoise ocean and palm trees"
          fill
          priority
          className="object-cover object-bottom"
        />
        {/* Gradient overlay – lighter at top, darker toward bottom for text legibility */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sri Lanka Itineraries" }]} light />
          <Reveal>
          <h1 className="mt-6 max-w-4xl text-[2.1rem] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sri Lanka Tour Packages{" "}
            <span className="text-white">& Itineraries</span>
          </h1>
          </Reveal>
          <Reveal>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/80 sm:text-base">
            Find a Sri Lanka itinerary that matches the experiences you want, whether you prefer heritage sites, wildlife, coastal stays or a mix of destinations. Browse our themed tours to compare routes and discover the places featured in each journey.
          </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Duration Filters + Category Grid ── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          {/* Category grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
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
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay – full dark tint slides up from bottom */}
                <div className="absolute inset-0 translate-y-full bg-linear-to-t from-black/95 via-black/70 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

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
