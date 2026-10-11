import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — ComPower Africa" },
      { name: "description", content: "Terms for using the ComPower Africa (Highsystem Botswana) website and downloads." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="11 October 2026">
      <h2>About these terms</h2>
      <p>
        These terms apply to your use of compowersolutions.com, operated by <strong>Highsystem Botswana</strong>,
        trading as ComPower Africa. By using the website you agree to them.
      </p>

      <h2>Product information and quotes</h2>
      <p>
        We work to keep product descriptions, specifications and other information on this website accurate, but it
        is provided for general guidance only and may change without notice. Nothing on the website is a binding
        offer. Prices, specifications and delivery terms are confirmed only in a written quotation or agreement from
        us.
      </p>

      <h2>Downloads and software</h2>
      <p>
        Brochures, datasheets and apps offered for download are provided for your own use. Software such as our
        mobile apps is provided "as is", and any separate licence terms shown in the app apply. Install software only
        on devices you are authorised to use.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account, keep your password private and let us know if you think someone else has used it.
        We may suspend accounts that are misused.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The ComPower name and logo, and the text, images and software on this website, belong to Highsystem Botswana
        or its licensors. You may not copy or reuse them for commercial purposes without our written permission.
        Other brand names shown (such as equipment manufacturers) belong to their owners.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any loss arising from your use of the website or
        reliance on its general information. This does not limit any rights you have under Botswana consumer
        protection law, or our obligations under a contract we have with you.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle personal information is explained in our <Link to="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Governing law and contact</h2>
      <p>
        These terms are governed by the laws of Botswana. Questions? Email{" "}
        <a href="mailto:highsystembotswana@gmail.com">highsystembotswana@gmail.com</a> or call{" "}
        <a href="tel:+26772732668">+267 72732668</a>.
      </p>
    </LegalPage>
  );
}
