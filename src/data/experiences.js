/**
 * Experiences – content for /experiences (landing) and /experiences/[slug] (detail).
 * Eight experience categories matching the home-page ExperienceGrid items exactly.
 * Slugs match the hrefs already defined in data/home.js.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/* ── Shared image map ─────────────────────────────────────────────── */
const img = {
  /* wildlife */
  leopard:    u("photo-1456926631375-92c8ce872def"),
  elephant:   u("photo-1516426122078-c23e76319801"),
  whale:      u("photo-1568430328012-21ed450453ea"),
  birdwatch:  u("photo-1444464666168-49d633b86797"),
  /* culture */
  templeKandy: u("photo-1528181304800-259b08848526"),
  sigiriya:    u("photo-1612862862126-865765df2ded"),
  dambulla:    u("photo-1602602516934-224b56a29dde"),
  polonnaruwa: u("photo-1552465011-b4e21bf6e79a"),
  /* beaches */
  mirissaBeach: u("photo-1507525428034-b723cf961d3e"),
  galleBeach:   u("photo-1580889240912-c39ecefd3d95"),
  trincoBeach:  u("photo-1530053969600-caed2596d242"),
  nilaveli:     u("photo-1506929562872-bb421503ef21"),
  /* adventure */
  rafting:    u("photo-1530866495561-507c9faab2ed"),
  surfing:    u("photo-1502680390469-be75c86b636f"),
  hiking:     u("photo-1551632811-561732d1e306"),
  sunrise:    u("photo-1469474968028-56623f02e42e"),
  /* nature */
  teaPlant:   u("photo-1576675784201-0e142b423952"),
  waterfall:  u("photo-1432405972618-c60b0225b8f9"),
  rainforest: u("photo-1441974231531-c6227db76b6e"),
  ella:       u("photo-1566296314736-6eaac1ca0cb9"),
  /* food */
  food:       u("photo-1504674900247-0877df9cc836"),
  spice:      u("photo-1596040033229-a9821ebd058d"),
  cooking:    u("photo-1414235077428-338989a2e8c0"),
  market:     u("photo-1555529669-e69e7aa0ba9a"),
  /* luxury */
  resortPool: u("photo-1520250497591-112f2f40a3f4"),
  luxuryRoom: u("photo-1591088816763-0b4ed3a19e59"),
  spa:        u("photo-1544161515-4ab6ce6db874"),
  chauffeur:  u("photo-1449965408869-eaa3f722e40d"),
  /* wellness */
  yoga:       u("photo-1544161515-4ab6ce6db874"),
  ayurveda:   u("photo-1583454110551-21f2fa2afe61"),
  meditation: u("photo-1506905925346-21bda4d32df4"),
};

/* ── Landing page copy ─────────────────────────────────────────────── */
export const experiencesLanding = {
  heading: ["Sri Lanka", "Experiences"],
  intro:
    "Every traveller wants something different from the island – from leopard safaris and ancient temples to beach escapes, hill-country hikes and Ayurvedic retreats. Explore the experiences that define Sri Lanka and build your journey around what you love most.",
};

/* ── Category filter chips for the landing grid ───────────────────── */
export const experienceCategories = [
  { id: "all",       label: "All experiences" },
  { id: "wildlife",  label: "Wildlife & Nature" },
  { id: "culture",   label: "Culture & Heritage" },
  { id: "beaches",   label: "Beaches" },
  { id: "adventure", label: "Adventure" },
  { id: "food",      label: "Food & Local" },
  { id: "luxury",    label: "Luxury" },
  { id: "wellness",  label: "Wellness" },
];

/* ── Eight experience records ─────────────────────────────────────── */
export const experiences = [
  /* ─────────────────────────────── WILDLIFE ─────────────────────── */
  {
    published: true,
    slug: "wildlife",
    name: "Wildlife & Safari",
    category: "wildlife",
    heroImage: img.leopard,
    blurb:
      "Sri Lanka has one of the world's highest densities of leopards. Add elephants, sloth bears and whale watching and it becomes a wildlife destination without equal.",
    intro: [
      "Sri Lanka punches far above its size as a wildlife destination. Yala National Park holds the world's highest density of leopards, and sightings are frequent, not rare. Minneriya hosts the famous \u2018Gathering\u2019 one of Asia’s largest terrestrial wildlife spectacles when hundreds of wild elephants converge on a single tank.",
      "Blue whales can be spotted off Mirissa, sperm whales and dolphins accompany them, and the island's birdlife over 230 resident species rewards even the most casual observer. Every one of these experiences can be woven into a private day tour or multi-day itinerary tailored around your dates.",
    ],
    whySriLanka: [
      "World's highest density of leopards in Yala National Park",
      "The Gathering hundreds of elephants at Minneriya Tank",
      "Blue and sperm whale watching from Mirissa (November to April)",
      "Over 230 resident bird species including the Sri Lanka junglefowl",
      "Elephants at Pinnawala Elephant Orphanage & Udawalawe",
      "Year-round safari opportunities across multiple national parks",
    ],
    bestLocations: [
      { name: "Yala National Park", image: img.leopard,   blurb: "The world's most accessible big-cat park, with leopard sightings on nearly every game drive." },
      { name: "Minneriya",          image: img.elephant,  blurb: "The Gathering August to October sees hundreds of elephants at the ancient reservoir." },
      { name: "Udawalawe",          image: img.elephant,  blurb: "Reliable elephant herds in an open-grassland setting sometimes called Sri Lanka's Masai Mara." },
      { name: "Mirissa (Ocean)",    image: img.whale,     blurb: "Sri Lanka's premier whale-watching port blue whales from November to April." },
    ],
    activities: [
      { icon: "Binoculars", label: "Game drives",         blurb: "Jeep safaris in Yala, Udawalawe or Wilpattu with an experienced tracker." },
      { icon: "Footprints", label: "Elephant safaris",    blurb: "Observe wild herds at Minneriya and Kaudulla during the Gathering season." },
      { icon: "Waves",      label: "Whale watching",      blurb: "Day boat trips from Mirissa or Trincomalee for blue whales and dolphins." },
      { icon: "Bird",       label: "Birdwatching",        blurb: "Guided walks in Sinharaja Biosphere Reserve or the wetlands of Bundala." },
      { icon: "Camera",     label: "Wildlife photography", blurb: "Private sunset and sunrise game drives optimised for the best wildlife photography light." },
    ],
    bestSeason: {
      summary: "Wildlife is accessible year-round, but the best season depends on the specific experience.",
      details: [
        { period: "Nov to Apr", note: "Best for Yala leopard safaris and Mirissa whale watching (dry season on the south coast)." },
        { period: "Aug to Oct", note: "Best for the Gathering at Minneriya (peak elephant congregation)." },
        { period: "May to Sep", note: "Best for whale watching on the east coast (Trincomalee area)." },
        { period: "Year-round", note: "Udawalawe elephant sightings are consistently good throughout the year." },
      ],
    },
    relatedDestinations: ["yala", "mirissa", "kandy"],
    relatedDayTours: [],
    relatedItineraries: ["into-the-wild-sri-lanka", "see-the-best-of-sri-lanka"],
    seoTitle: "Wildlife & Safari Experiences in Sri Lanka",
    metaDescription:
      "Leopard safaris, elephant gatherings, whale watching and birdwatching discover Sri Lanka's world-class wildlife experiences with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── CULTURE ──────────────────────── */
  {
    published: true,
    slug: "culture",
    name: "Culture & Heritage",
    category: "culture",
    heroImage: img.templeKandy,
    blurb:
      "Sacred temples, ancient cities and living traditions Sri Lanka's 2,500-year history unfolds across UNESCO World Heritage Sites and vibrant cultural festivals.",
    intro: [
      "Sri Lanka's Cultural Triangle is a UNESCO World Heritage treasure trove. Sigiriya's 5th century lion rock fortress rises 200 metres from the jungle, its summit gardens among the most sophisticated in the ancient world. Nearby Dambulla's Golden Cave Temple shelters 157 statues of the Buddha inside five natural chambers.",
      "Kandy, the last royal capital, holds the sacred Temple of the Tooth Relic the most venerated Buddhist shrine on the island. Polonnaruwa and Anuradhapura reveal the scale of the island's medieval kingdoms. Every visit can be made private, at your pace, with a knowledgeable local driver guide.",
    ],
    whySriLanka: [
      "Eight UNESCO World Heritage Sites more per km\u00b2 than almost anywhere on earth",
      "2,500 years of continuous Buddhist civilisation",
      "Living traditions Kandyan dance, mask carving, batik and handloom weaving",
      "Ancient hydraulic engineering tanks and irrigation systems still in use today",
      "Vibrant festivals Esala Perahera, Vesak and Thai Pongal",
      "Accessible, well-preserved ruins that are rarely crowded",
    ],
    bestLocations: [
      { name: "Sigiriya",       image: img.sigiriya,     blurb: "The ancient lion-rock palace fortress one of the world's great archaeological sites." },
      { name: "Kandy Temple",   image: img.templeKandy,  blurb: "The Temple of the Tooth Relic, the most sacred Buddhist site in Sri Lanka." },
      { name: "Dambulla Caves", image: img.dambulla,     blurb: "Five cave temples with 157 Buddha statues and ancient murals spanning the ceiling." },
      { name: "Polonnaruwa",    image: img.polonnaruwa,  blurb: "The medieval capital with remarkably preserved royal palaces, stupas and Buddha sculptures." },
    ],
    activities: [
      { icon: "Mountain",   label: "Sigiriya climb",       blurb: "Ascend the iconic 200m rock fortress at sunrise for jungle panoramas." },
      { icon: "Star",       label: "Temple visits",         blurb: "Private guided visits to Kandy Temple, Dambulla Caves and Polonnaruwa ruins." },
      { icon: "Music",      label: "Kandyan dance show",    blurb: "An evening cultural performance in Kandy featuring traditional drumming and fire dance." },
      { icon: "Palette",    label: "Craft village tour",    blurb: "Demonstrations of batik, woodcarving and lacquerware in Kandy's artisan villages." },
      { icon: "Leaf",       label: "Spice garden visit",    blurb: "Guided walk through a traditional spice plantation near Matale." },
    ],
    bestSeason: {
      summary: "The Cultural Triangle is comfortable year-round, but cooler and drier conditions make exploration easier.",
      details: [
        { period: "Dec to Apr", note: "Dry season on the west and north ideal for comfortable sightseeing at Sigiriya, Kandy and Polonnaruwa." },
        { period: "Jul to Aug", note: "The spectacular Esala Perahera festival takes place in Kandy one of Asia's greatest pageants." },
        { period: "May",       note: "Vesak full-moon celebrations illuminate temples island-wide with lanterns and oil lamps." },
        { period: "Year-round", note: "The Cultural Triangle sites are open every day; early morning visits avoid the midday heat." },
      ],
    },
    relatedDestinations: ["kandy", "sigiriya", "colombo"],
    relatedDayTours: ["kandy-day-tour", "sigiriya-dambulla-day-tour"],
    relatedItineraries: ["cultural-heritage-tour", "see-the-best-of-sri-lanka"],
    seoTitle: "Culture & Heritage Experiences in Sri Lanka",
    metaDescription:
      "Explore Sri Lanka's 2,500-year heritage: Sigiriya, Kandy's Temple of the Tooth, Dambulla caves and living traditions with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── BEACHES ──────────────────────── */
  {
    published: true,
    slug: "beaches",
    name: "Beaches",
    category: "beaches",
    heroImage: img.mirissaBeach,
    blurb:
      "Golden south-coast sands and quiet east-coast bays Sri Lanka's coastline offers year-round swimming, whale watching, surf and some of Asia's most unspoilt beaches.",
    intro: [
      "Sri Lanka's coastline stretches for over 1,300 kilometres, encompassing everything from the palm-fringed party beaches of Mirissa to the utterly calm, almost empty bays of the east coast. The south and west coasts are at their finest from November to April; the east coast flips the season, offering pristine conditions from May to September.",
      "Whether you want to swim with sea turtles at Hikkaduwa, catch a sunset from Galle Fort's ramparts, watch blue whales from a Mirissa boat or simply relax on a largely empty beach at Trincomalee or Nilaveli, there's a beach in Sri Lanka that's perfect for you.",
    ],
    whySriLanka: [
      "1,300 km of coastline south, west, north and east all have distinct seasons",
      "Year-round swimming possible by choosing the right coast",
      "Sea turtle nesting at Rekawa and Hikkaduwa",
      "Blue whale watching from Mirissa the world's best accessible location",
      "Galle Fort a UNESCO-listed colonial fortress right on the beach",
      "Uncrowded east-coast bays at Nilaveli and Pasikudah",
    ],
    bestLocations: [
      { name: "Mirissa",     image: img.mirissaBeach, blurb: "Crescent bay, golden sand and the island's top spot for whale watching." },
      { name: "Galle",       image: img.galleBeach,   blurb: "UNESCO fort, boutique hotels, surf breaks and a colonial-era lighthouse." },
      { name: "Trincomalee", image: img.trincoBeach,  blurb: "Natural deep-water harbour with pristine, crystal-clear east-coast bays." },
      { name: "Nilaveli",    image: img.nilaveli,     blurb: "A long, largely deserted strip of white sand north of Trincomalee." },
    ],
    activities: [
      { icon: "Waves",    label: "Whale watching",       blurb: "Boat trips from Mirissa to see blue whales, sperm whales and spinner dolphins." },
      { icon: "Shell",    label: "Turtle watching",      blurb: "Guided night walks to see sea turtles nest at Rekawa and Kosgoda." },
      { icon: "Wind",     label: "Surfing",              blurb: "Year-round waves at Arugam Bay (east) or Hikkaduwa and Weligama (south)." },
      { icon: "Fish",     label: "Snorkelling & diving", blurb: "Coral gardens off Hikkaduwa, Pigeon Island and Bar Reef." },
      { icon: "Sailboat", label: "Lagoon boat rides",    blurb: "Peaceful mangrove river and lagoon tours from Bentota or Pottuvil." },
    ],
    bestSeason: {
      summary: "Sri Lanka's monsoon pattern means the two coasts are at their best at different times of year.",
      details: [
        { period: "Nov to Apr", note: "South and west coast Mirissa, Galle, Bentota, Unawatuna and Hikkaduwa are at their finest." },
        { period: "May to Sep", note: "East coast Trincomalee, Nilaveli, Pasikudah and Arugam Bay in peak condition." },
        { period: "Nov to Mar", note: "Whale watching season from Mirissa blue whale sightings at their most reliable." },
        { period: "Year-round", note: "Some part of Sri Lanka's coast is always swimmable. Tell us your dates and we'll recommend the right beach." },
      ],
    },
    relatedDestinations: ["mirissa", "galle", "bentota"],
    relatedDayTours: ["galle-unawatuna-day-tour", "bentota-day-tour"],
    relatedItineraries: ["beach-tour", "see-the-best-of-sri-lanka"],
    seoTitle: "Beach Experiences in Sri Lanka",
    metaDescription:
      "Discover Sri Lanka's best beaches \u2013 Mirissa whale watching, Galle Fort, Trincomalee's east-coast bays and surf at Arugam Bay with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── ADVENTURE ────────────────────── */
  {
    published: true,
    slug: "adventure",
    name: "Adventure",
    category: "adventure",
    heroImage: img.hiking,
    blurb:
      "Rafting, surfing, rock climbing, zip-lining and hikes through misty mountain tea estates Sri Lanka rewards the adventurous traveller with a surprisingly varied menu.",
    intro: [
      "Sri Lanka's compact size means you can go white-water rafting in the morning, summit a viewpoint over rolling tea estates by afternoon and watch the sun set over the Indian Ocean the same evening. The island's adventure scene is growing fast: Kitulgala is the undisputed home of white-water rafting; Ella draws hikers to Ella Rock and Little Adam's Peak; Arugam Bay draws surfers from around the world.",
      "For those who want to push further, Adam's Peak (Sri Pada) at 2,243 metres is a challenging pre-dawn pilgrimage climb rewarded by a triangular shadow cast across the clouds at sunrise. Every activity can be arranged privately and added to any itinerary.",
    ],
    whySriLanka: [
      "Kitulgala Grade III–IV white-water rafting on the Kelani River",
      "Adam's Peak a 5,000-step pre-dawn pilgrimage climb with a legendary sunrise",
      "World-class surfing at Arugam Bay and Weligama",
      "Zip-lining, abseiling and canyoning in the hill country",
      "Hiking trails at Ella Rock, Little Adam's Peak and Knuckles Range",
      "Cycling and mountain biking through rural villages and paddy fields",
    ],
    bestLocations: [
      { name: "Kitulgala",   image: img.rafting,  blurb: "Sri Lanka's premier white-water rafting destination on the Kelani River." },
      { name: "Ella",        image: img.hiking,   blurb: "Mountain hikes, zip-lining and the iconic Nine Arch Bridge viewpoint trail." },
      { name: "Arugam Bay",  image: img.surfing,  blurb: "One of Asia's top surf spots world-class right-hand point breaks." },
      { name: "Adam's Peak", image: img.sunrise,  blurb: "The island's most challenging and spiritual climb 5,200 steps to the sacred footprint." },
    ],
    activities: [
      { icon: "Waves",      label: "White-water rafting",  blurb: "Grade III–IV rapids on the Kelani River at Kitulgala – half and full-day sessions." },
      { icon: "Wind",       label: "Surfing",              blurb: "Lessons and guided surf sessions at Weligama, Hikkaduwa and Arugam Bay." },
      { icon: "Mountain",   label: "Mountain hiking",      blurb: "Guided hikes to Ella Rock, Little Adam's Peak and the Knuckles Range." },
      { icon: "Zap",        label: "Zip-lining",           blurb: "Canopy zip-lines over the jungle and forest near Kitulgala and Ella." },
      { icon: "Bike",       label: "Cycling tours",        blurb: "Rural village cycling through paddy fields and jungle lanes in the Cultural Triangle." },
    ],
    bestSeason: {
      summary: "Adventure activities are spread across both coastlines and the hill country, so something is always in season.",
      details: [
        { period: "Nov to Apr", note: "Rafting season at Kitulgala (river levels best after the October rains). Adam's Peak pilgrimage season." },
        { period: "Apr to Oct", note: "Surfing season at Arugam Bay (east coast) May and June bring the biggest waves." },
        { period: "Year-round", note: "Hiking in Ella and the hill country is possible year-round; December to April offers the clearest views." },
        { period: "Dec to Mar", note: "Whale-watching tours double well as offshore adventure on the south coast." },
      ],
    },
    relatedDestinations: ["ella", "mirissa", "kandy"],
    relatedDayTours: ["ella-day-tour"],
    relatedItineraries: ["adventure-tour", "see-the-best-of-sri-lanka"],
    seoTitle: "Adventure Experiences in Sri Lanka",
    metaDescription:
      "White-water rafting, surfing, hiking Adam's Peak, rock climbing and zip-lining - plan your Sri Lanka adventure with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── NATURE ───────────────────────── */
  {
    published: true,
    slug: "nature",
    name: "Nature",
    category: "wildlife",
    heroImage: img.rainforest,
    blurb:
      "Tea plantations, cascading waterfalls, misty rainforests and rolling hill country Sri Lanka's natural beauty is on a different scale for an island this size.",
    intro: [
      "Sri Lanka's interior is a landscape of extraordinary natural beauty. The Hill Country rolls across central Sri Lanka 1,500 to 2,500 metres above sea level carpeted in tea estates and punctuated by waterfalls, mountain streams and cloud forests. The train ride from Kandy to Ella is considered one of the world's most scenic rail journeys.",
      "Sinharaja Biosphere Reserve is a lowland rainforest that has been continuously forested since prehistoric times. Over a third of Sri Lanka's endemic tree species and 50% of its endemic mammals call it home. Whether you want to walk a tea factory, chase a waterfall or simply breathe mountain air, Sri Lanka's nature rewards slow travel.",
    ],
    whySriLanka: [
      "Sinharaja Biosphere Reserve a UNESCO-listed lowland rainforest",
      "The world's most scenic hill-country train journey (Kandy to Ella)",
      "Waterfalls at Diyaluma, Bambarakanda and Ravana easily combined in one day",
      "Tea estates open for guided factory tours and plucking demonstrations",
      "Horton Plains misty plateau with World's End, an 870m sheer cliff drop",
      "Knuckles Mountain Range a separate World Heritage wilderness area",
    ],
    bestLocations: [
      { name: "Tea Country (Nuwara Eliya)", image: img.teaPlant,   blurb: "Rolling tea estates, colonial bungalows and Sri Lanka's highest-altitude destinations." },
      { name: "Ella",                       image: img.ella,        blurb: "Viewpoints, waterfalls and the iconic Nine Arch Bridge in a dramatic mountain setting." },
      { name: "Sinharaja",                  image: img.rainforest,  blurb: "Sri Lanka's last lowland rainforest a UNESCO Biosphere Reserve of extraordinary biodiversity." },
      { name: "Diyaluma Falls",             image: img.waterfall,   blurb: "Sri Lanka's second-highest waterfall, with natural rock pools at the top." },
    ],
    activities: [
      { icon: "Coffee",   label: "Tea estate tour",     blurb: "Guided walk through working tea estates and a visit to a colonial-era tea factory." },
      { icon: "Train",    label: "Scenic train ride",   blurb: "The iconic Kandy–Ella train through mountains, bridges and misty cloud forest." },
      { icon: "Droplets", label: "Waterfall chasing",   blurb: "Swimming holes, viewing platforms and jungle hikes to Sri Lanka's most dramatic falls." },
      { icon: "TreePine", label: "Rainforest walks",    blurb: "Guided nature walks in Sinharaja with an expert naturalist." },
      { icon: "Sunrise",  label: "Horton Plains hike",  blurb: "A plateau walk to World's End and Baker's Falls on Sri Lanka's highest plateau." },
    ],
    bestSeason: {
      summary: "The hill country is pleasant year-round, but conditions vary by location.",
      details: [
        { period: "Jan to Apr",  note: "Best for Nuwara Eliya and the hill country – dry, clear skies and cool temperatures." },
        { period: "Dec to Mar",  note: "Sinharaja receives less rain and visibility in the forest is at its best." },
        { period: "Year-round", note: "Tea estates and factory tours operate every day of the year regardless of weather." },
        { period: "Jul to Sep",  note: "The second inter-monsoon brings cooler, misty mornings ideal for Horton Plains." },
      ],
    },
    relatedDestinations: ["ella", "kandy", "sigiriya"],
    relatedDayTours: ["ella-day-tour", "nuwara-eliya-day-tour"],
    relatedItineraries: ["nature-tour", "see-the-best-of-sri-lanka"],
    seoTitle: "Nature Experiences in Sri Lanka",
    metaDescription:
      "Tea plantations, waterfalls, rainforests and scenic mountain train rides \u2013 explore Sri Lanka's natural wonders with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── FOOD ─────────────────────────── */
  {
    published: true,
    slug: "food",
    name: "Food & Local Experiences",
    category: "food",
    heroImage: img.food,
    blurb:
      "Home cooking, spice garden tours, coconut-shell bonfires and village life - Sri Lanka's food and local experiences are some of the most genuine on any island itinerary.",
    intro: [
      "Sri Lankan cuisine is bold, aromatic and underrated. A proper rice and curry lunch - served on a banana leaf with eight or ten small dishes - is a meal and a cultural experience in one. The island's spice heritage runs deep: cinnamon, cardamom, cloves and pepper were the original reasons European traders risked the voyage.",
      "Beyond the plate, local experiences in Sri Lanka let you inside the rhythm of everyday life. Cooking classes with local families, visits to village markets, boat-building communities, batik workshops and rural paddy-field walks offer a connection to the island that a hotel pool cannot provide.",
    ],
    whySriLanka: [
      "Sri Lanka is the world's original source of true cinnamon (Ceylon cinnamon)",
      "A rice-and-curry lunch on a banana leaf - one of Asia's great communal meals",
      "Spice gardens near Matale - nutmeg, cardamom, cloves and pepper still grown traditionally",
      "Colombo's Pettah Market - one of South Asia's most atmospheric bazaars",
      "Cooking classes available in Colombo, Kandy, Galle and rural homestays",
      "Coconut is in everything - toddy tapping, pol sambol and kiri bath",
    ],
    bestLocations: [
      { name: "Colombo Food Scene",      image: img.food,    blurb: "Modern restaurants, street food on Galle Face Green and the vibrant Pettah market." },
      { name: "Spice Gardens, Matale",   image: img.spice,   blurb: "Traditional spice plantations where cinnamon, cardamom and cloves are still harvested by hand." },
      { name: "Cooking Classes, Kandy",  image: img.cooking, blurb: "Learn to cook authentic rice-and-curry with a local family in a traditional kitchen." },
      { name: "Village Experiences",     image: img.market,  blurb: "Paddy-field walks, pottery making and toddy-tapping demonstrations in rural Sri Lanka." },
    ],
    activities: [
      { icon: "UtensilsCrossed", label: "Cooking class",        blurb: "Hands-on Sri Lankan cooking lesson with a local host market visit included." },
      { icon: "Leaf",            label: "Spice garden tour",    blurb: "Guided walk through a working spice plantation with tastings and a traditional lunch." },
      { icon: "Sailboat",        label: "Village boat ride",    blurb: "Explore lagoon mangroves and local fishing communities by traditional dugout canoe." },
      { icon: "ShoppingBag",     label: "Market & street food", blurb: "Guided walk through Pettah bazaar or Galle Fort market with street-food tastings." },
      { icon: "Star",            label: "Home dinner",          blurb: "An invitation to a local family dinner the most authentic meal you'll have in Sri Lanka." },
    ],
    bestSeason: {
      summary: "Food and local experiences are available year-round and are unaffected by the monsoon pattern.",
      details: [
        { period: "Year-round", note: "Cooking classes, spice garden tours and village experiences operate throughout the year." },
        { period: "Dec to Apr",  note: "Colombo street-food scene is at its best in the dry season - Galle Face Green evenings are magical." },
        { period: "Apr",        note: "New Year (Avurudu) in April - the island's most atmospheric festival with traditional games and food." },
        { period: "Jul to Aug",  note: "Kandy's Esala Perahera street festival includes food stalls and traditional sweets." },
      ],
    },
    relatedDestinations: ["colombo", "kandy", "galle"],
    relatedDayTours: ["colombo-city-tour", "kandy-day-tour"],
    relatedItineraries: ["cultural-heritage-tour", "see-the-best-of-sri-lanka"],
    seoTitle: "Food & Local Experiences in Sri Lanka",
    metaDescription:
      "Cooking classes, spice garden tours, village visits and Sri Lanka's rice-and-curry culture immerse yourself with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── LUXURY ───────────────────────── */
  {
    published: true,
    slug: "luxury",
    name: "Luxury",
    category: "luxury",
    heroImage: img.resortPool,
    blurb:
      "Premium hotels with infinity pools overlooking the jungle, private chauffeurs, candlelit dinners on the beach and exclusive excursions - Sri Lanka has a luxury offering that surprises.",
    intro: [
      "Sri Lanka's luxury travel sector has expanded dramatically in the past decade. World-class properties - from jungle lodges overlooking Yala to infinity-pool villas above the Indian Ocean in Mirissa - offer an experience that is genuinely world-class rather than 'good for the region'. Several have been recognised by Condé Nast and Tatler as among the world's best hotels.",
      "At Seren Lanka Travels, we curate luxury journeys using our preferred property list and long-standing relationships with hotel partners. Private vehicles, experienced English-speaking chauffeurs, exclusive experiences and 24/7 WhatsApp support ensure the journey is as seamless as the destination.",
    ],
    whySriLanka: [
      "Award-winning jungle lodges, beach villas and colonial plantation estates",
      "Private safari camps inside Sri Lanka's national parks",
      "Infinity pools overlooking the Indian Ocean and the hill-country tea estates",
      "Michelin-calibre dining at acclaimed Colombo restaurants",
      "Exclusive whale-watching and private beach picnic excursions",
      "Heritage boutique hotels inside Galle Fort's UNESCO walls",
    ],
    bestLocations: [
      { name: "Yala Jungle Lodges",   image: img.leopard,    blurb: "Luxury tented camps with private game-drive access to Yala's leopard country." },
      { name: "Mirissa Beach Villas", image: img.mirissaBeach, blurb: "Cliff-top and beachfront villas with infinity pools and exclusive whale-watching." },
      { name: "Nuwara Eliya Estates", image: img.teaPlant,   blurb: "Colonial-era tea-plantation bungalows with fireside evenings and private tea tastings." },
      { name: "Galle Fort Boutiques", image: img.galleBeach, blurb: "Restored Dutch colonial mansions inside the UNESCO fort, with candlelit courtyards." },
    ],
    activities: [
      { icon: "Car",    label: "Private chauffeur",       blurb: "Dedicated English-speaking driver-guide for your entire journey, with comfortable luxury vehicle." },
      { icon: "Star",   label: "Fine dining experiences",  blurb: "Chef's table bookings, sunset dinners and private beach barbecues at curated properties." },
      { icon: "Sparkles", label: "Spa & wellness",        blurb: "Signature spa treatments and Ayurvedic programmes at award-winning resort properties." },
      { icon: "Sailboat", label: "Private boat charters",  blurb: "Exclusive whale-watching, snorkelling and sunset catamaran trips." },
      { icon: "Coffee",   label: "Private tea tastings",   blurb: "Exclusive guided tastings with a Tea Master at a colonial estate in Nuwara Eliya." },
    ],
    bestSeason: {
      summary: "Luxury experiences are available year-round; season determines which coast and which type of property is at its best.",
      details: [
        { period: "Nov to Apr", note: "South and west coast - Mirissa, Galle and Yala in the dry season for luxury beach and safari properties." },
        { period: "May to Sep", note: "East coast and hill country - Trincomalee beach villas and Nuwara Eliya estate stays at their best." },
        { period: "Year-round", note: "Colombo luxury city hotels, Kandy boutique estates and Cultural Triangle camps are comfortable all year." },
        { period: "Dec to Jan",  note: "Peak luxury season on the south coast - book early for the best properties." },
      ],
    },
    relatedDestinations: ["yala", "galle", "mirissa"],
    relatedDayTours: [],
    relatedItineraries: ["luxury-tour", "honeymoon-tour"],
    seoTitle: "Luxury Experiences in Sri Lanka",
    metaDescription:
      "Premium hotels, private chauffeurs, infinity pools and exclusive excursions \u2013 discover Sri Lanka's luxury travel offer with Seren Lanka Travels.",
  },

  /* ─────────────────────────────── WELLNESS ─────────────────────── */
  {
    published: true,
    slug: "wellness",
    name: "Wellness",
    category: "wellness",
    heroImage: img.yoga,
    blurb:
      "Slow mornings, yoga at dawn, Ayurvedic treatments and the meditative stillness of ancient temples - Sri Lanka has been a place of healing and reflection for 2,500 years.",
    intro: [
      "Sri Lanka's Ayurvedic tradition is one of the oldest continuous wellness systems in the world - practised and refined here for over 3,000 years. The island's wellness offering ranges from full residential Ayurveda retreat programmes lasting 14 days or more to single-afternoon treatments at dedicated spas.",
      "Beyond Ayurveda, the island is a natural backdrop for yoga, meditation and slow travel. The sound of temple bells at dawn, the stillness of a hilltop sunrise, the cool mountain air of Nuwara Eliya or the rhythm of ocean waves at Mirissa - wellness in Sri Lanka is as much about place as it is about treatment.",
    ],
    whySriLanka: [
      "One of the world's oldest Ayurvedic traditions - 3,000+ years of practice",
      "Dedicated residential Ayurveda resort retreats on both the south and west coasts",
      "Yoga retreat centres at Tangalle, Mirissa, Unawatuna and the hill country",
      "Meditation at authentic Buddhist temples and forest monasteries",
      "Natural thermal springs at Kanniya near Trincomalee",
      "Slow-travel hill country mornings with mountain views and fresh air at 1,800m",
    ],
    bestLocations: [
      { name: "Bentota / Beruwela",  image: img.spa,        blurb: "Sri Lanka's original wellness strip - dedicated Ayurveda resorts on the west coast." },
      { name: "Mirissa / Tangalle",  image: img.yoga,       blurb: "Yoga retreat centres with ocean-facing practice spaces and plant-based dining." },
      { name: "Nuwara Eliya",        image: img.meditation, blurb: "Cool mountain air, forest meditation walks and colonial-era tea-estate tranquillity." },
      { name: "Trincomalee Springs", image: img.sunrise,    blurb: "Natural thermal springs at Kanniya - a unique bathing experience in a sacred setting." },
    ],
    activities: [
      { icon: "PersonStanding", label: "Yoga retreat",          blurb: "Multi-day yoga programmes at ocean-facing retreat centres on the south coast." },
      { icon: "Leaf",           label: "Ayurvedic treatments",  blurb: "Tailored Panchakarma programmes and single-day treatments at certified Ayurveda spas." },
      { icon: "Brain",          label: "Meditation sessions",   blurb: "Guided meditation at forest monasteries and ancient cave temples with resident monks." },
      { icon: "Droplets",       label: "Thermal spring bathing", blurb: "A visit to the sacred Kanniya thermal springs near Trincomalee." },
      { icon: "Sunrise",        label: "Sunrise walks",         blurb: "Early morning nature walks in the hill country, watching mist lift from the tea estates." },
    ],
    bestSeason: {
      summary: "Wellness experiences are available year-round; choose your location based on the monsoon pattern.",
      details: [
        { period: "Nov to Apr", note: "South and west coast wellness resorts (Bentota, Beruwela, Mirissa) in their dry season." },
        { period: "May to Sep", note: "East coast (Trincomalee) and hill country (Nuwara Eliya) wellness stays at their best." },
        { period: "Year-round", note: "Ayurveda programmes at dedicated residential resorts operate without seasonal closure." },
        { period: "Jan to Mar",  note: "Ideal combination of yoga retreat and wildlife safari - both at peak on the south coast." },
      ],
    },
    relatedDestinations: ["bentota", "mirissa", "kandy"],
    relatedDayTours: ["bentota-day-tour"],
    relatedItineraries: ["honeymoon-tour", "luxury-tour"],
    seoTitle: "Wellness Experiences in Sri Lanka",
    metaDescription:
      "Ayurvedic retreats, yoga, meditation and slow travel - discover Sri Lanka's wellness experiences with Seren Lanka Travels.",
  },
];

/* ── Content-access helpers (mirrors the destinations pattern) ────── */
export function getExperiences() {
  return experiences.filter((e) => e.published);
}

export function getExperienceBySlug(slug) {
  return getExperiences().find((e) => e.slug === slug) || null;
}

export function getRelatedExperienceDestinations(experience, allDestinations, limit = 3) {
  const bySlug = new Map(allDestinations.map((d) => [d.slug, d]));
  return (experience.relatedDestinations || [])
    .map((s) => bySlug.get(s))
    .filter(Boolean)
    .slice(0, limit);
}
