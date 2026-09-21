import { MapPin, Plane } from "lucide-react";

/**
 * Route string rendered as a numbered stepper (§15 "Route map / route string").
 * Works with any number of stops; wraps on small screens.
 */
export default function RouteStrip({ stops }) {
  if (!stops?.length) return null;
  return (
    <ol className="flex flex-wrap items-center justify-center gap-y-5">
      {stops.map((stop, i) => {
        const isAirport = /airport/i.test(stop);
        const last = i === stops.length - 1;
        return (
          <li key={`${stop}-${i}`} className="flex items-center">
            <div className="flex flex-col items-center">
              <span className="grid size-11 place-items-center rounded-full border-2 border-brand-blue bg-white text-brand-blue shadow-card">
                {isAirport ? (
                  <Plane className="size-5" aria-hidden="true" />
                ) : (
                  <span className="text-[14px] font-bold">{i + 1}</span>
                )}
              </span>
              <span className="mt-2 flex items-center gap-1 whitespace-nowrap text-[13px] font-bold text-brand-navy">
                {!isAirport && <MapPin className="size-3.5 text-brand-blue" aria-hidden="true" />}
                {stop}
              </span>
            </div>
            {!last && (
              <span
                className="mx-2 mb-6 h-0.5 w-6 rounded bg-brand-blue/40 sm:w-10 lg:w-14"
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
