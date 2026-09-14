# Seren Lanka Travels – Website

Next.js (App Router) · React · Tailwind CSS v4 · Framer Motion · next/image  
**JavaScript only (.js / .jsx) – no TypeScript.**

## Run

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## What is implemented

- **Home page** – all 12 sections from Content Plan §9, plus the sitewide FAQ (§28) and final CTA.
- **Global layout** – sticky header with mobile drawer, footer (§29), floating WhatsApp button with
  page-specific prefilled messages (§27), skip link, JSON-LD (TravelAgency + FAQPage), sitemap & robots.
- Every other route exists as an **empty folder only** (`.gitkeep`). Add a `page.jsx` to make it live.

## Where things live

| Path | Purpose |
|---|---|
| `src/data/site.js` | Brand, nav, footer links, contact, WhatsApp templates |
| `src/data/home.js` | **All home-page copy** – edit text here, not in components |
| `src/data/images.js` | **All home-page image URLs** in one place |
| `src/lib/whatsapp.js` | `buildWhatsAppLink(message)` |
| `src/lib/seo.js` | `buildMetadata()` + schema.org builders |
| `src/components/ui` | Button, Container, SectionHeading, Accordion, SmartImage |
| `src/components/sections` | One component per home-page section |
| `src/components/layout` | Header, Footer, FloatingWhatsApp |
| `src/app/globals.css` | Design tokens (`@theme`) – colours come from the logo |

## Design tokens

| Token | Value | Use |
|---|---|---|
| `brand-blue` | `#1A8CFF` | Primary actions, accents (logo bright blue) |
| `brand-navy` | `#0B1F5C` | Headings, dark sections (logo navy) |
| `brand-navy-deep` | `#06133B` | Footer |
| `brand-sky` | `#EAF3FF` | Light-blue section band |
| `brand-mist` | `#F5F7FB` | Soft grey section band |

Section headings use the reference two-weight device: `<SectionHeading lines={["Light line", "Bold line"]} />`.

## Images

Home-page photos are Unsplash stock images referenced from `src/data/images.js`. If any URL stops
resolving, `SmartImage` shows a branded gradient instead of a broken image – but do replace these with
the client's own approved media before launch (Content Plan §24). Allowed remote hosts are configured in
`next.config.mjs` (`images.remotePatterns`): Unsplash, Pexels, Pixabay.

## Pending content (do not invent – see "Additional Requirements" doc)

- Official contact email / WhatsApp business number (`src/data/site.js`)
- Real guest reviews (`reviews` in `src/data/home.js` – currently clearly-marked samples)
- Social media URLs
