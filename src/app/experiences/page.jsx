import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import ExperienceExplorer from "@/components/experiences/ExperienceExplorer";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getExperiences } from "@/lib/content";
import { experienceCategories, experiencesLanding } from "@/data/experiences";
import { whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sri Lanka Experiences – Find Your Kind of Sri Lanka",
  description:
    "From leopard safaris and ancient temples to beach escapes, hill-country hikes and Ayurvedic retreats – explore the experiences that define Sri Lanka with Seren Lanka Travels.",
  path: "/experiences",
});

/** Experiences landing – centred intro + filterable card grid (mirrors destinations landing). */
export default function ExperiencesPage() {
  const experiences = getExperiences();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/sigiriya.jpg"
          alt="Sri Lanka experiences – wildlife, culture, beaches and adventure"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay — same as destinations page */}
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
              { label: "Discover Sri Lanka", href: "/discover-sri-lanka" },
              { label: "Experiences" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              {experiencesLanding.heading[0]}{" "}
              <span className="font-light">{experiencesLanding.heading[1]}</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            {experiencesLanding.intro}
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <ExperienceExplorer experiences={experiences} categories={experienceCategories} />
        </Container>
      </section>

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
