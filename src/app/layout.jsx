import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, travelAgencyJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata(),
};

export const viewport = {
  themeColor: "#0b1f5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
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
      </body>
    </html>
  );
}
