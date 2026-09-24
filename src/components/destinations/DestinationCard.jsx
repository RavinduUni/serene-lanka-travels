import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Destination card (reference: image top, name, blurb, "Read more" pill),
 * built with the site's card pattern.
 */
export default function DestinationCard({ destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-gray-200 bg-white shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={destination.heroImage}
          alt={`${destination.name}, Sri Lanka`}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

      </div>
      <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
        <h3 className="text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue">
          {destination.name}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-black">{destination.blurb}</p>
        <span className="mx-auto mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand-blue px-5 text-[13px] font-semibold text-white transition-colors group-hover:bg-brand-blue-dark">
          Read more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
