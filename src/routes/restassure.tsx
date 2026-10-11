import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, ClipboardList, UtensilsCrossed, Boxes, Users, ArrowRight } from "lucide-react";
import dashboardImg from "@/assets/restassure_dashboard.webp";
import posImg from "@/assets/restassure_pos.webp";
import tablesImg from "@/assets/restassure_tables.webp";

export const Route = createFileRoute("/restassure")({
  head: () => ({
    meta: [
      { title: "RestAssure — Restaurant Management System | ComPower Africa" },
      { name: "description", content: "RestAssure is a complete restaurant management platform covering order processing, POS, takeaway, inventory, and payroll." },
      { property: "og:title", content: "RestAssure — The Silent Manager Behind Every Great Restaurant" },
      { property: "og:description", content: "Order processing, POS till, takeaway, inventory and payroll — all in one platform." },
    ],
  }),
  component: RestAssurePage,
});

// RestAssure uses teal as its primary accent (software product, distinct from power products)
const C = {
  dark:    "#0C1018",
  dark2:   "#111827",
  dark3:   "#1A2235",
  border: "#232F45",
  blue:   "#2D63A8",
  teal:   "#00B4A0",
  tealD:  "#009B89",
  teal10: "rgba(0,180,160,0.1)",
  muted:  "#94A3B8",
  textSm: "#5B6A80",
  cream:  "#F8F7F4",
} as const;

const STYLES = `
  .cp-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }

  .cp-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase; color: ${C.teal};
  }
  .cp-eyebrow::before { content: ''; display: block; width: 28px; height: 2px; background: currentColor; }
  .cp-eyebrow--blue { color: ${C.blue}; }
  .cp-eyebrow--center { justify-content: center; }

  /* Module cards — teal left-wire on hover */
  .cp-mod-card {
    background: ${C.dark2}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 1.75rem; position: relative;
    transition: border-color 0.2s;
  }
  .cp-mod-card::after {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: ${C.teal}; border-radius: 12px 0 0 12px;
    transform: scaleY(0); transform-origin: top;
    transition: transform 0.25s ease;
  }
  .cp-mod-card:hover { border-color: rgba(0,180,160,0.3); }
  .cp-mod-card:hover::after { transform: scaleY(1); }

  /* Screenshot image zoom */
  .cp-ss-img { transition: transform 0.55s ease; width: 100%; height: 100%; object-fit: cover; display: block; }
  .cp-ss-wrap:hover .cp-ss-img { transform: scale(1.04); }

  /* Highlight items */
  .cp-hl-item {
    display: flex; align-items: flex-start; gap: 0.875rem;
    padding: 0.9rem 0; border-bottom: 1px solid ${C.border};
    font-size: 0.9rem; color: #CBD5E0; line-height: 1.6;
  }
  .cp-hl-item:first-of-type { border-top: 1px solid ${C.border}; }

  .cp-btn-teal {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.teal}; color: #fff;
    font-weight: 700; font-size: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.9rem 2rem; border-radius: 4px; text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .cp-btn-teal:hover { background: ${C.tealD}; transform: translateY(-1px); }

  .cp-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #fff;
    font-weight: 600; font-size: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.9rem 2rem; border-radius: 4px;
    border: 1px solid ${C.border}; text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .cp-btn-outline:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }
`;

const modules = [
  { icon: <ClipboardList size={22} color="#00B4A0" />, title: "Order Processing", description: "Orders flow seamlessly from waiter to kitchen to dispatch, with real-time status updates at every station so nothing gets missed or delayed." },
  { icon: <Monitor size={22} color="#00B4A0" />, title: "POS Till", description: "A fast, reliable point-of-sale system for dine-in and takeaway, handling payments, receipts, and order splitting with ease." },
  { icon: <UtensilsCrossed size={22} color="#00B4A0" />, title: "Takeaway Management", description: "Dedicated workflows for takeaway orders, keeping front-of-house and kitchen teams in sync for fast turnaround." },
  { icon: <Boxes size={22} color="#00B4A0" />, title: "Raw Material Inventory", description: "Track raw material stock levels in real time, with automatic deductions as orders are processed and alerts for low stock." },
  { icon: <Users size={22} color="#00B4A0" />, title: "Payroll & Staff Management", description: "Manage staff records, shifts, advances, and payroll calculations — all integrated with attendance and operational data." },
];

const highlights = [
  "Real-time order tracking from waiter to kitchen to dispatch",
  "Integrated POS for dine-in and takeaway transactions",
  "Live raw material inventory with stock alerts",
  "Staff payroll, advances, and shift management",
  "Multi-station visibility for managers",
  "Designed for busy restaurant and takeaway environments",
];

function TealCheck() {
  return (
    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,180,160,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.5l2.5 2.5 4.5-5" stroke="#00B4A0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function RestAssurePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ fontFamily: "var(--font-body)" }}>

        {/* ── HERO ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,5vw,4rem) clamp(1.5rem,5vw,4rem) clamp(3.5rem,6vw,5rem)", position: "relative", overflow: "hidden" }}>
          {/* Teal glow — distinct from the blue power pages */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,180,160,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center" }}>
            <div>
              {/* Software product badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,180,160,0.12)", border: "1px solid rgba(0,180,160,0.25)", borderRadius: "99px", padding: "0.3rem 0.875rem", marginBottom: "1.25rem" }}>
                <Monitor size={13} color={C.teal} />
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.teal }}>Restaurant Software</span>
              </div>

              <h1 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.9rem,4.56vw,3.42rem)", lineHeight: 0.95, textTransform: "uppercase", color: "#fff" }}>
                Rest<span style={{ color: C.teal }}>Assure</span>
              </h1>
              <p style={{ marginTop: "1rem", fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 600, color: C.teal, letterSpacing: "0.02em" }}>
                The Silent Manager Behind Every Great Restaurant
              </p>
              <p style={{ marginTop: "1rem", color: C.muted, fontSize: "clamp(0.95rem,1.4vw,1.05rem)", maxWidth: "52ch", lineHeight: 1.8 }}>
                A complete restaurant management platform connecting your front-of-house, kitchen, and back-office — from the first order to the final payslip.
              </p>
            </div>

            {/* Icon mark — desktop only */}
            <div style={{ width: "96px", height: "96px", background: "rgba(0,180,160,0.1)", border: "1px solid rgba(0,180,160,0.2)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Monitor size={44} color={C.teal} />
            </div>
          </div>
        </section>

        {/* ── DASHBOARD OVERVIEW IMAGE ── */}
        <section style={{ background: C.cream, padding: "2rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="cp-ss-wrap" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", borderRadius: "12px", border: `1.5px solid #D1D9E0`, background: "#E2E8F0" }}>
              <img src={dashboardImg} alt="RestAssure dashboard" loading="lazy" className="cp-ss-img" width={1200} height={675} />
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span className="cp-eyebrow cp-eyebrow--center">Everything in one system</span>
              <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginTop: "0.6rem" }}>
                What's included
              </h2>
              <p style={{ marginTop: "1rem", color: C.muted, maxWidth: "44ch", margin: "1rem auto 0", fontSize: "0.9rem", lineHeight: 1.75 }}>
                Five integrated modules that cover every part of your restaurant operation.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {modules.map((mod) => (
                <div key={mod.title} className="cp-mod-card">
                  <div style={{ width: "44px", height: "44px", background: C.teal10, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    {mod.icon}
                  </div>
                  <h3 className="cp-display" style={{ fontWeight: 800, fontSize: "1.14rem", textTransform: "uppercase", color: "#fff" }}>{mod.title}</h3>
                  <p style={{ marginTop: "0.6rem", fontSize: "0.875rem", color: C.muted, lineHeight: 1.75 }}>{mod.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCREENSHOTS ── */}
        <section style={{ background: C.cream, padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span className="cp-eyebrow cp-eyebrow--center">See it in action</span>
              <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem" }}>
                Built for busy kitchens
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5px", background: "#D1D9E0", border: "1.5px solid #D1D9E0", borderRadius: "12px", overflow: "hidden" }}>
              <div className="cp-ss-wrap" style={{ aspectRatio: "16/9", overflow: "hidden", background: "#E2E8F0" }}>
                <img src={posImg} alt="RestAssure POS till" loading="lazy" className="cp-ss-img" width={800} height={450} />
              </div>
              <div className="cp-ss-wrap" style={{ aspectRatio: "16/9", overflow: "hidden", background: "#E2E8F0" }}>
                <img src={tablesImg} alt="RestAssure table management" loading="lazy" className="cp-ss-img" width={800} height={450} />
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES ── */}
        <section className="cp-on-dark" style={{ background: C.dark2, padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span className="cp-eyebrow cp-eyebrow--blue cp-eyebrow--center">Key features</span>
              <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.9rem,3.8vw,2.66rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginTop: "0.6rem" }}>
                Everything you need
              </h2>
            </div>
            <div>
              {highlights.map((h) => (
                <div key={h} className="cp-hl-item">
                  <TealCheck />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "2.5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,180,160,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span className="cp-eyebrow cp-eyebrow--center">Ready to streamline?</span>
            <h2 className="cp-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginTop: "0.6rem" }}>
              Let's set up<br />your restaurant
            </h2>
            <p style={{ marginTop: "1.25rem", color: C.muted, fontSize: "0.95rem", maxWidth: "44ch", margin: "1.25rem auto 0", lineHeight: 1.75 }}>
              Get in touch to discuss how RestAssure can be set up for your restaurant, takeaway, or multi-branch operation.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {/* Routes UNCHANGED */}
              <Link to="/contact" className="cp-btn-teal">
                Request a Demo <ArrowRight size={14} />
              </Link>
              <Link to="/products" className="cp-btn-outline">
                Back to Products
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
