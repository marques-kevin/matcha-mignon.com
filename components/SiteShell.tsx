"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const obfuscated = pathname !== "/";

  return (
    <>
      <Header obfuscated={obfuscated} />
      <main className="flex-1">{children}</main>
      <Footer obfuscated={obfuscated} />
    </>
  );
}
