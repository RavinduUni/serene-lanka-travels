import { Users, Briefcase } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Vehicle category tile (§19). Rates are admin-editable and pending, so the
 * card shows "Rates on request" until `ratePerKm` / `minimumDailyCharge` exist.
 */
export default function VehicleCard({ vehicle }) {
  const hasRate = typeof vehicle.minimumDailyCharge === "number" || typeof vehicle.ratePerKm === "number";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width:1024px) 20vw, (min-width:640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-bold text-brand-navy backdrop-blur">
          <Users className="size-3.5 text-brand-blue" aria-hidden="true" />
          {vehicle.capacityLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-bold leading-snug text-brand-navy">{vehicle.name}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-brand-muted">{vehicle.blurb}</p>
        <div className="mt-4 flex flex-col gap-2 border-t border-brand-line pt-4 text-[13px]">
          <span className="flex items-center gap-1.5 text-brand-muted">
            <Briefcase className="size-4 text-brand-blue" aria-hidden="true" />
            {vehicle.luggage}
          </span>
          <span className="font-bold text-brand-blue">
            {hasRate ? `from USD ${vehicle.minimumDailyCharge ?? vehicle.ratePerKm}` : "Rates on request"}
          </span>
        </div>
      </div>
    </article>
  );
}
