/**
 * Home page content – mapped 1:1 to Content Plan §9 (Home Page Content Plan).
 * Copy here is the confirmed website copy from the plan; edit here, not in components.
 */
import { images } from "./images";

export const hero = {
  eyebrow: "Private tours · Tailor-made itineraries · Transfers",
  title: "Experience Sri Lanka Your Way",
  lead: "Private, flexible and unforgettable journeys across Sri Lanka.",
  copy:
    "Explore Sri Lanka with a local travel team that puts your comfort, interests and travel style first. Choose one of our ready-made tours or build a completely tailor-made journey around your dates, budget and favourite experiences.",
  image: images.hero,
  ctas: [
    { label: "Plan My Trip", href: "/tailor-made-tours", variant: "primary" },
    { label: "Explore Tours", href: "/sri-lanka-itineraries", variant: "white" },
  ],
};

/** §9 Section 2 */
export const intro = {
  heading: ["Discover Sri Lanka Like a Friend,", "Not Just a Tourist"],
  copy:
    "At Seren Lanka Travels, we believe the best journeys are personal. From the moment you arrive in Sri Lanka until the day you leave, we help you travel safely, comfortably and confidently with flexible planning, experienced local drivers and direct support whenever you need it.",
  points: [
    "Personalized private tours built around your dates and budget",
    "Experienced, English-speaking local drivers",
    "Direct WhatsApp support from arrival to departure",
  ],
  images: [images.introA, images.introB],
  cta: { label: "About Us", href: "/about-us" },
};

/** §9 Section 8 – Why Seren Lanka Travels (numbers traceable to the content plan) */
export const whyUs = {
  heading: ["Travel With", "Confidence"],
  copy:
    "We don't just take you around Sri Lanka. We help you experience Sri Lanka like a friend – with flexible planning, honest pricing and a local team beside you from arrival to departure.",
  stats: [
    { value: "6+", label: "Years travelling with guests from around the world" },
    { value: "7", label: "Private day tours across the island" },
    { value: "13+", label: "International markets we welcome guests from" },
    { value: "4 hrs", label: "To receive your final quotation via WhatsApp or call" },
  ],
  values: [
    { icon: "UserRound", label: "Private & personalized tours" },
    { icon: "Route", label: "Flexible itineraries" },
    { icon: "Car", label: "Experienced local drivers" },
    { icon: "Armchair", label: "Comfortable vehicles" },
    { icon: "MapPinned", label: "Local destination knowledge" },
    { icon: "MessageCircle", label: "Direct WhatsApp support" },
    { icon: "Plane", label: "Airport-to-airport assistance" },
    { icon: "Wallet", label: "Options for different budgets" },
  ],
};

/** §9 Section 3 – Explore Our Tours */
export const tourCategories = {
  heading: ["Explore", "Our Tours"],
  copy:
    "Ready-made Sri Lanka journeys for every travel style, all fully private and all customizable.",
  cta: { label: "View All Tours", href: "/sri-lanka-itineraries" },
  items: [
    { label: "Day Tours", href: "/day-tours", image: images.categories.dayTours },
    { label: "Multi-Day Sri Lanka Tours", href: "/sri-lanka-itineraries", image: images.categories.multiDay },
    { label: "Tailor-Made Tours", href: "/tailor-made-tours", image: images.categories.tailorMade },
    { label: "Honeymoon Tours", href: "/sri-lanka-tours/honeymoon", image: images.categories.honeymoon },
    { label: "Wildlife & Safari Tours", href: "/sri-lanka-tours/wildlife-safari", image: images.categories.wildlife },
    { label: "Cultural Tours", href: "/sri-lanka-tours/cultural-heritage", image: images.categories.cultural },
    { label: "Luxury Tours", href: "/sri-lanka-tours/luxury", image: images.categories.luxury },
    { label: "Budget Tours", href: "/sri-lanka-tours/budget", image: images.categories.budget },
  ],
};

/** §9 Section 4 – Build Your Own Sri Lanka Tour */
export const builderPromo = {
  heading: ["Your Holiday. Your Route.", "Your Style."],
  copy:
    "Choose your travel dates, destinations, accommodation style, vehicle and activities. Our Tailor-Made Tour Builder helps you create a Sri Lanka itinerary around your interests and receive an estimated tour price before sending your request to our team.",
  steps: [
    "Tell us about your trip",
    "Choose your destinations",
    "Pick your vehicle and accommodation",
    "Get your estimated price",
  ],
  cta: { label: "Build My Tour", href: "/tailor-made-tours/build" },
  images: [images.builderA, images.builderB],
};

/** §9 Section 5 – Featured Sri Lanka Journey (§16.1) */
export const featuredJourney = {
  watermark: "unforgettable",
  heading: ["See the Best of", "Sri Lanka"],
  badge: "Most popular tour",
  cardTitle: "Culture, tea country, wildlife and beaches in one private journey",
  duration: "7 Days / 6 Nights",
  copy:
    "A balanced introduction to Sri Lanka combining culture, tea country, mountains, wildlife and beaches – all at your own pace in a private vehicle.",
  route: ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Galle"],
  highlights: ["Tea country", "Waterfalls", "Mountains", "Wildlife", "Beaches", "Galle Fort"],
  image: images.featured,
  ctas: [
    { label: "Explore This Tour", href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka", variant: "primary" },
    { label: "Customize This Tour", href: "/tailor-made-tours/build", variant: "outline" },
  ],
};

/** §9 Section 6 – Experiences */
export const experiences = {
  heading: ["Find Your Kind of", "Sri Lanka"],
  copy: "Every traveller wants something different from the island. Start with what you love.",
  cta: { label: "Explore Experiences", href: "/experiences" },
  items: [
    { label: "Wildlife", blurb: "Leopards, elephants and birdlife on private safaris.", href: "/experiences/wildlife", image: images.experiences.wildlife },
    { label: "Culture & Heritage", blurb: "Sacred temples, ancient cities and living traditions.", href: "/experiences/culture", image: images.experiences.culture },
    { label: "Beaches", blurb: "Golden south-coast sands and quiet east-coast bays.", href: "/experiences/beaches", image: images.experiences.beaches },
    { label: "Adventure", blurb: "Rafting, surfing, hiking and zip-lining.", href: "/experiences/adventure", image: images.experiences.adventure },
    { label: "Nature", blurb: "Tea plantations, waterfalls and rainforest.", href: "/experiences/nature", image: images.experiences.nature },
    { label: "Food & Local Experiences", blurb: "Home cooking, spice gardens and village life.", href: "/experiences/food", image: images.experiences.food },
    { label: "Luxury", blurb: "Premium hotels, private chauffeurs and exclusive excursions.", href: "/experiences/luxury", image: images.experiences.luxury },
    { label: "Wellness", blurb: "Slow mornings, yoga and Ayurvedic calm.", href: "/experiences/wellness", image: images.experiences.wellness },
  ],
};

/** §9 Section 7 – Popular Destinations */
export const destinations = {
  heading: ["Popular", "Destinations"],
  copy: "The places our guests ask for most – and where every great Sri Lanka itinerary begins.",
  cta: { label: "Discover Sri Lanka", href: "/discover-sri-lanka" },
  items: [
    { name: "Kandy", tag: "Hill country & culture", blurb: "Home to the sacred Temple of the Tooth, misty hills, spice gardens and vibrant Kandyan dance a must on every Sri Lanka journey.", href: "/destinations/kandy", image: images.destinations.kandy },
    { name: "Sigiriya", tag: "Cultural Triangle", blurb: "Climb the legendary Lion Rock fortress rising 200m from the jungle floor, and explore the nearby cave temples of Dambulla.", href: "/destinations/sigiriya", image: images.destinations.sigiriya },
    { name: "Nuwara Eliya", tag: "Tea country", blurb: "Sri Lanka's 'Little England' rolling tea estates, colonial bungalows and crisp mountain air at 1,800m above sea level.", href: "/destinations/nuwara-eliya", image: images.destinations.nuwaraEliya },
    { name: "Ella", tag: "Mountains & waterfalls", blurb: "A laid-back mountain village with breathtaking ridge-top views, cascading waterfalls and the iconic Nine Arch Bridge.", href: "/destinations/ella", image: images.destinations.ella },
    { name: "Yala", tag: "Wildlife safari", blurb: "Sri Lanka's most famous national park home to the world's highest density of leopards, plus elephants, sloth bears and crocodiles.", href: "/destinations/yala", image: images.destinations.yala },
    { name: "Mirissa", tag: "Whales & beaches", blurb: "A crescent bay on the south coast known for blue whale watching, golden sand, fresh seafood and spectacular sunsets.", href: "/destinations/mirissa", image: images.destinations.mirissa },
    { name: "Galle", tag: "Colonial fort", blurb: "A UNESCO World Heritage fortress where Dutch colonial ramparts meet boutique cafés, art galleries and the sparkling Indian Ocean.", href: "/destinations/galle", image: images.destinations.galle },
    { name: "Bentota", tag: "Beach escape", blurb: "Sri Lanka's premier beach resort town calm lagoon waters for watersports, luxury spa retreats and palm-fringed shores.", href: "/destinations/bentota", image: images.destinations.bentota },
  ],
};

/** §9 Section 9 – Transfers */
export const transfers = {
  heading: ["From the Airport to", "Anywhere in Sri Lanka"],
  copy:
    "Private airport, hotel and city-to-city transfers with comfortable vehicles and experienced drivers – arranged around your flight, your hotel and your schedule.",
  services: ["Airport → Hotel", "Hotel → Hotel", "City → City", "Custom pickup & drop-off"],
  vehicles: [
    { name: "Sedan / Car", capacity: "Up to 3 passengers" },
    { name: "KDH Van (Flat Roof)", capacity: "Up to 5 passengers" },
    { name: "KDH Van (High Roof) / Luxury Van", capacity: "Up to 10 passengers" },
    { name: "Mini Bus", capacity: "Up to 20 passengers" },
    { name: "Large Bus", capacity: "Up to 32 passengers" },
  ],
  cta: { label: "Arrange a Transfer", href: "/transfers" },
  image: images.transfers,
};

/**
 * §9 Section 10 – Reviews.
 * SAMPLE CONTENT: replace with real Google / TripAdvisor / written testimonials when supplied.
 */
export const reviews = {
  watermark: "real stories",
  heading: ["Journeys Remembered", "by Our Guests"],
  items: [
    {
      name: "Guest name",
      country: "United Kingdom",
      tour: "See the Best of Sri Lanka · 7 days",
      rating: 5,
      text:
        "Sample testimonial – replace with a real guest review. Describe the driver, the flexibility of the route and the moments that made the trip memorable.",
      avatar: images.avatars.a,
    },
    {
      name: "Guest name",
      country: "Germany",
      tour: "Honeymoon Tour · 5 days",
      rating: 5,
      text:
        "Sample testimonial – replace with a real guest review. Guests often mention the WhatsApp support, comfortable vehicle and local recommendations.",
      avatar: images.avatars.b,
    },
    {
      name: "Guest name",
      country: "Australia",
      tour: "Kandy Day Tour",
      rating: 5,
      text:
        "Sample testimonial – replace with a real guest review. Keep each review short enough to read in a few seconds.",
      avatar: images.avatars.c,
    },
  ],
};

/** §9 Section 11 – Travel Inspiration (latest three guides; §25 topics) */
export const inspiration = {
  heading: ["Travel", "Inspiration"],
  copy: "Guides written by the people who drive these roads every week.",
  cta: { label: "Read the Travel Guide", href: "/blog" },
  featured: {
    title: "Best Time to Visit Sri Lanka",
    excerpt:
      "Two monsoons, two coastlines and a hill country that is cool all year – here is how to pick the right months for the trip you want.",
    category: "Planning",
    date: "2026-09-01",
    href: "/blog/best-time-to-visit-sri-lanka",
    image: images.articles.bestTime,
  },
  items: [
    {
      title: "Sri Lanka Travel Guide for First-Time Visitors",
      category: "Travel guide",
      date: "2026-08-24",
      href: "/blog/sri-lanka-travel-guide-first-time-visitors",
      image: images.articles.firstTime,
    },
    {
      title: "How Many Days Do You Need in Sri Lanka?",
      category: "Planning",
      date: "2026-08-12",
      href: "/blog/how-many-days-in-sri-lanka",
      image: images.articles.howManyDays,
    },
    {
      title: "Best Beaches in Sri Lanka",
      category: "Beaches",
      date: "2026-07-30",
      href: "/blog/best-beaches-in-sri-lanka",
      image: images.articles.beaches,
    },
  ],
};

/** §28 – Sitewide FAQ starter set */
export const faq = {
  heading: ["Everything", "You Need to Know"],
  image: images.faq,
  items: [
    {
      q: "Can I customize a Sri Lanka tour?",
      a: "Yes. Seren Lanka Travels offers flexible tailor-made journeys where travellers can select destinations, accommodation, activities, vehicle type and number of travel days.",
    },
    {
      q: "Do you provide private transportation?",
      a: "Yes. Private transport is available for Day Tours, multi-day journeys, airport transfers, hotel transfers and custom travel across Sri Lanka.",
    },
    {
      q: "Can you arrange airport pickup?",
      a: "Yes. Airport pickup and drop-off services are part of Seren Lanka Travels' transport offering.",
    },
    {
      q: "Can I travel with children?",
      a: "Yes. Family tours and child-friendly travel arrangements are available. Child pricing may vary depending on age, hotel, transport and activity providers.",
    },
    {
      q: "Can I change a ready-made itinerary?",
      a: "Yes. Every itinerary includes a Customize This Tour option that connects to the Tailor-Made Tour flow.",
    },
    {
      q: "Are prices fixed?",
      a: "Some prices may change according to travel dates, hotels, vehicle category, activities, availability and seasonal conditions. Final prices are confirmed before booking.",
    },
    {
      q: "How can I contact Seren Lanka Travels quickly?",
      a: "Use the WhatsApp button on any page – you will reach our team directly, with a prefilled message for the tour or service you are looking at.",
    },
  ],
};

/** §9 Section 12 – Final CTA */
export const finalCta = {
  heading: ["Ready to Experience", "Sri Lanka?"],
  copy:
    "Tell us where you want to go, what you love and how long you have. We'll help turn it into a journey worth remembering.",
  image: images.finalCta,
  ctas: [
    { label: "Plan My Trip", href: "/tailor-made-tours", variant: "primary" },
    { label: "WhatsApp Us", href: "whatsapp", variant: "whatsapp" },
  ],
};
