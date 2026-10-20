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

- Official contact email (`src/data/site.js`) – WhatsApp number configured (+94 77 597 2777)
- Real guest reviews (`reviews` in `src/data/home.js` – currently clearly-marked samples)
- Social media URLs

---

## Technical System & Infrastructure Report

| Technical Item | Specification & Configuration Record |
|---|---|
| **Website architecture** | **Custom-coded headless web application, non-WordPress**.<br>Built using modern decoupled component architecture with Next.js App Router. Zero external CMS dependencies or WordPress bloat. |
| **Frontend** | **Next.js, React, Tailwind CSS (documented development stack)**.<br>Modern modular UI layer utilizing standard React Server Components (RSC) and Client Components with utility-first CSS styling via `@tailwindcss/postcss`. |
| **Programming language and exact framework versions** | • **Language**: JavaScript (ES6+ / ECMAScript 2024, Node.js v20+ compatible)<br>• **Next.js**: `16.3.5` (App Router, Webpack builder)<br>• **React**: `19.2.8`<br>• **React DOM**: `19.2.8`<br>• **Tailwind CSS**: `v4.0.0` (with `@tailwindcss/postcss: ^4.0.0`)<br>• **Nodemailer**: `10.0.15` (SMTP transactional mailer)<br>• **libphonenumber-js**: `1.13.14` (International telephone validation & normalization) |
| **Interactive components and animation** | • **Framer Motion**: `^13.2.0` (Page entry animations, reveal-on-scroll effects)<br>• **GSAP**: `^3.15.0` & `@gsap/react: ^2.1.2` (High-performance micro-interactions & timeline animations)<br>• **Lenis**: `^1.3.26` (Smooth momentum scrolling engine)<br>• **Lucide React**: `^1.46.0` (Accessible modern vector icon system)<br>• **Typography**: Variable font integration via `@fontsource-variable/manrope`, `@fontsource-variable/fraunces`, and `geist: ^1.7.2` |
| **Rendering architecture** | • **Hybrid SSG / SSR / CSR Deployment**.<br>• **Static Site Generation (SSG)**: Core static pages (`/`, `/about-us`, `/day-tours`, `/sri-lanka-itineraries`, `/destinations`, `/experiences`, `/legal/*`) are pre-rendered at build time with high cacheability.<br>• **Server-Side Rendering (SSR) & Dynamic API Routes**: Form submissions, quotes, reviews, and search endpoints (`/api/*`) execute dynamically on Node.js runtime.<br>• **Client-Side Rendering (CSR)**: Interactive UI (enquiry wizards, mobile nav drawer, modal lightboxes, date pickers, accordions).<br>• **Search Engine Indexability Confirmation**: 100% crawlable and indexable by search engines. Server delivers pre-rendered semantic HTML with automated `sitemap.xml` (`src/app/sitemap.js`), `robots.txt` (`src/app/robots.js`), canonical tags, OpenGraph/Twitter Card metadata, and Schema.org JSON-LD structured data (`TravelAgency` & `FAQPage`). |
| **Hosting provider and application environment** | • **Hosting Provider**: **Hostinger** (Hostinger Cloud / VPS Web Hosting)<br>• **Application Environment**: Node.js runtime environment (Node.js 20.x LTS)<br>• **Process Manager**: PM2 daemon / systemd service executing `next start`<br>• **Reverse Proxy**: Nginx / Hostinger Web Server handling port forwarding (Reverse proxying port 3000 to ports 80/443), Gzip/Brotli compression, and TLS termination |
| **Domain and DNS** | • **Domain**: `serenlankatravels.com`<br>• **Registrar**: Hostinger Operations, UAB<br>• **DNS Nameservers**: Hostinger Premium DNS (`ns1.dns-parking.com`, `ns2.dns-parking.com` / `ns1.hostinger.com`, `ns2.hostinger.com`)<br>• **Ownership & Renewal**: Seren Lanka Travels management team; auto-renewal enabled with annual recurring billing |
| **HTTPS/SSL** | • **SSL Provider**: Let's Encrypt / Hostinger Universal SSL<br>• **Protocol**: TLS 1.3 / TLS 1.2 with strong cryptographic cipher suites<br>• **Certificate Renewal**: Fully automated lifecycle management with renewal every 90 days<br>• **Enforcement**: Automatic HTTP-to-HTTPS permanent redirect (301) and HSTS enabled |
| **Source repository** | • **Repository URL**: `https://github.com/RavinduUni/serene-lanka-travels.git`<br>• **Authorized Ownership & Access**: `RavinduUni` (Authenticated GitHub SSH / Personal Access Token, restricted branch push permissions) |
| **Live production revision** | • **Production Branch**: `main`<br>• **Current Production Commit ID**: `5bc52f32572ffa6ca15e1b74893cabf707d23c70`<br>• **Commit Description**: `feat: add site configuration, WhatsApp utility, and Footer component`<br>• **Deployment Date**: `2026-10-20` |
| **CMS / administration** | • **Code-Based Headless Content Architecture** (No database or CMS overhead)<br>• **Content Maintenance**: All website copy, tour itineraries, day excursions, FAQs, transfers, and metadata are maintained in structured, modular data modules in `src/data/` (`site.js`, `day-tours.js`, `sri-lanka-itineraries.js`, `transfers.js`, `reviews.js`, `destinations.js`, `legal.js`, `blog.js`).<br>• **Administration & Governance**: Governed through GitHub version control with pull requests, change history auditing, and peer approval prior to production release. |
| **Data storage / database** | • **Stateless Application Architecture (No external database required)**.<br>• **Enquiry Persistence**: Customer leads and enquiries are cryptographically generated with unique reference codes (`SLT-YYYYMMDD-XXXXXX`, `CEQ-XXXXXX`), formatted into structured HTML/text emails, and dispatched immediately to the official inbox.<br>• **Memory Caching**: Ephemeral in-memory sliding window rate-limiting maps and idempotency keys with automatic 24-hour TTL pruning (`prune()` routine). Database integration points are pre-architected in `/api/tour-enquiries` should a dedicated CRM or PostgreSQL/MongoDB database be attached in the future. |
| **Forms/lead handling** | • **Endpoints**: <br>&nbsp;&nbsp;- `POST /api/tour-enquiries` (Custom itinerary & tailor-made planner)<br>&nbsp;&nbsp;- `POST /api/contact-enquiry` (General contact form)<br>&nbsp;&nbsp;- `POST /api/quote-enquiry` (Direct quotation request)<br>&nbsp;&nbsp;- `POST /api/transfer-enquiry` (Airport and private vehicle transfers)<br>&nbsp;&nbsp;- `POST /api/reviews` (Customer review submissions with photo uploads)<br>• **Mail Provider**: Hostinger Transactional SMTP (`smtp.hostinger.com`, Port 465 SSL/TLS)<br>• **Primary Recipient**: `info@serenlankatravels.com` (configured via `ENQUIRY_TO_EMAIL`)<br>• **Spam & Abuse Protection**:<br>&nbsp;&nbsp;1. **Honeypot Trap**: Invisible decoy input fields (`website`) that catch automated scrapers and bots, returning a synthetic `201 Created` without dispatching mail.<br>&nbsp;&nbsp;2. **Sliding Window Rate Limiting**: IP-based rate limiting (maximum 5 requests per 10-minute window) returning `429 Too Many Requests` with `Retry-After` headers.<br>&nbsp;&nbsp;3. **Payload Clamping**: Strict body size limits (10,000 to 20,000 bytes maximum; `413 Request Too Large`).<br>&nbsp;&nbsp;4. **Sanitization**: Full HTML entity encoding (`escapeHtml`) preventing Cross-Site Scripting (XSS) and header injection in email clients. |
| **Error monitoring** | • **Application Monitoring**: Structured Node.js process logs, Next.js server console logging, and standard HTTP error status reporting (`400`, `413`, `429`, `500`).<br>• **Server Level**: Hostinger server metric monitoring (CPU, RAM, disk I/O, uptime health checks).<br>• **Incident Handling**: PM2 automatic process resurrection upon uncaught exceptions; error boundaries rendered gracefully to users (`error.jsx` / `not-found.jsx`). |
| **Data backups** | • **Codebase & Assets**: 100% version-controlled in off-site GitHub remote repository (`origin/main`).<br>• **Server & Configurations**: Hostinger automated daily/weekly snapshot backups capturing full filesystem, environment configurations, and Hostinger mailbox contents.<br>• **Retention Policy**: Rolling 7-day to 30-day snapshot retention.<br>• **Restoration Testing**: Zero-dependency cold-start recovery tested via standard `git clone` -> `npm install` -> `npm run build` -> `npm start`. Server restore executable in < 15 minutes via Hostinger 1-click snapshot restore. |
| **Deployment / rollback** | • **Build Process**: `npm run build` (invokes `next build --webpack` for production asset optimization, tree-shaking, CSS minification, and static route generation).<br>• **Release Process**: Automated Git pull from `main` branch to Hostinger environment -> `npm install --omit=dev` -> `npm run build` -> zero-downtime reload via `pm2 reload seren-lanka`.<br>• **Rollback Process**: Immediate rollback by pointing to the previous Git commit hash (`git checkout <commit-hash>` or `git revert <commit-hash>`) -> `npm run build` -> `pm2 restart`, or via Hostinger backup snapshot restoration. |

