import { useRouterState } from "@tanstack/react-router";
import { whatsappLink } from "@/lib/whatsapp";

/** Floating "Chat on WhatsApp" button shown on every public page. */
export function WhatsAppButton() {
  const { location } = useRouterState();
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth")) return null;

  return (
    <a
      href={whatsappLink("Hello ComPower, I found you on your website and would like to ask about ")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M16.004 3C8.82 3 3.004 8.817 3.004 16c0 2.291.6 4.53 1.74 6.504L3 29l6.68-1.712A12.94 12.94 0 0 0 16.004 29C23.187 29 29 23.183 29 16S23.187 3 16.004 3Zm0 23.636a10.6 10.6 0 0 1-5.405-1.48l-.388-.23-3.964 1.016 1.058-3.865-.252-.398A10.58 10.58 0 0 1 5.39 16c0-5.853 4.762-10.614 10.614-10.614 5.85 0 10.61 4.761 10.61 10.614 0 5.852-4.76 10.636-10.61 10.636Zm5.82-7.95c-.319-.16-1.886-.93-2.178-1.037-.292-.106-.505-.16-.718.16-.212.319-.824 1.036-1.01 1.25-.186.212-.372.239-.69.08-.32-.16-1.347-.497-2.566-1.585-.948-.846-1.588-1.89-1.774-2.21-.186-.318-.02-.49.14-.65.143-.142.319-.371.478-.557.16-.186.212-.319.319-.531.106-.213.053-.399-.027-.558-.08-.16-.718-1.731-.984-2.37-.259-.622-.522-.538-.718-.548l-.611-.01c-.213 0-.558.08-.85.398-.292.319-1.116 1.09-1.116 2.66 0 1.568 1.143 3.085 1.302 3.297.16.213 2.248 3.433 5.447 4.815.761.329 1.355.525 1.818.672.764.243 1.46.209 2.01.127.613-.092 1.886-.771 2.152-1.516.266-.744.266-1.382.186-1.515-.08-.133-.292-.213-.611-.372Z" />
      </svg>
      <span className="hidden pr-1 text-sm font-semibold sm:group-hover:inline">Chat on WhatsApp</span>
    </a>
  );
}
