import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FaqSection() {
  return (
    <section className="bg-cream px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <span className="cp-eyebrow cp-eyebrow--teal">FAQ</span>
          <h2 className="font-display text-navy-950">Questions we hear often</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-400">
            Can't find your answer?{" "}
            <Link to="/contact" className="font-semibold text-brand underline underline-offset-2">
              Ask our engineers
            </Link>
            .
          </p>
        </div>
        <div className="divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.95rem] font-semibold text-navy-950 hover:text-brand">
                {f.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="-mt-1 pb-4 text-sm leading-relaxed text-navy-500">
                {f.a.split(/(generator size calculator)/).map((part, i) =>
                  part === "generator size calculator" ? (
                    <Link key={i} to="/generator-sizing" className="font-medium text-brand underline underline-offset-2">
                      {part}
                    </Link>
                  ) : (
                    part
                  ),
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
