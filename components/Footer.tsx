import { FooterLinks } from "@/components/FooterLinks";

type FooterProps = {
  obfuscated?: boolean;
};

export function Footer({ obfuscated = true }: FooterProps) {
  return <FooterLinks obfuscated={obfuscated} />;
}
