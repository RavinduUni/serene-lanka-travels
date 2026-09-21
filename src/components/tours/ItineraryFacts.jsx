import { Clock, Moon, MapPin, Flag, BedDouble, UtensilsCrossed, Car, Languages } from "lucide-react";

/** "Tour at a glance" grid – §15 fields 2, 9–13. Missing fields are skipped. */
export default function ItineraryFacts({ tour }) {
  const facts = [
    { label: "Duration", value: tour.duration, Icon: Clock },
    { label: "Nights", value: tour.nights ? `${tour.nights} nights` : null, Icon: Moon },
    { label: "Starts", value: tour.startLocation, Icon: MapPin },
    { label: "Ends", value: tour.endLocation, Icon: Flag },
    { label: "Accommodation", value: tour.accommodation, Icon: BedDouble },
    { label: "Meal plan", value: tour.mealPlan, Icon: UtensilsCrossed },
    { label: "Transportation", value: tour.transportation, Icon: Car },
    { label: "Driver / guide", value: tour.driverGuide, Icon: Languages },
  ].filter((f) => f.value);

  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-card border border-brand-line bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
      {facts.map(({ label, value, Icon }) => (
        <div key={label} className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <dt className="text-[12px] font-semibold text-brand-muted">{label}</dt>
            <dd className="mt-0.5 text-[14px] font-bold leading-snug text-brand-navy">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
