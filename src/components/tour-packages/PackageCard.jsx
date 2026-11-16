import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, CarFront, Clock, MapPin, MoveRight, Sparkles } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { formatMoney } from "@/lib/tour-packages";
import { cn } from "@/lib/utils";

/**
 * Tour package card. `pkg` is the plain object from toPackageCard().
 * The title link is stretched over the whole card, so the card is one tab
 * stop and the accessible name is just the tour title.
 *
 * layout: "vertical" (grid) | "horizontal" (image left on md+, used for the
 * single related tour on detail pages).
 */
export default function PackageCard({ pkg, currency = "USD", layout = "vertical", headingLevel = "h3", priority = false }) {
  const Heading = headingLevel;
  const horizontal = layout === "horizontal";
  const primary = currency === "LKR" ? formatMoney(pkg.priceLkr, "LKR") : formatMoney(pkg.priceUsd, "USD");
  const secondary = currency === "LKR" ? formatMoney(pkg.priceUsd, "USD") : formatMoney(pkg.priceLkr, "LKR");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift",
        horizontal && "md:flex-row"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative aspect-[16/11] shrink-0 overflow-hidden bg-brand-navy",
          horizontal && "md:aspect-auto md:w-[46%]"
        )}
      >
        <SmartImage
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          priority={priority}
          sizes={horizontal ? "(min-width:768px) 45vw, 100vw" : "(min-width:1280px) 420px, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
   
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", horizontal && "md:p-8")}>

        <Heading className="mt-2 text-xl font-bold leading-snug tracking-tight text-black sm:text-[1.35rem]">
          <Link
            href={pkg.href}
            className="transition-colors after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:text-brand-blue focus-visible:outline-none"
          >
            {pkg.title}
          </Link>
        </Heading>

        {/* <p className="mt-3 flex items-start gap-2 text-[13.5px] font-medium text-brand-ink">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            {pkg.route.map((stop, i) => (
              <span key={stop} className="inline-flex items-center gap-1.5 text-brand-ink">
                {stop}
                {i < pkg.route.length - 1 && <MoveRight className="size-3.5 text-brand-ink" aria-hidden="true" />}
              </span>
            ))}
          </span>
        </p> */}

        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-black sm:text-[15px]">{pkg.description}</p>

        {/* <ul className="mt-4 flex flex-wrap gap-2 text-[12.5px] font-semibold text-brand-navy">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sky px-3 py-1.5">
            <CarFront className="size-3.5 text-brand-blue" aria-hidden="true" />
            {pkg.transportShort}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sky px-3 py-1.5">
            <BedDouble className="size-3.5 text-brand-blue" aria-hidden="true" />
            {pkg.nights} nights&apos; stay
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-brand-sky px-3 py-1.5">
            <Sparkles className="size-3.5 text-brand-blue" aria-hidden="true" />
            {pkg.activityCount} experiences
          </li>
        </ul> */}

        {/* Price + CTA */}
        <div className="flex-1" aria-hidden="true" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-brand-line pt-5">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-brand-muted">Starting from</p>
            <p className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-black">{primary}</span>
              <span className="text-[13px] font-semibold text-black">/ person</span>
            </p>
            <p className="mt-0.5 text-[12.5px] text-brand-muted">Approx. {secondary}</p>
          </div>
          <span className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-blue pl-5 pr-1.5 text-[14px] font-semibold text-white transition-colors group-hover:bg-brand-blue-dark">
            View Tour Details
            <span className="grid size-8 place-items-center rounded-full">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
