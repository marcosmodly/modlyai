"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function RoiCalculator() {
  const [monthlySales, setMonthlySales] = useState<number>(250000);
  const [returnRate, setReturnRate] = useState<number>(15);

  const results = useMemo(() => {
    const sales = Math.max(0, monthlySales);
    const rr = Math.max(0, Math.min(100, returnRate)) / 100;
    const costPerReturn = 200;

    const currentMonthlyReturnsCost = sales * rr * costPerReturn;
    const afterMonthlyReturnsCost = sales * rr * 0.6 * costPerReturn; // 40% reduction
    const monthlySavings = currentMonthlyReturnsCost - afterMonthlyReturnsCost;

    return {
      currentMonthlyReturnsCost,
      afterMonthlyReturnsCost,
      monthlySavings,
    };
  }, [monthlySales, returnRate]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold text-gray-900">Calculate Your Potential Savings</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Estimate return-related costs using the return economics we see in furniture retail. Adjust the inputs to match your store.
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          Assumption: Avg. return cost: $200+
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-sm font-medium text-gray-900 mb-2">Your monthly furniture sales: $____</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-900 mb-2">Your current return rate: ____%</span>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </label>
      </div>

      <div className="mt-8 bg-white rounded-xl border-2 border-green-500 p-6 shadow-lg">
        <p className="text-sm text-gray-600 mb-2">You could save per month with ModlyAI</p>
        <p className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{formatCurrency(results.monthlySavings)}</p>
        <p className="text-sm text-gray-600">Based on a 40% reduction in “doesn’t fit” returns.</p>
      </div>

      <div className="mt-6">
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-x-auto">
          <h4 className="font-semibold text-gray-900 mb-3">Formula</h4>
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p>Current monthly returns cost: Sales × Return Rate × $200</p>
            <p>With ModlyAI (40% reduction): Sales × Return Rate × 0.6 × $200</p>
            <p className="font-semibold text-gray-900">Monthly savings: Difference</p>
          </div>
        </div>
      </div>
    </div>
  );
}

