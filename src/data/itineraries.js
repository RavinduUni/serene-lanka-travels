/**
 * Sri Lanka Itineraries – landing page data.
 * Source of truth: Content Plan supplied by client (2026-09-20).
 *
 * NOT PUBLISHED: 21-Day Tour (not confirmed).
 * NOT PUBLISHED: Wellness & Ayurveda Tours, Photography Tours,
 *                Eco / Sustainable Tours (pending client approval).
 */

/** Duration filter chips */
export const durationFilters = [
  { id: "3d", label: "3 Days / 2 Nights", nights: 2 },
  { id: "5d", label: "5 Days / 4 Nights", nights: 4 },
  { id: "7d", label: "7 Days / 6 Nights", nights: 6 },
  { id: "10d", label: "10 Days / 9 Nights", nights: 9 },
  { id: "14d", label: "14 Days / 13 Nights", nights: 13 },
];

/** Confirmed itinerary categories */
export const itineraryCategories = [
  {
    label: "Popular Sri Lanka Tours",
    slug: "popular",
    href: "/sri-lanka-itineraries/popular",
    tag: "Most Booked",
    image:
      "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Luxury Tours",
    slug: "luxury-tours",
    href: "/sri-lanka-itineraries/luxury-tours",
    tag: "Premium Experience",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Honeymoon Tours",
    slug: "honeymoon-tours",
    href: "/sri-lanka-itineraries/honeymoon-tours",
    tag: "Romantic Escapes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Family Tours",
    slug: "family-tours",
    href: "/sri-lanka-itineraries/family-tours",
    tag: "All Ages Welcome",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Wildlife Tours",
    slug: "wildlife-safari-tours",
    href: "/sri-lanka-itineraries/wildlife-safari-tours",
    tag: "Safari & Nature",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Adventure Tours",
    slug: "adventure-tours",
    href: "/sri-lanka-itineraries/adventure-tours",
    tag: "Thrills & Trails",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Cultural & Heritage Tours",
    slug: "cultural-heritage-tours",
    href: "/sri-lanka-itineraries/cultural-heritage-tours",
    tag: "Ancient Wonders",
    image:
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Beach Holidays",
    slug: "beach-tours",
    href: "/sri-lanka-itineraries/beach-tours",
    tag: "Sun, Sand & Sea",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Nature Tours",
    slug: "nature-tours",
    href: "/sri-lanka-itineraries/nature-tours",
    tag: "Lush Landscapes",
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "North & East Sri Lanka Tours",
    slug: "north-east-tours",
    href: "/sri-lanka-itineraries/north-east-tours",
    tag: "Hidden Gems",
    image:
      "https://images.unsplash.com/photo-1588253921378-9c5dde739e88?auto=format&fit=crop&w=900&q=75",
  },
  {
    label: "Budget Tours",
    slug: "budget-tours",
    href: "/sri-lanka-itineraries/budget-tours",
    tag: "Great Value",
    image:
      "https://images.unsplash.com/photo-1576675784201-0e142b423952?auto=format&fit=crop&w=900&q=75",
  },
];

/** Featured tour shown in the intro hero card */
export const featuredItinerary = {
  badge: "Most Popular",
  heading: "Popular Sri Lanka Tours",
  copy:
    "Handcrafted private itineraries that take you through the Cultural Triangle, misty hill country and sun-drenched coastline – the iconic Sri Lanka journey, tailored just for you.",
  href: "/sri-lanka-itineraries/popular",
  image:
    "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Sigiriya Rock Fortress rising above the Sri Lanka jungle",
};

/** USP chips shown in the intro section */
export const itineraryUsps = [
  { icon: "🛡️", text: "100% Private – only your group" },
  { icon: "✏️", text: "Fully customisable itineraries" },
  { icon: "🗣️", text: "Expert English-speaking drivers" },
];
