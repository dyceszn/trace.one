import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";

const Menu = () => {
  const navItems = ["Scope", "Network", "Intelligence"];
  return (
    <div>
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex gap-24 text-sm">
        {navItems.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-black transition-colors duration-300 flex items-center gap-2 group"
          >
            {item}
            {/* The Indicator - only shows on hover or active */}
            <span className="w-1 h-1 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </li>
        ))}
      </ul>
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="p-8" showCloseButton={false}>
          <SheetHeader className="p-0 mb-12">
            <Logo />
          </SheetHeader>
          <ul className="flex flex-col gap-12 text-lg">
            {navItems.map((item, idx) => (
              <li key={item} className="group">
                <p className="text-[10px] font-mono text-gray-500 mb-1">
                  0{idx + 1}
                </p>
                <button className="text-3xl tracking-tighter font-medium text-[#1D1D1F] hover:pl-2 transition-all duration-300">
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <SheetFooter className="flex items-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-50 text-center">
              System v1.0 // Trace Protocol
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
