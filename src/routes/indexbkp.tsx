import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Sun, BatteryCharging, CheckCircle, Phone, ArrowRight } from "lucide-react";
import heroImg from "@/assets/gen-at-site.jpg";
import solarImg from "@/assets/solar-rts.jpg";
import rectifierImg from "@/assets/rectifier-panel.jpg";


export const Route = createFileRoute("/indexbkp")({
  head: () => ({
    meta: [
      { title: "ComPower Africa — Simple Solutions to Complex Problems" },
      { name: "description", content: "ComPower Africa provides industrial generators, solar systems, and rectifiers. Power solutions designed for reliability and performance." },
      { property: "og:title", content: "ComPower Africa — Simple Solutions for Complex Problems" },
      { property: "og:description", content: "ComPower Africa provides industrial generators, solar systems, and rectifiers." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="ComPower generator installed at site"
            className="h-full w-full object-cover opacity-30"
            width={1536}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-950/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
              Simple solutions for complex problems
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-200 sm:text-xl">
              Highsystem Botswana delivers industrial generators, solar power systems, and precision rectifiers designed to keep your operations running without interruption.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                <Phone className="h-4 w-4" />
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-display">
              What we provide
            </h2>
            <p className="mt-4 text-muted-foreground">
              Comprehensive power solutions tailored for industrial, commercial, and residential needs across Botswana.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              icon={<Zap className="h-8 w-8 text-teal-500" />}
              title="Generators"
              description="Reliable diesel and gas generators for uninterrupted power. From backup to prime power solutions for every scale."
              imageSrc={heroImg}
            />
            <ProductCard
              icon={<Sun className="h-8 w-8 text-teal-500" />}
              title="Solar Systems"
              description="High-efficiency solar panel installations and off-grid power systems designed for the Botswana climate."
              imageSrc={solarImg}
            />
            <ProductCard
              icon={<BatteryCharging className="h-8 w-8 text-teal-500" />}
              title="Rectifiers"
              description="Precision rectifiers and power conversion equipment for industrial applications, telecoms, and data centers."
              imageSrc={rectifierImg}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-24 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-display">
                Why choose Highsystem?
              </h2>
              <p className="mt-4 text-muted-foreground">
                With years of experience serving Botswana's industrial and commercial sectors, we understand the unique power challenges of our region.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Local expertise and fast response times",
                  "Genuine parts and certified installations",
                  "Comprehensive maintenance and support",
                  "Customized solutions for every industry",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatBox number="15+" label="Years Experience" />
              <StatBox number="20+" label="Projects Completed" />
              <StatBox number="5+" label="Expert Engineers" />
              <StatBox number="24/7" label="Support Available" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Ready to power your business?
          </h2>
          <p className="mt-4 text-navy-200">
            Let our engineers assess your power needs and recommend the right solution for your operation.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Request a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  icon,
  title,
  description,
  imageSrc,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden bg-navy-100">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={512}
          height={320}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground font-display">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-navy-200 bg-card p-6 text-center">
      <div className="text-3xl font-bold text-primary font-display">{number}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
