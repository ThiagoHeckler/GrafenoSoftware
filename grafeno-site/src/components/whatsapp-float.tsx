import { Icon } from "./icon";

export const WHATSAPP_URL = "https://wa.me/5549999999999";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar com a Grafeno pelo WhatsApp"
    >
      <Icon name="whatsapp" size={24} />
    </a>
  );
}
