import Link from "next/link";
import { ArrowUpRight, Clock, MoveRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { getItineraryCategoryLabel } from "@/lib/content";

export default function ItineraryCard({ tour }) {
  const primaryCategory = tour.categories?.[0];
  return (
    <Link
      href={`/sri-lanka-itineraries/${tour.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white transition-shadow shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={tour.heroImage}
          alt={tour.name}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue">
          {tour.duration}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue">
          {tour.name}
        </h3>
        {tour.route ? (
          <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-brand-muted">
            {tour.route.map((stop, i) => (
              <span key={`${stop}-${i}`} className="flex items-center gap-1.5">
                {stop}
                {i < tour.route.length - 1 && <MoveRight className="size-3.5 opacity-60" aria-hidden="true" />}
              </span>
            ))}
          </p>
        ) : (
          <p className="mt-2 text-[14px] leading-relaxed text-brand-muted">{tour.tagline}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-navy">
          View itinerary
          <span className="grid size-8 place-items-center rounded-full bg-brand-sky text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
