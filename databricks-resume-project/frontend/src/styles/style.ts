import type { HealthStatus } from "../lib/api";

export const s = {
  icon: {
    sm: "size-4",
    md: "size-5",
    chevron: "size-3.5",
  },

  shell: {
    page: "min-h-screen bg-background",
    headerWrap:
      "sticky top-0 z-20 border-b border-border/70 bg-card/90 shadow-sm backdrop-blur-md",
    headerInner: "mx-auto w-full px-5 sm:px-8 lg:px-10 xl:px-12",
    main: "mx-auto w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12",
  },

  appHeader: {
    row: "flex h-[72px] items-center justify-between gap-4",
    brandLink:
      "flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90",
    logo: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20",
    brandTitle:
      "font-heading text-lg font-semibold leading-tight tracking-tight",
    brandSubtitle: "truncate text-xs text-muted-foreground",
    countPill:
      "hidden shrink-0 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground sm:block",
    countValue: "font-semibold tabular-nums text-foreground",
  },

  productsPanel: {
    root: "space-y-8",
    header: "space-y-2 border-b border-border/60 pb-6",
    eyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
    title: "font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
    subtitle:
      "max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
    error:
      "rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive",
  },

  productsGrid: {
    grid: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
    skeleton: "h-[220px] rounded-xl",
    cardBase:
      "group cursor-pointer border-l-4 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    cardHeader: "space-y-3 pb-3",
    cardHeaderRow: "flex items-start justify-between gap-3",
    cardTitleBlock: "min-w-0 space-y-2",
    categoryBadge:
      "rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
    cardTitle:
      "text-lg leading-snug transition-colors group-hover:text-primary",
    cardActions: "flex shrink-0 items-center gap-2",
    openHint:
      "size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100",
    cardContent: "space-y-4",
    metricsBox:
      "grid grid-cols-2 gap-3 rounded-lg border border-border/60 bg-muted/30 p-4",
    metricLabel:
      "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
    metricValueWrap: "mt-1.5",
    reviewCount: "text-xl font-semibold tabular-nums",
    badgeRow: "flex flex-wrap gap-2",
    topIssueBadge:
      "border-amber-500/30 bg-amber-500/5 font-normal text-amber-800 dark:text-amber-300",
    flaggedBadge: "border-primary/40 bg-primary/5 font-normal text-primary",
    negativeBadge: "font-normal text-muted-foreground",
    starRow: "inline-flex items-center gap-1.5",
    starIcon: "size-4 fill-amber-400 text-amber-400",
    starValue: "text-xl font-semibold tabular-nums",
    emptyRating: "text-muted-foreground",
  },

  healthAccent: {
    critical: "border-l-red-500 hover:border-red-300/60",
    needs_attention: "border-l-amber-500 hover:border-amber-300/60",
    healthy: "border-l-emerald-500 hover:border-emerald-300/60",
    insufficient_data: "border-l-muted-foreground/40 hover:border-border",
  } satisfies Record<HealthStatus, string>,

  healthBadge: {
    base: "text-xs font-medium",
    status: {
      critical: "border-0 bg-red-600 text-white",
      needs_attention: "border-0 bg-amber-500 text-white",
      healthy: "border-0 bg-emerald-600 text-white",
      insufficient_data: "border-0 bg-neutral-200 text-neutral-700",
    } satisfies Record<HealthStatus, string>,
  },

  detail: {
    root: "space-y-8",
    rootCompact: "space-y-6",
    chrome:
      "sticky top-0 z-20 -mx-5 -mt-8 mb-8 border-b border-border/70 bg-card/95 shadow-sm backdrop-blur-md sm:-mx-8 lg:-mx-10 xl:-mx-12",
    chromeInner: "space-y-5 px-5 py-5 sm:px-8 lg:px-10 xl:px-12",
    chromeTop: "flex flex-wrap items-center justify-between gap-4",
    chromeLeft: "flex min-w-0 flex-wrap items-center gap-3",
    homeLogo:
      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm",
    backBtn: "h-9 gap-1.5 px-3 text-muted-foreground",
    divider: "hidden h-4 w-px bg-border sm:block",
    breadcrumb:
      "hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex",
    breadcrumbCurrent: "truncate font-medium text-foreground",
    chromeActions: "flex flex-wrap items-center gap-2",
    flagBtn: "gap-2 shadow-sm",
    flagIconFilled: "fill-current",
    titleBlock: "space-y-3",
    categoryBadge:
      "rounded-md bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary",
    productTitle:
      "font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
    errorBox:
      "rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-destructive",
    metricsGrid: "grid gap-4 sm:grid-cols-3",
    metricCard: "shadow-sm",
    metricLabel:
      "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
    metricValue: "text-3xl font-bold tabular-nums",
    twoColGrid: "grid gap-5 lg:grid-cols-2",
    sectionCard: "shadow-sm",
    sectionHeader: "border-b border-border/50 pb-4",
    sectionTitle: "text-base font-semibold",
    sectionDesc: "text-sm text-muted-foreground",
    sectionBody: "pt-5",
    emptyText: "text-sm text-muted-foreground",
    issueGrid: "grid grid-cols-2 gap-3 sm:grid-cols-3",
    issueTile:
      "rounded-xl border border-amber-500/25 bg-gradient-to-b from-amber-500/10 to-amber-500/5 px-3 py-5 text-center",
    issueCount:
      "text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400",
    issueLabel: "mt-1 text-xs font-medium capitalize text-muted-foreground",
    sentimentGrid: "grid grid-cols-3 gap-3",
    sentimentTile: "rounded-xl border px-3 py-5 text-center",
    sentimentCount: "text-2xl font-bold tabular-nums",
    sentimentLabel: "mt-1 text-xs font-medium capitalize",
    aiSummarySection: "border-primary/20 shadow-sm",
    aiSummaryIcon:
      "flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
    aiSummaryText: "text-base leading-relaxed text-foreground sm:text-lg",
    actionSection: "border-violet-200 shadow-sm dark:border-violet-900/50",
    actionIcon:
      "flex size-9 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm",
    actionBox:
      "rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-violet-50/30 px-5 py-5 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-violet-950/10",
    actionText:
      "text-base font-medium leading-relaxed text-violet-950 sm:text-lg dark:text-violet-50",
  },

  sentiment: {
    positive:
      "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
    negative: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400",
    neutral: "border-border bg-muted/40 text-muted-foreground",
  },

  highlight: {
    positive: {
      card: "overflow-hidden shadow-sm border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-50/40 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:to-emerald-950/20",
      header:
        "border-b pb-3 border-emerald-200/80 bg-emerald-100/60 dark:border-emerald-900/40 dark:bg-emerald-950/30",
      icon: "flex size-9 items-center justify-center rounded-lg text-white shadow-sm bg-emerald-600",
      title: "text-base text-emerald-900 dark:text-emerald-100",
      subtitle: "text-xs text-emerald-700/80 dark:text-emerald-300/80",
      quote:
        "text-lg font-medium leading-relaxed sm:text-xl text-emerald-950 dark:text-emerald-50",
      starEmpty:
        "fill-emerald-200/60 text-emerald-200/60 dark:fill-emerald-900/60 dark:text-emerald-900/60",
      starFilled: "fill-amber-400 text-amber-400",
      rating:
        "ml-1.5 text-sm font-semibold tabular-nums text-emerald-900 dark:text-emerald-100",
      badge:
        "border-0 capitalize text-white bg-emerald-600 hover:bg-emerald-600",
      label: "Strongest positive signal from customer feedback",
    },
    negative: {
      card: "overflow-hidden shadow-sm border-red-200 bg-gradient-to-br from-red-50 to-red-50/40 dark:border-red-900/50 dark:from-red-950/40 dark:to-red-950/20",
      header:
        "border-b pb-3 border-red-200/80 bg-red-100/60 dark:border-red-900/40 dark:bg-red-950/30",
      icon: "flex size-9 items-center justify-center rounded-lg text-white shadow-sm bg-red-600",
      title: "text-base text-red-900 dark:text-red-100",
      subtitle: "text-xs text-red-700/80 dark:text-red-300/80",
      quote:
        "text-lg font-medium leading-relaxed sm:text-xl text-red-950 dark:text-red-50",
      starEmpty:
        "fill-red-200/60 text-red-200/60 dark:fill-red-900/60 dark:text-red-900/60",
      starFilled: "fill-amber-400 text-amber-400",
      rating:
        "ml-1.5 text-sm font-semibold tabular-nums text-red-900 dark:text-red-100",
      badge: "border-0 capitalize text-white bg-red-600 hover:bg-red-600",
      label: "Strongest negative signal from customer feedback",
    },
  },

  loader: {
    root: "flex flex-1 flex-col items-center justify-center gap-5 py-24",
    spinner: "size-10 animate-spin text-primary",
    body: "max-w-sm space-y-2 text-center",
    productName: "font-heading text-base font-semibold text-foreground",
    message:
      "animate-in fade-in text-sm font-medium text-foreground duration-300",
    hint: "text-xs text-muted-foreground",
  },

  section: {
    header: "flex flex-row items-start justify-between space-y-0",
    headerText: "space-y-1",
  },
} as const;

export type HighlightTone = keyof typeof s.highlight;

export function highlightTone(sentiment: string): HighlightTone {
  return sentiment === "positive" ? "positive" : "negative";
}

export function sentimentClass(sentiment: string): string {
  return (
    s.sentiment[sentiment as keyof typeof s.sentiment] ?? s.sentiment.neutral
  );
}
