/**
 * About Us page content – mapped 1:1 to Content Plan §10.
 * All copy here is the confirmed wording from the plan; edit here, not in components.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const aboutHero = {
  // §10 H1 – split for the site's light/bold heading device
  heading: ["More Than a Tour.", "A Sri Lankan Journey Built on Trust."],
  copy:
    "Seren Lanka Travels began with a simple idea: to make every journey in Sri Lanka comfortable, genuine and memorable.",
};

/** §10.1 – Our Story (confirmed founder story) */
export const ourStory = {
  heading: ["Our", "Story"],
  paragraphs: [
    "Seren Lanka Travels began with a simple idea: to make every journey in Sri Lanka comfortable, genuine and memorable. The founders initially helped international travellers move safely and comfortably between the destinations they wanted to experience.",
    "As more guests travelled with them, recommendations from satisfied travellers helped the service grow. That trust became the motivation to establish Seren Lanka Travels as a professional and legally operated tourism company – while keeping the same personal care, honesty and friendly local approach.",
  ],
  promise:
    "We don't just take you around Sri Lanka. We help you experience Sri Lanka like a friend.",
  images: ["/mirissa.jpg", "/hero.jpg"],
  milestones: [
    { value: "2022", label: "Began operations helping international travellers" },
    { value: "2026", label: "Registered as a professional tourism company" },
    { value: "6+", label: "Years travelling with guests from around the world" },
  ],
};

/** §10.2 – Meaning Behind Seren Lanka */
export const brandMeaning = {
  heading: ["The Meaning Behind", "Seren Lanka"],
  copy:
    "Together, the name communicates a peaceful and beautiful Sri Lankan travel experience built around comfort, confidence and memorable experiences.",
  seren: {
    word: "Seren",
    definition: "represents tranquility, beauty, freedom and a comfortable experience.",
  },
  lanka: {
    word: "Lanka",
    definition: "represents Sri Lanka – the island at the heart of every journey we create.",
  },
  /** Cards rendered in the image-card grid */
  cards: [
    {
      icon: "Waves",
      label: "Tranquility",
      tag: "Serenity & calm",
      subtitle: "Peaceful journeys, still waters and calm moments across Sri Lanka",
      image: "/brand-tranquility.jpg",
    },
    {
      icon: "Sparkles",
      label: "Beauty",
      tag: "Landscapes & light",
      subtitle: "Emerald tea hills, golden light and landscapes that take your breath away",
      image: "/brand-beauty.jpg",
    },
    {
      icon: "Bird",
      label: "Freedom",
      tag: "Open horizons",
      subtitle: "Discover the island at the heart of every journey we create",
      image: "/brand-freedom.jpg",
    },
    {
      icon: "Armchair",
      label: "Comfort",
      tag: "At ease, always",
      subtitle: "Relaxed, personal travel where every detail is taken care of for you",
      image: "/brand-comfort.jpg",
    },
  ],
};

/** §10.3 / §10.4 – confirmed Mission & Vision */
export const missionVision = [
  {
    icon: "Compass",
    title: "Our Mission",
    copy:
      "Going beyond a destination to create meaningful journeys that connect people, cultures, nature and emotions; providing every traveller the opportunity to experience Sri Lanka with love, trust and responsibility.",
  },
  {
    icon: "Eye",
    title: "Our Vision",
    copy:
      "Bringing the hidden beauty in the heart of Sri Lanka to the hearts of the world, making every journey not just a memory but an experience felt for a lifetime, and building a boundless world of tourism.",
  },
];

/** §10.5 – Why Choose Seren Lanka Travels */
export const whyChoose = {
  heading: ["Why Choose", "Seren Lanka Travels"],
  copy: "Nine reasons why travellers from around the world choose us for their Sri Lanka journey.",
  items: [
    {
      icon: "UserRound",
      label: "Personalized Private Tours",
      tag: "Just for you",
      blurb: "Every journey is crafted exclusively for your group — no shared coaches, no compromises.",
      image: "/why-private-tours.jpg",
    },
    {
      icon: "Route",
      label: "Flexible Itineraries",
      tag: "Your pace, your way",
      blurb: "Change plans on the go. We adapt to what you want, when you want it.",
      image: "/why-flexible.jpg",
    },
    {
      icon: "Smile",
      label: "Friendly Service",
      tag: "Warm & welcoming",
      blurb: "Warm, genuine hospitality from people who genuinely love showing Sri Lanka to the world.",
      image: "/why-friendly.jpg",
    },
    {
      icon: "Car",
      label: "Experienced Local Drivers",
      tag: "Safe & knowledgeable",
      blurb: "Licensed, experienced drivers who know every road, shortcut and scenic stop.",
      image: "/why-drivers.jpg",
    },
    {
      icon: "Armchair",
      label: "Comfortable Vehicles",
      tag: "Travel in comfort",
      blurb: "Air-conditioned, well-maintained vehicles so every mile feels effortless.",
      image: "/why-vehicles.jpg",
    },
    {
      icon: "MapPinned",
      label: "Local Knowledge",
      tag: "Hidden gems await",
      blurb: "We know the spots no guidebook lists — hidden waterfalls, secret viewpoints and more.",
      image: "/why-local-knowledge.jpg",
    },
    {
      icon: "Wallet",
      label: "Competitive Pricing",
      tag: "Value without compromise",
      blurb: "Premium experiences at honest, transparent prices. No hidden fees.",
      image: "/why-pricing.jpg",
    },
    {
      icon: "MessageCircle",
      label: "Direct Communication",
      tag: "Always reachable",
      blurb: "Speak directly with our team on WhatsApp at every step of your journey.",
      image: "/why-communication.jpg",
    },
    {
      icon: "HeartHandshake",
      label: "Authentic Experiences",
      tag: "Real Sri Lanka",
      blurb: "Go beyond the tourist trail and connect with the real heart of Sri Lanka.",
      image: "/why-authentic.jpg",
    },
  ],
};

/**
 * §10.6 – Our Team.
 * Photos are PENDING: photo is null until real photographs are supplied,
 * and the card renders a branded initials avatar instead. Never use stock
 * photos of strangers for real, named people.
 */
export const team = {
  watermark: "our founders",
  heading: ["Meet", "Our Founders"],
  members: [
    {
      name: "Rachitha Bandara",
      position: "Director",
      phone: "+94 77 421 5943",
      photo: null, // TODO: replace with real photograph, e.g. "/images/team/rachitha-bandara.jpg"
    },
    {
      name: "Sithum Dulanjana",
      position: "Director",
      phone: "+94 70 285 3374",
      photo: null, // TODO: replace with real photograph, e.g. "/images/team/sithum-dulanjana.jpg"
    },
  ],
  story: [
    "Seren Lanka Travels was founded by Sithum Dulanjana and Rachitha Bandara, two friends who turned their passion for Sri Lanka and travel into a shared dream.",
    "With over 6 years of experience travelling with guests from around the world, we have built our journey through hard work, dedication, trust, and countless unforgettable moments with our travelers.",
    "What started as a simple passion gradually became a dream to create something of our own, a travel company where every guest feels welcomed, cared for, and treated like a friend.",
    "Our journey has not always been easy, but every step has brought us closer to our dream. Today, we are proud to share that journey with you through Seren Lanka Travels.",
  ],
  signoff: "Come as a guest. Leave as a friend.",
};

/**
 * §10.7 – Registrations & Trust.
 * Certification/licence documents are PENDING. Add items here when the
 * approved licence, registration and certification details are supplied –
 * the badges render automatically. Leave empty to show only the confirmed facts.
 * Shape: { icon: "BadgeCheck", title: "SLTDA Licence", detail: "Reg. No. ..." }
 */
export const trust = {
  heading: ["Registered &", "Trusted"],
  copy:
    "Seren Lanka Travels operates as a professional, legally registered Sri Lankan tourism company – the same personal service our first guests knew, now with the standards and accountability of a licensed operator.",
  facts: [
    { icon: "CalendarCheck", title: "Operating since 2022", detail: "Helping international travellers across Sri Lanka" },
    { icon: "BadgeCheck", title: "Registered in 2026", detail: "A professional, legally operated tourism company" },
    { icon: "MessageCircle", title: "Direct communication", detail: "Speak with our team on WhatsApp at any step" },
  ],
  certifications: [],
};

/** §10.8 – closing CTA */
export const aboutCta = {
  heading: ["Let's Plan Your", "Sri Lanka Journey"],
  copy:
    "Tell us where you want to go, what you love and how long you have. We'll help turn it into a journey worth remembering.",
};
