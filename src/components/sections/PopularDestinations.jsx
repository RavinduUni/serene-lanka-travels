import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { destinations } from "@/data/home";
import Image from "next/image";
import Button from "../ui/Button";

export default function PopularDestinations() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden lg:min-h-[95vh] py-20 lg:py-28">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax className="w-full h-full" speed={1.5}>
          <div className="absolute -inset-[15%] h-[130%] w-[130%]">
            <Image
              src={"/destinations-bg.jpg"}
              alt="Popular Destinations Background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </Parallax>
        {/* Gradients to blend top into white and darken bottom for card visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10 flex h-full flex-1 flex-col pt-20 lg:pt-28">
        {/* Top Content */}
        <div className="relative mx-auto w-full max-w-4xl text-center">
          {/* Watermark */}
          <span
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[18vw] font-bold lowercase tracking-tighter text-brand-blue/50 lg:text-[160px]"
            style={{ opacity: 0.6, lineHeight: 0.8 }}
            aria-hidden="true"
          >
            {destinations.watermark || "destinations"}
          </span>

          <div className="relative z-10 mt-16 lg:mt-24">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight text-black lg:text-5xl">
                {destinations.heading.join(" ")}
              </h2>
            </Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-black/80 sm:text-base">
              {destinations.copy}
            </p>

            <div className="mt-10 flex justify-center">
              <Button href={destinations.cta.href} size="lg" variant="outline">
                {destinations.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Content - The Original 8 Cards */}
        <div className="mt-auto flex w-full flex-col pt-24 lg:pt-32">
          <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 w-full">
            {destinations.items.map((d) => (
              <li key={d.name}>
                <Link
                  href={d.href}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-brand-navy shadow-xl transition-transform sm:aspect-[3/4]"
                >
                  {/* Photo — scales on hover */}
                  <SmartImage
                    src={d.image}
                    alt={`${d.name}, Sri Lanka`}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Permanent bottom gradient (name + tag always visible) */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_65%,rgba(0,0,0,0.92)_100%)]"
                    aria-hidden="true"
                  />

                  {/* Hover overlay — full dark tint that fades in */}
                  <div
                    className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Default state: name + tag pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2 sm:p-5">
                    <p className="text-lg font-bold leading-tight sm:text-xl">{d.name}</p>
                    <p className="mt-1 text-[12px] font-medium text-white/75 sm:text-[13px]">{d.tag}</p>
                  </div>

                  {/* Hover state: centred overlay content that rises into view */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {/* Destination name */}
                    <p className="text-2xl font-bold text-white sm:text-3xl">{d.name}</p>
                    {/* Description blurb */}
                    {d.blurb && (
                      <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                        {d.blurb}
                      </p>
                    )}
                    {/* Explore CTA */}
                    <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-brand-navy transition-transform duration-300 group-hover:scale-105">
                      Explore
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
