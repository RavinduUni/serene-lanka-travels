/**
 * Day Tours content – field list from Content Plan §12, content direction from §13.
 * PENDING per the plan (do not invent): exact attraction order, start/finish times,
 * prices, meals/tickets flags. CTA model is therefore Request a Quote + WhatsApp (§11).
 * Edit content here – the pages and components only read this file via src/lib/content.js.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Standard confirmed inclusions (§11) – shared by every day tour. */
export const standardInclusions = [
  "Private air-conditioned vehicle",
  "Experienced English-speaking driver",
  "Fuel, parking and highway charges",
  "Bottled water during the tour",
  "Complimentary gift for the guest",
];

/** Not yet confirmed in the quote – shown as exclusions until the team confirms. */
export const standardExclusions = [
  "Attraction entrance tickets (confirmed in your quotation)",
  "Meals and beverages (confirmed in your quotation)",
  "Personal expenses and gratuities",
  "Travel insurance",
];

export const dayTourGroups = [
  { id: "all", label: "All tours" },
  { id: "culture", label: "Culture & heritage" },
  { id: "hill", label: "Hill country" },
  { id: "coastal", label: "Coastal" },
  { id: "city", label: "City" },
];

export const dayTours = [
  {
    published: true,
    slug: "colombo-city-tour",
    name: "Colombo City Tour",
    group: "city",
    shortDescription:
      "Sri Lanka's commercial capital in one comfortable private day – colonial heritage, sacred temples, busy markets and the modern waterfront.",
    heroImage: "https://images.unsplash.com/photo-1740812517101-fee71e001ebc?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    intro: [
      "Colombo is where Sri Lanka's past and present meet. Colonial-era buildings and century-old temples sit beside a fast-changing modern skyline, and the best way to see it all is with a local who knows which streets, stories and stops are worth your time.",
      "On this private city tour you travel at your own pace in a comfortable vehicle, stepping out for the landmarks, markets and viewpoints that interest you most – with your driver handling the traffic, parking and timing.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Colombo",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "See colonial Colombo around the Fort district",
      "Visit Gangaramaya, one of the city's most important temples",
      "Walk Galle Face Green beside the Indian Ocean",
      "Browse the busy street markets of Pettah",
      "End the day with modern Colombo's waterfront skyline",
    ],
    places: [
      {
        name: "Galle Face Green",
        image: u("photo-1546708973-b339540b5162", 1600),
        blurb:
          "Colombo's famous ocean-side promenade – street food, kite flyers and Indian Ocean sunsets in the middle of the city.",
      },
      {
        name: "Gangaramaya Temple",
        image: u("photo-1602216056096-3b40cc0c9944", 1600),
        blurb:
          "One of Colombo's most important Buddhist temples, known for its eclectic architecture and museum-like collection.",
      },
      {
        name: "Independence Square",
        image: u("photo-1526481280693-3bfa7568e0f3", 1600),
        blurb:
          "The monument marking Sri Lanka's independence, surrounded by lawns and one of the city's favourite walking spots.",
      },
      {
        name: "Colombo Fort & Old Dutch Hospital",
        image: u("photo-1449824913935-59a10b8d2000", 1600),
        blurb:
          "The colonial heart of the city – restored heritage buildings, cafés and boutiques inside the old hospital precinct.",
      },
      {
        name: "Pettah Market",
        image: u("photo-1555529669-e69e7aa0ba9a", 1600),
        blurb:
          "Colombo at full volume: a maze of bazaar streets where each lane trades in something different.",
      },
    ],
    activities: [
      "Guided drive through the Fort and Pettah districts",
      "Temple visit at Gangaramaya",
      "Ocean-front walk at Galle Face Green",
      "Optional shopping and café stops",
    ],
    whatToBring: [
      "Modest clothing for temple visits (shoulders and knees covered)",
      "Comfortable walking shoes",
      "Sunscreen and a hat",
      "Camera or phone for the skyline views",
    ],
    suitability:
      "Ideal for first-time visitors, cruise arrivals, layovers and anyone starting or ending a Sri Lanka journey in the capital.",
    faqs: [
      {
        q: "Is this Colombo tour private?",
        a: "Yes. You travel only with your own group, in a private vehicle with an English-speaking driver, and the route can flex around what interests you.",
      },
      {
        q: "Can the itinerary be customized?",
        a: "Yes. Tell us what you enjoy – heritage, food, shopping or photography – and we will shape the day around it.",
      },
      {
        q: "What should I wear for temple visits?",
        a: "Clothing that covers shoulders and knees is required at temples, and shoes are removed before entering.",
      },
    ],
    related: ["bentota-day-tour", "galle-unawatuna-day-tour", "kandy-day-tour"],
    seoTitle: "Colombo City Tour – Private Day Tour",
    metaDescription:
      "Explore Sri Lanka's capital on a private Colombo city tour: Galle Face Green, Gangaramaya Temple, the Fort district and Pettah Market with an English-speaking driver.",
  },
  {
    published: true,
    slug: "kandy-day-tour",
    name: "Kandy Day Tour",
    group: "culture",
    shortDescription:
      "The cultural capital of the hill country – the Temple of the Sacred Tooth Relic, Kandy Lake and the gardens and viewpoints around the city.",
    heroImage: "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    intro: [
      "Kandy is the spiritual heart of Sri Lanka. Ringed by hills and centred on its lake, the last royal capital of the island is home to the Temple of the Sacred Tooth Relic – one of Buddhism's most revered sites – and a living culture of drummers, dancers and festivals.",
      "This private day tour takes you up into the hill country in comfort, combining the sacred city itself with the gardens, viewpoints and tea-country scenery that surround it.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Kandy",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Visit the Temple of the Sacred Tooth Relic",
      "Walk the shores of Kandy Lake",
      "Stroll the Royal Botanical Gardens at Peradeniya",
      "Take in the city from the Kandy viewpoint",
      "See the giant Bahirawakanda Buddha watching over the town",
    ],
    places: [
      {
        name: "Temple of the Sacred Tooth Relic",
        image: u("photo-1586185618855-dc4f2f4e1a45", 1600),
        blurb:
          "Sri Lanka's most sacred Buddhist temple, housing the relic of the Buddha's tooth within the old royal palace complex.",
      },
      {
        name: "Kandy Lake",
        image: u("photo-1544750040-4ea9b8a27d38", 1600),
        blurb:
          "The calm centrepiece of the city, created by Kandy's last king – a gentle walk with temple and hill views.",
      },
      {
        name: "Royal Botanical Gardens, Peradeniya",
        image: u("photo-1585320806297-9794b3e4eeae", 1600),
        blurb:
          "One of Asia's finest botanical gardens: giant avenues of palms, an orchid house and a river-wrapped setting.",
      },
      {
        name: "Kandy Viewpoint",
        image: u("photo-1506905925346-21bda4d32df4", 1600),
        blurb:
          "The classic postcard panorama over the lake, the temple roofs and the hills that encircle the city.",
      },
      {
        name: "Bahirawakanda Buddha",
        image: u("photo-1571415060716-baff5f717c37", 1600),
        blurb:
          "The white hilltop Buddha statue visible from almost everywhere in Kandy, with sweeping views from its terrace.",
      },
    ],
    activities: [
      "Temple visit at the Sacred Tooth Relic",
      "Botanical gardens walk at Peradeniya",
      "Lake-side and viewpoint photo stops",
      "Optional cultural dance performance (seasonal)",
    ],
    whatToBring: [
      "Modest clothing for temple visits (shoulders and knees covered)",
      "Comfortable walking shoes",
      "A light layer – the hill country is cooler than the coast",
      "Sunscreen and a hat",
    ],
    suitability:
      "Perfect for culture and heritage travellers, families and anyone who wants the essential Kandy experience in a single private day.",
    faqs: [
      {
        q: "Is there a dress code for the Temple of the Tooth?",
        a: "Yes. Shoulders and knees must be covered and shoes are removed before entering. White or light clothing is customary but not required.",
      },
      {
        q: "Can this day tour be customized?",
        a: "Yes. The stops, pace and photo breaks are flexible – tell us what matters most to you and we will plan the day around it.",
      },
      {
        q: "How far is Kandy from Colombo?",
        a: "Kandy sits in the central hills roughly three to four hours' drive from Colombo depending on traffic and your pickup point, which is why an early start is recommended.",
      },
    ],
    related: ["sigiriya-dambulla-day-tour", "nuwara-eliya-day-tour", "ella-day-tour"],
    seoTitle: "Kandy Day Tour – Temple of the Tooth & Hill Country",
    metaDescription:
      "Private Kandy day tour: the Temple of the Sacred Tooth Relic, Kandy Lake, Peradeniya Botanical Gardens and hill-country viewpoints with an English-speaking driver.",
  },
  {
    published: true,
    slug: "sigiriya-dambulla-day-tour",
    name: "Sigiriya & Dambulla Day Tour",
    group: "culture",
    shortDescription:
      "Sri Lanka's Cultural Triangle in one day – climb the Sigiriya Rock Fortress and explore the painted caves of the Dambulla Golden Temple.",
    heroImage: u("photo-1612862862126-865765df2ded", 2000),
    intro: [
      "Two of Sri Lanka's most extraordinary UNESCO World Heritage Sites sit within easy reach of each other in the island's Cultural Triangle. Sigiriya, the 5th-century rock fortress, rises two hundred metres out of the plains; Dambulla's cave temples shelter centuries of Buddhist art beneath a single granite overhang.",
      "This private day tour pairs them into one unforgettable journey – an early climb up Sigiriya while the air is cool, then the calm, painted caves of Dambulla, with your driver managing the timing so you see both at their best.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Sigiriya · Dambulla",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Climb the 5th-century Sigiriya Rock Fortress",
      "See the famous frescoes and the Lion's Paw terrace",
      "Walk the royal water gardens at the base of the rock",
      "Explore the five painted caves of the Dambulla Golden Temple",
      "Optional sunset climb at Pidurangala Rock",
    ],
    places: [
      {
        name: "Sigiriya Rock Fortress",
        image: u("photo-1612862862126-865765df2ded", 1600),
        blurb:
          "King Kashyapa's sky palace – a sheer 200-metre rock crowned by the ruins of a 5th-century royal citadel.",
      },
      {
        name: "Sigiriya Water Gardens",
        image: u("photo-1590123047622-71b8b26e1ea5", 1600),
        blurb:
          "Among the oldest landscaped gardens in the world, laid out symmetrically at the foot of the rock.",
      },
      {
        name: "Dambulla Golden Cave Temple",
        image: u("photo-1602602516934-224b56a29dde", 1600),
        blurb:
          "Five caves of Buddha statues and vivid ceiling murals, a place of worship for more than two thousand years.",
      },
      {
        name: "Pidurangala Rock",
        image: u("photo-1552465011-b4e21bf6e79a", 1600),
        blurb:
          "The neighbouring rock with the best view of Sigiriya itself – a shorter, wilder climb loved by photographers.",
      },
    ],
    activities: [
      "Guided climb of Sigiriya (around 1,200 steps)",
      "Cave temple visit at Dambulla",
      "Photo stops across the Cultural Triangle plains",
      "Optional village lunch experience",
    ],
    whatToBring: [
      "Comfortable shoes for the Sigiriya climb",
      "Modest clothing for the cave temples",
      "Sunscreen, a hat and plenty of water",
      "A small backpack to keep your hands free on the steps",
    ],
    suitability:
      "Best for travellers with reasonable fitness who want Sri Lanka's headline heritage sites in one day. The Sigiriya climb involves steep stairways.",
    faqs: [
      {
        q: "How difficult is the Sigiriya climb?",
        a: "There are around 1,200 steps to the summit. Most visitors manage it comfortably with breaks – starting early keeps you out of the midday heat.",
      },
      {
        q: "Can we do only one of the two sites?",
        a: "Yes. The day is fully flexible – you can focus on Sigiriya alone, swap Sigiriya for Pidurangala, or spend longer at Dambulla.",
      },
      {
        q: "Is this tour suitable for children or older travellers?",
        a: "Dambulla is accessible to most visitors. For the Sigiriya climb we recommend judging each traveller's comfort with stairs; your driver will adapt the plan on the day.",
      },
    ],
    related: ["kandy-day-tour", "nuwara-eliya-day-tour", "colombo-city-tour"],
    seoTitle: "Sigiriya & Dambulla Day Tour – Cultural Triangle",
    metaDescription:
      "Climb Sigiriya Rock Fortress and explore the Dambulla Golden Cave Temple on a private Cultural Triangle day tour with an English-speaking driver.",
  },
  {
    published: true,
    slug: "galle-unawatuna-day-tour",
    name: "Galle & Unawatuna Day Tour",
    group: "coastal",
    shortDescription:
      "Southern coastal culture in a day – the ramparts and lanes of UNESCO-listed Galle Fort, then the palm-fringed curve of Unawatuna Beach.",
    heroImage: u("photo-1580889240912-c39ecefd3d95", 2000),
    intro: [
      "The south coast is where Sri Lanka's colonial story meets its most beautiful shoreline. Galle Fort – built by the Portuguese and completed by the Dutch – is a living town of ramparts, lighthouses, cafés and galleries, and just around the headland lies Unawatuna, one of the island's best-loved beaches.",
      "On this private day tour you follow the coast south in comfort, wander the fort's historic lanes at your own pace, and finish with time to swim or simply relax on golden sand.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Galle · Unawatuna",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Walk the 17th-century ramparts of Galle Fort",
      "See the lighthouse, Dutch churches and merchant houses",
      "Browse boutiques and cafés inside the fort walls",
      "Relax or swim at Unawatuna Beach",
      "Visit the Japanese Peace Pagoda viewpoint",
    ],
    places: [
      {
        name: "Galle Fort",
        image: u("photo-1580889240912-c39ecefd3d95", 1600),
        blurb:
          "A UNESCO World Heritage city within walls – colonial streets, ocean ramparts and a lively café culture.",
      },
      {
        name: "Galle Lighthouse",
        image: u("photo-1552055568-f8c4fefefec5", 1600),
        blurb:
          "The much-photographed white lighthouse standing over the fort's south-east bastion and palm-lined shore.",
      },
      {
        name: "Unawatuna Beach",
        image: u("photo-1507525428034-b723cf961d3e", 1600),
        blurb:
          "A sheltered crescent of golden sand and calm water – one of Sri Lanka's most famous swimming beaches.",
      },
      {
        name: "Japanese Peace Pagoda",
        image: u("photo-1546708973-b339540b5162", 1600),
        blurb:
          "A hilltop stupa above Unawatuna's jungle beach, with sweeping views back along the coast to Galle.",
      },
    ],
    activities: [
      "Guided walk of the fort ramparts and lanes",
      "Beach time at Unawatuna",
      "Optional coastal stops en route (stilt fishermen, turtle hatcheries)",
      "Café and gallery browsing inside the fort",
    ],
    whatToBring: [
      "Swimwear and a towel for the beach",
      "Sunscreen, sunglasses and a hat",
      "Comfortable sandals or walking shoes",
      "Light, breathable clothing",
    ],
    suitability:
      "A relaxed day for couples, families and anyone who wants heritage and beach time together without an overnight stay on the coast.",
    faqs: [
      {
        q: "Is there time to swim at Unawatuna?",
        a: "Yes. The day is planned so you have unhurried beach time after exploring the fort – tell us if you would like more of one or the other.",
      },
      {
        q: "Can we add other coastal stops?",
        a: "Yes. Popular additions include a turtle hatchery, the stilt fishermen near Koggala and a lagoon boat ride – your driver can build them into the day.",
      },
      {
        q: "Is Galle Fort walkable?",
        a: "Very. The fort is compact and best explored on foot, with the vehicle waiting nearby whenever you are ready to move on.",
      },
    ],
    related: ["bentota-day-tour", "colombo-city-tour", "ella-day-tour"],
    seoTitle: "Galle & Unawatuna Day Tour – Fort & Beach",
    metaDescription:
      "Private Galle and Unawatuna day tour: walk the UNESCO Galle Fort ramparts, see the lighthouse and relax on Unawatuna Beach with an English-speaking driver.",
  },
  {
    published: true,
    slug: "bentota-day-tour",
    name: "Bentota Day Tour",
    group: "coastal",
    shortDescription:
      "A convenient south-coast escape – Bentota's golden beach, a boat safari through the Madu River mangroves and a visit to a sea-turtle hatchery.",
    heroImage: u("photo-1506929562872-bb421503ef21", 2000),
    intro: [
      "Bentota is the classic Sri Lankan beach escape – close enough to Colombo for an easy day trip, yet a world away once you are on its long golden sand. Beyond the beach, the Madu River spreads into a maze of mangrove islands alive with birds and monitor lizards.",
      "This private day tour combines beach relaxation with a gentle river safari and the coast's famous turtle-conservation projects, all at whatever pace suits you.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Bentota",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Relax on Bentota's long golden beach",
      "Cruise the mangrove islands of the Madu River",
      "Meet rescued hatchlings at a sea-turtle hatchery",
      "Optional water sports on the Bentota lagoon",
      "Easy day-trip distance from Colombo and the west coast",
    ],
    places: [
      {
        name: "Bentota Beach",
        image: u("photo-1506929562872-bb421503ef21", 1600),
        blurb:
          "A broad sweep of golden sand between the ocean and the river mouth – made for slow afternoons.",
      },
      {
        name: "Madu River",
        image: u("photo-1544551763-46a013bb70d5", 1600),
        blurb:
          "A boat safari through mangrove tunnels and island temples on one of Sri Lanka's richest wetland ecosystems.",
      },
      {
        name: "Sea Turtle Hatchery",
        image: u("photo-1591025207163-942350e47db2", 1600),
        blurb:
          "Conservation projects along this coast protect eggs and release hatchlings back into the ocean.",
      },
      {
        name: "Bentota Lagoon",
        image: u("photo-1530053969600-caed2596d242", 1600),
        blurb:
          "Calm water behind the beach – the west coast's favourite spot for jet skis, boat rides and water sports.",
      },
    ],
    activities: [
      "Madu River mangrove boat safari",
      "Turtle hatchery visit",
      "Beach and lagoon time",
      "Optional water sports (quoted separately)",
    ],
    whatToBring: [
      "Swimwear and a towel",
      "Sunscreen and a hat",
      "A dry bag or cover for phones on the boat",
      "Cash for optional activities and tips",
    ],
    suitability:
      "Great for families, couples and beach lovers who want sun, wildlife and water in one easy day from Colombo or the west coast.",
    faqs: [
      {
        q: "Is the Madu River safari suitable for children?",
        a: "Yes. The boats are stable and slow-moving, life jackets are provided, and the mangrove channels are calm water throughout.",
      },
      {
        q: "Can we add water sports?",
        a: "Yes. Jet skiing, banana boats and speed-boat rides are available on the lagoon and are quoted separately on the day.",
      },
      {
        q: "How far is Bentota from Colombo?",
        a: "Around 90 minutes via the Southern Expressway, which makes it one of the easiest beach day trips on the island.",
      },
    ],
    related: ["galle-unawatuna-day-tour", "colombo-city-tour", "kandy-day-tour"],
    seoTitle: "Bentota Day Tour – Beach, Madu River & Turtles",
    metaDescription:
      "Private Bentota day tour: golden beaches, a Madu River mangrove boat safari and a sea-turtle hatchery visit with an English-speaking driver.",
  },
  {
    published: true,
    slug: "ella-day-tour",
    name: "Ella Day Tour",
    group: "hill",
    shortDescription:
      "Mountain scenery at its best – the Nine Arches Bridge, Little Adam's Peak, Ravana Falls and the tea-country landscapes that made Ella famous.",
    heroImage: u("photo-1566296314736-6eaac1ca0cb9", 2000),
    intro: [
      "Ella is the hill country distilled: a small town wrapped in tea gardens, cloud forest and some of the most photographed scenery in Sri Lanka. Trains curve across the Nine Arches Bridge, waterfalls tumble beside the road, and short walks lead to enormous views.",
      "On this private day tour your driver handles the mountain roads while you collect Ella's icons one by one – with time built in to simply stand still and take in the green.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Ella",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Watch a train cross the Nine Arches Bridge",
      "Walk to the summit of Little Adam's Peak",
      "Stop at the roadside cascade of Ravana Falls",
      "Wander tea plantations in every direction",
      "Optional visits to Ella Rock trailheads and viewpoints",
    ],
    places: [
      {
        name: "Nine Arches Bridge",
        image: u("photo-1566296314736-6eaac1ca0cb9", 1600),
        blurb:
          "The colonial-era viaduct curving through tea and jungle – Sri Lanka's most famous railway photograph.",
      },
      {
        name: "Little Adam's Peak",
        image: u("photo-1546975490-e8b92a360b24", 1600),
        blurb:
          "An easy 45-minute walk to a summit with panoramic views over Ella Gap and the southern plains.",
      },
      {
        name: "Ravana Falls",
        image: u("photo-1432405972618-c60b0225b8f9", 1600),
        blurb:
          "A dramatic roadside waterfall tied to the Ramayana legend, at its thundering best after rain.",
      },
      {
        name: "Ella Tea Country",
        image: u("photo-1576675784201-0e142b423952", 1600),
        blurb:
          "Terraced tea gardens climb every slope around town – stop wherever the light and the view are best.",
      },
    ],
    activities: [
      "Short scenic hikes (Little Adam's Peak)",
      "Train-spotting at the Nine Arches Bridge",
      "Waterfall and viewpoint photo stops",
      "Optional tea-shop and café breaks in Ella town",
    ],
    whatToBring: [
      "Walking shoes with grip for the trails",
      "A light rain layer – hill-country weather changes fast",
      "Sunscreen and water for the walks",
      "A camera with space for a lot of photographs",
    ],
    suitability:
      "For nature lovers, photographers and active travellers happy with short uphill walks. Paths are easy but can be muddy after rain.",
    faqs: [
      {
        q: "When do trains cross the Nine Arches Bridge?",
        a: "Several trains pass daily and timings vary with the railway schedule. Your driver will check the day's times so you arrive before a crossing.",
      },
      {
        q: "How hard is the Little Adam's Peak walk?",
        a: "It is one of the easiest summit walks in Sri Lanka – a gradual path and steps taking most visitors 40–60 minutes each way.",
      },
      {
        q: "Can this be combined with a scenic train ride?",
        a: "Often, yes – depending on your route and the season's timetable. Ask us and we will plan the logistics around the train.",
      },
    ],
    related: ["nuwara-eliya-day-tour", "kandy-day-tour", "sigiriya-dambulla-day-tour"],
    seoTitle: "Ella Day Tour – Nine Arches Bridge & Little Adam's Peak",
    metaDescription:
      "Private Ella day tour: the Nine Arches Bridge, Little Adam's Peak, Ravana Falls and tea-country viewpoints with an English-speaking driver.",
  },
  {
    published: true,
    slug: "nuwara-eliya-day-tour",
    name: "Nuwara Eliya Day Tour",
    group: "hill",
    shortDescription:
      "Cool-climate tea country – working plantations and factories, waterfalls, Gregory Lake and the colonial charm of 'Little England'.",
    heroImage: u("photo-1576675784201-0e142b423952", 2000),
    intro: [
      "At nearly 1,900 metres, Nuwara Eliya is Sri Lanka's coolest town – a place of tea estates, rose gardens, misty mornings and colonial-era architecture that earned it the nickname 'Little England'.",
      "This private day tour climbs through some of the island's most beautiful road scenery, pausing at waterfalls and plantations on the way, and gives you time in town for the lake, the gardens and a proper cup of high-grown Ceylon tea at its source.",
    ],
    quickFacts: {
      duration: "Full-day private tour",
      pickup: "Your hotel or an agreed location",
      destinations: "Nuwara Eliya · Ramboda",
      transport: "Private air-conditioned vehicle",
      guide: "English-speaking driver",
    },
    highlights: [
      "Tour a working tea plantation and factory",
      "Taste high-grown Ceylon tea where it is made",
      "Stop at Ramboda Falls on the mountain road",
      "Boat or stroll at Gregory Lake",
      "See the colonial buildings of 'Little England'",
    ],
    places: [
      {
        name: "Tea Plantation & Factory",
        image: u("photo-1576675784201-0e142b423952", 1600),
        blurb:
          "Walk the emerald rows with the pluckers, then follow the leaf through the factory to a fresh tasting.",
      },
      {
        name: "Ramboda Falls",
        image: u("photo-1432405972618-c60b0225b8f9", 1600),
        blurb:
          "A towering twin cascade beside the A5 mountain road – one of the most impressive falls in the country.",
      },
      {
        name: "Gregory Lake",
        image: u("photo-1544750040-4ea9b8a27d38", 1600),
        blurb:
          "The town's centrepiece since the British era – swan boats, lakeside lawns and cool-climate air.",
      },
      {
        name: "Hakgala Botanical Gardens",
        image: u("photo-1585320806297-9794b3e4eeae", 1600),
        blurb:
          "A high-altitude garden of roses, ferns and montane forest on the slopes below Hakgala Rock.",
      },
    ],
    activities: [
      "Guided tea factory tour and tasting",
      "Waterfall and viewpoint stops on the mountain road",
      "Lakeside time at Gregory Lake",
      "Optional strawberry-farm and garden visits",
    ],
    whatToBring: [
      "A warm layer – evenings and mornings are genuinely cool",
      "A light rain jacket or umbrella",
      "Comfortable shoes for garden and estate walks",
      "Sunscreen – the high-altitude sun is stronger than it feels",
    ],
    suitability:
      "A gentle, scenic day for all ages – ideal for tea lovers, garden enthusiasts and anyone escaping the coastal heat.",
    faqs: [
      {
        q: "How cold does Nuwara Eliya get?",
        a: "Daytimes are pleasantly cool and evenings can drop below 10°C – a warm layer is worth carrying even when the coast is hot.",
      },
      {
        q: "Is the tea factory tour included?",
        a: "A plantation and factory visit is part of the day; entrance arrangements are confirmed in your quotation.",
      },
      {
        q: "Can we combine Nuwara Eliya with Ella?",
        a: "The two make a superb pairing over two days or as part of a longer itinerary – ask us about a tailor-made hill-country route.",
      },
    ],
    related: ["ella-day-tour", "kandy-day-tour", "sigiriya-dambulla-day-tour"],
    seoTitle: "Nuwara Eliya Day Tour – Tea Country & Little England",
    metaDescription:
      "Private Nuwara Eliya day tour: tea plantations and factory tastings, Ramboda Falls, Gregory Lake and colonial 'Little England' with an English-speaking driver.",
  },
];
