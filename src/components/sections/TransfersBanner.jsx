import { Plane, Users } from "lucide-react";
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
    <section className="bg-brand-navy py-20 text-white lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading lines={transfers.heading} light />
            </Reveal>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-white/75 sm:text-base">{transfers.copy}</p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {transfers.services.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold"
                >
                  <Plane className="size-3.5 text-brand-blue" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {transfers.vehicles.map((v) => (
                <li key={v.name} className="flex items-center justify-between gap-4 py-3 text-[14px]">
                  <span className="font-semibold">{v.name}</span>
                  <span className="flex items-center gap-2 text-white/65">
                    <Users className="size-4" aria-hidden="true" />
                    {v.capacity}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={transfers.cta.href} size="lg">
                {transfers.cta.label}
              </Button>
              <WhatsAppButton
                size="lg"
                label="Get a Transfer Quote"
                message={whatsappTemplates.transfer("[Pickup]", "[Drop-off]")}
              />
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-card sm:aspect-5/4 lg:col-span-6 lg:aspect-4/5">
            <SmartImage
              src={transfers.image}
              alt="Private vehicle on an open road"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-5 text-brand-ink backdrop-blur">
              <p className="text-[12px] font-semibold text-brand-muted">Good to know</p>
              <p className="mt-1 text-[14px] leading-relaxed">
                Driver service is limited to 11 hours per day. Night-time driving requires a separate
                booking and arrangement.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
