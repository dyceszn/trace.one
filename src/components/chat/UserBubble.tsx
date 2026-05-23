import React, { Fragment } from "react";
import { Message, MessageContent } from "../ai-elements/message";

interface UserBubbleProps {
  content: string;
}

const UserBubble: React.FC<UserBubbleProps> = ({ content }) => {
  return (
    <Fragment>
      <Message from="user" className="max-w-full lg:max-w-[70%]">
        <MessageContent>
          <p className="text-[14px] lg:text-[15px] font-light leading-relaxed tracking-tight text-[#1D1D1F] p-2">
            {content}
          </p>
        </MessageContent>
      </Message>
    </Fragment>
  );
};

export default UserBubble;
