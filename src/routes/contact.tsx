import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ComPower Africa" },
      { name: "description", content: "Get in touch with ComPower Africa for quotes, support, and consultations." },
      { property: "og:title", content: "Contact — ComPower Africa" },
      { property: "og:description", content: "Get in touch with ComPower Africa." },
    ],
  }),
  component: ContactPage,
});

const contactDetails = [
  {
    icon: <Phone className="h-5 w-5 text-teal-500" />,
    label: "Phone",
    value: "+267 72732668",
  },
  {
    icon: <Mail className="h-5 w-5 text-teal-500" />,
    label: "Email",
    value: "highsystembotswana@gmail.com",
  },
  {
    icon: <MapPin className="h-5 w-5 text-teal-500" />,
    label: "Location",
    value: "Takatokwane Road, G-West, Gaborone, Botswana",
  },
  {
    icon: <Clock className="h-5 w-5 text-teal-500" />,
    label: "Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM",
  },
];

function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
            Contact us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            Have a question or need a quote? Reach out and our team will get back to you promptly.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                Send us a message
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fill in the form below and we'll respond within one business day.
              </p>
              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+267 72 732 668"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-foreground">
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a product...</option>
                    <option value="generators">Generators</option>
                    <option value="solar">Solar Systems</option>
                    <option value="rectifiers">Rectifiers</option>
                    <option value="multiple">Multiple products</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project or requirements..."
                    className="mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  Contact details
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Prefer to reach us directly? Use the information below.
                </p>
              </div>
              <div className="space-y-5">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-50">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {detail.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-navy-900 p-6 text-white">
                <h3 className="text-lg font-semibold font-display">Need urgent support?</h3>
                <p className="mt-2 text-sm text-navy-200">
                  For breakdowns and emergency call-outs, our technical team is on standby.
                </p>
                <a
                  href="tel:+26772732668"
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  <Phone className="h-4 w-4" />
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
