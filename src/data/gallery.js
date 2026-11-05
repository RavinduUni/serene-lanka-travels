/**
 * Gallery data – grouped by category.
 * Images are sourced from the existing /public directory.
 */

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "destinations", label: "Destinations" },
  { id: "wildlife", label: "Wildlife & Nature" },
  { id: "culture", label: "Culture & Heritage" },
  { id: "beaches", label: "Beaches" },
  { id: "experiences", label: "Experiences" },
  { id: "tours", label: "Day Tours" },
];

/** @type {{ src: string; alt: string; category: string; location?: string }[]} */
export const galleryImages = [

  { src: '/reviews/review1.jpg', alt: "Travellers hiking in the hill country", caption: "Hiking in the hill country", isSample: true },
  { src: '/reviews/review2.png', alt: "Elephants seen on safari", caption: "Safari day", isSample: true },
  { src: '/reviews/review3.jpg', alt: "Couple watching the sunset on the beach", caption: "Sunset on the south coast", isSample: true },
  { src: '/reviews/review4.jpg', alt: "Train crossing the Nine Arches Bridge", caption: "Nine Arches Bridge, Ella", isSample: true },
  { src: '/reviews/review5.jpg', alt: "Surfer riding a wave", caption: "Surf lesson in Weligama", isSample: true },
  { src: '/reviews/review6.jpg', alt: "Tea plantation in the hills", caption: "Tea country, Nuwara Eliya", isSample: true },
  { src: '/reviews/review7.jpg', alt: "Galle Fort ramparts", caption: "Galle Fort walk", isSample: true },
  { src: '/reviews/review8.jpg', alt: "Sigiriya rock fortress", caption: "Sigiriya climb", isSample: true },
  { src: "/reviews/review9.jpg", alt: "Gangaramaya Temple in Colombo illuminated at dusk", category: "tours", location: "Colombo", },
  { src: "/reviews/review10.jpg", alt: "Gangaramaya Temple in Colombo illuminated at dusk", category: "tours", location: "Colombo", },
  { src: "/reviews/review11.jpg", alt: "Gangaramaya Temple in Colombo illuminated at dusk", category: "tours", location: "Colombo", },
  { src: "/reviews/review12.jpg", alt: "Gangaramaya Temple in Colombo illuminated at dusk", category: "tours", location: "Colombo", },
];

export const galleryHero = {
  image: "/gallery-hero.png",
  heading: ["A Visual Journey Through", "Beautiful Sri Lanka"],
  copy:
    "Every frame tells a story of a land shaped by ancient kingdoms, tropical wilderness, golden coastlines and warm-hearted people.",
};

