"use client";

import { TextLink } from "@/components/ui";
import type { LinkVariant } from "@/components/ui/text-link";
import { JsLink } from "@/components/JsLink";

type ObfuscatableLinkProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
  variant?: LinkVariant;
  obfuscated?: boolean;
};

export function ObfuscatableLink({
  path,
  children,
  className,
  variant,
  obfuscated = true,
}: ObfuscatableLinkProps) {
  if (!obfuscated) {
    return (
      <TextLink href={path} className={className} variant={variant}>
        {children}
      </TextLink>
    );
  }

  return (
    <JsLink path={path} className={className}>
      {children}
    </JsLink>
  );
}
