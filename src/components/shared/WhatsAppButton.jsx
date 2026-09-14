import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  size = "md",
  variant = "whatsapp",
  className,
}) {
  return (
    <Button href={buildWhatsAppLink(message)} external variant={variant} size={size} className={className}>
      <MessageCircle className="size-[18px]" aria-hidden="true" />
      {label}
    </Button>
  );
}
