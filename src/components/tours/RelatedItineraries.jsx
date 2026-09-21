import SectionHeading from "@/components/ui/SectionHeading";
import ItineraryCard from "@/components/tours/ItineraryCard";

export default function RelatedItineraries({ tours }) {
  if (!tours?.length) return null;
  return (
    <div>
      <SectionHeading lines={["More Journeys", "to Discover"]} size="sm" />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => (
          <li key={t.slug}>
            <ItineraryCard tour={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
