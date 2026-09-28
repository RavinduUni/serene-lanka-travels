import { Plus, ChevronLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { featuredJourney as f } from "@/data/home";
import Button from "../ui/Button";

export default function FeaturedJourney() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden lg:min-h-[95vh]">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax className="w-full h-full" speed={1.5}>
          <div className="absolute -inset-[15%] h-[130%] w-[130%]">
            <SmartImage
              src={f.image}
              alt="Featured Journey Background"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>
        {/* Gradients to blend top into white and darken bottom for card visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10 flex h-full flex-1 flex-col pb-12 pt-20 lg:pt-28">
        {/* Top Content */}
        <div className="relative mx-auto w-full max-w-4xl text-center">
          {/* Watermark */}
          <span
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[18vw] font-bold lowercase tracking-tighter text-gray-300 lg:text-[160px]"
            style={{ opacity: 0.6, lineHeight: 0.8 }}
            aria-hidden="true"
          >
            {f.watermark}
          </span>

          <div className="relative z-10 mt-16 lg:mt-24">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight text-black lg:text-5xl">
                {f.heading.join(" ")}
              </h2>
            </Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-black/80 sm:text-base">
              {f.copy}
            </p>

            <div className="mt-10 flex justify-center">
              <Button href={f.ctas[0].href} size="lg" variant="white">
                {f.ctas[0].label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-auto flex flex-col items-end justify-between gap-10 pt-24 lg:flex-row lg:pt-32">
          {/* Left: Slider line control */}
          <div className="flex w-full cursor-pointer items-center opacity-80 transition-opacity hover:opacity-100 lg:w-1/2">
            
          </div>

          {/* Right: Tour Card */}
          <Link
            href={f.ctas[0].href}
            className="group relative w-full overflow-hidden rounded-xl bg-black/20 shadow-2xl transition-transform hover:-translate-y-1 lg:w-[460px]"
          >
            <div className="relative h-[240px] w-full lg:h-[280px]">
              <SmartImage
                src={f.image}
                alt={f.cardTitle}
                fill
                sizes="(min-width:1024px) 460px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 text-white lg:p-8">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/90">
                  {f.badge}
                </p>
                <h3 className="flex items-center text-lg font-bold leading-tight lg:text-xl">
                  <span className="line-clamp-2 flex-1">{f.cardTitle}</span>
                  <div className="ml-4 h-[2px] w-12 shrink-0 bg-white" />
                </h3>
                <p className="mt-3 text-sm font-medium text-white/80">
                  {f.duration}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
