import Link from "next/link";
import { ArrowUpRight, Route } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";

/** Detail-style card (like DayTourCard) – used for "related services" on slug pages. */
export default function TransferServiceCard({ service }) {
  return (
    <Link
      href={`/transfers/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white transition-shadow shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={service.heroImage}
          alt={service.name}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue">
          <Route className="size-3.5" aria-hidden="true" />
          {service.routes[0]}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-brand-muted">{service.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-navy">
          View service
          <span className="grid size-8 place-items-center rounded-full bg-brand-sky text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
