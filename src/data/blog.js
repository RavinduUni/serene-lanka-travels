/**
 * Blog / Travel Journal data.
 * All 4 articles correspond exactly to the homepage LatestArticles section
 * (inspiration.featured + inspiration.items in data/home.js).
 * Slugs, titles, categories and dates are identical – these are the expanded versions.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

// ─── Article images ──────────────────────────────────────────────────────────
const articleImages = {
  bestTime:    u("photo-1506905925346-21bda4d32df4", 1600), // misty mountains
  firstTime:   u("photo-1507525428034-b723cf961d3e", 1600), // palm beach
  howManyDays: u("photo-1469474968028-56623f02e42e", 1600), // mountain sunrise
  beaches:     u("photo-1506929562872-bb421503ef21", 1600), // tropical coastline
};

export const blogPosts = [
  /* ──────────────────────────────────────────────────────────────────────────
     1. BEST TIME TO VISIT SRI LANKA  (featured on homepage)
  ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "best-time-to-visit-sri-lanka",
    title: "Best Time to Visit Sri Lanka",
    excerpt:
      "Two monsoons, two coastlines and a hill country that is cool all year – here is how to pick the right months for the trip you want.",
    category: "Planning",
    date: "2026-09-01",
    readingTime: "8 min read",
    image: articleImages.bestTime,
    featured: true,
    relatedDestinations: [
      { name: "Mirissa",  href: "/destinations/mirissa",      tag: "Whales & beaches" },
      { name: "Yala",     href: "/destinations/yala",         tag: "Wildlife safari" },
      { name: "Kandy",    href: "/destinations/kandy",        tag: "Hill country & culture" },
    ],
    relatedTours: [
      { label: "See the Best of Sri Lanka – 7 Days", href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka" },
      { label: "Beach & Whale Watching Tour",         href: "/sri-lanka-itineraries/whale-watching-tour" },
    ],
    content: [
      {
        type: "intro",
        text: "Sri Lanka sits just eight degrees north of the equator, which means sunshine is almost always on offer somewhere on the island. But the country is shaped by two distinct monsoon systems – the south-west monsoon (Yala) and the north-east monsoon (Maha) – and knowing when each one arrives is the single most useful thing you can learn before you book your flights.",
      },
      {
        type: "heading",
        text: "Understanding the Two Monsoons",
      },
      {
        type: "paragraph",
        text: "The south-west monsoon sweeps in from the Indian Ocean between May and September, drenching the west coast, the south coast and the central hills with heavy rainfall. During this period, the east coast – normally drier and calmer – becomes the destination of choice. The north-east monsoon reverses this pattern from October to January, bringing rain to the north and east while the south and west bask in clear skies.",
      },
      {
        type: "paragraph",
        text: "In practice, this means Sri Lanka effectively has two tourist seasons running simultaneously on opposite sides of the island. There is almost never a moment when the entire country is off-limits – only certain coastlines at certain times.",
      },
      {
        type: "heading",
        text: "Month-by-Month Breakdown",
      },
      {
        type: "paragraph",
        text: "January and February are widely considered the peak months for the south and west coasts – Mirissa, Unawatuna, Galle and Bentota are at their absolute best. Whale-watching season is in full swing, seas are calm enough for snorkelling and the Galle Literary Festival draws visitors from around the world. Inland, Kandy, Sigiriya and the Cultural Triangle are also excellent at this time.",
      },
      {
        type: "paragraph",
        text: "March and April bring Sri Lanka's hottest, driest weather before the south-west monsoon. Yala National Park is busy but at peak wildlife density because the dry conditions concentrate animals around water sources. It is also the most popular time for visitors from India coinciding with school holidays, so book early.",
      },
      {
        type: "paragraph",
        text: "May to September – the south-west monsoon months – are ideal for exploring the east coast. Arugam Bay draws surfers from around the world between June and September, Trincomalee offers excellent diving from May to October, and the quieter north becomes accessible. Meanwhile, the hill country remains remarkably green and photogenic even during this period, with waterfalls at their most dramatic.",
      },
      {
        type: "paragraph",
        text: "October and November mark the inter-monsoon transition. Seas can be unpredictable on both coasts, but inland destinations – Sigiriya, Polonnaruwa, Kandy and Ella – are beautiful and far less crowded than the peak winter months. This is a wonderful time for culture and history.",
      },
      {
        type: "paragraph",
        text: "December is perhaps the most festive time to visit. The south and west coasts have cleared, Christmas and New Year bring an energetic atmosphere, and whale-watching season off Mirissa kicks off again. Hotel prices and flight costs are at their annual peak, so budget travellers may prefer November or January instead.",
      },
      {
        type: "heading",
        text: "The Hill Country: Perfect Almost Year-Round",
      },
      {
        type: "paragraph",
        text: "Kandy, Nuwara Eliya and Ella sit high enough in Sri Lanka's central mountains to enjoy a cooler, more temperate climate throughout the year. Even during monsoon months, mornings in the hill country are often crisp and clear, with clouds rolling in by early afternoon. This makes the hill country one of the most reliable regions to include in any Sri Lanka itinerary regardless of when you travel.",
      },
      {
        type: "tip",
        heading: "Local Tip from Our Team",
        text: "The south-west monsoon months (May–September) are actually our favourite time to visit. Hotels are significantly cheaper, crowds are thinner and the landscape is lush and intensely green. The rain usually falls in short, dramatic afternoon bursts – and the rest of the day is perfectly fine for sightseeing.",
      },
      {
        type: "heading",
        text: "Quick Reference: Best Regions by Month",
      },
      {
        type: "table",
        headers: ["Month", "Best for"],
        rows: [
          ["January – March",      "South coast, west coast, Kandy, Cultural Triangle, whale watching"],
          ["April",                "Yala National Park (peak wildlife), hill country, south coast"],
          ["May – September",      "East coast (Arugam Bay, Trincomalee), hill country, north"],
          ["October – November",   "Cultural Triangle, hill country, budget-friendly off-peak"],
          ["December",             "South coast, west coast, Galle, whale watching, festive season"],
        ],
      },
      {
        type: "heading",
        text: "Our Honest Recommendation",
      },
      {
        type: "paragraph",
        text: "If you can only go once and want to see as much of Sri Lanka as possible in one trip, aim for December to March. You will have reliable weather on the south and west coasts, good conditions inland and whale watching to look forward to in Mirissa. If flexibility is important and saving money matters, April and May offer the same itineraries at significantly lower prices just before the monsoon arrives.",
      },
      {
        type: "paragraph",
        text: "No matter when you travel, Sri Lanka will find a way to reward you. The island is small enough – you can drive from the wettest point to a sunny beach in a few hours – that with a good local driver and a flexible itinerary, you will rarely have a wasted day.",
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     2. SRI LANKA TRAVEL GUIDE FOR FIRST-TIME VISITORS
  ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "sri-lanka-travel-guide-first-time-visitors",
    title: "Sri Lanka Travel Guide for First-Time Visitors",
    excerpt:
      "Everything you need to know before your first trip – visas, getting around, currency, cultural etiquette and the must-see experiences.",
    category: "Travel guide",
    date: "2026-08-24",
    readingTime: "12 min read",
    image: articleImages.firstTime,
    featured: false,
    relatedDestinations: [
      { name: "Sigiriya",     href: "/destinations/sigiriya",     tag: "Cultural Triangle" },
      { name: "Ella",         href: "/destinations/ella",         tag: "Mountains & waterfalls" },
      { name: "Nuwara Eliya", href: "/destinations/nuwara-eliya", tag: "Tea country" },
    ],
    relatedTours: [
      { label: "See the Best of Sri Lanka – 7 Days", href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka" },
      { label: "Cultural & Heritage Tour",            href: "/sri-lanka-itineraries/cultural-heritage-tour" },
    ],
    content: [
      {
        type: "intro",
        text: "Sri Lanka is one of the most rewarding countries in Asia for first-time visitors. It is compact, extraordinarily diverse and genuinely welcoming. Within a single week you can stand on a 5th-century rock fortress, sip tea on a misty plantation and watch a leopard slip through tall grass at dusk. This guide covers everything you need before you land.",
      },
      {
        type: "heading",
        text: "Visas & Entry Requirements",
      },
      {
        type: "paragraph",
        text: "Most nationalities require an Electronic Travel Authorisation (ETA) to enter Sri Lanka, which you apply for online before travelling. The tourist ETA is valid for 30 days and can be extended at the Department of Immigration in Colombo. Apply through the official Sri Lanka government ETA portal and make sure the name on your ETA matches your passport exactly. The process takes anywhere from a few minutes to 24 hours, so don't leave it to the morning of your flight.",
      },
      {
        type: "heading",
        text: "Getting Around Sri Lanka",
      },
      {
        type: "paragraph",
        text: "Sri Lanka is a small island – 65,610 km² – but the roads can be slower than a map suggests. The iconic Colombo–Kandy road, for example, covers just 116 km but takes 3–4 hours by car. For first-time visitors, the most comfortable and flexible way to explore is with a private driver. You travel at your own pace, stop wherever you want and have a knowledgeable local beside you who can handle logistics, recommend restaurants and navigate road conditions.",
      },
      {
        type: "paragraph",
        text: "The scenic train network is also wonderful for specific routes – the Kandy to Ella route through the hill country is widely described as one of the most beautiful train journeys in the world. Book train tickets in advance, especially for 1st and 2nd class observation seats on the Kandy–Ella line.",
      },
      {
        type: "tip",
        heading: "Driver vs Train: Our Recommendation",
        text: "Use a private driver for the bulk of your journey and book the Kandy–Ella train as a one-way experience, leaving your driver to meet you at Ella station. This gives you the best of both worlds.",
      },
      {
        type: "heading",
        text: "Currency, Money & Tipping",
      },
      {
        type: "paragraph",
        text: "Sri Lanka's currency is the Sri Lankan Rupee (LKR). ATMs are widely available in cities and tourist areas but rare in remote locations, so carry enough cash when venturing off the beaten track. Most guesthouses and smaller restaurants are cash-only, while larger hotels and restaurants in tourist hubs accept card payments.",
      },
      {
        type: "paragraph",
        text: "Tipping is appreciated but not compulsory. A typical tip for a full-day private driver is LKR 1,000–2,000 per day. At restaurants, 10% is generous. Never feel pressured to tip beyond what you are comfortable with.",
      },
      {
        type: "heading",
        text: "Cultural Etiquette & Temple Visits",
      },
      {
        type: "paragraph",
        text: "Sri Lanka is a predominantly Buddhist country and temple etiquette is taken seriously. Remove your shoes before entering any temple or shrine and dress modestly – shoulders and knees must be covered. Many major temples provide sarongs to borrow. Never turn your back to a Buddha statue for photos and be respectful of worshippers, especially during prayer times.",
      },
      {
        type: "paragraph",
        text: "The Sri Lankan head wobble can be confusing for first-time visitors. A side-to-side head nod often means 'yes' or 'I understand' rather than 'no', so don't be alarmed when someone confirms your booking with what appears to be a shake of the head.",
      },
      {
        type: "heading",
        text: "Food & Drink",
      },
      {
        type: "paragraph",
        text: "Sri Lankan cuisine is bold, aromatic and built around rice, coconut and spice. A typical local meal is rice and curry – a plate of white rice surrounded by several small curries: dhal (lentil), fish or chicken, a coconut sambol, a papadum and vegetables. The food is generally spicier than Indian food, so if you are sensitive to heat, ask for 'less spice' when ordering.",
      },
      {
        type: "paragraph",
        text: "Breakfast in Sri Lanka is a delight in itself. String hoppers, hoppers and pol roti with dhal are morning staples. Try them at least once at a local restaurant rather than the hotel buffet for an authentic experience. Drink bottled or filtered water, and enjoy fresh king coconut juice (thambili) and fresh fruit juices throughout the day.",
      },
      {
        type: "heading",
        text: "Must-See Experiences for First-Timers",
      },
      {
        type: "paragraph",
        text: "Climbing Sigiriya Rock is the single most iconic thing to do in Sri Lanka. The 5th-century fortress rises 200 metres from the jungle floor and the views from the top are extraordinary. Go early in the morning to beat the heat and the crowds.",
      },
      {
        type: "paragraph",
        text: "The Temple of the Tooth in Kandy is Sri Lanka's most sacred Buddhist site. The evening puja ceremony at 6:30pm, accompanied by the sound of drums and flutes, is deeply atmospheric and open to visitors.",
      },
      {
        type: "paragraph",
        text: "A safari in Yala National Park is almost mandatory. With the world's highest density of leopards per square kilometre, your chances of a sighting are excellent. Book a jeep safari that starts at dawn for the best wildlife activity.",
      },
      {
        type: "paragraph",
        text: "The nine-arch bridge at Ella is the most photographed landmark in Sri Lanka's hill country. Position yourself on the viewing path and wait for the blue train to pass across the viaduct – your driver or guesthouse will know when the next one is due.",
      },
      {
        type: "heading",
        text: "Practical Tips",
      },
      {
        type: "paragraph",
        text: "Pack light cotton or linen clothing for the lowlands and coastal areas, and a light layer for the hill country evenings. Sun protection is essential even on cloudy days given the tropical latitude. A good insect repellent is advisable near national parks and rice paddies. Most importantly, carry a portable power bank – long driving days between attractions mean you'll want your phone charged for photos.",
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     3. HOW MANY DAYS DO YOU NEED IN SRI LANKA?
  ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "how-many-days-in-sri-lanka",
    title: "How Many Days Do You Need in Sri Lanka?",
    excerpt:
      "From a lightning 5-day highlight reel to a leisurely 3-week immersion – we break down the ideal duration for every travel style.",
    category: "Planning",
    date: "2026-08-12",
    readingTime: "7 min read",
    image: articleImages.howManyDays,
    featured: false,
    relatedDestinations: [
      { name: "Kandy",   href: "/destinations/kandy",   tag: "Hill country & culture" },
      { name: "Galle",   href: "/destinations/galle",   tag: "Colonial fort" },
      { name: "Bentota", href: "/destinations/bentota", tag: "Beach escape" },
    ],
    relatedTours: [
      { label: "See the Best of Sri Lanka – 7 Days", href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka" },
      { label: "Honeymoon Tour",                      href: "/sri-lanka-itineraries/honeymoon-tour" },
      { label: "Build Your Own Tour",                 href: "/tailor-made-tours/build" },
    ],
    content: [
      {
        type: "intro",
        text: "One of the first questions every visitor asks when planning a Sri Lanka trip is: 'How long should I go for?' The honest answer depends on what you want to see, how fast you like to travel and whether you mind covering the same road twice. Here is our practical breakdown of what is realistically achievable at different durations.",
      },
      {
        type: "heading",
        text: "5 Days – The Essential Highlights",
      },
      {
        type: "paragraph",
        text: "Five days is the absolute minimum for a meaningful first visit. You will need to make clear choices and move at a reasonable pace, but a well-planned 5-day circuit can still include Sigiriya Rock, a Kandy temple visit and a couple of days on the south coast. The hill country (Ella and Nuwara Eliya) is difficult to fit in properly without rushing, so in 5 days we recommend prioritising either the Cultural Triangle in the north or the beaches in the south, not both.",
      },
      {
        type: "paragraph",
        text: "A suggested 5-day route: Colombo arrival → Sigiriya & Dambulla → Kandy → Nuwara Eliya → fly home from Colombo (drive back). This is manageable but leaves no room for spontaneity.",
      },
      {
        type: "heading",
        text: "7 Days – The Sweet Spot",
      },
      {
        type: "paragraph",
        text: "Seven days is our most popular itinerary length and for good reason. A week in Sri Lanka allows you to properly experience the Cultural Triangle in the north, the hill country (Kandy, Nuwara Eliya, Ella) and the southern coast (Mirissa or Galle) without feeling permanently exhausted. You can take the famous train from Kandy to Ella, spend a morning on safari in Yala and still have a day to relax on a beach.",
      },
      {
        type: "tip",
        heading: "Our 7-Day Gold Standard",
        text: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella (train from Kandy) → Yala → Mirissa → Galle → Colombo. This is our most requested route and balances culture, nature, wildlife and beach perfectly.",
      },
      {
        type: "heading",
        text: "10 Days – The Comfortable Pace",
      },
      {
        type: "paragraph",
        text: "With 10 days you can do everything in the 7-day itinerary and add the extras that make a trip feel complete. A morning cooking class in Colombo. An extra day in Ella for a hike to Little Adam's Peak. An evening in Galle Fort browsing the boutiques and watching the sunset from the ramparts. Maybe a detour to Arugam Bay on the east coast if you're a surfer.",
      },
      {
        type: "paragraph",
        text: "Ten days also opens up the possibility of visiting the ancient city of Polonnaruwa alongside Sigiriya – both are in the Cultural Triangle and are genuinely complementary experiences that need at least a full day each.",
      },
      {
        type: "heading",
        text: "2 Weeks – Go Deeper",
      },
      {
        type: "paragraph",
        text: "Two weeks in Sri Lanka feels genuinely relaxed and allows you to explore regions that most visitors miss entirely. The north – Jaffna, with its distinctive Tamil culture, colonial forts and extraordinary food – is easily the most underrated destination in the country. Trincomalee on the east coast has superb diving and some of the calmest, clearest water in South Asia. The ancient city of Anuradhapura, the largest archaeological site in Sri Lanka, deserves far more than a rushed morning.",
      },
      {
        type: "paragraph",
        text: "Two weeks also means you can slow down. Stay three nights in Ella instead of one. Take an afternoon to sit on a tea estate veranda and do absolutely nothing. Sri Lanka is an island that rewards lingering.",
      },
      {
        type: "heading",
        text: "3 Weeks and Beyond – The Full Island",
      },
      {
        type: "paragraph",
        text: "Three weeks or more puts the whole island within reach. You can combine the north, east and south coasts in a single loop, explore the Adam's Peak pilgrimage route and discover the rarely-visited rainforests of Sinharaja. Long-stay visitors often find that the island keeps revealing itself the longer they stay.",
      },
      {
        type: "heading",
        text: "Our Recommendation by Travel Style",
      },
      {
        type: "table",
        headers: ["Travel Style", "Ideal Duration"],
        rows: [
          ["City break / short getaway",       "5 days"],
          ["Classic first-time highlights",    "7 days"],
          ["Relaxed sightseeing + beach",      "10 days"],
          ["Honeymoon or special occasion",    "10–14 days"],
          ["Adventure & off-the-beaten-path",  "14–21 days"],
          ["Remote working / slow travel",     "3+ weeks"],
        ],
      },
      {
        type: "paragraph",
        text: "Whatever your duration, the key is to avoid trying to do too much. Sri Lanka is deceptively small on the map but the roads mean nothing is as close as it appears. Build in buffer days, travel slowly and allow the country to surprise you.",
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────────
     4. BEST BEACHES IN SRI LANKA
  ────────────────────────────────────────────────────────────────────────── */
  {
    slug: "best-beaches-in-sri-lanka",
    title: "Best Beaches in Sri Lanka",
    excerpt:
      "From whale-watching bays to hidden coves and world-class surf breaks – a local guide to the beaches that deserve a place on your itinerary.",
    category: "Beaches",
    date: "2026-07-30",
    readingTime: "9 min read",
    image: articleImages.beaches,
    featured: false,
    relatedDestinations: [
      { name: "Mirissa",  href: "/destinations/mirissa",  tag: "Whales & beaches" },
      { name: "Galle",    href: "/destinations/galle",    tag: "Colonial fort" },
      { name: "Bentota",  href: "/destinations/bentota",  tag: "Beach escape" },
    ],
    relatedTours: [
      { label: "Beach Tour",                 href: "/sri-lanka-itineraries/beach-tour" },
      { label: "Whale Watching Tour",        href: "/sri-lanka-itineraries/whale-watching-tour" },
      { label: "Galle & Unawatuna Day Tour", href: "/day-tours/galle-unawatuna-day-tour" },
    ],
    content: [
      {
        type: "intro",
        text: "Sri Lanka has more than 1,500 kilometres of coastline and choosing a beach can feel overwhelming. The island's two monsoon systems mean the 'best' beach changes depending on when you visit, so we've organised this guide by region and season to help you pick the right spot at the right time.",
      },
      {
        type: "heading",
        text: "South Coast Beaches – December to April",
      },
      {
        type: "paragraph",
        text: "Mirissa is the jewel of the south coast. A crescent of golden sand backed by coconut palms, it is small enough to feel intimate but developed enough for comfort. More than the beach itself, Mirissa is the world's premier location for blue whale watching – the largest animals on earth pass through the waters just off the coast between November and April. A whale-watching trip from Mirissa harbour on a calm January morning is one of the most memorable wildlife experiences in Asia.",
      },
      {
        type: "paragraph",
        text: "Unawatuna, just east of Galle, was once Sri Lanka's most famous beach. It is still beautiful – a sheltered bay with calm turquoise water, perfect for swimming, lined with beach restaurants and bars – but it has become busier in recent years. Arrive early in the morning before the day-trippers from Colombo arrive and you'll have the sand almost to yourself.",
      },
      {
        type: "paragraph",
        text: "Tangalle is the south coast's best-kept secret. An hour east of Mirissa, it is wilder, quieter and feels less tourist-orientated. The long stretch of beach is largely undeveloped and the pace is noticeably slower. A perfect choice if you want the south coast with a little more peace.",
      },
      {
        type: "tip",
        heading: "Galle Day Trip",
        text: "Combine any south coast beach stay with a morning in Galle Fort, a 17th-century Dutch colonial fortress now home to boutique hotels, art galleries and excellent cafés. It is just 20–40 minutes from most south coast beaches and completely unlike anywhere else in Sri Lanka.",
      },
      {
        type: "heading",
        text: "West Coast Beaches – November to April",
      },
      {
        type: "paragraph",
        text: "Bentota is the west coast's most elegant beach destination – a long, wide stretch of sand on a peninsula between the Indian Ocean and the Bentota lagoon. The calm lagoon side is perfect for watersports including jet-skiing, banana boats and kayaking, while the ocean side offers a more dramatic surf. The concentration of luxury spa hotels makes Bentota a popular choice for honeymoons and wellness retreats.",
      },
      {
        type: "paragraph",
        text: "Negombo sits just 30 minutes north of Colombo's airport and is often used as a first or last night destination. It is a working fishing town as much as a beach resort, and the early-morning fish market and the fleet of traditional outrigger canoes returning at dawn are among the most atmospheric sights on the west coast.",
      },
      {
        type: "heading",
        text: "East Coast Beaches – May to October",
      },
      {
        type: "paragraph",
        text: "Arugam Bay on the east coast is one of Asia's legendary surf destinations. A long, sweeping bay with a consistent right-hand point break, it attracts serious surfers from around the world between June and September. The town itself has a wonderfully laid-back backpacker atmosphere – the kind of place where a quick coffee in the morning turns into a full day of conversation and sea views.",
      },
      {
        type: "paragraph",
        text: "Trincomalee, in the north-east, is home to what many argue are the finest beaches in Sri Lanka. Nilaveli and Uppuveli, just north of the town, have white sand and water so clear and calm between May and September that they feel almost Caribbean. Pigeon Island just offshore is one of Sri Lanka's national parks and offers excellent snorkelling with reef sharks and sea turtles.",
      },
      {
        type: "heading",
        text: "North Coast – Year-Round Potential",
      },
      {
        type: "paragraph",
        text: "Casuarina Beach near Karainagar in the Jaffna peninsula is one of the least-visited beaches in Sri Lanka – and one of the most beautiful. Crystal-clear, shallow water over a sea-grass bed stretches almost endlessly. The north has historically received fewer tourists but is increasingly accessible and the beaches reward the extra travel time.",
      },
      {
        type: "heading",
        text: "Beach Quick Reference",
      },
      {
        type: "table",
        headers: ["Beach", "Best Season", "Known For"],
        rows: [
          ["Mirissa",    "Dec – Apr",   "Whale watching, golden sand, sunset views"],
          ["Unawatuna",  "Dec – Apr",   "Sheltered swimming, Galle proximity"],
          ["Tangalle",   "Dec – Apr",   "Quiet, undeveloped, turtle nesting"],
          ["Bentota",    "Nov – Apr",   "Watersports, luxury spas, lagoon"],
          ["Arugam Bay", "Jun – Sep",   "World-class surfing, backpacker vibe"],
          ["Nilaveli",   "May – Sep",   "Crystal water, Pigeon Island snorkelling"],
          ["Casuarina",  "Year-round",  "Remote, untouched, stunning clarity"],
        ],
      },
      {
        type: "heading",
        text: "Our Favourite Beach Combination",
      },
      {
        type: "paragraph",
        text: "If we had to choose one beach itinerary for a first-time visitor travelling December to March, it would be: two nights in Mirissa for whale watching and beach relaxation, one day in Galle Fort, one night in Tangalle for a quieter experience and then back north via Bentota for a final night before flying home. This covers the best of the south coast without doubling back unnecessarily.",
      },
    ],
  },
];

// ─── Data access helpers (mirrors the pattern in lib/content.js) ──────────────

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getRelatedBlogPosts(post, limit = 3) {
  return blogPosts.filter((p) => p.slug !== post.slug).slice(0, limit);
}
