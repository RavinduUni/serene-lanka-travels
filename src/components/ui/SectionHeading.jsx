import { cn } from "@/lib/utils";

/**
 * Reference-style heading: first line light, second line bold.
 * lines = ["Light line", "Bold line"]
 */
export default function SectionHeading({
  lines,
  as: Tag = "h2",
  align = "left",
  size = "md",
  className,
  light = false,
}) {
  const [first, second] = lines;
  const sizeClass = {
    sm: "text-[1.75rem] sm:text-3xl",
    md: "text-[2rem] sm:text-4xl lg:text-[2.75rem]",
    lg: "text-4xl sm:text-5xl lg:text-6xl",
  }[size];

  return (
    <Tag
      className={cn(
        "heading-split",
        sizeClass,
        align === "center" && "text-center",
        light && "text-white",
        className
      )}
    >
      {first}
      {second && <strong>{second}</strong>}
    </Tag>
  );
}
