import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, Sparkles, MapPin, Compass, Binoculars, Heart, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GalleryGrid from "@/components/shared/GalleryGrid";
import ItineraryFactsCarousel from "@/components/tours/ItineraryFactsCarousel";
import RouteStrip from "@/components/tours/RouteStrip";
import DayByDay from "@/components/tours/DayByDay";
import InclusionsExclusions from "@/components/tours/InclusionsExclusions";
import PriceBlock from "@/components/tours/PriceBlock";
import RelatedItineraries from "@/components/tours/RelatedItineraries";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/seo/JsonLd";
import {
  getItineraries,
  getItineraryBySlug,
  getRelatedItineraries,
  getItineraryCategoryLabel,
} from "@/lib/content";
import { itineraryInclusions, itineraryExclusions, pricingNotice } from "@/data/itineraries";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

/** Prerender every published itinerary at build time. */
export function generateStaticParams() {
  return getItineraries().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getItineraryBySlug(slug);
  if (!tour) return {};
  return buildMetadata({
    title: tour.seoTitle,
    description: tour.metaDescription,
    path: `/sri-lanka-itineraries/${tour.slug}`,
    image: tour.heroImage,
  });
}

/** Small card used for "Things you will do" / "Optional experiences" columns. */
function ListCard({ title, Icon, items }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-card border border-brand-line bg-white p-6 shadow-card sm:p-7">
      <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] sm:text-base leading-relaxed text-black">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Google Maps embed for the "Journey Highlights" section (reference design).
 * Tours with a confirmed route get a driving route drawn between the stops;
 * concept tours (no route) show the island with the destinations listed beside it.
 * The key-less legacy embed endpoint is used, so no API key is required.
 */
function mapEmbedUrl(tour) {
  const place = (s) =>
    encodeURIComponent(`${/airport/i.test(s) ? "Bandaranaike International Airport" : s}, Sri Lanka`);
  if (Array.isArray(tour.route) && tour.route.length > 1) {
    const [first, ...rest] = tour.route;
    return `https://maps.google.com/maps?saddr=${place(first)}&daddr=${rest.map(place).join("+to:")}&output=embed`;
  }
  return "https://maps.google.com/maps?q=Sri+Lanka&z=7&output=embed";
}

/**
 * Builds the "Destinations Covered" cards from data that already exists on the tour.
 *
 * Per-stop customisation is driven by `tour.destinationDetails` in itineraries.js:
 *
 *   destinationDetails: [
 *     {
 *       name:   "Kandy",                        // must match a value in destinations[]
 *       images: [url1, url2],                   // exactly 2 image URLs for the card pair
 *       points: ["Point A", "Point B", ...],    // optional – overrides auto-generated bullets
 *     },
 *     ...
 *   ]
 *
 * If `destinationDetails` is omitted for a stop the component falls back to:
 *  - bullets: day-by-day points for that stop (or generated fallback text)
 *  - images:  two photos pulled from the tour's gallery[] array
 */

const DESTINATION_DESCRIPTIONS = {
  "Colombo": [
    "Discover the vibrant capital city, blending colonial architecture with modern skyscrapers",
    "Stroll along Galle Face Green for a scenic sunset over the Indian Ocean",
    "Explore bustling markets in Pettah and historic sites like Gangaramaya Temple",
    "Enjoy authentic Sri Lankan street food or fine dining experiences"
  ],
  "Kandy": [
    "Visit the sacred Temple of the Tooth Relic, a UNESCO World Heritage site",
    "Enjoy a scenic walk around the tranquil Kandy Lake",
    "Experience a traditional Kandyan cultural dance performance",
    "Explore the lush Royal Botanical Gardens in Peradeniya"
  ],
  "Nuwara Eliya": [
    "Experience the cool climate and colonial charm of 'Little England'",
    "Visit working tea estates and learn about world-famous Ceylon tea production",
    "Admire the scenic beauty of Gregory Lake and lush botanical gardens",
    "Play a round of golf at the historic Nuwara Eliya Golf Club or stroll through Victoria Park"
  ],
  "Ella": [
    "Hike to the iconic Nine Arches Bridge and watch the scenic train pass by",
    "Climb Little Adam's Peak for panoramic views of the rolling tea-covered hills",
    "Cool off at the stunning Ravana Falls located just outside the town",
    "Discover hidden caves and zip-line across the lush green valleys"
  ],
  "Yala": [
    "Embark on a thrilling jeep safari in Yala National Park",
    "Look out for the elusive Sri Lankan leopard, as Yala boasts one of the highest densities in the world",
    "Spot elephants, crocodiles, sloth bears, and diverse birdlife in their natural habitat",
    "Enjoy a magical evening relaxing at your wilderness lodge or luxury campsite"
  ],
  "Mirissa": [
    "Relax on the golden crescent beaches backed by palm trees",
    "Set sail on an early morning whale and dolphin watching excursion",
    "Enjoy vibrant sunset viewpoints and fresh coastal seafood",
    "Hike up to the iconic Coconut Tree Hill for a picture-perfect coastal view"
  ],
  "Galle": [
    "Wander the cobbled streets of the historic Galle Fort, a UNESCO World Heritage site",
    "Admire the iconic Galle Lighthouse and Dutch colonial architecture",
    "Explore boutique shops, art galleries, and quaint cafes hidden within the fort walls",
    "Walk along the ancient ramparts while watching a stunning Indian Ocean sunset"
  ],
  "Udawalawe": [
    "Take a safari through Udawalawe National Park, renowned for its large elephant population",
    "Watch herds of elephants feeding and bathing in the wild",
    "Spot diverse bird species, water buffalo, and crocodiles around the reservoir",
    "Visit the Udawalawe Elephant Transit Home to see orphaned elephant calves being fed"
  ],
  "Minneriya": [
    "Witness the famous 'Elephant Gathering' (seasonal) on the banks of the Minneriya reservoir",
    "Enjoy a jeep safari through the scrub jungles and wetlands",
    "Observe a variety of endemic birds and mammals in this wildlife haven",
    "Witness spectacular views of the sunset reflecting off the vast ancient reservoir"
  ],
  "Kaudulla": [
    "Experience a quieter but equally spectacular elephant safari at Kaudulla National Park",
    "Enjoy a scenic boat ride or jeep drive through the lush parklands",
    "Spot pelicans, painted storks, and other aquatic birds",
    "Immerse yourself in the tranquil, untouched beauty of the surrounding dry zone forests"
  ],
  "Chilaw": [
    "Visit the sacred Munneswaram and Manavari Temples, steeped in Ramayana legends",
    "Experience the vibrant local culture of this coastal fishing town",
    "Relax by the scenic lagoon and coastal stretches",
    "Take a tranquil boat ride through the Munneswaram lagoon and its mangrove ecosystems"
  ],
  "Trincomalee": [
    "Visit the magnificent Koneswaram Temple perched high on Swami Rock",
    "Enjoy the pristine white sands and calm waters of the east coast",
    "Spot deer wandering the town and explore the historic Fort Frederick",
    "Snorkel in the crystal-clear waters of Pigeon Island National Park"
  ],
  "Sigiriya": [
    "Climb the iconic Sigiriya Lion Rock, an ancient palace and fortress complex",
    "Marvel at the ancient frescoes and the mirrored wall",
    "Enjoy breathtaking 360-degree views of the surrounding jungle from the summit",
    "Explore the ancient water gardens and boulder gardens at the base of the rock"
  ],
  "Dambulla": [
    "Explore the Dambulla Cave Temple, a vast complex of ancient Buddhist shrines",
    "Admire the intricate cave paintings and hundreds of Buddha statues",
    "Take in panoramic views of the surrounding plains from the temple entrance",
    "Shop for local produce at the bustling Dambulla Dedicated Economic Centre, the island's largest vegetable market"
  ],
  "Anuradhapura": [
    "Wander through the ancient ruins of Sri Lanka's first capital city",
    "Visit the sacred Sri Maha Bodhi tree, the oldest historically documented tree in the world",
    "Marvel at the massive brick stupas like Ruwanwelisaya and Jetavanaramaya",
    "Admire the intricate ancient stone carvings like the Moonstones and Guardstones"
  ],
  "Polonnaruwa": [
    "Explore the well-preserved ruins of the ancient Kingdom of Polonnaruwa",
    "See the magnificent rock carvings of the Gal Vihara",
    "Cycle through the ancient city to discover palaces, temples, and statues",
    "Wander past the vast Parakrama Samudra, a massive 12th-century man-made reservoir"
  ],
  "Unawatuna": [
    "Swim in the calm, horseshoe-shaped bay perfect for relaxation",
    "Visit the Japanese Peace Pagoda for stunning views of the coastline",
    "Enjoy a vibrant evening atmosphere with beachfront dining and cafes",
    "Enjoy a refreshing drink at one of the laid-back beachfront restaurants"
  ],
  "Hikkaduwa": [
    "Snorkel in the shallow coral sanctuary to see colorful fish and sea turtles",
    "Catch some waves at one of the popular local surf breaks",
    "Experience the lively beach culture and sunset ocean views",
    "Take a glass-bottom boat ride to see the marine life without getting wet"
  ],
  "Bentota": [
    "Relax on the broad, golden sands of Bentota beach",
    "Take a scenic boat safari along the Madu River through mangrove forests",
    "Visit a local turtle hatchery dedicated to marine conservation",
    "Try exciting water sports like jet skiing, wakeboarding, or windsurfing on the river"
  ],
  "Weligama": [
    "Learn to surf in the gentle, rolling waves of Weligama Bay",
    "Spot the iconic stilt fishermen along the southern coastline",
    "Enjoy the relaxed, surf-town vibe and beachfront cafes",
    "Discover the vibrant local fish markets and sample freshly caught seafood"
  ],
  "Nilaveli": [
    "Relax on the untouched, powdery white sands of the east coast",
    "Take a short boat trip to Pigeon Island for world-class snorkeling",
    "Swim in the crystal-clear, calm waters ideal for families",
    "Experience the laid-back, serene atmosphere away from the busy southern beaches"
  ],
  "Sinharaja": [
    "Trek through the Sinharaja Forest Reserve, a UNESCO World Heritage tropical rainforest",
    "Spot endemic bird species, rare insects, and exotic reptiles",
    "Immerse yourself in the dense, lush greenery and cascading jungle streams",
    "Listen to the incredible chorus of tropical birds and insects in the dense canopy"
  ],
  "Kitulgala": [
    "Experience the thrill of white-water rafting on the Kelani River",
    "Trek through the jungle to discover hidden waterfalls and rock pools",
    "Enjoy adventure activities like canyoning, zip-lining, and bird watching",
    "Visit the scenic location where the classic movie 'The Bridge on the River Kwai' was filmed"
  ],
  "Pasikuda": [
    "Walk far out into the shallow, calm, reef-protected waters of the bay",
    "Relax in luxury on one of Sri Lanka's most beautiful east-coast beaches",
    "Enjoy water sports like snorkeling, windsurfing, and sailing",
    "Take a leisurely walk along the long, sweeping crescent of white sand"
  ],
  "Arugam Bay": [
    "Ride the world-renowned surf breaks on the east coast",
    "Experience the laid-back, bohemian surf culture of the town",
    "Take a lagoon safari to spot crocodiles, elephants, and abundant birdlife",
    "Enjoy the lively evening atmosphere with reggae bars and delicious local cafes"
  ],
  "Jaffna": [
    "Experience the unique Tamil culture, cuisine, and heritage of the northern peninsula",
    "Visit the colorful Nallur Kandaswamy Kovil and the historic Jaffna Fort",
    "Take a boat to the surrounding islands like Delft and Nagadeepa",
    "Taste unique local delicacies like fiery Jaffna crab curry and sweet Rio ice cream"
  ]
};

function buildDestinationCards(tour) {
  const days = Array.isArray(tour.dayByDay) ? tour.dayByDay : [];
  const gallery = tour.gallery || [];
  const details = tour.destinationDetails || [];

  // Assign each day to the LAST destination named in its title ("Kandy → Ella" → Ella)
  const pointsByDestination = {};
  days.forEach((d) => {
    const hit = tour.destinations
      .map((name) => ({ name, pos: d.title.lastIndexOf(name) }))
      .filter((x) => x.pos >= 0)
      .sort((a, b) => b.pos - a.pos)[0];
    if (hit) pointsByDestination[hit.name] = [...(pointsByDestination[hit.name] || []), ...d.points];
  });

  return tour.destinations.map((name, i) => {
    const custom = details.find((d) => d.name === name) || {};
    
    // Generate unique points if explicit points aren't provided
    const uniqueFallback = DESTINATION_DESCRIPTIONS[name] || [
      `Arrive in ${name} and settle into your carefully selected accommodation`,
      `Explore the unique landscapes, culture, and iconic sights that make ${name} a must-visit destination`,
      `Take advantage of the flexible schedule to discover hidden gems or simply relax and take in the atmosphere`
    ];

    const points = custom.points?.length ? custom.points : pointsByDestination[name]?.length ? pointsByDestination[name] : uniqueFallback;

    const images =
      custom.images?.length
        ? custom.images.slice(0, 2)
        : gallery.length
          ? [gallery[(i * 2) % gallery.length], gallery[(i * 2 + 1) % gallery.length]]
          : [];
    return { name, points, images };
  });
}

export default async function ItineraryPage({ params }) {
  const { slug } = await params;
  const tour = getItineraryBySlug(slug);
  if (!tour) notFound();

  const related = getRelatedItineraries(tour);
  const hasRoute = Array.isArray(tour.route) && tour.route.length > 1;
  const hasDays = Array.isArray(tour.dayByDay) && tour.dayByDay.length > 0;
  
  // Generate a detailed Day by Day array for tours that don't have one
  const detailedDayByDay = hasDays ? tour.dayByDay : tour.destinations.map((dest, i) => {
    const uniquePoints = DESTINATION_DESCRIPTIONS[dest] || [
      `Set out to explore the key highlights of ${dest} with your experienced driver`
    ];
    return {
      day: i + 1,
      title: i === 0 ? `Arrival · ${dest}` : `${tour.destinations[i - 1]} → ${dest}`,
      points: [
        i === 0 ? `Arrive in ${dest} and settle into your selected accommodation` : `Travel comfortably to ${dest} in your private air-conditioned vehicle`,
        ...uniquePoints,
        `Spend the evening at your leisure, enjoying authentic local dining or relaxing at your hotel`
      ]
    };
  });
  const faqs = tour.faqs || [];
  const whatsappMessage = whatsappTemplates.tour(tour.name);

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.metaDescription,
    url: new URL(`/sri-lanka-itineraries/${tour.slug}`, site.url).toString(),
    touristType: "International travellers",
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    ...(hasRoute
      ? {
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.route.map((stop, i) => ({ "@type": "ListItem", position: i + 1, name: stop })),
        },
      }
      : {}),
  };

  return (
    <>
      {/* Hero – full-bleed image with breadcrumbs, title, summary and CTAs overlaid */}
      <section className="relative flex min-h-[62svh] -mt-[76px] lg:-mt-[88px] items-end overflow-hidden bg-brand-navy-deep">
        <Image
          src={tour.heroImage}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
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
              { label: "Itineraries", href: "/sri-lanka-itineraries" },
              { label: tour.name },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {tour.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            {tour.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg">
              Request a Quote
            </Button>
            <WhatsAppButton size="lg" label="WhatsApp Enquiry" message={whatsappMessage} />
          </div>
        </Container>
      </section>

      {/* Intro + highlights */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading lines={["About this", "Itinerary"]} size="sm" />
              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-black sm:text-base">
                <p>
                  {tour.summary} Designed to offer a seamless and authentic experience, this journey ensures that every detail is taken care of so you can simply relax and enjoy the wonders of Sri Lanka.
                </p>
                <p>
                  Throughout your {tour.duration ? tour.duration.toLowerCase() : "trip"}, you will travel comfortably in a {tour.transportation ? tour.transportation.toLowerCase() : "private vehicle"}. With an {tour.driverGuide ? tour.driverGuide.toLowerCase() : "experienced driver"} handling the logistics, you have the freedom to fully immerse yourself in the experience. Like all our journeys, this is a fully customizable starting point—whether you want to upgrade your accommodation, adjust the pace, or add more time to explore {tour.destinations ? tour.destinations.slice(0, 2).join(" and ") : "the sights"}.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-card bg-brand-sky p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                  Tour highlights
                </h3>
                <ul className="mt-5 space-y-3">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[14px] sm:text-base font-medium leading-relaxed text-brand-ink">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-brand-blue">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* 7. Day-by-day – mist band like the reference */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Through the journey", "Day by Day"]} size="sm" />
          <div className="mt-6">
            <DayByDay items={detailedDayByDay} />
          </div>
        </Container>
      </section>

      {/* 6, 8, 11, 16. Destinations map + highlights, activities, optional experiences */}
      <section className="py-16 lg:py-24">
        <Container>
          
          {/* 8. Destinations Covered – stacked cards (reference day-card design) */}
          <div>
            <SectionHeading lines={["Destinations", "Covered"]} size="sm" />
            <ol className="mt-8 space-y-8">
              {buildDestinationCards(tour).map((d, i) => (
                <li
                  key={d.name}
                  className="relative rounded-2xl border border-brand-line bg-white p-6 pt-8 shadow-card sm:p-8 sm:pl-14"
                >
                  {/* Numbered badge overlapping the card corner */}
                  <span
                    className="absolute -left-3 -top-4 flex size-14 sm:size-16 flex-col items-center justify-center rounded-full bg-brand-blue text-white shadow-[0_10px_24px_-10px_rgba(26,140,255,0.8)] sm:-left-5 sm:-top-5 sm:size-20"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] font-semibold uppercase leading-none tracking-wide text-white/80 sm:text-[11px]">
                      Stop
                    </span>
                    <span className="mt-0.5 text-xl font-bold leading-none sm:text-2xl">{i + 1}</span>
                  </span>

                  <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <div className="lg:col-span-6">
                      <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-navy sm:text-[1.75rem]">
                        <MapPin className="size-5 shrink-0 text-brand-blue" aria-hidden="true" />
                        <span className="sr-only">Stop {i + 1}: </span>
                        {d.name}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {d.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[14px] sm:text-base leading-relaxed text-black">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {d.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:gap-4">
                        {d.images.map((src, j) => (
                          <div key={`${src}-${j}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-navy">
                            <SmartImage
                              src={src}
                              alt={`${d.name}, Sri Lanka`}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 pt-12 lg:pt-24">
            <ListCard title="Things you will do" Icon={Sparkles} items={tour.activities} />
            <ListCard title="Optional experiences" Icon={Star} items={tour.optionalExperiences} />
          </div>
        </Container>
      </section>

      {/* 14 + 15. Inclusions / exclusions */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading lines={["Inclusions &", "Exclusions"]} size="sm" />
          <div className="mt-8">
            <InclusionsExclusions inclusions={itineraryInclusions} exclusions={itineraryExclusions} />
          </div>
        </Container>
      </section>

      {/* Map Showcase Section */}
      <section className="bg-white py-6 lg:py-8 pb-24 lg:pb-24 overflow-hidden relative">
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Map Image */}
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex justify-center items-center">
              {tour.mapImage && tour.mapImage !== "/map-placeholder.jpg" ? (
                <Image
                  src={tour.mapImage}
                  alt={tour.mapTitle}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-[80%] h-[80%] border-2 border-dashed border-brand-blue/30 rounded-3xl flex items-center justify-center bg-white/50 backdrop-blur-sm">
                  <span className="text-brand-blue/60 font-semibold text-lg px-4 text-center">
                    Map Image Placeholder<br />(Add {tour.slug}-map.png)
                  </span>
                </div>
              )}
            </div>

            {/* Right: Map Content */}
            <div className="max-w-xl">
              <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight text-brand-navy sm:text-[2.5rem]">
                {tour.mapTitle}
              </h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-brand-ink sm:text-base">
                {tour.mapDescription?.[0]}
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-brand-ink sm:text-base">
                {tour.mapDescription?.[1]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 18. Gallery */}
      {/* <section className="bg-brand-mist py-16 lg:py-24">
        <Container>
          <SectionHeading lines={["Visual", "Journeys"]} align="center" size="sm" className="mx-auto" />
          <div className="mt-10">
            <GalleryGrid images={tour.gallery} alt={`${tour.name} – Sri Lanka`} />
          </div>
        </Container>
      </section> */}

      {/* 19. FAQ + quote form (reference "Everything you need to know") */}
      <section id="quote" className="scroll-mt-24 py-16 lg:py-24 bg-brand-mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="relative mb-8 hidden aspect-[16/9] overflow-hidden rounded-card lg:block">
                <SmartImage src={tour.gallery?.[1] || tour.heroImage} alt="" fill sizes="45vw" className="object-cover" />
              </div>
              <SectionHeading lines={["Everything", "You Need to Know"]} size="sm" />
              <div className="mt-6 rounded-card border border-brand-line bg-white px-6 shadow-card sm:px-8">
                <Accordion items={faqs} />
              </div>
            </div>
            <div className="lg:col-span-6">
              <QuoteForm tourName={tour.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* 20. Related tours */}
      <section className="py-16 lg:py-24">
        <Container>
          <RelatedItineraries tours={related} />
        </Container>
      </section>

      <FinalCta />

      <FloatingWhatsApp message={whatsappMessage} />
      <JsonLd data={touristTripJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
