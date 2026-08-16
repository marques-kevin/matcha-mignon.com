export const titleVariants = {
  h1: "text-3xl font-bold tracking-tight text-matcha-900",
  h2: "text-2xl font-bold text-matcha-900",
  h3: "text-xl font-semibold text-matcha-900",
  h4: "text-lg font-semibold text-matcha-900",
  h5: "text-base font-semibold text-matcha-900",
  h6: "text-sm font-semibold uppercase tracking-wider text-matcha-600",
  hero: "text-4xl font-bold tracking-tight text-matcha-900 sm:text-5xl",
  card: "text-lg font-semibold text-matcha-900 group-hover:text-matcha-700",
} as const;

export const textVariants = {
  body: "text-base leading-relaxed text-matcha-800",
  lead: "text-lg leading-relaxed text-matcha-700",
  small: "text-sm leading-relaxed text-matcha-700/80",
  muted: "text-sm text-matcha-600",
  caption: "text-xs text-matcha-600",
  label: "text-sm font-medium text-matcha-800",
  price: "text-2xl font-bold text-matcha-800",
  eyebrow: "text-sm font-medium uppercase tracking-widest text-matcha-600",
} as const;

export const buttonVariants = {
  primary:
    "inline-flex items-center justify-center rounded-full bg-matcha-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-matcha-600",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-matcha-300 px-6 py-3 text-sm font-medium text-matcha-800 transition hover:bg-matcha-100",
  ghost:
    "inline-flex items-center justify-center text-sm font-medium text-matcha-700 transition hover:text-matcha-500",
} as const;

export const linkVariants = {
  default:
    "font-medium text-matcha-800 transition hover:text-matcha-600 hover:underline",
  muted: "text-sm text-matcha-600 transition hover:text-matcha-800",
  nav: "text-sm font-medium text-matcha-800 transition hover:text-matcha-600",
  footer:
    "text-sm text-matcha-100 underline underline-offset-2 transition hover:text-white",
  breadcrumb: "text-sm text-matcha-600 transition hover:text-matcha-800",
  related:
    "text-sm font-medium text-matcha-800 transition hover:text-matcha-600 hover:underline",
  action:
    "text-sm font-medium text-matcha-700 transition hover:text-matcha-500",
} as const;

export const containerSizes = {
  narrow: "max-w-3xl",
  wide: "max-w-5xl",
} as const;

export const sectionVariants = {
  default: "",
  hero: "bg-gradient-to-b from-matcha-100/50 to-cream px-6 py-20",
  content: "px-6 py-16",
  contentLast: "px-6 pb-20",
} as const;

export const cardVariants = {
  default:
    "rounded-2xl border border-matcha-200 bg-white p-6 transition hover:border-matcha-400 hover:shadow-md",
  muted: "rounded-2xl border border-matcha-200 bg-matcha-50 p-6",
  list: "rounded-xl border border-matcha-200 bg-white px-4 py-3",
} as const;

export const badgeVariants = {
  default:
    "inline-block rounded-full bg-matcha-100 px-3 py-0.5 text-xs font-medium text-matcha-700",
} as const;

export const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;
