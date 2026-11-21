import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
  return (
<h1 className={twMerge("text-3xl md:text-4xl lg:text-5xl font-the-seasons", className)}>{children}</h1>
  );
}