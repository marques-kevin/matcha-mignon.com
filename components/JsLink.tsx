"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type JsLinkProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
};

export function JsLink({ path, children, className }: JsLinkProps) {
  const router = useRouter();

  const navigate = () => {
    router.push(path);
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    navigate();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    navigate();
  };

  return (
    <span
      role="link"
      tabIndex={0}
      className={cn("cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </span>
  );
}
