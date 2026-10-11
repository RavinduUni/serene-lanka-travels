import { buildWhatsAppLink } from "@/lib/whatsapp";
import Image from "next/image";

/**
 * Floating WhatsApp button shown on every page (Content Plan §6).
 * Pass a page-specific `message` from the page that renders it.
 */
export default function FloatingWhatsApp({ message }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Seren Lanka Travels on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <Image src="/whastapp-icon.webp" alt="WhatsApp" width={150} height={150} />
    </a>
  );
}
