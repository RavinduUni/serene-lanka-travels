import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { destinations } from "@/data/home";

export default function PopularDestinations() {
  return (
    <section className="border-t border-brand-line py-20 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading lines={destinations.heading} />
          </Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-brand-muted lg:col-span-4">{destinations.copy}</p>
          <div className="lg:col-span-3 lg:text-right">
            <Button href={destinations.cta.href} variant="link" className="text-[15px]">
              <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              {destinations.cta.label}
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {destinations.items.map((d) => (
            <li key={d.name}>
              <Link
                href={d.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-brand-navy sm:aspect-[3/4]"
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
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay — full dark tint that fades in */}
                <div
                  className="absolute inset-0 bg-brand-navy-deep/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
      </Container>
    </section>
  );
}
