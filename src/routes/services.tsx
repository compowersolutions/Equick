import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, ClipboardCheck, Siren, Sun, BatteryCharging, HardHat, ArrowRight, Phone, MessageCircle, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { whatsappLink } from "@/lib/whatsapp";
import installImg from "@/assets/gen-at-site.webp";
import boardImg from "@/assets/project-distribution-board.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Installation, Maintenance & Emergency Repairs | ComPower Africa" },
      {
        name: "description",
        content:
          "Generator, solar and rectifier installation, preventive maintenance contracts and emergency call-outs across Botswana from ComPower Africa.",
      },
      { property: "og:title", content: "Services — Installation, Maintenance & Repairs | ComPower Africa" },
      { property: "og:description", content: "Keep your power running: installation, maintenance contracts and emergency call-outs." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: HardHat,
    title: "Installation & commissioning",
    text: "Site assessment, sizing, delivery, mounting, cabling and changeover switches — tested and commissioned before handover.",
    points: ["Free site assessment", "Automatic transfer switches", "Compliant electrical work", "Handover and operator training"],
  },
  {
    icon: ClipboardCheck,
    title: "Preventive maintenance contracts",
    text: "Scheduled servicing that prevents breakdowns and protects your investment, with a service record for every visit.",
    points: ["Oil, filter and coolant service", "Battery and charger checks", "Test runs under load", "Written service reports"],
  },
  {
    icon: Siren,
    title: "Repairs & emergency call-outs",
    text: "When the power fails, our technical team is on standby to diagnose and repair generators, ATS panels and power systems.",
    points: ["Fault finding and repairs", "Genuine spare parts", "Any make of generator", "Call or WhatsApp any time"],
  },
  {
    icon: Sun,
    title: "Solar system servicing",
    text: "Keep solar output high with inspections, cleaning and health checks of inverters and batteries.",
    points: ["Panel inspection and cleaning", "Inverter and battery health checks", "Performance monitoring", "System upgrades"],
  },
  {
    icon: BatteryCharging,
    title: "Rectifier & DC power support",
    text: "Servicing and module replacement for telecom and industrial rectifier systems where clean DC power is critical.",
    points: ["Module testing and swap-out", "Battery bank checks", "Alarm and monitoring setup", "Capacity upgrades"],
  },
  {
    icon: Wrench,
    title: "Upgrades & relocations",
    text: "Growing load or moving site? We resize, relocate and upgrade existing power systems with minimal downtime.",
    points: ["Load reassessment", "Generator relocation", "Hybrid solar + generator upgrades", "Canopy and fuel system work"],
  },
];

const steps = [
  { n: "01", title: "Assess", text: "We visit your site and measure what you need to power." },
  { n: "02", title: "Recommend", text: "You get a clear proposal and quotation — no obligation." },
  { n: "03", title: "Install", text: "Our team installs, tests and commissions the system." },
  { n: "04", title: "Maintain", text: "Scheduled servicing and fast support keep it running." },
];

function ServicesPage() {
  return (
    <div>
      <PageHero eyebrow="Services" title="We keep your" highlight="power running">
        From the first site visit to years of servicing — installation, maintenance contracts and emergency
        call-outs for generators, solar and rectifiers across Botswana.
      </PageHero>

      {/* Services grid */}
      <section className="bg-cream px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text, points }) => (
              <div key={title} className="flex flex-col rounded-xl border border-navy-100 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <h2 className="mt-4 text-lg font-extrabold uppercase tracking-tight text-navy-950">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{text}</p>
                <ul className="mt-4 space-y-1.5 border-t border-navy-100 pt-4">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance contracts */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <img src={installImg} alt="Generator installed by ComPower" loading="lazy" className="aspect-[3/4] w-full rounded-xl object-cover" />
            <img src={boardImg} alt="Distribution board wiring" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-xl object-cover" />
          </div>
          <div>
            <span className="cp-eyebrow cp-eyebrow--teal">Maintenance contracts</span>
            <h2 className="font-display text-navy-950">A generator is only as good as its last service</h2>
            <p className="mt-4 leading-relaxed text-navy-500">
              Standby generators can sit idle for months — then must start first time during an outage. Regular
              servicing catches flat batteries, old fuel, leaks and worn parts before they let you down.
            </p>
            <p className="mt-3 leading-relaxed text-navy-500">
              We tailor the visit schedule to your equipment and how hard it works, and keep a service record for
              every visit — useful for insurance and audits.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                search={{ interest: "maintenance", message: "I'd like a quote for a maintenance contract.\nEquipment: \nLocation: " }}
                className="inline-flex items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-dark"
              >
                Get a maintenance quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="cp-eyebrow">How we work</span>
          <h2 className="font-display text-navy-950">Simple from start to finish</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-navy-100 bg-white p-6">
                <span className="text-3xl font-black text-brand">{s.n}</span>
                <h3 className="mt-2 text-lg font-extrabold uppercase tracking-tight text-navy-950">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Emergency */}
      <section className="cp-hero px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="cp-eyebrow">Power down?</span>
            <h2 className="font-display text-white">Emergency call-outs</h2>
            <p className="mt-3 max-w-xl text-navy-300">
              For breakdowns and urgent faults, contact our technical team directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+26772732668"
              className="inline-flex items-center gap-2 rounded bg-teal-600 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-teal-700"
            >
              <Phone className="h-4 w-4" /> +267 72732668
            </a>
            <a
              href={whatsappLink("URGENT: I need emergency support. ")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy-950 hover:bg-[#1EBE5A]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
