import React, { Fragment } from "react";
import { Message, MessageContent } from "../ai-elements/message";

const UserBubble = () => {
  const userMessage =
    "I replied the entity and they said i should send the money into a personal opay account named Shade Arinze 81207653428. They said they had a CAC document.";
  return (
    <Fragment>
      <Message from="user" className="max-w-full lg:max-w-[70%]">
        <MessageContent>
          <p className="text-[14px] lg:text-[15px] font-light leading-relaxed tracking-tight text-[#1D1D1F] p-2">
            {userMessage}
          </p>
        </MessageContent>
      </Message>
    </Fragment>
  );
};

export default UserBubble;
