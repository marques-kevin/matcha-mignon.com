import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import { siteConfig } from "@/lib/site";

type HeaderProps = {
  obfuscated?: boolean;
};

export function Header({ obfuscated = true }: HeaderProps) {
  return (
    <header className="border-b border-matcha-200/60 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-matcha-600 text-sm font-bold text-white">
            抹
          </span>
          <span className="text-lg font-semibold tracking-tight text-matcha-900 group-hover:text-matcha-700">
            {siteConfig.name}
          </span>
        </Link>
        <NavLinks obfuscated={obfuscated} />
      </div>
    </header>
  );
}
