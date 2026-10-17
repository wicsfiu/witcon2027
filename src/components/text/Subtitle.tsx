import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
  return (
    <h2 className={twMerge("text-2xl text-primary-yellow font-actor font-normal antialiased", className)}>{children}</h2>
  );
}
