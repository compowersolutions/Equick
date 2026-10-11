import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { projects, type ProjectCategory } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Work — Projects | ComPower Africa" },
      {
        name: "description",
        content:
          "Generator, solar, electrical and borehole installations completed by ComPower (Highsystem Botswana) across Botswana.",
      },
      { property: "og:title", content: "Our Work — ComPower Africa" },
      { property: "og:description", content: "Generator, solar and electrical installations across Botswana." },
    ],
  }),
  component: ProjectsPage,
});

const categories: ("All" | ProjectCategory)[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, shown.length]);

  const current = open === null ? null : shown[open];

  return (
    <div>
      <PageHero eyebrow="Our work" title="Installed." highlight="Tested. Running.">
        A selection of generator, solar and electrical installations our team has delivered across Botswana.
      </PageHero>

      <section className="bg-cream px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  filter === c
                    ? "bg-navy-950 text-white"
                    : "border border-navy-200 bg-white text-navy-400 hover:border-navy-300 hover:text-navy-950"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setOpen(i)}
                className="group overflow-hidden rounded-xl border border-navy-100 bg-white text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div className="aspect-[4/3] overflow-hidden bg-navy-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-teal-600">
                    {p.category}
                  </span>
                  <h3 className="font-display mt-1 text-lg text-navy-950">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-400">{p.description}</p>
                  {p.location && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-navy-400">
                      <MapPin className="h-3 w-3" /> {p.location}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cp-hero px-4 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl">
          <span className="cp-eyebrow cp-eyebrow--center">Your project next</span>
          <h2 className="font-display text-white">Planning an installation?</h2>
          <p className="mt-4 text-navy-300">
            Tell us about your site and power needs — our engineers will recommend the right solution.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded bg-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-dark"
          >
            Request a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => setOpen(null)}
          >
            <X className="h-6 w-6" />
          </button>
          {shown.length > 1 && (
            <>
              <button
                aria-label="Previous photo"
                className="absolute left-2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open! - 1 + shown.length) % shown.length);
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                aria-label="Next photo"
                className="absolute right-2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((open! + 1) % shown.length);
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.image} alt={current.title} className="max-h-[78vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center">
              <p className="font-display text-lg font-extrabold uppercase tracking-tight text-white">{current.title}</p>
              <p className="mt-1 text-sm text-navy-300">{current.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
