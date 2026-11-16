import Image from "next/image";
import { PenLine, ShieldCheck, Check, ExternalLink, MessageCircle, Info } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FinalCta from "@/components/sections/FinalCta";
import ReviewsCarousel from "@/components/reviews/ReviewsCarousel";
import ReviewForm from "@/components/forms/ReviewForm";
import JsonLd from "@/components/seo/JsonLd";
import {
  reviewsHero,
  reviewPlatforms,
  trustPrinciples,
  reviewFaqs,
  getVisibleReviews,
  getVisiblePhotos,
} from "@/data/reviews";
import { getReviewTourOptions } from "@/lib/review-options";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guest Reviews – What Our Travellers Say",
  description:
    "Read reviews from travellers who explored Sri Lanka with Seren Lanka Travels, see photos from their journeys, and share your own experience.",
  path: "/reviews",
});

/*
 * No Review / AggregateRating structured data on purpose: reviews a business
 * publishes about itself are not eligible for Google review rich results, and
 * the content plan (§33) only allows it "where valid and compliant".
 */

export default function ReviewsPage() {
  const reviews = getVisibleReviews();
  const photos = getVisiblePhotos();
  const showingSamples = reviews.some((r) => r.isSample) || photos.some((p) => p.isSample);
  const google = reviewPlatforms.find((p) => p.id === "google");
  const tripadvisor = reviewPlatforms.find((p) => p.id === "tripadvisor");

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[62svh] -mt-[76px] lg:-mt-[88px] items-end overflow-hidden bg-brand-navy-deep">
        <Image
          src={reviewsHero.image}
          alt={Array.isArray(reviewsHero.heading) ? reviewsHero.heading.join(" ") : reviewsHero.heading}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 200vw, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative pb-24 pt-36 text-white lg:pb-28">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Reviews" },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {Array.isArray(reviewsHero.heading) ? reviewsHero.heading.join(" ") : reviewsHero.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            {reviewsHero.copy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#reviews" size="lg">
              Read Guest Reviews
            </Button>
            <Button href="/contact-us" variant="white" size="lg">
              Request Quote
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Guest reviews */}
      <section id="reviews" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-24">
        <Container className="relative">
          <Reveal>
            <SectionHeading lines={["In Our Guests’", "Own Words"]} align="center" className="mx-auto mt-3" />
          </Reveal>
          <p className="mx-auto mt-5 max-w-xl text-center text-[14px] lg:text-base leading-relaxed text-black">
            Real feedback from travellers who explored Sri Lanka with us – shown exactly as they wrote it.
          </p>

          <div className="mt-12">
            {reviews.length > 0 ? (
              <ReviewsCarousel reviews={reviews} rows={2} />
            ) : (
              <div className="mx-auto max-w-xl rounded-card border border-dashed border-brand-line bg-white p-8 text-center">
                <h3 className="text-xl font-bold text-brand-navy">Our first guest reviews are on their way</h3>
                <p className="mt-2 text-[15px] text-brand-muted">
                  Travelled with us recently? We would love to hear about your journey.
                </p>
                <Button href="#write-a-review" className="mt-5">
                  Write the first review
                </Button>
              </div>
            )}
          </div>


          {/* External Reviews Links */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
            <Button
              href="https://www.google.com/search?sca_esv=f0f7d3a8a529a5b8&hl=en-GB&authuser=0&sxsrf=AKL5yDiU-36HERbwYTvDsBFktCNkQum_Ig:1793792172506&kgmid=/g/11p29mgn2v&q=Seren+Lanka+Travels+Sri+Lanka&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=2c5cd0dc2089d3ce&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1"
              external
              variant="outline"
              size="lg"
              className="gap-2.5 px-6 shadow-sm hover:border-[#4285F4] hover:text-[#4285F4] hover:bg-white transition-all"
            >
              <svg viewBox="0 0 24 24" className="size-4.5 shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.89 0 12s.45 3.86 1.24 5.42l4.04-3.15Z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
              </svg>
              <span>See Google Reviews</span>
              <ExternalLink className="size-4 shrink-0 text-brand-muted" aria-hidden="true" />
            </Button>

            <Button
              href={"https://www.tripadvisor.com/Attraction_Review-g2550421-d34726277-Reviews-Seren_Lanka_Travels_Sri_Lanka-Katunayaka_Western_Province.html"}
              external
              variant="outline"
              size="lg"
              className="gap-2.5 px-6 shadow-sm hover:border-[#00aa6c] hover:text-[#00aa6c] hover:bg-white transition-all"
            >
              <Image
                src="/reviews/platforms/tripadvisor-icon.png"
                alt="Tripadvisor"
                width={20}
                height={20}
                className="size-5 shrink-0 rounded-full object-contain"
              />
              <span>See Tripadvisor Reviews</span>
              <ExternalLink className="size-4 shrink-0 text-brand-muted" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* 3. Traveller photos */}
      {photos.length > 0 && (
        <section className="pb-20 lg:pb-24">
          <Container>
            <Reveal>
              <SectionHeading lines={["Moments From", "Our Guests’ Journeys"]} align="center" className="mx-auto" />
            </Reveal>
            <p className="mx-auto mt-5 max-w-xl text-center text-[14px] lg:text-base leading-relaxed text-black">
              Photos shared by travellers who explored the island with us. Add yours when you submit a review.
            </p>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {photos.map((p) => (
                <li key={p.src} className="group relative aspect-square overflow-hidden rounded-card bg-brand-navy">
                  <SmartImage
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* 4. Where our reviews come from – Trusted by Travelers */}
      <section className="py-16 sm:pb-20 lg:pb-24">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Trusted by Travelers
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-center text-[14px] sm:text-base leading-relaxed text-black/80">
              We collect and share feedback from guests across every platform we&apos;re listed on. Ratings & review counts update in real time, visit them directly for the most current numbers. We value every review as it helps us improve our services and provide the best possible experience for our guests.
              
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              <Image
                src="/reviews/platforms/tripadvisor.png"
                alt="Tripadvisor"
                width={375}
                height={91}
                className="h-10 w-auto sm:h-12 lg:h-14 object-contain transition-transform duration-300 hover:scale-105"
              />
              <Image
                src="/reviews/platforms/getyourguide.png"
                alt="GetYourGuide"
                width={63}
                height={91}
                className="h-11 w-auto sm:h-13 lg:h-15 object-contain transition-transform duration-300 hover:scale-105"
              />
              <Image
                src="/reviews/platforms/airbnb.png"
                alt="Airbnb"
                width={91}
                height={91}
                className="h-11 w-auto sm:h-13 lg:h-15 object-contain transition-transform duration-300 hover:scale-105"
              />
              <Image
                src="/reviews/platforms/google.png"
                alt="Google"
                width={558}
                height={569}
                className="h-11 w-auto sm:h-13 lg:h-15 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5. FAQs */}
      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading lines={["Reviews", "FAQs"]} align="center" className="mx-auto" />
          </Reveal>
          <p className="mx-auto mt-5 max-w-xl text-center text-[14px] lg:text-base leading-relaxed text-black">
            How we collect, check and share guest feedback.
          </p>
          <div className="mx-auto mt-10 max-w-3xl rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
            <Accordion items={reviewFaqs} />
          </div>
        </Container>
      </section>

      {/* 6. Submit a review + trust & authenticity */}
      {/* <section id="write-a-review" className="scroll-mt-24  py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading lines={["Travelled With Us?", "Share Your Story"]} align="center" className="mx-auto" />
          </Reveal>
          <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-brand-muted">
            Your review helps future travellers plan their journey – and helps us keep improving.
          </p>

          <div className="mx-auto mt-12 max-w-3xl">
            <ReviewForm tourOptions={getReviewTourOptions()} />
          </div>
        </Container>
      </section> */}

      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <JsonLd data={faqJsonLd(reviewFaqs)} />
    </>
  );
}
