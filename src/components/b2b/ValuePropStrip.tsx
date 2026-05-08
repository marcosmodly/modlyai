"use client";

export default function ValuePropStrip() {
  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-[#071A33]/70 backdrop-blur supports-[backdrop-filter]:bg-[#071A33]/55">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5 text-[13px] text-[rgba(226,232,240,0.86)]">
          <span className="inline-flex items-center gap-2">
            <span className="text-[#2BE7C6]">✓</span> 5-Minute Setup
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[#2BE7C6]">✓</span> No Coding Required
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[#2BE7C6]">✓</span> 40% Fewer Returns
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[#2BE7C6]">✓</span> Cancel Anytime
          </span>
        </div>
      </div>
    </div>
  );
}

