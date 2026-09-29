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
        src={'/finalCTA2.png'}
        alt="Mirissa beach at golden hour, Sri Lanka"
        fill
        sizes="100vw"
        className="object-cover object-bottom"
        priority={false}
      />
      

      <Container className="relative text-center mb-50">
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
