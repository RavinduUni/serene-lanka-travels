import Image from "next/image";
import { BedDouble, CarFront, Clock, Headset, Route, Wallet } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FinalCta from "@/components/sections/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import PackageExplorer from "@/components/tour-packages/PackageExplorer";
import { getTourPackages } from "@/lib/content";
import { toPackageCard, formatMoney } from "@/lib/tour-packages";
import { tourPackagesLanding as copy, priceCondition } from "@/data/tour-packages";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: copy.seoTitle,
  rawTitle: true,
  description: copy.metaDescription,
  path: "/tour-packages",
  image: copy.heroImage,
});

const BENEFIT_ICONS = { CarFront, Route, Headset };

export default function TourPackagesPage() {
  const packages = getTourPackages();
  const cards = packages.map(toPackageCard);

  const minDays = Math.min(...packages.map((p) => p.days));
  const maxDays = Math.max(...packages.map((p) => p.days));
  const fromUsd = Math.min(...packages.map((p) => p.pricing.usd));

  const heroFacts = [
    { Icon: Clock, label: minDays === maxDays ? `${minDays} days` : `${minDays} – ${maxDays} days` },
    { Icon: CarFront, label: "Private vehicle" },
    { Icon: BedDouble, label: "Accommodation included" },
    { Icon: Wallet, label: `From ${formatMoney(fromUsd)} / person` },
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: new URL(`/tour-packages/${p.slug}`, site.url).toString(),
    })),
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative -mt-[76px] overflow-hidden pb-20 pt-36 lg:-mt-[88px] lg:pb-28 lg:pt-44">
        <Image
          src={copy.heroImage}
          alt={copy.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tour Packages" }]} light />
          <Reveal>
            <h1 className="mt-6 max-w-4xl text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.h1}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/85 sm:text-base">{copy.intro}</p>
          </Reveal>
        </Container>
      </section>

      {/* ── Discovery: filters + tour grid ── */}
      <section id="tours" className="scroll-mt-24 bg-white py-14 lg:py-20">
        <Container>
          <PackageExplorer
            packages={cards}
            heading={copy.explore.heading}
            intro={copy.explore.copy}
            priceNote={`Prices shown are estimated starting prices per person. ${priceCondition}`}
            cta={copy.customCta}
          />
        </Container>
      </section>

      {/* ── Benefits ── */}
      {/* <section className="relative overflow-hidden bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={copy.benefits.heading} align="center" className="mx-auto" />
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
            {copy.benefits.items.map((b, i) => {
              const Icon = BENEFIT_ICONS[b.icon];
              return (
                <li key={b.title}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <div className="relative h-full overflow-hidden rounded-card border border-brand-line bg-white p-7 shadow-card sm:p-8">
                      <span
                        className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-bold leading-none text-brand-watermark"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-blue text-white shadow-[0_12px_24px_-12px_rgba(26,140,255,0.9)]">
                        <Icon className="size-7" aria-hidden="true" />
                      </span>
                      <h3 className="relative mt-6 text-xl font-bold text-brand-navy">{b.title}</h3>
                      <p className="relative mt-3 text-[15px] leading-relaxed text-brand-muted">{b.copy}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section> */}

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <JsonLd data={itemListJsonLd} />
    </>
  );
}
