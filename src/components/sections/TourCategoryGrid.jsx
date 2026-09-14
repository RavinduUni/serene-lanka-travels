import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { tourCategories } from "@/data/home";

export default function TourCategoryGrid() {
  return (
    <section className="bg-brand-sky py-20 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading lines={tourCategories.heading} />
          </Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-brand-muted lg:col-span-5">{tourCategories.copy}</p>
          <div className="lg:col-span-3 lg:text-right">
            <Button href={tourCategories.cta.href} variant="link" className="text-[15px]">
              <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              {tourCategories.cta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Horizontal rail – scrolls on all sizes, snaps per card */}
      <div className="rail mt-12 overflow-x-auto pb-4">
        <ul className="mx-auto flex w-max snap-x snap-mandatory gap-5 px-5 sm:px-8 lg:max-w-7xl lg:px-12">
          {tourCategories.items.map((item) => (
            <li key={item.label} className="w-[260px] shrink-0 snap-start sm:w-[290px]">
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-card bg-brand-navy shadow-card"
              >
                <SmartImage
                  src={item.image}
                  alt=""
                  fill
                  sizes="290px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.85)_100%)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                  <span className="text-lg font-bold leading-tight">{item.label}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-brand-blue">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
