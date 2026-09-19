"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { mainNav, site } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/* ─── Desktop Dropdown Item ────────────────────────────────────────────── */
function NavDropdown({ item, active, scrolled }) {
  return (
    <li className="relative group">
      {/* Parent link */}
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-haspopup={item.children ? "true" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors",
          scrolled
            ? "text-white/90 hover:text-white"
            : "text-white/90 hover:text-white",
          active && "text-white"
        )}
      >
        {item.label}
        {item.children && (
          <ChevronDown
            className="size-[14px] transition-transform duration-200 group-hover:rotate-180"
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Dropdown panel */}
      {item.children && (
        <div
          role="region"
          aria-label={`${item.label} submenu`}
          className={cn(
            // Layout
            "absolute left-0 top-full z-50 min-w-[240px] max-w-[300px]",
            // Visual
            "rounded-b-xl rounded-t-none border-t-2 border-brand-blue bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_-6px_rgba(0,0,0,0.35)]",
            // Animation — hidden by default, revealed on group-hover
            "pointer-events-none opacity-0 translate-y-1",
            "transition-all duration-200 ease-out",
            "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0"
          )}
        >
          <ul className="py-2">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block px-5 py-2.5 text-[13.5px] font-medium text-brand-ink/80 transition-colors hover:bg-brand-sky hover:text-brand-blue"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/* ─── Mobile Accordion Item ─────────────────────────────────────────────── */
function MobileNavItem({ item, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            "block rounded-xl px-4 py-3 text-base font-semibold text-brand-ink hover:bg-brand-sky hover:text-brand-blue",
            active && "text-brand-blue"
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      {/* Accordion toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-brand-ink hover:bg-brand-sky hover:text-brand-blue",
          active && "text-brand-blue"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-4 text-brand-ink/50 transition-transform duration-200",
            expanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Children list */}
      <ul
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {/* Parent link at top of sub-list */}
        <li>
          <Link
            href={item.href}
            onClick={onClose}
            className="block rounded-xl px-6 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-sky"
          >
            View All {item.label}
          </Link>
        </li>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={onClose}
              className="block rounded-xl px-6 py-2.5 text-sm font-medium text-brand-ink/80 hover:bg-brand-sky hover:text-brand-blue"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ─── Header ────────────────────────────────────────────────────────────── */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-brand-navy-deep/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      {/* Dark overlay gradient for contrast when transparent */}
      {!scrolled && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      <Container className="relative flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src={site.logo}
            alt={site.name}
            width={543}
            height={430}
            priority
            className="h-12 w-auto lg:h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <NavDropdown key={item.href} item={item} active={active} scrolled={scrolled} />
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/tailor-made-tours" size="sm" className="h-11 px-5">
            Plan My Trip
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-full border border-white/30 text-white"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full border border-white/30 text-white"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-[60] overflow-hidden transition-[visibility] lg:hidden",
          open ? "visible" : "invisible delay-300"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-brand-navy-deep/50 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col bg-white shadow-lift transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex h-[76px] items-center justify-between border-b border-brand-line px-5">
            <Image src={site.logo} alt={site.name} width={543} height={430} className="h-10 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-brand-line text-brand-navy"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Drawer nav */}
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4">
            <ul className="space-y-0.5">
              {mainNav.map((item) => (
                <MobileNavItem key={item.href} item={item} onClose={() => setOpen(false)} />
              ))}
            </ul>
          </nav>

          {/* Drawer footer CTAs */}
          <div className="grid gap-3 border-t border-brand-line p-5">
            <Button href="/tailor-made-tours" className="w-full">
              Plan My Trip
            </Button>
            <Button href={buildWhatsAppLink()} external variant="whatsapp" className="w-full">
              <MessageCircle className="size-[18px]" aria-hidden="true" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
