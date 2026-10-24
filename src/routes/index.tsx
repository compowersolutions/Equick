import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Sun, BatteryCharging, ArrowRight, Phone } from "lucide-react";
import heroImg from "@/assets/gen-at-site.webp";
import solarSm from "@/assets/solar-rts-800.webp";
import heroSm from "@/assets/gen-at-site-800.webp";
import rectifierSm from "@/assets/rectifier-panel-800.webp";
import heroXs from "@/assets/gen-at-site-480.webp";
import solarXs from "@/assets/solar-rts-480.webp";
import rectifierXs from "@/assets/rectifier-panel-480.webp";
import genwiseImg from "@/assets/genwise-fleet-800.webp";
import genwiseLogo from "@/assets/genwise-logo-stacked-dark.svg";
import { ProjectsTeaser, ClientsStrip, Testimonials } from "@/components/HomeSections";
import { FaqSection } from "@/components/FaqSection";

export const Route = createFileRoute("/")({
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

// ── Brand tokens — derived from the ComPower logo ──────────────────────────
// "COM"   → steel blue  #2D63A8
// "POWER" → charcoal    #1A1A2A (dark bg)
const C = {
  // Backgrounds — charcoal-first, matching the "POWER" dark of the logo
  dark:    "#0C1018",   // deepest bg (hero)
  dark2:   "#111827",   // section bg
  dark3:   "#1A2235",   // card / stat bg
  border:  "#232F45",   // hairline borders

  // Primary accent — the "COM" blue from the logo
  blue:    "#2D63A8",
  blueD:   "#1E4F8C",   // hover / pressed state
  blueL:   "rgba(45,99,168,0.12)", // tinted bg

  // Secondary — teal kept as a complementary action colour
  teal:    "#00B4A0",

  // Neutrals
  cream:   "#F8F7F4",
  divider: "#D1D9E0",
  muted:   "#94A3B8",
  textSm:  "#5B6A80",
} as const;

const PAGE_STYLES = `
  .cp-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }

  /* Blue "live-wire" eyebrow — now matches the COM logo colour */
  .cp-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: ${C.blue}; margin-bottom: 0.75rem;
  }
  .cp-eyebrow::before {
    content: ''; display: block;
    width: 28px; height: 2px;
    background: currentColor; flex-shrink: 0;
  }
  .cp-eyebrow--teal   { color: #007A69; }
  .cp-eyebrow--center { justify-content: center; }

  /* Subtle dot grid in hero */
  .cp-hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }

  /* Primary CTA — blue bg, white text */
  .cp-btn-blue {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.blue}; color: #fff;
    font-weight: 700; font-size: 0.85rem;
    letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.85rem 1.75rem; border-radius: 4px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    cursor: pointer; flex-shrink: 0;
  }
  .cp-btn-blue:hover { background: ${C.blueD}; transform: translateY(-1px); }

  /* Secondary — transparent outline */
  .cp-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #fff;
    font-weight: 600; font-size: 0.85rem;
    letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.85rem 1.75rem; border-radius: 4px;
    border: 1px solid ${C.border};
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .cp-btn-outline:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.06); }

  /* Service card — blue left-wire on hover */
  .cp-service-card {
    background: #fff; display: flex; flex-direction: column;
    position: relative; transition: background 0.2s;
  }
  .cp-service-card::after {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: ${C.blue};
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.25s ease;
  }
  .cp-service-card:hover::after { transform: scaleY(1); }
  .cp-service-card:hover { background: #FAFAF8; }

  .cp-service-card .cp-card-img { transition: transform 0.55s ease; }
  .cp-service-card:hover .cp-card-img { transform: scale(1.06); }

  /* "Learn more" link */
  .cp-card-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: ${C.blue}; text-decoration: none;
    transition: gap 0.2s;
  }
  .cp-card-link:hover { gap: 10px; }

  /* Why-us bullet rows */
  .cp-why-row {
    display: flex; align-items: flex-start; gap: 0.875rem;
    padding: 0.9rem 0; border-bottom: 1px solid ${C.border};
    font-size: 0.875rem; color: #CBD5E0; line-height: 1.6;
  }
  .cp-why-row:first-of-type { border-top: 1px solid ${C.border}; }

  /* Stat boxes */
  .cp-stat-box { background: ${C.dark3}; padding: 1.75rem; }

  @media (max-width: 640px) {
    .cp-hero-actions { flex-direction: column; }
    .cp-why-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div style={{ fontFamily: "var(--font-body)" }}>

        {/* ── HERO ── */}
        <section className="cp-on-dark" style={{ position: "relative", minHeight: "100vh", background: C.dark, display: "flex", alignItems: "center", overflow: "hidden" }}>

          {/* Background image */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img
              src={heroSm}
              srcSet={`${heroSm} 800w, ${heroImg} 1600w`}
              sizes="100vw"
              fetchPriority="high"
              alt=""
              aria-hidden="true"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.15 }}
              width={1536} height={768}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.dark} 35%, rgba(12,16,24,0.5) 100%)` }} />
          </div>

          {/* Dot grid */}
          <div className="cp-hero-grid" style={{ position: "absolute", inset: 0 }} />

          {/* Blue radial glow — mirrors the "COM" colour */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 70% 50%, rgba(45,99,168,0.12) 0%, transparent 60%)`, pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(6rem,10vw,9rem) clamp(1.5rem,5vw,4rem) 5rem", width: "100%" }}>

            <span className="cp-eyebrow">Botswana's Power Partner</span>

            <h1 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(2.66rem,6.84vw,5.32rem)", lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#fff", maxWidth: "14ch", marginTop: "0.5rem" }}>
              Simple<br />
              solutions<br />
              for <span style={{ color: C.blue }}>complex</span><br />
              problems
            </h1>

            <p style={{ marginTop: "1.75rem", fontSize: "clamp(1rem,1.5vw,1.125rem)", color: C.muted, maxWidth: "46ch", lineHeight: 1.8 }}>
              ComPower Africa delivers industrial generators, solar power systems, and precision rectifiers designed to keep your operations running without interruption.
            </p>

            <div className="cp-hero-actions" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/products" className="cp-btn-blue">
                Explore Products <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="cp-btn-outline">
                <Phone size={14} /> Get a Quote
              </Link>
            </div>
            <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: C.muted }}>
              Not sure what size generator you need?{" "}
              <Link to="/generator-sizing" style={{ color: "#fff", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Try our free calculator
              </Link>
            </p>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ background: C.cream, padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <div style={{ marginBottom: "2.5rem" }}>
              <span className="cp-eyebrow cp-eyebrow--teal">What we provide</span>
              <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.71rem,3.8vw,2.66rem)", textTransform: "uppercase", lineHeight: 1, color: C.dark }}>
                Power for every scale
              </h2>
              <p style={{ marginTop: "0.75rem", color: C.textSm, maxWidth: "50ch", fontSize: "0.925rem", lineHeight: 1.75 }}>
                Comprehensive power solutions for industrial, commercial, and residential operations across Botswana.
              </p>
            </div>

            {/* Flush card grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5px", background: C.divider, border: `1.5px solid ${C.divider}`, borderRadius: "12px", overflow: "hidden" }}>
              <ServiceCard icon={<Zap size={22} color={C.blue} />}            title="Generators"    description="Reliable diesel and gas generators for uninterrupted power. From emergency backup to prime power for any operational scale."                                                                 imageSrc={heroSm}       imageXs={heroXs}      anchor="generators" />
              <ServiceCard icon={<Sun size={22} color={C.blue} />}             title="Solar Systems" description="High-efficiency solar installations and off-grid systems engineered for Botswana's sun — turning abundant daylight into dependable power."                                              imageSrc={solarSm}      imageXs={solarXs}     anchor="solar" />
              <ServiceCard icon={<BatteryCharging size={22} color={C.blue} />} title="Rectifiers"   description="Precision rectifiers and power conversion equipment for telecoms, data centers, and industrial applications where clean DC power is non-negotiable." imageSrc={rectifierSm}  imageXs={rectifierXs} anchor="rectifiers" />
            </div>
          </div>
        </section>

        {/* ── GENWISE ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(74,114,182,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div className="cp-why-grid" style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <span className="cp-eyebrow" style={{ color: "#7D9DE0" }}>New · Remote monitoring</span>
              <h2 style={{ margin: 0 }}>
                <img src={genwiseLogo} alt="GenWise" loading="lazy" style={{ height: "clamp(70px, 8vw, 96px)", width: "auto", display: "block" }} />
              </h2>
              <p style={{ marginTop: "0.9rem", fontSize: "1.05rem", fontWeight: 600, color: "#fff" }}>
                Know what every generator is doing, from anywhere.
              </p>
              <p style={{ marginTop: "0.75rem", color: C.muted, fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "46ch" }}>
                Live readings, alarms on your phone and remote start and stop for your generators, through a 4G gateway that keeps its connection when the network does not.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
                <Link to="/genwise" className="cp-btn-blue" style={{ background: "#4A72B6" }}>
                  Explore GenWise <ArrowRight size={14} />
                </Link>
                <Link to="/genwise" hash="dse890" className="cp-btn-outline">
                  Moving from DSE890?
                </Link>
              </div>
            </div>
            <Link to="/genwise" aria-label="See GenWise" style={{ display: "block", borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
              <img src={genwiseImg} alt="GenWise fleet overview with generator status, load, fuel and battery for four sites" loading="lazy" width={800} height={367} style={{ width: "100%", height: "auto", display: "block" }} />
            </Link>
          </div>
        </section>

        <ClientsStrip />
        <ProjectsTeaser />

        {/* ── WHY COMPOWER ── */}
        <section className="cp-on-dark" style={{ background: C.dark2, padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div className="cp-why-grid" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

            {/* Left */}
            <div>
              <span className="cp-eyebrow">Why ComPower</span>
              <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#fff" }}>
                Local expertise.<br />No compromises.
              </h2>
              <p style={{ marginTop: "1rem", color: C.muted, fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "44ch" }}>
                With years of experience serving Botswana's industrial and commercial sectors, we understand the unique power challenges of our region.
              </p>
              <div style={{ marginTop: "1.25rem" }}>
                {[
                  "Local expertise and fast response times across Botswana",
                  "Genuine parts and certified, compliant installations",
                  "Comprehensive maintenance contracts and ongoing support",
                  "Customised solutions built around your industry",
                ].map((item) => (
                  <div key={item} className="cp-why-row">
                    <CheckIcon />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", background: C.border, border: `1.5px solid ${C.border}`, borderRadius: "12px", overflow: "hidden" }}>
              {[
                { number: "100+",     label: "Generators Installed"        },
                { number: "1020", unit: "kVA", label: "Largest Single Installation" },
                { number: "15+",      label: "Years in Botswana"           },
                { number: "24/7",     label: "Support Available"           },
              ].map(({ number, label, unit }: { number: string; label: string; unit?: string }) => (
                <div key={label} className="cp-stat-box">
                  <div className="cp-display" style={{ fontWeight: 900, fontSize: "2.09rem", lineHeight: 1, color: "var(--color-brand-light)", whiteSpace: "nowrap" }}>
                    {number}{unit && <span style={{ fontSize: "1.1rem", fontWeight: 700, marginLeft: "0.3rem" }}>{unit}</span>}
                  </div>
                  <div style={{ marginTop: "0.4rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: C.muted }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <FaqSection />

        {/* ── CTA ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          {/* Blue radial glow */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 75% at 50% 50%, rgba(45,99,168,0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span className="cp-eyebrow cp-eyebrow--center">Ready to start</span>
            <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.71rem,3.8vw,2.66rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#fff" }}>
              Power your<br />operation today
            </h2>
            <p style={{ marginTop: "1rem", color: C.muted, fontSize: "0.925rem", maxWidth: "44ch", margin: "1rem auto 0", lineHeight: 1.75 }}>
              Let our engineers assess your power needs and recommend the right solution for your operation.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link to="/contact" className="cp-btn-blue" style={{ fontSize: "0.9rem", padding: "0.9rem 2rem" }}>
                Request a Free Consultation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ icon, title, description, imageSrc, imageXs, anchor }: {
  icon: React.ReactNode; title: string; description: string; imageSrc: string; imageXs: string; anchor: string;
}) {
  return (
    <div className="cp-service-card">
      <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#E2E8F0" }}>
        <img src={imageSrc} srcSet={`${imageXs} 480w, ${imageSrc} 800w`} sizes="(min-width: 960px) 400px, 100vw" alt={title} loading="lazy" className="cp-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          width={512} height={288} />
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ width: "42px", height: "42px", background: "rgba(45,99,168,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
          {icon}
        </div>
        <h3 className="cp-display" style={{ fontWeight: 800, fontSize: "1.19rem", textTransform: "uppercase", letterSpacing: "0.03em", color: "#0C1018" }}>
          {title}
        </h3>
        <p style={{ marginTop: "0.4rem", fontSize: "0.875rem", color: "#5B6A80", lineHeight: 1.75, flex: 1 }}>
          {description}
        </p>
        <Link to="/products" hash={anchor} className="cp-card-link" style={{ marginTop: "1rem" }}>
          Learn more<span className="sr-only"> about {title}</span> <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/** Blue check icon — matches the COM logo colour */
function CheckIcon() {
  return (
    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(45,99,168,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.5l2.5 2.5 4.5-5" stroke="#2D63A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
