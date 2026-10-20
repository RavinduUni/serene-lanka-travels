import { cn } from "@/lib/utils";

/** Read-only 5-star Google review rating with gold stars and accessible label. */
export default function StarRating({ rating = 5, size = "size-[19px]", className }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn(size, i < rating ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-gray-200 text-gray-200")}
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

