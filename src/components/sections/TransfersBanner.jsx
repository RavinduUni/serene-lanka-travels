import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Reveal from "@/components/motion/Reveal";
import { transfers } from "@/data/home";
import { whatsappTemplates } from "@/data/site";

export default function TransfersBanner() {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: curved image ── */}
          <Reveal className="flex items-center justify-center">
            {/*
              The "curved / blob" look from the reference image:
              We use a very large border-radius on one side so the image
              looks like a rounded shape that bleeds off the left edge.
            */}
            <div
              className="relative w-full overflow-hidden shadow-lift"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "40% 40% 40% 50% / 40% 30% 50% 40%",
              }}
            >
              <SmartImage
                src={transfers.image}
                alt="Private vehicle driving through scenic Sri Lanka roads"
                fill
                sizes="(min-width:1024px) 45vw, 90vw"
                className="object-cover object-center scale-110"
              />
            </div>
          </Reveal>

          {/* ── Right: content ── */}
          <div>
            <Reveal>
              <SectionHeading lines={transfers.heading} />
            </Reveal>

            <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-brand-muted sm:text-base">
              {transfers.copy}
            </p>

            {/* Service chips */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {transfers.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-brand-line bg-brand-sky px-3.5 py-1.5 text-[13px] font-semibold text-brand-navy"
                >
                  {s}
                </li>
              ))}
            </ul>

            {/* Vehicle list */}
            <ul className="mt-7 divide-y divide-brand-line border-y border-brand-line">
              {transfers.vehicles.map((v) => (
                <li
                  key={v.name}
                  className="flex items-center justify-between gap-4 py-3 text-[14px]"
                >
                  <span className="font-semibold text-brand-navy">{v.name}</span>
                  <span className="text-brand-muted">{v.capacity}</span>
                </li>
              ))}
            </ul>

            {/* CTAs – matching reference style: filled primary + whatsapp pill */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={transfers.cta.href} size="lg" variant="primary">
                {transfers.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <WhatsAppButton
                size="lg"
                label="Get a Transfer Quote"
                message={whatsappTemplates.transfer("[Pickup]", "[Drop-off]")}
                variant="outline"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
