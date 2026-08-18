"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ObfuscatableLink } from "@/components/ObfuscatableLink";
import { siteNavLinks } from "@/components/NavLinks";
import { Container } from "@/components/ui";

type MobileNavProps = {
  obfuscated?: boolean;
  defaultOpen?: boolean;
};

export function MobileNav({
  obfuscated = true,
  defaultOpen = false,
}: MobileNavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const panelId = `${id}-mobile-nav`;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const label = open ? "Fermer le menu" : "Ouvrir le menu";

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-fg motion-safe-transition hover:bg-brand-subtle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav
        id={panelId}
        aria-label="Navigation principale"
        hidden={!open}
        className="absolute inset-x-0 top-full z-10 border-b border-border/60 bg-canvas/95 backdrop-blur-sm"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {siteNavLinks.map((link) => (
              <li key={link.path}>
                <ObfuscatableLink
                  path={link.path}
                  variant="nav"
                  obfuscated={obfuscated}
                  className="block py-3"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </ObfuscatableLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
