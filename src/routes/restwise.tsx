import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, ClipboardList, UtensilsCrossed, Boxes, Users, ArrowRight, CheckCircle, Download, ChevronLeft, ChevronRight } from "lucide-react";
import dashboardImg from "@/assets/restassure_dashboard.webp";
import posImg from "@/assets/restassure_pos.webp";
import tablesImg from "@/assets/restassure_tables.webp";
import restWiseFlyer from "@/assets/rest-wise-flyer.webp";
import posScreen from "@/assets/pos_screen_restwise.webp";
import androidScreen from "@/assets/android_screen_restwise.webp";
import appleScreen from "@/assets/apple_screen_restwise.webp";
import { useState, useEffect, useCallback } from "react";

export const Route = createFileRoute("/restwise")({
  head: () => ({
    meta: [
      { title: "RestWise — Restaurant Management System | ComPower Africa" },
      {
        name: "description",
        content:
          "RestWise is a complete restaurant management platform covering order processing, POS, takeaway, inventory, and payroll.",
      },
      { property: "og:title", content: "RestWise — The Silent Manager Behind Every Great Restaurant" },
      {
        property: "og:description",
        content: "Order processing, POS till, takeaway, inventory and payroll — all in one platform.",
      },
    ],
  }),
  component: RestWisePage,
});

const carouselSlides = [
  {
    src: posScreen,
    alt: "RestWise POS Screen",
    label: "POS Terminal",
    description: "Fast, intuitive point-of-sale for dine-in and takeaway",
  },
  {
    src: androidScreen,
    alt: "RestWise Android App",
    label: "Android",
    description: "Manage orders and staff from any Android device",
  },
  {
    src: appleScreen,
    alt: "RestWise iPhone App",
    label: "iPhone",
    description: "Full restaurant control in the palm of your hand",
  },
];

const modules = [
  {
    icon: <ClipboardList className="h-6 w-6 text-teal-500" />,
    title: "Order Processing",
    description:
      "Orders flow seamlessly from waiter to kitchen to dispatch, with real-time status updates at every station so nothing gets missed or delayed.",
  },
  {
    icon: <Monitor className="h-6 w-6 text-teal-500" />,
    title: "POS Till",
    description:
      "A fast, reliable point-of-sale system for dine-in and takeaway, handling payments, receipts, and order splitting with ease.",
  },
  {
    icon: <UtensilsCrossed className="h-6 w-6 text-teal-500" />,
    title: "Takeaway Management",
    description:
      "Dedicated workflows for takeaway orders, keeping front-of-house and kitchen teams in sync for fast turnaround.",
  },
  {
    icon: <Boxes className="h-6 w-6 text-teal-500" />,
    title: "Raw Material Inventory",
    description:
      "Track raw material stock levels in real time, with automatic deductions as orders are processed and alerts for low stock.",
  },
  {
    icon: <Users className="h-6 w-6 text-teal-500" />,
    title: "Payroll & Staff Management",
    description:
      "Manage staff records, shifts, advances, and payroll calculations — all integrated with attendance and operational data.",
  },
];

const highlights = [
  "Real-time order tracking from waiter to kitchen to dispatch",
  "Integrated POS for dine-in and takeaway transactions",
  "Live raw material inventory with stock alerts",
  "Staff payroll, advances, and shift management",
  "Multi-station visibility for managers",
  "Designed for busy restaurant and takeaway environments",
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % carouselSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative mt-10 overflow-hidden" style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}>
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 33.333}%)`, width: `${carouselSlides.length * 100}%` }}
      >
        {carouselSlides.map((slide, i) => (
          <div key={i} style={{ width: `${100 / carouselSlides.length}%` }} className="relative px-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-navy-800"
              style={{ aspectRatio: "21/9" }}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-900/80 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="inline-block rounded-full bg-teal-500/20 border border-teal-500/40 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-teal-300">
                  {slide.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10" aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-10" aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {carouselSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-teal-400" : "w-2 bg-white/30 hover:bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Device mockup components ─────────────────────────────────────────── */

function IPhoneMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative shadow-2xl"
        style={{
          width: 160,
          background: "#1a1a1a",
          borderRadius: "2.4rem",
          padding: "10px 8px 14px",
          border: "2px solid #3a3a3a",
          boxShadow: "0 0 0 1px #555, 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ width: 72, height: 22, background: "#000", borderRadius: 12, margin: "0 auto 6px" }} />
        <div style={{ borderRadius: "1.6rem", overflow: "hidden", aspectRatio: "9/19", background: "#fff" }}>
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 40, height: 4, background: "#444", borderRadius: 2 }} />
        </div>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">{label}</span>
    </div>
  );
}

function AndroidMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative shadow-2xl"
        style={{
          width: 160,
          background: "#1c1c1c",
          borderRadius: "1.8rem",
          padding: "14px 8px 16px",
          border: "2px solid #333",
          boxShadow: "0 0 0 1px #4a4a4a, 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, background: "#2a2a2a", borderRadius: "50%", border: "1.5px solid #444" }} />
          <div style={{ width: 28, height: 4, background: "#2a2a2a", borderRadius: 2 }} />
        </div>
        <div style={{ borderRadius: "1.2rem", overflow: "hidden", aspectRatio: "9/19", background: "#fff" }}>
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, paddingTop: 10 }}>
          <div style={{ width: 5, height: 5, background: "#555", borderRadius: "50%" }} />
          <div style={{ width: 16, height: 5, background: "#555", borderRadius: 3 }} />
          <div style={{ width: 5, height: 5, background: "#555", borderRadius: 1 }} />
        </div>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">{label}</span>
    </div>
  );
}

function POSTerminalMockup({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          background: "#141414",
          borderRadius: "1rem",
          padding: "12px 12px 10px",
          border: "2px solid #333",
          boxShadow: "0 0 0 1px #4a4a4a, 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
          width: 260,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a2a2a", border: "1.5px solid #444" }} />
          <div style={{ width: 40 }} />
        </div>
        <div style={{ borderRadius: "0.5rem", overflow: "hidden", aspectRatio: "16/10", background: "#0f1117" }}>
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 36, height: 4, background: "#2a2a2a", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ width: 16, height: 20, background: "#222", borderRadius: "0 0 4px 4px", marginTop: -2 }} />
      <div style={{ width: 80, height: 8, background: "#1a1a1a", borderRadius: "0 0 6px 6px", border: "1px solid #333" }} />
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 mt-1">{label}</span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

function RestWisePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="cp-hero pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Title block — centered */}
          <div className="text-center">
            
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
              RestWise
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-teal-300 font-medium">
              The Silent Manager Behind Every Great Restaurant
            </p>
            
          </div>

          {/* ── Carousel ── */}
          <HeroCarousel />

          {/* ── Device showcase ── */}
          <div className="mt-16 flex items-end justify-center gap-6 sm:gap-10">
            <div className="hidden sm:block translate-y-6">
              <AndroidMockup src={posImg} alt="RestWise POS on Android" label="Android" />
            </div>
            <div className="-translate-y-2">
              <POSTerminalMockup src={dashboardImg} alt="RestWise dashboard on POS terminal" label="POS Terminal" />
            </div>
            <div className="hidden sm:block translate-y-6">
              <IPhoneMockup src={tablesImg} alt="RestWise tables on iPhone" label="iPhone" />
            </div>
          </div>

          {/* Fade into next section */}
          <div
            className="pointer-events-none mt-0 h-16"
            style={{ background: "linear-gradient(to bottom, transparent, var(--background, #fff))" }}
          />
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl text-center">
            Everything Your Restaurant Needs, in One System
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <div key={mod.title} className="rounded-xl border border-border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
                  {mod.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{mod.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl text-center mb-10">
            Key Features
          </h2>
          <ul className="space-y-4">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                <span className="text-foreground">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">
            Ready to streamline your restaurant?
          </h2>
          <p className="mt-4 text-navy-200">
            Get in touch to discuss how RestWise can be set up for your restaurant, takeaway, or multi-branch operation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={restWiseFlyer}
              download="RestWise-Brochure.png"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-teal-600 px-8 py-3 text-sm font-semibold text-teal-300 transition-colors hover:bg-teal-900/40"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
