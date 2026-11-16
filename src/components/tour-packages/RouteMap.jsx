import { ExternalLink, MapPinned, Plane } from "lucide-react";
import { directionsUrl, mapEmbedUrl } from "@/lib/tour-packages";
import { cn } from "@/lib/utils";

/**
 * Route map (guide §10): Google Maps draws the real driving route through each
 * stop in day order, plus a numbered stop / overnight legend. The legend is
 * also the plain ordered fallback on small screens.
 */
export default function RouteMap({ stops, title, note }) {
  return (
    <div className="grid overflow-hidden rounded-card border border-brand-line bg-white shadow-card lg:grid-cols-5">
      <div className="relative aspect-[4/3] bg-brand-mist sm:aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[460px]">
        <iframe
          src={mapEmbedUrl(stops)}
          title={`Route map for ${title}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col p-6 sm:p-7 lg:col-span-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
          <MapPinned className="size-5 text-brand-blue" aria-hidden="true" />
          Stops in order
        </h3>
        <ol className="mt-5 space-y-0">
          {stops.map((s, i) => (
            <li key={`${s.name}-${i}`} className="relative flex gap-3.5 pb-4 last:pb-0">
              {i < stops.length - 1 && (
                <span className="absolute left-[0.9rem] top-8 h-[calc(100%-1.75rem)] w-px bg-brand-line" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "relative grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold",
                  s.type === "airport" && "bg-brand-navy text-white",
                  s.type === "overnight" && "bg-brand-blue text-white",
                  s.type === "visit" && "border-2 border-brand-blue bg-white text-brand-blue"
                )}
                aria-hidden="true"
              >
                {s.type === "airport" ? <Plane className="size-3.5" /> : i}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-semibold leading-snug text-brand-navy">{s.name}</p>
                <p className="text-[13px] text-brand-muted">{s.label}</p>
              </div>
            </li>
          ))}
        </ol>
        {note && <p className="mt-5 text-[12.5px] leading-relaxed text-brand-muted">{note}</p>}
        <a
          href={directionsUrl(stops)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 self-start text-[14px] font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          Open route in Google Maps
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
