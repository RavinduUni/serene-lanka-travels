import { ClipboardList, Route, MessageCircle, Mail, Phone, Info } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
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

const STEP_ICONS = [ClipboardList, Route, MessageCircle];

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
      {/* Page header – full-bleed background image hero */}
      <section
        className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden py-24 lg:py-32"
        style={{ backgroundImage: "url('/destinations/trincomalee 2.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tailor-Made Tours" }]} light />
          <h1 className="mt-6 max-w-4xl text-[2.1rem] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {COPY.h1[0]}<br />
            <span className="text-white">{COPY.h1[1]}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/80 sm:text-base">
            {COPY.intro}
          </p>
        </Container>
      </section>

      {/* 5–6. Accordion form + submission area, with side panel on desktop */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto grid w-full max-w-[1220px] gap-8 px-4 sm:px-8 lg:grid-cols-[minmax(0,760px)_minmax(0,1fr)] lg:gap-10">
          <div className="min-w-0">
            <TourEnquiryForm countries={countries} prefill={prefill} />
          </div>

          {/* Reassurance panel: side on desktop, below the form on tablet/mobile */}
          <aside aria-label="How it works" className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">
            <div className="rounded-[20px] bg-[#fdfdfc] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-brand-line/50">
              {/* Image */}
              <div className="relative mb-6 aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded-[16px]">
                <img 
                  src="/destinations/Sigiriya.webp" 
                  alt="Sigiriya Rock Fortress" 
                  className="absolute inset-0 h-full w-full object-cover" 
                />
              </div>

              {/* Header */}
              <h2 className="text-[26px] leading-[1.25] font-semibold text-[#0a252a] px-1" style={{ fontFamily: "Georgia, serif" }}>
                A little inspiration.<br />A journey of your own.
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5c6e73] px-1">
                From ancient wonders to lush landscapes, serene beaches to vibrant culture – Sri Lanka offers endless possibilities. Tell us what inspires you, and we will craft a journey that feels uniquely yours.
              </p>

              {/* Steps timeline */}
              <div className="mt-8 relative px-1">
                {/* Dotted vertical line */}
                <div className="absolute left-[24px] top-6 bottom-10 w-px border-l border-dashed border-[#a07e41]/50" />
                
                <ol className="relative space-y-7">
                  {SIDE_STEPS.map((step, i) => {
                    const Icon = STEP_ICONS[i];
                    return (
                      <li key={step.title} className="flex gap-5 relative z-10">
                        <span className="grid size-[42px] shrink-0 place-items-center rounded-full bg-[#9b7936] text-white shadow-[0_0_0_6px_#fdfdfc]">
                          <Icon className="size-[18px]" aria-hidden="true" />
                        </span>
                        <div className="pt-1.5">
                          <p className="text-[15px] font-bold text-[#0a252a]">{step.title}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-[#5c6e73]">{step.copy}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="rounded-card border border-brand-line bg-white p-6 shadow-card">
              <h2 className="text-[15px] font-bold text-brand-navy">Prefer to talk first?</h2>
              <ul className="mt-4 space-y-3 text-[14px]">
                <li>
                  <a
                    href={buildWhatsAppLink(whatsappTemplates.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 font-semibold text-brand-ink hover:text-brand-blue"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
                      <MessageCircle className="size-4" aria-hidden="true" />
                    </span>
                    WhatsApp us
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 font-semibold text-brand-ink hover:text-brand-blue">
                    <span className="grid size-9 place-items-center rounded-full bg-brand-sky text-brand-blue">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    Email us<span className="sr-only"> at {site.email}</span>
                  </a>
                </li>
                {site.phones?.[0] && (
                  <li>
                    <a
                      href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                      className="flex min-h-11 items-center gap-3 font-semibold text-brand-ink hover:text-brand-blue"
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-brand-sky text-brand-blue">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      {site.phones[0]}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <FinalCta />

      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
