// Frequently asked questions, shown on the home page and published to
// Google as FAQ structured data. Keep answers factual — only promise
// what the business actually offers.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What size generator do I need?",
    a: "It depends on everything the generator must run at the same time, and especially on motors such as pumps, compressors and air-conditioners, which draw extra power when they start. Use our free generator size calculator for an estimate, then our engineers will confirm the right size on a site assessment.",
  },
  {
    q: "What generator sizes do you supply?",
    a: "We supply diesel and gas generator sets from 10 kVA for homes and small businesses up to 3000 kVA for industrial sites. We have installed more than 100 generators, the largest a single 1020 kVA set.",
  },
  {
    q: "Do you install and maintain the generators you sell?",
    a: "Yes. We supply, install and commission generators, including automatic transfer switches, and offer preventive maintenance contracts to keep them reliable.",
  },
  {
    q: "Will the generator start automatically during a power cut?",
    a: "Yes, when it is fitted with an automatic transfer switch (ATS). The ATS detects the outage, starts the generator and switches your load over, then switches back when mains power returns.",
  },
  {
    q: "Can I monitor and control my generator remotely?",
    a: "Yes. With GenWise, a 4G gateway on site sends live readings and alarms from your generator's DSE controller to our website and your phone, and lets authorised staff start and stop it remotely. It also works for sites currently using DSE890 gateways.",
  },
  {
    q: "Should I choose solar, a generator, or both?",
    a: "Solar cuts your electricity bills during the day, while a generator gives dependable backup at any hour. Many clients combine the two: solar with batteries for everyday use and a generator for long outages or heavy loads. We'll recommend the best mix for your site and budget.",
  },
  {
    q: "Do you offer emergency support?",
    a: "Yes. For breakdowns and urgent call-outs, phone or WhatsApp our team on +267 72732668 at any time.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in G-West, Gaborone, and deliver and install equipment for clients across Botswana.",
  },
  {
    q: "How do I get a quote?",
    a: "Send us a message through the contact form, WhatsApp or call +267 72732668. Tell us what you need to power and where — the consultation is free.",
  },
];
