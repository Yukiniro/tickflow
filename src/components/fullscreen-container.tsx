"use client";

import { cn } from "@/lib/utils";

interface FullscreenContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FullscreenContainer({ children, className }: FullscreenContainerProps) {
  return (
    <div data-clock-container className={cn("flex items-center justify-center min-h-screen", className)}>
      {children}
    </div>
  );
}
