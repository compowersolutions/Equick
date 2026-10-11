// Business WhatsApp number in international format, no "+" or spaces.
export const WHATSAPP_NUMBER = "26772732668";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
