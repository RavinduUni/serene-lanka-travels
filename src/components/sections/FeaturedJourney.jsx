import { Clock, MoveRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { featuredJourney as f } from "@/data/home";

export default function FeaturedJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Watermark word behind the heading (reference style) */}
      <span className="watermark top-6 lg:top-4" aria-hidden="true">
        {f.watermark}
      </span>

      <Container className="relative">
        <Reveal>
          <SectionHeading lines={f.heading} align="center" className="mx-auto" />
        </Reveal>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-brand-muted sm:text-base">
          {f.copy}
        </p>

        <div className="mt-12 grid overflow-hidden rounded-card bg-white shadow-lift lg:mt-16 lg:grid-cols-12">
          {/* Image */}
          <div className="relative min-h-[300px] lg:col-span-7 lg:min-h-[520px]">
            <SmartImage
              src={f.image}
              alt="Sunrise over the mountains of central Sri Lanka"
              fill
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-brand-blue px-4 py-1.5 text-[12px] font-bold text-white shadow-card">
              {f.badge}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
              <Clock className="size-4" aria-hidden="true" />
              {f.duration}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
              {f.cardTitle}
            </h3>

            {/* Route */}
            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[14px] font-semibold text-brand-ink">
              {f.route.map((stop, i) => (
                <li key={stop} className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-sky px-3 py-1">{stop}</span>
                  {i < f.route.length - 1 && (
                    <MoveRight className="size-4 text-brand-muted" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>

            {/* Highlights */}
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-brand-muted sm:grid-cols-3">
              {f.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {f.ctas.map((c) => (
                <Button key={c.label} href={c.href} variant={c.variant}>
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
