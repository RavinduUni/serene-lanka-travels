import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";

/**
 * Breadcrumb trail + schema.org BreadcrumbList.
 * items: [{ label, href }] – the last item is the current page (no link).
 */
export default function Breadcrumbs({ items, light = false }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, site.url).toString() } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-[13px] font-medium ${
          light ? "text-white/75" : "text-brand-muted"
        }`}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {last || !item.href ? (
                <span aria-current="page" className={light ? "text-white" : "text-brand-ink"}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors ${light ? "hover:text-white" : "hover:text-brand-blue"}`}
                >
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
