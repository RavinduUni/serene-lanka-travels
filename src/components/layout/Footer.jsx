import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import Container from "@/components/ui/Container";
import { site, footerColumns } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-black">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="inline-flex rounded-2xl bg-white p-3">
              <Image src="/logo/seren-lanka-travels.png" alt={site.name} width={543} height={430} className="h-14 w-auto" />
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-black">
              Private and tailor-made Sri Lanka tours, day trips, transfers and authentic local travel
              experiences designed around your time, interests and budget.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <span>Sri Lanka</span>
              </li>
              {site.phones.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-black">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-black">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold tracking-wide text-black">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[14px] text-gray-600 transition-colors hover:text-black">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-gray-400 pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-gray-600">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
              { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
              { Icon: YoutubeIcon, href: site.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-gray-600/15 text-gray-600 transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
