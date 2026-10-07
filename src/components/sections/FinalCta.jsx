import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { finalCta } from "@/data/home";
import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden pb-20 text-white lg:pb-60 pt-10 lg:pt-20">
      {/* Background photo */}
      <Image
        src={'/footer.jpeg'}
        alt="Mirissa beach at golden hour, Sri Lanka"
        fill
        sizes="100vw"
        className="object-cover object-top"
        priority={false}
      />

      {/* Top cloud-mist fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[38%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom cloud-mist fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%]"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 80%)",
        }}
        aria-hidden="true"
      />


      <Container className="relative text-center mb-50 z-20">
        <SectionHeading lines={finalCta.heading} align="center" size="lg" className="mx-auto" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black sm:text-lg">{finalCta.copy}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {finalCta.ctas.map((c) =>
            c.href === "whatsapp" ? (
              <WhatsAppButton key={c.label} label={c.label} size="lg" variant="outline" />
            ) : (
              <Button key={c.label} href={c.href} size="lg" variant="primary">
                {c.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
