import HomeHero from "@/components/sections/HomeHero";
import IntroSection from "@/components/sections/IntroSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TourCategoryGrid from "@/components/sections/TourCategoryGrid";
import BuilderPromo from "@/components/sections/BuilderPromo";
import FeaturedJourney from "@/components/sections/FeaturedJourney";
import ExperienceGrid from "@/components/sections/ExperienceGrid";
import PopularDestinations from "@/components/sections/PopularDestinations";
import TransfersBanner from "@/components/sections/TransfersBanner";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import LatestArticles from "@/components/sections/LatestArticles";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { faq } from "@/data/home";
import { whatsappTemplates } from "@/data/site";

export const metadata = buildMetadata({
  title: "Private & Tailor-Made Sri Lanka Tours",
  description:
    "Experience Sri Lanka your way. Private day tours, multi-day itineraries, tailor-made journeys and airport transfers with a trusted local travel team.",
  path: "/",
});

/**
 * Home page – section order follows Content Plan §9 (1–12), with the sitewide
 * FAQ starter set (§28) placed before the final CTA.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <IntroSection />
      <WhyChooseUs />
      <TourCategoryGrid />
      <BuilderPromo />
      <FeaturedJourney />
      <ExperienceGrid />
      <PopularDestinations />
      <TransfersBanner />
      <ReviewsSlider />
      <LatestArticles />
      <FaqSection />
      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
      <JsonLd data={faqJsonLd(faq.items)} />
    </>
  );
}
