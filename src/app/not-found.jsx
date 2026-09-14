import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="text-center">
        <SectionHeading lines={["This page has", "wandered off the map"]} align="center" className="mx-auto" />
        <p className="mx-auto mt-6 max-w-md text-brand-muted">
          The page you are looking for does not exist or has moved. Let&apos;s get you back on the road.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/sri-lanka-itineraries" variant="outline">
            Explore Tours
          </Button>
        </div>
      </Container>
    </section>
  );
}
