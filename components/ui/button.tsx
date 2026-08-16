import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./variants";

export type ButtonVariant = keyof typeof buttonVariants;

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  href?: never;
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  href: string;
  children: ReactNode;
};

type Props = ButtonProps | ButtonLinkProps;

export function Button({ variant = "primary", className, ...props }: Props) {
  const styles = cn(buttonVariants[variant], className);

  if ("href" in props && props.href) {
    const { href, children, ...linkProps } = props;
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { children, ...buttonProps } = props as ButtonProps;
  return (
    <button className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
