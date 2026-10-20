import { site, whatsappTemplates } from "@/data/site";

/**
 * Builds a wa.me deep link with a prefilled message.
 * @param {string} [message]
 */
export function buildWhatsAppLink(message = whatsappTemplates.generic) {
  const cleanNumber = String(site.whatsappNumber || "94775972777").replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
