import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "pass" | "fail" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-tertiary text-text-secondary border-border",
  accent: "bg-accent/10 text-accent border-border-accent",
  pass: "bg-status-pass/10 text-status-pass border-status-pass/30",
  fail: "bg-status-fail/10 text-status-fail border-status-fail/30",
  warning: "bg-status-warning/10 text-status-warning border-status-warning/30",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
