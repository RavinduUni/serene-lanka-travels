import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { finalCta } from "@/data/home";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 text-white lg:py-28">
      {/* Background photo */}
      <Image
        src={finalCta.image}
        alt="Mirissa beach at golden hour, Sri Lanka"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />

      {/* Multi-layer overlay: deep navy at bottom, brand blue tint overall */}
      <div
        className="absolute inset-0 bg-[linear-gradient(160deg,rgba(11,31,92,0.72)_0%,rgba(11,31,92,0.55)_50%,rgba(6,19,59,0.82)_100%)]"
        aria-hidden="true"
      />

      {/* Soft glow orbs (kept from original design) */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full bg-brand-blue/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 size-[420px] rounded-full bg-brand-navy/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <SectionHeading lines={finalCta.heading} align="center" size="lg" light className="mx-auto" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{finalCta.copy}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {finalCta.ctas.map((c) =>
            c.href === "whatsapp" ? (
              <WhatsAppButton key={c.label} label={c.label} size="lg" variant="white" />
            ) : (
              <Button key={c.label} href={c.href} variant="navy" size="lg">
                {c.label}
              </Button>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
