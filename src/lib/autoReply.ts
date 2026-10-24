// Automatic reply sent to a customer after they submit the contact form.
// The body and attached brochures depend on "I'm interested in".
// Edit the wording here; brochures come from the Downloads library
// (admin page), matched by category.

type ResourceCategory = "catalog" | "generator" | "solar" | "rectifier" | "other";

type ReplyTemplate = {
  subject: string;
  /** Paragraphs of the email body, after "Dear <name>," */
  paragraphs: string[];
  /** Download-library categories to attach (non-password-protected files only) */
  attach: ResourceCategory[];
};

const common = {
  closing: [
    "One of our engineers will contact you within one business day. If it's urgent, call or WhatsApp us on +267 72732668.",
  ],
};

export const replyTemplates: Record<string, ReplyTemplate> = {
  generators: {
    subject: "Your generator enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in our generators. We supply, install and maintain diesel and gas generator sets from 10 kVA to 3000 kVA, with automatic transfer switches, acoustic canopies and maintenance contracts.",
      "To recommend the right size, it helps to know what the generator must run (main equipment and any large motors, pumps or air-conditioners), whether it is for standby or prime power, and the site location. You can also try our online sizing tool: https://compowersolutions.com/generator-sizing",
      "We've attached our generator brochure for your reference.",
    ],
    attach: ["generator", "catalog"],
  },
  solar: {
    subject: "Your solar enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in our solar systems. We design and install grid-tied and off-grid solar with lithium or lead-acid battery storage, solar water pumping and monitoring.",
      "To prepare a proposal, please share a recent electricity bill or your monthly usage, the roof or ground space available, and whether you need backup during power cuts.",
      "We've attached our solar brochure for your reference.",
    ],
    attach: ["solar", "catalog"],
  },
  rectifiers: {
    subject: "Your rectifier enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in our rectifier solutions. We supply and service industrial and telecom rectifiers with precise voltage and current control, redundant configurations and remote monitoring.",
      "Please let us know the application, required DC voltage and current, and the input supply available on site, and we'll recommend a suitable configuration.",
      "We've attached our rectifier brochure for your reference.",
    ],
    attach: ["rectifier", "catalog"],
  },
  software: {
    subject: "Your software enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in our software. RestWise manages restaurant orders, POS, stock and payroll; MO Billing handles invoices, delivery notes and receipts from your phone; Mogala saves airtime on every call.",
      "Tell us a little about your business and we'll arrange a demo. Product details: https://compowersolutions.com/products",
    ],
    attach: [],
  },
  maintenance: {
    subject: "Your maintenance enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in a maintenance contract. Regular servicing keeps standby equipment ready to start when you need it and catches problems before they cause a breakdown.",
      "To prepare a quote, please send the make, model and size (kVA) of each generator or system, its location, and roughly how many hours it runs per month. Photos of the rating plates help too.",
    ],
    attach: [],
  },
  multiple: {
    subject: "Your enquiry — ComPower Africa",
    paragraphs: [
      "Thank you for your interest in our products. We provide generators, solar systems, rectifiers and business software, and can combine them into one solution — for example solar with generator backup.",
      "We've attached our product catalogue for your reference.",
    ],
    attach: ["catalog"],
  },
};

const fallback: ReplyTemplate = {
  subject: "We've received your enquiry — ComPower Africa",
  paragraphs: [
    "Thank you for contacting ComPower Africa. We've received your message and will review it shortly.",
    "We've attached our product catalogue in case it's useful.",
  ],
  attach: ["catalog"],
};

export function getReplyTemplate(interest?: string) {
  return (interest && replyTemplates[interest]) || fallback;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function renderReply(name: string, message: string, t: ReplyTemplate, attachedNames: string[]) {
  const firstName = name.trim().split(/\s+/)[0];
  // Only mention attachments when some were actually attached
  const paragraphs = attachedNames.length
    ? t.paragraphs
    : t.paragraphs.filter((p) => !/attached/i.test(p));
  const linkify = (s: string) =>
    escapeHtml(s).replace(/https:\/\/[^\s<]+/g, (u) => `<a href="${u}" style="color:#2D63A8">${u}</a>`);

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1A2235;max-width:600px">
  <div style="background:#0C1018;padding:18px 24px;border-radius:8px 8px 0 0">
    <span style="color:#fff;font-weight:900;font-size:20px;letter-spacing:.5px">COM<span style="color:#2D63A8">POWER</span></span>
  </div>
  <div style="border:1px solid #E2E8F0;border-top:0;padding:24px;border-radius:0 0 8px 8px">
    <p>Dear ${escapeHtml(firstName)},</p>
    ${[...paragraphs, ...common.closing].map((p) => `<p>${linkify(p)}</p>`).join("\n    ")}
    ${
      attachedNames.length
        ? `<p style="font-size:13px;color:#64748B">Attached: ${attachedNames.map(escapeHtml).join(", ")}</p>`
        : ""
    }
    <p>Kind regards,<br><b>ComPower Africa</b><br>
    Takatokwane Road, G-West, Gaborone<br>
    +267 72732668 · <a href="https://compowersolutions.com" style="color:#2D63A8">compowersolutions.com</a></p>
    <hr style="border:0;border-top:1px solid #E2E8F0;margin:20px 0">
    <p style="font-size:12px;color:#64748B">Your message:<br><span style="white-space:pre-wrap">${escapeHtml(message)}</span></p>
  </div>
</div>`;
  return { subject: t.subject, html };
}
