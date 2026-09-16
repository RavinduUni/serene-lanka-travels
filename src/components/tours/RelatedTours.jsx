import SectionHeading from "@/components/ui/SectionHeading";
import DayTourCard from "@/components/tours/DayTourCard";

export default function RelatedTours({ tours }) {
  if (!tours?.length) return null;
  return (
    <div>
      <SectionHeading lines={["You may also like", "these Day Tours"]} size="sm" />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => (
          <li key={t.slug}>
            <DayTourCard tour={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
