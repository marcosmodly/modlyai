"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function RoiCalculator() {
  const [monthlySales, setMonthlySales] = useState<number>(250000);
  const [returnRate, setReturnRate] = useState<number>(15);
  const [fitRelatedShare, setFitRelatedShare] = useState<number>(35);
  const [improvementEstimate, setImprovementEstimate] = useState<number>(25);

  const results = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const rr = Math.max(0, Math.min(100, returnRate)) / 100;
    const fitShare = Math.max(0, Math.min(100, fitRelatedShare)) / 100;
    const improvement = Math.max(0, Math.min(100, improvementEstimate)) / 100;
    const costPerReturn = 200;

    const estimatedReturnUnits = sales * rr;
    const estimatedFitRelatedCost = estimatedReturnUnits * fitShare * costPerReturn;
    const estimatedMonthlySavings = estimatedFitRelatedCost * improvement;

    return {
      estimatedFitRelatedCost,
      estimatedMonthlySavings,
      costPerReturn,
    };
  }, [monthlySales, returnRate, fitRelatedShare, improvementEstimate]);

  return (
    <div className="rounded-[1.5rem] border border-[#ded2c3] bg-white p-6 shadow-[0_24px_70px_rgba(75,61,47,0.10)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Estimate return savings</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411]">Model fit-related return impact.</h3>
          <p className="mt-3 text-base leading-7 text-[#665c52]">
            This calculator is an estimate, not a guarantee. Adjust the assumptions to reflect your catalog, return policy,
            and current operations.
          </p>
        </div>

        <div className="rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] px-4 py-3 text-sm font-medium text-[#6a5f54]">
          Assumption: {formatCurrency(results.costPerReturn)} handling cost per return
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#2b2621]">Monthly furniture sales</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={monthlySales}
            onChange={(event) => setMonthlySales(Number(event.target.value))}
            className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#2b2621]">Current return rate</span>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={returnRate}
              onChange={(event) => setReturnRate(Number(event.target.value))}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 pr-10 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756a5f]">%</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#2b2621]">Fit-related share</span>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={fitRelatedShare}
              onChange={(event) => setFitRelatedShare(Number(event.target.value))}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 pr-10 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756a5f]">%</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#2b2621]">Improvement estimate</span>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={improvementEstimate}
              onChange={(event) => setImprovementEstimate(Number(event.target.value))}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 pr-10 text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756a5f]">%</span>
          </div>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#d7cab9] bg-[#171411] p-6">
          <p className="text-sm text-[#d8cfc4]">Estimated monthly savings</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-[#fffaf2] md:text-5xl">
            {formatCurrency(results.estimatedMonthlySavings)}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#c7bdb1]">Designed to reduce fit-related returns and help shoppers buy with more confidence.</p>
        </div>

        <div className="rounded-2xl border border-[#e1d7ca] bg-[#fbf7f0] p-6">
          <h4 className="font-semibold text-[#211d19]">Estimate formula</h4>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[#665c52]">
            <p>Estimated fit-related return cost: sales x return rate x fit-related share x {formatCurrency(results.costPerReturn)}</p>
            <p>Estimated monthly savings: fit-related return cost x improvement estimate</p>
            <p className="font-medium text-[#2b2621]">Current estimated fit-related cost: {formatCurrency(results.estimatedFitRelatedCost)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
