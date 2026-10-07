import { Icon } from "./icon";

/* Mensagem que já abre escrita na conversa; o cliente pode editar antes de enviar. */
const WHATSAPP_MESSAGE = "Olá, Thiago! Vim pelo site da Grafeno e gostaria de conversar sobre um projeto.";

export const WHATSAPP_URL = `https://wa.me/5549991382347?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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
