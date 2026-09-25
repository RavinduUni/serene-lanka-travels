import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { hero } from "@/data/home";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-navy-deep -mt-[76px] lg:-mt-[88px]">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Dark gradient overlay for text legibility */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.45)_0%,rgba(6,19,59,0.25)_45%,rgba(6,19,59,0.75)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative py-24 text-center text-white sm:py-28 lg:py-36">
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
    </section>
  );
}
