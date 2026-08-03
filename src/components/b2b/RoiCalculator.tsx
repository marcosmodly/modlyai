"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString(undefined, { maximumFractionDigits });
}

type FieldConfig = {
  key: "monthlySales" | "aov" | "returnRate" | "fitRelatedShare" | "costPerReturnPct" | "improvementEstimate";
  label: string;
  prefix?: string;
  suffix?: string;
  min: number;
  max?: number;
  step: number;
  source: string;
  sourceLinks?: { label: string; href: string }[];
};

const fields: FieldConfig[] = [
  {
    key: "monthlySales",
    label: "Monthly furniture sales",
    prefix: "$",
    min: 0,
    step: 1000,
    source: "Illustrative placeholder only, not a benchmark. No published figure exists for independent online furniture retailer revenue — enter your own.",
  },
  {
    key: "aov",
    label: "Average order value",
    prefix: "$",
    min: 0,
    step: 50,
    source: "Enter your own AOV. Do not use blended \"Home & Furniture\" category averages (e.g. ~$302) — those mix in decor and accessories and understate a furniture-specific AOV.",
  },
  {
    key: "returnRate",
    label: "Return rate",
    suffix: "%",
    min: 0,
    max: 100,
    step: 0.1,
    source: "NRF + Happy Returns, 2025 Retail Returns Landscape. This is the all-category online rate, not furniture-specific.",
    sourceLinks: [{ label: "Source", href: "https://nrf.com/research/2025-retail-returns-landscape" }],
  },
  {
    key: "fitRelatedShare",
    label: "Fit-related share of returns",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    source: "Our assumption, adjust to your own data. There is no citable furniture-specific figure for this.",
  },
  {
    key: "costPerReturnPct",
    label: "Cost per return (% of item price)",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    source: "Pitney Bowes / Cipher Research surveyed 168 US online retailers and found returns cost 21% of order value (2022). Loop Returns' 2024 benchmark (22m returns, 4,000+ Shopify brands) found home goods carries the highest handling fee of any vertical at 17%. 25% nudges the 21% floor up for freight and markdown severity.",
    sourceLinks: [
      { label: "Pitney Bowes", href: "https://www.businesswire.com/news/home/20220414005151/en/Pitney-Bowes-Survey-Returns-Cost-US-Online-Retailers-21-of-Order-Value" },
      { label: "Loop Returns", href: "https://www.loopreturns.com/report/2024-benchmark-report/" },
    ],
  },
  {
    key: "improvementEstimate",
    label: "Improvement estimate",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    source: "Conservative estimate of how much of the fit-related return cost a fit-confidence widget can prevent.",
  },
];

const breakevenPlans = [
  { name: "Starter", price: 299 },
  { name: "Growth", price: 599 },
] as const;

export default function RoiCalculator() {
  const [monthlySales, setMonthlySales] = useState<number>(150000);
  const [aov, setAov] = useState<number>(1500);
  const [returnRate, setReturnRate] = useState<number>(19.3);
  const [fitRelatedShare, setFitRelatedShare] = useState<number>(50);
  const [costPerReturnPct, setCostPerReturnPct] = useState<number>(25);
  const [improvementEstimate, setImprovementEstimate] = useState<number>(20);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(40);

  const values: Record<FieldConfig["key"], number> = {
    monthlySales,
    aov,
    returnRate,
    fitRelatedShare,
    costPerReturnPct,
    improvementEstimate,
  };

  const setters: Record<FieldConfig["key"], (value: number) => void> = {
    monthlySales: setMonthlySales,
    aov: setAov,
    returnRate: setReturnRate,
    fitRelatedShare: setFitRelatedShare,
    costPerReturnPct: setCostPerReturnPct,
    improvementEstimate: setImprovementEstimate,
  };

  const results = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const orderValue = Math.max(0, aov);
    const valid = sales > 0 && orderValue > 0;

    const rr = Math.max(0, Math.min(100, returnRate)) / 100;
    const fitShare = Math.max(0, Math.min(100, fitRelatedShare)) / 100;
    const costPct = Math.max(0, Math.min(100, costPerReturnPct)) / 100;
    const improvement = Math.max(0, Math.min(100, improvementEstimate)) / 100;

    if (!valid) {
      return {
        valid: false,
        orders: 0,
        fitReturns: 0,
        costPerReturn: 0,
        fitRelatedCost: 0,
        estimatedMonthlySavings: 0,
      };
    }

    const orders = sales / orderValue;
    const returns = orders * rr;
    const fitReturns = returns * fitShare;
    const costPerReturn = orderValue * costPct;
    const fitRelatedCost = fitReturns * costPerReturn;
    const estimatedMonthlySavings = fitRelatedCost * improvement;

    return {
      valid: true,
      orders,
      fitReturns,
      costPerReturn,
      fitRelatedCost,
      estimatedMonthlySavings,
    };
  }, [monthlySales, aov, returnRate, fitRelatedShare, costPerReturnPct, improvementEstimate]);

  const breakeven = useMemo(() => {
    const orderValue = Math.max(0, aov);
    const margin = Math.max(0, Math.min(100, grossMarginPct)) / 100;
    const valid = orderValue > 0 && margin > 0;

    return {
      valid,
      plans: breakevenPlans.map((plan) => {
        if (!valid) return { ...plan, ordersNeeded: 0 };
        const revenueNeeded = plan.price / margin;
        const ordersNeeded = revenueNeeded / orderValue;
        return { ...plan, ordersNeeded };
      }),
    };
  }, [aov, grossMarginPct]);

  return (
    <>
    <div className="rounded-[1.5rem] border border-[#ded2c3] bg-white p-6 shadow-[0_24px_70px_rgba(75,61,47,0.10)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Estimate return savings</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411]">Model fit-related return impact.</h3>
          <p className="mt-3 text-base leading-7 text-[#665c52]">
            This calculator is an estimate, not a guarantee. Adjust the assumptions to reflect your catalog, return policy,
            and current operations. Hover the (?) next to a field for its source.
          </p>
        </div>

        <div className="rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] px-4 py-3 text-sm font-medium text-[#6a5f54]">
          Cost per return: {results.valid ? formatCurrency(results.costPerReturn) : "—"} (AOV x cost-per-return %)
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#2b2621]">
              {field.label}
              <span
                title={field.source}
                className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[#c9bca9] text-[10px] font-semibold leading-none text-[#8a714f]"
                aria-label={field.source}
              >
                ?
              </span>
            </span>
            <div className="relative">
              {field.prefix && (
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#756a5f]">{field.prefix}</span>
              )}
              <input
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.key]}
                onChange={(event) => setters[field.key](Number(event.target.value))}
                className={`w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] py-3 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15 ${
                  field.prefix ? "pl-8" : "pl-4"
                } ${field.suffix ? "pr-10" : "pr-4"}`}
              />
              {field.suffix && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756a5f]">{field.suffix}</span>
              )}
            </div>
            {field.sourceLinks && field.sourceLinks.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                {field.sourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#a0937f] underline decoration-dotted hover:text-[#8a714f]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#d7cab9] bg-[#171411] p-6">
          <p className="text-sm text-[#d8cfc4]">Estimated monthly savings</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-[#fffaf2] md:text-5xl">
            {results.valid ? formatCurrency(results.estimatedMonthlySavings) : "—"}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#c7bdb1]">Designed to reduce fit-related returns and help shoppers buy with more confidence.</p>
        </div>

        <div className="rounded-2xl border border-[#e1d7ca] bg-[#fbf7f0] p-6">
          <h4 className="font-semibold text-[#211d19]">Estimate formula</h4>
          <div className="mt-3 space-y-1.5 text-sm leading-6 text-[#665c52]">
            <p>Orders = monthly sales / AOV</p>
            <p>Fit-related returns = orders x return rate x fit-related share</p>
            <p>Cost per return = AOV x cost-per-return %</p>
            <p>Fit-related cost = fit-related returns x cost per return</p>
            <p>Estimated savings = fit-related cost x improvement estimate</p>
          </div>
          <div className="mt-4 space-y-1 border-t border-[#e1d7ca] pt-3 text-sm text-[#2b2621]">
            <p>Monthly orders: <span className="font-medium">{results.valid ? formatNumber(results.orders, 0) : "—"}</span></p>
            <p>Fit-related returns / mo: <span className="font-medium">{results.valid ? formatNumber(results.fitReturns) : "—"}</span></p>
            <p className="font-medium">Current estimated fit-related cost: {results.valid ? formatCurrency(results.fitRelatedCost) : "—"}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 rounded-[1.5rem] border border-[#ded2c3] bg-white p-6 shadow-[0_24px_70px_rgba(75,61,47,0.10)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Plan breakeven</div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-[#171411] md:text-3xl">
            What it has to do to pay for itself.
          </h3>
          <p className="mt-3 text-base leading-7 text-[#665c52]">
            This is verifiable arithmetic from your own inputs above, not a claim about our product. That is the
            number worth checking, not ours.
          </p>
        </div>

        <label className="block w-full md:w-40">
          <span className="mb-2 block text-sm font-semibold text-[#2b2621]">Gross margin</span>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={grossMarginPct}
              onChange={(event) => setGrossMarginPct(Number(event.target.value))}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] py-3 pl-4 pr-10 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756a5f]">%</span>
          </div>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {breakeven.plans.map((plan) => (
          <div key={plan.name} className="rounded-2xl border border-[#e1d7ca] bg-[#fbf7f0] p-6">
            <p className="text-sm font-semibold text-[#8a714f]">
              {plan.name} plan &middot; {formatCurrency(plan.price)}/mo
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#171411]">
              {breakeven.valid ? formatNumber(plan.ordersNeeded, 2) : "—"}
            </p>
            <p className="mt-1 text-sm text-[#665c52]">extra order{plan.ordersNeeded === 1 ? "" : "s"} / month to break even</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-6 text-[#665c52]">
        At a {formatCurrency(aov)} average order and a {grossMarginPct}% gross margin, the Growth plan pays for
        itself if the widget produces{" "}
        {breakeven.valid
          ? formatNumber(breakeven.plans.find((plan) => plan.name === "Growth")?.ordersNeeded ?? 0, 2)
          : "—"}{" "}
        extra {breakeven.valid && breakeven.plans.find((plan) => plan.name === "Growth")?.ordersNeeded === 1 ? "order" : "orders"} per month.
      </p>
    </div>
    </>
  );
}
