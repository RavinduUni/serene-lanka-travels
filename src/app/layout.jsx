import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { buildMetadata, travelAgencyJsonLd } from "@/lib/seo";
import { site } from "@/data/site";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata(),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "c3YHdvmAlf9kow4ZQMzF39EJ2L8L_DHlU1gaRAW3Kvo",
  },
};

export const viewport = {
  themeColor: "#0b1f5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      {/* Google Analytics 4 – Measurement ID: G-6TL99EK50P */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6TL99EK50P"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6TL99EK50P');
        `}
      </Script>
      <body className="flex min-h-full flex-col">
        <>
          <LoadingScreen />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1 pt-[76px] lg:pt-[88px]">
            {children}
          </main>
          <Footer />
          <JsonLd data={travelAgencyJsonLd()} />
        </>
      </body>
    </html>
  );
}
