import { site, whatsappTemplates } from "@/data/site";

/**
 * Builds a wa.me deep link with a prefilled message.
 * @param {string} [message]
 */
export function buildWhatsAppLink(message = whatsappTemplates.generic) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
