import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
  return (
    <p className={twMerge("text-base text-primary font-normal  text-witcon-deep-forest/80", className)}>
      {children}
    </p>
  );
}
