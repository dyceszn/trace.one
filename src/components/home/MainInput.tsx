"use client";

import React, { useRef, useState } from "react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { SendHorizonal } from "lucide-react";
import Chip from "./Chip";
import Line from "../shared/Line";
import { useRouter } from "next/navigation";

const EXAMPLE_PROMPTS = [
  "I am negotiating a ₦2.5M transaction with @lux_hairs on Instagram, but it feels sketchy. I need a trace on...",
  "A vendor is requesting upfront payment before delivery. Their CAC docs look off. Trace needed.",
];

const MainInput = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const desktopRef = useRef<HTMLTextAreaElement>(null);
  const mobileRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const value = prompt.trim();
    if (!value) return;
    // Encode the initial prompt as a URL query param so the chat page can pick it up
    router.push(`/chat?q=${encodeURIComponent(value)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift for newline)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipClick = (text: string) => {
    setPrompt(text);
    // Focus the visible textarea
    const el =
      window.innerWidth >= 1024 ? desktopRef.current : mobileRef.current;
    el?.focus();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-white p-6 lg:p-8 group focus-within:outline-none">
        <InputGroup className="border-none">
          {/* Desktop textarea */}
          <InputGroupTextarea
            ref={desktopRef}
            className="hidden lg:block placeholder:text-base placeholder:italic text-base min-h-0"
            rows={1}
            placeholder={EXAMPLE_PROMPTS[0]}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Mobile textarea */}
          <InputGroupTextarea
            ref={mobileRef}
            rows={1}
            className="lg:hidden placeholder:text-base placeholder:italic text-base min-h-0"
            placeholder="I need a trace on..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupButton
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            aria-label="Start trace"
          >
            <SendHorizonal className="size-6 cursor-pointer" />
          </InputGroupButton>
        </InputGroup>
        <Line />
      </div>
    </div>
  );
};

export default MainInput;
