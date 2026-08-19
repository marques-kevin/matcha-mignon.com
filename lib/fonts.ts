import { Figtree } from "next/font/google";
import localFont from "next/font/local";

export const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-figtree",
});

/**
 * Shippori Mincho cannot use next/font/google here: the Google CSS for this
 * family includes ~120 CJK unicode-range files per weight, which next/font
 * would self-host and preload. Latin + latin-ext (and the logo 抹) are local.
 */
export const shipporiMincho = localFont({
  src: [
    {
      path: "../fonts/shippori-mincho-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/shippori-mincho-latin-ext-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/shippori-mincho-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/shippori-mincho-latin-ext-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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
