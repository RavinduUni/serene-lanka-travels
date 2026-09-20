import { Phone } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";

/** Branded initials avatar used until real photographs are supplied. */
function InitialsAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      aria-hidden="true"
      className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1a8cff_0%,#0b1f5c_60%,#06133b_100%)]"
    >
      <span className="text-6xl font-bold tracking-tight text-white/95">{initials}</span>
    </div>
  );
}

export default function TeamCard({ member }) {
  return (
    <article className="group overflow-hidden rounded-card border border-brand-line bg-white shadow-card">
      <div className="relative aspect-[4/4.4] overflow-hidden">
        {member.photo ? (
          <SmartImage
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <InitialsAvatar name={member.name} />
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-bold tracking-tight text-brand-navy">{member.name}</h3>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide">
          {member.position}
        </p>
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-ink transition-colors hover:text-brand-blue"
          >
            <span className="grid size-8 place-items-center rounded-full bg-brand-sky text-brand-blue">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            {member.phone}
          </a>
        )}
      </div>
    </article>
  );
}
