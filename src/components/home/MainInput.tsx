import React from "react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { SendHorizonal } from "lucide-react";
import Chip from "./Chip";
import Link from "next/link";
import Line from "../shared/Line";

const MainInput = () => {
  const placeholderText = {
    desktop:
      "I am negotiating a ₦2.5M transaction with @lux_hairs on Instagram, but it feels sketchy. I need a trace on...",
    mobile: "I need a trace on...",
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-6 lg:p-8 group focus-within:outline-none">
        <InputGroup className="border-none">
          <InputGroupTextarea
            className="hidden lg:block placeholder:text-base placeholder:italic text-base min-h-0"
            rows={1}
            placeholder={placeholderText.desktop}
          />
          <InputGroupTextarea
            rows={1}
            className="lg:hidden placeholder:text-base placeholder:italic text-base min-h-0"
            placeholder={placeholderText.mobile}
          />
          <InputGroupButton asChild>
            <Link href="/chat">
              <SendHorizonal className="size-6 cursor-pointer" />
            </Link>
          </InputGroupButton>
        </InputGroup>
        <Line />
      </div>
      <div className="flex gap-4">
        <Chip />
        <Chip />
      </div>
    </div>
  );
};

export default MainInput;
