import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Image tile with a label overlay – the same tile style as the Day Tours
 * landing grid ("More Tailor-Made Tours"). Used on the transfers landing.
 */
export default function TransferCard({ service }) {
  return (
    <Link
      href={`/transfers/${service.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-card bg-brand-navy shadow-card"
    >
      <SmartImage
        src={service.heroImage}
        alt={service.name}
        fill
        sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_45%,rgba(6,19,59,0.85)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-[12px] font-semibold text-white/75">{service.routes.join(" · ")}</p>
        <p className="mt-1 text-[15px] font-bold uppercase tracking-wide">{service.name}</p>
      </div>
    </Link>
  );
}
