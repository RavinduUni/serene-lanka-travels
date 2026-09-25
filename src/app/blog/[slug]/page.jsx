import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, CalendarDays, ArrowLeft, MapPin, Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { site, whatsappTemplates } from "@/data/site";

/** Prerender all blog slugs at build time. */
export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

// ─── Category badge ───────────────────────────────────────────────────────────
const categoryColour = {
  Planning:       "bg-brand-sky text-brand-blue",
  "Travel guide": "bg-emerald-50 text-emerald-700",
  Beaches:        "bg-amber-50 text-amber-700",
};

function CategoryBadge({ category, large = false }) {
  const colour = categoryColour[category] || "bg-brand-sky text-brand-blue";
  return (
    <span
      className={`inline-block rounded-full font-bold uppercase tracking-wider ${colour} ${
        large ? "px-4 py-1.5 text-[12px]" : "px-3 py-0.5 text-[11px]"
      }`}
    >
      {category}
    </span>
  );
}

// ─── Article content renderer ─────────────────────────────────────────────────
function ArticleContent({ blocks }) {
  return (
    <div className="prose-article">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "intro":
            return (
              <p key={i} className="font-medium leading-[1.9] text-brand-ink text-[16px]">
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={i}
                className="mt-10 mb-4 text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-brand-navy sm:text-[1.75rem]"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={i} className="mt-5 text-[16px] leading-[1.9] text-brand-ink">
                {block.text}
              </p>
            );

          case "tip":
            return (
              <aside
                key={i}
                className="my-8 rounded-card border-l-4 border-brand-blue bg-brand-sky p-6"
              >
                <p className="text-[12px] font-bold uppercase tracking-widest text-brand-blue">
                  {block.heading}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-navy">{block.text}</p>
              </aside>
            );

          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-card border border-brand-line shadow-card">
                <table className="min-w-full divide-y divide-brand-line text-[14px]">
                  <thead className="bg-brand-mist">
                    <tr>
                      {block.headers.map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-[12px] font-bold uppercase tracking-wider text-brand-muted"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-line bg-white">
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="transition-colors hover:bg-brand-mist">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-5 py-4 leading-relaxed ${
                              ci === 0 ? "font-semibold text-brand-navy" : "text-brand-muted"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// ─── Related article card ─────────────────────────────────────────────────────
function RelatedCard({ post }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift h-full"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <SmartImage
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[12px]">
            <time dateTime={post.date} className="font-medium text-brand-muted">
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className="mt-3 text-[17px] font-bold leading-snug text-brand-navy transition-colors duration-200 group-hover:text-brand-blue">
            {post.title}
          </h3>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-blue">
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post, 3);

  // JSON-LD for the article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: new URL(site.logo, site.url).toString() } },
    url: new URL(`/blog/${post.slug}`, site.url).toString(),
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,19,59,0.35) 0%, rgba(6,19,59,0.15) 30%, rgba(6,19,59,0.70) 62%, rgba(6,19,59,0.97) 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            light
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <time dateTime={post.date} className="flex items-center gap-1.5 text-[13px] font-medium text-white/75">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(post.date)}
            </time>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/75">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
          <Reveal>
            <h1 className="mt-4 max-w-4xl text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
              {post.title}
            </h1>
          </Reveal>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            {post.excerpt}
          </p>
        </Container>
      </section>

      {/* ── Article body + sidebar ─────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Article body */}
            <div className="lg:col-span-8">
              <ArticleContent blocks={post.content} />

              {/* Back to blog link */}
              <div className="mt-12 border-t border-brand-line pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-muted transition-colors hover:text-brand-blue"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to Travel Journal
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Related destinations */}
                {post.relatedDestinations?.length > 0 && (
                  <div className="rounded-card border border-brand-line bg-brand-mist p-6">
                    <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-brand-muted">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      Featured Destinations
                    </p>
                    <ul className="mt-4 space-y-3">
                      {post.relatedDestinations.map((d) => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            className="group flex items-center justify-between rounded-xl border border-brand-line bg-white px-4 py-3 transition-all hover:border-brand-blue hover:shadow-card"
                          >
                            <div>
                              <p className="text-[15px] font-bold text-brand-navy transition-colors group-hover:text-brand-blue">
                                {d.name}
                              </p>
                              <p className="text-[12px] text-brand-muted">{d.tag}</p>
                            </div>
                            <ArrowRight className="size-4 text-brand-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Button href="/destinations" variant="outline" size="sm" className="w-full justify-center">
                        All Destinations
                      </Button>
                    </div>
                  </div>
                )}

                {/* Related tours */}
                {post.relatedTours?.length > 0 && (
                  <div className="rounded-card border border-brand-line bg-brand-mist p-6">
                    <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-brand-muted">
                      <Compass className="size-3.5" aria-hidden="true" />
                      Suggested Tours
                    </p>
                    <ul className="mt-4 space-y-3">
                      {post.relatedTours.map((t) => (
                        <li key={t.href}>
                          <Link
                            href={t.href}
                            className="group flex items-center justify-between rounded-xl border border-brand-line bg-white px-4 py-3 transition-all hover:border-brand-blue hover:shadow-card"
                          >
                            <p className="text-[14px] font-semibold text-brand-navy leading-snug transition-colors group-hover:text-brand-blue">
                              {t.label}
                            </p>
                            <ArrowRight className="ml-2 shrink-0 size-4 text-brand-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-blue" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Related articles ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <Reveal>
                <SectionHeading lines={["More from the", "Travel Journal"]} size="sm" />
              </Reveal>
              <Button href="/blog" variant="link" className="shrink-0 text-[14px]">
                <span className="grid size-8 place-items-center rounded-full bg-brand-navy text-white">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                View all
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <RelatedCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
