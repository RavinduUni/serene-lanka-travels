import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/motion/Reveal";
import { faq } from "@/data/home";

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 pb-16 lg:pb-20">
      <Container>
        <div className="mb-10 lg:mb-12">
          <Reveal>
            <SectionHeading lines={faq.heading} />
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-card bg-brand-navy lg:col-span-5 lg:min-h-0">
            <SmartImage
              src={'/destinations/anuradhapura2.png'}
              alt="Couple watching the sunset on a Sri Lankan beach"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7">
            <Accordion items={faq.items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
