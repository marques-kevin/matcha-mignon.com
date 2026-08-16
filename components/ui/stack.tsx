import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const stackGaps = {
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-10",
} as const;

type StackProps = ComponentProps<"div"> & {
  gap?: keyof typeof stackGaps;
};

export function Stack({
  gap = "md",
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div className={cn(stackGaps[gap], className)} {...props}>
      {children}
    </div>
  );
}
