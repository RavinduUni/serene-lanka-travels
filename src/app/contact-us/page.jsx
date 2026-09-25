import Image from "next/image";
import {
  MessageCircle,
  Clock,
  ShieldCheck,
  Globe2,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ContactEnquiryForm from "@/components/forms/ContactEnquiryForm";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact Us – Plan Your Sri Lanka Journey",
  description:
    "Get in touch with Seren Lanka Travels. Tell us when you are travelling, who you are with and what you want from Sri Lanka – we will help you plan the perfect private trip.",
  path: "/contact-us",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Seren Lanka Travels",
  url: new URL("/contact-us", site.url).toString(),
  mainEntity: {
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
};

/* ── Trust signal cards shown alongside the form ─────────────────── */
const trustPoints = [
  {
    icon: MessageCircle,
    title: "WhatsApp First",
    body: "Send your enquiry and we will reply on WhatsApp – the fastest way to reach our team, wherever you are in the world.",
  },
  {
    icon: Clock,
    title: "Quick Response",
    body: "We aim to reply within a few hours. For urgent requests, WhatsApp is the fastest channel.",
  },
  {
    icon: ShieldCheck,
    title: "No Commitment",
    body: "Getting in touch is completely free. We will share ideas and a personalised quote before you commit to anything.",
  },
  {
    icon: Globe2,
    title: "Private & Flexible",
    body: "Every enquiry is handled personally. Your trip is planned around your schedule, budget and interests – not a fixed group itinerary.",
  },
];

/* ── Quick links shown below the trust cards ──────────────────────── */
const quickLinks = [
  { label: "Build your own itinerary", href: "/tailor-made-tours/build" },
  { label: "View all Sri Lanka itineraries", href: "/sri-lanka-itineraries" },
  { label: "Browse day tours", href: "/day-tours" },
  { label: "Book an airport transfer", href: "/transfers/airport-transfers" },
];

export default function ContactUsPage() {
  const whatsappHref = buildWhatsAppLink(whatsappTemplates.generic);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/sigiriya.jpg"
          alt="Plan your Sri Lanka journey with Seren Lanka Travels"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,19,59,0.5) 0%, rgba(6,19,59,0.28) 35%, rgba(6,19,59,0.72) 68%, rgba(6,19,59,0.97) 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact Us" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-3xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              Let&apos;s Plan Your{" "}
              <span className="font-light">Journey</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            Tell us when you are travelling, who you are travelling with and what kind of Sri Lanka
            experience you want. Our team will help you plan the next step.
          </p>
        </Container>
      </section>

      {/* ── Main content: trust signals left + form right ─────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">

            {/* ── Left column: trust + quick links ──────────────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal>
                <SectionHeading lines={["How We", "Work Together"]} />
              </Reveal>
              <p className="mt-4 text-[15px] leading-[1.85]">
                We are a small, owner-led team based in Sri Lanka. Every enquiry is read and answered
                personally, there is no call centre and no automated response.
              </p>

              {/* Trust cards */}
              <ul className="mt-8 space-y-4">
                {trustPoints.map((tp) => (
                  <li
                    key={tp.title}
                    className="flex items-start gap-4 rounded-card border border-brand-line bg-white p-5 shadow-card"
                  >
                    <span className="mt-0.5 grid shrink-0 place-items-center rounded-full bg-brand-sky p-2.5">
                      <tp.icon className="size-5 text-brand-blue" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-brand-navy">{tp.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-brand-muted">{tp.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right column: form ─────────────────────────────────── */}
            <div className="lg:col-span-7">
              <ContactEnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ strip ────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading lines={["Common", "Questions"]} align="center" className="mx-auto" />
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {[
              {
                q: "How quickly will you reply?",
                a: "We aim to reply within a few hours via WhatsApp. Complex itinerary requests may take until the following morning.",
              },
              {
                q: "Is there a booking fee to enquire?",
                a: "No. Getting in touch and receiving a personalised quote is completely free and carries no obligation.",
              },
              {
                q: "Can you tailor an existing itinerary?",
                a: "Absolutely. Every tour we offer can be adjusted — different dates, extra nights, added activities or a completely different route.",
              },
              {
                q: "What if my dates change?",
                a: "We are flexible. Tell us your preferred dates and any backup dates; we will plan around your travel window.",
              },
              {
                q: "Do you cater for solo travellers?",
                a: "Yes. All our tours are private, so the price and pace is set entirely around you, whether you travel solo or in a group.",
              },
              {
                q: "What is the best way to contact you?",
                a: "WhatsApp is fastest. The form above also reaches us directly — use whichever is most convenient for you.",
              },
            ].map((faq) => (
              <li
                key={faq.q}
                className="rounded-card border border-brand-line bg-white p-5 shadow-card"
              >
                <p className="font-semibold text-brand-navy">{faq.q}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">{faq.a}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <JsonLd data={contactJsonLd} />
    </>
  );
}

