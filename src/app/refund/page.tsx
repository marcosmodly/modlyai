import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy | ModlyAI",
  description: "ModlyAI refund policy for SaaS subscriptions, including our 30-day money-back guarantee, worldwide.",
};

const LAST_UPDATED = "July 13, 2026";

export default function RefundPage() {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-7 text-[#665c52] md:text-base">
        We want you to be confident when subscribing to ModlyAI. This Refund Policy explains when refunds are available
        for paid SaaS subscriptions, wherever in the world you are subscribing from. It supplements our{" "}
        <Link href="/terms" className="font-medium text-[#8a6238] hover:underline">
          Terms of Service
        </Link>
        .
      </p>

      <LegalSection id="merchant-of-record" title="1. Billing is handled by Paddle">
        <p>
          All charges for ModlyAI subscriptions are processed by Paddle.com Market Limited, acting as merchant of record.
          Paddle appears on your bank or card statement and handles the mechanics of collecting payment, applicable
          taxes, and issuing refunds once we approve a request. This policy describes when ModlyAI approves a refund;
          Paddle&apos;s own buyer terms govern the technical processing of that refund once approved.
        </p>
      </LegalSection>

      <LegalSection id="guarantee" title="2. 30-day money-back guarantee">
        <p>
          If you are not satisfied with your first paid subscription to ModlyAI, you may request a full refund within
          thirty (30) days of the initial charge for that subscription. This guarantee applies once per organization for
          the first paid plan on a new account.
        </p>
        <p>
          To request a refund, email{" "}
          <a href="mailto:billing@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            billing@modlyai.tech
          </a>{" "}
          from your account email with your company name and the reason for the request (optional but helpful). Approved
          refunds are processed to the original payment method within five to ten (5&ndash;10) business days, depending on your
          bank or card issuer.
        </p>
      </LegalSection>

      <LegalSection id="renewals" title="3. Renewals and plan changes">
        <p>
          Subscription renewals are generally non-refundable. If you cancel, you retain access through the end of the
          current billing period unless otherwise stated at checkout. Downgrades take effect on the next billing cycle;
          upgrades may be prorated according to your plan and payment processor rules.
        </p>
      </LegalSection>

      <LegalSection id="overage" title="4. Usage overages and add-ons">
        <p>
          Fees for usage beyond your plan limits, one-time setup services, or custom development are non-refundable unless
          required by law or expressly agreed in writing.
        </p>
      </LegalSection>

      <LegalSection id="trials" title="5. Free trials and pilots">
        <p>
          Free trials, pilot programs, and demo access do not incur charges unless you convert to a paid plan. If you
          convert during a promotional trial, the 30-day guarantee applies from the date of your first paid charge after
          conversion.
        </p>
      </LegalSection>

      <LegalSection id="exceptions" title="6. Exceptions">
        <p>We may decline refund requests if:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The request is made after the 30-day window (except where law requires otherwise);</li>
          <li>There is evidence of abuse, fraud, or a material violation of our Terms;</li>
          <li>The account has already received a refund under this policy; or</li>
          <li>A chargeback was filed&mdash;please contact us first so we can resolve billing issues directly.</li>
        </ul>
      </LegalSection>

      <LegalSection id="statutory" title="7. Statutory and cross-border rights">
        <p>
          Nothing in this policy limits mandatory consumer or business rights under applicable law. In particular, if you
          are located in the European Union or United Kingdom and are treated as a consumer under local law for a given
          purchase, you may have a statutory right of withdrawal of fourteen (14) days from the date of purchase under
          the EU Consumer Rights Directive or the UK equivalent, in addition to the 30-day guarantee above. Where a
          statutory withdrawal or cooling-off right applies and cannot be waived, that right applies on top of, not
          instead of, this policy, and the longer of the two periods will be honored.
        </p>
        <p>
          If you are located in a jurisdiction with other mandatory withdrawal or cooling-off rights not named here,
          those rights apply in addition to this policy where they cannot be waived; contact{" "}
          <a href="mailto:billing@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            billing@modlyai.tech
          </a>{" "}
          and we will honor them.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="8. Contact">
        <p>
          Billing questions:{" "}
          <a href="mailto:billing@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
            billing@modlyai.tech
          </a>
          . For data handling, see our{" "}
          <Link href="/privacy" className="font-medium text-[#8a6238] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
