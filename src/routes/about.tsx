import { createFileRoute } from "@tanstack/react-router";
import { Target, Users, Shield, TrendingUp } from "lucide-react";
import datacentreImg from "@/assets/datacentre.jpg";
import boreholeImg from "@/assets/borehole.jpg";

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

const C = {
  dark:    "#0C1018",
  dark2:   "#111827",
  dark3:   "#1A2235",
  border: "#232F45",
  blue:   "#2D63A8",
  blueD:  "#1E4F8C",
  teal:   "#00B4A0",
  cream:  "#F8F7F4",
  divider: "#D1D9E0",
  muted:  "#94A3B8",
  textSm: "#64748B",
} as const;

const STYLES = `
  .cp-display { font-family: 'Barlow Condensed', sans-serif !important; }

  .cp-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: ${C.blue};
  }
  .cp-eyebrow::before {
    content: ''; display: block; width: 28px; height: 2px;
    background: currentColor; flex-shrink: 0;
  }
  .cp-eyebrow--teal { color: ${C.teal}; }

  /* Value card — blue left-wire on hover */
  .cp-val-card {
    background: ${C.dark3};
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 1.75rem;
    position: relative;
    transition: border-color 0.2s;
  }
  .cp-val-card::after {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: ${C.blue};
    border-radius: 12px 0 0 12px;
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.25s ease;
  }
  .cp-val-card:hover { border-color: ${C.border}; }
  .cp-val-card:hover::after { transform: scaleY(1); }

  /* Story images */
  .cp-story-img {
    width: 100%; height: 100%; object-fit: cover;
    display: block;
    transition: transform 0.55s ease;
  }
  .cp-img-wrap:hover .cp-story-img { transform: scale(1.04); }
`;

const values = [
  {
    icon: <Target size={22} color={C.blue} />,
    title: "Precision",
    description: "We engineer solutions with exacting standards. Every installation is measured, tested, and verified before handover.",
  },
  {
    icon: <Users size={22} color={C.blue} />,
    title: "Partnership",
    description: "We don't just sell products — we build long-term relationships. Our clients count on us for ongoing support and maintenance.",
  },
  {
    icon: <Shield size={22} color={C.blue} />,
    title: "Reliability",
    description: "In power, there is no room for failure. We source and install only equipment that meets the highest international standards.",
  },
  {
    icon: <TrendingUp size={22} color={C.blue} />,
    title: "Innovation",
    description: "We continuously explore smarter, more efficient technologies to help our clients reduce costs and environmental impact.",
  },
];

function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* ── HERO ── */}
        <section style={{ background: C.dark, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem) clamp(3.5rem,6vw,5rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 80% at 30% 50%, rgba(45,99,168,0.055) 0%, transparent 65%)`, pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
            <span className="cp-eyebrow">Who we are</span>
            <h1 className="cp-display" style={{ fontWeight: 800, fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 0.95, textTransform: "uppercase", color: "#fff", marginTop: "0.5rem", maxWidth: "18ch" }}>
              About Highsystem<br /><span style={{ color: C.blue }}>Botswana</span>
            </h1>
            <p style={{ marginTop: "1rem", color: C.muted, fontSize: "clamp(1rem,1.5vw,1.1rem)", maxWidth: "52ch", lineHeight: 1.8 }}>
              Powering Botswana with simple, reliable solutions for complex energy challenges.
            </p>
          </div>
        </section>

        {/* ── STORY ── */}
        <section style={{ background: C.cream, padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>

            {/* Our Story */}
            <div>
              <div className="cp-img-wrap" style={{ position: "relative", marginBottom: "1.25rem", aspectRatio: "4/3", overflow: "hidden", borderRadius: "10px", border: `1.5px solid ${C.divider ?? "#D1D9E0"}`, background: "#E2E8F0" }}>
                <img src={datacentreImg} alt="Containerized data centre power installation" loading="lazy" className="cp-story-img" />
              </div>
              <span className="cp-eyebrow cp-eyebrow--teal">Our story</span>
              <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "clamp(1.75rem,3vw,2.25rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem" }}>
                Built for<br />Botswana
              </h2>
              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "1rem", color: C.textSm, lineHeight: 1.8, fontSize: "0.925rem" }}>
                <p>Highsystem Botswana was founded on a simple belief: that businesses and communities in Botswana deserve reliable, world-class power solutions without unnecessary complexity.</p>
                <p>With years of experience in the power industry, our team understands the unique challenges of operating in Southern Africa — from extreme temperatures and remote locations to the critical need for backup power during grid instability.</p>
                <p>We specialize in three core areas: industrial generators, solar power systems, and precision rectifiers. Each solution is tailored to the client's environment, budget, and long-term operational goals.</p>
              </div>
            </div>

            {/* Our Mission */}
            <div>
              <div className="cp-img-wrap" style={{ position: "relative", marginBottom: "1.25rem", aspectRatio: "4/3", overflow: "hidden", borderRadius: "10px", border: `1.5px solid ${C.divider ?? "#D1D9E0"}`, background: "#E2E8F0" }}>
                <img src={boreholeImg} alt="Borehole pump installation work" loading="lazy" className="cp-story-img" />
              </div>
              <span className="cp-eyebrow cp-eyebrow--teal">Our mission</span>
              <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "clamp(1.75rem,3vw,2.25rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem" }}>
                Built to<br />last
              </h2>
              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "1rem", color: C.textSm, lineHeight: 1.8, fontSize: "0.925rem" }}>
                <p>To be Botswana's most trusted power solutions provider by delivering products and services that are straightforward, dependable, and built to last.</p>
                <p>We combine international-grade equipment with local expertise to ensure every installation performs under real-world conditions. Whether it's a hospital that cannot afford downtime, a telecom tower in the bush, or a factory running 24/7, we engineer systems that work.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={{ background: C.dark2, padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="cp-eyebrow" style={{ justifyContent: "center" }}>What drives us</span>
              <h2 className="cp-display" style={{ fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginTop: "0.6rem" }}>
                Four principles.<br />One standard.
              </h2>
              <p style={{ marginTop: "1rem", color: C.muted, maxWidth: "44ch", margin: "1rem auto 0", fontSize: "0.9rem", lineHeight: 1.75 }}>
                Four principles guide everything we do at Highsystem Botswana.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {values.map((v) => (
                <div key={v.title} className="cp-val-card">
                  <div style={{ width: "44px", height: "44px", background: "rgba(45,99,168,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    {v.icon}
                  </div>
                  <h3 className="cp-display" style={{ fontWeight: 700, fontSize: "1.35rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "#fff" }}>{v.title}</h3>
                  <p style={{ marginTop: "0.6rem", fontSize: "0.875rem", color: C.muted, lineHeight: 1.75 }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
