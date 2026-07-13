import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | ModlyAI",
  description: "Terms of Service for ModlyAI, the B2B AI room-matching widget for furniture retailers.",
};

const LAST_UPDATED = "July 13, 2026";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-7 text-[#665c52] md:text-base">
        These Terms of Service (&quot;Terms&quot;) govern access to and use of ModlyAI (&quot;ModlyAI,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;), including our website, dashboard, APIs, and embeddable widget (collectively,
        the &quot;Service&quot;). ModlyAI is operated from the Philippines. By creating an account, subscribing, or using
        the Service, you agree to these Terms on behalf of the business entity you represent (&quot;Customer,&quot;
        &quot;you,&quot; or &quot;your&quot;). These Terms apply to Customers and their storefronts regardless of the
        country from which you access the Service, subject to Section 12 (General) below.
      </p>

      <LegalSection id="service" title="1. The Service">
        <p>
          ModlyAI provides a B2B software platform that helps furniture retailers offer AI-assisted room matching,
          catalog-grounded product recommendations, and related shopper experiences on their own storefronts. The Service
          is intended for commercial use by retailers and their authorized team members&mdash;not for personal consumer use
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
          Paid plans are billed in advance on a recurring subscription basis unless otherwise stated at checkout.
          Payments are processed by Paddle.com Market Limited, acting as our merchant of record, which handles billing,
          tax, and payment collection on our behalf. Fees are non-refundable except as described in our{" "}
          <Link href="/refund" className="font-medium text-[#8a6238] hover:underline">
            Refund Policy
          </Link>
          . You authorize Paddle to charge applicable fees, taxes, and overages to your chosen payment method. Failure to
          pay may result in suspension or termination of access.
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
          own privacy notices, cookie or AI-interaction disclosures, and obtaining appropriate consents on your
          storefront, in addition to the disclosures ModlyAI provides directly within the widget under Section 6.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="5. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reverse engineer, scrape, or misuse the Service except as permitted by law;</li>
          <li>Upload unlawful, infringing, or harmful content;</li>
          <li>Interfere with security, rate limits, or other customers&apos; use;</li>
          <li>Present ModlyAI outputs as guaranteed fit, safety, or regulatory compliance without appropriate review;</li>
          <li>Remove, disable, or obscure the AI-interaction disclosure described in Section 6;</li>
          <li>Resell or white-label the Service except under a separate written agreement.</li>
        </ul>
      </LegalSection>

      <LegalSection id="ai-disclaimer" title="6. AI outputs, recommendations, and AI-interaction disclosure">
        <p>
          ModlyAI uses automated systems to suggest products and answer shopper questions based on your catalog and
          inputs. Outputs may be inaccurate or incomplete. You are solely responsible for how recommendations appear on
          your site, pricing, inventory, fulfillment, and purchase decisions. The Service does not replace professional
          design, engineering, or legal advice.
        </p>
        <p>
          <strong className="text-[#51483f]">AI-interaction disclosure.</strong> The ModlyAI widget is an automated,
          AI-driven system, not a human representative. The widget is designed to make this clear to shoppers at the
          start of an interaction, consistent with applicable transparency requirements, including Article 50 of the EU
          Artificial Intelligence Act (Regulation (EU) 2024/1689) for shoppers in the European Union. You may not disable,
          remove, or obscure this disclosure, and you may not represent the widget as operated by a human.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="7. Intellectual property">
        <p>
          ModlyAI and its licensors own the Service, software, models, documentation, and branding. Except for the limited
          rights expressly granted, no rights are transferred to you. Feedback you provide may be used to improve the
          Service without obligation to you.
        </p>
      </LegalSection>

      <LegalSection id="dmca" title="8. Copyright complaints (DMCA)">
        <p>
          If you believe content accessible through the Service infringes your copyright, send a written notice to{" "}
          <a href="mailto:legal@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            legal@modlyai.tech
          </a>{" "}
          including: (a) identification of the copyrighted work; (b) identification of the allegedly infringing
          material and its location; (c) your contact information; (d) a statement of good-faith belief that the use is
          unauthorized; and (e) a statement, under penalty of perjury, that the notice is accurate and that you are
          authorized to act on the copyright owner&apos;s behalf. We will review valid notices and may remove or disable
          access to the identified material and notify the affected Customer. A party who believes content was removed in
          error may submit a counter-notice with comparable information; repeat infringers may have their accounts
          terminated.
        </p>
      </LegalSection>

      <LegalSection id="confidentiality" title="9. Confidentiality">
        <p>
          Each party may receive non-public information from the other. The receiving party will use reasonable care to
          protect it and use it only for the business relationship, except where disclosure is required by law.
        </p>
      </LegalSection>

      <LegalSection id="warranty" title="10. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW,
          WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE OPERATION.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="11. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS OR REVENUE. OUR TOTAL LIABILITY ARISING OUT OF THESE TERMS
          OR THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID TO MODLYAI IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR
          ONE HUNDRED U.S. DOLLARS (USD $100) IF YOU HAVE NOT PAID FEES.
        </p>
        <p>Some jurisdictions do not allow certain limitations; in those cases, limits apply to the fullest extent allowed.</p>
      </LegalSection>

      <LegalSection id="force-majeure" title="12. Force majeure">
        <p>
          Neither party is liable for delay or failure to perform caused by events beyond its reasonable control,
          including acts of God, internet or utility outages, government action, labor disputes, or failures of
          third-party infrastructure or AI providers we rely on to operate the Service.
        </p>
      </LegalSection>

      <LegalSection id="export" title="13. Export control and sanctions">
        <p>
          You may not use the Service in violation of applicable trade control or economic sanctions laws, including
          those of the United States and the Philippines. You represent that you are not located in, or ordinarily
          resident in, a country or region subject to comprehensive sanctions, and that you are not listed on any
          applicable restricted-party list.
        </p>
      </LegalSection>

      <LegalSection id="term" title="14. Term and termination">
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

      <LegalSection id="disputes" title="15. Dispute resolution">
        <p>
          Except for claims for injunctive relief or infringement of intellectual property rights (which either party may
          bring in court), any dispute arising out of or relating to these Terms or the Service will be resolved by
          binding arbitration on an individual basis, and not as a class, collective, or representative action. Either
          party may instead choose to pursue an eligible claim in small claims court. This arbitration agreement does not
          limit any statutory right you may have to bring a claim in your local courts where such a right cannot be
          waived under the mandatory consumer or data protection law of your country.
        </p>
      </LegalSection>

      <LegalSection id="general" title="16. General">
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, excluding conflict-of-law rules, without
          prejudice to Section 15. Where you or your storefront&apos;s shoppers are located in a country whose law grants
          mandatory rights that cannot be limited by contract (for example, certain consumer or data protection rights in
          the European Union, United Kingdom, or other jurisdictions), those mandatory rights remain available to the
          extent required by that law, notwithstanding the governing-law and arbitration provisions above.
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
