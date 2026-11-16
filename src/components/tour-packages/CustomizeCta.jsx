import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { whatsappTemplates } from "@/data/site";

/** "Your Sri Lanka Holiday, Your Way" banner under the tour grid (guide §03/§04). */
export default function CustomizeCta({ cta }) {
  return (
    <div className="relative overflow-hidden rounded-card bg-brand-navy-deep text-white">
      <SmartImage src={cta.image} alt="" fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover opacity-45" />
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,19,59,0.97)_0%,rgba(6,19,59,0.85)_55%,rgba(6,19,59,0.45)_100%)]"
        aria-hidden="true"
      />
      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <h2 className="max-w-lg text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl">{cta.heading}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base">{cta.copy}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/tailor-made-tours" size="lg">
            {cta.button}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <WhatsAppButton size="lg" label="WhatsApp Us" message={whatsappTemplates.generic} />
        </div>
      </div>
    </div>
  );
}
