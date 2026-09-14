import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { intro } from "@/data/home";

export default function IntroSection() {
  return (
    <section id="intro" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading lines={intro.heading} align="center" className="mx-auto max-w-3xl" />
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Left image – slightly raised, like the reference */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card sm:aspect-[16/9] lg:col-span-3 lg:aspect-[4/5] lg:-mt-10">
            <SmartImage
              src={intro.images[0]}
              alt="Mist over Sri Lanka's central highlands"
              fill
              sizes="(min-width:1024px) 25vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:px-6">
            <p className="text-[15px] leading-[1.8] text-brand-muted sm:text-base">{intro.copy}</p>
            <ul className="mt-7 space-y-3">
              {intro.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-brand-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-sky text-brand-blue">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Button href={intro.cta.href} variant="link" className="mt-8 text-[15px]">
              <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              {intro.cta.label}
            </Button>
          </div>

          {/* Right image – sits lower */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card sm:aspect-[16/9] lg:col-span-3 lg:aspect-[4/5] lg:mt-10">
            <SmartImage
              src={intro.images[1]}
              alt="Palm-lined beach on Sri Lanka's south coast"
              fill
              sizes="(min-width:1024px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
