import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
  return (
    <h1 className={twMerge("text-3xl text-primary-pink font-actor font-normal antialiased", className)}>{children}</h1>
  );
}
