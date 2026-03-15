import React from "react";

const Line = () => {
  // The Protocol Line
  return (
    <div className="relative w-full h-[0.5px] bg-black/20 overflow-hidden mt-2">
      <div className="absolute inset-0 bg-black scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) origin-left" />
    </div>
  );
};

export default Line;
