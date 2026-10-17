import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
  return (
<h1 className={twMerge("text-3xl md:text-4xl lg:text-6xl text-witcon-deep-forest font-display", className)}>{children}</h1>
  );
}
