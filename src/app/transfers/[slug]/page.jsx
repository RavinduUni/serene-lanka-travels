import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, ListChecks, Info, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PlacesCarousel from "@/components/tours/PlacesCarousel";
import InclusionsExclusions from "@/components/tours/InclusionsExclusions";
import TransferServiceCard from "@/components/transfers/TransferServiceCard";
import TransferBookingForm from "@/components/forms/TransferBookingForm";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import {
  getTransferServices,
  getTransferServiceBySlug,
  getRelatedTransferServices,
  getVehicles,
} from "@/lib/content";
import { transferInclusions, transferExclusions, driverServiceNotes } from "@/data/transfers";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

/** Prerender the five service pages at build time. */
export function generateStaticParams() {
  return getTransferServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getTransferServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/transfers/${service.slug}`,
    image: service.heroImage,
  });
}

/** Small info card – same style as the day-tour "Things you will do" cards. */
function InfoCard({ title, Icon, items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
      <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
        {title}
      </h3>
      <Tag className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-brand-ink">
            {ordered ? (
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-sky text-[11px] font-bold text-brand-blue">
                {i + 1}
              </span>
            ) : (
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
            )}
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}

export default async function TransferServicePage({ params }) {
  const { slug } = await params;
  const service = getTransferServiceBySlug(slug);
  if (!service) notFound();

  const vehicles = getVehicles();
  const related = getRelatedTransferServices(service);
  const whatsappMessage = whatsappTemplates.transfer("[Pickup]", "[Drop-off]");

  // Vehicles rendered with the same animated showcase used on Day Tour pages
  const vehicleSlides = vehicles.map((v) => ({
    name: v.name,
    image: v.image,
    blurb: `${v.capacityLabel} · ${v.luggage}. ${v.blurb}`,
  }));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} – ${site.name}`,
    description: service.metaDescription,
    url: new URL(`/transfers/${service.slug}`, site.url).toString(),
    areaServed: "LK",
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
  };

  return (
    <>
      {/* Hero – matches Day Tour detail exactly */}
      <section className="relative flex min-h-[62svh] -mt-[76px] lg:-mt-[88px] items-end overflow-hidden bg-brand-navy-deep">
        <Image src={service.heroImage} alt={service.name} fill priority sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.45)_0%,rgba(6,19,59,0.15)_40%,rgba(6,19,59,0.85)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative pb-24 pt-36 text-white lg:pb-28">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Transfers", href: "/transfers" },
              { label: service.name },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            {service.shortDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#book" size="lg">
              Request a Quote
            </Button>
            <WhatsAppButton size="lg" label="WhatsApp Enquiry" message={whatsappMessage} />
          </div>
        </Container>
      </section>

      {/* About + highlights */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading lines={["About this", "Service"]} size="sm" />
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                {service.intro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-card bg-brand-sky p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                  Service highlights
                </h3>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[14px] font-medium leading-relaxed text-brand-ink">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand-blue">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vehicles – animated showcase (same component as "Places You Will Visit") */}
      <section className="border-y border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Vehicles", "For This Service"]} align="center" className="mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-black">
            Choose by group size and luggage. Rates change by season and are confirmed in your quotation.
          </p>
          <div className="mt-10 lg:mt-12">
            <PlacesCarousel places={vehicleSlides} />
          </div>
        </Container>
      </section>

      {/* How it works / Good to know / Who it suits */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoCard title="How it works" Icon={ListChecks} items={service.howItWorks} ordered />
            <InfoCard title="Good to know" Icon={Info} items={service.goodToKnow} />
            <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                Who it suits
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-brand-ink">{service.suitability}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Inclusions / exclusions */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading lines={["Inclusions &", "Exclusions"]} size="sm" />
          <div className="mt-8">
            <InclusionsExclusions inclusions={transferInclusions} exclusions={transferExclusions} />
          </div>
        </Container>
      </section>

      {/* FAQ + booking form – same equal 6/6 split as day-tours */}
      <section id="book" className="scroll-mt-24 border-t border-brand-line bg-brand-mist py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading lines={["Frequently Asked", "Questions"]} size="sm" />
              <div className="mt-8 rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
                <Accordion items={service.faqs} />
              </div>
            </div>
            <div className="lg:col-span-6">
              <TransferBookingForm vehicles={vehicles} notes={driverServiceNotes} serviceName={service.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["You may also need", "these Transfers"]} size="sm" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <TransferServiceCard service={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
      <FloatingWhatsApp message={whatsappMessage} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd(service.faqs)} />
    </>
  );
}
