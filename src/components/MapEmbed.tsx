import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

const ADDRESS = "Takatokwane Road, G-West, Gaborone, Botswana";
const query = encodeURIComponent(ADDRESS);

/**
 * Google Map that only loads when the visitor asks for it, so no Google
 * cookies are set on page load (matches the Privacy Policy) and the
 * Contact page stays fast.
 */
export function MapEmbed() {
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {show ? (
        <iframe
          title="Map to ComPower, G-West, Gaborone"
          src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${ADDRESS.replace(/ /g, "+")}`}
          className="block h-72 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          onClick={() => setShow(true)}
          className="cp-hero flex h-72 w-full flex-col items-center justify-center gap-3 text-white"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <MapPin className="h-6 w-6" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider">Show map</span>
          <span className="text-xs text-navy-300">Loads Google Maps</span>
        </button>
      )}
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="min-w-0 text-navy-500">{ADDRESS}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand hover:underline"
        >
          Directions <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
