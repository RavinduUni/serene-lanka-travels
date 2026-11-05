import { ExternalLink } from "lucide-react";
import ReviewsCarousel from "../reviews/ReviewsCarousel";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import Container from "../ui/Container";
import Reveal from "../motion/Reveal";
import { getVisibleReviews, reviewPlatforms } from "@/data/reviews";

export default function ReviewsSection() {
    const reviews = getVisibleReviews();
    const google = reviewPlatforms.find((p) => p.id === "google");

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
                    {reviews.length > 0 ? (
                        <ReviewsCarousel reviews={reviews} />
                    ) : (
                        <div className="mx-auto max-w-xl rounded-card border border-dashed border-brand-line bg-white p-8 text-center">
                            <h3 className="text-xl font-bold text-brand-navy">Our first guest reviews are on their way</h3>
                            <p className="mt-2 text-[15px] text-brand-muted">
                                Travelled with us recently? We would love to hear about your journey.
                            </p>
                            <Button href="#write-a-review" className="mt-5">
                                Write the first review
                            </Button>
                        </div>
                    )}
                </div>


                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {google?.readUrl && (
                        <Button href={google.readUrl} external variant="outline">
                            See all reviews on Google
                            <ExternalLink className="size-4" aria-hidden="true" />
                        </Button>
                    )}
                </div>
            </Container>
        </section>
    );
}
