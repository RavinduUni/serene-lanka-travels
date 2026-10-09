import Link from "next/link";
import { Info } from "lucide-react";

const linkClass = "font-light text-black underline underline-offset-2 hover:text-brand-blue-dark break-words";

/** Renders text that may contain { label, href } links and { strong } bold parts. */
function RichText({ text }) {
  if (typeof text === "string") return text;
  return text.map((part, i) => {
    if (typeof part === "string") return <span key={i}>{part}</span>;
    if (part.strong) return <strong key={i} className="font-semibold text-black">{part.strong}</strong>;
    // mailto:/tel:/external links use a plain anchor; internal pages use next/link
    if (/^(mailto:|tel:|https?:)/.test(part.href)) {
      return (
        <a key={i} href={part.href} className={linkClass}>
          {part.label}
        </a>
      );
    }
    return (
      <Link key={i} href={part.href} className={linkClass}>
        {part.label}
      </Link>
    );
  });
}

/** Numbered legal sections – see block types in src/data/legal.js. */
export default function LegalBody({ sections }) {
  return (
    <div className="space-y-12">
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
          <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-black sm:text-3xl">
            {s.title}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-[1.85] text-black font-light sm:text-base">
            {s.body.map((b, j) => {
              if (b.type === "ul") {
                return (
                  <ul key={j} className="space-y-2.5">
                    {b.items.map((item, k) => (
                      <li key={k} className="flex gap-3">
                        <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-black" aria-hidden="true" />
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (b.type === "note") {
                return (
                  <p key={j} className="flex gap-3 font-medium text-black">
                    <span>
                      <RichText text={b.text} />
                    </span>
                  </p>
                );
              }
              return (
                <p key={j}>
                  <RichText text={b.text} />
                </p>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
