import { Clock, MapPin, Car, Languages, Navigation } from "lucide-react";

const facts = [
  { key: "duration", label: "Duration", Icon: Clock },
  { key: "pickup", label: "Pickup", Icon: Navigation },
  { key: "destinations", label: "Destinations", Icon: MapPin },
  { key: "transport", label: "Transport", Icon: Car },
  { key: "guide", label: "Driver / guide", Icon: Languages },
];

export default function QuickFacts({ data }) {
  return (
    <dl className="grid grid-cols-2 gap-4 rounded-card border border-brand-line bg-white p-5 shadow-card sm:grid-cols-3 sm:p-6 lg:grid-cols-5">
      {facts.map(({ key, label, Icon }) =>
        data[key] ? (
          <div key={key} className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-[12px] font-semibold text-brand-muted">{label}</dt>
              <dd className="mt-0.5 text-[14px] font-bold leading-snug text-brand-navy">{data[key]}</dd>
            </div>
          </div>
        ) : null
      )}
    </dl>
  );
}
