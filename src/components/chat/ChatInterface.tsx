"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import CustomPromptInput from "./CustomPromptInput";
import { SignalSpine } from "./SignalSpine";
import type { PromptInputMessage } from "../ai-elements/prompt-input";
import type { ResultData } from "../result/ResultCard";

interface ChatInterfaceProps {
  /** The initial prompt passed from the home page via URL query param. */
  initialPrompt?: string;
}

/** Join all text parts from a UIMessage into a single string. */
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

/** Attempt to find an explicit confidence score (0–10) in the AI response. */
function parseScore(text: string): number {
  const patterns = [
    /confidence\s+(?:score|level)?[:\s]+(\d+(?:\.\d+)?)/i,
    /score[:\s]+(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*\/\s*10/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const v = parseFloat(m[1]);
      if (v >= 0 && v <= 10) return Math.round(v * 10) / 10;
    }
  }
  // Keyword heuristic fallback when no explicit score is present
  const lower = text.toLowerCase();
  if (lower.includes("high risk") || lower.includes("strong fraud")) return 1.5;
  if (lower.includes("high confidence") || lower.includes("strong positive")) return 8.5;
  if (lower.includes("significant anomaly") || lower.includes("extreme caution")) return 3.0;
  return 4.5;
}

/** Extract a plausible entity name (two+ capitalised words) from a prompt string. */
function extractName(prompt: string): string {
  const match = prompt.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
  return match ? match[1].trim() : "Unknown Entity";
}

/** Split the AI response into paragraph-level findings (max 5). */
function extractFindings(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40)
    .slice(0, 5);
}

const ChatInterface = ({ initialPrompt = "" }: ChatInterfaceProps) => {
  const hasSentInitial = useRef(false);
  const router = useRouter();

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // Auto-submit the initial prompt once on mount, if present
  useEffect(() => {
    if (initialPrompt && !hasSentInitial.current) {
      hasSentInitial.current = true;
      void sendMessage({ text: initialPrompt });
    }
  }, [initialPrompt, sendMessage]);

  /**
   * Handle a new message submitted from CustomPromptInput.
   * Converts attached files to data URLs before appending to the conversation.
   */
  const handleNewMessage = async (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (!text && message.files.length === 0) return;

    const attachments = await Promise.all<FileUIPart | null>(
      message.files.map(async (f) => {
        let url = f.url;
        if (url.startsWith("blob:")) {
          try {
            const res = await fetch(url);
            const blob = await res.blob();
            url = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          } catch {
            return null;
          }
        }
        return {
          type: "file",
          filename: f.filename,
          mediaType: f.mediaType,
          url,
        };
      }),
    );

    const validAttachments = attachments.filter(
      (attachment): attachment is FileUIPart => attachment !== null,
    );

    if (validAttachments.length > 0) {
      await sendMessage({ text, files: validAttachments });
    } else {
      await sendMessage({ text });
    }
  };

  // Show the "Synthesize Report" button once at least one assistant turn has completed
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const analysisReady = status === "ready" && !!lastAssistant;

  /** Derive ResultData from the conversation, write to sessionStorage, then navigate. */
  const handleGenerateReport = () => {
    if (!lastAssistant) return;

    const fullText = getMessageText(lastAssistant);
    const firstUserText =
      messages.find((m) => m.role === "user")
        ? getMessageText(messages.find((m) => m.role === "user")!)
        : "";
    const sourceText = initialPrompt || firstUserText;

    const result: ResultData = {
      score: parseScore(fullText),
      confidenceIndex: `TRC-${Date.now().toString(36).toUpperCase().slice(-6)}-X`,
      name: extractName(sourceText) || "Unknown Entity",
      // Use the first clause of the source prompt as the scope label
      scope: sourceText.split(/[.,!?\n]/)[0].trim().slice(0, 60) || "Digital Entity Assessment",
      findings: extractFindings(fullText),
    };

    sessionStorage.setItem("trace_result", JSON.stringify(result));
    router.push("/result");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Error banner */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-b border-red-100 text-red-600 text-xs font-mono">
          Signal lost: {error.message}. Check your GROQ_API_KEY and try again.
        </div>
      )}

      <Conversation>
        <ConversationContent>
          <SignalSpine messages={messages} status={status} />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <CustomPromptInput
        onSubmit={handleNewMessage}
        status={status}
        onStop={stop}
      />

      {/* Synthesize button — appears once the engine has completed at least one response */}
      {analysisReady && (
        <div className="flex justify-center pt-3 pb-1">
          <button
            onClick={handleGenerateReport}
            className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#86868B] hover:text-[#1D1D1F] border border-black/10 hover:border-black/30 px-6 py-2 transition-colors"
          >
            Synthesize Report →
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
