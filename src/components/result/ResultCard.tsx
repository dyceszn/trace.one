import React from "react";

const ResultCard = () => {
  const findings = [
    "Visual assets align with the scope, yet organic engagement remains below our threshold for verified commerce.",
    "System detected high identity volatility, including multiple handle transitions within a 90-day window.",
    "Vector reconciliation failed; provided documentation could not be mapped to an active legal entity.",
    "Operational void detected. No verifiable transaction resonance found within this specific scope.",
    "Geospatial inconsistency identified. Communication metadata does not align with stated physical jurisdiction.",
  ];

  const resultData = {
    score: 1.5,
    confidenceIndex: "TRC-9902-X",
    name: "Shade Anjola",
    scope: "Professional Hair Merchant",
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl border border-black/10 bg-white overflow-hidden shadow-sm">
      {/* The Halo / Score Section */}
      <div className="w-full lg:w-100 border-b lg:border-b-0 lg:border-r border-black/10 p-12 flex flex-col items-center justify-center bg-[#FAFAFA]">
        <div className="relative flex items-center justify-center w-64 h-64 rounded-full border-[0.5px] border-black/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]">
          {/* The Score */}
          <span className="font-bold text-[120px] tracking-tight leading-none text-[#1D1D1F]">
            {resultData.score}
          </span>
          {/* Subtle Ring Accent */}
          <div className="absolute inset-0 rounded-full border-t border-t-background rotate-120" />
        </div>

        <div className="mt-10 text-center space-y-2">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#86868B]">
            Confidence Index // {resultData.confidenceIndex}
          </p>
          <h2 className="text-[18px] font-medium tracking-tight text-[#1D1D1F]">
            {resultData.name}
          </h2>
          <p className="text-[12px] text-[#86868B]">{resultData.scope}</p>
        </div>
      </div>

      {/* The Synthesis Grid / Analysis */}
      <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center bg-white">
        <div className="space-y-8 max-w-2xl">
          {findings.map((finding, idx) => (
            <div key={idx} className="flex gap-6 group">
              <span className="font-mono text-[10px] text-gray-500 mt-1">
                0{idx + 1}
              </span>
              <p className="text-[14px] leading-relaxed text-[#424245] group-hover:text-black transition-colors">
                {finding}
              </p>
            </div>
          ))}
        </div>

        {/* Footnote Seal */}
        <div className="mt-16 pt-8 border-t border-black/5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#C5C5C7]">
            Trace.one Protocol // Signal Synthesis Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
