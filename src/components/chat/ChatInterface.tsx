import React from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import CustomPromptInput from "./CustomPromptInput";
import { SignalSpine } from "./SignalSpine";

const ChatInterface = () => {
  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          {/* Signal Spine contains the messages */}
          <SignalSpine />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <CustomPromptInput />
    </div>
  );
};

export default ChatInterface;
