/**
 * Customize Your Sri Lanka Tour – options, labels and exact copy.
 * Source of truth: "Seren Lanka Tour Customize – Developer Specification" v1.0.
 * Option IDs are the canonical submission values; labels are display only.
 */

export const SECTIONS = [
  { id: "details", number: "01", title: "Your Details", subtitle: "How can we get in touch?", required: true },
  { id: "tour", number: "02", title: "Your Tour", subtitle: "Your group, duration and travel dates", required: true },
  { id: "travellers", number: "03", title: "Travellers", subtitle: "Adults, children and ages", required: false },
  { id: "destinations", number: "04", title: "Destinations", subtitle: "Places you would like to explore", required: false },
  { id: "experiences", number: "05", title: "Experiences", subtitle: "What you would love to experience", required: false },
  { id: "transport", number: "06", title: "Transport", subtitle: "Your transport and vehicle preferences", required: false },
  { id: "accommodation", number: "07", title: "Accommodation", subtitle: "Your preferred stay and room type", required: false },
  { id: "budget", number: "08", title: "Budget", subtitle: "Help us tailor the package to you", required: false },
  { id: "extra", number: "09", title: "Anything Else?", subtitle: "Special requests and extra details", required: false },
];

export const CONTACT_METHODS = [
  { id: "phone_call", label: "Phone call" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
  { id: "instagram", label: "Instagram" },
  { id: "telegram", label: "Telegram" },
  { id: "wechat", label: "WeChat" },
  { id: "other", label: "Other" },
];

export const FLIGHTS_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "not_yet", label: "Not yet" },
];

export const DESTINATION_OPTIONS = [
  { id: "colombo", label: "Colombo" },
  { id: "sigiriya", label: "Sigiriya" },
  { id: "kandy", label: "Kandy" },
  { id: "nuwara_eliya", label: "Nuwara Eliya" },
  { id: "ella", label: "Ella" },
  { id: "yala", label: "Yala" },
  { id: "galle", label: "Galle" },
  { id: "bentota", label: "Bentota" },
  { id: "mirissa", label: "Mirissa" },
  { id: "trincomalee", label: "Trincomalee" },
  { id: "arugam_bay", label: "Arugam Bay" },
  { id: "anuradhapura", label: "Anuradhapura" },
  { id: "polonnaruwa", label: "Polonnaruwa" },
];

/** `icon` = lucide-react component name (decorative only). */
export const EXPERIENCE_OPTIONS = [
  { id: "wildlife_safari", label: "Wildlife & Safari", icon: "PawPrint" },
  { id: "beaches", label: "Beaches", icon: "Waves" },
  { id: "culture_heritage", label: "Culture & Heritage", icon: "Landmark" },
  { id: "nature", label: "Nature", icon: "Leaf" },
  { id: "hiking_adventure", label: "Hiking & Adventure", icon: "Mountain" },
  { id: "scenic_trains", label: "Scenic Train Journeys", icon: "TrainFront" },
  { id: "local_food", label: "Sri Lankan Food", icon: "UtensilsCrossed" },
  { id: "wellness", label: "Wellness & Ayurveda", icon: "Flower2" },
  { id: "water_sports", label: "Surfing & Water Sports", icon: "Sailboat" },
  { id: "photography", label: "Photography", icon: "Camera" },
  { id: "romantic", label: "Romantic / Honeymoon", icon: "Heart" },
  { id: "family", label: "Family Activities", icon: "Users" },
  { id: "nightlife", label: "Nightlife", icon: "Music" },
  { id: "shopping", label: "Shopping", icon: "ShoppingBag" },
];

export const TRANSPORT_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "not_sure", label: "Not sure" },
];

export const VEHICLE_OPTIONS = [
  { id: "car", label: "Car" },
  { id: "suv", label: "SUV" },
  { id: "van", label: "Van" },
  { id: "luxury", label: "Luxury vehicle" },
  { id: "coach", label: "Mini bus or coach" },
  { id: "recommend", label: "Recommend one for my group" },
];

export const ACCOMMODATION_OPTIONS = [
  { id: "three_star", label: "3-Star" },
  { id: "four_star", label: "4-Star" },
  { id: "five_star", label: "5-Star" },
  { id: "luxury_boutique", label: "Luxury or boutique" },
  { id: "villa", label: "Villa" },
  { id: "mixed", label: "Mix of categories" },
  { id: "recommend", label: "Recommend for me" },
  { id: "own", label: "I will arrange my own" },
];

export const ROOM_OPTIONS = [
  { id: "single", label: "Single" },
  { id: "double", label: "Double" },
  { id: "twin", label: "Twin" },
  { id: "family", label: "Family" },
  { id: "not_sure", label: "Not sure" },
];

export const BUDGET_STYLES = [
  { id: "budget_friendly", label: "Budget-friendly" },
  { id: "comfort", label: "Comfort" },
  { id: "premium", label: "Premium" },
  { id: "luxury", label: "Luxury" },
];

export const CURRENCIES = [
  { id: "USD", label: "USD" },
  { id: "GBP", label: "GBP" },
  { id: "EUR", label: "EUR" },
  { id: "AUD", label: "AUD" },
  { id: "LKR", label: "LKR" },
  { id: "other", label: "Other" },
];

/** Exact visible copy from the specification. */
export const COPY = {
  h1: ["Customize Your", "Sri Lanka Tour"],
  intro:
    "Tell us the basics, or share as much detail as you like. Our travel team will create a personalized Sri Lanka itinerary based on your preferences.",
  requiredNotice: "Only Your Details and Your Tour are required. Everything else is optional.",
  statusInitial: "Start with your details and tour basics. Add extra preferences only if you want to.",
  statusReady: "Enough information to create your tour.",
  statusInvite: "Want a more accurate itinerary? Add optional preferences below.",
  cta: "Create My Sri Lanka Tour",
  belowCta:
    "No payment required. Our travel team will review your preferences and contact you with a personalized itinerary.",
  contactNotice: "By submitting, you ask Seren Lanka Travels to contact you about this tour enquiry.",
  submitting: "Sending your request...",
  successHeading: "Your Sri Lanka journey starts here!",
  successMessage:
    "Thank you for sharing your plans. Our team will review your request and contact you using your preferred contact method with a personalized itinerary.",
  failure: "We could not send your request. Your details are still here. Please try again.",
  rateLimited: "Too many attempts. Please wait a moment and try again.",
};

export const ERRORS = {
  name: "Enter your name.",
  nameTooLong: "Use 100 characters or fewer.",
  phone: "Enter a valid mobile number with country code.",
  email: "Enter a valid email address.",
  contactRoute: "Enter your contact details for this app.",
  contactMethod: "Choose how you would like us to contact you.",
  travellers: "Enter a traveller count or select Not decided yet.",
  travellersRange: "Enter a whole number of travellers from 1 to 100.",
  duration: "Enter the number of days or select Not decided yet.",
  durationRange: "Enter a whole number of days from 1 to 90.",
  arrival: "Choose an arrival date or select Not decided yet.",
  arrivalPast: "Choose today or a later date.",
  breakdownSum: "Adults and children must add up to your total traveller count.",
  breakdownBoth: "Enter both counts – use 0 if there are none.",
  breakdownRange: "Enter a whole number from 0 to 100.",
  breakdownTotal: "Adults and children together must be between 1 and 100.",
  childAge: "Enter an age from 0 to 17, or leave it blank.",
  exclusive: "Choose specific options or ask us to recommend – not both.",
  invalidOption: "Choose one of the listed options.",
  tooLong: (n) => `Use ${n} characters or fewer.`,
  amount: "Enter an amount greater than 0 with up to 2 decimal places.",
  currencyRequired: "Choose a currency for your budget.",
  amountRequired: "Add an amount or clear the currency.",
  currencyCode: "Enter a 3-letter currency code, for example NZD.",
};

/** Desktop side panel (spec p.8). */
export const SIDE_STEPS = [
  { title: "Tell us your plans", copy: "Share the basics now – you can add more detail whenever you like." },
  { title: "Get a tailored itinerary", copy: "Our travel team designs a private route around your answers." },
  { title: "Refine it with our team", copy: "Adjust destinations, stays and pace together until it feels right." },
];
