/**
 * Transfers & Transport – Content Plan §19.
 * One data file for the landing page (/transfers) and the five service pages
 * (/transfers/[slug]). Slugs match the header navigation in site.js.
 *
 * RATES ARE PENDING: `ratePerKm`, `minimumDailyCharge` and `minimumKm` on each
 * vehicle are null until confirmed and must remain editable from the admin
 * dashboard (rates change monthly / by season). Pages show "Rates on request".
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Confirmed operational notes – shown on every booking form (§19). */
export const driverServiceNotes = [
  "Driver service is limited to 11 hours per day.",
  "Night-time driving requires a separate booking and arrangement.",
];

/** Confirmed booking fields (§19) – used by TransferBookingForm */
export const bookingFields = [
  "Pickup location",
  "Drop-off location",
  "Date",
  "Pickup time",
  "Flight number",
  "Number of passengers",
  "Number of bags",
  "Vehicle type",
  "Child seat requirement",
  "Special requests",
];

/** Confirmed vehicle categories (§19). Rates: admin-editable, pending. */
export const vehicles = [
  {
    id: "sedan",
    name: "Sedan / Car",
    capacity: 3,
    capacityLabel: "Up to 3 passengers",
    luggage: "2–3 medium bags",
    image: u("photo-1449965408869-eaa3f722e40d"),
    blurb: "Comfortable for couples and solo travellers – ideal for airport runs and city-to-city hops with light luggage.",
    ratePerKm: null,
    minimumDailyCharge: null,
    minimumKm: null,
    active: true,
  },
  {
    id: "kdh-flat",
    name: "KDH Van (Flat Roof)",
    capacity: 5,
    capacityLabel: "Up to 5 passengers",
    luggage: "4–5 medium bags",
    image: u("photo-1519641471654-76ce0107ad1b"),
    blurb: "The everyday favourite for small families and friends – space for everyone and their bags.",
    ratePerKm: null,
    minimumDailyCharge: null,
    minimumKm: null,
    active: true,
  },
  {
    id: "kdh-high",
    name: "KDH Van (High Roof) / Luxury Van",
    capacity: 10,
    capacityLabel: "Up to 10 passengers",
    luggage: "8–10 bags",
    image: u("photo-1527786356703-4b100091cd2c"),
    blurb: "Extra headroom, reclining seats and generous luggage space for larger groups and long tours.",
    ratePerKm: null,
    minimumDailyCharge: null,
    minimumKm: null,
    active: true,
  },
  {
    id: "mini-bus",
    name: "Mini Bus",
    capacity: 20,
    capacityLabel: "Up to 20 passengers",
    luggage: "Large luggage hold",
    image: u("photo-1570125909232-eb263c188f7e"),
    blurb: "For extended families, incentive groups and pilgrim parties travelling together in comfort.",
    ratePerKm: null,
    minimumDailyCharge: null,
    minimumKm: null,
    active: true,
  },
  {
    id: "large-bus",
    name: "Large Bus",
    capacity: 32,
    capacityLabel: "Up to 32 passengers",
    luggage: "Full luggage hold",
    image: u("photo-1544620347-c4fd4a3d5957"),
    blurb: "Full-size coach for large groups, conferences and multi-day round tours.",
    ratePerKm: null,
    minimumDailyCharge: null,
    minimumKm: null,
    active: true,
  },
];

/** Landing page content (§19) */
export const transfersLanding = {
  heroImage: u("photo-1449965408869-eaa3f722e40d", 2400),
  heading: ["Private Transfers", "Across Sri Lanka"],
  intro:
    "Travel between airports, hotels, cities and destinations with private transport arranged around your schedule.",
  featured: {
    tag: "Most Requested",
    slug: "airport-transfers",
    title: "Airport Transfers",
    copy:
      "Meet your driver on arrival at Bandaranaike International Airport and travel straight to your hotel – or back again for departure – in a private, air-conditioned vehicle, with flight tracking and no waiting around.",
  },
  gridHeading: ["More Ways to Travel", "Across Sri Lanka"],
  vehiclesHeading: ["Choose", "Your Vehicle"],
  vehiclesCopy:
    "Five vehicle categories to match your group size and luggage – every one with an experienced English-speaking driver.",
  services: [
    "Airport → Hotel",
    "Hotel → Airport",
    "Hotel → Hotel",
    "City → City",
    "Custom Pickup → Custom Drop-off",
    "Short-distance trips",
    "Long-distance travel",
    "Full-tour transportation",
  ],
};

/** Standard inclusions for all transfers */
export const transferInclusions = [
  "Private air-conditioned vehicle",
  "Experienced English-speaking driver",
  "Fuel, parking and highway charges",
  "Bottled water",
  "Door-to-door pickup and drop-off",
];

export const transferExclusions = [
  "Night-time driving (separate booking and arrangement)",
  "Driver service beyond 11 hours per day",
  "Entrance tickets if sightseeing stops are added",
  "Meals, personal expenses and gratuities",
];

/** The five service pages – slugs match site.js navigation */
export const transferServices = [
  {
    published: true,
    slug: "airport-transfers",
    name: "Airport Transfers",
    routes: ["Airport → Hotel", "Hotel → Airport"],
    shortDescription:
      "Private pickup at Bandaranaike International Airport straight to your hotel – and back again for your flight home – in a comfortable air-conditioned vehicle.",
    heroImage: u("photo-1436491865332-7a61a109cc05", 2000),
    intro: [
      "Your Sri Lanka journey should start the moment you land, not after a queue at the taxi rank. With a private airport transfer your driver is waiting in the arrivals hall, tracks your flight in case of delays, and takes you directly to your hotel in Colombo, Negombo or anywhere on the island.",
      "For departure we collect you from your hotel with time to spare, so you reach the airport relaxed – including late-night and early-morning flights, which are arranged as a separate booking.",
    ],
    highlights: [
      "Meet-and-greet in the arrivals hall",
      "Flight tracking – we adjust to delays",
      "Direct to any hotel on the island",
      "Departure transfers timed to your flight",
      "Child seats on request",
    ],
    howItWorks: [
      "Send us your flight number, date and hotel",
      "We confirm the vehicle and the price by WhatsApp",
      "Your driver meets you at arrivals with a name board",
      "Travel directly to your hotel",
    ],
    goodToKnow: [
      "Driver service is limited to 11 hours per day",
      "Night-time pickups need a separate booking",
      "Tell us your bag count so we size the vehicle correctly",
    ],
    suitability:
      "Every traveller arriving in or leaving Sri Lanka – families, couples, groups and solo travellers who want a fixed price and a known driver.",
    faqs: [
      { q: "What if my flight is delayed?", a: "Your driver tracks the flight and adjusts the pickup time – there is no extra charge for waiting on a delayed arrival." },
      { q: "Can you collect us at night?", a: "Yes. Night-time driving is arranged as a separate booking; tell us the flight time and we will confirm the arrangement." },
      { q: "How do I find my driver?", a: "Your driver waits in the arrivals hall holding a name board and will message you on WhatsApp once you land." },
    ],
    related: ["hotel-pickup-drop-off", "city-to-city", "private-vehicle-hire"],
    seoTitle: "Sri Lanka Airport Transfers – Private Pickup & Drop-off",
    metaDescription:
      "Private airport transfers in Sri Lanka: meet-and-greet at Colombo airport, flight tracking and direct transfer to any hotel with an English-speaking driver.",
  },
  {
    published: true,
    slug: "hotel-pickup-drop-off",
    name: "Hotel Pick-up & Drop-off",
    routes: ["Hotel → Hotel", "Hotel → Attraction → Hotel"],
    shortDescription:
      "Move between hotels, or from your hotel to a day's activities and back, with a private driver who works around your check-in and check-out times.",
    heroImage: u("photo-1520250497591-112f2f40a3f4", 2000),
    intro: [
      "Changing hotels is the least enjoyable part of any trip. A private hotel-to-hotel transfer turns it into a comfortable drive: your driver collects you and your luggage at check-out and delivers you to your next hotel's door, wherever on the island it is.",
      "The same service works for a single day out – hotel to a beach, a temple or a national park and back again – with your driver waiting while you explore.",
    ],
    highlights: [
      "Door-to-door between any two hotels",
      "Timed to your check-out and check-in",
      "Luggage handled by your driver",
      "Sightseeing stops can be added en route",
      "Same driver for return trips",
    ],
    howItWorks: [
      "Tell us both hotels, the date and a preferred time",
      "We confirm the vehicle and price by WhatsApp",
      "Your driver collects you at check-out",
      "Optional stops along the way, then straight to your next hotel",
    ],
    goodToKnow: [
      "Driver service is limited to 11 hours per day",
      "Add stops when booking so the day is planned within that limit",
      "Child seats available on request",
    ],
    suitability:
      "Travellers on multi-hotel itineraries, cruise passengers, and anyone who wants a stress-free day trip from their hotel.",
    faqs: [
      { q: "Can we stop at attractions between hotels?", a: "Yes – tell us where you'd like to stop and we will plan the route and timing within the 11-hour driver day." },
      { q: "Is waiting time included on a day trip?", a: "Yes. On a hotel-to-attraction-and-back booking your driver waits for you while you visit." },
    ],
    related: ["airport-transfers", "city-to-city", "custom"],
    seoTitle: "Hotel Pick-up & Drop-off Sri Lanka – Private Hotel Transfers",
    metaDescription:
      "Private hotel-to-hotel transfers and hotel pick-up & drop-off across Sri Lanka, timed to your check-in and check-out with an English-speaking driver.",
  },
  {
    published: true,
    slug: "city-to-city",
    name: "City-to-City Transfers",
    routes: ["City → City", "Long-distance travel"],
    shortDescription:
      "Colombo to Kandy, Ella to Mirissa, Sigiriya to Galle – long-distance private transfers between any two points on the island, with scenic stops on the way if you want them.",
    heroImage: u("photo-1469474968028-56623f02e42e", 2000),
    intro: [
      "Sri Lanka's distances look short on the map but the roads wind through hills, tea country and busy towns. A private city-to-city transfer lets you enjoy the drive – air-conditioned comfort, your own pace and a driver who knows the best viewpoints and lunch stops.",
      "Book a single leg or link several transfers together across your itinerary. If you would rather have one driver for the whole trip, see Private Vehicle Hire.",
    ],
    highlights: [
      "Any city or town to any other",
      "Expressway routes where available",
      "Scenic and photo stops on request",
      "Fixed price confirmed in advance",
      "Link several legs across your itinerary",
    ],
    howItWorks: [
      "Tell us the two cities, date and pickup time",
      "We confirm the route, vehicle and price",
      "Your driver collects you at your hotel or agreed point",
      "Enjoy the drive – stops included where you want them",
    ],
    goodToKnow: [
      "Long legs are planned within the 11-hour driver day",
      "Night-time travel needs a separate arrangement",
      "Highway charges are included",
    ],
    suitability:
      "Independent travellers moving between regions who want comfort and flexibility without the constraints of trains or buses.",
    faqs: [
      { q: "How long does Colombo to Kandy take?", a: "Around three to four hours depending on traffic and your pickup point; hill-country legs such as Kandy to Ella take longer." },
      { q: "Can we add sightseeing stops?", a: "Yes. Popular additions include Pinnawala, Ramboda Falls or a tea factory – mention them when booking so we plan the timing." },
    ],
    related: ["private-vehicle-hire", "airport-transfers", "custom"],
    seoTitle: "City-to-City Transfers Sri Lanka – Private Long-Distance Transport",
    metaDescription:
      "Private city-to-city transfers across Sri Lanka – Colombo, Kandy, Ella, Galle, Sigiriya and more – with scenic stops and an English-speaking driver.",
  },
  {
    published: true,
    slug: "custom",
    name: "Custom Transfers",
    routes: ["Custom Pickup → Custom Drop-off", "Short-distance trips"],
    shortDescription:
      "Any pickup point to any drop-off point – short hops across town, a ride to a railway station, a restaurant run or a one-way trip that fits no standard category.",
    heroImage: u("photo-1500530855697-b586d89ba3ee", 2000),
    intro: [
      "Not every journey is airport-to-hotel. Sometimes you need a ride from a railway station to a guesthouse, a lift to a wedding venue, or a short trip across town at a set time. Custom transfers cover exactly that – you tell us the two points and the time, and we arrange the right vehicle.",
      "Short-distance trips are priced simply and confirmed in advance, so there are no surprises on the day.",
    ],
    highlights: [
      "Any pickup to any drop-off",
      "Railway stations, ports and venues",
      "Short trips at a fixed price",
      "One-way or return",
      "Child seats and extra luggage on request",
    ],
    howItWorks: [
      "Send us both locations, the date and time",
      "We confirm the vehicle and price",
      "Your driver arrives at the agreed point",
      "Direct to your drop-off",
    ],
    goodToKnow: [
      "Share exact addresses or map pins for accuracy",
      "Night-time trips need a separate arrangement",
      "Return trips can be booked together",
    ],
    suitability:
      "Anyone with a one-off journey that doesn't fit the standard transfer types – train travellers, event guests and short-stay visitors.",
    faqs: [
      { q: "Do you cover short trips within Colombo?", a: "Yes – short-distance trips are a standard part of our transfer service and are quoted at a fixed price." },
      { q: "Can we book a return the same day?", a: "Yes. Tell us both times when you enquire and we will confirm a single arrangement for both legs." },
    ],
    related: ["hotel-pickup-drop-off", "city-to-city", "airport-transfers"],
    seoTitle: "Custom Transfers Sri Lanka – Any Pickup to Any Drop-off",
    metaDescription:
      "Custom private transfers in Sri Lanka: railway stations, ports, venues and short trips – any pickup to any drop-off at a fixed price with a local driver.",
  },
  {
    published: true,
    slug: "private-vehicle-hire",
    name: "Private Transport / Vehicle Hire with Driver",
    routes: ["Full-tour transportation", "Multi-day vehicle hire"],
    shortDescription:
      "One vehicle and one driver for your whole Sri Lanka trip – full-tour transportation with daily flexibility, so the route follows your plans rather than a timetable.",
    heroImage: u("photo-1506905925346-21bda4d32df4", 2000),
    intro: [
      "The best way to see Sri Lanka is with your own vehicle and driver for the length of your stay. You decide each day's route and pace; your driver handles the roads, parking, timing and local knowledge, and stays with you from arrival to departure.",
      "Vehicle hire with driver is priced per day and by distance, with the vehicle sized to your group. Combine it with your own hotel bookings, or ask us to build a complete tailor-made tour around it.",
    ],
    highlights: [
      "Same vehicle and driver for the entire trip",
      "Daily flexibility – change the plan as you go",
      "Every vehicle category from sedan to coach",
      "Driver accommodation and meals arranged",
      "Pair with a tailor-made itinerary",
    ],
    howItWorks: [
      "Tell us your dates, group size and rough route",
      "We recommend a vehicle and confirm a daily rate",
      "Your driver meets you on day one",
      "Travel the island at your own pace",
    ],
    goodToKnow: [
      "Driver service is limited to 11 hours per day",
      "Night-time driving requires a separate arrangement",
      "Daily rates vary by season – confirmed in your quotation",
    ],
    suitability:
      "Travellers on trips of three days or more who want the freedom of private transport without planning every leg separately.",
    faqs: [
      { q: "Is the driver's accommodation included?", a: "Driver-related costs such as accommodation and meals are handled by us and reflected in your daily rate – confirmed in your quotation." },
      { q: "Can we change the route once we've started?", a: "Yes – that is the point of vehicle hire. Your driver adapts each day within the 11-hour service limit." },
      { q: "How is it priced?", a: "By the number of days, total kilometres and vehicle type. Rates change by season, so we confirm the current rate when you enquire." },
    ],
    related: ["city-to-city", "airport-transfers", "hotel-pickup-drop-off"],
    seoTitle: "Vehicle Hire with Driver Sri Lanka – Private Transport for Your Tour",
    metaDescription:
      "Hire a private vehicle with an English-speaking driver for your whole Sri Lanka trip – sedans to coaches, daily flexibility and full-tour transportation.",
  },
];
