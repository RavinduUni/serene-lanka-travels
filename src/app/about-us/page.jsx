import * as Icons from "lucide-react";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import TeamCard from "@/components/about/TeamCard";
import WhyChooseCarousel from "@/components/about/WhyChooseCarousel";
import JsonLd from "@/components/seo/JsonLd";
import {
  aboutHero,
  ourStory,
  brandMeaning,
  missionVision,
  whyChoose,
  team,
  trust,
  aboutCta,
} from "@/data/about";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "About Us – A Sri Lankan Journey Built on Trust",
  description:
    "The story of Seren Lanka Travels: two friends who grew a trusted, professional Sri Lankan travel company from personally helping international travellers. Come as a guest. Leave as a friend.",
  path: "/about-us",
});

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Seren Lanka Travels",
  url: new URL("/about-us", site.url).toString(),
  mainEntity: {
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    foundingDate: String(site.founded),
    founder: team.members.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.position })),
  },
};

export default function AboutUsPage() {
  return (
    <>
      {/* Page header – full-bleed background image hero */}
      <section
        className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden py-24 lg:py-32"
        style={{ backgroundImage: "url('/about-hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark gradient overlay for text legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,26,60,0.78) 0%, rgba(10,26,60,0.55) 60%, rgba(10,26,60,0.25) 100%)" }}
          aria-hidden="true"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} light />
          <h1 className="mt-6 max-w-4xl text-[2.1rem] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {aboutHero.heading[0]}{" "}
            <span className="text-white">{aboutHero.heading[1]}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/80 sm:text-base">
            {aboutHero.copy}
          </p>
        </Container>
      </section>

      {/* §10.1 Our Story – offset images like the home intro */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading lines={ourStory.heading} />
              </Reveal>
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                {ourStory.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <blockquote className="mt-8 flex items-start gap-4 rounded-card bg-brand-sky p-6">
                <Quote className="mt-1 size-6 shrink-0 text-brand-blue" aria-hidden="true" />
                <p className="text-[16px] font-semibold leading-relaxed text-brand-navy">
                  {ourStory.promise}
                </p>
              </blockquote>
              <dl className="mt-10 grid grid-cols-3 gap-6">
                {ourStory.milestones.map((m) => (
                  <div key={m.value} className="border-l-2 border-brand-blue pl-4">
                    <dd className="text-3xl font-bold tracking-[-0.03em] text-brand-navy sm:text-4xl">
                      {m.value}
                    </dd>
                    <dt className="mt-1.5 text-[12px] font-medium leading-snug text-brand-muted sm:text-[13px]">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-12 gap-4 lg:col-span-6 lg:pl-6">
              <div className="relative col-span-7 aspect-[4/5] overflow-hidden rounded-card shadow-card">
                <SmartImage
                  src={ourStory.images[0]}
                  alt="A train crossing the Nine Arches Bridge in Sri Lanka's hill country"
                  fill
                  sizes="(min-width:1024px) 30vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-5 mt-14 aspect-[4/5] overflow-hidden rounded-card shadow-card">
                <SmartImage
                  src={ourStory.images[1]}
                  alt="Sunrise over Sigiriya from Pidurangala Rock"
                  fill
                  sizes="(min-width:1024px) 22vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* §10.2 Meaning Behind Seren Lanka – image-card grid */}
      <section className="bg-white py-20 lg:py-28 bg-[url('/footerImg.jpg')] bg-cover bg-top bg-no-repeat relative">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[30%]"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />
        <Container>
          {/* Centred heading + intro copy */}
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                lines={brandMeaning.heading}
                align="center"
                className="mx-auto"
              />
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-black sm:text-base">
                {brandMeaning.copy}
              </p>
            </div>
          </Reveal>

          {/* Four image cards – PopularDestinations style */}
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {brandMeaning.cards.map((card, i) => {
              const Icon = Icons[card.icon] || Icons.Sparkles;
              return (
                <Reveal key={card.label} delay={i * 0.1}>
                  <li
                    className="group relative aspect-[4/5] overflow-hidden rounded-card bg-brand-navy sm:aspect-[3/4]"
                  >
                    {/* Photo — scales on hover */}
                    <SmartImage
                      src={card.image}
                      alt={card.label}
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Permanent bottom gradient (name + tag always visible) */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.92)_100%)]"
                      aria-hidden="true"
                    />

                    {/* Hover overlay — full dark tint that fades in */}
                    <div
                      className="absolute inset-0 bg-brand-navy/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    {/* Default state: name + tag pinned to bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0 sm:p-5">
                      <p className="text-lg font-bold leading-tight sm:text-xl">{card.label}</p>
                      <p className="mt-1 text-[12px] font-medium text-white/75 sm:text-[13px]">{card.tag}</p>
                    </div>

                    {/* Hover state: centred content that rises into view */}
                    <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center p-5 text-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {/* Name */}
                      <p className="text-2xl font-bold text-white sm:text-3xl">{card.label}</p>
                      {/* Blurb */}
                      <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                        {card.subtitle}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* §10.3 / §10.4 Mission & Vision */}
      <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24">
        {/* ── Text content ─────────────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-2xl px-6 pb-0 pt-16 text-center lg:pt-20">
          <Reveal>
            <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-[2.6rem]">
              Our Mission &amp; Vision
            </h2>
          </Reveal>

          {/* Mission + Vision stacked, centre-aligned */}
          {missionVision.map((item, i) => {
            return (
              <Reveal key={item.title} delay={i * 0.15}>
                <div className="mt-6">
                  <p className="mx-auto mt-2 max-w-xl text-[15px] leading-[1.85] text-black sm:text-[15px]">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Wildlife landscape image with cloud-mist dissolves ── */}
        <div className="relative mt-8 w-full">
          {/* Top cloud-mist fade */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[38%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom cloud-mist fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%]"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Left cloud-mist fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%]"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Right cloud-mist fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%]"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* The panoramic wildlife image */}
          <img
            src="/mission-vision-wildlife.jpg"
            alt="Sri Lanka wildlife – leopard, elephants and peacock in golden hour"
            className="w-full object-cover"
            style={{ maxHeight: "520px", minHeight: "280px", objectPosition: "center 40%" }}
          />
        </div>
      </section>

      {/* §10.5 Why Choose Seren Lanka Travels */}
      <WhyChooseCarousel />

      {/* §10.6 Our Team – watermark device like the home reviews section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <span className="watermark top-6 lg:top-4" aria-hidden="true">
          {team.watermark}
        </span>
        <Container className="relative">
          <Reveal>
            <SectionHeading lines={team.heading} align="center" className="mx-auto" />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
            <div className="grid grid-cols-1 content-start gap-6 sm:grid-cols-2 lg:col-span-6">
              {team.members.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
            <div className="lg:col-span-6">
              <h3 className="text-xl font-bold text-brand-navy">Our Founders</h3>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-brand-muted sm:text-base">
                {team.story.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <p className="mt-8 inline-block rounded-full bg-brand-navy px-6 py-3 text-[15px] font-bold text-white">
                {team.signoff}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* §10.7 Registrations & Trust */}
      <section className=" bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading lines={trust.heading} />
              </Reveal>
              <p className="mt-6 text-[15px] leading-[1.85] text-brand-muted sm:text-base">
                {trust.copy}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-1">
                {trust.facts.map((f) => {
                  const Icon = Icons[f.icon] || Icons.BadgeCheck;
                  return (
                    <li
                      key={f.title}
                      className="flex items-start gap-4 rounded-card border border-brand-line bg-white p-5 shadow-card sm:p-6"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[16px] font-bold text-brand-navy">{f.title}</h3>
                        <p className="mt-1 text-[14px] leading-relaxed text-brand-muted">{f.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {trust.certifications.length > 0 && (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {trust.certifications.map((c) => {
                    const Icon = Icons[c.icon] || Icons.BadgeCheck;
                    return (
                      <li
                        key={c.title}
                        className="flex items-start gap-4 rounded-card border border-brand-line bg-white p-5 shadow-card"
                      >
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-[16px] font-bold text-brand-navy">{c.title}</h3>
                          <p className="mt-1 text-[14px] leading-relaxed text-brand-muted">{c.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* §10.8 CTA – blue band like the home final CTA */}
      <FinalCta />

      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <JsonLd data={aboutPageJsonLd} />
    </>
  );
}
