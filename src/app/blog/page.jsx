import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getBlogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { whatsappTemplates } from "@/data/site";

export const metadata = buildMetadata({
  title: "Sri Lanka Travel Journal – Guides, Tips & Inspiration",
  description:
    "In-depth Sri Lanka travel guides written by the people who drive these roads every week. Best time to visit, itinerary ideas, beach guides and first-timer tips.",
  path: "/blog",
});

/** Mirrors ExperienceCard exactly – image top, centred text, blue pill CTA. */
function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-gray-200 bg-white shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
        {/* Meta: date + reading time */}
        <p className="text-[12px] font-medium text-brand-muted flex justify-center gap-5">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-4 transition-transform" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4 transition-transform" aria-hidden="true" />
            {post.readingTime}
          </span>
        </p>
        <h2 className="mt-2 flex-1 text-[17px] font-bold leading-snug tracking-tight text-brand-navy group-hover:text-brand-blue">
          {post.title}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-brand-muted line-clamp-2">
          {post.excerpt}
        </p>
        <span className="mx-auto mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand-blue px-5 text-[13px] font-semibold text-white transition-colors group-hover:bg-brand-blue-dark">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/sigiriya.jpg"
          alt="Sri Lanka travel guides – tips, planning and inspiration"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay — same as experiences page */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,19,59,0.5) 0%, rgba(6,19,59,0.28) 35%, rgba(6,19,59,0.72) 68%, rgba(6,19,59,0.97) 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
            light
          />
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              Travel{" "}
              <span className="font-light">Journal</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            Guides written by the people who drive these roads every week – honest, practical and built around how real travellers explore Sri Lanka.
          </p>
        </Container>
      </section>

      {/* ── Card grid ────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
