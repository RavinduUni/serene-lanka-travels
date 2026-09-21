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
    image: c("photo-1598970605070-a38a6ccd3a2d"),
  },
  {
    label: "Luxury Tours",
    slug: "luxury-tour",
    href: "/sri-lanka-itineraries/luxury-tour",
    tag: "Premium Experience",
    image: c("photo-1566073771259-6a8506099945"),
  },
  {
    label: "Honeymoon Tours",
    slug: "honeymoon-tour",
    href: "/sri-lanka-itineraries/honeymoon-tour",
    tag: "Romantic Escapes",
    image: c("photo-1507525428034-b723cf961d3e"),
  },
  {
    label: "Family Tours",
    slug: "family-tour",
    href: "/sri-lanka-itineraries/family-tour",
    tag: "All Ages Welcome",
    image: c("photo-1511895426328-dc8714191011"),
  },
  {
    label: "Wildlife Tours",
    slug: "into-the-wild-sri-lanka",
    href: "/sri-lanka-itineraries/into-the-wild-sri-lanka",
    tag: "Safari & Nature",
    image: c("photo-1564760055775-d63b17a55c44"),
  },
  {
    label: "Adventure Tours",
    slug: "adventure-tour",
    href: "/sri-lanka-itineraries/adventure-tour",
    tag: "Thrills & Trails",
    image: c("photo-1533130061792-64b345e4a833"),
  },
  {
    label: "Cultural & Heritage Tours",
    slug: "cultural-heritage-tour",
    href: "/sri-lanka-itineraries/cultural-heritage-tour",
    tag: "Ancient Wonders",
    image: c("photo-1612862862126-865765df2ded"),
  },
  {
    label: "Beach Holidays",
    slug: "beach-tour",
    href: "/sri-lanka-itineraries/beach-tour",
    tag: "Sun, Sand & Sea",
    image: c("photo-1502680390469-be75c86b636f"),
  },
  {
    label: "Nature Tours",
    slug: "nature-tour",
    href: "/sri-lanka-itineraries/nature-tour",
    tag: "Lush Landscapes",
    image: c("photo-1566296314736-6eaac1ca0cb9"),
  },
  {
    label: "North & East Sri Lanka Tours",
    slug: "north-east-sri-lanka-tour",
    href: "/sri-lanka-itineraries/north-east-sri-lanka-tour",
    tag: "Hidden Gems",
    image: c("photo-1588253921378-9c5dde739e88"),
  },
  {
    label: "Budget Tours",
    slug: "budget-tour",
    href: "/sri-lanka-itineraries/budget-tour",
    tag: "Great Value",
    image: c("photo-1576675784201-0e142b423952"),
  },
  {
    label: "Ramayana Tours",
    slug: "ramayana-tour",
    href: "/sri-lanka-itineraries/ramayana-tour",
    tag: "Pilgrimage Trail",
    image: c("photo-1528181304800-259b08848526"),
  },
  {
    label: "Whale Watching Tours",
    slug: "whale-watching-tour",
    href: "/sri-lanka-itineraries/whale-watching-tour",
    tag: "Giants of the Ocean",
    image: c("photo-1568430328012-21ed450453ea"),
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

/** USP chips shown in the intro section */
export const itineraryUsps = [
  { icon: "🛡️", text: "100% Private – only your group" },
  { icon: "✏️", text: "Fully customisable itineraries" },
  { icon: "🗣️", text: "Expert English-speaking drivers" },
];

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
    heroImage: img.sunrise,
    summary:
      "A balanced introduction to Sri Lanka combining culture, tea country, mountains, wildlife and beaches – travelling at your own pace in a private vehicle with an English-speaking driver from arrival to departure.",
    route: ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Galle"],
    highlights: ["Tea plantations", "Waterfalls", "Mountains", "Wildlife", "Beaches", "Galle Fort"],
    dayByDay: [
      { day: 1, title: "Arrival · Colombo", points: ["Airport pickup and transfer to your hotel", "Time to rest, or an evening walk along Galle Face Green"] },
      { day: 2, title: "Colombo → Kandy", points: ["Scenic drive into the hill country", "Temple of the Sacred Tooth Relic", "Evening by Kandy Lake"] },
      { day: 3, title: "Kandy → Nuwara Eliya", points: ["Tea plantation and factory visit with tasting", "Ramboda Falls stop en route", "Cool-climate evening in 'Little England'"] },
      { day: 4, title: "Nuwara Eliya → Ella", points: ["Mountain road through tea country", "Nine Arches Bridge", "Optional Little Adam's Peak walk"] },
      { day: 5, title: "Ella → Yala", points: ["Ravana Falls stop", "Afternoon private safari in Yala National Park"] },
      { day: 6, title: "Yala → Mirissa", points: ["Drive to the south coast", "Beach time at Mirissa", "Optional sunset viewpoint"] },
      { day: 7, title: "Mirissa → Galle · Departure", points: ["Galle Fort ramparts and lanes", "Transfer to the airport or your next destination"] },
    ],
    destinations: ["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Galle"],
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
    cta: "Customize This Tour",
    seoTitle: "See the Best of Sri Lanka – 7 Day Private Tour",
    metaDescription:
      "A 7-day private Sri Lanka itinerary from Colombo to Galle via Kandy, Nuwara Eliya, Ella, Yala and Mirissa – culture, tea country, wildlife and beaches.",
  },

  /* ------------------------------------------------------------------ 16.2 */
  {
    published: true,
    slug: "into-the-wild-sri-lanka",
    name: "Into the Wild Sri Lanka",
    tagline: "Private safari experiences",
    categories: ["wildlife"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.leopard,
    summary:
      "Explore Sri Lanka's wildlife through private safari experiences. From leopard country in the south to the great elephant gatherings of the north-central plains, we build your safari days around the parks, seasons and sightings that matter most to you.",
    highlights: ["Yala National Park", "Udawalawe National Park", "Minneriya National Park", "Kaudulla National Park"],
    possibleSightings: ["Elephants", "Leopards", "Crocodiles", "Deer", "Birdlife"],
    destinations: ["Yala", "Udawalawe", "Minneriya", "Kaudulla"],
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
    cta: "Plan My Wildlife Tour",
    seoTitle: "Into the Wild – Sri Lanka Wildlife & Safari Tour",
    metaDescription:
      "Private Sri Lanka safari tours to Yala, Udawalawe, Minneriya and Kaudulla – elephants, leopards, crocodiles and birdlife with a local driver.",
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
    heroImage: img.temple,
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
      { day: 1, title: "Airport → Chilaw", points: ["Airport pickup", "Munneswaram Temple", "Manavari Temple"] },
      { day: 2, title: "Chilaw → Trincomalee", points: ["Drive to the east coast", "Koneswaram Temple on Swami Rock"] },
      { day: 3, title: "Trincomalee → Sigiriya", points: ["Cobra Hood Cave at Sigiriya", "Optional Sigiriya Rock climb"] },
      { day: 4, title: "Sigiriya → Kandy", points: ["Spice garden visit en route", "Temple of the Tooth Relic"] },
      { day: 5, title: "Kandy → Nuwara Eliya", points: ["Sri Bhaktha Hanuman Temple, Ramboda", "Tea estate visit", "Sita Amman Temple – Ashoka Vatika tradition", "Hakgala Gardens"] },
      { day: 6, title: "Nuwara Eliya → Ella", points: ["Divurumpola Temple", "Ravana Ella Falls", "Ravana Caves"] },
      { day: 7, title: "Ella → Colombo", points: ["Drive to the capital", "Panchamuga Anjaneyar Hanuman Temple", "Colombo city tour"] },
      { day: 8, title: "Colombo → Airport", points: ["Departure transfer"] },
    ],
    destinations: ["Chilaw", "Trincomalee", "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Colombo"],
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
    cta: "Request Ramayana Tour Details",
    seoTitle: "Ramayana Tour Sri Lanka – 8 Day Ramayana Trail",
    metaDescription:
      "An 8-day private Ramayana trail across Sri Lanka: Munneswaram, Koneswaram, Sita Amman, Ravana Falls and Ravana Caves, Kandy and Colombo with a local driver.",
  },

  /* ------------------------------------------------------------------ 16.4 */
  {
    published: true,
    slug: "whale-watching-tour",
    name: "Whale Watching Tour",
    tagline: "Meet the Giants of the Ocean",
    categories: ["whale", "beach"],
    duration: "Package – hotel pickup, transfer and boat trip",
    heroImage: img.whale,
    summary:
      "An early-morning Indian Ocean experience from Mirissa with opportunities to encounter blue whales, sperm whales, dolphins and other marine life – arranged as a simple package of hotel pickup, private transfer and the whale-watching boat trip.",
    highlights: ["Blue whales", "Sperm whales", "Dolphins", "Other marine life"],
    destinations: ["Mirissa"],
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
    cta: "Plan My Whale Watching Trip",
    seoTitle: "Whale Watching Tour Mirissa – Blue Whales & Dolphins",
    metaDescription:
      "Mirissa whale-watching package with private hotel pickup and transfer – blue whales, sperm whales and dolphins on an early-morning Indian Ocean cruise.",
  },

  /* ------------------------------------------------------------------ 16.5 */
  {
    published: true,
    slug: "cultural-heritage-tour",
    name: "Cultural & Heritage Tour",
    tagline: "Discover Sri Lanka's Heritage",
    categories: ["cultural", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.sigiriya,
    summary:
      "Temples, ancient cities, cultural landmarks and local traditions – a journey through the sacred and historic heart of the island, from the Cultural Triangle to the colonial south.",
    highlights: ["Temple of the Sacred Tooth Relic", "Dambulla Cave Temple", "Ancient cities", "Traditional villages", "Galle Fort", "Local cultural experiences"],
    destinations: ["Sigiriya", "Dambulla", "Anuradhapura", "Polonnaruwa", "Kandy", "Galle"],
    accommodation: "Your choice – Budget to Luxury, including boutique heritage stays",
    mealPlan: "As selected in your quotation",
    transportation: "Private air-conditioned vehicle",
    driverGuide: "English-speaking driver; site guides available",
    activities: ["Temple and cave visits", "Ancient city exploration", "Village experiences", "Fort walk"],
    optionalExperiences: ["Sigiriya sunrise climb", "Traditional village lunch", "Kandyan dance performance", "Batik and craft workshops"],
    gallery: [img.sigiriya, img.kandy, img.temple, img.galle, img.pidurangala],
    pricing: { startingFrom: null, currency: "USD", per: "per person / day" },
    faqs: sharedFaqs("the Cultural & Heritage Tour").slice(0, 1),
    related: ["ramayana-tour", "see-the-best-of-sri-lanka", "nature-tour"],
    cta: "Customize This Tour",
    seoTitle: "Sri Lanka Cultural & Heritage Tours",
    metaDescription:
      "Private cultural tours of Sri Lanka: the Temple of the Tooth, Dambulla caves, ancient cities, traditional villages and Galle Fort with a local driver.",
  },

  /* ------------------------------------------------------------------ 16.6 */
  {
    published: true,
    slug: "beach-tour",
    name: "Beach Tour",
    tagline: "Sun, Sand & Tropical Paradise",
    categories: ["beach", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.aerialBeach,
    summary:
      "Golden south-coast sands, calm east-coast bays and everything in between – a beach itinerary built around relaxation, swimming, snorkelling and sunsets, with private transfers between every stop.",
    highlights: ["Mirissa", "Unawatuna", "Hikkaduwa", "Bentota", "Weligama", "Nilaveli"],
    bestFor: ["Relaxation", "Swimming", "Snorkelling", "Sunsets", "Beach activities"],
    destinations: ["Mirissa", "Unawatuna", "Hikkaduwa", "Bentota", "Weligama", "Nilaveli"],
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
    cta: "Customize This Tour",
    seoTitle: "Sri Lanka Beach Tours – South & East Coast",
    metaDescription:
      "Private Sri Lanka beach holidays: Mirissa, Unawatuna, Hikkaduwa, Bentota, Weligama and Nilaveli with transfers, snorkelling and sunset experiences.",
  },

  /* ------------------------------------------------------------------ 16.7 */
  {
    published: true,
    slug: "nature-tour",
    name: "Nature Tour",
    tagline: "Experience Sri Lanka's Natural Beauty",
    categories: ["nature"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.tea,
    summary:
      "Tea plantations, waterfalls, mountains, tropical forests, rivers, lakes and countryside – an itinerary for travellers who want the island's landscapes above all else.",
    highlights: ["Tea plantations", "Waterfalls", "Mountains", "Tropical forests", "Rivers and lakes", "Countryside"],
    destinations: ["Ella", "Nuwara Eliya", "Kandy", "Sinharaja", "Kitulgala"],
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
    cta: "Customize This Tour",
    seoTitle: "Sri Lanka Nature Tours – Tea Country, Waterfalls & Rainforest",
    metaDescription:
      "Private nature tours across Ella, Nuwara Eliya, Kandy, Sinharaja and Kitulgala – tea plantations, waterfalls, mountains and rainforest.",
  },

  /* ------------------------------------------------------------------ 16.8 */
  {
    published: true,
    slug: "adventure-tour",
    name: "Adventure Tour",
    tagline: "Adventure Awaits",
    categories: ["adventure"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.surf,
    summary:
      "Rafting, safari, snorkelling, diving, surfing, zip-lining, cycling and boat rides – build an active Sri Lanka itinerary around the experiences you want, with private transport between every adventure.",
    highlights: ["White-water rafting", "Safari", "Snorkelling", "Diving", "Surfing", "Zip-lining", "Cycling", "Boat rides"],
    destinations: ["Kitulgala", "Ella", "Yala", "Weligama", "Hikkaduwa", "Trincomalee"],
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
    cta: "Build an Adventure Tour",
    seoTitle: "Sri Lanka Adventure Tours – Rafting, Surfing, Safari & More",
    metaDescription:
      "Active Sri Lanka itineraries: white-water rafting, safari, snorkelling, diving, surfing, zip-lining, cycling and boat rides with private transport.",
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
    heroImage: img.couple,
    summary:
      "A private romantic escape combining hill-country scenery, tea country and beach relaxation – from the cool mountains of Kandy and Nuwara Eliya to the golden sands of Mirissa.",
    route: ["Kandy", "Nuwara Eliya", "Ella", "Mirissa"],
    highlights: ["Romantic stays", "Sunset experiences", "Tea country", "Scenic mountain views", "Beach relaxation", "Optional whale watching"],
    dayByDay: [
      { day: 1, title: "Arrival · Kandy", points: ["Airport pickup and scenic drive to Kandy", "Evening stroll by Kandy Lake"] },
      { day: 2, title: "Kandy → Nuwara Eliya", points: ["Tea plantation and factory visit", "Waterfall stops on the mountain road", "Romantic cool-climate evening"] },
      { day: 3, title: "Nuwara Eliya → Ella", points: ["Nine Arches Bridge", "Sunset viewpoint", "Dinner with a mountain view"] },
      { day: 4, title: "Ella → Mirissa", points: ["Drive to the south coast", "Beach relaxation", "Sunset by the ocean"] },
      { day: 5, title: "Mirissa · Departure", points: ["Optional early-morning whale watching", "Transfer to the airport"] },
    ],
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Mirissa"],
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
    cta: "Customize This Tour",
    seoTitle: "Sri Lanka Honeymoon Tour – 5 Day Private Romantic Escape",
    metaDescription:
      "A 5-day private Sri Lanka honeymoon from Kandy to Mirissa via Nuwara Eliya and Ella – tea country, mountain views, sunsets and beach relaxation. 10% honeymoon discount.",
  },

  /* ----------------------------------------------------------------- 16.10 */
  {
    published: true,
    slug: "family-tour",
    name: "Family Tour",
    tagline: "Create Memories Together",
    categories: ["family", "popular"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.elephant,
    summary:
      "Family-friendly Sri Lanka packages with comfortable transportation and flexible itineraries – child-friendly activities, sensible driving days and time to relax between them.",
    highlights: ["Child-friendly activities", "Flexible travel schedules", "Comfortable vehicles", "Elephants and safari", "Beaches", "Gardens and trains"],
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Yala", "Bentota", "Galle"],
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
    cta: "Customize This Tour",
    seoTitle: "Sri Lanka Family Tours – Flexible, Child-Friendly Itineraries",
    metaDescription:
      "Family-friendly private Sri Lanka tours to Kandy, Nuwara Eliya, Ella, Yala, Bentota and Galle with comfortable vehicles and flexible schedules.",
  },

  /* ----------------------------------------------------------------- 16.11 */
  {
    published: true,
    slug: "luxury-tour",
    name: "Luxury Tour",
    tagline: "Travel Sri Lanka in Style",
    categories: ["luxury"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.resort,
    summary:
      "Luxury vehicles, premium hotels, a private chauffeur, private experiences, fine dining and exclusive excursions – a fully customized itinerary where every detail is arranged for you.",
    highlights: ["Luxury vehicles", "Premium hotels", "Private chauffeur", "Private experiences", "Fine dining", "Exclusive excursions", "Fully customized itinerary"],
    destinations: ["Colombo", "Sigiriya", "Kandy", "Nuwara Eliya", "Yala", "Galle"],
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
    cta: "Customize This Tour",
    seoTitle: "Luxury Sri Lanka Tours – Private Chauffeur & Premium Hotels",
    metaDescription:
      "Fully customized luxury Sri Lanka tours: luxury vehicles, premium hotels, private chauffeur, fine dining and exclusive excursions.",
  },

  /* ------------------------------------------------ North & East (§14 category) */
  {
    published: true,
    slug: "north-east-sri-lanka-tour",
    name: "North & East Sri Lanka Tour",
    tagline: "Hidden gems off the classic route",
    categories: ["northEast", "beach"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.aerialBeach,
    summary:
      "The quieter side of the island – Trincomalee's sacred rock and calm bays, the white sands of Nilaveli and Pasikuda, the surf of Arugam Bay and the distinct culture of Jaffna in the far north.",
    highlights: ["Koneswaram Temple, Trincomalee", "Nilaveli beach", "Pasikuda bay", "Arugam Bay surf", "Jaffna culture", "Quiet east-coast beaches"],
    destinations: ["Trincomalee", "Nilaveli", "Pasikuda", "Arugam Bay", "Jaffna"],
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
    cta: "Customize This Tour",
    seoTitle: "North & East Sri Lanka Tours – Trincomalee, Nilaveli, Arugam Bay & Jaffna",
    metaDescription:
      "Private tours of Sri Lanka's north and east: Trincomalee, Nilaveli, Pasikuda, Arugam Bay and Jaffna – quiet beaches, sacred sites and surf.",
  },

  /* ----------------------------------------------------------------- 16.12 */
  {
    published: true,
    slug: "budget-tour",
    name: "Budget Tour",
    tagline: "Explore More. Spend Less.",
    categories: ["budget"],
    duration: "Tailor-made – you choose the length",
    heroImage: img.hikers,
    summary:
      "Affordable Sri Lanka journeys designed to preserve comfort, flexibility and local experience – the same private vehicle and experienced driver, with accommodation and extras chosen to suit your budget.",
    highlights: ["Comfortable transport", "Experienced driver", "Airport transfers", "Flexible itinerary"],
    bestFor: ["Solo travellers", "Couples", "Friends", "Backpackers", "Small groups"],
    destinations: ["Colombo", "Kandy", "Ella", "Mirissa", "Galle"],
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
    cta: "Customize This Tour",
    seoTitle: "Budget Sri Lanka Tours – Explore More, Spend Less",
    metaDescription:
      "Affordable private Sri Lanka tours for solo travellers, couples, friends and small groups – comfort, flexibility and local experience on a budget.",
  },
];
