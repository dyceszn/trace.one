import React, { Fragment } from "react";
import { Message, MessageContent } from "../ai-elements/message";

const EngineBubble = () => {
  return (
    <Fragment>
      <Message from="assistant">
        <MessageContent>
          <div className="w-full grid grid-cols-1 gap-y-4 md:gap-y-6">
            <p className="flex  items-center">
              <span className="font-bold mr-2">from trace engine </span> • 2
              mins ago
            </p>
            <p className=" lg:max-w-[75%] min-w-16">
              {" "}
              We have begun distilling signals for [Entity Name] within the
              [Scope] framework. <br />
              <br /> Note: The indicator at the periphery reflects your Signal
              Density. The resolution of your results is directly proportional
              to the depth of your narrative.
              <br />
              <br /> To refine the Confidence Index, please provide any
              additional vectors—full legal name, contact coordinates, or
              specific transaction history. <br />
              <br />
              What else do we know?
            </p>
          </div>
        </MessageContent>
      </Message>
    </Fragment>
  );
};

export default EngineBubble;
