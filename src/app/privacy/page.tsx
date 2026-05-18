import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | ModlyAI",
  description: "How ModlyAI collects, uses, and protects personal data for retailers and their shoppers.",
};

const LAST_UPDATED = "May 18, 2026";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-7 text-[#665c52] md:text-base">
        ModlyAI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides a B2B platform and embeddable widget for
        furniture retailers. This Privacy Policy explains how we collect, use, disclose, and protect personal information
        when you visit our website, use our dashboard, or integrate our widget on your storefront. It also describes
        rights for individuals in the European Economic Area (EEA), UK, and California, among other regions.
      </p>

      <LegalSection id="roles" title="1. Who we are and our roles">
        <p>
          For account holders and business contacts, ModlyAI is generally the data controller. When your shoppers interact
          with the ModlyAI widget on your website, you are typically the controller of shopper data and ModlyAI acts as
          a processor/service provider on your behalf, processing data according to your instructions and our agreement
          with you.
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
          may use cookies for authentication, security, analytics, and preferences. You can control cookies through your
          browser settings where applicable.
        </p>
      </LegalSection>

      <LegalSection id="use" title="3. How we use information">
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

      <LegalSection id="legal-bases" title="4. Legal bases (GDPR / UK GDPR)">
        <p>Where GDPR or UK GDPR applies, we rely on:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[#51483f]">Contract</strong> — to deliver the Service you requested;
          </li>
          <li>
            <strong className="text-[#51483f]">Legitimate interests</strong> — security, product improvement, and B2B
            marketing, balanced against your rights;
          </li>
          <li>
            <strong className="text-[#51483f]">Consent</strong> — where required (for example, certain cookies or optional
            communications);
          </li>
          <li>
            <strong className="text-[#51483f]">Legal obligation</strong> — when we must retain or disclose data by law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="share" title="5. How we share information">
        <p>We may share data with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Infrastructure, hosting, analytics, and payment providers under contractual safeguards;</li>
          <li>AI and API subprocessors needed to operate features you enable;</li>
          <li>Professional advisers or authorities when required by law;</li>
          <li>A successor entity in a merger or acquisition, with notice where required.</li>
        </ul>
        <p>We require processors to handle data only on our instructions and with appropriate security measures.</p>
      </LegalSection>

      <LegalSection id="retention" title="6. Retention">
        <p>
          We retain information for as long as needed to provide the Service, meet legal obligations, resolve disputes,
          and enforce agreements. Retention periods may differ for account data, billing records, and widget session logs.
          You may request deletion subject to applicable law and active subscriptions.
        </p>
      </LegalSection>

      <LegalSection id="security" title="7. Security">
        <p>
          We implement administrative, technical, and organizational measures designed to protect personal information,
          including access controls and encryption in transit where appropriate. No method of transmission or storage is
          completely secure; please use strong credentials and notify us of suspected incidents.
        </p>
      </LegalSection>

      <LegalSection id="transfers" title="8. International transfers">
        <p>
          We may process data in the United States and other countries. Where required, we use appropriate safeguards
          such as Standard Contractual Clauses approved by the European Commission or UK authorities, supplemented by
          additional measures where necessary.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="9. Your rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, restrict or object to processing,
          port data, and withdraw consent. California residents may have rights to know, delete, and correct personal
          information, and to limit use of sensitive personal information where applicable. We will not discriminate
          against you for exercising these rights.
        </p>
        <p>
          EEA/UK residents may lodge a complaint with a supervisory authority. To exercise rights, email{" "}
          <a href="mailto:privacy@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            privacy@modlyai.tech
          </a>
          . We may verify your request. Shoppers should contact the retailer whose site they used; retailers can contact us
          to assist with processor requests.
        </p>
      </LegalSection>

      <LegalSection id="children" title="10. Children">
        <p>
          The Service is not directed to children under 16. We do not knowingly collect personal information from
          children. If you believe we have, contact us and we will take appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="11. Changes">
        <p>
          We may update this policy from time to time. We will post the revised version with a new &quot;Last updated&quot;
          date and, where required, provide additional notice. Continued use after changes become effective constitutes
          acknowledgment where permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="12. Contact">
        <p>
          ModlyAI — Privacy inquiries:{" "}
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
