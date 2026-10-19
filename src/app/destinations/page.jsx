import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import DestinationExplorer from "@/components/destinations/DestinationExplorer";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getDestinations } from "@/lib/content";
import { destinationRegions, destinationsLanding } from "@/data/destinations";
import { whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Places to Visit in Sri Lanka | Destination Guide",
  rawTitle: true,
  description:
    "Explore places to visit in Sri Lanka, from cultural landmarks and hill country towns to national parks and beach destinations. Plan where to go next.",
  path: "/destinations",
});

/** Destinations landing – centred intro + filterable card grid (reference layout, site design system). */
export default function DestinationsPage() {
  const destinations = getDestinations();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/destinations/sigiriya2.webp"
          alt="Sigiriya rock fortress and lush Sri Lanka landscape"
          fill
          quality={90}
          sizes="(max-width: 768px) 200vw, 100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay — same as discover page */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Discover Sri Lanka", href: "/discover-sri-lanka" },
              { label: "Destinations" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-2 sm:mt-4 max-w-4xl text-[2rem] font-bold leading-[1.07] tracking-[-0.03em] text-white lg:text-[4.5rem]">
              Places to Visit{" "} <br />
              <span className="font-light">in Sri Lanka</span>
            </h1>
          </Reveal>
          <Reveal>
          <p className="mt-4 sm:mt-6 max-w-2xl text-[13px] leading-[1.85] text-white/80 sm:text-base">
            Sri Lanka&apos;s destinations include historic cities, mountain landscapes, wildlife areas and coastal towns. Browse our destination guides to learn what makes each place distinctive and discover which tours or itineraries connect to your preferred locations.
          </p>
          </Reveal>
        </Container>
      </section>


      <section className="py-14 lg:py-20">
        <Container>
          <DestinationExplorer destinations={destinations} regions={destinationRegions} />
        </Container>
      </section>

      

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
