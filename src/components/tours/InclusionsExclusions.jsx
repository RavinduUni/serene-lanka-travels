import { Check, X } from "lucide-react";

function List({ items, positive }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-brand-ink">
          <span
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
              positive ? "bg-brand-sky text-brand-blue" : "bg-brand-mist text-brand-muted"
            }`}
          >
            {positive ? <Check className="size-3.5" aria-hidden="true" /> : <X className="size-3.5" aria-hidden="true" />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function InclusionsExclusions({ inclusions, exclusions }) {
  return (
    <div className="grid gap-8 rounded-card border border-brand-line bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <div>
        <h3 className="text-lg font-bold text-brand-navy">What&apos;s included</h3>
        <div className="mt-4">
          <List items={inclusions} positive />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-brand-navy">Not included</h3>
        <div className="mt-4">
          <List items={exclusions} />
        </div>
      </div>
    </div>
  );
}
