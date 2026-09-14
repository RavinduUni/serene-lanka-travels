import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-[0_10px_24px_-10px_rgba(26,140,255,0.7)]",
  navy: "bg-brand-navy text-white hover:bg-brand-navy-deep",
  outline:
    "border border-brand-navy/20 text-brand-navy bg-white hover:border-brand-navy hover:bg-brand-mist",
  ghost:
    "border border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-brand-navy",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
  white: "bg-white text-brand-navy hover:bg-brand-sky",
  link: "text-brand-blue hover:text-brand-blue-dark",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

/** Renders a <Link> when `href` is given, otherwise a <button>. */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200",
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
