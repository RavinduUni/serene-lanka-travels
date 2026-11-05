import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GalleryExplorer from "@/components/gallery/GalleryExplorer";
import { galleryHero, galleryImages } from "@/data/gallery";
import { whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Gallery – Sri Lanka Through Our Lens",
  rawTitle: true,
  description:
    "Browse our Sri Lanka travel gallery featuring destinations, beaches, wildlife, cultural heritage, and authentic tour experiences captured across the island.",
  path: "/gallery",
  image: "/destinations/sigiriya2.webp",
});

export default function GalleryPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden py-24 lg:py-32">
        <Image
          src={galleryHero.image}
          alt="Sigiriya Rock Fortress aerial view, Sri Lanka"
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 200vw, 100vw"
          className="object-cover object-bottom"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Gallery" },
            ]}
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2rem] font-bold leading-[1.07] tracking-[-0.03em] text-white lg:text-[4.5rem]">
              {galleryHero.heading[0]}{" "}
              <br />
              <span className="font-light">{galleryHero.heading[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-[13px] leading-[1.85] text-white/80 sm:text-base">
              {galleryHero.copy}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section
        id="gallery"
        className="scroll-mt-24 py-16 lg:py-24"
      >
        <Container>
          <Reveal>
            <SectionHeading
              lines={["Explore Sri Lanka", "One Frame at a Time"]}
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-[14px] leading-relaxed text-black lg:text-base">
              Filter by category to discover the destinations, wildlife encounters, cultural
              moments and beach escapes that make Sri Lanka unforgettable. Click any photo
              to view it full-screen.
            </p>
          </Reveal>

          <div className="mt-15">
            <GalleryExplorer images={galleryImages} />
          </div>
        </Container>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}

