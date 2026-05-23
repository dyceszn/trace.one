"use client";

import React from "react";
import type { UIMessage } from "ai";
import type { ChatStatus } from "ai";
import EngineBubble from "./EngineBubble";
import UserBubble from "./UserBubble";

interface SignalSpineItemProps {
  /** Shown in the anchor circle for engine (assistant) messages */
  number?: number;
  isEngine: boolean;
  children?: React.ReactNode;
}

const SignalSpineItem: React.FC<SignalSpineItemProps> = ({
  number,
  isEngine,
  children,
}) => {
  return (
    <div className="group relative flex items-start gap-4 md:gap-10">
      {/* The Anchoring Column: w-14 (56px) */}
      <div className="relative z-10 flex justify-center shrink-0 w-10 md:w-14">
        {isEngine ? (
          <div className="flex items-center justify-center bg-gray-300 rounded-full size-10 md:size-14 transition-colors group-hover:bg-gray-400">
            <span className="font-brand text-lg md:text-2xl leading-none text-black">
              {number}
            </span>
          </div>
        ) : (
          /* For user messages: spacer with same width to keep layout consistent */
          <div className="size-14 flex items-center justify-center">
            <div className="size-1 bg-black/10 rounded-full" />
          </div>
        )}
      </div>
      <div className="flex-1 pt-1">{children}</div>
    </div>
  );
};

/** Extract plain text from a UIMessage's parts array */
const getMessageText = (message: UIMessage): string =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

interface SignalSpineProps {
  messages: UIMessage[];
  /** Chat status from useChat — used to show streaming/loading indicators */
  status: ChatStatus;
}

export const SignalSpine: React.FC<SignalSpineProps> = ({
  messages,
  status,
}) => {
  // Track how many assistant (engine) messages we've rendered to assign signal numbers
  let engineCount = 0;
  const isActivelyStreaming =
    status === "streaming" || status === "submitted";

  // Show an empty state when no messages exist yet
  if (messages.length === 0) {
    return (
      <div className="relative max-w-5xl mx-auto py-16 flex items-center justify-center min-h-40">
        {status === "submitted" ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-black/30 animate-bounce [animation-delay:-0.3s]" />
              <span className="size-2 rounded-full bg-black/30 animate-bounce [animation-delay:-0.15s]" />
              <span className="size-2 rounded-full bg-black/30 animate-bounce" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#86868B]">
              Initialising trace engine…
            </p>
          </div>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#86868B]">
            Awaiting signal input
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto py-16">
      {/* Spine: vertical dashed line */}
      <div
        className="absolute left-5 md:left-7 top-0 bottom-0 w-px pointer-events-none opacity-20 transition-opacity translate-x-[-0.5px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, black 20px, transparent 4px)`,
          backgroundSize: "1px 30px",
          backgroundRepeat: "repeat-y",
        }}
      />

      <div className="flex flex-col gap-16">
        {messages.map((message, index) => {
          const text = getMessageText(message);
          const isLastMessage = index === messages.length - 1;

          if (message.role === "assistant") {
            engineCount += 1;
            const currentCount = engineCount;
            // The last assistant message is "streaming" if the status says so
            const streaming = isLastMessage && isActivelyStreaming;

            return (
              <SignalSpineItem
                key={message.id}
                number={currentCount}
                isEngine={true}
              >
                <EngineBubble
                  signalNumber={currentCount}
                  content={text}
                  isStreaming={streaming}
                  timestamp="just now"
                />
              </SignalSpineItem>
            );
          }

          // User message
          return (
            <SignalSpineItem key={message.id} isEngine={false}>
              <UserBubble content={text} />
            </SignalSpineItem>
          );
        })}

        {/* Pending engine response indicator: show after the last user message
            when we submitted but no assistant token has arrived yet */}
        {status === "submitted" &&
          messages.length > 0 &&
          messages[messages.length - 1]?.role === "user" && (
            <SignalSpineItem number={engineCount + 1} isEngine={true}>
              <EngineBubble
                signalNumber={engineCount + 1}
                content=""
                isStreaming={true}
                timestamp="just now"
              />
            </SignalSpineItem>
          )}
      </div>
    </div>
  );
};
