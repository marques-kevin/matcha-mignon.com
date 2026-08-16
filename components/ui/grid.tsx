import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { gridCols } from "./variants";

type GridProps = ComponentProps<"div"> & {
  cols?: keyof typeof gridCols;
};

export function Grid({ cols = 3, className, children, ...props }: GridProps) {
  return (
    <div className={cn("grid gap-6", gridCols[cols], className)} {...props}>
      {children}
    </div>
  );
}
