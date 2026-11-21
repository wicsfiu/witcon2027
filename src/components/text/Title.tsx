import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
  return (
    <h1 className={twMerge("text-2xl md:text-3xl lg:text-4xl font-emilys-candy font-normal antialiased", className)}>{children}</h1>
  );
}
