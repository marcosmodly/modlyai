import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | ModlyAI",
  description: "How ModlyAI collects, uses, and protects personal data for retailers and their shoppers, worldwide.",
};

const LAST_UPDATED = "July 13, 2026";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-7 text-[#665c52] md:text-base">
        ModlyAI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is operated from the Philippines and provides a B2B
        platform and embeddable widget for furniture retailers worldwide. This Privacy Policy explains how we collect,
        use, disclose, and protect personal information when you visit our website, use our dashboard, or integrate our
        widget on your storefront. We built this policy around the strictest widely-applicable standard we are subject
        to (the EU/UK GDPR), and then note additional or different rights that apply in specific countries below. If a
        right described for one region is not separately repeated for your country, it does not mean it is unavailable
        to you&mdash;see Section 10 (Other jurisdictions).
      </p>

      <LegalSection id="roles" title="1. Who we are and our roles">
        <p>
          For account holders and business contacts, ModlyAI is generally the data controller (or, under the Philippine
          Data Privacy Act, the Personal Information Controller). When your shoppers interact with the ModlyAI widget on
          your website, you are typically the controller/Personal Information Controller of shopper data and ModlyAI
          acts as a processor/service provider (Personal Information Processor) on your behalf, processing data according
          to your instructions and our agreement with you.
        </p>
        <p>
          Contact:{" "}
          <a href="mailto:privacy@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            privacy@modlyai.tech
          </a>
        </p>
      </LegalSection>

      <LegalSection id="collect" title="2. Information we collect">
        <p>
          <strong className="text-[#51483f]">Account and business data:</strong> name, work email, company name, billing
          details, support communications, and usage of the dashboard.
        </p>
        <p>
          <strong className="text-[#51483f]">Widget and catalog data:</strong> product catalog fields you sync, widget
          configuration, session or usage metrics, shopper messages, optional room photos or uploads, and technical logs
          (IP address, device/browser type, timestamps, and similar diagnostics).
        </p>
        <p>
          <strong className="text-[#51483f]">Cookies and similar technologies:</strong> on our marketing site and app we
          may use cookies for authentication, security, analytics, and preferences. Where legally required, we request
          consent before setting non-essential cookies. You can control cookies through your browser settings where
          applicable.
        </p>
      </LegalSection>

      <LegalSection id="ai-disclosure" title="3. AI-interaction disclosure">
        <p>
          The ModlyAI widget is an automated, AI-driven assistant, not a human. Shoppers are informed that they are
          interacting with an AI system at the start of a conversation. Room photos or dimensions a shopper chooses to
          upload are used to generate product recommendations and are processed as described in this policy; we do not
          use shopper-uploaded photos to train models for purposes unrelated to providing the Service, and we do not
          perform biometric identification on uploaded photos.
        </p>
      </LegalSection>

      <LegalSection id="use" title="4. How we use information">
        <p>We use personal information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide, secure, and maintain the Service;</li>
          <li>Process subscriptions and communicate about your account;</li>
          <li>Generate catalog-grounded AI responses and analytics for retailers;</li>
          <li>Detect abuse, troubleshoot, and improve reliability;</li>
          <li>Comply with law and enforce our terms;</li>
          <li>Send product updates or marketing to business contacts (you may opt out).</li>
        </ul>
        <p>
          We do not sell personal information as defined under the California Consumer Privacy Act (CCPA), as amended by
          the CPRA. We do not use shopper data to train public models for unrelated purposes without appropriate
          contractual controls.
        </p>
      </LegalSection>

      <LegalSection id="legal-bases" title="5. Legal bases (GDPR / UK GDPR)">
        <p>Where GDPR or UK GDPR applies, we rely on:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#51483f]">Contract</strong> &mdash; to deliver the Service you requested;
          </li>
          <li>
            <strong className="text-[#51483f]">Legitimate interests</strong> &mdash; security, product improvement, and
            B2B marketing (including outreach to publicly listed business contacts), balanced against your rights;
          </li>
          <li>
            <strong className="text-[#51483f]">Consent</strong> &mdash; where required (for example, certain cookies or
            optional communications);
          </li>
          <li>
            <strong className="text-[#51483f]">Legal obligation</strong> &mdash; when we must retain or disclose data by
            law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="share" title="6. How we share information, and our subprocessors">
        <p>We share data with a limited number of infrastructure and service providers, each bound by contract to protect it:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-[#51483f]">OpenAI</strong> &mdash; AI processing for chat and image-based recommendations;</li>
          <li><strong className="text-[#51483f]">Vercel Inc.</strong> &mdash; application hosting;</li>
          <li><strong className="text-[#51483f]">Instant Data, Inc. (InstantDB)</strong> &mdash; database and data storage;</li>
          <li><strong className="text-[#51483f]">Resend</strong> &mdash; transactional email delivery;</li>
          <li><strong className="text-[#51483f]">Paddle.com Market Limited</strong> &mdash; billing, payments, and tax as our merchant of record;</li>
          <li><strong className="text-[#51483f]">Cloudflare, Inc.</strong> &mdash; email routing, DNS, and security infrastructure.</li>
        </ul>
        <p>
          We may also share data with professional advisers or authorities when required by law, or with a successor
          entity in a merger or acquisition, with notice where required. This subprocessor list may change as we add or
          replace providers; material changes will be reflected here with an updated &quot;Last updated&quot; date. We
          require processors to handle data only on our instructions and with appropriate security measures.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="7. Retention">
        <p>
          We retain information for as long as needed to provide the Service, meet legal obligations, resolve disputes,
          and enforce agreements. Retention periods may differ for account data, billing records, and widget session logs.
          You may request deletion subject to applicable law and active subscriptions.
        </p>
      </LegalSection>

      <LegalSection id="security" title="8. Security and breach notification">
        <p>
          We implement administrative, technical, and organizational measures designed to protect personal information,
          including access controls and encryption in transit where appropriate. No method of transmission or storage is
          completely secure; please use strong credentials and notify us of suspected incidents.
        </p>
        <p>
          If we become aware of a security incident affecting your personal information, we will notify affected
          Customers without undue delay and, where required by applicable law (for example, within 72 hours under GDPR
          for notifications to supervisory authorities), within the timeframe that law requires.
        </p>
      </LegalSection>

      <LegalSection id="transfers" title="9. International transfers">
        <p>
          We are based in the Philippines and use service providers located in other countries, including the United
          States. Where required, we use appropriate safeguards such as Standard Contractual Clauses approved by the
          European Commission or UK authorities, supplemented by additional measures where necessary, for transfers out
          of the EEA or UK.
        </p>
      </LegalSection>

      <LegalSection id="other-jurisdictions" title="10. Other jurisdictions">
        <p>
          Data protection law now exists in most of the world, and specific rights vary by country. We have built this
          policy around the GDPR/UK GDPR standard above as our baseline because it is one of the most protective widely
          applicable frameworks. In addition:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#51483f]">Philippines</strong> &mdash; as an entity operating from the Philippines,
            we are subject to the Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and
            Regulations. We follow its principles of transparency, legitimate purpose, and proportionality, and honor the
            data subject rights it grants (including access, correction, erasure or blocking, and data portability).
            Registration with the National Privacy Commission is required only above certain thresholds (for example,
            250+ employees or processing sensitive personal information of 1,000+ individuals); we will register if and
            when those thresholds apply to us.
          </li>
          <li>
            <strong className="text-[#51483f]">United States</strong> &mdash; residents of California and other states
            with comprehensive privacy laws may have rights to know, access, delete, and correct personal information,
            and to opt out of certain processing, as described in Section 11.
          </li>
          <li>
            <strong className="text-[#51483f]">Canada</strong> &mdash; we handle personal information consistent with
            the Personal Information Protection and Electronic Documents Act (PIPEDA) and, where applicable, Quebec&apos;s
            Law 25.
          </li>
          <li>
            <strong className="text-[#51483f]">Brazil</strong> &mdash; we handle personal information consistent with
            the Lei Geral de Proteção de Dados (LGPD), which closely mirrors the GDPR principles described above.
          </li>
          <li>
            <strong className="text-[#51483f]">Australia</strong> &mdash; we handle personal information consistent with
            the Australian Privacy Principles under the Privacy Act 1988.
          </li>
          <li>
            <strong className="text-[#51483f]">Everywhere else</strong> &mdash; if your country has a data protection law
            not named above, we intend to honor rights broadly equivalent to those described in this policy to the extent
            that law applies to us. Contact us at{" "}
            <a href="mailto:privacy@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
              privacy@modlyai.tech
            </a>{" "}
            if you believe a specific local right applies and is not reflected here.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="rights" title="11. Your rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, restrict or object to processing,
          port data, and withdraw consent. California residents may have rights to know, delete, and correct personal
          information, and to limit use of sensitive personal information where applicable. We will not discriminate
          against you for exercising these rights.
        </p>
        <p>
          EEA/UK residents may lodge a complaint with a supervisory authority; Philippine residents may lodge a complaint
          with the National Privacy Commission. To exercise rights, email{" "}
          <a href="mailto:privacy@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            privacy@modlyai.tech
          </a>
          . We may verify your request. Shoppers should contact the retailer whose site they used; retailers can contact us
          to assist with processor requests.
        </p>
      </LegalSection>

      <LegalSection id="children" title="12. Children">
        <p>
          The Service is not directed to children under 16. We do not knowingly collect personal information from
          children. If you believe we have, contact us and we will take appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes">
        <p>
          We may update this policy from time to time. We will post the revised version with a new &quot;Last updated&quot;
          date and, where required, provide additional notice. Continued use after changes become effective constitutes
          acknowledgment where permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14. Contact">
        <p>
          ModlyAI &mdash; Privacy inquiries:{" "}
          <a href="mailto:privacy@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            privacy@modlyai.tech
          </a>
          . For contractual data processing terms, contact your account representative or see your order form and{" "}
          <Link href="/terms" className="font-medium text-[#8a6238] hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
