import ChatInterface from "@/components/chat/ChatInterface";
import { FooterSmall } from "@/components/shared/Footer";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

// Next.js 15+ requires awaiting searchParams in server components
export default async function Chat({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const initialPrompt = q ? decodeURIComponent(q) : "";

  return (
    <div className="py-8 px-4 md:p-8 flex flex-col gap-6 justify-between items-center h-screen overflow-hidden">
      <header className="w-full flex justify-between items-center">
        <Logo />
        <Button
          variant="outline"
          className="border-none hover:bg-transparent text-base cursor-pointer"
          asChild
        >
          <Link href="/">
            <X className="size-6" />
            <span className="hidden md:inline">Cancel Trace</span>
          </Link>
        </Button>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden w-full max-w-264">
        {/* Pass the initial prompt so ChatInterface auto-submits it on mount */}
        <ChatInterface initialPrompt={initialPrompt} />
      </div>

      <FooterSmall />
    </div>
  );
}
