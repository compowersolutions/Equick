import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, ClipboardList, UtensilsCrossed, Boxes, Users, ArrowRight, CheckCircle, Download } from "lucide-react";
import dashboardImg from "@/assets/restassure_dashboard.jpg";
import posImg from "@/assets/restassure_pos.jpg";
import tablesImg from "@/assets/restassure_tables.jpg";
import restWiseFlyer from "@/assets/rest-wise-flyer.jpg";

export const Route = createFileRoute("/restwisebk")({
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
  component: RestAssurePage,
});

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

function RestAssurePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-navy-800">
            <Monitor className="h-7 w-7 text-teal-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            RestWise
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-teal-300 font-medium">
            The Silent Manager Behind Every Great Restaurant
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            A complete restaurant management platform connecting your front-of-house, kitchen, and back-office —
            from the first order to the final payslip.
          </p>
        </div>
      </section>

      {/* Overview image */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-navy-100 shadow-lg">
            <img
              src={dashboardImg}
              alt="RestWise dashboard"
              loading="lazy"
              className="h-full w-full object-cover object-top"
              width={2071}
              height={1435}
            />
          </div>
        </div>
      </section>

      {/* Modules */}
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

      {/* Screenshots */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground font-display sm:text-3xl text-center mb-12">
            See It In Action
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">

            {/* POS — phone frame */}
            <div className="flex flex-col items-center gap-3">
              {/* Phone shell */}
              <div className="relative w-[180px] rounded-[2rem] border-[6px] border-gray-800 bg-gray-800 shadow-2xl">
                {/* Speaker notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-gray-600 z-10" />
                {/* Screen */}
                <div className="overflow-hidden rounded-[1.4rem] aspect-[1/2] bg-white">
                  <img
                    src={posImg}
                    alt="RestWise POS till"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                    width={242}
                    height={479}
                  />
                </div>
                {/* Home bar */}
                <div className="flex justify-center py-1.5">
                  <div className="w-10 h-1 rounded-full bg-gray-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">POS Till</p>
            </div>

            {/* Tables — phone frame */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-[180px] rounded-[2rem] border-[6px] border-gray-800 bg-gray-800 shadow-2xl">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-gray-600 z-10" />
                <div className="overflow-hidden rounded-[1.4rem] aspect-[9/16] bg-white">
                  <img
                    src={tablesImg}
                    alt="RestWise tables & reservations"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                    width={750}
                    height={1334}
                  />
                </div>
                <div className="flex justify-center py-1.5">
                  <div className="w-10 h-1 rounded-full bg-gray-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Tables &amp; Reservations</p>
            </div>

          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 sm:py-20 bg-navy-50">
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">
            Ready to streamline your restaurant?
          </h2>
          <p className="mt-4 text-navy-200">
            Get in touch to discuss how RestWise can be set up for your restaurant, takeaway, or multi-branch
            operation.
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
