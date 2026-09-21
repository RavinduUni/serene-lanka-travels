import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

/**
 * Responsive photo grid (reference "Visual Journeys"): one 2×2 feature tile
 * plus four standard tiles – a complete block on both 2-col and 4-col layouts.
 * Shows the first 5 images; give every tour at least 5. images: [url]
 */
export default function GalleryGrid({ images, alt = "" }) {
  if (!images?.length) return null;
  const shown = images.slice(0, 5);
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {shown.map((src, i) => (
        <li
          key={`${src}-${i}`}
          className={cn(
            "relative overflow-hidden rounded-card bg-brand-navy",
            i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/3]"
          )}
        >
          <SmartImage
            src={src}
            alt={alt}
            fill
            sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}
