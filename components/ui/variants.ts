export const titleVariants = {
  h1: "font-display text-3xl font-bold text-fg",
  h2: "font-display text-2xl font-bold text-fg",
  h3: "font-display text-xl font-semibold text-fg",
  h4: "font-display text-lg font-semibold text-fg",
  h5: "font-display text-base font-semibold text-fg",
  h6: "font-sans text-sm font-semibold uppercase tracking-wider text-fg-subtle",
  hero: "font-display text-5xl font-bold text-fg sm:text-6xl",
  card: "font-display text-lg font-semibold text-fg group-hover:text-brand",
} as const;

export const textVariants = {
  body: "font-sans text-base leading-relaxed text-fg-muted",
  lead: "text-lg leading-relaxed text-brand",
  small: "text-sm leading-relaxed text-brand/80",
  muted: "text-sm text-fg-subtle",
  caption: "text-xs text-fg-subtle",
  label: "text-sm font-medium text-fg-muted",
  price: "text-2xl font-bold text-fg-muted",
  eyebrow: "font-sans text-sm font-medium uppercase tracking-widest text-fg-subtle",
} as const;

export const buttonVariants = {
  primary:
    "inline-flex items-center justify-center rounded-pill bg-brand px-6 py-3 text-sm font-medium text-on-brand motion-safe-transition hover:bg-brand-hover",
  secondary:
    "inline-flex items-center justify-center rounded-pill border border-border-brand px-6 py-3 text-sm font-medium text-fg-muted motion-safe-transition hover:bg-brand-subtle",
  ghost:
    "inline-flex items-center justify-center text-sm font-medium text-brand motion-safe-transition hover:text-brand-soft",
} as const;

export const linkVariants = {
  default:
    "font-medium text-fg-muted motion-safe-transition hover:text-brand-hover hover:underline",
  muted: "text-sm text-fg-subtle motion-safe-transition hover:text-fg-muted",
  nav: "text-sm font-medium text-fg-muted motion-safe-transition hover:text-brand-hover",
  footer:
    "text-sm text-on-brand-muted underline underline-offset-2 motion-safe-transition hover:text-on-brand",
  breadcrumb: "text-sm text-fg-subtle motion-safe-transition hover:text-fg-muted",
  related:
    "text-sm font-medium text-fg-muted motion-safe-transition hover:text-brand-hover hover:underline",
  action:
    "text-sm font-medium text-brand motion-safe-transition hover:text-brand-soft",
} as const;

export const containerSizes = {
  narrow: "max-w-3xl",
  wide: "max-w-5xl",
} as const;

export const sectionVariants = {
  default: "",
  hero: "bg-gradient-to-b from-brand-subtle/50 to-canvas px-6 py-20",
  content: "px-6 py-16",
  contentLast: "px-6 pb-20",
} as const;

export const cardVariants = {
  default:
    "rounded-card border border-border bg-surface p-6 motion-safe-transition hover:border-border-strong hover:shadow-md",
  muted: "rounded-card border border-border bg-subtle p-6",
  list: "rounded-card-sm border border-border bg-surface px-4 py-3",
} as const;

export const badgeVariants = {
  default:
    "inline-block rounded-pill bg-brand-subtle px-3 py-0.5 text-xs font-medium text-brand",
} as const;

export const gridCols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;
