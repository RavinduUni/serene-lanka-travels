/**
 * Global site configuration – brand, navigation, contact, CTAs.
 * Source of truth: Content Plan – Seren Lanka Travels V1.0 (sections 2, 6, 8, 27, 29).
 */

export const site = {
  name: "Seren Lanka Travels",
  tagline: "Private, flexible and unforgettable journeys across Sri Lanka.",
  promise: "We don't just take you around Sri Lanka. We help you experience Sri Lanka like a friend.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://serenlankatravels.com",
  founded: 2022,
  registered: 2026,
  logo: "/logo/whitelogo.png",
  // Official contact details are still pending in the content plan.
  // The number below is the Director's WhatsApp listed in the plan – replace when confirmed.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "94774215943",
  email: "hello@serenlankatravels.com", // TODO: confirm official email
  phones: ["+94 77 421 5943", "+94 70 285 3374"],
  social: {
    facebook: "#",
    instagram: "#",
    tripadvisor: "#",
    youtube: "#",
  },
};

/** Primary navigation (Content Plan §8) */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  {
    label: "Day Tours",
    href: "/day-tours",
    children: [
      { label: "Colombo City Tour", href: "/day-tours/colombo-city-tour" },
      { label: "Kandy Day Tour", href: "/day-tours/kandy-day-tour" },
      { label: "Sigiriya & Dambulla Day Tour", href: "/day-tours/sigiriya-dambulla-day-tour" },
      { label: "Galle & Unawatuna Day Tour", href: "/day-tours/galle-unawatuna-day-tour" },
      { label: "Bentota Day Tour", href: "/day-tours/bentota-day-tour" },
      { label: "Ella Day Tour", href: "/day-tours/ella-day-tour" },
      { label: "Nuwara Eliya Day Tour", href: "/day-tours/nuwara-eliya-day-tour" },
    ],
  },
  {
    label: "Itineraries",
    href: "/sri-lanka-itineraries",
    children: [
      { label: "Popular Sri Lanka Tours",      href: "/sri-lanka-itineraries/see-the-best-of-sri-lanka" },
      { label: "Luxury Tours",                 href: "/sri-lanka-itineraries/luxury-tour" },
      { label: "Honeymoon Tours",              href: "/sri-lanka-itineraries/honeymoon-tour" },
      { label: "Family Tours",                 href: "/sri-lanka-itineraries/family-tour" },
      { label: "Wildlife & Safari Tours",      href: "/sri-lanka-itineraries/into-the-wild-sri-lanka" },
      { label: "Adventure Tours",              href: "/sri-lanka-itineraries/adventure-tour" },
      { label: "Cultural & Heritage Tours",    href: "/sri-lanka-itineraries/cultural-heritage-tour" },
      { label: "Beach Tours",                  href: "/sri-lanka-itineraries/beach-tour" },
      { label: "Nature Tours",                 href: "/sri-lanka-itineraries/nature-tour" },
      { label: "North & East Sri Lanka Tours", href: "/sri-lanka-itineraries/north-east-sri-lanka-tour" },
      { label: "Budget Tours",                 href: "/sri-lanka-itineraries/budget-tour" },
      { label: "Ramayana Tours",               href: "/sri-lanka-itineraries/ramayana-tour" },
      { label: "Whale Watching Tours",         href: "/sri-lanka-itineraries/whale-watching-tour" },
    ],
  },
  {
    label: "Tailor-Made",
    href: "/tailor-made-tours",
    children: [
      { label: "Build Your Sri Lanka Tour", href: "/tailor-made-tours/build" },
      { label: "Estimated Tour Calculator", href: "/tailor-made-tours/calculator" },
    ],
  },
  {
    label: "Transfers",
    href: "/transfers",
    children: [
      { label: "Airport Transfers", href: "/transfers/airport-transfers" },
      { label: "Hotel Pick-up & Drop-off", href: "/transfers/hotel-pickup-drop-off" },
      { label: "City-to-City Transfers", href: "/transfers/city-to-city" },
      { label: "Custom Transfers", href: "/transfers/custom" },
      { label: "Private Transport / Vehicle Hire with Driver", href: "/transfers/private-vehicle-hire" },
    ],
  },
  {
    label: "Discover",
    href: "/discover-sri-lanka",
    children: [
      { label: "Destinations", href: "/destinations" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

/** Footer columns (Content Plan §29) */
export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Day Tours", href: "/day-tours" },
      { label: "Sri Lanka Itineraries", href: "/sri-lanka-itineraries" },
      { label: "Tailor-Made Tours", href: "/tailor-made-tours" },
      { label: "Destinations", href: "/destinations" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Airport Transfers", href: "/transfers/airport-transfers" },
      { label: "Pick & Drop", href: "/transfers/hotel-pickup-drop-off" },
      { label: "Private Transport", href: "/transfers/private-vehicle-hire" },
      { label: "Build Your Tour", href: "/tailor-made-tours/build" },
      { label: "Request a Quote", href: "/contact-us" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Reviews", href: "/reviews" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
      { label: "Cancellation & Refund Policy", href: "/legal/cancellation-refund-policy" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
    ],
  },
];

/** Page-specific prefilled WhatsApp messages (Content Plan §27) */
export const whatsappTemplates = {
  generic: "Hi Seren Lanka Travels, I would like help planning a trip to Sri Lanka.",
  tour: (name) => `Hi Seren Lanka Travels, I'm interested in ${name}. Please send me more details.`,
  customize: (name) => `Hi Seren Lanka Travels, I would like to customize ${name}.`,
  transfer: (from, to) =>
    `Hi Seren Lanka Travels, I would like a quote for a private transfer from ${from} to ${to}.`,
  builder:
    "Hi Seren Lanka Travels, I created a tailor-made Sri Lanka itinerary and would like a final quotation.",
};
