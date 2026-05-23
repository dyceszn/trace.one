"use client";

import React, { useEffect, useState } from "react";
import Menu from "@/components/shared/Menu";
import { FooterSmall } from "@/components/shared/Footer";
import ResultCard, { type ResultData } from "@/components/result/ResultCard";
import Logo from "@/components/shared/Logo";

export default function ResultPage() {
  const [resultData, setResultData] = useState<ResultData | undefined>(undefined);

  // Hydrate from sessionStorage after mount (written by ChatInterface on completion)
  useEffect(() => {
    const raw = sessionStorage.getItem("trace_result");
    if (raw) {
      try {
        setResultData(JSON.parse(raw) as ResultData);
      } catch {
        // Malformed data — fall back to ResultCard defaults
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 lg:justify-between items-center p-8">
      <header className="w-full flex justify-between items-center">
        <Logo />
        <Menu />
      </header>
      <ResultCard data={resultData} />
      <FooterSmall />
    </div>
  );
}
