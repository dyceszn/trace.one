import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <img src="/logo.svg" alt="trace.one" />
    </Link>
  );
};

export default Logo;
