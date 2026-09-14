import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { builderPromo } from "@/data/home";

export default function BuilderPromo() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading lines={builderPromo.heading} />
            </Reveal>
            <p className="mt-6 text-[15px] leading-[1.8] text-brand-muted sm:text-base">{builderPromo.copy}</p>

            {/* The builder is a real sequence, so numbering is meaningful here */}
            <ol className="mt-8 space-y-3">
              {builderPromo.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-sky text-[13px] font-bold text-brand-blue">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-semibold text-brand-ink">{s}</span>
                </li>
              ))}
            </ol>

            <Button href={builderPromo.cta.href} size="lg" className="mt-10">
              {builderPromo.cta.label}
            </Button>
          </div>

          {/* Image collage */}
          <div className="relative grid grid-cols-12 gap-4 lg:col-span-7 lg:pl-8">
            <div className="relative col-span-7 aspect-[4/5] overflow-hidden rounded-card shadow-card">
              <SmartImage
                src={builderPromo.images[0]}
                alt="Waterfall in Sri Lanka's hill country"
                fill
                sizes="(min-width:1024px) 35vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-5 mt-16 aspect-[4/5] overflow-hidden rounded-card shadow-card">
              <SmartImage
                src={builderPromo.images[1]}
                alt="Surfer on a Sri Lankan wave"
                fill
                sizes="(min-width:1024px) 25vw, 40vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute -left-2 bottom-8 hidden rounded-2xl bg-white p-5 shadow-lift lg:block"
              aria-hidden="true"
            >
              <p className="text-[12px] font-semibold text-brand-muted">Estimated in seconds</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-brand-navy">
                from <span className="text-brand-blue">USD 35</span>
                <span className="text-sm font-semibold text-brand-muted"> / person / day</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
