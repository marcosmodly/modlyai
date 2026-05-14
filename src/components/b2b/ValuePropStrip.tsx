"use client";

export default function ValuePropStrip() {
  return (
    <div className="border-b border-[#e5dbcf] bg-[#fffaf2]/92 backdrop-blur supports-[backdrop-filter]:bg-[#fffaf2]/82">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 py-2.5 text-[13px] font-medium text-[#6a5f54]">
          <span>14-day free trial</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c7b9a7] sm:inline-block" />
          <span>Designed to reduce fit-related returns</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c7b9a7] sm:inline-block" />
          <span>Catalog-grounded recommendations</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c7b9a7] sm:inline-block" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
