import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/motion/Reveal";
import VehicleCard from "@/components/transfers/VehicleCard";
import TransferBookingForm from "@/components/forms/TransferBookingForm";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Button from "@/components/ui/Button";
import { getTransferServices, getTransferServiceBySlug, getVehicles } from "@/lib/content";
import { transfersLanding, driverServiceNotes } from "@/data/transfers";
import { whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Private Transfers Across Sri Lanka – Airport, Hotel & City Transfers",
  description:
    "Private airport transfers, hotel pick-up and drop-off, city-to-city transfers and vehicle hire with driver across Sri Lanka – comfortable vehicles, experienced drivers.",
  path: "/transfers",
});

export default function TransfersPage() {
  const services = getTransferServices();
  const vehicles = getVehicles();
  const featured = getTransferServiceBySlug(transfersLanding.featured.slug);
  const rest = services.filter((s) => s.slug !== transfersLanding.featured.slug);
  const whatsappMessage = whatsappTemplates.transfer("[Pickup]", "[Drop-off]");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden bg-brand-navy-deep -mt-[76px] lg:-mt-[88px]">
        <Image
          src={transfersLanding.heroImage}
          alt="Private transfer on an open road in Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.12)_0%,rgba(6,19,59,0.18)_60%,rgba(6,19,59,0.55)_100%)]"
          aria-hidden="true"
        />
      </section>

      {/* ── Intro ── */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              lines={transfersLanding.heading}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.8] text-black sm:text-base">
            {transfersLanding.intro}
          </p>

          {/* Featured transfer card – image left, copy right */}
          {featured && (
            <div className="mt-12 grid overflow-hidden rounded-card bg-white shadow-lift lg:mt-16 lg:grid-cols-12">
              {/* Image */}
              <div className="relative min-h-[260px] lg:col-span-7 lg:min-h-[440px]">
                <SmartImage
                  src={featured.heroImage}
                  alt={featured.name}
                  fill
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5">
                <span className="inline-flex w-fit items-center rounded-full bg-brand-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {transfersLanding.featured.tag}
                </span>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                  {transfersLanding.featured.title}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-black sm:text-[15px]">
                  {transfersLanding.featured.copy}
                </p>

                <div>
                  <Button
                    href={`/transfers/${featured.slug}`}
                    variant="link"
                    className="mt-8 text-[15px]"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                    Explore Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ── Transfer Services Grid ── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              lines={transfersLanding.gridHeading}
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5">
            {rest.map((s) => (
              <Link
                key={s.slug}
                href={`/transfers/${s.slug}`}
                className="group relative aspect-square overflow-hidden rounded-card bg-brand-navy shadow-card sm:aspect-[4/3]"
              >
                {/* Background image – scales up on hover */}
                <SmartImage
                  src={s.heroImage}
                  alt={s.name}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay – slides up from bottom */}
                <div className="absolute inset-0 translate-y-full bg-linear-to-t from-brand-navy-deep/95 via-brand-navy/70 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

                {/* Resting label – hides on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0 sm:p-5">
                  <span className="text-[13px] font-bold uppercase leading-tight tracking-widest text-white sm:text-[15px]">
                    {s.name}
                  </span>
                </div>

                {/* Content – fades + slides in on hover */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-6 flex-col items-start gap-3 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[13px] font-bold uppercase leading-tight tracking-widest text-white sm:text-[15px]">
                    {s.name}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-[12px] font-semibold text-white transition-colors duration-200 group-hover:bg-white group-hover:text-brand-navy sm:text-[13px]">
                    Explore
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>


      {/* ── Booking form ── */}
      <section id="book" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading lines={["Arrange", "Your Transfer"]} />
              <p className="mt-6 text-[15px] leading-[1.8] text-black sm:text-base">
                Send us your pickup, drop-off, date and group size. We confirm the right vehicle and
                a fixed price before you travel – no meter, no surprises.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Fixed price confirmed in advance",
                  "Flight tracking for airport pickups",
                  "Child seats and extra luggage on request",
                  "Direct WhatsApp contact with your driver",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-brand-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand-blue shadow-[0_1px_0_0_#e6eaf1]">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <TransferBookingForm vehicles={vehicles} notes={driverServiceNotes} />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
      <FloatingWhatsApp message={whatsappMessage} />
    </>
  );
}
