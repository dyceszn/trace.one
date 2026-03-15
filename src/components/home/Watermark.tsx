import React from "react";

const Watermark = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-3 items-center w-full lg:w-max">
      <p className="font-extralight text-xs lg:text-base lg:font-semibold">
        From the company behind
      </p>
      <img src="/costly.svg" alt="Costly" className=" h-12 lg:h-6" />
    </div>
  );
};

export default Watermark;
