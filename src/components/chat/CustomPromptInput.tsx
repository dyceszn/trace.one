"use client";

import React from "react";
import type { ChatStatus } from "ai";
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
  type PromptInputMessage,
} from "../ai-elements/prompt-input";
import { Plus, SendHorizonal, Square } from "lucide-react";
import { Button } from "../ui/button";

interface CustomPromptInputProps {
  /**
   * Called when the user submits a new message.
   * Receives the text and any attached files.
   */
  onSubmit: (message: PromptInputMessage) => void | Promise<void>;
  /** The current chat status from useChat — used to disable/show loading */
  status?: ChatStatus;
  /** Stop streaming on demand */
  onStop?: () => void;
}

const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  onSubmit,
  status = "awaiting",
  onStop,
}) => {
  const isStreaming = status === "streaming" || status === "submitted";

  const handleSubmit = async (
    message: PromptInputMessage,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    if (isStreaming) return;
    await onSubmit(message);
  };

  return (
    <div className="bg-white group px-6 pb-4 w-full">
      <PromptInput onSubmit={handleSubmit} globalDrop multiple className="">
        <PromptInputHeader />

        <PromptInputBody className="border-none">
          <PromptInputTextarea
            rows={1}
            placeholder={isStreaming ? "Engine processing…" : "Add narrative"}
            disabled={isStreaming}
            className="placeholder:text-sm min-h-0 border-none shadow-none focus-visible:ring-0! focus-visible:outline-none! focus:ring-0! focus:outline-none! px-0"
          />
        </PromptInputBody>

        {/* The Protocol Line — animates on focus */}
        <div className="relative w-full h-[0.5px] bg-black/30 overflow-hidden mb-4 mt-2">
          <div className="absolute inset-0 bg-black scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) origin-left" />
        </div>

        <PromptInputFooter className="px-0 py-0">
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger asChild>
                <Button
                  variant="secondary"
                  disabled={isStreaming}
                  className="rounded-full size-7 bg-[#F5F5F7] hover:bg-[#E8E8ED] p-0 border-none shadow-none transition-colors cursor-pointer disabled:opacity-40"
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

          {/* Toggle between stop and submit depending on streaming state */}
          {isStreaming ? (
            <Button
              type="button"
              onClick={onStop}
              className="bg-transparent border-none p-2 shadow-none hover:scale-105 transition-all active:scale-90"
              aria-label="Stop streaming"
            >
              <Square className="size-5 text-[#1D1D1F] stroke-[1.2px]" />
            </Button>
          ) : (
            <PromptInputSubmit className="bg-transparent border-none p-2 shadow-none hover:translate-x-1 transition-all active:scale-90">
              <SendHorizonal className="size-5 text-[#1D1D1F] stroke-[1.2px]" />
            </PromptInputSubmit>
          )}
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
};

export default CustomPromptInput;
