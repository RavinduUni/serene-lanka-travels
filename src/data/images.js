/**
 * Central image manifest for the home page.
 * All photos are free-to-use stock imagery (Unsplash). Swap any URL here and it updates everywhere.
 * Replace with Seren Lanka Travels' own approved original media before launch (Content Plan §24).
 */
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: u("photo-1506929562872-bb421503ef21", 2400), // tropical coastline, aerial
  introA: u("photo-1506905925346-21bda4d32df4", 1200), // misty mountains
  introB: u("photo-1507525428034-b723cf961d3e", 1200), // palm beach
  builderA: u("photo-1432405972618-c60b0225b8f9", 1200), // waterfall
  builderB: u("photo-1502680390469-be75c86b636f", 1200), // surfing
  featured: u("photo-1469474968028-56623f02e42e", 2000), // mountain sunrise
  transfers: u("photo-1449965408869-eaa3f722e40d", 1400), // open road
  faq: u("photo-1476673160081-cf065607f449", 1200), // couple on beach at sunset
  finalCta: "/mirissa.jpg", // local: Mirissa golden beach at dusk

  categories: {
    dayTours: u("photo-1528181304800-259b08848526", 900), // temple
    multiDay: u("photo-1506905925346-21bda4d32df4", 900),
    tailorMade: u("photo-1500530855697-b586d89ba3ee", 900),
    honeymoon: u("photo-1476673160081-cf065607f449", 900),
    wildlife: u("photo-1516426122078-c23e76319801", 900), // elephants
    cultural: u("photo-1528181304800-259b08848526", 900),
    luxury: u("photo-1520250497591-112f2f40a3f4", 900), // resort pool
    budget: u("photo-1551632811-561732d1e306", 900), // hikers
  },

  experiences: {
    wildlife: u("photo-1456926631375-92c8ce872def", 900), // leopard
    culture: u("photo-1528181304800-259b08848526", 900),
    beaches: u("photo-1507525428034-b723cf961d3e", 900),
    adventure: u("photo-1502680390469-be75c86b636f", 900),
    nature: u("photo-1441974231531-c6227db76b6e", 900), // forest
    food: u("photo-1504674900247-0877df9cc836", 900),
    luxury: u("photo-1520250497591-112f2f40a3f4", 900),
    wellness: u("photo-1544161515-4ab6ce6db874", 900), // spa
  },

  destinations: {
    kandy: u("photo-1528181304800-259b08848526", 900),
    sigiriya: u("photo-1469474968028-56623f02e42e", 900),
    nuwaraEliya: u("photo-1441974231531-c6227db76b6e", 900),
    ella: u("photo-1432405972618-c60b0225b8f9", 900),
    yala: u("photo-1516426122078-c23e76319801", 900),
    mirissa: u("photo-1568430328012-21ed450453ea", 900), // whale tail
    galle: u("photo-1500530855697-b586d89ba3ee", 900),
    bentota: u("photo-1506929562872-bb421503ef21", 900),
  },

  articles: {
    bestTime: u("photo-1506905925346-21bda4d32df4", 1200),
    firstTime: u("photo-1507525428034-b723cf961d3e", 800),
    howManyDays: u("photo-1469474968028-56623f02e42e", 800),
    beaches: u("photo-1506929562872-bb421503ef21", 800),
  },

  avatars: {
    a: u("photo-1494790108377-be9c29b29330", 200),
    b: u("photo-1507003211169-0a1dd7228f2d", 200),
    c: u("photo-1438761681033-6461ffad8d80", 200),
  },
};
