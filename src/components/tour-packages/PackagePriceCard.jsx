import { CalendarDays, CarFront, Compass, Send, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatMoney, durationLabel, tourTypeLabel, themeLabel } from "@/lib/tour-packages";
import Image from "next/image";

/**
 * Sticky pricing panel (guide §11 order): Starting From USD → Per Person →
 * approx. LKR → facts → Request a Quote.
 */
export default function PackagePriceCard({ pkg }) {
  const facts = [
    { image: '/tour-packages/01-duration.svg', label: "Duration", value: durationLabel(pkg) },
    { image: '/tour-packages/02-tour-type.svg', label: "Tour type", value: tourTypeLabel(pkg.tourType) },
    { image: '/tour-packages/04-private-transport.svg', label: "Transport", value: pkg.transport },
    { image: '/tour-packages/03-tour-themes.svg', label: "Themes", value: pkg.themes.map(themeLabel).join(", ") },
  ];

  return (
    <div className="overflow-hidden rounded-card border border-brand-line bg-white shadow-lift">
      <div className="relative overflow-hidden px-6 pt-6 text-black">
        <p className="relative text-[12px] font-bold uppercase tracking-[0.14em]">Starting from</p>
        <p className="relative mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="whitespace-nowrap text-[2.2rem] font-bold leading-none tracking-tight lg:text-[2rem] xl:text-[2.4rem]">
            {formatMoney(pkg.pricing.usd)}
          </span>
          <span className="whitespace-nowrap text-[14px] font-semibold">/ Per Person</span>
        </p>
        <p className="relative mt-2 text-[14px]">Approx. {formatMoney(pkg.pricing.lkr, "LKR")}</p>
      </div>

      <div className="px-6 pb-6">
        <dl className="mt-6 space-y-3.5 border-t border-brand-line pt-5">
          {facts.map(({ image, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue">
                <Image src={image} width={40} height={40} alt="package-details"/>
              </span>
              <div className="min-w-0">
                <dt className="text-[12px] font-semibold uppercase tracking-wide text-brand-muted">{label}</dt>
                <dd className="text-[14.5px] font-semibold leading-snug text-brand-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <Button href="#enquire" size="lg" className="w-full">
            <Send className="size-[18px]" aria-hidden="true" />
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
