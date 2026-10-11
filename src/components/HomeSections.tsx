import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { projects, projectSrcSet } from "@/lib/projects";
import { clients, testimonials } from "@/lib/trust";

/** "Our work" teaser: first four project photos linking to /projects. */
export function ProjectsTeaser() {
  const featured = projects.slice(0, 4);
  return (
    <section className="bg-white px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="cp-eyebrow cp-eyebrow--teal">Our work</span>
            <h2 className="font-display text-navy-950">Recent installations</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand hover:gap-3 transition-all">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.title}
              to="/projects"
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-navy-100"
            >
              <img
                src={p.imageSmall}
                srcSet={projectSrcSet(p)}
                sizes="(min-width: 1024px) 300px, 50vw"
                width={800}
                height={600}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-teal-400">{p.category}</p>
                <p className="font-display mt-0.5 text-sm font-extrabold uppercase leading-tight tracking-tight text-white [overflow-wrap:anywhere] sm:text-base">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Client names/logos strip — hidden until clients are listed in lib/trust.ts. */
export function ClientsStrip() {
  if (clients.length === 0) return null;
  return (
    <section className="border-y border-navy-100 bg-cream px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl text-center">
        <span className="cp-eyebrow cp-eyebrow--center">Trusted by</span>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clients.map((c) =>
            c.logo ? (
              <img key={c.name} src={c.logo} alt={c.name} className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
            ) : (
              <span key={c.name} className="font-display text-lg font-extrabold uppercase tracking-tight text-navy-400">
                {c.name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/** Customer quotes — hidden until testimonials are listed in lib/trust.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-cream px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <span className="cp-eyebrow cp-eyebrow--teal">What clients say</span>
        <h2 className="font-display text-navy-950">Trusted to keep the power on</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name + t.quote.slice(0, 20)} className="flex flex-col rounded-xl border border-navy-100 bg-white p-6">
              <Quote className="h-7 w-7 text-brand/40" />
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-navy-600">“{t.quote}”</blockquote>
              <figcaption className="mt-5 border-t border-navy-100 pt-4">
                <p className="font-semibold text-navy-950">{t.name}</p>
                {t.role && <p className="text-sm text-navy-400">{t.role}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
