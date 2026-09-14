import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.7)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
