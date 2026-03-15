"use client";
import React from "react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "../ai-elements/prompt-input";
import { Plus, SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";

const CustomPromptInput = () => {
  const handleSubmit = () => {
    // Handle the submission of the prompt input
  };
  return (
    <div className="bg-white group px-6 pb-4 w-full">
      <PromptInput onSubmit={handleSubmit} globalDrop multiple className="">
        <PromptInputHeader></PromptInputHeader>
        <PromptInputBody className="border-none">
          <PromptInputTextarea
            rows={1}
            placeholder="Add narrative"
            className="placeholder:text-sm min-h-0 border-none shadow-none focus-visible:ring-0! focus-visible:outline-none! focus:ring-0! focus:outline-none! px-0"
          />
        </PromptInputBody>
        {/* The Protocol Line */}
        <div className="relative w-full h-[0.5px] bg-black/30 overflow-hidden mb-4 mt-2">
          <div className="absolute inset-0 bg-black scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) origin-left" />
        </div>
        <PromptInputFooter className="px-0 py-0 ">
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="rounded-full size-7 bg-[#F5F5F7] hover:bg-[#E8E8ED] p-0 border-none shadow-none transition-colors cursor-pointer"
                >
                  <Plus className="size-5 text-[#1D1D1F] stroke-[1.5px]" />
                </Button>
              </PromptInputActionMenuTrigger>
              <PromptInputActionMenuContent
                className="rounded-none border-[#F2F2F7] shadow-2xl p-2"
                align="start"
              >
                <PromptInputActionAddAttachments className="font-mono text-[10px] uppercase tracking-widest py-2" />
                <PromptInputActionAddScreenshot className="font-mono text-[10px] uppercase tracking-widest py-2" />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit className="bg-transparent border-none p-2 shadow-none hover:translate-x-1 transition-all active:scale-90">
            <SendHorizonal className="size-5 text-[#1D1D1F] stroke-[1.2px]" />
          </PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
};

export default CustomPromptInput;
