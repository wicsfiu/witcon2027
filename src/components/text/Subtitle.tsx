import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
  return (
    <h2 className={twMerge("text-xl md:text-2xl lg:text-3xl font-arima font-normal antialiased", className)}>{children}</h2>
  );
}
