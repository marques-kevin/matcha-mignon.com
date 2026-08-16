import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";

type ListProps = ComponentProps<"ul">;

export function List({ className, children, ...props }: ListProps) {
  return (
    <ul className={cn("space-y-2", className)} {...props}>
      {children}
    </ul>
  );
}

type ListItemProps = ComponentProps<"li"> & {
  icon?: React.ReactNode;
};

export function ListItem({
  icon = "✓",
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <li className={cn("flex items-start gap-2", className)} {...props}>
      <Text as="span" variant="caption" className="mt-1" aria-hidden="true">
        {icon}
      </Text>
      <Text as="span" variant="body" className="text-matcha-800">
        {children}
      </Text>
    </li>
  );
}
