"use client";

import { ObfuscatableLink } from "@/components/ObfuscatableLink";

export const siteNavLinks = [
  { path: "/guide", label: "Guides" },
  { path: "/produits", label: "Produits" },
  { path: "/a-propos", label: "À propos" },
] as const;

type NavLinksProps = {
  obfuscated?: boolean;
};

export function NavLinks({ obfuscated = true }: NavLinksProps) {
  return (
    <nav aria-label="Navigation principale" className="hidden md:block">
      <ul className="flex items-center gap-6">
        {siteNavLinks.map((link) => (
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
