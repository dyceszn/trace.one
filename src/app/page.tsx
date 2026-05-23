import { FooterBig } from "@/components/shared/Footer";
import Menu from "@/components/shared/Menu";
import MainInput from "@/components/home/MainInput";
import Watermark from "@/components/home/Watermark";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8">
      <header className="w-full flex flex-col-reverse gap-12 items-end lg:flex-row lg:justify-between lg:items-center mb-28 lg:mb-8">
        <Watermark />
        <Menu />
      </header>
      <img src="/traceone.svg" alt="TraceOne" className="hidden md:block" />
      <img src="/traceone_mobile.svg" alt="TraceOne" className="md:hidden" />
      <div className=" hidden lg:flex justify-between items-center font-semibold lg:text-3xl  2xl:text-4xl mt-4 mb-14">
        <p className="font-semibold text-3xl 2xl:text-4xl leading-[0.9]">
          Confidence begins with a trace.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] ">
          Context is everything // Protocol v1.0 Beta
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-8 justify-end lg:justify-between">
        <div className="w-full lg:w-[60%]">
          <MainInput />
        </div>
        <FooterBig />
      </div>
    </div>
  );
}
