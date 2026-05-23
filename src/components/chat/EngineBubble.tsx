import React, { Fragment } from "react";
import { Message, MessageContent, MessageResponse } from "../ai-elements/message";

interface EngineBubbleProps {
  /** Signal number shown in the anchor circle (1, 2, 3…) */
  signalNumber: number;
  /** The streamed/complete response text */
  content: string;
  /** Whether this message is currently being streamed */
  isStreaming?: boolean;
  /** Relative timestamp label, e.g. "just now" */
  timestamp?: string;
}

const EngineBubble: React.FC<EngineBubbleProps> = ({
  content,
  isStreaming = false,
  timestamp = "just now",
}) => {
  return (
    <Fragment>
      <Message from="assistant">
        <MessageContent>
          <div className="w-full grid grid-cols-1 gap-y-4 md:gap-y-6">
            <p className="flex items-center text-sm">
              <span className="font-bold mr-2">from trace engine</span>
              {" "}•{" "}
              <span className="ml-2 text-gray-500">{timestamp}</span>
              {isStreaming && (
                <span className="ml-3 inline-flex gap-1">
                  <span className="size-1 rounded-full bg-black/40 animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1 rounded-full bg-black/40 animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1 rounded-full bg-black/40 animate-bounce" />
                </span>
              )}
            </p>

            {/* Use MessageResponse for streaming markdown support */}
            <div className="lg:max-w-[75%] min-w-16 text-[14px] lg:text-[15px] leading-relaxed">
              {content ? (
                <MessageResponse isAnimating={isStreaming}>
                  {content}
                </MessageResponse>
              ) : (
                /* Empty state while waiting for first token */
                <span className="inline-flex gap-1">
                  <span className="size-1.5 rounded-full bg-black/30 animate-pulse" />
                  <span className="size-1.5 rounded-full bg-black/30 animate-pulse [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-black/30 animate-pulse [animation-delay:0.4s]" />
                </span>
              )}
            </div>
          </div>
        </MessageContent>
      </Message>
    </Fragment>
  );
};

export default EngineBubble;
