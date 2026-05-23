import React from "react";

const footerText = {
  part1:
    "Trace.one is a dynamic verification engine designed to quantify credibility across the informal economy. By synthesizing synthetic digital signals with localized field truths, we provide a definitive Confidence Index for individuals and entities - tailored to the specific scope of their operation. All data processed by Trace.one and Dyce Technologies Inc. is governed by a policy of absolute privacy. Information is distilled to generate intelligence but is never disclosed or compromised. The Trace Sequence and resulting Confidence Index are proprietary metrics intended to empower informed decision-making. Field Truths (pro) are conducted in strict accordance with local statutes and ethical mandates. Our investigators operate with surgical precision - ensuring verification without intrusion, based solely on the required operational scope.",
  part2:
    "© 2026 Trace.one. A Dyce Technologies Inc. Product. All rights reserved.",
  part3: "Logic, Synthesis, and the Trace Engine are proprietary.",
};

export const FooterBig = () => {
  return (
    <div className="w-full flex justify-center">
      <p className="font-extralight text-[11px] leading-relaxed tracking-wider text-center max-w-248 wrap-normal">
        <span className="hidden lg:inline">
          {footerText.part1}
          <br />
          <br />
        </span>
        <span className="text-[8px] md:text-[11px] ">{footerText.part2} </span>

        <span className="hidden lg:inline">{footerText.part3}</span>
      </p>
    </div>
  );
};

export const FooterSmall = () => {
  return (
    <div className="w-full flex justify-center">
      <p className="font-extralight text-[8px] md:text-[11px] leading-relaxed tracking-wider text-center max-w-248 wrap-normal">
        {footerText.part2}{" "}
        <span className="hidden lg:inline">{footerText.part3}</span>
      </p>
    </div>
  );
};
