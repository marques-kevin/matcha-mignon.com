import { Figtree, Shippori_Mincho } from "next/font/google";
import localFont from "next/font/local";

export const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-figtree",
});

/**
 * Display serif. next/font/google only exposes `latin` / `latin-ext` for this
 * family (the `japanese` subset is stripped from CJK metadata). Latin titles
 * come from Google; the logo 抹 is `shipporiMinchoMark`.
 */
export const shipporiMincho = Shippori_Mincho({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-shippori-mincho",
});

export const shipporiMinchoMark = localFont({
  src: "../fonts/shippori-mincho-mark.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-shippori-mincho-mark",
  declarations: [{ prop: "unicode-range", value: "U+62B9" }],
});

export const fontVariables = [
  figtree.variable,
  shipporiMincho.variable,
  shipporiMinchoMark.variable,
].join(" ");
