import React from "react";

const Chip = ({ label = "Vector: chipppppp", onClick }: { label?: string; onClick?: () => void }) => {
  return (
    <div className="inline-flex flex-col items-center group cursor-pointer" onClick={onClick}>
      {/* Top Trace Line */}
      <div className="w-full h-px overflow-hidden">
        <div
          className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, black 6px, transparent 2px)`,
            backgroundSize: "12px 1px",
          }}
        />
      </div>

      {/* Label */}
      <span className="text-[9px] md:text-[10px] py-1.5 font-mono uppercase tracking-[0.25em] text-[#1D1D1F] antialiased">
        {label}
      </span>

      {/* Bottom Trace Line */}
      <div className="w-full h-px overflow-hidden">
        <div
          className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, black 6px, transparent 2px)`,
            backgroundSize: "12px 1px",
          }}
        />
      </div>
    </div>
  );
};

export default Chip;
