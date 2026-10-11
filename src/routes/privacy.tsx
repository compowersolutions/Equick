import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ComPower Africa" },
      { name: "description", content: "How Highsystem Botswana (ComPower Africa) collects, uses and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="11 October 2026">
      <h2>Who we are</h2>
      <p>
        This website, compowersolutions.com, is operated by <strong>Highsystem Botswana</strong>, trading as
        ComPower Africa ("we", "us"), Takatokwane Road, G-West, Gaborone, Botswana. We are responsible for the
        personal information you share with us through this website, in line with Botswana's{" "}
        <strong>Data Protection Act, 2018</strong>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiries:</strong> when you use our <Link to="/contact">contact form</Link> we collect your name,
          email address, phone number (optional), the product you are interested in and your message.
        </li>
        <li>
          <strong>Download accounts:</strong> if you create an account to access downloads, we store your email
          address and a securely hashed password.
        </li>
        <li>
          <strong>WhatsApp, phone and email:</strong> if you contact us directly, we receive the details you choose to
          share. WhatsApp messages are also subject to WhatsApp's own privacy policy.
        </li>
        <li>
          <strong>Technical data:</strong> our hosting provider automatically processes basic technical information
          (such as IP address and browser type) to deliver the website and protect it from abuse.
        </li>
      </ul>
      <p>
        We do not use advertising or tracking cookies. We may count visits with Cloudflare Web Analytics, which does
        not use cookies or identify individual visitors. The map on our Contact page is provided by Google and only
        loads if you choose "Show map"; Google's privacy policy then applies.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry, prepare quotes and provide the products or services you ask for.</li>
        <li>To give you access to downloadable resources.</li>
        <li>To keep the website secure and working properly.</li>
      </ul>
      <p>We do not sell your personal information or use it for unrelated marketing.</p>

      <h2>Who we share it with</h2>
      <p>
        We use trusted service providers to run this website: Cloudflare (hosting), Supabase (database and accounts)
        and Resend (email notifications). They process data only on our instructions. Some of these providers store
        data on servers outside Botswana; where that happens we rely on providers that apply appropriate security
        safeguards.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to deal with your request and any follow-up business, and download
        accounts until you ask us to delete them.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask to see the personal information we hold about you, ask us to correct it, or ask us to delete it.
        You may also object to how we use it. To make a request, email{" "}
        <a href="mailto:highsystembotswana@gmail.com">highsystembotswana@gmail.com</a> or call{" "}
        <a href="tel:+26772732668">+267 72732668</a>. If you are unhappy with how we handle your information, you can
        complain to the Information and Data Protection Commission of Botswana.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
