/**
 * Private Tour Packages – one data file drives /tour-packages (listing) and
 * /tour-packages/[slug] (one reusable template for every package).
 *
 * Source of truth: "Seren Lanka Travels – Tour Packages Design + Content Guide"
 * (Nov 2026). Copy below is the guide's ready-to-use website copy.
 *
 * ⚠ PRE-PUBLICATION: prices are the operator's supplied estimates and are NOT
 * verified (see `pricing.verified` and `openItems`). Hotels, meal plans and
 * exact ticket coverage are intentionally left unconfirmed – never invent them.
 * Open items are shown in a notice on the tour page in development only.
 *
 * Photos are the site's existing local images. Replace them with Seren Lanka's
 * approved photography before launch and keep every caption accurate.
 */

/* ----------------------------------------------------------- Filter vocabulary */

export const tourTypes = [{ id: "private", label: "Private Tours" }];

export const packageThemes = [
  { id: "beach", label: "Beach" },
  { id: "adventure", label: "Adventure" },
  { id: "wildlife", label: "Wildlife" },
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Nature" },
];

export const packageDestinations = [
  { id: "bentota", label: "Bentota" },
  { id: "galle-ahangama", label: "Galle / Ahangama" },
  { id: "mirissa", label: "Mirissa" },
  { id: "kandy", label: "Kandy" },
  { id: "nuwara-eliya", label: "Nuwara Eliya" },
  { id: "ella", label: "Ella" },
  { id: "yala", label: "Yala" },
  { id: "colombo", label: "Colombo" },
];

export const packageExperiences = [
  { id: "whale-watching", label: "Whale Watching" },
  { id: "snorkeling", label: "Snorkeling" },
  { id: "scuba-diving", label: "Scuba Diving" },
  { id: "surfing", label: "Surfing" },
  { id: "river-safari", label: "Madu River Boat Safari" },
  { id: "turtle-hatchery", label: "Turtle Hatchery" },
  { id: "jeep-safari", label: "Yala Jeep Safari" },
  { id: "elephants", label: "Pinnawala Elephant Orphanage" },
  { id: "temples", label: "Temples & Heritage" },
  { id: "gardens", label: "Gardens & Parks" },
  { id: "cultural-show", label: "Kandy Cultural Dance" },
  { id: "museum", label: "Colombo National Museum" },
];

export const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "duration-asc", label: "Duration: shortest first" },
  { id: "duration-desc", label: "Duration: longest first" },
];

/* --------------------------------------------------------------- Listing copy */

export const tourPackagesLanding = {
  seoTitle: "Sri Lanka Private Tour Packages | Seren Lanka Travels",
  metaDescription:
    "Explore private Sri Lanka tour packages with Seren Lanka Travels. Discover coastal escapes, cultural experiences, wildlife safaris and customizable itineraries.",
  h1: "Sri Lanka Private Tour Packages",
  intro:
    "Explore Sri Lanka your way with Seren Lanka Travels. Our private tour packages bring together scenic destinations, local experiences, comfortable accommodation and private transportation.",
  heroImage: "/mirissa.jpg",
  heroAlt: "Coconut Tree Hill above the ocean in Mirissa, Sri Lanka",
  explore: {
    heading: ["Explore Our", "Private Tours"],
    copy: "Choose from our carefully planned Sri Lanka itineraries, with the freedom to personalize your holiday around your travel dates and interests.",
  },
  benefits: {
    heading: ["Why Travel", "Privately?"],
    items: [
      {
        icon: "CarFront",
        title: "Private Transportation",
        copy: "Travel with your own private vehicle throughout your selected tour.",
      },
      {
        icon: "Route",
        title: "Flexible Itineraries",
        copy: "Adjust destinations and activities to match your interests.",
      },
      {
        icon: "Headset",
        title: "Local Travel Support",
        copy: "Plan your journey with a team that knows Sri Lanka.",
      },
    ],
  },
  customCta: {
    heading: "Your Sri Lanka Holiday, Your Way",
    copy: "Have a different destination or travel experience in mind? Tell us what you're looking for, and we'll help you plan a private tour around your preferences.",
    button: "Customize My Tour",
    image: "/day-tours/ella/tea-country.webp",
  },
};

/** Short condition shown under every price (guide §02). */
export const priceCondition =
  "Final pricing depends on travel dates, group size, accommodation and selected activities.";

export const enquiryCopy = {
  heading: "Plan Your Private Sri Lanka Tour",
  copy: "Interested in this tour? Share your travel plans with us, and our team will help you arrange a private Sri Lanka holiday.",
};

/* ---------------------------------------------------------------------- FAQs */
/* Guide §13 – suggested copy, to be checked against operating terms. */

const faq = {
  private: {
    q: "Are these private tours?",
    a: "Yes. These itineraries are designed as private tours with a dedicated vehicle for the booked travelers.",
  },
  customize: {
    q: "Can I customize the itinerary?",
    a: "Yes. Tell us your preferred dates, destinations and activities when you request a quote.",
  },
  perPerson: {
    q: "Are the listed prices per person?",
    a: "The website presents estimated starting prices per person. The final quotation will depend on the confirmed travel details and package inclusions.",
  },
  accommodation: {
    q: "Are accommodation and meals included?",
    a: "Accommodation is part of the proposed package. Hotel names, room categories and meal plans will be confirmed in your quotation.",
  },
  tickets: {
    q: "Are tickets and activities included in the price?",
    a: "The packages list planned sightseeing and activities. Your final quotation will specify which entrance fees and activity tickets are included.",
  },
  marine: {
    q: "Are whale watching and scuba diving available year-round?",
    a: "Marine excursions depend on seasonal operations, weather and sea conditions. Activities will be confirmed for your travel dates.",
  },
  leopard: {
    q: "Is a leopard sighting guaranteed in Yala?",
    a: "No. Yala is a wildlife destination, and sightings of individual species cannot be guaranteed.",
  },
  airport: {
    q: "Can airport transfers be arranged?",
    a: "Private airport transfers are included in the itinerary plan, subject to the confirmed flight schedule and booking terms.",
  },
};

/* ------------------------------------------------------------------ Packages */

export const tourPackages = [
  /* ===================================================== Package 01 (5 days) */
  {
    slug: "5-day-sri-lanka-beach-tour",
    published: true,
    order: 1,
    shortName: "Southern Coastal Escape",
    title: "5 Days in Sri Lanka – Southern Coastal Escape",
    h1: "5 Days in Sri Lanka – Southern Coastal Escape",
    seoTitle: "5 Day Sri Lanka Beach Tour | Seren Lanka Travels",
    metaDescription:
      "Discover Bentota, Galle, Ahangama and Mirissa on a 5-day private Sri Lanka tour featuring beaches, water sports and whale watching.",
    days: 5,
    nights: 4,
    tourType: "private",
    themes: ["beach", "adventure", "nature"],
    destinations: ["bentota", "galle-ahangama", "mirissa"],
    experiences: ["whale-watching", "scuba-diving", "snorkeling", "river-safari", "turtle-hatchery", "surfing"],
    routeShort: ["Bentota", "Ahangama / Galle", "Mirissa"],
    cardDescription:
      "Discover Sri Lanka's southern coast with beach time, surfing, snorkeling, scuba diving and a whale-watching experience. Explore the Madu River and learn about sea turtles along the way.",
    summary:
      "Explore Sri Lanka's beautiful southern coastline on a five-day private holiday. Stay in Bentota, discover the coastal charm of Galle and Ahangama, and continue to Mirissa for marine adventures. From river safaris and turtle conservation experiences to surfing, snorkeling, scuba diving and whale watching, this journey is ideal for travelers who enjoy the ocean and a relaxed coastal atmosphere.",
    transport: "Private sedan for 5 days",
    transportShort: "Private sedan",
    routeLabel: "Airport → Bentota (2 nights) → Ahangama/Galle (1 night) → Mirissa (1 night) → Airport",
    activities: [
      "Whale Watching",
      "Scuba Diving",
      "Snorkeling",
      "Madu River Boat Safari",
      "Turtle Hatchery",
      "Surfing",
    ],
    pricing: {
      usd: 400,
      lkr: 132000,
      per: "person",
      // BLOCKER (guide §02/§15): supplied cost items sum to LKR 224,500,
      // not LKR 132,000. Do not publish or take payment until confirmed.
      verified: false,
    },
    cardImage: { src: "/destinations/mirissa.webp", alt: "Parrot Rock off Mirissa Beach on Sri Lanka's south coast" },
    heroImage: { src: "/day-tours/bentota/beach.webp", alt: "Golden sand and blue sky on Bentota Beach, Sri Lanka" },
    gallery: [
      { src: "/day-tours/bentota/beach.webp", caption: "Bentota Beach" },
      { src: "/mirissa.jpg", caption: "Coconut Tree Hill, Mirissa" },
      { src: "/day-tours/galle/lighthouse.webp", caption: "Galle Lighthouse on the southern coast" },
      { src: "/day-tours/bentota/madu-river.webp", caption: "Madu River" },
      { src: "/itineraries/hero/whalewatching.png", caption: "Whale watching" },
      { src: "/destinations/mirissa2.webp", caption: "Snorkeling with sea turtles" },
      { src: "/destinations/weligama1.webp", caption: "Surfers on the south coast" },
    ],
    mapStops: [
      { name: "Bandaranaike International Airport", query: "Bandaranaike International Airport, Sri Lanka", label: "Arrival", type: "airport" },
      { name: "Bentota", query: "Bentota, Sri Lanka", label: "2 nights", type: "overnight" },
      { name: "Ahangama / Galle", query: "Ahangama, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Mirissa", query: "Mirissa, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Bandaranaike International Airport", query: "Bandaranaike International Airport, Sri Lanka", label: "Departure", type: "airport" },
    ],
    mapNote: "The overnight stop between Ahangama and Galle is confirmed with your final itinerary.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Sri Lanka & Transfer to Bentota",
        intro:
          "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, begin your private journey to Bentota, a coastal town known for its beautiful beaches and relaxing atmosphere.",
        image: { src: "/day-tours/bentota/beach.webp", alt: "Bentota Beach on Sri Lanka's west coast" },
        activities: [
          "Airport arrival and private transfer to Bentota.",
          "Hotel check-in and time to relax after your journey.",
          "Enjoy leisure time along Bentota Beach.",
        ],
        highlights: [
          { name: "Bentota Beach", image: "/day-tours/bentota/beach.webp" },
          { name: "Tropical coastline", image: "/day-tours/bentota/bentota.webp" },
          { name: "Beach sunset" },
        ],
        overnight: "Bentota",
        transport: "Private sedan",
      },
      {
        day: 2,
        title: "Madu River Safari & Turtle Experience",
        intro:
          "Discover another side of Sri Lanka's southern coast with a boat safari through the mangrove-lined waterways of the Madu River. Continue with a visit to a turtle hatchery to learn about sea turtles and local conservation efforts.",
        image: { src: "/day-tours/bentota/madu-river.webp", alt: "A boat on the Madu River near Bentota" },
        activities: ["Madu River Boat Safari.", "Turtle Hatchery visit.", "Return to Bentota for your second night."],
        highlights: [
          { name: "Madu River", image: "/day-tours/bentota/madu-river.webp" },
          { name: "Mangroves", image: "/day-tours/bentota/lagoon.webp" },
          { name: "Turtle hatchery", image: "/day-tours/bentota/sea-turtle.webp" },
        ],
        overnight: "Bentota",
        transport: "Private sedan",
      },
      {
        day: 3,
        title: "Bentota to Galle / Ahangama",
        intro:
          "Travel along Sri Lanka's southern coastline towards Galle or Ahangama. This part of the island is known for its surf spots, coastal scenery and laid-back atmosphere.",
        image: { src: "/day-tours/galle/galle-hero.webp", alt: "The coastline and lighthouse at Galle" },
        activities: [
          "Private transfer from Bentota to Ahangama / Galle.",
          "Surfing experience, subject to suitable conditions.",
          "Free time to explore the coastline.",
          "Optional stop at Galle Fort, if agreed in the finalized itinerary.",
        ],
        highlights: [
          { name: "Surfing beaches", image: "/destinations/weligama1.webp" },
          { name: "Coastal scenery", image: "/day-tours/galle/lighthouse.webp" },
          { name: "Galle Fort (optional)", image: "/day-tours/galle/galle-fort.webp" },
        ],
        overnight: "Ahangama or Galle",
        transport: "Private sedan",
      },
      {
        day: 4,
        title: "Mirissa Marine Adventures",
        intro:
          "Continue towards Mirissa, one of Sri Lanka's best-known coastal destinations. Spend the day enjoying the marine experiences included in your selected itinerary, with activities planned around local sea conditions.",
        image: { src: "/destinations/mirissa.webp", alt: "Turquoise water around Parrot Rock in Mirissa" },
        activities: [
          "Transfer to Mirissa.",
          "Whale Watching excursion, subject to season and departure times.",
          "Snorkeling experience.",
          "Scuba Diving experience.",
          "Relax at Mirissa Beach.",
        ],
        highlights: [
          { name: "Whale Watching", image: "/itineraries/hero/whalewatching.png" },
          { name: "Snorkeling", image: "/destinations/mirissa2.webp" },
          { name: "Scuba diving" },
          { name: "Mirissa Beach", image: "/destinations/mirissa.webp" },
        ],
        overnight: "Mirissa",
        transport: "Private sedan",
        internalNote:
          "Day 4 groups whale watching, snorkeling and diving on the same day. Confirm timings, weather and safety requirements; re-allocate activities if needed.",
      },
      {
        day: 5,
        title: "Mirissa to Airport",
        intro:
          "Enjoy your final morning on Sri Lanka's southern coast before beginning the private transfer to Bandaranaike International Airport. Departure arrangements will be planned according to your flight schedule.",
        image: { src: "/mirissa.jpg", alt: "Palm trees on Coconut Tree Hill, Mirissa" },
        activities: ["Hotel check-out.", "Private transfer to the airport.", "End of tour."],
        highlights: [{ name: "Mirissa coastline", image: "/mirissa.jpg" }, { name: "Final beach views, depending on flight timing" }],
        overnight: null,
        transport: "Departure transfer by private sedan",
      },
    ],
    inclusions: [
      "Four nights of accommodation: Bentota (2), Ahangama/Galle (1) and Mirissa (1).",
      "Private sedan transportation for the five-day tour.",
      "Airport pickup and departure transfer, subject to the agreed flight schedule.",
      "Listed activities and tickets to the extent specified in your confirmed quotation.",
    ],
    exclusions: [
      "Meals, unless included in the hotel meal plan confirmed in your quotation.",
      "International flights and visa fees.",
      "Tips and personal expenses.",
      "Entrance fees and activities not listed in your confirmed quotation.",
    ],
    goodToKnow: [
      "Hotel names, room categories and meal plans are confirmed in your quotation.",
      "Marine activities are weather-dependent and only operate in safe sea conditions.",
      "Instructors, diving equipment, boat excursions and entrance charges are covered only where your quotation states it.",
      "Whale and marine sightings are not guaranteed.",
    ],
    faqs: [faq.private, faq.customize, faq.perPerson, faq.accommodation, faq.tickets, faq.marine, faq.airport],
    related: ["8-day-sri-lanka-private-tour"],
    openItems: [
      "BLOCKER – Price: supplied cost items total LKR 224,500 but the supplied package figure is LKR 132,000 (USD 400). Confirm the per-person sale price.",
      "Confirm traveler count, room-sharing (twin/single) rules, child policy and minimum party size.",
      "Confirm hotels, room categories, meal plans and the exact overnight stop (Ahangama or Galle).",
      "Confirm which paid experiences, tickets, instructors and equipment are included.",
      "Check the Day 4 whale watching + snorkeling + diving combination for timings and safety.",
      "Replace placeholder photos with approved, accurately captioned Seren Lanka images.",
    ],
  },

  /* ===================================================== Package 02 (8 days) */
  {
    slug: "8-day-sri-lanka-private-tour",
    published: true,
    order: 2,
    shortName: "Sri Lanka Discovery Journey",
    title: "8 Days in Sri Lanka – Discovery Journey",
    h1: "8 Days in Sri Lanka – Culture, Hills, Wildlife & Beaches",
    seoTitle: "8 Day Sri Lanka Private Tour | Seren Lanka Travels",
    metaDescription:
      "Explore Kandy, Nuwara Eliya, Ella, Yala, Mirissa and Colombo with an 8-day private Sri Lanka tour covering culture, wildlife and beaches.",
    days: 8,
    nights: 7,
    tourType: "private",
    themes: ["culture", "nature", "wildlife", "beach"],
    destinations: ["kandy", "nuwara-eliya", "ella", "yala", "mirissa", "colombo"],
    experiences: [
      "elephants",
      "gardens",
      "cultural-show",
      "temples",
      "jeep-safari",
      "whale-watching",
      "scuba-diving",
      "snorkeling",
      "river-safari",
      "turtle-hatchery",
      "museum",
    ],
    routeShort: ["Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Colombo"],
    cardDescription:
      "Experience the variety of Sri Lanka in eight days, from Kandy's cultural landmarks and Nuwara Eliya's hill country to a Yala jeep safari, southern beaches and the sights of Colombo.",
    summary:
      "Experience the diversity of Sri Lanka on an eight-day private tour through its cultural heart, scenic hill country, national parks and southern beaches. Discover the heritage of Kandy, the cool landscapes of Nuwara Eliya, the natural beauty of Ella and the wildlife of Yala. Continue to Mirissa for coastal adventures before completing your journey in Colombo.",
    transport: "Sedan for 8 days + Yala safari jeep for excursion",
    transportShort: "Private sedan + safari jeep",
    routeLabel:
      "Airport → Kandy (2) → Nuwara Eliya (1) → Ella (1) → Yala (1) → Mirissa (1) → Colombo (1) → Airport",
    activities: [
      "Pinnawala Elephant Orphanage",
      "Royal Botanical Gardens",
      "Kandy Cultural Dance",
      "Temple of the Tooth",
      "Bahirawakanda Temple",
      "Victoria Park",
      "Gregory Lake",
      "Moon Plains",
      "Ravana Cave",
      "Yala Jeep Safari",
      "Whale Watching",
      "Scuba Diving",
      "Snorkeling",
      "Madu River Boat Safari",
      "Turtle Hatchery",
      "Colombo National Museum",
    ],
    pricing: {
      usd: 1245,
      lkr: 410590,
      per: "person",
      // Guide §09/§15: arithmetic is correct, but confirm this is the
      // per-person selling price and not the total trip cost.
      verified: false,
    },
    cardImage: { src: "/day-tours/ella/nine-arch.webp", alt: "A blue train crossing the Nine Arches Bridge in Ella, Sri Lanka" },
    heroImage: { src: "/day-tours/ella/tea-country.webp", alt: "Tea-covered hills and a train bridge in Sri Lanka's hill country" },
    gallery: [
      { src: "/day-tours/kandy.webp", caption: "Temple of the Tooth, Kandy" },
      { src: "/day-tours/nuwaraeliya/tea-plantation.webp", caption: "Tea country near Nuwara Eliya" },
      { src: "/day-tours/ella/nine-arch.webp", caption: "Nine Arches Bridge, Ella" },
      { src: "/destinations/Yala.webp", caption: "Leopard in Yala National Park" },
      { src: "/destinations/mirissa.webp", caption: "Mirissa" },
      { src: "/destinations/Colombo.webp", caption: "Colombo" },
    ],
    mapStops: [
      { name: "Bandaranaike International Airport", query: "Bandaranaike International Airport, Sri Lanka", label: "Arrival", type: "airport" },
      { name: "Pinnawala Elephant Orphanage", query: "Pinnawala Elephant Orphanage, Sri Lanka", label: "Visit on Day 1", type: "visit" },
      { name: "Kandy", query: "Kandy, Sri Lanka", label: "2 nights", type: "overnight" },
      { name: "Nuwara Eliya", query: "Nuwara Eliya, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Ella", query: "Ella, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Yala area", query: "Yala National Park, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Mirissa", query: "Mirissa, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Colombo", query: "Colombo, Sri Lanka", label: "1 night", type: "overnight" },
      { name: "Bandaranaike International Airport", query: "Bandaranaike International Airport, Sri Lanka", label: "Departure", type: "airport" },
    ],
    mapNote: null,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Journey to Kandy",
        intro:
          "Begin your Sri Lankan holiday with a private transfer from the airport to Kandy. Along the way, visit Pinnawala Elephant Orphanage, a well-known destination where visitors can observe elephants.",
        image: { src: "/day-tours/kandy/viewpoint.webp", alt: "Kandy Lake and the city seen from a viewpoint" },
        activities: [
          "Arrival at Bandaranaike International Airport.",
          "Private transfer towards Kandy.",
          "Visit Pinnawala Elephant Orphanage.",
          "Hotel check-in and relaxation.",
        ],
        highlights: [
          { name: "Pinnawala Elephant Orphanage" },
          { name: "Kandy scenery", image: "/day-tours/kandy/viewpoint.webp" },
        ],
        overnight: "Kandy",
        transport: "Private sedan",
      },
      {
        day: 2,
        title: "Discover Kandy",
        intro:
          "Spend the day exploring Kandy's gardens, sacred landmarks and cultural traditions. This historic city offers a combination of natural scenery, religious heritage and traditional performing arts.",
        image: { src: "/day-tours/kandy/templeofthetooth.webp", alt: "Visitors at the Temple of the Tooth Relic in Kandy" },
        activities: [
          "Royal Botanical Gardens, Peradeniya.",
          "Temple of the Tooth Relic.",
          "Bahirawakanda Temple.",
          "Kandy Cultural Dance performance.",
        ],
        highlights: [
          { name: "Royal Botanical Gardens", image: "/day-tours/kandy/peradeniya.webp" },
          { name: "Temple of the Tooth", image: "/day-tours/kandy.webp" },
          { name: "Bahirawakanda Temple", image: "/day-tours/kandy/bahirawakanda.webp" },
          { name: "Kandy Cultural Dance" },
        ],
        overnight: "Kandy",
        transport: "Private sedan",
      },
      {
        day: 3,
        title: "Kandy to Nuwara Eliya",
        intro:
          "Leave Kandy and continue into Sri Lanka's beautiful hill country. Nuwara Eliya welcomes visitors with cooler temperatures, green landscapes and a relaxed atmosphere.",
        image: { src: "/day-tours/nuwaraeliya/tea-plantation.webp", alt: "Rolling tea plantations in the hills around Nuwara Eliya" },
        activities: ["Scenic drive to Nuwara Eliya.", "Explore Victoria Park.", "Visit Gregory Lake.", "Enjoy free time in Nuwara Eliya."],
        highlights: [
          { name: "Victoria Park" },
          { name: "Gregory Lake", image: "/day-tours/nuwaraeliya/gregory-lake.webp" },
          { name: "Hill-country scenery", image: "/day-tours/nuwaraeliya/tea-plantation.webp" },
        ],
        overnight: "Nuwara Eliya",
        transport: "Private sedan",
      },
      {
        day: 4,
        title: "Nuwara Eliya to Ella",
        intro:
          "Continue through Sri Lanka's picturesque hill country towards Ella. Begin with a visit to Moon Plains before travelling to Ella, a small mountain town surrounded by greenery and dramatic landscapes.",
        image: { src: "/day-tours/ella/ella.webp", alt: "A train crossing a bridge through the green hills of Ella" },
        activities: [
          "Early visit to Moon Plains, subject to opening and weather conditions.",
          "Scenic transfer to Ella.",
          "Visit Ravana Cave.",
          "Free time to enjoy Ella's surroundings.",
        ],
        highlights: [
          { name: "Moon Plains" },
          { name: "Ravana Cave" },
          { name: "Ella mountain scenery", image: "/day-tours/ella/nine-arch.webp" },
        ],
        overnight: "Ella",
        transport: "Private sedan",
      },
      {
        day: 5,
        title: "Ella to Yala National Park",
        intro:
          "Leave the hill country and travel towards Yala, one of Sri Lanka's most popular wildlife destinations. A jeep safari offers the opportunity to observe animals in their natural surroundings.",
        image: { src: "/destinations/yala3.png", alt: "Safari jeeps on a track in Yala National Park" },
        activities: [
          "Travel from Ella towards Yala.",
          "Yala National Park Jeep Safari.",
          "Wildlife viewing and photography.",
          "Overnight stay in the Yala area.",
        ],
        highlights: [
          { name: "Jeep safari", image: "/destinations/yala3.png" },
          { name: "Elephants", image: "/destinations/yala2.png" },
          { name: "Leopards – possible, not guaranteed", image: "/destinations/Yala.webp" },
        ],
        overnight: "Yala area",
        transport: "Private sedan + safari jeep",
      },
      {
        day: 6,
        title: "Yala to Mirissa",
        intro:
          "Travel from Yala towards the beautiful southern coastline and arrive in Mirissa. The area offers beaches and marine activities for visitors looking to enjoy the Indian Ocean.",
        image: { src: "/destinations/mirissa.webp", alt: "Turquoise sea around Parrot Rock in Mirissa" },
        activities: [
          "Private transfer from Yala to Mirissa.",
          "Snorkeling experience, subject to conditions.",
          "Scuba Diving experience, if scheduled and suitable.",
          "Relax on Mirissa Beach.",
        ],
        highlights: [
          { name: "Snorkeling", image: "/destinations/mirissa2.webp" },
          { name: "Scuba diving" },
          { name: "Mirissa Beach", image: "/destinations/mirissa.webp" },
        ],
        overnight: "Mirissa",
        transport: "Private sedan",
      },
      {
        day: 7,
        title: "Mirissa to Colombo",
        intro:
          "Begin the day with a whale-watching experience in Mirissa, subject to sea conditions and excursion availability. Continue north along the coast towards Colombo, with planned stops for a river safari and turtle conservation experience.",
        image: { src: "/itineraries/hero/whalewatching.png", alt: "A whale breaching in the open ocean" },
        activities: [
          "Early morning Whale Watching excursion.",
          "Continue along the southern coastal route.",
          "Madu River Boat Safari.",
          "Turtle Hatchery visit.",
          "Transfer to Colombo.",
        ],
        highlights: [
          { name: "Whale Watching", image: "/itineraries/hero/whalewatching.png" },
          { name: "Madu River", image: "/day-tours/bentota/madu-river.webp" },
          { name: "Turtle Hatchery", image: "/day-tours/bentota/sea-turtle.webp" },
        ],
        overnight: "Colombo",
        transport: "Private sedan",
        internalNote:
          "Full day: verify travel times, whale-watching duration, both coastal stops and arrival in Colombo. Reduce or redistribute activities if impractical.",
      },
      {
        day: 8,
        title: "Colombo Sightseeing & Departure",
        intro:
          "Discover a little of Sri Lanka's capital before concluding your journey. Depending on your departure time, visit the Colombo National Museum and continue to the airport.",
        image: { src: "/destinations/Colombo.webp", alt: "Aerial view of the Colombo skyline and Beira Lake" },
        activities: [
          "Colombo National Museum visit, subject to opening hours and flight time.",
          "Private transfer to Bandaranaike International Airport, if included in the confirmed schedule.",
          "End of tour.",
        ],
        highlights: [{ name: "Colombo National Museum" }, { name: "City scenery", image: "/day-tours/colombo/galleface.webp" }],
        overnight: null,
        transport: "Departure transfer subject to confirmation",
      },
    ],
    inclusions: [
      "Seven nights of accommodation: Kandy (2), Nuwara Eliya (1), Ella (1), Yala area (1), Mirissa (1), Colombo (1).",
      "Private sedan transportation over eight tour days.",
      "Airport arrival transfer; airport departure transfer if included in the final booking.",
      "Scheduled sightseeing and tickets only as stated in your confirmed quotation.",
      "Yala safari jeep excursion as listed in the itinerary, subject to park operations and ticket coverage.",
    ],
    exclusions: [
      "Hotel meal plans, unless confirmed in your quotation.",
      "International flights, visas and optional excursions.",
      "Personal expenses and tips.",
      "Unlisted tickets and specialist activity equipment, unless explicitly included.",
    ],
    goodToKnow: [
      "Hotel names, room categories and meal plans are confirmed in your quotation.",
      "Wildlife sightings and marine sightings are not guaranteed.",
      "Park entry availability, activity departure times and the museum's opening hours may affect the order of activities.",
      "Marine activities are weather-dependent and only operate in safe sea conditions.",
    ],
    faqs: [faq.private, faq.customize, faq.perPerson, faq.accommodation, faq.tickets, faq.marine, faq.leopard, faq.airport],
    related: ["5-day-sri-lanka-beach-tour"],
    openItems: [
      "BLOCKER – Price: confirm LKR 410,590 (USD 1,245) is the per-person sale price, not the total trip cost.",
      "Confirm traveler count, room-sharing (twin/single) rules, single supplements, child prices and minimum party size.",
      "Confirm hotels, room categories and meal plans.",
      "Confirm each paid experience, ticket, the Yala jeep and the airport departure transfer.",
      "Check Day 7 (whale watching + Madu River + turtle hatchery + Colombo transfer) is practical.",
      "Confirm flight timing requirements, park/museum closures and sea conditions.",
      "Replace placeholder photos with approved, accurately captioned Seren Lanka images.",
    ],
  },
];
