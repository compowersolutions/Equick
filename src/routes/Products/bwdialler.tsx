import { createFileRoute } from "@tanstack/react-router";
import { Phone, Zap, FileText, Download, CheckCircle, ArrowRight, Wifi } from "lucide-react";

export const Route = createFileRoute("/Products/bwdialler")({
  head: () => ({
    meta: [
      { title: "BWDialller — ComPower Africa" },
      { name: "description", content: "BWDialller saves your airtime through least cost routing on Mascom, Orange and BeMobile networks in Botswana." },
      { property: "og:title", content: "BWDialller — ComPower Africa" },
      { property: "og:description", content: "Save airtime by least cost routing on all major Botswana networks." },
    ],
  }),
  component: BWDiallerPage,
});

const APK_URL =
  "https://tqxbfsqwikmjobgniois.supabase.co/storage/v1/object/public/Public%20downloads/BWDialer.apk";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-teal-500" />,
    title: "Least Cost Routing",
    description:
      "Automatically selects the cheapest rate for every call based on the destination network, so you never overpay on airtime again.",
  },
  {
    icon: <Wifi className="h-6 w-6 text-teal-500" />,
    title: "All Major Networks",
    description:
      "Fully supports Mascom, Orange and BeMobile — Botswana's three main mobile networks — right out of the box with no manual setup.",
  },
  {
    icon: <FileText className="h-6 w-6 text-teal-500" />,
    title: "In-Call Notes",
    description:
      "Take notes while you are still on the call. Never lose a quote, reference number, or follow-up action because you had nothing to write with.",
  },
];

const highlights = [
  "Automatic network detection — no manual selection needed",
  "Works on all Android devices",
  "Lightweight: small download, low battery impact",
  "Simple interface designed for everyday users",
  "Free to download and use",
];

function BWDiallerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="cp-hero py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-6">
              <Phone className="h-8 w-8 text-teal-400" />
            </div>
            <span className="inline-block rounded-full bg-teal-500/10 border border-teal-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-4">
              Made for Botswana
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
              BWDialller
            </h1>
            <p className="mt-4 text-xl font-medium text-teal-400">Save Airtime</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-200 leading-relaxed">
              BWDialller saves your airtime by automatically routing every call through the
              cheapest available option on Mascom, Orange and BeMobile — with the added
              convenience of in-call notes so you never miss a detail.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={APK_URL}
                download="BWDialller.apk"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 shadow-lg shadow-teal-500/20"
              >
                <Download className="h-5 w-5" />
                Download APK (Android)
              </a>
              <p className="text-xs text-navy-400">Free · Android 6.0+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { value: "3", label: "Networks supported" },
              { value: "Free", label: "No cost to download" },
              { value: "Auto", label: "Routing — zero effort" },
            ].map((s) => (
              <div key={s.label} className="py-8 text-center">
                <p className="text-2xl font-bold text-foreground font-display">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-display">
              Everything you need, nothing you don't
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Designed to be simple, fast, and immediately useful for anyone making calls in Botswana.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 hover:border-teal-500/40 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-foreground font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-display">
              Stop overpaying on airtime
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In Botswana, calling across networks (on-net vs off-net) can cost significantly more.
              BWDialller detects who you are calling and routes through the least expensive option
              automatically — you just dial as normal.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  <span className="text-sm text-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative w-48">
              {/* Simple phone illustration */}
              <div className="rounded-3xl border-4 border-navy-800 bg-navy-900 p-3 shadow-2xl">
                <div className="rounded-2xl bg-navy-950 overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-4 py-2 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <Wifi className="h-3 w-3" />
                      <Phone className="h-3 w-3" />
                    </div>
                  </div>
                  {/* App screen mockup */}
                  <div className="bg-navy-900 px-4 py-8 text-center">
                    <div className="mx-auto h-14 w-14 rounded-full bg-teal-500/20 flex items-center justify-center mb-3">
                      <Phone className="h-7 w-7 text-teal-400" />
                    </div>
                    <p className="text-xs font-bold text-white">BWDialller</p>
                    <p className="text-xs text-teal-400 mt-1">Save Airtime</p>
                    <div className="mt-6 space-y-2">
                      <div className="rounded bg-navy-800 px-3 py-2 text-left">
                        <p className="text-xs text-navy-300">Last call</p>
                        <p className="text-xs text-white font-medium">Mascom → Saved 12t</p>
                      </div>
                      <div className="rounded bg-teal-500/10 border border-teal-500/20 px-3 py-2 text-center">
                        <p className="text-xs text-teal-400 font-semibold">Auto routing ON</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Home button */}
                <div className="mt-3 mx-auto h-8 w-8 rounded-full border-2 border-navy-700 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-sm border border-navy-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">
            Download BWDialller free today
          </h2>
          <p className="mt-4 text-navy-200">
            Install the APK on your Android phone and start saving airtime from your very first call.
            No sign-up required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={APK_URL}
              download="BWDialller.apk"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              <Download className="h-5 w-5" />
              Download APK
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-200 hover:text-white transition-colors"
            >
              Questions? Contact us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-navy-400">
            Android only · APK file · Enable "Install from unknown sources" in your device settings
          </p>
        </div>
      </section>
    </div>
  );
}
