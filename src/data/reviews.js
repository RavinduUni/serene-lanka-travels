/**
 * Reviews page data – Content Plan §23.
 *
 * ⚠️ SAMPLE CONTENT. Every review and photo below is marked `isSample: true`.
 * Presenting invented reviews or stock photos as real guests is deceptive and
 * can breach consumer-protection rules, so sample items:
 *   • always show a visible "Sample" badge, and
 *   • are HIDDEN on the live site unless NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS=true
 *     (use that only on a private preview for the client).
 * Replace them with real, approved reviews (isSample: false) before launch.
 *
 * Review fields (§23 "Review Card Fields"): name, country, rating, text, tour,
 * photo, source, date. `source` is one of the ids in REVIEW_SOURCES.
 */

const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const REVIEW_SOURCES = {
  google: { label: "Google" },
  tripadvisor: { label: "Tripadvisor" },
  website: { label: "Website" },
  whatsapp: { label: "Shared via WhatsApp" },
};

export const reviewsHero = {
  image: "/reviews/review-hero.png",
  heading: ["What Travellers Say"],
  copy:
    "Honest words from guests who explored Sri Lanka with us – from first-time visitors on a single day tour to families and honeymooners on journeys across the island.",
};

export const reviews = [
  {
    id: "r-001",
    isSample: true,
    name: "Emma W.",
    country: "United Kingdom",
    rating: 5,
    date: "2026-08",
    source: "google",
    tour: { name: "See the Best of Sri Lanka", href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka" },
    text:
      "Seven days that felt like three weeks in the best possible way. Our driver collected us at the airport, and from that moment everything was calm and easy. He knew exactly when to stop for photos, which tea factory to visit and where to find the best rice and curry on the road to Ella. The Yala safari was the highlight – two leopards in one morning! Every change we asked for was handled by WhatsApp within minutes.",
  },
  {
    id: "r-002",
    isSample: true,
    name: "Jonas & Lena",
    country: "Germany",
    rating: 5,
    date: "2026-07",
    source: "tripadvisor",
    tour: { name: "Honeymoon Tour", href: "/sri-lanka-itineraries/honeymoon-tour" },
    text:
      "We booked the honeymoon tour and it was perfect from Kandy to Mirissa. The hotels were beautiful, the pace was relaxed and nothing ever felt rushed. A small surprise in our room in Ella made us both smile. Thank you for making our first trip together so special.",
  },
  {
    id: "r-003",
    isSample: true,
    name: "Priya S.",
    country: "India",
    rating: 5,
    date: "2026-06",
    source: "google",
    tour: { name: "Ramayana Tour", href: "/sri-lanka-itineraries/ramayana-tour" },
    text:
      "As a family we wanted to visit the Ramayana temples with someone who understood the meaning of each place. Our driver was respectful, patient with my parents and always on time. Ravana Falls and the Sita Amman Temple were unforgettable.",
  },
  {
    id: "r-004",
    isSample: true,
    name: "Michael R.",
    country: "Australia",
    rating: 5,
    date: "2026-05",
    source: "website",
    tour: { name: "Kandy Day Tour", href: "/day-tours/kandy-day-tour" },
    text:
      "Only had one free day before a work trip, and this was the perfect way to use it. Comfortable car, cold water waiting, and a driver who explained the history of the Temple of the Tooth on the way. Great value.",
  },
  {
    id: "r-005",
    isSample: true,
    name: "Sophie L.",
    country: "France",
    rating: 5,
    date: "2026-04",
    source: "google",
    tour: { name: "Into the Wild Sri Lanka", href: "/sri-lanka-itineraries/into-the-wild-sri-lanka" },
    text:
      "We saw elephants at Udawalawe, a leopard in Yala and so many birds I lost count. The team planned the safaris around the best times of day and found us lovely lodges near each park. Highly recommended for wildlife lovers.",
  },
  {
    id: "r-006",
    isSample: true,
    name: "The Martins",
    country: "Canada",
    rating: 5,
    date: "2026-03",
    source: "tripadvisor",
    tour: { name: "Family Tour", href: "/sri-lanka-itineraries/family-tour" },
    text:
      "Travelling with two kids (7 and 10) can be stressful, but not here. Child seats were ready, drives were broken up with fun stops and our driver became the kids' favourite person on the trip. They still talk about the turtle hatchery in Bentota.",
  },
  {
    id: "r-007",
    isSample: true,
    name: "Daan V.",
    country: "Netherlands",
    rating: 4,
    date: "2026-02",
    source: "google",
    tour: { name: "Airport Transfers", href: "/transfers/airport-transfers" },
    text:
      "Our flight was two hours late but the driver was still waiting with a name sign and a smile. Clean van, safe driving to Kandy. Only wish we had booked them for the whole trip from the start!",
  },
  {
    id: "r-008",
    isSample: true,
    name: "Anna K.",
    country: "Switzerland",
    rating: 5,
    date: "2026-01",
    source: "whatsapp",
    tour: { name: "Ella Day Tour", href: "/day-tours/ella-day-tour" },
    text:
      "We timed the Nine Arches Bridge perfectly to catch the train, climbed Little Adam's Peak at sunrise and still had time for Ravana Falls. Brilliant planning and a really friendly driver.",
  },
  {
    id: "r-009",
    isSample: true,
    name: "Robert & Jane",
    country: "United States",
    rating: 5,
    date: "2025-12",
    source: "website",
    tour: { name: "Tailor-made tour", href: "/tailor-made-tours" },
    text:
      "We sent a rough idea of what we wanted and got back an itinerary that fitted us exactly – culture first, then a slow finish on the beach. Clear pricing, no surprises, and help whenever we needed it.",
  },
];

/** Traveller photo wall (§23 "Customer photos"). Replace with real, approved guest photos. */
export const travellerPhotos = [
  { src: '/reviews/review1.jpg', alt: "Travellers hiking in the hill country", caption: "Hiking in the hill country", isSample: true },
  { src: '/reviews/review2.png', alt: "Elephants seen on safari", caption: "Safari day", isSample: true },
  { src: '/reviews/review3.jpg', alt: "Couple watching the sunset on the beach", caption: "Sunset on the south coast", isSample: true },
  { src: '/reviews/review4.jpg', alt: "Train crossing the Nine Arches Bridge", caption: "Nine Arches Bridge, Ella", isSample: true },
  { src: '/reviews/review5.jpg', alt: "Surfer riding a wave", caption: "Surf lesson in Weligama", isSample: true },
  { src: '/reviews/review6.jpg', alt: "Tea plantation in the hills", caption: "Tea country, Nuwara Eliya", isSample: true },
  { src: '/reviews/review7.jpg', alt: "Galle Fort ramparts", caption: "Galle Fort walk", isSample: true },
  { src: '/reviews/review8.jpg', alt: "Sigiriya rock fortress", caption: "Sigiriya climb", isSample: true },
];

/**
 * Review platforms. Add each profile URL when the listing exists – cards
 * without a URL show "Profile coming soon". Never display a rating or review
 * count that is not live and accurate on the platform itself.
 */
export const reviewPlatforms = [
  {
    id: "google",
    name: "Google",
    description: "Reviews left on our Google Business Profile.",
    readUrl: null, // TODO: Google Business Profile reviews link
    writeUrl: null, // TODO: Google "write a review" link
  },
  {
    id: "tripadvisor",
    name: "Tripadvisor",
    description: "Reviews from travellers on Tripadvisor.",
    readUrl: null, // TODO: Tripadvisor listing link
    writeUrl: null,
  },
  {
    id: "website",
    name: "Direct from guests",
    description: "Reviews sent to us through the form on this page, published with permission.",
    readUrl: "#reviews",
    writeUrl: "#write-a-review",
  },
];

export const reviewProcess = [
  { title: "Travel with us", text: "Every review comes from a guest who has travelled with Seren Lanka Travels." },
  { title: "Share your experience", text: "Guests review us on Google, on Tripadvisor or through the form on this page." },
  { title: "We check and publish", text: "We confirm reviews submitted here relate to a real trip, then publish them unchanged." },
];

export const trustPrinciples = [
  "We never write, buy or edit reviews to change what a guest said.",
  "Reviews sent through this website are published only with the guest’s permission.",
  "We show reviews whatever their star rating – we don’t hide honest feedback.",
  "Each review shows where it came from, so you know exactly what you are reading.",
];

export const reviewFaqs = [
  {
    q: "Are these reviews genuine?",
    a: "Yes. Every review on this page comes from a guest who travelled with us, and each card shows where it came from – Google, Tripadvisor, WhatsApp or our website. We never write or edit reviews.",
  },
  {
    q: "Do you edit or remove negative reviews?",
    a: "No. We don’t change what guests write. We only decline submissions that contain offensive language, personal information about other people, or that are not about a trip with us.",
  },
  {
    q: "How do I leave a review?",
    a: "Use the form on this page, or review us on Google or Tripadvisor. If you prefer, you can also send your thoughts to us on WhatsApp.",
  },
  {
    q: "When will my review appear?",
    a: "Reviews sent through this page are published after we confirm they relate to a trip with us – usually within a few days.",
  },
  {
    q: "Can I add photos from my trip?",
    a: "Yes – you can attach one photo to your review. Please only share photos you took yourself and that everyone pictured is happy to have published.",
  },
];

/* ------------------------------------------------------------- visibility */

/** Samples are visible in development, or on a preview with the env switch on. */
export const SHOW_SAMPLES =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS === "true";

export const getVisibleReviews = () => reviews.filter((r) => !r.isSample || SHOW_SAMPLES);
export const getVisiblePhotos = () => travellerPhotos.filter((p) => !p.isSample || SHOW_SAMPLES);
