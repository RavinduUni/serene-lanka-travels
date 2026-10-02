import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";
import { whatsappTemplates } from "@/data/site";
import Button from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Sri Lanka Day Tours – Private One-Day Experiences",
  description:
    "Private Sri Lanka day tours to Colombo, Kandy, Sigiriya & Dambulla, Galle, Bentota, Ella and Nuwara Eliya – flexible one-day experiences with an English-speaking driver.",
  path: "/day-tours",
});

/** The 7 actual day tours – slugs and images from src/data/day-tours.js */
const tourCategories = [
  {
    label: "Colombo City Tour",
    href: "/day-tours/colombo-city-tour",
    image:
      "https://images.unsplash.com/photo-1653151106233-8e928c21bc1a?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Kandy Day Tour",
    href: "/day-tours/kandy-day-tour",
    image:
      "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Sigiriya & Dambulla Day Tour",
    href: "/day-tours/sigiriya-dambulla-day-tour",
    image:
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Galle & Unawatuna Day Tour",
    href: "/day-tours/galle-unawatuna-day-tour",
    image:
      "/day-tours/galle.jpg",
  },
  {
    label: "Bentota Day Tour",
    href: "/day-tours/bentota-day-tour",
    image:
      "/day-tours/bentota2.jpg",
  },
  {
    label: "Ella Day Tour",
    href: "/day-tours/ella-day-tour",
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Nuwara Eliya Day Tour",
    href: "/day-tours/nuwara-eliya-day-tour",
    image:
      "/day-tours/nuwaraeliya.jpg",
  },
];

export default function DayToursPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden bg-brand-navy-deep -mt-[76px] lg:-mt-[88px]">
         <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.12)_0%,rgba(6,19,59,0.18)_60%,rgba(6,19,59,0.55)_100%)]"
          aria-hidden="true"
        />
        <Image
          src="/day-tours-hero.webp"
          alt="Sri Lanka tropical beach with palm trees and colourful boats"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.12)_0%,rgba(6,19,59,0.18)_60%,rgba(6,19,59,0.55)_100%)]"
          aria-hidden="true"
        />
      </section>

      {/* ── Intro ── */}
      <section className="pt-16 lg:pt-24">
        <Container>
          <Reveal>
            <SectionHeading
              lines={["Seamless Cultural Journeys", "Across Sri Lanka"]}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.8] text-black sm:text-base">
            Explore Sri Lanka with expert guides who bring each destination to life. From ancient
            temples to tropical coastlines, we craft day tours that give you more – real stories,
            flexible timing and insights you can&apos;t find in a guidebook.
          </p>

        </Container>
      </section>

      {/* ── More Tailor-Made Tours Grid ── */}
      <section className="bg-white pb-16 lg:pb-24">
        <Container>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5">
            {tourCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative aspect-square overflow-hidden rounded-card bg-brand-navy shadow-card sm:aspect-[4/3]"
              >
                {/* Background image – scales up on hover */}
                <SmartImage
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay – slides up from bottom */}
                <div className="absolute inset-0 translate-y-full bg-linear-to-t from-black/95 via-black/70 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

                <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0 sm:p-5">
                  <span className="text-[13px] font-bold uppercase leading-tight tracking-widest text-white sm:text-[15px]">
                    {cat.label}
                  </span>
                </div>

                {/* Content – fades + slides in on hover */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
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
