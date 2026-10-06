import Image from "next/image";
import { ClipboardList, Route, MessageCircle, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import TourEnquiryForm from "@/components/forms/tour-enquiry/TourEnquiryForm";
import { getItineraryBySlug, getDayTourBySlug } from "@/lib/content";
import { getPhoneCountries } from "@/lib/phone-countries";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { COPY, SIDE_STEPS, DESTINATION_OPTIONS } from "@/data/tour-enquiry";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "Customize Your Sri Lanka Tour",
  description:
    "Tell us the basics, or share as much detail as you like. Our travel team will create a personalized private Sri Lanka itinerary around your dates, interests and budget.",
  path: "/tailor-made-tours",
});

const STEP_ICONS = ['/whychooseus/01-share-your-plans.svg', '/whychooseus/02-tailored-itinerary.svg', '/whychooseus/03-refine-with-our-team.svg'];

/**
 * Optional prefill from "Customize This Tour" buttons: /tailor-made-tours?tour=<slug>
 * works with any itinerary or day-tour slug. Unknown slugs are ignored.
 */
function prefillFromTour(slug) {
  if (typeof slug !== "string" || !slug) return undefined;
  const tour = getItineraryBySlug(slug) || getDayTourBySlug(slug);
  if (!tour) return undefined;
  const names = tour.destinations || (tour.quickFacts?.destinations || "").split("·");
  const destinations = DESTINATION_OPTIONS.filter((o) =>
    names.some((n) => n.trim().toLowerCase() === o.label.toLowerCase())
  ).map((o) => o.id);
  return {
    destinations,
    special_requests: `I would like to customize the "${tour.name}" tour.`,
  };
}

export default async function TailorMadeToursPage({ searchParams }) {
  const params = await searchParams;
  const prefill = prefillFromTour(params?.tour);
  const countries = getPhoneCountries();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/whychooseus/tailor-made.png"
          alt="Plan your tailor-made Sri Lanka tour with Seren Lanka Travels"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tailor-Made Tours" }]} light />
          <Reveal>
            <h1 className="mt-4 max-w-3xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              {COPY.h1[0]}{" "}
              <span className="font-light">{COPY.h1[1]}</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            {COPY.intro}
          </p>
        </Container>
      </section>

      {/* ── Main content: side panel left + form right ─────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">

            {/* ── Left column: reassurance panel ──────────────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal>
                <SectionHeading lines={["A Journey", "Made for You"]} />
              </Reveal>
              <p className="mt-4 text-[15px] sm:text-base text-black leading-[1.85]">
                We are a small, owner-led team based in Sri Lanka. Every enquiry is read and answered
                personally, tell us what inspires you and we will craft a journey that feels uniquely yours.
              </p>

              {/* Image */}
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[16px]">
                <img
                  src="/whychooseus/tailor-made-hero.png"
                  alt="Sigiriya Rock Fortress"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Steps timeline */}
              <div className="mt-8 relative">

                <ol className="relative space-y-7">
                  {SIDE_STEPS.map((step, i) => {
                    const Icon = STEP_ICONS[i];
                    return (
                      <li key={step.title} className="flex gap-5 relative z-10">
                        <div className="grid size-[48px] shrink-0 place-items-center">
                          <img src={Icon} alt="" />
                        </div>
                        <div className="pt-1.5">
                          <p className="text-[15px] sm:text-base font-bold text-brand-navy">{step.title}</p>
                          <p className="mt-1 text-[13px] sm:text-base leading-relaxed text-black">{step.copy}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* ── Right column: form ─────────────────────────────────── */}
            <div className="lg:col-span-7">
              <TourEnquiryForm countries={countries} prefill={prefill} />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />

      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
