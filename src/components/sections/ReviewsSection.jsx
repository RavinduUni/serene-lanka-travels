import { ExternalLink } from "lucide-react";
import ReviewsCarousel from "../reviews/ReviewsCarousel";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import Container from "../ui/Container";
import Reveal from "../motion/Reveal";
import { getVisibleReviews, reviewPlatforms } from "@/data/reviews";
import Image from "next/image";

export default function ReviewsSection() {
    const reviews = getVisibleReviews();
    const google = reviewPlatforms.find((p) => p.id === "google");
    const tripadvisor = reviewPlatforms.find((p) => p.id === "tripadvisor");

    return (
        <section id="reviews" className="relative scroll-mt-24 overflow-hidden pt-20 lg:pt-24">
            <Container className="relative">
                <Reveal>
                    <SectionHeading lines={["In Our Guests'", "Own Words"]} align="center" className="mx-auto mt-3" />
                </Reveal>
                <p className="mx-auto mt-5 max-w-xl text-center text-[14px] lg:text-base leading-relaxed text-black">
                    Real feedback from travellers who explored Sri Lanka with us – shown exactly as they wrote it.
                </p>

                <div className="mt-12">

                    <ReviewsCarousel reviews={reviews} />

                    <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
                        <Button
                            href={"https://www.google.com/search?sca_esv=f0f7d3a8a529a5b8&hl=en-GB&authuser=0&sxsrf=AKL5yDiU-36HERbwYTvDsBFktCNkQum_Ig:1793792172506&kgmid=/g/11p29mgn2v&q=Seren+Lanka+Travels+Sri+Lanka&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=2c5cd0dc2089d3ce&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1"}
                            external
                            variant="outline"
                            size="md"
                            className="gap-2.5 px-6 shadow-sm hover:border-[#4285F4] hover:text-[#4285F4] hover:bg-white transition-all"
                        >
                            <svg viewBox="0 0 24 24" className="size-4.5 shrink-0" aria-hidden="true">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z" />
                                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.89 0 12s.45 3.86 1.24 5.42l4.04-3.15Z" />
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                            </svg>
                            <span>See Google Reviews</span>
                            <ExternalLink className="size-4 shrink-0 text-brand-muted" aria-hidden="true" />
                        </Button>

                        <Button
                            href={"https://www.tripadvisor.com/Attraction_Review-g2550421-d34726277-Reviews-Seren_Lanka_Travels_Sri_Lanka-Katunayaka_Western_Province.html"}
                            external
                            variant="outline"
                            size="md"
                            className="gap-2.5 px-6 shadow-sm hover:border-[#00aa6c] hover:text-[#00aa6c] hover:bg-white transition-all"
                        >
                            <Image
                                src="/reviews/platforms/tripadvisor-icon.png"
                                alt="Tripadvisor"
                                width={20}
                                height={20}
                                className="size-5 shrink-0 rounded-full object-contain"
                            />
                            <span>See Tripadvisor Reviews</span>
                            <ExternalLink className="size-4 shrink-0 text-brand-muted" aria-hidden="true" />
                        </Button>
                    </div>

                </div>
            </Container>
        </section>
    );
}
