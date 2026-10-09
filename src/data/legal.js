/**
 * Legal documents – rendered by src/app/legal/[slug]/page.jsx.
 *
 * Source of truth: Content Plan §30 (confirmed legal principles) and §19
 * (driver-hours rule). Wording is ORIGINAL to Seren Lanka Travels – do not
 * paste other operators' terms here.
 *
 * ⚠️ The content plan states: "Final website legal wording should be reviewed
 * before publication." Set `reviewed: true` once a qualified Sri Lankan legal
 * adviser has approved a document. Unreviewed documents show a notice in
 * development only.
 *
 * Body blocks:
 *   { type: "p", text }        text = string, or array of strings,
 *                              { label, href } link objects and
 *                              { strong } bold-text objects
 *   { type: "ul", items: [] }  items follow the same text rules
 *   { type: "note", text }     highlighted callout
 */

import { site } from "./site";

const PRIVACY = { label: "Privacy Policy", href: "/legal/privacy-policy" };
const TERMS = { label: "Terms & Conditions", href: "/legal/terms-and-conditions" };
const EMAIL = { label: site.email, href: `mailto:${site.email}` };
const CONTACT = { label: "Contact Us", href: "/contact-us" };
const CANCELLATION = { label: "Cancellation & Refund Policy", href: "/legal/cancellation-refund-policy" };
const COOKIES = { label: "Cookie Policy", href: "/legal/cookie-policy" };
const GOOGLE_PRIVACY = { label: "Google’s Privacy Policy", href: "https://policies.google.com/privacy" };

export const legalDocuments = [
  {
    published: true,
    reviewed: false, // TODO: set true after legal review (Content Plan §30)
    slug: "terms-and-conditions",
    title: ["Terms &", "Conditions"],
    shortTitle: "Terms & Conditions",
    lastUpdated: "2026-10-05", // TODO: update to the publication date
    intro:
      "These terms explain how bookings with Seren Lanka Travels work – from your first enquiry to the end of your journey. Please read them before confirming a tour or transfer. If anything is unclear, ask us: we would much rather explain a term than have it surprise you.",
    keyPoints: [
      { icon: "CreditCard", title: "No payment on the website", text: "Enquiries and estimates are free. We never take payment through this site." },
      { icon: "BadgeCheck", title: "40% advance confirms", text: "Your booking is confirmed once the 40% advance is received." },
      { icon: "CalendarX", title: "Free cancellation", text: "Cancel at least 24 hours before the scheduled start at no charge." },
      { icon: "Clock", title: "11-hour driver day", text: "Driver service runs up to 11 hours a day; night driving is arranged separately." },
    ],
    sections: [
      {
        id: "about-these-terms",
        title: "About these terms",
        body: [
          {
            type: "p",
            text: "In these terms, “Seren Lanka Travels”, “we”, “us” and “our” mean Seren Lanka Travels, a tourism company operating in Sri Lanka. “You” and “the traveller” mean the person making a booking and every member of the group that person books for.",
          },
          {
            type: "p",
            text: "These terms apply to every tour and transfer booking we confirm, including day tours, multi-day itineraries, tailor-made tours, airport and hotel transfers and vehicle hire with a driver (together, our “services”). Any specific conditions in your booking confirmation – for example for a particular hotel or activity – also form part of your agreement with us.",
          },
          {
            type: "p",
            text: "The person making the booking confirms that they are at least 18 years old and are authorised to accept these terms on behalf of everyone in their group.",
          },
        ],
      },
      {
        id: "enquiries-and-quotations",
        title: "Enquiries, estimates and quotations",
        body: [
          {
            type: "p",
            text: "Sending an enquiry – through our website forms, WhatsApp, email or phone – does not create a booking or any obligation for you or for us. Our website does not take bookings or collect payments.",
          },
          {
            type: "p",
            text: "Any estimated price shown on our website or given during planning is a guide only. Prices can vary with the number of guests, travel dates, hotel category, vehicle type, selected activities and availability. Your final price is the one stated in the written quotation and booking confirmation we send you.",
          },
          {
            type: "p",
            text: "A quotation reflects the prices and availability known to us when it is issued. Hotels, activities and other services are only secured once your booking is confirmed and the relevant supplier has confirmed availability.",
          },
        ],
      },
      {
        id: "booking-and-payment",
        title: "Booking confirmation and payment",
        body: [
          {
            type: "p",
            text: "Your booking is confirmed when we receive an advance payment of 40% of the total tour or transfer price. The advance can be paid:",
          },
          {
            type: "ul",
            items: [
              "by online transaction (such as a bank transfer), using the payment details we send you directly; or",
              "directly to your driver or guide at the start of the tour, where we have agreed this with you in writing.",
            ],
          },
          {
            type: "p",
            text: "The balance is payable as set out in your booking confirmation. We will never ask you to pay through this website, and we only issue payment details through our official contact channels. If you receive payment instructions that look unusual, please contact us to verify them before paying.",
          },
          {
            type: "p",
            text: "Please check your booking confirmation carefully when you receive it – names, dates, pickup points and services – and tell us straight away about anything that needs correcting.",
          },
        ],
      },
      {
        id: "prices",
        title: "Prices",
        body: [
          {
            type: "p",
            text: "Prices are valid at the time your booking is confirmed. In limited circumstances a confirmed price may later change where applicable – for example if a hotel, park authority or other supplier increases its charges, or if government taxes, fees or fuel costs change after confirmation. If this happens we will tell you as soon as possible, explain the reason and the amount, and agree the change with you.",
          },
          {
            type: "p",
            text: "Unless your quotation says otherwise, prices do not include international flights, visas, travel insurance, personal expenses or gratuities.",
          },
          {
            type: "p",
            text: "Discounts and promotional offers apply only to the services, dates and conditions stated in the offer and in your booking confirmation, and cannot be combined unless we say so.",
          },
        ],
      },
      {
        id: "children",
        title: "Travelling with children",
        body: [
          {
            type: "p",
            text: "Prices for children depend on each child’s age and the package selected, and are normally confirmed at the time of booking. Hotels, transport and activity providers may apply their own child rates and age limits.",
          },
          {
            type: "p",
            text: "Please give us the age of every child when you book so that we can quote correctly and arrange suitable rooms, child seats and activities. If ages are not provided or are incorrect, the price may need to be adjusted.",
          },
        ],
      },
      {
        id: "changes-by-you",
        title: "Changes to your itinerary",
        body: [
          {
            type: "p",
            text: "Our tours are private and flexible. Once your booking is confirmed, changes to the itinerary can be made by mutual agreement between you and us. Please ask as early as possible; we will do our best to accommodate your request and will tell you about any change in price before it is made.",
          },
          {
            type: "p",
            text: "Changes may depend on availability and on the conditions of hotels and other suppliers. Where a supplier charges for an amendment, that charge will be passed on to you.",
          },
          {
            type: "p",
            text: "If you choose not to use part of a confirmed service – for example by skipping an activity or leaving a tour early – we cannot normally offer a refund for the unused part, particularly where we have already paid the supplier.",
          },
        ],
      },
      {
        id: "changes-by-us",
        title: "Changes by Seren Lanka Travels",
        body: [
          {
            type: "p",
            text: "To keep you safe and your journey running smoothly, we may need to make operational changes – for example to the vehicle, the driver, the route or the order of visits – because of weather, road or traffic conditions, safety concerns or supplier availability. We will always try to keep any change as close as possible to what you booked and will tell you about it as soon as we reasonably can.",
          },
          {
            type: "p",
            text: "If we need to make a significant change to a confirmed booking for reasons within our control, we will offer you a suitable alternative or, if you prefer, a refund of the amount you have paid for the affected services.",
          },
        ],
      },
      {
        id: "cancellations",
        title: "Cancellations and refunds",
        body: [
          {
            type: "p",
            text: "You may cancel a booking free of charge if you notify us at least 24 hours before the scheduled start time of your tour or transfer.",
          },
          {
            type: "p",
            text: "Cancellations made less than 24 hours before the scheduled start time are subject to the refund conditions stated in your booking confirmation.",
          },
          {
            type: "p",
            text: "In addition:",
          },
          {
            type: "ul",
            items: [
              "the cancellation policies of hotels, attraction tickets and other third-party providers also apply, and may be stricter than ours;",
              "bookings or services described as non-refundable may not qualify for any refund;",
              "approved refunds are returned using the original payment method where possible, and the time it takes to reach you depends on your bank or payment provider.",
            ],
          },
          {
            type: "p",
            text: [
              "To cancel, please contact us in writing – by WhatsApp or email – from the contact details used for your booking, so that we can confirm the cancellation and its time. See ",
              CONTACT,
              ".",
            ],
          },
          {
            type: "p",
            text: ["Full details are in our ", CANCELLATION, "."],
          },
        ],
      },
      {
        id: "transport-and-drivers",
        title: "Transport and drivers",
        body: [
          {
            type: "p",
            text: "Our tours and transfers use private vehicles with experienced drivers. The vehicle category is confirmed in your booking and is chosen to suit your group size and luggage – please tell us the correct number of passengers and bags.",
          },
          {
            type: "note",
            text: "Driver service is limited to 11 hours per day. Night-time driving requires a separate booking and arrangement.",
          },
          {
            type: "p",
            text: "For everyone’s safety, drivers follow Sri Lankan road law and may decline a request that they consider unsafe. Seat belts must be worn where fitted, and child seats are provided only where requested in advance.",
          },
        ],
      },
      {
        id: "your-responsibilities",
        title: "Your responsibilities",
        body: [
          {
            type: "ul",
            items: [
              "Holding a valid passport and any visa or Electronic Travel Authorisation required to enter Sri Lanka, and meeting any health entry requirements.",
              "Arranging travel insurance that suits your trip. We strongly recommend cover for medical expenses, emergency repatriation and cancellation.",
              "Telling us before you book about any medical condition, mobility needs or dietary requirements that may affect your tour, so that we can plan suitably.",
              "Being ready at the agreed pickup time and place. Late arrival may shorten your tour without a refund.",
              "Respecting local laws and customs, including dress codes at temples and religious sites.",
              "Paying for any damage you cause to vehicles or property through careless or deliberate behaviour.",
            ],
          },
        ],
      },
      {
        id: "third-party-services",
        title: "Hotels, activities and other suppliers",
        body: [
          {
            type: "p",
            text: "Many parts of your journey – such as hotels, national park entry, safari jeeps, boat trips, train tickets and activities – are provided by independent suppliers. We choose suppliers carefully and arrange these services on your behalf, but the suppliers operate under their own terms and conditions, which also apply to you.",
          },
          {
            type: "p",
            text: "Wildlife sightings, weather and natural conditions cannot be guaranteed.",
          },
        ],
      },
      {
        id: "liability",
        title: "Our responsibility to you",
        body: [
          {
            type: "p",
            text: "Seren Lanka Travels will make reasonable efforts to provide a safe and reliable service. We cannot, however, accept full responsibility for delays, losses or itinerary changes caused by circumstances beyond our control, including:",
          },
          {
            type: "ul",
            items: [
              "weather and natural disasters;",
              "road closures, traffic and accidents involving other road users;",
              "government restrictions, strikes or civil unrest;",
              "changes, failures or cancellations by third-party providers;",
              "any other event we could not reasonably foresee or avoid.",
            ],
          },
          {
            type: "p",
            text: "Nothing in these terms limits any liability that cannot be limited under the law of Sri Lanka, including liability for death or personal injury caused by our own negligence.",
          },
        ],
      },
      {
        id: "concerns-and-complaints",
        title: "Concerns and complaints",
        body: [
          {
            type: "p",
            text: "If something is not right during your journey, please tell your driver or contact us on WhatsApp straight away. Most problems can be solved on the spot, but only if we know about them while you are still travelling.",
          },
          {
            type: "p",
            text: "If an issue cannot be resolved during your trip, please write to us as soon as possible afterwards with your booking details, and we will respond and work with you to put things right.",
          },
        ],
      },
      {
        id: "privacy",
        title: "Your personal information",
        body: [
          {
            type: "p",
            text: "We use your personal information to handle your enquiry and booking and to provide customer service. We do not sell your personal information or share it with unauthorised third parties. We share relevant details with hotels, drivers and other providers only where needed to deliver your booking, or where the law requires us to.",
          },
          {
            type: "p",
            text: ["Full details are in our ", PRIVACY, "."],
          },
        ],
      },
      {
        id: "website-use",
        title: "Using our website",
        body: [
          {
            type: "p",
            text: "We work to keep the information on this website accurate and up to date, but descriptions, photographs, prices and availability are for general guidance and may change. Your booking confirmation is the definitive record of what you have booked.",
          },
          {
            type: "p",
            text: "The text, photographs, logos and design of this website belong to Seren Lanka Travels or are used with permission. You may view and print pages for your own personal, non-commercial use, but you may not copy, republish or reuse them without our written permission.",
          },
          {
            type: "p",
            text: "Links to other websites are provided for convenience only. We do not control those websites and are not responsible for their content.",
          },
        ],
      },
      {
        id: "law-and-changes",
        title: "Governing law and changes to these terms",
        body: [
          {
            type: "p",
            text: "These terms are governed by the law of Sri Lanka. If any part of them is found to be invalid, the remaining parts continue to apply.",
          },
          {
            type: "p",
            text: "We may update these terms from time to time. The version that applies to your booking is the one published on the date your booking was confirmed. The date of the latest update is shown at the top of this page.",
          },
        ],
      },
    ],
  },

  {
    published: true,
    reviewed: false, // TODO: set true after legal review (Content Plan §30)
    slug: "privacy-policy",
    title: ["Privacy", "Policy"],
    shortTitle: "Privacy Policy",
    lastUpdated: "2026-10-09", // TODO: update to the publication date
    contactHeading: "Questions about your privacy?",
    contactCopy: "Contact us about your information or to exercise any of your rights.",
    keyPointsNote: "This summary is for convenience only – the full policy below applies.",
    intro:
      "When you plan a journey with us, you trust us with information about yourself and the people you travel with. This policy explains, in plain language, what we collect, why we need it, who we share it with and the choices you have.",
    keyPoints: [
      { icon: "ShieldCheck", title: "We never sell your data", text: "Your details are used to plan and run your trip – never sold or rented." },
      { icon: "ClipboardList", title: "Only what your trip needs", text: "We ask for what we need to plan and deliver your journey, and nothing more." },
      { icon: "CreditCard", title: "No payments on this site", text: "Our website never asks for card or bank details." },
      { icon: "UserCheck", title: "You stay in control", text: "Ask to see, correct or delete your information at any time." },
    ],
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: [
          {
            type: "p",
            text: "Seren Lanka Travels (“we”, “us”, “our”) is a tourism company operating in Sri Lanka that arranges private tours, tailor-made itineraries, transfers and vehicle hire with a driver.",
          },
          {
            type: "p",
            text: "We are responsible for deciding how and why the personal information described in this policy is used. You can contact us about anything in this policy using the details in the final section.",
          },
        ],
      },
      {
        id: "scope",
        title: "What this policy covers",
        body: [
          {
            type: "p",
            text: "This policy applies to personal information we collect when you visit our website, send us an enquiry through a website form, contact us by WhatsApp, other messaging apps, email or phone, and when you book and travel with us.",
          },
          {
            type: "p",
            text: [
              "It should be read together with our ",
              TERMS,
              ". It does not cover other websites that we link to – those websites have their own privacy policies.",
            ],
          },
        ],
      },
      {
        id: "information-we-collect",
        title: "Information we collect",
        body: [
          {
            type: "ul",
            items: [
              [{ strong: "Contact details" }, " – your name, mobile number, email address, preferred contact method and, if you choose to give them, a messaging-app username or profile link."],
              [{ strong: "Trip details" }, " – travel dates, length of stay, number of travellers, the number and ages of any children, destinations, experiences, accommodation and transport preferences, budget, and anything you add as a special request."],
              [{ strong: "Transfer details" }, " – pickup and drop-off locations, dates and times, flight numbers, passenger and luggage numbers and child-seat requests."],
              [{ strong: "Booking details" }, " – the names of the travellers in your booking, records of the payments you make to us, and any information a hotel or other provider requires to complete your booking, which we will ask for at the time."],
              [{ strong: "Information you choose to share" }, " – for example dietary needs, mobility needs or a medical condition that may affect your trip. Please only share this if you want us to take it into account; we use it solely to plan a suitable journey."],
              [{ strong: "Technical information" }, " – when you use our website, our servers automatically record technical details such as your IP address, browser type and the pages requested."],
            ],
          },
          {
            type: "note",
            text: "Our website forms never ask for passport scans, card or bank details, or medical documents.",
          },
        ],
      },
      {
        id: "how-we-collect",
        title: "How we collect it",
        body: [
          {
            type: "ul",
            items: [
              [{ strong: "From you" }, " – when you complete a form on our website, message us, email or call us, or speak with our team or your driver."],
              [{ strong: "From the person who books for you" }, " – if a family member, friend or group leader makes a booking that includes you."],
              [{ strong: "Automatically" }, " – through server logs and similar technologies when you use our website (see “Cookies and third-party content”)."],
              [{ strong: "From our providers" }, " – for example when a hotel or activity operator tells us about a change that affects your booking."],
            ],
          },
        ],
      },
      {
        id: "how-we-use-it",
        title: "How we use your information",
        body: [
          {
            type: "ul",
            items: [
              "To respond to your enquiry and prepare a personalized itinerary and quotation.",
              "To arrange and deliver your booking – including passing the necessary details to your driver, hotels and activity providers.",
              "To communicate with you before, during and after your trip, using your preferred contact method where possible.",
              "To manage payments, keep records and meet our accounting, tax and other legal obligations.",
              "To look after your safety and support you if something goes wrong during your journey.",
              "To protect our website and forms from spam, fraud and misuse – for example by limiting repeated form submissions from the same connection.",
              "To understand how our website is used, so that we can improve it and our services.",
            ],
          },
          {
            type: "p",
            text: "We only send you marketing messages if you have asked to receive them, and you can stop them at any time. Sending us an enquiry does not sign you up for marketing.",
          },
        ],
      },
      {
        id: "legal-grounds",
        title: "Our reasons for using your information",
        body: [
          {
            type: "p",
            text: "We only use your personal information where we have a lawful reason to do so. Depending on the situation, this will be because:",
          },
          {
            type: "ul",
            items: [
              "it is needed to take the steps you ask us to take before a booking – such as preparing a quotation – or to carry out your booking;",
              "it is in our legitimate interests to run, protect and improve our business, and those interests are not outweighed by your rights;",
              "we have a legal obligation to keep or share the information; or",
              "you have given your consent – for example to receive marketing, or to our use of optional information you choose to share. You can withdraw consent at any time.",
            ],
          },
        ],
      },
      {
        id: "sharing",
        title: "Who we share your information with",
        body: [
          {
            type: "p",
            text: "We share only the details each party needs, and only for the purposes described in this policy:",
          },
          {
            type: "ul",
            items: [
              [{ strong: "Drivers and guides" }, " who look after you on your tour or transfer."],
              [{ strong: "Hotels and travel providers" }, " – such as safari and activity operators, park authorities, boat operators and railway or transport providers – needed to deliver what you have booked."],
              [{ strong: "Technology providers" }, " who host our website and run our email and messaging services. They process information on our behalf and may not use it for their own purposes."],
              [{ strong: "Professional advisers" }, " such as accountants and lawyers, where needed to run our business."],
              [{ strong: "Authorities" }, " – such as the police, courts or government bodies – where the law requires us to share information."],
            ],
          },
          {
            type: "note",
            text: "We do not sell or rent your personal information, and we do not share it with third parties for their own marketing.",
          },
        ],
      },
      {
        id: "messaging-apps",
        title: "WhatsApp and other messaging apps",
        body: [
          {
            type: "p",
            text: "Many of our guests prefer to talk to us on WhatsApp. The WhatsApp buttons on our website open WhatsApp with a suggested message – nothing is sent to us until you choose to send it.",
          },
          {
            type: "p",
            text: "When you contact us through WhatsApp, Instagram, Telegram, WeChat or another app, your messages are also handled by that app’s provider under its own privacy policy and terms. We use the information you send us in line with this policy.",
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies and third-party content",
        body: [
          {
            type: "p",
            text: "Our website uses technologies that are necessary for it to work securely and reliably. We may also use analytics tools to understand, in aggregate, how visitors use our website so that we can improve it. Where the law requires your consent for any non-essential cookies, we will ask for it first.",
          },
          {
            type: "p",
            text: "Some pages show embedded content from other companies – for example maps provided by Google Maps. When you view these pages, the provider may collect information about your visit under its own privacy policy.",
          },
          {
            type: "p",
            text: "You can block or delete cookies in your browser settings. Some parts of the website may not work as intended if you do.",
          },
          {
            type: "p",
            text: ["Full details are in our ", COOKIES, "."],
          },
        ],
      },
      {
        id: "international-transfers",
        title: "International transfers",
        body: [
          {
            type: "p",
            text: "Most of our guests travel to Sri Lanka from abroad, and some of the technology providers we use – for example for website hosting and email – may store or process information outside Sri Lanka. Where this happens, we take reasonable steps to make sure your information remains protected.",
          },
        ],
      },
      {
        id: "retention",
        title: "How long we keep your information",
        body: [
          {
            type: "p",
            text: "We keep personal information only for as long as we need it for the purposes described in this policy:",
          },
          {
            type: "ul",
            items: [
              "Enquiries that do not lead to a booking are kept only for as long as needed to respond and follow up, and are then deleted.",
              "Booking and payment records are kept for as long as needed to deliver your trip, handle any questions or claims, and meet our accounting, tax and legal obligations.",
            ],
          },
          {
            type: "p",
            text: "When information is no longer needed, we delete it or anonymize it so that it can no longer identify you.",
          },
        ],
      },
      {
        id: "security",
        title: "How we protect your information",
        body: [
          {
            type: "p",
            text: "We use reasonable technical and organisational measures to protect your information. Our website is served over an encrypted (HTTPS) connection, access to enquiries and bookings is limited to the people who need it, and our providers are required to keep your information confidential.",
          },
          {
            type: "p",
            text: "No method of sending information over the internet is completely secure, so please avoid sending highly sensitive information unless it is needed. If a data breach affects your information, we will inform you and the relevant authorities where the law requires us to.",
          },
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: [
          {
            type: "p",
            text: "Depending on the law that applies to you – including Sri Lanka’s Personal Data Protection Act, No. 9 of 2022, and the data protection laws of your home country – you may have the right to:",
          },
          {
            type: "ul",
            items: [
              "ask for a copy of the personal information we hold about you;",
              "ask us to correct information that is inaccurate or incomplete;",
              "ask us to delete your information where we no longer need it;",
              "object to or ask us to restrict certain uses of your information;",
              "withdraw your consent where we rely on it; and",
              "complain to a data protection authority if you are unhappy with how we have handled your information.",
            ],
          },
          {
            type: "p",
            text: [
              "To make a request, contact us at ",
              EMAIL,
              ". We may need to confirm your identity before acting on a request. We will respond as soon as we reasonably can and within any time limit the law sets, and we will not normally charge a fee.",
            ],
          },
        ],
      },
      {
        id: "children",
        title: "Children’s information",
        body: [
          {
            type: "p",
            text: "Our website is intended for adults planning travel. We collect information about children – such as their ages, and names where a booking requires them – only from their parents, guardians or the adult making the booking, and only to plan and deliver a suitable journey.",
          },
        ],
      },
      {
        id: "other-travellers",
        title: "Information about other travellers",
        body: [
          {
            type: "p",
            text: "If you give us information about other people – for example the members of your group – please make sure they are happy for you to share it and that they know where to find this policy.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          {
            type: "p",
            text: "We may update this policy from time to time, for example when our services or the law change. The latest version is always published on this page, with its date shown at the top. If we make a significant change, we will make it clear on our website.",
          },
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [
          {
            type: "p",
            text: [
              "If you have a question about this policy or how we use your information, or you would like to exercise any of your rights, please email ",
              EMAIL,
              " or use the WhatsApp and phone options below.",
            ],
          },
        ],
      },
    ],
  },

  {
    published: true,
    reviewed: false, // TODO: set true after legal review (Content Plan §30)
    slug: "cancellation-refund-policy",
    title: ["Cancellation &", "Refund Policy"],
    shortTitle: "Cancellation & Refund Policy",
    lastUpdated: "2026-10-09", // TODO: update to the publication date
    contactHeading: "Need to cancel or change a booking?",
    contactCopy: "Message or email us from the contact details used for your booking and we will confirm straight away.",
    keyPointsNote: "This summary is for convenience only – the full policy below applies.",
    intro:
      "Plans change – we understand. This policy explains how to cancel or reschedule a tour or transfer with Seren Lanka Travels, when you can cancel free of charge, and how refunds work.",
    keyPoints: [
      { icon: "CalendarX", title: "Free cancellation", text: "Cancel at least 24 hours before the scheduled start at no charge." },
      { icon: "CalendarClock", title: "Rescheduling by agreement", text: "Ask us to change dates or plans – we will always try to help." },
      { icon: "Hotel", title: "Supplier policies apply", text: "Hotels, tickets and activities may have their own cancellation rules." },
      { icon: "Undo2", title: "Refunds the way you paid", text: "Approved refunds go back by your original payment method where possible." },
    ],
    sections: [
      {
        id: "scope",
        title: "What this policy covers",
        body: [
          {
            type: "p",
            text: "This policy applies to every tour and transfer booking confirmed by Seren Lanka Travels, including day tours, multi-day and tailor-made tours, airport and hotel transfers, and vehicle hire with a driver.",
          },
          {
            type: "p",
            text: [
              "It forms part of our ",
              TERMS,
              ". Where your booking confirmation contains specific cancellation conditions – for example for a particular hotel or activity – those conditions also apply.",
            ],
          },
        ],
      },
      {
        id: "how-to-cancel",
        title: "How to cancel or change a booking",
        body: [
          {
            type: "p",
            text: "Please contact us in writing – by WhatsApp or email – using the contact details used for your booking, and include your name and travel date. A message in writing lets us confirm the exact time we received your request, which decides whether the cancellation is free.",
          },
          {
            type: "p",
            text: "We will reply to confirm that your cancellation or change has been received and tell you about any refund or charge that applies. If you do not receive a confirmation from us, please contact us again by phone.",
          },
        ],
      },
      {
        id: "free-cancellation",
        title: "Free cancellation",
        body: [
          {
            type: "note",
            text: "You can cancel free of charge if you notify us at least 24 hours before the scheduled start time of your tour or transfer.",
          },
          {
            type: "p",
            text: "The start time is the pickup time stated in your booking confirmation. For multi-day tours, it is the pickup time on the first day of the tour.",
          },
          {
            type: "p",
            text: "Free cancellation applies to our own services – the vehicle, driver and tour arrangements. Charges made by hotels and other providers are covered in “Hotels, tickets and other providers” below.",
          },
        ],
      },
      {
        id: "late-cancellation",
        title: "Cancellations within 24 hours",
        body: [
          {
            type: "p",
            text: "Cancellations made less than 24 hours before the scheduled start time are subject to the refund conditions stated in your booking confirmation.",
          },
          {
            type: "p",
            text: "If you are not at the agreed pickup point at the scheduled time and have not contacted us, the booking is treated as a cancellation made less than 24 hours before the start time. If you are running late, please message your driver or contact us as soon as possible – we will always do our best to adjust.",
          },
        ],
      },
      {
        id: "third-party-providers",
        title: "Hotels, tickets and other providers",
        body: [
          {
            type: "p",
            text: "Many parts of a journey – such as hotels, national park entry, safari jeeps, train tickets and activities – are booked with independent providers on your behalf. Their own cancellation policies also apply, and they may be stricter than ours.",
          },
          {
            type: "ul",
            items: [
              "Where a provider charges for a cancellation or change, that charge is passed on to you.",
              "Bookings or services described as non-refundable in your quotation or confirmation may not qualify for any refund.",
              "We will tell you about any provider conditions that affect your booking when we send your quotation and confirmation.",
            ],
          },
        ],
      },
      {
        id: "rescheduling",
        title: "Rescheduling and changes to your itinerary",
        body: [
          {
            type: "p",
            text: "Our tours are private and flexible. After your booking is confirmed, dates, routes and services can be changed by mutual agreement. Please ask as early as possible – changes depend on availability and on the conditions of hotels and other providers.",
          },
          {
            type: "p",
            text: "If a change affects the price, we will tell you the new price before making the change. Any charge a provider makes for an amendment is passed on to you.",
          },
          {
            type: "p",
            text: "If you choose not to use part of a confirmed service – for example by skipping an activity or ending a tour early – we cannot normally refund the unused part, particularly where we have already paid the provider.",
          },
        ],
      },
      {
        id: "cancellation-by-us",
        title: "Cancellations and changes by Seren Lanka Travels",
        body: [
          {
            type: "p",
            text: "If we have to cancel or make a significant change to a confirmed booking for reasons within our control, we will offer you a suitable alternative or, if you prefer, a full refund of the amount you have paid for the affected services.",
          },
          {
            type: "p",
            text: "Sometimes plans have to change for reasons outside anyone’s control – such as severe weather, natural disasters, road closures or government restrictions. Your safety comes first: we will work with you to reschedule or find a suitable alternative wherever possible. Any refund for services already arranged with providers will depend on those providers’ own policies, and we will do our best to recover what we can for you.",
          },
        ],
      },
      {
        id: "refunds",
        title: "How refunds are paid",
        body: [
          {
            type: "ul",
            items: [
              "Approved refunds are paid back using your original payment method where possible – for example to the bank account a transfer came from. If that is not possible, we will agree another method with you.",
              "We aim to process approved refunds promptly. The time it takes for the money to reach you depends on your bank or payment provider.",
              "Any fees charged by banks or payment providers for sending money internationally may be deducted from a refund. We will tell you about these before the refund is sent.",
            ],
          },
          {
            type: "p",
            text: "We never ask you to pay or provide card details through our website, and we only send payment or refund details through our official contact channels. If you receive a message about a refund that looks unusual, please contact us to check it before acting on it.",
          },
        ],
      },
      {
        id: "insurance",
        title: "Travel insurance",
        body: [
          {
            type: "p",
            text: "We strongly recommend travel insurance that includes cancellation cover. It can protect you against costs that are not refundable under this policy – for example if you need to cancel at short notice because of illness or a flight problem.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          {
            type: "p",
            text: "We may update this policy from time to time. The version that applies to your booking is the one published on the date your booking was confirmed. The date of the latest update is shown at the top of this page.",
          },
        ],
      },
    ],
  },
  {
    published: true,
    reviewed: false, // TODO: set true after legal review (Content Plan §30)
    // ⚠️ Keep this document TRUE to what the live site does. If you add Google
    // Analytics, Meta Pixel, a chatbot, YouTube/Instagram embeds or any other
    // tracking, update "Cookies we use" (and add a consent banner) BEFORE launch.
    slug: "cookie-policy",
    title: ["Cookie", "Policy"],
    shortTitle: "Cookie Policy",
    lastUpdated: "2026-10-09", // TODO: update to the publication date
    contactHeading: "Questions about cookies?",
    contactCopy: "Get in touch and we will explain how our website handles your information.",
    keyPointsNote: "This summary is for convenience only – the full policy below applies.",
    intro:
      "This policy explains what cookies are, how our website uses them, which third-party content may set its own cookies, and how you can control them.",
    keyPoints: [
      { icon: "ShieldCheck", title: "No advertising cookies", text: "We do not use cookies to track you or show you adverts." },
      { icon: "Map", title: "Embedded maps", text: "Pages with Google Maps may let Google set its own cookies." },
      { icon: "ToggleRight", title: "Consent first", text: "We will ask before using any non-essential cookies in future." },
      { icon: "Cookie", title: "You stay in control", text: "Block or delete cookies at any time in your browser." },
    ],
    sections: [
      {
        id: "what-are-cookies",
        title: "What cookies are",
        body: [
          {
            type: "p",
            text: "Cookies are small text files that a website saves on your computer, phone or tablet when you visit. They let the website – or another service whose content appears on it – recognise your device on later visits.",
          },
          {
            type: "p",
            text: "Some cookies are essential for a website to work. Others are used to remember preferences, measure how a website is used, or track browsing for advertising. Cookies set by the website you are visiting are called first-party cookies; cookies set by other companies whose content appears on the page are called third-party cookies.",
          },
          {
            type: "p",
            text: "Similar technologies, such as browser storage, work in a comparable way. In this policy, “cookies” includes them.",
          },
        ],
      },
      {
        id: "cookies-we-use",
        title: "Cookies we use",
        body: [
          {
            type: "p",
            text: "Our website is designed so that its core features – browsing tours, reading guides and sending enquiries – work without first-party tracking cookies.",
          },
          {
            type: "ul",
            items: [
              [{ strong: "Essential" }, " – we may use cookies or similar technologies where they are strictly necessary for the website to work securely and reliably. These cannot be switched off through our website, but you can block them in your browser."],
              [{ strong: "Analytics" }, " – we do not currently use analytics cookies. If we introduce analytics tools in future, we will update this policy first and ask for your consent where the law requires it."],
              [{ strong: "Advertising" }, " – we do not use cookies to track you across other websites or to show you advertising."],
            ],
          },
          {
            type: "p",
            text: [
              "Our servers also record basic technical information, such as your IP address, when you use the website – for example to protect our forms from spam. This is not done with cookies; it is explained in our ",
              PRIVACY,
              ".",
            ],
          },
        ],
      },
      {
        id: "third-party-content",
        title: "Third-party content",
        body: [
          {
            type: "p",
            text: "Some pages include content provided by other companies, which may set their own cookies when you view that content. We do not control these cookies.",
          },
          {
            type: "ul",
            items: [
              [
                { strong: "Google Maps" },
                " – our itinerary and destination pages show embedded Google Maps. When you view one of these pages, Google may set cookies and collect information about your visit. See ",
                GOOGLE_PRIVACY,
                ".",
              ],
              [
                { strong: "WhatsApp and social media" },
                " – our WhatsApp and social media buttons are simple links. They do not set cookies on our website, but once you follow a link you are on that company’s service and its own cookie and privacy policies apply.",
              ],
            ],
          },
        ],
      },
      {
        id: "managing-cookies",
        title: "How to control cookies",
        body: [
          {
            type: "p",
            text: "You can choose to block or delete cookies, including third-party cookies, using your browser settings. Most browsers let you:",
          },
          {
            type: "ul",
            items: [
              "see which cookies are stored and delete them individually or all at once;",
              "block third-party cookies;",
              "block all cookies, or only allow cookies from websites you trust;",
              "clear cookies automatically when you close the browser.",
            ],
          },
          {
            type: "p",
            text: "The “Help” section of your browser explains how. Please note that blocking all cookies may stop some websites, including parts of embedded maps, from working as intended.",
          },
        ],
      },
      {
        id: "consent",
        title: "Your consent",
        body: [
          {
            type: "p",
            text: "Where the law requires your consent before a cookie is used, we will ask for it clearly before setting that cookie, and you will be able to change your choice at any time. Simply continuing to browse our website is never treated as consent.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          {
            type: "p",
            text: "We will update this policy whenever we change the cookies or similar technologies our website uses. The date of the latest update is shown at the top of this page.",
          },
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        body: [
          {
            type: "p",
            text: ["If you have any questions about this policy, please email ", EMAIL, " or use the WhatsApp and phone options below."],
          },
        ],
      },
    ],
  },
];
