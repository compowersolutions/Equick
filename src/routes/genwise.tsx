import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, BellRing, Power, History, Signal, ShieldCheck, Cpu, RadioTower, Cloud, Smartphone, ArrowRight, ChevronDown,
} from "lucide-react";
import fleetImg from "@/assets/genwise-fleet.webp";
import siteImg from "@/assets/genwise-site.webp";
import historyImg from "@/assets/genwise-history.webp";
import phoneFleetImg from "@/assets/genwise-phone-fleet.webp";
import phoneSiteImg from "@/assets/genwise-phone-site.webp";
import logoImg from "@/assets/genwise-logo-stacked-dark.svg";

export const Route = createFileRoute("/genwise")({
  head: () => ({
    meta: [
      { title: "GenWise — Remote Generator Monitoring and Control | ComPower Africa" },
      { name: "description", content: "GenWise lets you monitor and control your standby generators from anywhere: live readings, alarms on your phone, remote start and stop. Works with DSE controllers, including sites moving from the DSE890." },
      { property: "og:title", content: "GenWise — Know what every generator is doing" },
      { property: "og:description", content: "Live readings, alarms on your phone and remote start/stop for DSE-controlled generators across Botswana." },
    ],
  }),
  component: GenWisePage,
});

// GenWise uses the brand blue of its own wordmark ("Gen" #4A72B6), lighter on dark backgrounds.
const C = {
  dark: "#0C1018",
  dark2: "#111827",
  border: "#232F45",
  blue: "#4A72B6",
  blueL: "#7D9DE0",
  blueD: "#3A5E9C",
  blue10: "rgba(74,114,182,0.12)",
  muted: "#94A3B8",
  textSm: "#5B6A80",
  cream: "#F8F7F4",
  divider: "#D1D9E0",
} as const;

const STYLES = `
  .gw-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }
  .gw-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: ${C.blueL};
  }
  .gw-eyebrow::before { content: ''; display: block; width: 28px; height: 2px; background: currentColor; }
  .gw-eyebrow--light { color: ${C.blue}; }
  .gw-eyebrow--center { justify-content: center; }

  .gw-btn {
    display: inline-flex; align-items: center; gap: 8px; background: ${C.blue}; color: #fff;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.9rem 1.9rem; border-radius: 4px; text-decoration: none; transition: background 0.2s, transform 0.15s;
  }
  .gw-btn:hover { background: ${C.blueD}; transform: translateY(-1px); }
  .gw-btn-outline {
    display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff;
    font-weight: 600; font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase;
    padding: 0.9rem 1.9rem; border-radius: 4px; border: 1px solid ${C.border}; text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .gw-btn-outline:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }

  .gw-card {
    background: ${C.dark2}; border: 1px solid ${C.border}; border-radius: 12px; padding: 1.6rem; position: relative;
    transition: border-color 0.2s;
  }
  .gw-card:hover { border-color: rgba(125,157,224,0.35); }

  .gw-shot { border-radius: 12px; overflow: hidden; border: 1px solid ${C.border}; background: #111; box-shadow: 0 20px 60px rgba(0,0,0,0.35); }
  .gw-shot img { width: 100%; height: auto; display: block; }

  .gw-steps { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 1rem; align-items: stretch; }
  .gw-arrow { display: flex; align-items: center; justify-content: center; color: ${C.blue}; }
  .gw-phones { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; max-width: 520px; margin: 0 auto; }
  .gw-split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 3rem; align-items: center; }

  .gw-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; background: #fff; }
  .gw-table th, .gw-table td { text-align: left; padding: 0.85rem 1rem; border-bottom: 1px solid ${C.divider}; vertical-align: top; }
  .gw-table thead th { background: ${C.dark}; color: #fff; font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; }
  .gw-table tbody td:first-child { color: ${C.textSm}; font-weight: 600; }
  .gw-table tbody td:nth-child(2) { color: #0C1018; font-weight: 600; }
  .gw-table tbody td:nth-child(3) { color: ${C.textSm}; }

  @media (max-width: 900px) {
    .gw-steps { grid-template-columns: 1fr; }
    .gw-arrow { transform: rotate(90deg); }
    .gw-split { grid-template-columns: 1fr; gap: 2rem; }
  }
  @media (max-width: 640px) {
    .gw-hero-actions { flex-direction: column; align-items: stretch; }
    .gw-table th, .gw-table td { padding: 0.7rem 0.6rem; font-size: 0.82rem; }
  }
`;

const features = [
  { icon: <Activity size={22} color={C.blueL} />, title: "Live readings", text: "Engine speed, oil pressure, temperatures, fuel, battery, load, voltages and currents, updated every few seconds." },
  { icon: <BellRing size={22} color={C.blueL} />, title: "Alarms on your phone", text: "Shutdowns, warnings and lost communication arrive as phone notifications and email, with the full alarm history kept." },
  { icon: <Power size={22} color={C.blueL} />, title: "Remote control", text: "Start, stop, Auto and Manual from the website or phone. Each command needs typed confirmation and is recorded with who sent it." },
  { icon: <History size={22} color={C.blueL} />, title: "History and trends", text: "Charts of load, fuel, battery, temperature and mains voltage from the last hour up to 30 days, plus run hours, starts and kWh." },
  { icon: <Signal size={22} color={C.blueL} />, title: "Built for patchy networks", text: "Two SIM cards, automatic recovery when the connection hangs, and readings stored on site during an outage, then sent." },
  { icon: <ShieldCheck size={22} color={C.blueL} />, title: "Secure by design", text: "Encrypted connections end to end, a separate login for every gateway, and viewer, operator and administrator roles." },
];

const steps = [
  { icon: <Cpu size={26} color={C.blueL} />, title: "Your DSE controller", text: "The generator's existing DSE controller, for example a DSE7320 MKII. Nothing changes in how it protects the engine." },
  { icon: <RadioTower size={26} color={C.blueL} />, title: "GenWise Gateway", text: "A compact industrial 4G gateway wired to the controller. It reads the generator every few seconds and carries out remote commands." },
  { icon: <Cloud size={26} color={C.blueL} />, title: "GenWise", text: "Your whole fleet on one website and on your phone: live status, alarms, history and remote control." },
];

const comparison: [string, string, string][] = [
  ["SIM cards", "Two, with automatic switch-over", "One"],
  ["When the connection hangs", "Checks the internet link and restarts it or the gateway itself", "Reconnects to its server; no internet check or modem restart described"],
  ["Remote reset by SMS", "Yes", "Not described"],
  ["Readings during a network outage", "Stored on site and sent when the link returns", "Not specified"],
  ["Firmware updates", "Remotely, for the whole fleet at once", "On site, from a USB memory stick"],
  ["Gateway price", "Roughly a third to half the price", "Higher; 4G/GPS antenna sold separately"],
];

const faqs = [
  {
    q: "Which generators does GenWise work with?",
    a: "Generators with Deep Sea Electronics (DSE) controllers. GenWise is built and tested for the DSE7320 MKII; ask us about other DSE models.",
  },
  {
    q: "We already use DSE890 gateways. Do we have to replace them?",
    a: "Not necessarily. A DSE890 MKII can connect to GenWise through its MQTT feature and stay connected to DSEWebNet at the same time. The original DSE890 (MKI) cannot connect to GenWise, so those sites get a GenWise Gateway instead.",
  },
  {
    q: "What happens when the mobile network drops?",
    a: "The GenWise Gateway can switch to its second SIM, checks its own connection and restarts it when needed, and keeps the readings taken during the outage so the history has no gaps once it reconnects.",
  },
  {
    q: "How much mobile data does it use?",
    a: "About 50 to 150 MB per site per month, depending on how often readings are sent.",
  },
  {
    q: "Is remote start and stop safe?",
    a: "Only users with operator rights can send commands, every start, stop or mode change must be confirmed by typing the site name, and each command is recorded with the user and time. The generator's own controller still applies all its protections.",
  },
  {
    q: "Is there a phone app?",
    a: "GenWise works in any phone browser today. An Android app with push notifications is coming to Google Play.",
  },
  {
    q: "Can we try it before committing?",
    a: "Yes. We recommend starting with one site, usually the one that gives the most trouble, and comparing it with your other sites for a few weeks before a wider roll-out.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 11 11" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: "4px" }}>
      <path d="M2 5.5l2.5 2.5 4.5-5" stroke={C.blueL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GenWisePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ fontFamily: "var(--font-body)" }}>

        {/* ── HERO ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem) clamp(3rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(74,114,182,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.blue10, border: "1px solid rgba(125,157,224,0.3)", borderRadius: "99px", padding: "0.3rem 0.875rem", marginBottom: "1.25rem" }}>
              <Activity size={13} color={C.blueL} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blueL }}>Generator monitoring</span>
            </div>
            <h1 style={{ margin: 0 }}>
              <img src={logoImg} alt="GenWise" style={{ height: "clamp(84px, 11vw, 132px)", width: "auto", display: "block" }} />
            </h1>
            <p style={{ marginTop: "1rem", fontSize: "clamp(1.05rem,2vw,1.35rem)", fontWeight: 600, color: "#fff" }}>
              Know what every generator is doing, from anywhere.
            </p>
            <p style={{ marginTop: "0.9rem", color: C.muted, fontSize: "clamp(0.95rem,1.4vw,1.05rem)", maxWidth: "58ch", lineHeight: 1.8 }}>
              Live readings, alarms on your phone and remote start and stop for your standby generators, built for sites where the mobile network is not always reliable.
            </p>
            <div className="gw-hero-actions" style={{ marginTop: "2rem", display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <Link to="/contact" className="gw-btn">Request a demo <ArrowRight size={14} /></Link>
              <a href="#dse890" className="gw-btn-outline">Moving from DSE890?</a>
            </div>
            <div className="gw-shot" style={{ marginTop: "2.75rem" }}>
              <img src={fleetImg} alt="GenWise fleet overview showing four generator sites with status, load, fuel and battery" width={1600} height={733} />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ background: C.cream, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="gw-eyebrow gw-eyebrow--light gw-eyebrow--center">How it works</span>
              <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem" }}>
                From the controller to your phone
              </h2>
            </div>
            <div className="gw-steps">
              {steps.map((s, i) => (
                <Fragment key={s.title}>
                  <div style={{ background: "#fff", border: `1px solid ${C.divider}`, borderRadius: "12px", padding: "1.6rem" }}>
                    <div style={{ width: "48px", height: "48px", background: C.dark, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>{s.icon}</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue }}>Step {i + 1}</div>
                    <h3 className="gw-display" style={{ fontWeight: 800, fontSize: "1.15rem", textTransform: "uppercase", color: C.dark, marginTop: "0.3rem" }}>{s.title}</h3>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.88rem", color: C.textSm, lineHeight: 1.7 }}>{s.text}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="gw-arrow" aria-hidden><ArrowRight size={26} /></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="gw-eyebrow gw-eyebrow--center">What you get</span>
              <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginTop: "0.6rem" }}>
                Every site, one screen
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {features.map((f) => (
                <div key={f.title} className="gw-card">
                  <div style={{ width: "44px", height: "44px", background: C.blue10, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem" }}>{f.icon}</div>
                  <h3 className="gw-display" style={{ fontWeight: 800, fontSize: "1.1rem", textTransform: "uppercase", color: "#fff" }}>{f.title}</h3>
                  <p style={{ marginTop: "0.55rem", fontSize: "0.875rem", color: C.muted, lineHeight: 1.75 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCREENS ── */}
        <section className="cp-on-dark" style={{ background: C.dark2, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "3.5rem" }}>
            <div className="gw-split">
              <div>
                <span className="gw-eyebrow">Each site in detail</span>
                <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.4rem,2.6vw,2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginTop: "0.6rem" }}>
                  Readings and control together
                </h2>
                <p style={{ marginTop: "0.9rem", color: C.muted, fontSize: "0.92rem", lineHeight: 1.8 }}>
                  See the engine, generator output and mains supply at a glance, with active alarms and the remote control panel beside them.
                </p>
              </div>
              <div className="gw-shot"><img src={siteImg} alt="GenWise site page with engine, generator and mains readings and the remote control panel" loading="lazy" width={1600} height={616} /></div>
            </div>
            <div className="gw-split">
              <div className="gw-shot"><img src={historyImg} alt="GenWise history charts of generator power, engine speed, fuel, battery, coolant temperature and mains voltage" loading="lazy" width={1600} height={593} /></div>
              <div>
                <span className="gw-eyebrow">History</span>
                <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.4rem,2.6vw,2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginTop: "0.6rem" }}>
                  See what happened overnight
                </h2>
                <p style={{ marginTop: "0.9rem", color: C.muted, fontSize: "0.92rem", lineHeight: 1.8 }}>
                  Every power cut, start and fuel drop on a timeline, from the last hour to the last 30 days.
                </p>
              </div>
            </div>
            <div className="gw-split">
              <div>
                <span className="gw-eyebrow">On your phone</span>
                <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.4rem,2.6vw,2rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginTop: "0.6rem" }}>
                  The whole fleet in your pocket
                </h2>
                <p style={{ marginTop: "0.9rem", color: C.muted, fontSize: "0.92rem", lineHeight: 1.8 }}>
                  The same information and controls on a phone, with an alarm badge and notifications when something needs attention.
                </p>
                <p style={{ marginTop: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", color: C.blueL, fontSize: "0.85rem", fontWeight: 600 }}>
                  <Smartphone size={16} /> Android app coming soon to Google Play
                </p>
              </div>
              <div className="gw-phones">
                <div className="gw-shot" style={{ borderRadius: "22px" }}><img src={phoneFleetImg} alt="GenWise on a phone: fleet overview" loading="lazy" width={780} height={1688} /></div>
                <div className="gw-shot" style={{ borderRadius: "22px" }}><img src={phoneSiteImg} alt="GenWise on a phone: site readings" loading="lazy" width={780} height={1688} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DSE890 ── */}
        <section id="dse890" style={{ background: C.cream, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)", scrollMarginTop: "4rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <span className="gw-eyebrow gw-eyebrow--light">For DSE890 users</span>
            <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem" }}>
              Moving from the DSE890
            </h2>
            <p style={{ marginTop: "1rem", color: C.textSm, fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "70ch" }}>
              If your DSE890 gateways drop their connection, need site visits for updates, or leave gaps in your data, the GenWise Gateway is built to deal with exactly that. You can move one site at a time, and GenWise shows both kinds of gateway side by side.
            </p>
            <div style={{ marginTop: "1.75rem", overflowX: "auto", borderRadius: "12px", border: `1px solid ${C.divider}` }}>
              <table className="gw-table">
                <thead>
                  <tr><th style={{ width: "28%" }}></th><th>GenWise Gateway</th><th>DSE890 MKII</th></tr>
                </thead>
                <tbody>
                  {comparison.map(([label, ours, theirs]) => (
                    <tr key={label}><td>{label}</td><td>{ours}</td><td>{theirs}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: "0.7rem", fontSize: "0.75rem", color: C.textSm }}>
              DSE890 MKII details from Deep Sea Electronics' DSE890 MKII operator manual (057-304, issue 4).
            </p>
            <div style={{ marginTop: "1.75rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {[
                ["Have a DSE890 MKII?", "It can connect to GenWise as it is, alongside DSEWebNet. Replace it later where dropouts are a problem."],
                ["Have an original DSE890?", "It cannot connect to GenWise. The GenWise Gateway replaces it and connects to the same controller."],
                ["Start with one site", "Try GenWise at your most troublesome site for a few weeks and compare it with the rest before deciding."],
              ].map(([title, text]) => (
                <div key={title} style={{ background: "#fff", border: `1px solid ${C.divider}`, borderRadius: "12px", padding: "1.25rem 1.4rem", display: "flex", gap: "0.7rem" }}>
                  <Check />
                  <div>
                    <div style={{ fontWeight: 700, color: C.dark, fontSize: "0.95rem" }}>{title}</div>
                    <p style={{ marginTop: "0.3rem", color: C.textSm, fontSize: "0.86rem", lineHeight: 1.7 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: "#fff", padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <span className="gw-eyebrow gw-eyebrow--light">FAQ</span>
            <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: C.dark, lineHeight: 1, marginTop: "0.6rem", marginBottom: "1.5rem" }}>
              Questions about GenWise
            </h2>
            <div className="divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.95rem] font-semibold text-navy-950 hover:text-brand">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-navy-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="-mt-1 pb-4 text-sm leading-relaxed text-navy-500">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </section>

        {/* ── CTA ── */}
        <section className="cp-on-dark" style={{ background: C.dark, padding: "clamp(3rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(74,114,182,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
            <span className="gw-eyebrow gw-eyebrow--center">See it on your generators</span>
            <h2 className="gw-display" style={{ fontWeight: 900, fontSize: "clamp(1.52rem,3.04vw,2.28rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginTop: "0.6rem" }}>
              Book a GenWise demo
            </h2>
            <p style={{ marginTop: "1.1rem", color: C.muted, fontSize: "0.95rem", lineHeight: 1.75 }}>
              Tell us how many generators you have and which controllers they use. We will show you GenWise and suggest a site to start with.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/contact" className="gw-btn">Request a demo <ArrowRight size={14} /></Link>
              <Link to="/products" className="gw-btn-outline">All products</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
