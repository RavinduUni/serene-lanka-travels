import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { experiences } from "@/data/home";

export default function ExperienceGrid() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Watercolor leopard illustration – decorative corner accent */}
      <img
        src="/side2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-0 right-0 hidden w-[320px] select-none opacity-90 lg:block xl:w-[480px]"
        style={{ transform: "translateX(12%)" }}
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading lines={experiences.heading} align="center" className="mx-auto" />
        </Reveal>
        <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-brand-muted sm:text-base">
          {experiences.copy}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {experiences.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white transition-shadow hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-brand-navy">{item.label}</h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-brand-muted">{item.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-blue">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Button href={experiences.cta.href} variant="outline" size="lg">
            {experiences.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
