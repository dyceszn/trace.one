import type { Metadata } from "next";
import { Raleway, Special_Gothic_Expanded_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });
const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  weight: "400",
  variable: "--font-special-gothic-expanded-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trace.One",
  description: "Confidence begins with a trace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        raleway.variable,
        specialGothicExpandedOne.variable,
      )}
    >
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
