import Image from "next/image";
import { BadgePercent, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Container from "@/components/ui/Container";

/**
 * 15 field 17 - Pricing / starting price / quotation notice.
 * Renders as a full-bleed section with a background image + dark overlay.
 * pricing: { startingFrom: number|null, currency, per, discountPercent? }
 * With no confirmed price the block shows "Price on request".
 */
export default function PriceBlock({ tour, notice, whatsappMessage, image }) {
  const { startingFrom, currency = "USD", per, discountPercent } = tour.pricing || {};
  const hasPrice = typeof startingFrom === "number";
  const discounted = hasPrice && discountPercent ? Math.round(startingFrom * (1 - discountPercent / 100)) : null;
  const bgImage = image || tour.heroImage;

  return (
    <section className="relative overflow-hidden py-20 text-white lg:py-28">
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,19,59,0.96)_0%,rgba(6,19,59,0.80)_50%,rgba(6,19,59,0.65)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-[13px] font-semibold text-white/70">Pricing</p>
            {hasPrice ? (
              <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[13px] font-semibold text-white/70">from</span>
                {discounted ? (
                  <>
                    <span className="text-2xl font-semibold text-white/50 line-through">
                      {currency} {startingFrom}
                    </span>
                    <span className="text-4xl font-bold tracking-tight text-brand-blue sm:text-5xl">
                      {currency} {discounted}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {currency} {startingFrom}
                  </span>
                )}
                <span className="text-[14px] font-semibold text-white/70">{per}</span>
              </p>
            ) : (
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Price on request</p>
            )}
            {discountPercent ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-[13px] font-bold">
                <BadgePercent className="size-4" aria-hidden="true" />
                {discountPercent}% honeymoon discount applied automatically
              </p>
            ) : null}
            <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-white/70">
              {notice}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5">
            <Button href="#quote" size="lg" className="w-full">
              Request a Quote
            </Button>
            <Button href="/tailor-made-tours/build" variant="white" size="lg" className="w-full">
              {tour.cta || "Customize This Tour"}
            </Button>
            <WhatsAppButton size="lg" className="w-full" label="WhatsApp Enquiry" message={whatsappMessage} />
          </div>
        </div>
      </Container>
    </section>
  );
}