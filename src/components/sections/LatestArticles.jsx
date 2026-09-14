import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { inspiration } from "@/data/home";
import { formatDate } from "@/lib/utils";

export default function LatestArticles() {
  const { featured, items } = inspiration;
  return (
    <section className="border-t border-brand-line bg-brand-mist py-20 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading lines={inspiration.heading} />
          </Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-brand-muted lg:col-span-4">{inspiration.copy}</p>
          <div className="lg:col-span-3 lg:text-right">
            <Button href={inspiration.cta.href} variant="link" className="text-[15px]">
              <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              {inspiration.cta.label}
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Featured article */}
          <article className="lg:col-span-7">
            <Link href={featured.href} className="group block overflow-hidden rounded-card bg-white shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[13px] font-semibold text-brand-blue">
                  {featured.category} · <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">{featured.excerpt}</p>
              </div>
            </Link>
          </article>

          {/* Secondary articles */}
          <div className="grid gap-5 lg:col-span-5">
            {items.map((a) => (
              <article key={a.href}>
                <Link
                  href={a.href}
                  className="group grid grid-cols-[120px_1fr] gap-5 overflow-hidden rounded-card bg-white p-3 shadow-card sm:grid-cols-[160px_1fr]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl sm:aspect-[4/3]">
                    <SmartImage
                      src={a.image}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-1 pr-3">
                    <p className="text-[12px] font-semibold text-brand-blue">
                      {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
                    </p>
                    <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-brand-navy group-hover:text-brand-blue">
                      {a.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-muted">
                      Read more
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
