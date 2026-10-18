/**
 * Sri Lanka Itineraries – ONE data file for both the landing page and the
 * individual [slug] pages.
 *
 *   PART A – landing page: durationFilters, itineraryCategories (cards),
 *            featuredItinerary, itineraryUsps
 *   PART B – individual itineraries: itineraries[] (Content Plan §15 fields,
 *            §16 content) + shared inclusions/exclusions/pricing notice
 *
 * Every landing card's `href` points at a real itinerary slug in PART B.
 *
 * NOT PUBLISHED: 21-Day Tour (not confirmed).
 * NOT PUBLISHED: Wellness & Ayurveda Tours, Photography Tours,
 *                Eco / Sustainable Tours (pending client approval).
 *
 * Multi-Day Itineraries – field list from Content Plan §15, content from §16.
 *
 * Only three concepts have a CONFIRMED route + duration (See the Best, Ramayana,
 * Honeymoon). The remaining nine are category concepts: they have no `route`
 * or `days`, so the template hides the route strip and day-by-day sections and
 * positions them as tailor-made starting points. Do not invent itineraries.
 *
 * Pricing is PENDING per the plan: `pricing.startingFrom` is null → the page
 * shows "Price on request" with the quotation notice. Honeymoon carries the
 * confirmed 10% discount rule (§16.9), applied automatically when a price exists.
 */

const c = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Helper: returns a destination-sized image URL (portrait, 800 px wide). */
const d = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=75`;

/* ========================================================================
   PART A – LANDING PAGE (/sri-lanka-itineraries)
   ======================================================================== */

/** Duration filter chips (§14) */
export const durationFilters = [
  { id: "3d", label: "3 Days / 2 Nights", nights: 2 },
  { id: "5d", label: "5 Days / 4 Nights", nights: 4 },
  { id: "7d", label: "7 Days / 6 Nights", nights: 6 },
  { id: "10d", label: "10 Days / 9 Nights", nights: 9 },
  { id: "14d", label: "14 Days / 13 Nights", nights: 13 },
];

/**
 * Confirmed category cards. `href` = the itinerary page each card opens.
 * (The last two – Ramayana and Whale Watching – are in the plan's §7 navigation
 *  and have pages; remove them here if you don't want them on the landing grid.)
 */
export const itineraryCategories = [
  {
    label: "Popular Sri Lanka Tours",
    slug: "see-the-best-of-sri-lanka",
    href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka",
    tag: "Most Booked",
    image: '/itineraries/hero/popular2.png',
  },
  {
    label: "Luxury Tours",
    slug: "luxury-tour",
    href: "/sri-lanka-itineraries/luxury-tour",
    tag: "Premium Experience",
    image: '/itineraries/hero/luxury.png',
  },
  {
    label: "Honeymoon Tours",
    slug: "honeymoon-tour",
    href: "/sri-lanka-itineraries/honeymoon-tour",
    tag: "Romantic Escapes",
    image: '/itineraries/hero/honeymoon.png',
  },
  {
    label: "Family Tours",
    slug: "family-tour",
    href: "/sri-lanka-itineraries/family-tour",
    tag: "All Ages Welcome",
    image: '/itineraries/hero/family.png',
  },
  {
    label: "Wildlife Tours",
    slug: "into-the-wild-sri-lanka",
    href: "/sri-lanka-itineraries/into-the-wild-sri-lanka",
    tag: "Safari & Nature",
    image: '/itineraries/hero/wildlife.png',
  },
  {
    label: "Adventure Tours",
    slug: "adventure-tour",
    href: "/sri-lanka-itineraries/adventure-tour",
    tag: "Thrills & Trails",
    image: '/itineraries/hero/adventure.png',
  },
  {
    label: "Cultural & Heritage Tours",
    slug: "cultural-heritage-tour",
    href: "/sri-lanka-itineraries/cultural-heritage-tour",
    tag: "Ancient Wonders",
    image: '/itineraries/hero/cultural.png',
  },
  {
    label: "Beach Holidays",
    slug: "beach-tour",
    href: "/sri-lanka-itineraries/beach-tour",
    tag: "Sun, Sand & Sea",
    image: '/itineraries/hero/beach.png',
  },
  {
    label: "Nature Tours",
    slug: "nature-tour",
    href: "/sri-lanka-itineraries/nature-tour",
    tag: "Lush Landscapes",
    image: '/itineraries/hero/nature.png',
  },
  {
    label: "North & East Sri Lanka Tours",
    slug: "north-east-sri-lanka-tour",
    href: "/sri-lanka-itineraries/north-east-sri-lanka-tour",
    tag: "Hidden Gems",
    image: '/itineraries/hero/northeast.png',
  },
  {
    label: "Budget Tours",
    slug: "budget-tour",
    href: "/sri-lanka-itineraries/budget-tour",
    tag: "Great Value",
    image: '/itineraries/hero/budget.png',
  },
  {
    label: "Ramayana Tours",
    slug: "ramayana-tour",
    href: "/sri-lanka-itineraries/ramayana-tour",
    tag: "Pilgrimage Trail",
    image: '/itineraries/hero/ramayana.png',
  },
  {
    label: "Whale Watching Tours",
    slug: "whale-watching-tour",
    href: "/sri-lanka-itineraries/whale-watching-tour",
    tag: "Giants of the Ocean",
    image: '/itineraries/hero/whalewatching.png',
  },
];

/** Featured tour shown in the intro hero card */
export const featuredItinerary = {
  badge: "Most Popular",
  heading: "Popular Sri Lanka Tours",
  copy:
    "Handcrafted private itineraries that take you through the Cultural Triangle, misty hill country and sun-drenched coastline – the iconic Sri Lanka journey, tailored just for you.",
  href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka",
  image: c("photo-1598970605070-a38a6ccd3a2d", 1400),
  imageAlt: "Sigiriya Rock Fortress rising above the Sri Lanka jungle",
};


/* ========================================================================
   PART B – INDIVIDUAL ITINERARIES (/sri-lanka-itineraries/[slug])
   ======================================================================== */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

const img = {
  tea: u("photo-1576675784201-0e142b423952"),
  ella: u("photo-1566296314736-6eaac1ca0cb9"),
  sigiriya: u("photo-1612862862126-865765df2ded"),
  pidurangala: u("photo-1552465011-b4e21bf6e79a"),
  kandy: u("photo-1586185618855-dc4f2f4e1a45"),
  beach: u("photo-1507525428034-b723cf961d3e"),
  aerialBeach: u("photo-1506929562872-bb421503ef21"),
  galle: u("photo-1580889240912-c39ecefd3d95"),
  elephant: u("photo-1516426122078-c23e76319801"),
  leopard: u("photo-1456926631375-92c8ce872def"),
  whale: u("photo-1568430328012-21ed450453ea"),
  waterfall: u("photo-1432405972618-c60b0225b8f9"),
  forest: u("photo-1441974231531-c6227db76b6e"),
  surf: u("photo-1502680390469-be75c86b636f"),
  resort: u("photo-1520250497591-112f2f40a3f4"),
  couple: u("photo-1476673160081-cf065607f449"),
  hikers: u("photo-1551632811-561732d1e306"),
  temple: u("photo-1528181304800-259b08848526"),
  mountains: u("photo-1506905925346-21bda4d32df4"),
  sunrise: u("photo-1469474968028-56623f02e42e"),
  rafting: u("photo-1530866495561-507c9faab2ed"),
  spa: u("photo-1544161515-4ab6ce6db874"),
};

/** Shared, confirmed standard inclusions (§11) adapted for multi-day travel. */
export const itineraryInclusions = [
  "Private air-conditioned vehicle for the whole journey",
  "Experienced English-speaking driver",
  "Fuel, parking and highway charges",
  "Airport pickup and drop-off",
  "Bottled water during travel",
  "Complimentary gift for the guest",
];

export const itineraryExclusions = [
  "Accommodation and meals (as selected in your quotation)",
  "Attraction entrance tickets and safari fees (confirmed in your quotation)",
  "Personal expenses and gratuities",
  "Travel insurance, visa and air fare",
];

/** §18 – pricing notice shown on every itinerary */
export const pricingNotice =
  "This is an estimated price. Final pricing may vary based on availability, travel dates, hotels, activities, route changes and third-party supplier charges. Seren Lanka Travels will confirm the final quotation before booking. The team responds with your final quote within 4 hours via WhatsApp or a phone call.";

/** §14 – category id → display label (used by the [slug] page tags and cards) */
export const itineraryCategoryLabels = {
  popular: "Popular Sri Lanka Tours",
  round: "Round Tours",
  luxury: "Luxury Tours",
  honeymoon: "Honeymoon Tours",
  family: "Family Tours",
  wildlife: "Wildlife & Safari Tours",
  adventure: "Adventure Tours",
  cultural: "Cultural & Heritage Tours",
  beach: "Beach Tours",
  nature: "Nature Tours",
  northEast: "North & East Sri Lanka Tours",
  budget: "Budget Tours",
  ramayana: "Ramayana Tours",
  whale: "Whale Watching Tours",
};

const sharedFaqs = (name) => [
  {
    q: `Can I change this itinerary?`,
    a: `Yes. ${name} is a starting point – use "Customize This Tour" to change destinations, hotel category, vehicle, activities or the number of days, and we will re-quote it.`,
  },
  {
    q: "Are prices fixed?",
    a: "Prices vary with travel dates, hotel category, vehicle type, number of guests and selected activities. Your final quotation is confirmed before booking.",
  },
  {
    q: "How do I book?",
    a: "Send us your plan by WhatsApp or the quote form. Once we confirm the quotation, a 40% advance confirms the booking; no online payment is collected on the website.",
  },
];

export const itineraries = [
  /* ------------------------------------------------------------------ 16.1 */
  {
    published: true,
    featured: true,
    slug: "see-the-best-of-sri-lanka",
    name: "See the Best of Sri Lanka",
    tagline: "A balanced introduction to Sri Lanka",
    categories: ["popular", "round"],
    duration: "7 Days / 6 Nights",
    days: 7,
    nights: 6,
    startLocation: "Colombo",
    endLocation: "Galle",
    heroImage: '/itineraries/hero/popular.png',
    summary:
      "A balanced introduction to Sri Lanka combining culture, tea country, mountains, wildlife and beaches – travelling at your own pace in a private vehicle with an English-speaking driver from arrival to departure.",
    route: ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Galle"],
    highlights: ["Tea plantations", "Waterfalls", "Mountains", "Wildlife", "Beaches", "Galle Fort"],
    dayByDay: [
      {
        day: 1, title: "Arrival · Colombo",
        points: [
          "Meet your private driver at the airport and transfer comfortably to your Colombo hotel",
          "Stroll along Galle Face Green and watch the sun set over the Indian Ocean",
          "Explore the vibrant neighbourhood of Pettah or visit the atmospheric Gangaramaya Temple",
          "Enjoy your first taste of authentic Sri Lankan cuisine at a local restaurant"
        ]
      },
      {
        day: 2, title: "Colombo → Kandy",
        points: [
          "Scenic drive up into the lush green hill country, with stops along the way",
          "Visit the sacred Temple of the Tooth Relic, enshrining Buddha's tooth relic",
          "Enjoy an evening walk around the tranquil Kandy Lake as the city lights reflect on the water",
          "Optional: experience a vibrant traditional Kandyan cultural dance performance"
        ]
      },
      {
        day: 3, title: "Kandy → Nuwara Eliya",
        points: [
          "Visit a working tea plantation and factory and sample freshly brewed Ceylon tea",
          "Stop at the spectacular Ramboda Falls cascading through the misty mountain landscape",
          "Arrive in Nuwara Eliya, known as 'Little England' for its cool climate and colonial charm",
          "Explore the colourful local markets and relax in the cool highland evening air"
        ]
      },
      {
        day: 4, title: "Nuwara Eliya → Ella",
        points: [
          "Wind through breathtaking mountain roads draped in lush tea gardens",
          "Stop to photograph the iconic Nine Arches Bridge as a scenic train passes overhead",
          "Hike up Little Adam's Peak for sweeping panoramic views of the surrounding valleys",
          "Settle into the relaxed, bohemian atmosphere of Ella town for the evening"
        ]
      },
      {
        day: 5, title: "Ella → Yala",
        points: [
          "Stop at the impressive Ravana Falls – one of the widest waterfalls in Sri Lanka",
          "Depart for Yala National Park through the scenic southern countryside",
          "Embark on an afternoon private jeep safari through Yala's diverse ecosystems",
          "Look out for Sri Lankan leopards, elephants, sloth bears, and abundant birdlife"
        ]
      },
      {
        day: 6, title: "Yala → Mirissa",
        points: [
          "Optional early-morning safari for the best wildlife activity before the drive south",
          "Arrive on the golden crescent beach of Mirissa – one of Sri Lanka's most beautiful",
          "Enjoy a leisurely afternoon swimming, relaxing, and soaking up the tropical sun",
          "Watch the sunset from Coconut Tree Hill or a beachfront restaurant"
        ]
      },
      {
        day: 7, title: "Mirissa → Galle · Departure",
        points: [
          "Optional early-morning whale and dolphin watching cruise from Mirissa harbour (seasonal)",
          "Drive along the stunning southern coastline to the historic city of Galle",
          "Wander the cobbled streets and ramparts of the UNESCO-listed Galle Fort",
          "Explore Dutch colonial architecture, boutique shops, and quaint cafes before your departure transfer"
        ]
      },
    ],
    destinations: ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Galle"],
    destinationDetails: [
      { name: "Colombo",      images: ['/day-tours/colombo/galleface.webp', '/day-tours/colombo/independence square.webp'] },
      { name: "Kandy",        images: ['/day-tours/kandy/viewpoint.webp', '/day-tours/kandy/templeofthetooth.webp'] },
      { name: "Nuwara Eliya", images: ['/day-tours/nuwaraeliya/little-england.png', '/day-tours/nuwaraeliya/ramboada-falls.webp'] },
      { name: "Ella",         images: ['/day-tours/ella/nine-arch.webp', '/day-tours/ella/little-adams-peak.webp'] },
      { name: "Yala",         images: ['/destinations/Yala.webp', '/destinations/yala2.png'] },
      { name: "Mirissa",      images: ['/destinations/mirissa.webp', '/destinations/mirissa2.webp'] },
      { name: "Galle",        images: ['/day-tours/galle/lighthouse.webp', '/day-tours/galle/unawatuna.webp'] },
    ],
    accommodation: "Your choice – Budget to Luxury",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Temple visits", "Tea factory tour", "Scenic mountain drives", "Private safari", "Beach time", "Fort walk"],
    optionalExperiences: ["Whale watching at Mirissa (seasonal)", "Scenic hill-country train ride", "Cultural dance performance in Kandy", "Cooking class"],
    gallery: [img.sunrise, img.tea, img.ella, img.leopard, img.galle],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Is this tour suitable for first-time visitors?", a: "Yes – it is designed as the classic introduction, covering the island's best-known regions in one loop without long driving days." },
      { q: "Can we add or remove a destination?", a: "Absolutely. Sigiriya, Bentota or a second safari are common additions; tell us what you love and we will reshape the route." },
    ],
    related: ["honeymoon-tour", "cultural-heritage-tour", "into-the-wild-sri-lanka"],
    mapImage: "/itineraries/popular final.png",
    mapTitle: "Sri Lanka in One Perfect Loop",
    mapDescription: [
      "This seven-day route connects the island's most iconic regions in a single, flowing loop. Starting in Colombo, your private driver takes you up into the cool highlands through Kandy and Nuwara Eliya, then down into Ella's scenic hills, across to Yala for a leopard safari, and finally west along the south coast to Mirissa and Galle.",
      "Every transfer is carefully timed to keep driving distances comfortable while maximising time at each destination. Whether you are a first-time visitor or returning to explore more deeply, this is the route that shows you the very best of Sri Lanka."
    ],
    cta: "Customize This Tour",
    h1: "Best of Sri Lanka Tour & Island Itinerary",
    openingParagraph:
      "The Best of Sri Lanka itinerary brings together a selection of destinations to introduce the island's variety. Explore the actual day-by-day route on this page and review the places, activities and arrangements shown before enquiring.",
    seoTitle: "Best of Sri Lanka Tour & Island Itinerary | Seren Lanka",
    metaDescription:
      "Explore our Best of Sri Lanka itinerary for a journey through the island's varied destinations. View the published route, stops and tour information.",
  },

  /* ------------------------------------------------------------------ 16.2 */
  {
    published: true,
    slug: "into-the-wild-sri-lanka",
    name: "Into the Wild Sri Lanka",
    tagline: "Private safari experiences",
    categories: ["wildlife"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/wildlife.png',
    summary:
      "Explore Sri Lanka's wildlife through private safari experiences. From leopard country in the south to the great elephant gatherings of the north-central plains, we build your safari days around the parks, seasons and sightings that matter most to you.",
    highlights: ["Yala National Park", "Udawalawe National Park", "Minneriya National Park", "Kaudulla National Park"],
    possibleSightings: ["Elephants", "Leopards", "Crocodiles", "Deer", "Birdlife"],
    destinations: ["Yala", "Udawalawe", "Minneriya", "Kaudulla"],
    destinationDetails: [
      { name: "Yala",       images: ['/destinations/Yala.webp', '/destinations/yala3.png'] },
      { name: "Udawalawe", images: ['/destinations/udawalawe.webp', '/destinations/udawalawe4.png'] },
      { name: "Minneriya", images: ['/destinations/Minneriya.webp', '/destinations/Minneriya2.avif'] },
      { name: "Kaudulla",  images: ['/destinations/kaudulla.png', '/destinations/kaudulla2.png'] },
    ],
    accommodation: "Your choice – Budget to Luxury, including eco lodges",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle between parks",
    driverGuide: "English-speaking driver; park jeeps and trackers arranged",
    activities: ["Private jeep safaris", "Elephant gathering (seasonal)", "Bird watching", "Lake and wetland visits"],
    optionalExperiences: ["Full-day safari with packed lunch", "Wilpattu National Park extension", "Whale watching add-on at Mirissa"],
    gallery: [img.leopard, img.elephant, img.forest, img.sunrise, img.mountains],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Which park is best for leopards?", a: "Yala has one of the highest leopard densities anywhere; early-morning drives give the best chances." },
      { q: "When is the elephant gathering?", a: "Minneriya and Kaudulla host large elephant gatherings in the drier months around the reservoirs; we time your visit to the current season." },
    ],
    related: ["see-the-best-of-sri-lanka", "nature-tour", "adventure-tour"],
    mapImage: "/itineraries/wildlife final.png",
    mapTitle: "Sri Lanka's Wild Side, Mapped",
    mapDescription: [
      "Sri Lanka's national parks are scattered across the island, each offering a distinct ecosystem and wildlife experience. This tailor-made safari itinerary is built around the parks, seasons and sightings that matter most to you — from Yala's dense scrubland in the south to Minneriya's vast reservoir plains in the north-central zone.",
      "We plan the sequence of parks around the time of year to give you the best chance of witnessing the elephant gathering, leopard sightings, and diverse birdlife. Tell us your travel dates and we will design the ideal route."
    ],
    cta: "Plan My Wildlife Tour",
    h1: "Into the Wild Sri Lanka",
    openingParagraph:
      "Sri Lanka offers opportunities to explore remarkable landscapes and wildlife habitats. Into the Wild Sri Lanka focuses on this nature-led side of the island; check the published route to see which parks, experiences and activities are included.",
    seoTitle: "Into the Wild Sri Lanka | Wildlife Tour Itinerary",
    metaDescription:
      "Explore the Into the Wild Sri Lanka itinerary for nature and wildlife focused travel. Discover the planned destinations, trip stages and tour details.",
  },

  /* ------------------------------------------------------------------ 16.3 */
  {
    published: true,
    slug: "ramayana-tour",
    name: "Ramayana Tour",
    tagline: "Follow the Ramayana trail across Sri Lanka",
    categories: ["ramayana", "cultural"],
    duration: "8 Days / 7 Nights",
    days: 8,
    nights: 7,
    startLocation: "Airport",
    endLocation: "Airport",
    heroImage: '/itineraries/hero/ramayana.png',
    summary:
      "A pilgrimage-style journey through the temples, caves, gardens and waterfalls linked to the Ramayana epic – from the west coast to Trincomalee, the Cultural Triangle, Kandy and the hill country, ending with Colombo.",
    route: ["Airport", "Chilaw", "Trincomalee", "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Colombo", "Airport"],
    highlights: [
      "Munneswaram Temple", "Manavari Temple", "Koneswaram Temple", "Cobra Hood Cave",
      "Temple of the Tooth Relic", "Spice garden", "Sri Bhaktha Hanuman Temple", "Tea estate",
      "Sita Amman Temple / Ashoka Vatika tradition", "Hakgala Gardens", "Divurumpola Temple",
      "Ravana Ella Falls", "Ravana Caves", "Panchamuga Anjaneyar Hanuman Temple", "Colombo city tour",
    ],
    dayByDay: [
      {
        day: 1, title: "Airport → Chilaw",
        points: [
          "Warm welcome at the airport by your private driver and transfer to the west coast",
          "Visit the ancient Munneswaram Temple, one of the five sacred Shiva temples linked to the Ramayana epic",
          "Proceed to the nearby Manavari Temple – the oldest Shiva temple in Sri Lanka and a key Ramayana site",
          "Settle into your accommodation and reflect on the spiritual significance of the day's journey"
        ]
      },
      {
        day: 2, title: "Chilaw → Trincomalee",
        points: [
          "Drive across the island to the ancient port city of Trincomalee on the east coast",
          "Visit the magnificent Koneswaram Temple perched dramatically on Swami Rock above the ocean",
          "Explore the historic Fort Frederick, where deer roam freely within the colonial-era walls",
          "Relax at the calm, pristine beaches of Trincomalee as the day draws to a close"
        ]
      },
      {
        day: 3, title: "Trincomalee → Sigiriya",
        points: [
          "Drive inland through the dry-zone forests and ancient tanks to the Cultural Triangle",
          "Visit the mysterious Cobra Hood Cave at Sigiriya, inscribed with early-medieval graffiti poems",
          "Optionally, climb the iconic Sigiriya Lion Rock and marvel at the ancient frescoes and water gardens",
          "Enjoy panoramic views of the surrounding jungle from the top of the 5th-century rock fortress"
        ]
      },
      {
        day: 4, title: "Sigiriya → Kandy",
        points: [
          "Stop at a traditional spice garden en route and learn about Sri Lanka's centuries-old spice trade",
          "Visit the sacred Temple of the Tooth Relic in Kandy – an important Buddhist site on the Ramayana trail",
          "Stroll along the tranquil Kandy Lake and soak in the serene atmosphere of the hill capital",
          "Optional: attend an evening Kandyan cultural dance performance"
        ]
      },
      {
        day: 5, title: "Kandy → Nuwara Eliya",
        points: [
          "Visit the Sri Bhaktha Hanuman Temple at Ramboda, perched overlooking the spectacular Ramboda Falls",
          "Explore a working Ceylon tea estate and learn the story of Sri Lanka's most famous export",
          "Pay respects at the Sita Amman Temple, built at the site believed to be Ashoka Vatika from the Ramayana",
          "Stroll through the beautiful Hakgala Botanical Gardens, traditionally identified as Ashoka Vatika"
        ]
      },
      {
        day: 6, title: "Nuwara Eliya → Ella",
        points: [
          "Visit the Divurumpola Temple, the site traditionally associated with Sita's fire ordeal (Agni Pareeksha)",
          "Marvel at the mighty Ravana Ella Falls – one of the widest waterfalls in Sri Lanka",
          "Explore the dramatic Ravana Caves, said to be where Ravana held Sita captive",
          "Arrive in the scenic hill town of Ella and enjoy the cool mountain air for the evening"
        ]
      },
      {
        day: 7, title: "Ella → Colombo",
        points: [
          "Drive westward through the scenic southern highlands toward the capital",
          "Visit the Panchamuga Anjaneyar Hanuman Temple in Colombo, an important stop on the Ramayana trail",
          "Enjoy a Colombo city tour taking in colonial landmarks, local markets, and modern highlights",
          "Relax at your Colombo hotel or explore the city's vibrant restaurant and café scene in the evening"
        ]
      },
      {
        day: 8, title: "Colombo → Airport · Departure",
        points: [
          "Enjoy a leisurely breakfast and some final souvenir shopping",
          "Private transfer to Bandaranaike International Airport in time for your departure flight"
        ]
      },
    ],
    destinations: ["Chilaw", "Trincomalee", "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Colombo"],
    destinationDetails: [
      { name: "Chilaw",      images: ['/destinations/munneshwaram.png', '/destinations/manavariii.png'] },
      { name: "Trincomalee", images: ['/destinations/koneshwaram.png', '/destinations/trincomalee 2.webp'] },
      { name: "Sigiriya",    images: ['/destinations/Sigiriya.webp', '/destinations/sigiriya2.webp'] },
      { name: "Kandy",       images: ['/destinations/Kandy 1.webp', '/day-tours/kandy/kandy-lake.webp'] },
      { name: "Nuwara Eliya",images: ['/day-tours/nuwaraeliya/ramboada-falls.webp', '/destinations/seetha amman.png'] },
      { name: "Ella",        images: ['/destinations/Divurumpola.png', '/destinations/ravanafalls.webp'] },
      { name: "Colombo",     images: ['/destinations/cmb city.png', '/destinations/panchamuga anjaneyar.png'] },
    ],
    accommodation: "Your choice – Budget to Luxury",
    mealPlan: "As selected in your quotation (vegetarian options available)",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Temple visits", "Cave and waterfall stops", "Tea estate and garden visits", "City tour"],
    optionalExperiences: ["Sigiriya Rock Fortress climb", "Dambulla Cave Temple", "Kandy cultural dance performance"],
    gallery: [img.temple, img.sigiriya, img.kandy, img.tea, img.waterfall],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Is this tour suitable for pilgrims and non-pilgrims alike?", a: "Yes. The trail visits some of Sri Lanka's most beautiful temples, hills and waterfalls, and your driver adapts the pace to your interest in the story." },
      { q: "Is temple dress code required?", a: "Yes – shoulders and knees covered, shoes removed at each temple. Your driver will remind you at each stop." },
    ],
    related: ["cultural-heritage-tour", "see-the-best-of-sri-lanka", "nature-tour"],
    mapImage: "/itineraries/ramayana final.png",
    mapTitle: "Tracing the Ramayana Trail",
    mapDescription: [
      "This eight-day pilgrimage route follows the sacred sites connected to the Ramayana epic — from the ancient Munneswaram Temple on Sri Lanka's west coast, across to Koneswaram in Trincomalee, through the Cultural Triangle, and into the highland temples and caves of Kandy, Nuwara Eliya and Ella.",
      "Each stop on the map carries deep spiritual significance, and your experienced driver shares the story of each site as you travel. The route is designed for pilgrims and curious travellers alike, blending sacred heritage with Sri Lanka's most beautiful landscapes."
    ],
    cta: "Request Ramayana Tour Details",
    h1: "Sri Lanka Ramayana Tour",
    openingParagraph:
      "Sri Lanka's Ramayana-linked travel routes are of interest to visitors exploring the epic's cultural and religious associations. This itinerary introduces the relevant destinations included in the tour and helps you review the journey before planning a visit.",
    seoTitle: "Sri Lanka Ramayana Tour | Heritage Itinerary",
    metaDescription:
      "Explore a Sri Lanka Ramayana tour inspired by locations associated with the epic tradition. Review the itinerary and sites included in this cultural journey.",
  },

  /* ------------------------------------------------------------------ 16.4 */
  {
    published: true,
    slug: "whale-watching-tour",
    name: "Whale Watching Tour",
    tagline: "Meet the Giants of the Ocean",
    categories: ["whale", "beach"],
    duration: "Package – hotel pickup, transfer and boat trip",
    heroImage: '/itineraries/hero/whalewatching.png',
    summary:
      "An early-morning Indian Ocean experience from Mirissa with opportunities to encounter blue whales, sperm whales, dolphins and other marine life – arranged as a simple package of hotel pickup, private transfer and the whale-watching boat trip.",
    highlights: ["Blue whales", "Sperm whales", "Dolphins", "Other marine life"],
    destinations: ["Mirissa"],
    destinationDetails: [
      { name: "Mirissa", images: [d("photo-1568430328012-21ed450453ea"), d("photo-1507525428034-b723cf961d3e")] },
    ],
    accommodation: "Not included – add south-coast nights on request",
    mealPlan: "Light breakfast on the boat (operator-dependent)",
    transportation: "Private hotel pickup and transfer to Mirissa harbour",
    driverGuide: "English-speaking driver; licensed boat crew",
    activities: ["Early-morning whale-watching cruise", "Dolphin spotting", "Beach time at Mirissa afterwards"],
    optionalExperiences: ["Galle Fort visit on the return", "Stilt fishermen stop", "Add nights in Mirissa or Unawatuna"],
    gallery: [img.whale, img.beach, img.aerialBeach, img.galle, img.surf],
    pricing: { startingFrom: null, currency: "USD", per: "per person" },
    faqs: [
      { q: "When is whale-watching season in Mirissa?", a: "The main season runs through the calmer months on the south coast; we advise on the current conditions when you enquire." },
      { q: "Are sightings guaranteed?", a: "No operator can guarantee wildlife, but Mirissa's season gives excellent chances of blue whales and dolphins on most mornings." },
    ],
    related: ["beach-tour", "honeymoon-tour", "into-the-wild-sri-lanka"],
    mapImage: "/itineraries/whale watching.png",
    mapTitle: "Into the Indian Ocean from Mirissa",
    mapDescription: [
      "Mirissa is Sri Lanka's premier whale-watching destination, sitting on the southern tip of the island where the warm Indian Ocean waters draw blue whales, sperm whales, and spinner dolphins. Your private driver collects you from your hotel and transfers you comfortably to Mirissa harbour in time for an early-morning departure.",
      "After the cruise, enjoy the rest of your day on the beautiful Mirissa crescent beach. Optional add-ons include a stop at the Galle Fort on the way back or an extra night along the south coast."
    ],
    cta: "Plan My Whale Watching Trip",
    h1: "Sri Lanka Whale Watching Tour",
    openingParagraph:
      "Whale watching is a sought-after experience on selected Sri Lankan coastal routes, with timing and conditions varying by location and season. Explore this tour's published itinerary and confirm the departure area, seasonal suitability and operating arrangements before booking.",
    seoTitle: "Sri Lanka Whale Watching Tour | Coastal Itinerary",
    metaDescription:
      "Explore the Sri Lanka whale watching tour itinerary and coastal destinations. Check the route, suitable season and listed trip arrangements.",
  },

  /* ------------------------------------------------------------------ 16.5 */
  {
    published: true,
    slug: "cultural-heritage-tour",
    name: "Cultural & Heritage Tour",
    tagline: "Discover Sri Lanka's Heritage",
    categories: ["cultural", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/cultural.png',
    summary:
      "Temples, ancient cities, cultural landmarks and local traditions – a journey through the sacred and historic heart of the island, from the Cultural Triangle to the colonial south.",
    highlights: ["Temple of the Sacred Tooth Relic", "Dambulla Cave Temple", "Ancient cities", "Traditional villages", "Galle Fort", "Local cultural experiences"],
    destinations: ["Sigiriya", "Dambulla", "Anuradhapura", "Polonnaruwa", "Kandy", "Galle"],
    destinationDetails: [
      { name: "Sigiriya",    images: ['/destinations/Sigiriya.webp', '/destinations/sigiriya2.webp'] },
      { name: "Dambulla",   images: ['/destinations/Dambulla.webp', '/day-tours/sigiriya/goldencave.webp'] },
      { name: "Anuradhapura",images: ['/destinations/anuradhapura.webp', '/destinations/anuradhapura2.png'] },
      { name: "Polonnaruwa",images: ['/destinations/Polonnaruwa.webp', '/destinations/polonnaruwa2.png'] },
      { name: "Kandy",      images: ['/destinations/Kandy 1.webp', '/destinations/Kandy 2.webp'] },
      { name: "Galle",      images: ['/day-tours/galle/lighthouse.webp', '/day-tours/galle/galle-fort.webp'] },
    ],
    accommodation: "Your choice – Budget to Luxury, including boutique heritage stays",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver; site guides available",
    activities: ["Temple and cave visits", "Ancient city exploration", "Village experiences", "Fort walk"],
    optionalExperiences: ["Sigiriya sunrise climb", "Traditional village lunch", "Kandyan dance performance", "Batik and craft workshops"],
    gallery: [img.sigiriya, '/hero.jpg', img.temple, img.galle, img.pidurangala],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: sharedFaqs("the Cultural & Heritage Tour").slice(0, 1),
    related: ["ramayana-tour", "see-the-best-of-sri-lanka", "nature-tour"],
    mapImage: "/itineraries/cultural final.png",
    mapTitle: "Ancient Wonders Across the Island",
    mapDescription: [
      "Sri Lanka's cultural landmarks span the entire island — from the cave temples of Dambulla and the soaring Sigiriya rock fortress in the north-central Cultural Triangle, to the sacred Temple of the Tooth Relic in Kandy and the UNESCO-listed Galle Fort on the southern coast.",
      "This tailor-made cultural itinerary connects these ancient wonders in a logical, comfortable sequence. We build the route around your travel dates and interests, adding village experiences, traditional craft workshops, and optional guide services at each major site."
    ],
    cta: "Customize This Tour",
    h1: "Sri Lanka Cultural & Heritage Tour",
    openingParagraph:
      "Sri Lanka's cultural heritage can be explored through ancient cities, monuments and longstanding traditions. Our cultural and heritage tour page introduces the destinations on its route so you can understand the planned journey and choose the sites that interest you.",
    seoTitle: "Sri Lanka Cultural & Heritage Tour | Itinerary",
    metaDescription:
      "Discover a Sri Lanka cultural and heritage tour featuring the island's history and historic destinations. Explore the itinerary and included stops.",
  },

  /* ------------------------------------------------------------------ 16.6 */
  {
    published: true,
    slug: "beach-tour",
    name: "Beach Tour",
    tagline: "Sun, Sand & Tropical Paradise",
    categories: ["beach", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/beach.png',
    summary:
      "Golden south-coast sands, calm east-coast bays and everything in between – a beach itinerary built around relaxation, swimming, snorkelling and sunsets, with private transfers between every stop.",
    highlights: ["Mirissa", "Unawatuna", "Hikkaduwa", "Bentota", "Weligama", "Nilaveli"],
    bestFor: ["Relaxation", "Swimming", "Snorkelling", "Sunsets", "Beach activities"],
    destinations: ["Mirissa", "Unawatuna", "Hikkaduwa", "Bentota", "Weligama", "Nilaveli"],
    destinationDetails: [
      { name: "Mirissa",    images: ['/destinations/mirissa.webp', '/destinations/mirissa3.jpg'] },
      { name: "Unawatuna", images: ['/day-tours/galle/unawatuna.webp', '/destinations/unawatuna2.png'] },
      { name: "Hikkaduwa", images: ['/destinations/hikkaduwa.webp', '/destinations/hikkaduwa1.png'] },
      { name: "Bentota",   images: ['/destinations/benthota.webp', '/day-tours/bentota/lagoon.webp'] },
      { name: "Weligama",  images: ['/destinations/weligama.webp', '/destinations/weligama1.webp'] },
      { name: "Nilaveli",  images: ['/destinations/nilaveli.png', '/destinations/nilaveli2.png'] },
    ],
    accommodation: "Your choice – beach hotels, boutique stays and villas",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Beach days", "Snorkelling", "Sunset viewpoints", "Boat rides"],
    optionalExperiences: ["Whale watching at Mirissa", "Surf lesson at Weligama", "Madu River boat safari", "Galle Fort evening"],
    gallery: [img.aerialBeach, img.beach, img.surf, img.galle, img.couple],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Which coast should we choose?", a: "The south and west coasts are best in one half of the year and the east coast (Nilaveli, Pasikuda) in the other – we match your dates to the right coast." },
    ],
    related: ["whale-watching-tour", "honeymoon-tour", "family-tour"],
    mapImage: "/itineraries/beach final.png",
    mapTitle: "Sri Lanka's Finest Beaches, Coast to Coast",
    mapDescription: [
      "Sri Lanka is blessed with two distinct coastlines — the south-west coast with its golden beaches at Mirissa, Unawatuna, Hikkaduwa and Bentota, and the calmer, more secluded east coast with Nilaveli and Pasikuda. The best coast to visit depends entirely on your travel dates, as the two coasts follow opposite seasons.",
      "We match your travel window to the right shoreline, design the sequence of beach stops around your interests, and handle all transfers between them. Whether you want surf breaks, snorkelling, sunset sunbathing or a riverside boat safari, we build the perfect coast-to-coast escape."
    ],
    cta: "Customize This Tour",
    h1: "Sri Lanka Beach Tour",
    openingParagraph:
      "Sri Lanka has diverse coastal regions, from lively beach towns to quieter stretches of shoreline. Explore our beach tour itinerary to learn which destinations are featured and plan a coastal journey around the season and experiences that appeal to you.",
    seoTitle: "Sri Lanka Beach Tour | Coastal Travel Itinerary",
    metaDescription:
      "Explore a Sri Lanka beach tour and discover coastal destinations for your island getaway. Review the published route and seaside experiences.",
  },

  /* ------------------------------------------------------------------ 16.7 */
  {
    published: true,
    slug: "nature-tour",
    name: "Nature Tour",
    tagline: "Experience Sri Lanka's Natural Beauty",
    categories: ["nature"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/nature.png',
    summary:
      "Tea plantations, waterfalls, mountains, tropical forests, rivers, lakes and countryside – an itinerary for travellers who want the island's landscapes above all else.",
    highlights: ["Tea plantations", "Waterfalls", "Mountains", "Tropical forests", "Rivers and lakes", "Countryside"],
    destinations: ["Ella", "Nuwara Eliya", "Kandy", "Sinharaja", "Kitulgala"],
    destinationDetails: [
      { name: "Ella",        images: ['/day-tours/ella/nine-arch.webp', '/day-tours/ella/little-adams-peak.webp'] },
      { name: "Nuwara Eliya",images: ['/destinations/Nuwara Eliya.webp', '/day-tours/nuwaraeliya/little-england.png'] },
      { name: "Kandy",       images: ['/day-tours/kandy/templeofthetooth.webp', '/day-tours/kandy/peradeniya.webp'] },
      { name: "Sinharaja",   images: ['/destinations/sinharaja.webp', '/destinations/sinharaja2.png'] },
      { name: "Kitulgala",   images: ['/destinations/Kitulgala.webp', '/destinations/kitulgala2.png'] },
    ],
    accommodation: "Your choice – including eco lodges and plantation bungalows",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver; forest guides arranged",
    activities: ["Rainforest walks in Sinharaja", "Tea factory visits", "Waterfall stops", "Scenic mountain drives"],
    optionalExperiences: ["White-water rafting at Kitulgala", "Scenic train ride", "Sunrise at Little Adam's Peak", "Bird watching"],
    gallery: [img.tea, img.waterfall, img.forest, img.mountains, img.ella],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: sharedFaqs("the Nature Tour").slice(0, 1),
    related: ["adventure-tour", "into-the-wild-sri-lanka", "see-the-best-of-sri-lanka"],
    mapImage: "/itineraries/nature final.png",
    mapTitle: "Tea Country, Rainforests & Waterfalls",
    mapDescription: [
      "Sri Lanka's interior is a landscape of extraordinary natural beauty — cascading waterfalls, mist-covered tea estates, ancient rainforests, and mountain peaks rising above the clouds. This nature itinerary threads through Ella's rolling hills, Nuwara Eliya's highland plateaus, the lush Sinharaja rainforest, and the adventure hub of Kitulgala.",
      "Every stop is chosen for its scenery and natural richness. Your experienced driver navigates the mountain roads safely while you enjoy the views, with forest guides arranged for the Sinharaja trek and tea estate hosts ready to walk you through the world of Ceylon tea."
    ],
    cta: "Customize This Tour",
    h1: "Sri Lanka Nature Tour",
    openingParagraph:
      "Sri Lanka's natural scenery ranges from tropical forests and hill country to rivers, coastlines and protected landscapes. This nature tour highlights the destinations on the published route and helps you explore the island's outdoor character.",
    seoTitle: "Sri Lanka Nature Tour | Scenic Travel Itinerary",
    metaDescription:
      "Explore a Sri Lanka nature tour focusing on landscapes and outdoor experiences. Discover its planned destinations and review the travel itinerary.",
  },

  /* ------------------------------------------------------------------ 16.8 */
  {
    published: true,
    slug: "adventure-tour",
    name: "Adventure Tour",
    tagline: "Adventure Awaits",
    categories: ["adventure"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/adventure.png',
    summary:
      "Rafting, safari, snorkelling, diving, surfing, zip-lining, cycling and boat rides – build an active Sri Lanka itinerary around the experiences you want, with private transport between every adventure.",
    highlights: ["White-water rafting", "Safari", "Snorkelling", "Diving", "Surfing", "Zip-lining", "Cycling", "Boat rides"],
    destinations: ["Kitulgala", "Ella", "Yala", "Weligama", "Hikkaduwa", "Trincomalee"],
    destinationDetails: [
      { name: "Kitulgala",   images: ['/destinations/Kitulgala.webp', '/destinations/kitulgala2.png'] },
      { name: "Ella",        images: ['/PopularDestinations/ella.jpg', '/destinations/ravanafalls.webp'] },
      { name: "Yala",        images: ['/destinations/Yala.webp', '/destinations/yala3.png'] },
      { name: "Weligama",    images: ['/destinations/weligama1.webp', '/destinations/weligama2.jpg'] },
      { name: "Hikkaduwa",   images: ['/destinations/hikkaduwa1.png', '/destinations/hikkaduwa2.png'] },
      { name: "Trincomalee", images: ['/destinations/trincomalee 1.webp', '/destinations/trincomalee 2.webp'] },
    ],
    accommodation: "Your choice – Budget to Luxury",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver; licensed activity operators",
    activities: ["White-water rafting", "Private safari", "Surf and snorkel sessions", "Zip-lining", "Cycling routes"],
    optionalExperiences: ["Scuba diving (certified)", "Kayaking and canyoning", "Hot-air balloon (seasonal)"],
    gallery: [img.surf, img.rafting, img.hikers, img.leopard, img.waterfall],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Do we need experience for rafting or surfing?", a: "No – operators offer beginner-friendly grades and lessons. Tell us your comfort level and we will match the activities." },
    ],
    related: ["nature-tour", "into-the-wild-sri-lanka", "beach-tour"],
    mapImage: "/itineraries/adventure final.png",
    mapTitle: "Thrills Across the Island",
    mapDescription: [
      "Sri Lanka packs an extraordinary range of adventure experiences into a small island. White-water raft the Kelani River at Kitulgala, hike to the Nine Arches Bridge in Ella, track leopards on a jeep safari in Yala, learn to surf the rolling breaks at Weligama, and snorkel the coral gardens of Hikkaduwa — all connected by comfortable private transfers.",
      "We build your adventure itinerary around the activities you want most, matching operators, seasons and driving days for a seamless experience. Whether you are an adrenaline seeker or simply want an active holiday, we tailor the pace and intensity to suit you."
    ],
    cta: "Build an Adventure Tour",
    h1: "Sri Lanka Adventure Tour",
    openingParagraph:
      "For visitors drawn to active travel, Sri Lanka offers mountain landscapes, waterways and outdoor destinations. Explore our adventure tour page to identify the planned activities, locations and practical requirements before choosing your trip.",
    seoTitle: "Sri Lanka Adventure Tour | Outdoor Itinerary",
    metaDescription:
      "Discover our Sri Lanka adventure tour itinerary with outdoor destinations and active experiences. Review the route and the activities actually included.",
  },

  /* ------------------------------------------------------------------ 16.9 */
  {
    published: true,
    slug: "honeymoon-tour",
    name: "Honeymoon Tour",
    tagline: "Private • Romantic • Personalized",
    categories: ["honeymoon", "popular"],
    duration: "5 Days / 4 Nights",
    days: 5,
    nights: 4,
    startLocation: "Kandy",
    endLocation: "Mirissa",
    heroImage: '/itineraries/hero/honeymoon.png',
    summary:
      "A private romantic escape combining hill-country scenery, tea country and beach relaxation – from the cool mountains of Kandy and Nuwara Eliya to the golden sands of Mirissa.",
    route: ["Kandy", "Nuwara Eliya", "Ella", "Mirissa"],
    highlights: ["Romantic stays", "Sunset experiences", "Tea country", "Scenic mountain views", "Beach relaxation", "Optional whale watching"],
    dayByDay: [
      {
        day: 1, title: "Arrival · Kandy",
        points: [
          "Your private driver meets you at the airport and whisks you on a scenic drive up into the cool hill country",
          "Check into your romantic boutique hotel and freshen up after your journey",
          "Take a leisurely evening stroll hand-in-hand around the beautiful Kandy Lake",
          "Enjoy a candlelit dinner at a restaurant overlooking the water, the perfect start to your escape"
        ]
      },
      {
        day: 2, title: "Kandy → Nuwara Eliya",
        points: [
          "Wind through breathtaking mountain roads to a working tea plantation for a private tasting experience",
          "Stop to admire the spectacular Ramboda Falls tumbling through the misty highland scenery",
          "Arrive in the cool, colonial-charmed 'Little England' of Nuwara Eliya",
          "Enjoy a romantic evening walk around Gregory Lake or a cozy dinner by the fireplace"
        ]
      },
      {
        day: 3, title: "Nuwara Eliya → Ella",
        points: [
          "Drive through rolling tea-green mountains to the scenic hill town of Ella",
          "Photograph the iconic Nine Arches Bridge as a vintage train passes through the lush landscape",
          "Watch the sunset together from Little Adam's Peak with sweeping panoramic valley views",
          "Savour a romantic dinner with a mountain backdrop at a clifftop restaurant"
        ]
      },
      {
        day: 4, title: "Ella → Mirissa",
        points: [
          "Drive from the highlands down to the warm, golden beaches of Sri Lanka's south coast",
          "Arrive at Mirissa – one of the island's most beautiful and intimate beach destinations",
          "Spend a blissful afternoon swimming and relaxing on the sun-kissed crescent beach",
          "Watch the sun sink into the Indian Ocean from Coconut Tree Hill or a beachfront table"
        ]
      },
      {
        day: 5, title: "Mirissa · Departure",
        points: [
          "Optional: set sail together at dawn on an early-morning whale and dolphin watching cruise (seasonal)",
          "Enjoy a leisurely final breakfast at your resort listening to the sound of the ocean",
          "Your private driver collects you for a comfortable transfer to the airport"
        ]
      },
    ],
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Mirissa"],
    destinationDetails: [
      {
        name: "Kandy",
        images: ['/destinations/Kandy 1.webp', '/day-tours/kandy/kandy-lake.webp'],
        points: [
          "Arrive in the cultural heart of Sri Lanka and settle into your romantic hillside boutique hotel",
          "Stroll hand-in-hand around the serene Kandy Lake as the evening lights reflect on the water",
          "Visit the sacred Temple of the Tooth Relic and experience the spiritual soul of the city",
          "Enjoy an intimate candlelit dinner overlooking the lake to begin your romantic escape"
        ]
      },
      {
        name: "Nuwara Eliya",
        images: ['/day-tours/nuwaraeliya/little-england.png', '/day-tours/nuwaraeliya/gregory-lake.webp'],
        points: [
          "Escape to the misty highlands of 'Little England', where the cool air and colonial charm set a perfect romantic scene",
          "Explore a working tea plantation together and share a private tasting of world-famous Ceylon tea",
          "Stroll through the beautifully landscaped Victoria Park or along the shores of Gregory Lake",
          "Curl up together for a cozy evening in your chic highland hotel, warmed by the cool mountain air"
        ]
      },
      {
        name: "Ella",
        images: ['/day-tours/ella/nine-arch.webp', '/day-tours/ella/little-adams-peak.webp'],
        points: [
          "Discover the breathtaking Nine Arches Bridge – a truly cinematic experience as a train emerges from the green hills",
          "Hike up to Little Adam's Peak at sunset and share the sweeping view of the valleys below",
          "Cool off together at the dramatic Ravana Falls just outside the town",
          "Dine at a clifftop restaurant as the mountain panorama turns golden in the evening light"
        ]
      },
      {
        name: "Mirissa",
        images: ['/destinations/mirissa3.jpg', '/destinations/mirissa2.webp'],
        points: [
          "Arrive at the golden crescent of Mirissa beach – the perfect romantic finale to your Sri Lanka escape",
          "Spend blissful afternoons swimming and unwinding on the soft white sand beneath swaying palms",
          "Watch one of Sri Lanka's most spectacular sunsets together from Coconut Tree Hill",
          "Set sail at dawn on a whale-watching cruise (seasonal) for an unforgettable shared adventure"
        ]
      },
    ],
    accommodation: "Romantic stays – boutique, luxury and villa options",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Tea country visits", "Sunset experiences", "Scenic mountain drives", "Beach relaxation"],
    optionalExperiences: ["Whale watching at Mirissa", "Candlelit beach dinner", "Couples' spa treatment", "Scenic train ride"],
    gallery: [img.couple, img.tea, img.ella, img.beach, img.resort],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day", discountPercent: 10 },
    faqs: [
      { q: "Is the 10% honeymoon discount automatic?", a: "Yes. All packages tagged Honeymoon receive a 10% discount on the displayed price – it is applied automatically to your quotation." },
      { q: "Can we extend the beach stay?", a: "Yes – many couples add nights in Mirissa or Unawatuna; tell us your dates and we will re-plan." },
    ],
    related: ["see-the-best-of-sri-lanka", "beach-tour", "luxury-tour"],
    mapImage: "/itineraries/honeymoon final.png",
    mapTitle: "A Romantic Journey Through the Highlands & Coast",
    mapDescription: [
      "This five-day romantic escape traces a beautiful arc from the cool cultural highlands of Kandy, through the misty tea country of Nuwara Eliya and the scenic mountain town of Ella, before descending to the warm golden sands of Mirissa on the south coast. Every stage of the journey is designed to be as scenic as the destination itself.",
      "Your private driver ensures every transfer is comfortable and unhurried, so the journey feels like part of the romance. Sunset moments, candlelit dinners and intimate boutique stays are woven into the route — making this much more than just a tour."
    ],
    cta: "Customize This Tour",
    h1: "Sri Lanka Honeymoon Tour",
    openingParagraph:
      "Sri Lanka offers couples a mix of mountain scenery, cultural destinations and coastal settings. Our honeymoon tour brings these possibilities into an itinerary you can review together; check the route and included arrangements before enquiring.",
    seoTitle: "Sri Lanka Honeymoon Tour | Romantic Itinerary",
    metaDescription:
      "Plan a Sri Lanka honeymoon journey with scenic destinations and time together. Explore the itinerary, planned stays and package details.",
  },

  /* ----------------------------------------------------------------- 16.10 */
  {
    published: true,
    slug: "family-tour",
    name: "Family Tour",
    tagline: "Create Memories Together",
    categories: ["family", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/family.png',
    summary:
      "Family-friendly Sri Lanka packages with comfortable transportation and flexible itineraries – child-friendly activities, sensible driving days and time to relax between them.",
    highlights: ["Child-friendly activities", "Flexible travel schedules", "Comfortable vehicles", "Elephants and safari", "Beaches", "Gardens and trains"],
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Yala", "Bentota", "Galle"],
    destinationDetails: [
      { name: "Kandy",        images: ['/day-tours/kandy/templeofthetooth.webp', '/day-tours/kandy/peradeniya.webp'] },
      { name: "Nuwara Eliya", images: ['/day-tours/nuwaraeliya/little-england.png', '/day-tours/nuwaraeliya/gregory-lake.webp'] },
      { name: "Ella",         images: ['/day-tours/ella/nine-arch.webp', '/day-tours/ella/little-adams-peak.webp'] },
      { name: "Yala",         images: ['/destinations/Yala.webp', '/destinations/yala3.png'] },
      { name: "Bentota",      images: ['/destinations/benthota.webp', '/day-tours/bentota/madu-river.webp'] },
      { name: "Galle",        images: ['/day-tours/galle/galle-fort.webp', '/experience/shopping.webp'] },
    ],
    accommodation: "Family rooms and villas – Budget to Luxury",
    mealPlan: "As selected in your quotation",
    transportation: "Spacious private vehicle; child seats on request",
    driverGuide: "English-speaking driver",
    activities: ["Private safari", "Botanical gardens", "Beach and river boat rides", "Tea factory visit", "Fort walk"],
    optionalExperiences: ["Turtle hatchery visit", "Short scenic train ride", "Cooking class for families"],
    gallery: [img.elephant, img.beach, img.kandy, img.ella, img.aerialBeach],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "How is child pricing handled?", a: "Child pricing depends on age, hotel, transport and activity providers and is confirmed at booking. Please share children's ages when you enquire." },
    ],
    related: ["see-the-best-of-sri-lanka", "beach-tour", "into-the-wild-sri-lanka"],
    mapImage: "/itineraries/family final.png",
    mapTitle: "Family Adventures Across Sri Lanka",
    mapDescription: [
      "This family-friendly route connects six of Sri Lanka's most rewarding destinations in a logical, comfortable sequence. Starting in the cultural heart of Kandy with its botanical gardens and temple, the journey winds up through the tea country to Nuwara Eliya, across to Ella's Nine Arches Bridge, south to Yala's safari jeeps, and finally to the beaches of Bentota and the historic Galle Fort.",
      "Driving days are kept short and child-friendly, with plenty of stops, flexible timing and spacious vehicles. Entrance tickets, child seats and activity arrangements are all handled for you so the whole family can simply relax and enjoy every moment."
    ],
    cta: "Customize This Tour",
    h1: "Sri Lanka Family Tour",
    openingParagraph:
      "A family trip to Sri Lanka can combine cultural places, beaches, nature and time to explore at a comfortable pace. Our family tour page sets out the published journey so you can decide whether its itinerary suits your group's ages and interests.",
    seoTitle: "Sri Lanka Family Tour | Family Holiday Itinerary",
    metaDescription:
      "Explore a Sri Lanka family tour designed around a shared island holiday. Review its destinations, activities and practical itinerary information.",
  },

  /* ----------------------------------------------------------------- 16.11 */
  {
    published: true,
    slug: "luxury-tour",
    name: "Luxury Tour",
    tagline: "Travel Sri Lanka in Style",
    categories: ["luxury"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/luxury.png',
    summary:
      "Luxury vehicles, premium hotels, a private chauffeur, private experiences, fine dining and exclusive excursions – a fully customized itinerary where every detail is arranged for you.",
    highlights: ["Luxury vehicles", "Premium hotels", "Private chauffeur", "Private experiences", "Fine dining", "Exclusive excursions", "Fully customized itinerary"],
    destinations: ["Colombo", "Sigiriya", "Kandy", "Nuwara Eliya", "Yala", "Galle"],
    destinationDetails: [
      { name: "Colombo",      images: ['/destinations/cityofdreams.jpg', '/destinations/colombo-dining.png'] },
      { name: "Sigiriya",     images: ['/destinations/Sigiriya.webp', '/destinations/sigiriya-hotel.webp'] },
      { name: "Kandy",        images: ['/destinations/Kandy 2.webp', '/destinations/kandy 3.png'] },
      { name: "Nuwara Eliya", images: ['/destinations/Nuwara Eliya.webp', '/day-tours/nuwaraeliya/tea-plantation.webp'] },
      { name: "Yala",         images: ['/destinations/Yala.webp', '/destinations/yala2.png'] },
      { name: "Galle",        images: ['/day-tours/galle/lighthouse.webp', '/day-tours/galle/galle-fort.webp'] },
    ],
    accommodation: "5-star, boutique and luxury villas",
    mealPlan: "As selected in your quotation",
    transportation: "Luxury vehicle with private chauffeur",
    driverGuide: "Private chauffeur; 24/7 travel assistance",
    activities: ["Private guided experiences", "Fine dining", "Exclusive excursions", "Wellness and spa"],
    optionalExperiences: ["Helicopter or seaplane transfers", "Private yacht or boat charter", "Exclusive after-hours site visits"],
    gallery: [img.resort, img.spa, img.sunrise, img.galle, img.beach],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: sharedFaqs("the Luxury Tour").slice(0, 1),
    related: ["honeymoon-tour", "see-the-best-of-sri-lanka", "cultural-heritage-tour"],
    mapImage: "/itineraries/luxury tour final.png",
    mapTitle: "Sri Lanka's Finest, Without Compromise",
    mapDescription: [
      "This luxury itinerary connects Sri Lanka's most prestigious destinations — from the vibrant fine-dining scene of Colombo, to the iconic Sigiriya rock fortress, the cultural richness of Kandy, the rolling tea estates of Nuwara Eliya, the wildlife of Yala, and the elegant streets of Galle Fort. Every stop is chosen for its combination of world-class experience and scenic beauty.",
      "Your private chauffeur handles every transfer in a luxury vehicle, while our team pre-arranges exclusive dining experiences, private guided tours, and premium accommodations at each destination. This is Sri Lanka without compromise — a journey designed around your exact preferences."
    ],
    cta: "Customize This Tour",
    h1: "Luxury Sri Lanka Tour",
    openingParagraph:
      "A luxury-focused Sri Lanka journey is about choosing destinations and experiences that align with your travel preferences. Explore the itinerary and check the exact accommodation, transport and inclusions listed before deciding whether this tour is right for you.",
    seoTitle: "Luxury Sri Lanka Tour | Premium Travel Itinerary",
    metaDescription:
      "Explore a luxury Sri Lanka tour and review its carefully planned destinations and travel arrangements. See the itinerary and package inclusions.",
  },

  /* ------------------------------------------------ North & East (§14 category) */
  {
    published: true,
    slug: "north-east-sri-lanka-tour",
    name: "North & East Sri Lanka Tour",
    tagline: "Hidden gems off the classic route",
    categories: ["northEast", "beach"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/northeast.png',
    summary:
      "The quieter side of the island – Trincomalee's sacred rock and calm bays, the white sands of Nilaveli and Pasikuda, the surf of Arugam Bay and the distinct culture of Jaffna in the far north.",
    highlights: ["Koneswaram Temple, Trincomalee", "Nilaveli beach", "Pasikuda bay", "Arugam Bay surf", "Jaffna culture", "Quiet east-coast beaches"],
    destinations: ["Trincomalee", "Nilaveli", "Pasikuda", "Arugam Bay", "Jaffna"],
    destinationDetails: [
      { name: "Trincomalee", images: ['/destinations/trincomalee 1.webp', '/destinations/trincomalee 2.webp'] },
      { name: "Nilaveli",    images: ['/destinations/nilaveli.png', '/destinations/nilaveli2.png'] },
      { name: "Pasikuda",    images: ['/destinations/pasikuda1.png', '/destinations/pasikuda.png'] },
      { name: "Arugam Bay",  images: ['/destinations/arugam bay.webp', '/destinations/arugambay2.jpg'] },
      { name: "Jaffna",      images: ['/destinations/jaffna1.png', '/destinations/jaffna2.png'] },
    ],
    accommodation: "Your choice – Budget to Luxury",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Temple visits", "Beach time and swimming", "Snorkelling", "Surfing", "Boat rides"],
    optionalExperiences: ["Pigeon Island snorkelling", "Whale watching from Trincomalee (seasonal)", "Surf lessons at Arugam Bay"],
    gallery: [img.aerialBeach, img.beach, img.temple, img.surf, img.whale],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "When is the best time for the east coast?", a: "The east coast has a different season from the south-west – we match your travel dates to the right coast so you get calm seas." },
    ],
    related: ["beach-tour", "ramayana-tour", "adventure-tour"],
    mapImage: "/itineraries/north.png",
    mapTitle: "The Quieter Side of the Island",
    mapDescription: [
      "While most visitors stick to Sri Lanka's western circuit, the north and east coastline offers a completely different experience — sacred temples perched on ocean cliffs in Trincomalee, pristine white-sand beaches at Nilaveli and Pasikuda, world-class surf at Arugam Bay, and the distinct Tamil culture and cuisine of Jaffna in the far north.",
      "This tailor-made itinerary takes you through Sri Lanka's lesser-explored regions, travelling comfortably in a private air-conditioned vehicle with an experienced driver who knows every back road and hidden gem along the way."
    ],
    cta: "Customize This Tour",
    h1: "North & East Sri Lanka Tour",
    openingParagraph:
      "Northern and eastern Sri Lanka bring together distinct cultural settings, historic places and coastal destinations. Review our North and East Sri Lanka tour to see the route covered and understand how the journey is organized.",
    seoTitle: "North & East Sri Lanka Tour | Regional Itinerary",
    metaDescription:
      "Discover Sri Lanka's north and east through a dedicated tour itinerary. Explore the featured towns, coastal landscapes and cultural destinations.",
  },

  /* ----------------------------------------------------------------- 16.12 */
  {
    published: true,
    slug: "budget-tour",
    name: "Budget Tour",
    tagline: "Explore More. Spend Less.",
    categories: ["budget"],
    duration: "Tailor-made – you choose the length",
    heroImage: '/itineraries/hero/budget.png',
    summary:
      "Affordable Sri Lanka journeys designed to preserve comfort, flexibility and local experience – the same private vehicle and experienced driver, with accommodation and extras chosen to suit your budget.",
    highlights: ["Comfortable transport", "Experienced driver", "Airport transfers", "Flexible itinerary"],
    bestFor: ["Solo travellers", "Couples", "Friends", "Backpackers", "Small groups"],
    destinations: ["Colombo", "Kandy", "Ella", "Mirissa", "Galle"],
    destinationDetails: [
      { name: "Colombo", images: ['/destinations/cmb city.png', '/destinations/Colombo.webp'] },
      { name: "Kandy",   images: ['/destinations/Kandy 1.webp', '/destinations/Kandy 2.webp'] },
      { name: "Ella",    images: ['/destinations/ella.webp', '/destinations/ravanafalls.webp'] },
      { name: "Mirissa", images: ['/destinations/mirissa.webp', '/destinations/mirissa2.webp'] },
      { name: "Galle",   images: ['/day-tours/galle/galle-fort.webp', '/day-tours/galle/unawatuna.webp'] },
    ],
    accommodation: "Budget and 3-star stays",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver",
    activities: ["Scenic drives", "Temple visits", "Beach time", "Hill-country walks"],
    optionalExperiences: ["Public train ride through tea country", "Local food walks", "Shared safari jeep"],
    gallery: [img.hikers, img.ella, img.beach, img.kandy, img.tea],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: [
      { q: "Are there seasonal discounts?", a: "Yes – discounts and offers may be added depending on special seasons and situations. Ask us about current offers when you enquire." },
    ],
    related: ["see-the-best-of-sri-lanka", "beach-tour", "nature-tour"],
    mapImage: "/itineraries/budget final.png",
    mapTitle: "Explore More of Sri Lanka for Less",
    mapDescription: [
      "A great Sri Lanka experience does not have to come at a luxury price. This budget-friendly route covers the island's most rewarding highlights — starting in the vibrant capital Colombo, winding up to the cultural hub of Kandy, climbing through the scenic hill country to Ella, and finishing along the south coast at Mirissa and Galle.",
      "The same private vehicle, the same English-speaking driver, and the same flexibility — simply with accommodation and optional activities chosen to match your budget. We help you get the most out of every rupee, without cutting corners on the experience that matters."
    ],
    cta: "Customize This Tour",
    h1: "Budget Sri Lanka Tour",
    openingParagraph:
      "Explore Sri Lanka with a focus on managing travel costs while still seeing destinations that interest you. Our budget tour page provides a route and inclusions to review so you can understand what the package covers before enquiring.",
    seoTitle: "Budget Sri Lanka Tour | Value-Focused Itinerary",
    metaDescription:
      "Explore a budget Sri Lanka tour and review the published itinerary, inclusions and travel arrangements to plan a cost-conscious island holiday.",
  },
];
