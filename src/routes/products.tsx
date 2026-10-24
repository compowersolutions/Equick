import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Zap, Sun, BatteryCharging, Monitor, Phone, CheckCircle, ArrowRight, Download, FileText, Loader2, Activity } from "lucide-react";
import generatorImg from "@/assets/gen-at-site.webp";
import solarImg from "@/assets/solar-rts.webp";
import rectifierImg from "@/assets/rectifier-panel.webp";
import restassureImg from "@/assets/SW-Rest-01.webp";
import moBillingImg from "@/assets/SW-MO-billing.webp";
import generatorSm from "@/assets/gen-at-site-800.webp";
import solarSm from "@/assets/solar-rts-800.webp";
import rectifierSm from "@/assets/rectifier-panel-800.webp";
import restassureSm from "@/assets/SW-Rest-01-800.webp";
import genwiseImg from "@/assets/genwise-card.webp";
import genwiseSm from "@/assets/genwise-card-800.webp";

// Phone-sized versions of the larger product photos
const smallImages: Record<string, string> = {
  [genwiseImg]: genwiseSm,
  [generatorImg]: generatorSm,
  [solarImg]: solarSm,
  [rectifierImg]: rectifierSm,
  [restassureImg]: restassureSm,
};
import { listResources, getResourceDownloadUrl } from "@/lib/api/resources.functions";
import { PageHero } from "@/components/PageHero";


export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — ComPower Africa" },
      { name: "description", content: "Explore our range of industrial generators, GenWise remote generator monitoring, solar power systems, precision rectifiers, and software solutions including RestWise and MO Billing." },
      { property: "og:title", content: "Products — ComPower Africa" },
      { property: "og:description", content: "Explore our range of generators, solar systems, rectifiers, RestWise, MO Billing, and Mogala." },
    ],
  }),
  component: ProductsPage,
});

const APK_URL =
  "https://tqxbfsqwikmjobgniois.supabase.co/storage/v1/object/public/Public%20downloads/BWDialer.apk";

const products = [
  {
    id: "generators",
    category: "generator" as const,
    icon: <Zap className="h-7 w-7 text-teal-500" />,
    title: "Generators",
    tagline: "Uninterrupted power when it matters most",
    image: generatorImg,
    description:
      "ComPower Africa supplies and installs industrial-grade diesel and gas generators for prime and standby power applications. From small commercial units to large industrial power plants, our generator solutions ensure your operations never skip a beat.",
    features: [
      "Diesel & gas generator sets (10kVA – 3000kVA)",
      "Automatic transfer switches (ATS)",
      "Remote monitoring and control systems",
      "Acoustic enclosures and weatherproof canopies",
      "Preventive maintenance contracts",
    ],
    applications: ["Hospitals & clinics", "Data centers & telecoms", "Mining operations", "Commercial buildings"],
    link: null as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "genwise",
    category: "software" as const,
    icon: <Activity className="h-7 w-7 text-teal-500" />,
    title: "GenWise",
    tagline: "Know what every generator is doing, from anywhere",
    image: genwiseImg,
    description:
      "GenWise monitors and controls your standby generators remotely. A GenWise Gateway on each site reads the DSE controller and sends live readings, alarms and history to the GenWise website and your phone, and carries out remote start and stop. It is built for sites where the mobile network is not always reliable, and suits fleets moving on from the DSE890.",
    features: [
      "Live engine, generator and mains readings",
      "Alarm notifications to your phone and email",
      "Remote start, stop and mode changes, with confirmation",
      "Two-SIM 4G gateway that recovers its own connection",
      "Works with DSE controllers, including DSE890 MKII sites",
    ],
    applications: ["Telecom sites", "Hospitals & clinics", "Commercial buildings", "Remote and unmanned sites"],
    link: "/genwise" as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "solar",
    category: "solar" as const,
    icon: <Sun className="h-7 w-7 text-teal-500" />,
    title: "Solar Systems",
    tagline: "Harness the power of the Botswana sun",
    image: solarImg,
    description:
      "Our solar power solutions are engineered to withstand Botswana's harsh climate while delivering maximum energy yield. We design, install, and maintain both grid-tied and off-grid solar systems for homes, businesses, and remote industrial sites.",
    features: [
      "Grid-tied & off-grid solar systems",
      "Lithium & lead-acid battery storage",
      "Solar water pumping solutions",
      "MPPT charge controllers & inverters",
      "Performance monitoring dashboards",
    ],
    applications: ["Residential homes", "Farms & rural areas", "Off-grid telecom towers", "Commercial buildings"],
    link: null as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "rectifiers",
    category: "rectifier" as const,
    icon: <BatteryCharging className="h-7 w-7 text-teal-500" />,
    title: "Rectifiers",
    tagline: "Precision power conversion for critical systems",
    image: rectifierImg,
    description:
      "We supply and service industrial rectifiers for DC power applications across telecommunications, data centers, and industrial sites. Our rectifier solutions offer precise voltage and current control with high efficiency and long service life.",
    features: [
      "Thyristor & IGBT rectifier modules",
      "Precise voltage and current regulation",
      "Hot-swappable redundant configurations",
      "SCADA integration & remote diagnostics",
      "Custom-built for your application",
    ],
    applications: ["Telecom DC power plants", "Electroplating & anodizing", "Data center backup", "Industrial DC drives"],
    link: null as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "restwise",
    category: "software" as const,
    icon: <Monitor className="h-7 w-7 text-teal-500" />,
    title: "RestWise",
    tagline: "The Silent Manager Behind Every Great Restaurant",
    image: restassureImg,
    description:
      "RestWise is a complete restaurant management platform that streamlines operations from order to payroll. Built for busy kitchens and front-of-house teams, it connects waiters, kitchen staff, and dispatch in real time while giving managers full visibility and control.",
    features: [
      "Order processing: waiter to kitchen to dispatch",
      "Integrated POS till for dine-in and takeaway",
      "Raw material inventory and stock management",
      "Payroll and staff management",
      "Real-time order tracking across all stations",
    ],
    applications: ["Restaurants & cafes", "Takeaway outlets", "Multi-branch food chains", "Hotel F&B operations"],
    link: "/restwise" as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "mo-billing",
    category: "software" as const,
    icon: <Monitor className="h-7 w-7 text-teal-500" />,
    title: "MO Billing",
    tagline: "Run your business from your pocket",
    image: moBillingImg,
    description:
      "MO Billing is a lightweight yet powerful business billing platform built for small and medium businesses in Botswana. Create professional invoices, delivery notes, and receipts in seconds — even offline.",
    features: [
      "Instant professional invoicing",
      "Delivery notes and payment receipts",
      "Customer and supplier management",
      "Custom reports and business insights",
      "Works offline — no internet required",
    ],
    applications: ["Small businesses", "Freelancers", "Retail shops", "Service providers"],
    link: "/Products/mo-billing" as string | null,
    apkUrl: null as string | null,
  },
  {
    id: "bwdialler",
    category: "app" as const,
    icon: <Phone className="h-7 w-7 text-teal-500" />,
    title: "Mogala",
    tagline: "Save Airtime",
    image: null as string | null,
    description:
      "Mogala saves your airtime by automatically routing every call through the cheapest available option on Mascom, Orange and BeMobile. Take notes while on the call so you never miss an important detail.",
    features: [
      "Least cost routing on every call",
      "Supports Mascom, Orange and BeMobile",
      "In-call notes — never miss a detail",
      "Automatic network detection",
      "Free to download and use",
    ],
    applications: ["Everyday callers", "Business users", "Entrepreneurs", "Anyone on a Botswana network"],
    link: "/Products/bwdialler" as string | null,
    apkUrl: APK_URL,
  },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function ProductDownloads({ category }: { category: "generator" | "solar" | "rectifier" }) {
  const listFn = useServerFn(listResources);
  const signFn = useServerFn(getResourceDownloadUrl);

  const { data: resources } = useQuery({
    queryKey: ["resources"],
    queryFn: () => listFn({}),
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) => signFn({ data: { id } }),
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });

  const items = resources?.filter((r) => r.category === category) ?? [];
  if (items.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg border border-border bg-navy-50/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Downloads
      </p>
      <ul className="space-y-2">
        {items.map((r) => (
          <li key={r.id} className="flex items-center gap-3">
            <FileText className="h-4 w-4 shrink-0 text-teal-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(r.file_size)}</p>
            </div>
            <button
              onClick={() => downloadMutation.mutate(r.id)}
              disabled={downloadMutation.isPending && downloadMutation.variables === r.id}
              className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              aria-label={`Download ${r.title}`}
            >
              {downloadMutation.isPending && downloadMutation.variables === r.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsPage() {
  return (
    <div>
      <PageHero eyebrow="What we provide" title="Power & software" highlight="built for Botswana">
        Power and software solutions engineered for reliability, efficiency, and performance in Botswana's demanding environment.
      </PageHero>

      {/* Jump links */}
      <nav aria-label="Products" className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {products.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {p.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Product Sections */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={product.id}
              className={`scroll-mt-32 grid gap-10 lg:grid-cols-2 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                {product.image ? (
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-navy-100">
                    <img
                      src={smallImages[product.image] ?? product.image}
                      srcSet={smallImages[product.image] ? `${smallImages[product.image]} 800w, ${product.image} 1600w` : undefined}
                      sizes="(min-width: 1024px) 600px, 100vw"
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      width={800}
                      height={500}
                    />
                    {product.id === "rectifiers" ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                    ) : null}
                  </div>
                ) : (
                  /* Mogala — no image, use a styled placeholder */
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-navy-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto h-20 w-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                        <Phone className="h-10 w-10 text-teal-400" />
                      </div>
                      <p className="text-2xl font-bold uppercase text-white font-display">Mogala</p>
                      <p className="text-teal-400 text-sm mt-1">Save Airtime</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
                    {product.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl">
                    {product.title}
                  </h2>
                </div>
                <p className="text-sm font-medium text-teal-600 uppercase tracking-wide">
                  {product.tagline}
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Ideal for
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {product.id === "generators" && (
                    <Link
                      to="/generator-sizing"
                      className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
                    >
                      What size do I need? <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  {product.link && (
                    <Link
                      to={product.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  {product.apkUrl && (
                    <a
                      href={product.apkUrl}
                      download="Mogala.apk"
                      className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download APK
                    </a>
                  )}
                </div>
                {(product.category === "generator" || product.category === "solar" || product.category === "rectifier") && (
                  <ProductDownloads category={product.category} />
                )}
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              View all downloads
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cp-hero py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="cp-eyebrow cp-eyebrow--center">Free consultation</span>
          <h2 className="text-white font-display">
            Not sure what you need?
          </h2>
          <p className="mt-4 text-navy-300">
            Our engineers can assess your power requirements and recommend the right combination of products for your specific application.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Speak to an Engineer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
