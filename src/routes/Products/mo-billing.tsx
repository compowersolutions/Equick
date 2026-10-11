import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt, FileText, BarChart2, PenLine, ShoppingCart, WifiOff, ArrowRight, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/Products/mo-billing")({
  head: () => ({
    meta: [
      { title: "MO Billing — Invoice & Business Management | ComPower Africa" },
      {
        name: "description",
        content:
          "MO Billing is an all-in-one invoicing, payment tracking, and delivery management app built for Botswana businesses.",
      },
      { property: "og:title", content: "MO Billing — Run Your Business From Your Pocket" },
      {
        property: "og:description",
        content: "Invoice smarter. Get paid faster. Built for Botswana businesses.",
      },
    ],
  }),
  component: MOBillingPage,
});

const modules = [
  {
    icon: <Receipt className="h-6 w-6 text-teal-500" />,
    title: "Instant Invoicing",
    description:
      "Auto-numbered invoices in BWP. Add items, quantities and prices. Save and share via WhatsApp or email in seconds.",
  },
  {
    icon: <FileText className="h-6 w-6 text-teal-500" />,
    title: "Delivery Notes",
    description:
      "Create digital delivery notes on your phone. The recipient signs on screen with their finger — fully paperless.",
  },
  {
    icon: <PenLine className="h-6 w-6 text-teal-500" />,
    title: "Payments & Receipts",
    description:
      "Record payments against invoices. Generate Cash Receipt Vouchers (CRV) as shareable images. Track outstanding balances per customer.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-teal-500" />,
    title: "Custom Reports",
    description:
      "Harvest vs Sold bar charts, product-wise pie charts, sales by customer and salesman — all in one tap.",
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-teal-500" />,
    title: "Purchases & Stock",
    description:
      "Log purchases and raw material stock. Auto-deduct from inventory when invoices are saved. See live stock balance at any time.",
  },
  {
    icon: <WifiOff className="h-6 w-6 text-teal-500" />,
    title: "Works Offline",
    description:
      "No signal in the field? No problem. The app works fully offline and syncs automatically when you reconnect.",
  },
];

const highlights = [
  "Create and share invoices instantly via WhatsApp or email",
  "Digital delivery notes with on-screen finger signature",
  "Cash Receipt Voucher (CRV) generation as shareable image",
  "Send statements and track outstanding balances per customer",
  "Custom reports: bar charts, pie charts, salesman and client summaries",
  "Add purchases and manage raw material inventory",
  "Works offline — syncs when reconnected",
  "Built for Botswana businesses in BWP",
];

const stats = [
  { value: "100%", label: "Paperless signing" },
  { value: "BWP", label: "Local currency" },
  { value: "Offline", label: "Field-ready" },
  { value: "Instant", label: "WhatsApp sharing" },
];

function MOBillingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-navy-800">
            <Receipt className="h-7 w-7 text-teal-500" />
          </div>
          <div className="mb-4 inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            🇧🇼 Proudly Botswana Built
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            MO Billing
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-teal-300 font-medium">
            Run Your Business From Your Pocket
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            The all-in-one billing, payment tracking, and delivery management app built for Botswana businesses —
            works offline, runs on any phone.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://billing-options-93799.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open App
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="py-6 text-center">
                <div className="text-2xl font-bold text-teal-400">{s.value}</div>
                <div className="mt-1 text-xs text-white/60 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 text-center mb-2">Features</p>
          <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl text-center">
            Everything Your Business Needs, in One App
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Built for farm-to-market businesses, traders, and small enterprises across Botswana.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <div key={mod.title} className="rounded-xl border border-border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50">
                  {mod.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{mod.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features list */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl text-center mb-10">
            What's Included
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">
            Ready to get organised?
          </h2>
          <p className="mt-4 text-navy-200">
            Join businesses across Botswana managing invoices, payments, and deliveries the modern way.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://billing-options-93799.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open App
              <ArrowRight className="h-4 w-4" />
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
