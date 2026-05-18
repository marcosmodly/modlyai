import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | ModlyAI",
  description: "Terms of Service for ModlyAI, the B2B AI room-matching widget for furniture retailers.",
};

const LAST_UPDATED = "May 18, 2026";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-7 text-[#665c52] md:text-base">
        These Terms of Service (&quot;Terms&quot;) govern access to and use of ModlyAI (&quot;ModlyAI,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;), including our website, dashboard, APIs, and embeddable widget (collectively,
        the &quot;Service&quot;). By creating an account, subscribing, or using the Service, you agree to these Terms on
        behalf of the business entity you represent (&quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;).
      </p>

      <LegalSection id="service" title="1. The Service">
        <p>
          ModlyAI provides a B2B software platform that helps furniture retailers offer AI-assisted room matching,
          catalog-grounded product recommendations, and related shopper experiences on their own storefronts. The Service
          is intended for commercial use by retailers and their authorized team members—not for personal consumer use
          unless expressly agreed in writing.
        </p>
        <p>
          We may update features, limits, and documentation from time to time. Beta or pilot features may be offered
          &quot;as is&quot; and may be modified or discontinued without notice.
        </p>
      </LegalSection>

      <LegalSection id="accounts" title="2. Accounts and eligibility">
        <p>
          You must be at least 18 years old and authorized to bind your organization. You are responsible for maintaining
          accurate account information, safeguarding credentials, and all activity under your account. Notify us
          promptly at{" "}
          <a href="mailto:security@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            security@modlyai.tech
          </a>{" "}
          of any unauthorized access.
        </p>
      </LegalSection>

      <LegalSection id="subscriptions" title="3. Subscriptions and payment">
        <p>
          Paid plans are billed in advance on a recurring subscription basis unless otherwise stated at checkout. Fees
          are non-refundable except as described in our{" "}
          <Link href="/refund" className="font-medium text-[#8a6238] hover:underline">
            Refund Policy
          </Link>
          . You authorize us and our payment processor to charge applicable fees, taxes, and overages. Failure to pay may
          result in suspension or termination of access.
        </p>
        <p>
          Usage limits (such as AI sessions or store count) depend on your plan. If you exceed included limits, we may
          charge overage fees or require a plan upgrade, as disclosed in your dashboard or order form.
        </p>
      </LegalSection>

      <LegalSection id="customer-data" title="4. Your data and catalog content">
        <p>
          You retain ownership of product catalogs, branding, shopper content, and other materials you submit
          (&quot;Customer Content&quot;). You grant ModlyAI a limited license to host, process, and display Customer
          Content solely to provide and improve the Service, comply with law, and prevent abuse.
        </p>
        <p>
          You represent that you have all rights necessary to use and share Customer Content, including rights from
          shoppers where required (for example, room photos uploaded through your widget). You are responsible for your
          privacy notices and obtaining appropriate consents on your storefront.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="5. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reverse engineer, scrape, or misuse the Service except as permitted by law;</li>
          <li>Upload unlawful, infringing, or harmful content;</li>
          <li>Interfere with security, rate limits, or other customers&apos; use;</li>
          <li>Present ModlyAI outputs as guaranteed fit, safety, or regulatory compliance without appropriate review;</li>
          <li>Resell or white-label the Service except under a separate written agreement.</li>
        </ul>
      </LegalSection>

      <LegalSection id="ai-disclaimer" title="6. AI outputs and recommendations">
        <p>
          ModlyAI uses automated systems to suggest products and answer shopper questions based on your catalog and
          inputs. Outputs may be inaccurate or incomplete. You are solely responsible for how recommendations appear on
          your site, pricing, inventory, fulfillment, and purchase decisions. The Service does not replace professional
          design, engineering, or legal advice.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="7. Intellectual property">
        <p>
          ModlyAI and its licensors own the Service, software, models, documentation, and branding. Except for the limited
          rights expressly granted, no rights are transferred to you. Feedback you provide may be used to improve the
          Service without obligation to you.
        </p>
      </LegalSection>

      <LegalSection id="confidentiality" title="8. Confidentiality">
        <p>
          Each party may receive non-public information from the other. The receiving party will use reasonable care to
          protect it and use it only for the business relationship, except where disclosure is required by law.
        </p>
      </LegalSection>

      <LegalSection id="warranty" title="9. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW,
          WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE OPERATION.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="10. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS OR REVENUE. OUR TOTAL LIABILITY ARISING OUT OF THESE TERMS
          OR THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID TO MODLYAI IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR
          ONE HUNDRED U.S. DOLLARS (USD $100) IF YOU HAVE NOT PAID FEES.
        </p>
        <p>Some jurisdictions do not allow certain limitations; in those cases, limits apply to the fullest extent allowed.</p>
      </LegalSection>

      <LegalSection id="term" title="11. Term and termination">
        <p>
          Either party may terminate for material breach if not cured within thirty (30) days of written notice. You may
          cancel subscriptions through your billing settings or by contacting us. Upon termination, your right to access
          the Service ends; we may delete data after a reasonable retention period, subject to our{" "}
          <Link href="/privacy" className="font-medium text-[#8a6238] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="general" title="12. General">
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, excluding conflict-of-law rules. Disputes
          will be resolved in the state or federal courts located in Delaware, unless applicable law requires otherwise.
        </p>
        <p>
          If any provision is unenforceable, the remainder stays in effect. We may assign these Terms in connection with a
          merger or sale. You may not assign without our consent. These Terms, together with order forms, the Privacy
          Policy, and Refund Policy, are the entire agreement between the parties regarding the Service.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
