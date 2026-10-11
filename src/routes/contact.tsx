import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { submitEnquiry } from "@/lib/api/enquiries.functions";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/PageHero";
import { MapEmbed } from "@/components/MapEmbed";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ComPower Africa" },
      { name: "description", content: "Get in touch with ComPower Africa for quotes, support, and consultations." },
      { property: "og:title", content: "Contact — ComPower Africa" },
      { property: "og:description", content: "Get in touch with ComPower Africa." },
    ],
  }),
  // Lets other pages (e.g. the generator sizing tool) pre-fill the form
  validateSearch: (search: Record<string, unknown>): { interest?: string; message?: string } => ({
    interest: typeof search.interest === "string" ? search.interest.slice(0, 60) : undefined,
    message: typeof search.message === "string" ? search.message.slice(0, 4000) : undefined,
  }),
  component: ContactPage,
});

const contactDetails = [
  {
    icon: <Phone className="h-5 w-5 text-teal-500" />,
    label: "Phone",
    value: "+267 72732668",
    href: "tel:+26772732668",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-teal-500" />,
    label: "WhatsApp",
    value: "+267 72732668",
    href: whatsappLink(),
  },
  {
    icon: <Mail className="h-5 w-5 text-teal-500" />,
    label: "Email",
    value: "highsystembotswana@gmail.com",
    href: "mailto:highsystembotswana@gmail.com",
  },
  {
    icon: <MapPin className="h-5 w-5 text-teal-500" />,
    label: "Location",
    value: "Takatokwane Road, G-West, Gaborone, Botswana",
    href: "https://www.google.com/maps/search/?api=1&query=Takatokwane+Road+G-West+Gaborone+Botswana",
  },
  {
    icon: <Clock className="h-5 w-5 text-teal-500" />,
    label: "Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM",
    href: null,
  },
];

const interestLabels: Record<string, string> = {
  generators: "Generators",
  solar: "Solar Systems",
  rectifiers: "Rectifiers",
  software: "Software (RestWise / MO Billing / BW Dialer)",
  maintenance: "Maintenance / service contract",
  multiple: "Multiple products",
  other: "Other / Not sure",
};

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type FormState = { name: string; email: string; phone: string; interest: string; message: string; website: string };
const emptyForm: FormState = { name: "", email: "", phone: "", interest: "", message: "", website: "" };

function buildWhatsAppMessage(f: FormState) {
  return [
    "*New enquiry from website*",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`,
    f.interest && `Interested in: ${interestLabels[f.interest] ?? f.interest}`,
    `Message: ${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function ContactPage() {
  const submitFn = useServerFn(submitEnquiry);
  const prefill = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    interest: prefill.interest && prefill.interest in interestLabels ? prefill.interest : "",
    message: prefill.message ?? "",
  });
  const [sent, setSent] = useState<FormState | null>(null);

  const mutation = useMutation({
    mutationFn: (f: FormState) =>
      submitFn({
        data: {
          name: f.name,
          email: f.email,
          phone: f.phone || undefined,
          interest: f.interest || undefined,
          message: f.message,
          website: f.website || undefined,
        },
      }),
    onSuccess: (_res, f) => {
      setSent(f);
      setForm(emptyForm);
    },
  });

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <PageHero eyebrow="Get in touch" title="Talk to" highlight="our engineers">
        Have a question or need a quote? Reach out and our team will get back to you promptly.
      </PageHero>

      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 [&>*]:min-w-0">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                Send us a message
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fill in the form below and we'll respond within one business day.
              </p>

              {sent ? (
                <div className="mt-8 rounded-xl border border-teal-500/30 bg-teal-500/5 p-6">
                  <CheckCircle className="h-8 w-8 text-teal-500" />
                  <h3 className="mt-3 text-lg font-semibold text-foreground font-display">
                    Thank you, {sent.name.split(" ")[0]} — your message has been received.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our team will contact you within one business day. Want a faster reply? Send the same
                    message to us on WhatsApp.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={whatsappLink(buildWhatsAppMessage(sent))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-[#1EBE5A]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Also send on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSent(null)}
                      className="inline-flex items-center rounded-md border border-input px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate(form);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground">
                        Full name
                      </label>
                      <input id="name" type="text" required maxLength={120} autoComplete="name"
                        placeholder="John Smith" value={form.name} onChange={update("name")} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        Email address
                      </label>
                      <input id="email" type="email" required maxLength={200} autoComplete="email"
                        placeholder="john@company.com" value={form.email} onChange={update("email")} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                      Phone / WhatsApp number
                    </label>
                    <input id="phone" type="tel" maxLength={40} autoComplete="tel"
                      placeholder="+267 7X XXX XXX" value={form.phone} onChange={update("phone")} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-foreground">
                      I'm interested in
                    </label>
                    <select id="interest" value={form.interest} onChange={update("interest")} className={inputClass}>
                      <option value="">Select a product...</option>
                      {Object.entries(interestLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea id="message" rows={4} required maxLength={4000}
                      placeholder="Tell us about your project or requirements..."
                      value={form.message} onChange={update("message")} className={inputClass} />
                  </div>

                  {/* Honeypot field — hidden from people, filled in by spam bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" type="text" tabIndex={-1} autoComplete="off"
                      value={form.website} onChange={update("website")} />
                  </div>

                  {mutation.isError && (
                    <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                      Sorry, your message could not be sent. Please try again, or{" "}
                      <a href={whatsappLink(buildWhatsAppMessage(form))} target="_blank" rel="noopener noreferrer"
                        className="font-semibold underline">
                        send it on WhatsApp
                      </a>{" "}
                      instead.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    We use your details only to respond to your enquiry. See our{" "}
                    <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                  </p>
                </form>
              )}
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
                {contactDetails.map((detail) => {
                  const body = (
                    <>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-50">
                        {detail.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-foreground [overflow-wrap:anywhere]">{detail.value}</p>
                      </div>
                    </>
                  );
                  const cardClass = "flex items-start gap-4 rounded-lg border border-border bg-card p-4";
                  return detail.href ? (
                    <a
                      key={detail.label}
                      href={detail.href}
                      {...(detail.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${cardClass} transition-colors hover:border-teal-500/50 hover:bg-muted/50`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={detail.label} className={cardClass}>
                      {body}
                    </div>
                  );
                })}
              </div>

              <MapEmbed />

              <div className="rounded-xl bg-navy-900 p-6 text-white">
                <h3 className="text-lg font-semibold font-display">Need urgent support?</h3>
                <p className="mt-2 text-sm text-navy-200">
                  For breakdowns and emergency call-outs, our technical team is on standby.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="tel:+26772732668"
                    className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                  >
                    <Phone className="h-4 w-4" />
                    Call Emergency Line
                  </a>
                  <a
                    href={whatsappLink("URGENT: I need emergency support. ")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-[#1EBE5A]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
