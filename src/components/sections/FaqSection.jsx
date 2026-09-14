import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import { faq } from "@/data/home";

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Image with heading overlaid – reference style */}
          <div className="relative min-h-[320px] overflow-hidden rounded-card bg-brand-navy lg:col-span-5 lg:min-h-0">
            <SmartImage
              src={faq.image}
              alt="Couple watching the sunset on a Sri Lankan beach"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,0)_70%)]"
              aria-hidden="true"
            />
            <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
              <SectionHeading lines={faq.heading} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={faq.items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
