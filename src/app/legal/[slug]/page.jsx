import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import LegalBody from "@/components/legal/LegalBody";
import { legalDocuments } from "@/data/legal";
import { site, whatsappTemplates } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import FinalCta from "@/components/sections/FinalCta";

const getDoc = (slug) => legalDocuments.find((d) => d.published && d.slug === slug) || null;

/** Only published documents exist; any other /legal/* path is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocuments.filter((d) => d.published).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.shortTitle,
    description: doc.intro.slice(0, 155),
    path: `/legal/${doc.slug}`,
  });
}

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <>
      {/* Page header – full-bleed background image hero */}
      <section
        className="-mt-[76px] lg:-mt-[88px] relative overflow-hidden py-24 lg:py-32"
        style={{ backgroundImage: "url('/legal.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.75)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.shortTitle }]} light />
          <h1 className="mt-6 max-w-4xl text-[2.1rem] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {`${doc.title[0]} `}
            <span className="text-white">{doc.title[1]}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.8] text-white/80 sm:text-base">{doc.intro}</p>
          {/* <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-brand-navy shadow-[0_1px_0_0_#e6eaf1]">
            <Icons.FileText className="size-4 text-brand-blue" aria-hidden="true" />
            Last updated <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
          </p> */}
          {/* {!doc.reviewed && process.env.NODE_ENV !== "production" && (
            <p className="mt-4 max-w-3xl rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] font-semibold text-amber-900">
              Development notice: this document has not been marked as legally reviewed. Set{" "}
              <code>reviewed: true</code> in src/data/legal.js after approval. (This notice is hidden in production.)
            </p>
          )} */}
        </Container>
      </section>

      {/* Contents + full terms */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl">
            <LegalBody sections={doc.sections} />
          </div>
        </Container>
      </section>
      <FinalCta />
      <FloatingWhatsApp message={whatsappTemplates.generic} />
    </>
  );
}
