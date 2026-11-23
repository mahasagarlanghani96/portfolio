import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, children, hover = false, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border p-6 md:p-8 transition-all",
        glass
          ? "glass-card"
          : "bg-bg-card",
        hover && "hover:bg-bg-card-hover hover:border-border-accent hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
