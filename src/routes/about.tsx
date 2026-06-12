import { createFileRoute } from "@tanstack/react-router";
import { Target, Users, Shield, TrendingUp } from "lucide-react";
import datacentreImg from "@/assets/datacentre.jpg.asset.json";
import boreholeImg from "@/assets/borehole.jpg.asset.json";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ComPower Africa" },
      { name: "description", content: "Learn about ComPower Africa, our mission, and our commitment to delivering reliable power solutions." },
      { property: "og:title", content: "About — ComPower Africa" },
      { property: "og:description", content: "Learn about ComPower Africa and our mission." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: <Target className="h-6 w-6 text-teal-500" />,
    title: "Precision",
    description: "We engineer solutions with exacting standards. Every installation is measured, tested, and verified before handover.",
  },
  {
    icon: <Users className="h-6 w-6 text-teal-500" />,
    title: "Partnership",
    description: "We don't just sell products — we build long-term relationships. Our clients count on us for ongoing support and maintenance.",
  },
  {
    icon: <Shield className="h-6 w-6 text-teal-500" />,
    title: "Reliability",
    description: "In power, there is no room for failure. We source and install only equipment that meets the highest international standards.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-teal-500" />,
    title: "Innovation",
    description: "We continuously explore smarter, more efficient technologies to help our clients reduce costs and environmental impact.",
  },
];

function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            About Highsystem Botswana
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            Powering Botswana with simple, reliable solutions for complex energy challenges.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-navy-100">
                <img
                  src={datacentreImg.url}
                  alt="Containerized data centre power installation"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-display">
                Our story
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Highsystem Botswana was founded on a simple belief: that businesses and communities in Botswana deserve reliable, world-class power solutions without unnecessary complexity.
                </p>
                <p>
                  With years of experience in the power industry, our team understands the unique challenges of operating in Southern Africa — from extreme temperatures and remote locations to the critical need for backup power during grid instability.
                </p>
                <p>
                  We specialize in three core areas: industrial generators, solar power systems, and precision rectifiers. Each solution is tailored to the client's environment, budget, and long-term operational goals.
                </p>
              </div>
            </div>
            <div>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-navy-100">
                <img
                  src={boreholeImg.url}
                  alt="Borehole pump installation work"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-display">
                Our mission
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To be Botswana's most trusted power solutions provider by delivering products and services that are straightforward, dependable, and built to last.
                </p>
                <p>
                  We combine international-grade equipment with local expertise to ensure every installation performs under real-world conditions. Whether it's a hospital that cannot afford downtime, a telecom tower in the bush, or a factory running 24/7, we engineer systems that work.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-display">
              What drives us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Four principles guide everything we do at Highsystem Botswana.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground font-display">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
