import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { hero } from "@/data/home";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden bg-brand-navy-deep lg:min-h-[calc(100svh-88px)]">
      <Image
        src={'/sigiriya.jpg'}
        alt="Sri Lanka's tropical coastline seen from above"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.35)_0%,rgba(6,19,59,0.25)_45%,rgba(6,19,59,0.7)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative py-24 text-center text-white sm:py-28">
        <h1 className="mx-auto max-w-6xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-white/95 sm:text-xl">{hero.lead}</p>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
          {hero.copy}
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {hero.ctas.map((c) => (
            <Button key={c.label} href={c.href} variant={c.variant} size="lg">
              {c.label}
            </Button>
          ))}
        </div>
      </Container>

      <a
        href="#intro"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[12px] font-medium text-white/80 hover:text-white sm:flex"
        aria-label="Scroll to content"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
