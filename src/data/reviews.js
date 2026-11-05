/**
 * Reviews page data – Content Plan §23.
 *
 * Real reviews from Google and Tripadvisor are marked `isSample: false`.
 * Any remaining placeholder items are marked `isSample: true` and are hidden
 * on the live site unless NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS=true.
 *
 * Review fields: name, rating, text, title (Tripadvisor only), source, date,
 * tour. `source` is one of the ids in REVIEW_SOURCES.
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
  // ── Tripadvisor Reviews ───────────────────────────────────────────────────
  {
    id: "r-t-001",
    isSample: false,
    name: "Lubika H",
    rating: 5,
    source: "tripadvisor",
    title: "Professional, Reliable & Outstanding Service!",
    text: "Seren Lanka Travels provides excellent service with a friendly, professional, and dedicated team. Everything is handled smoothly and efficiently, with great attention to detail and customer satisfaction. A reliable choice for anyone looking for quality travel services. Highly recommended!",
  },
  {
    id: "r-t-002",
    isSample: false,
    name: "Piyumi M",
    rating: 5,
    source: "tripadvisor",
    title: "Excellent Service and an Unforgettable Travel Experience!",
    text: "My experience with Seren Lanka Travels was truly wonderful and memorable. From beginning to end, their service was exceptional, professional, and very friendly. The team was incredibly helpful, welcoming, and attentive to every detail. Their commitment, kindness, and dedication made the entire experience smooth, comfortable, and enjoyable. I truly appreciate their excellent customer service and the effort they put into ensuring a great experience. I highly recommend Seren Lanka Travels to anyone looking for reliable, professional, and high-quality travel services in Sri Lanka. Thank you for making the experience so special. Looking forward to travelling with you again!",
  },
  {
    id: "r-t-003",
    isSample: false,
    name: "Sajith P",
    rating: 5,
    source: "tripadvisor",
    title: "An excellent travel experience with friendly professional service",
    text: "We had an excellent experience with Seren Lanka Travels. The service was very professional, friendly, and well organized. The staff were helpful and welcoming throughout our journey. Everything was arranged smoothly, and we really enjoyed the experience with our friends. The transportation and overall service were great. Highly recommended for anyone looking for a reliable and enjoyable travel experience in Sri Lanka. Thank you, Seren Lanka Travels, for making our trip memorable!",
  },
  {
    id: "r-t-004",
    isSample: false,
    name: "Isuru C",
    rating: 5,
    source: "tripadvisor",
    title: "Beautiful Mirissa Beach – A Wonderful Experience",
    text: "Mirissa Beach is a beautiful and peaceful place with golden sand, clear blue water and amazing ocean views. I really enjoyed the natural beauty and relaxing atmosphere. It is a wonderful place to visit and enjoy the beach.",
  },
  {
    id: "r-t-005",
    isSample: false,
    name: "Yala Park Safari",
    rating: 5,
    source: "tripadvisor",
    title: "Excellent Taxi Service – Highly Recommended!",
    text: "I had a wonderful experience with Serani. The overall service was excellent, and everything was well organised. The vehicle was clean, comfortable, and well maintained. The driver was friendly, professional, and punctual. I really appreciated the quality of the service throughout the journey. Highly recommended for anyone looking for a safe, comfortable, and reliable taxi service in Sri Lanka!",
  },

  // ── Google Reviews ────────────────────────────────────────────────────────
  {
    id: "r-g-001",
    isSample: false,
    name: "Kusal Chamod",
    rating: 5,
    source: "google",
    text: "I had a wonderful experience with Seren Lanka Travels! Their service was excellent, professional, and reliable from start to finish. The team was friendly, helpful, and very supportive throughout the journey. Everything was well organised, and the overall experience was smooth, comfortable, and enjoyable. Highly recommended for anyone looking for quality travel services in Sri Lanka. Looking forward to travelling with them again!",
  },
  {
    id: "r-g-002",
    isSample: false,
    name: "Pramod Singh",
    rating: 5,
    source: "google",
    text: "Best travel company to visit Shrilanka.",
  },
  {
    id: "r-g-003",
    isSample: false,
    name: "Pooja Goyal",
    rating: 5,
    source: "google",
    text: "We had a wonderful time in Sri Lanka all because of Sithun. Itinerary was well planned and executed. Sithun is very humble and makes the trip comfortable.",
  },
  {
    id: "r-g-004",
    isSample: false,
    name: "Vibhashana Wickramasinghe",
    rating: 5,
    source: "google",
    text: "Had a great experience with Sithum! Sithum was very friendly, helpful, and professional. Everything went smoothly, and we really enjoyed the experience. Highly recommended!",
  },
  {
    id: "r-g-005",
    isSample: false,
    name: "Prithvi Raj",
    rating: 5,
    source: "google",
  },
  {
    id: "r-g-006",
    isSample: false,
    name: "Abhay Vijayvargiya",
    rating: 5,
    source: "google",
  },
  {
    id: "r-g-007",
    isSample: false,
    name: "K Palani Kumar",
    rating: 5,
    source: "google",
  },
  {
    id: "r-g-008",
    isSample: false,
    name: "Nathan Biquard",
    rating: 5,
    source: "google",
  },
  {
    id: "r-g-009",
    isSample: false,
    name: "Iman Iman",
    rating: 5,
    source: "google",
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
export const SHOW_SAMPLES ="true";

export const getVisibleReviews = () => reviews.filter((r) => !r.isSample || SHOW_SAMPLES);
export const getVisiblePhotos = () => travellerPhotos.filter((p) => !p.isSample || SHOW_SAMPLES);
