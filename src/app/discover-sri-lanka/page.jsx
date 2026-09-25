import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Compass,
  Leaf,
  Sun,
  Mountain,
  Fish,
  Utensils,
  Heart,
  Zap,
  Waves,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { whatsappTemplates } from "@/data/site";
import { cn } from "@/lib/utils";
import FinalCta from "@/components/sections/FinalCta";

// ─── Page-level data ────────────────────────────────────────────────

const pageHero = {
  eyebrow: "Destinations · Experiences · Culture · Nature",
  heading: "Discover Sri Lanka",
  copy: "A teardrop island with ancient kingdoms, misty highlands, golden coastlines, thundering waterfalls and extraordinary wildlife. Every corner of Sri Lanka holds a different world waiting to be explored.",
  subCopy:
    "Use this guide to learn what makes the island so remarkable then let us turn it into the journey of a lifetime, planned precisely around your dates, interests and pace.",
};

const destCards = [
  {
    name: "Wilpattu National Park",
    tag: "Wildlife Safari",
    blurb:
      "Sri Lanka's largest national park, home to leopards, bears and hundreds of bird species roaming through ancient lake-filled wilderness.",
    href: "/destinations/wilpattu",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=900&q=75",
  },
  {
    name: "Sigiriya",
    tag: "Cultural Triangle",
    blurb:
      "Climb the legendary Lion Rock fortress rising 200 m from the jungle floor — one of the world's most dramatic ancient monuments.",
    href: "/destinations/sigiriya",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=75",
  },
  {
    name: "Polonnaruwa",
    tag: "Ancient Kingdom",
    blurb:
      "Walk among the ruins of Sri Lanka's medieval capital — colossal Buddha statues, royal palaces and centuries-old irrigation tanks.",
    href: "/destinations/polonnaruwa",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=75",
  },
  {
    name: "Kandy",
    tag: "Hill Country & Culture",
    blurb:
      "Home to the Sacred Temple of the Tooth, misty hills, spice gardens and vibrant Kandyan dance — a must on every Sri Lanka journey.",
    href: "/destinations/kandy",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=75",
  },
  {
    name: "Ella",
    tag: "Mountains & Waterfalls",
    blurb:
      "A laid-back mountain village with breathtaking ridge-top views, cascading waterfalls and the iconic Nine Arch Bridge.",
    href: "/destinations/ella",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=75",
  },
  {
    name: "Dambulla",
    tag: "Cave Temples",
    blurb:
      "Explore five cave temples adorned with 150 Buddha statues and ancient frescoes — a UNESCO World Heritage treasure of extraordinary calm.",
    href: "/destinations/dambulla",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=75",
  },
];

const experienceCards = [
  {
    label: "Yoga & Meditation",
    blurb:
      "Find stillness at hilltop retreats and jungle eco-lodges. Sri Lanka's mountain air is made for sunrise yoga sessions.",
    href: "/experiences/wellness",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Wildlife & Birding",
    blurb:
      "From leopard safaris in Yala to whale watching off Mirissa, the island offers extraordinary encounters with nature.",
    href: "/experiences/wildlife",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Ayurveda & Wellness",
    blurb:
      "Traditional Ayurvedic treatments have been practiced in Sri Lanka for over 3,000 years. Restore your balance, naturally.",
    href: "/experiences/wellness",
    image:
      "https://images.unsplash.com/photo-1476673160081-cf065607f449?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Shopping & Markets",
    blurb:
      "Vibrant local markets, handwoven textiles, spice stalls and artisan gem workshops — Sri Lanka's colour in full.",
    href: "/experiences/culture",
    image:
      "https://images.unsplash.com/photo-1487530811015-780780169300?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Sri Lankan Flavours",
    blurb:
      "Hoppers, kottu, pol sambol and fresh-caught seafood. Cooking classes, spice garden tours and village feasts await.",
    href: "/experiences/food",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Traditional Art & Craft",
    blurb:
      "Lacquer work, mask carving, batik and the art of weaving — meet the master artisans keeping ancient crafts alive.",
    href: "/experiences/culture",
    image:
      "https://images.unsplash.com/photo-1500423079914-b65af272b8db?auto=format&fit=crop&w=900&q=75",
  },
];

const quickLinks = [
  { label: "Destinations", href: "/destinations", icon: MapPin },
  { label: "Experiences", href: "/experiences", icon: Compass },
  { label: "Travel Guide", href: "/discover-sri-lanka/travel-guide", icon: Leaf },
  { label: "Travel Tips", href: "/discover-sri-lanka/travel-tips", icon: Heart },
  { label: "Best Time to Visit", href: "/discover-sri-lanka/best-time-to-visit", icon: Sun },
  { label: "Visa Information", href: "/discover-sri-lanka/visa-information", icon: Fish },
];

const fastFacts = [
  { value: "65,610 km²", label: "Total land area" },
  { value: "8", label: "UNESCO Heritage Sites" },
  { value: "26", label: "National parks & reserves" },
  { value: "1,340 km", label: "Coastline" },
  { value: "2,500+", label: "Years of history" },
  { value: "450+", label: "Bird species" },
];

const travelTopics = [
  {
    label: "Sri Lanka Travel Guide",
    desc: "Essential planning tips, getting around, local customs and what to pack.",
    href: "/discover-sri-lanka/travel-guide",
    icon: Compass,
    bg: "bg-brand-sky",
    text: "text-brand-navy",
  },
  {
    label: "Best Time to Visit",
    desc: "Two monsoons, two coastlines and a highland that stays cool all year.",
    href: "/discover-sri-lanka/best-time-to-visit",
    icon: Sun,
    bg: "bg-amber-50",
    text: "text-amber-900",
  },
  {
    label: "Travel Tips",
    desc: "Practical advice on money, sim cards, food safety and staying healthy.",
    href: "/discover-sri-lanka/travel-tips",
    icon: Heart,
    bg: "bg-rose-50",
    text: "text-rose-900",
  },
  {
    label: "Visa Information",
    desc: "ETA requirements, processing time, fees and how to apply online.",
    href: "/discover-sri-lanka/visa-information",
    icon: Leaf,
    bg: "bg-emerald-50",
    text: "text-emerald-900",
  },
  {
    label: "All Destinations",
    desc: "Deep-dive guides to every major region, town and national park.",
    href: "/destinations",
    icon: MapPin,
    bg: "bg-indigo-50",
    text: "text-indigo-900",
  },
  {
    label: "All Experiences",
    desc: "Find the activities that match your interests — from safaris to cooking.",
    href: "/discover-sri-lanka/experiences",
    icon: Zap,
    bg: "bg-violet-50",
    text: "text-violet-900",
  },
];

// ─── Page Component ────────────────────────────────────────────────────

export default function DiscoverSriLankaPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden min-h-[58vh] lg:min-h-[68vh] flex items-end pb-16 lg:pb-24">
        <Image
          src="/Tea-plantation-1-scaled.webp"
          alt="Lush tea plantations in Sri Lanka's central highlands"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
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
            items={[{ label: "Home", href: "/" }, { label: "Discover Sri Lanka" }]}
            light
          />
          <h1 className="mt-4 max-w-4xl text-[2.5rem] font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
            {pageHero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/80 sm:text-base">
            {pageHero.copy}
          </p>
        </Container>
      </section>

      {/* ── 2. Intro Text + Fast Facts ────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionHeading
                lines={["The Teardrop of the", "Indian Ocean"]}
                align="center"
                className="mx-auto"
              />
            </Reveal>
            <p className="mt-6 text-[15px] leading-[1.9] text-black sm:text-base">
              {pageHero.subCopy}
            </p>
            <p className="mt-4 text-[15px] leading-[1.9] text-black sm:text-base">
              Within just a few hours’ drive you can stand among ancient ruins, sip tea on rolling
              highland estates, watch leopards stalk through savannah grass and cool off on a
              palm-fringed beach. Sri Lanka’s compact size is its greatest gift you can see
              extraordinary variety in even a short trip.
            </p>
          </div>
          <Reveal delay={0.1}>
            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-brand-line sm:grid-cols-3 lg:grid-cols-6">
              {fastFacts.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center justify-center gap-1 bg-white px-4 py-6 text-center"
                >
                  <dd className="text-[1.5rem] font-bold tracking-[-0.03em] text-brand-navy sm:text-[1.75rem]">
                    {f.value}
                  </dd>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-brand-muted">
                    {f.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ── 3. Destinations Grid ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-white">
        <Container className="relative">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading lines={["Iconic", "Destinations"]} />
            </Reveal>
            <p className="max-w-md text-[15px] leading-relaxed text-brand-muted lg:col-span-5">
              From ancient rock fortresses to tea-carpeted highlands, these are the places that make
              Sri Lanka so extraordinary.
            </p>
            <div className="lg:col-span-2 lg:text-right">
              <Button href="/destinations" variant="link" className="text-[14px]">
                <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                All Destinations
              </Button>
            </div>
          </div>

          {/* All 6 destination cards — unified tall portrait style */}
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destCards.map((d, i) => (
              <li key={d.name}>
                <Reveal delay={(i % 3) * 0.1}>
                  <Link
                    href={d.href}
                    className="group relative block overflow-hidden rounded-card bg-brand-navy shadow-card"
                    style={{ aspectRatio: "4/5" }}
                  >
                    <SmartImage
                      src={d.image}
                      alt={`${d.name}, Sri Lanka`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_40%,rgba(6,19,59,0.92)_100%)]"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-brand-navy-deep/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    {/* Default state */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
                      <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider">
                        {d.tag}
                      </span>
                      <p className="text-xl font-bold leading-tight sm:text-2xl">{d.name}</p>
                    </div>
                    {/* Hover state */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-2xl font-bold text-white">{d.name}</p>
                      <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                        {d.blurb}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-brand-navy transition-transform duration-300 group-hover:scale-105">
                        Explore
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Button href="/destinations" variant="primary" size="lg">
              Explore All Destinations
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 4. Sigiriya Scenic Divider ──────────────────────────────────── */}
      <section className="relative h-[320px] overflow-hidden lg:h-[420px]">
        <Image
          src="/experience-sigiriya.webp"
          alt="Sigiriya rock fortress rising above the Sri Lankan jungle"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,31,92,0.88) 0%, rgba(11,31,92,0.55) 55%, rgba(11,31,92,0.18) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                A UNESCO World Heritage Site
              </p>
              <h2 className="mt-3 max-w-xl text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                5th-century Sigiriya<br />
                <span className="font-light">Sri Lanka’s most iconic landmark</span>
              </h2>
              <Button
                href="/destinations/sigiriya"
                variant="outline"
                size="lg"
                className="mt-7"
              >
                Discover Sigiriya
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* ── 5. Experiences Grid ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-white">
        <Container className="relative">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading lines={["Unforgettable", "Experiences"]} />
            </Reveal>
            <p className="max-w-md text-[15px] leading-relaxed text-brand-muted lg:col-span-5">
              Every traveller connects with Sri Lanka in a different way. From ancient healing
              traditions to vibrant street markets, find your kind of adventure.
            </p>
            <div className="lg:col-span-2 lg:text-right">
              <Button
                href="/discover-sri-lanka/experiences"
                variant="link"
                className="text-[14px]"
              >
                <span className="grid size-9 place-items-center rounded-full bg-brand-navy text-white">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                All Experiences
              </Button>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experienceCards.slice(0, 3).map((exp, i) => (
              <li key={exp.label}>
                <Reveal delay={i * 0.1}>
                  <Link
                    href={exp.href}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white shadow-card"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={exp.image}
                        alt={exp.label}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-brand-navy">{exp.label}</h3>
                      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-brand-muted line-clamp-2">
                        {exp.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-blue">
                        Explore
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experienceCards.slice(3).map((exp, i) => (
              <li key={exp.label}>
                <Reveal delay={i * 0.1}>
                  <Link
                    href={exp.href}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-brand-line bg-white shadow-card"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={exp.image}
                        alt={exp.label}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-brand-navy">{exp.label}</h3>
                      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-black line-clamp-2">
                        {exp.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-blue">
                        Explore
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Button href="/discover-sri-lanka/experiences" variant="primary" size="lg">
              Explore All Experiences
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 6. Tea Plantation Scenic Banner ────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[460px] lg:h-[580px]">
          <Image
            src="/Tea-plantation-1-scaled.webp"
            alt="Rolling tea plantations in Nuwara Eliya, Sri Lanka"
            fill
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-20"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="px-5 text-center">
              <Reveal>
                <h2 className="mt-4 text-[2rem] font-bold leading-tight text-white drop-shadow-[0_2px_16px_rgba(6,19,59,0.5)] sm:text-5xl lg:text-6xl">
                  Where the Green<br className="hidden lg:block" /> Never Ends
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-white/85 drop-shadow sm:text-base">
                  Nuwara Eliya, Ella and Hatton sit atop the island’s spine, wrapped in emerald
                  tea-estate carpets and cool highland mist.
                </p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button href="/destinations/nuwara-eliya" variant="navy" size="lg">
                    Nuwara Eliya
                  </Button>
                  <Button href="/destinations/ella" variant="outline" size="lg">
                    Ella
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Plan Your Trip CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <Reveal>
                <SectionHeading lines={["Start Your Sri Lanka", "Journey Today"]} />
              </Reveal>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-brand-muted sm:text-base">
                Now that you’ve discovered what makes Sri Lanka extraordinary, let us help you
                experience it. Tell us where you want to go, what you love and how long you have —
                we’ll build a private journey around your vision.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "100% private tours — no group buses or shared vans",
                  "Flexible itineraries — change your mind on the road",
                  "Direct WhatsApp support from arrival to departure",
                  "Experienced local drivers who know every road",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] font-medium text-brand-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-sky text-brand-blue">
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/tailor-made-tours" size="lg" variant="primary">
                  Plan My Trip
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button href="/sri-lanka-itineraries" size="lg" variant="outline">
                  Browse Itineraries
                </Button>
              </div>
            </div>

            {/* Right collage */}
            <Reveal>
              <div className="relative grid grid-cols-12 gap-4">
                <div className="relative col-span-7 aspect-[4/5] overflow-hidden rounded-card shadow-card">
                  <SmartImage
                    src="/brand-beauty.jpg"
                    alt="Sri Lanka landscape"
                    fill
                    sizes="(min-width:1024px) 35vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative col-span-5 mt-14 aspect-[4/5] overflow-hidden rounded-card shadow-card">
                  <SmartImage
                    src="/brand-tranquility.jpg"
                    alt="Serene Sri Lanka beach"
                    fill
                    sizes="(min-width:1024px) 25vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />

      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
