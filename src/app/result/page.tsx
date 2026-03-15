import React from "react";
import Menu from "@/components/shared/Menu";
import { FooterSmall } from "@/components/shared/Footer";
import ResultCard from "@/components/result/ResultCard";
import Logo from "@/components/shared/Logo";

export default function ResultPage() {
  return (
    <div className="flex flex-col gap-12 lg:justify-between items-center p-8">
      <header className="w-full flex justify-between items-center">
        <Logo />
        <Menu />
      </header>
      <ResultCard />
      <FooterSmall />
    </div>
  );
}
