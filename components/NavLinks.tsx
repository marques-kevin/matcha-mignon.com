"use client";

import { ObfuscatableLink } from "@/components/ObfuscatableLink";

const navLinks = [
  { path: "/guide", label: "Guides" },
  { path: "/produits", label: "Produits" },
  { path: "/a-propos", label: "À propos" },
] as const;

type NavLinksProps = {
  obfuscated?: boolean;
};

export function NavLinks({ obfuscated = true }: NavLinksProps) {
  return (
    <nav aria-label="Navigation principale">
      <ul className="flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.path}>
            <ObfuscatableLink
              path={link.path}
              variant="nav"
              obfuscated={obfuscated}
            >
              {link.label}
            </ObfuscatableLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
