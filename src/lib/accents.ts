// Static accent class maps so Tailwind can detect them at build time.
// DO NOT use template literals like `bg-${accent}-500` — they break Tailwind's purge.

export type AccentName = 'emerald' | 'amber' | 'cyan' | 'rose' | 'violet' | 'orange';

export interface AccentClasses {
  text: string;
  textBright: string;
  bg: string;
  bgSoft: string;
  border: string;
  borderStrong: string;
  fill: string; // bg solid for buttons
  fillHover: string;
  dot: string;
  glow: string;
  ring: string;
  badge: string;
}

export const ACCENTS: Record<AccentName, AccentClasses> = {
  emerald: {
    text: 'text-emerald-300',
    textBright: 'text-emerald-200',
    bg: 'bg-emerald-500/10',
    bgSoft: 'bg-emerald-500/5',
    border: 'border-emerald-500/40',
    borderStrong: 'border-emerald-500/60',
    fill: 'bg-emerald-500',
    fillHover: 'hover:bg-emerald-400',
    dot: 'bg-emerald-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.72_0.19_152/0.5)]',
    ring: 'ring-emerald-500/40',
    badge: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
  },
  amber: {
    text: 'text-amber-300',
    textBright: 'text-amber-200',
    bg: 'bg-amber-500/10',
    bgSoft: 'bg-amber-500/5',
    border: 'border-amber-500/40',
    borderStrong: 'border-amber-500/60',
    fill: 'bg-amber-500',
    fillHover: 'hover:bg-amber-400',
    dot: 'bg-amber-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.75_0.18_80/0.5)]',
    ring: 'ring-amber-500/40',
    badge: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
  cyan: {
    text: 'text-cyan-300',
    textBright: 'text-cyan-200',
    bg: 'bg-cyan-500/10',
    bgSoft: 'bg-cyan-500/5',
    border: 'border-cyan-500/40',
    borderStrong: 'border-cyan-500/60',
    fill: 'bg-cyan-500',
    fillHover: 'hover:bg-cyan-400',
    dot: 'bg-cyan-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.7_0.15_200/0.5)]',
    ring: 'ring-cyan-500/40',
    badge: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
  },
  rose: {
    text: 'text-rose-300',
    textBright: 'text-rose-200',
    bg: 'bg-rose-500/10',
    bgSoft: 'bg-rose-500/5',
    border: 'border-rose-500/40',
    borderStrong: 'border-rose-500/60',
    fill: 'bg-rose-500',
    fillHover: 'hover:bg-rose-400',
    dot: 'bg-rose-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.65_0.22_25/0.5)]',
    ring: 'ring-rose-500/40',
    badge: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
  },
  violet: {
    text: 'text-violet-300',
    textBright: 'text-violet-200',
    bg: 'bg-violet-500/10',
    bgSoft: 'bg-violet-500/5',
    border: 'border-violet-500/40',
    borderStrong: 'border-violet-500/60',
    fill: 'bg-violet-500',
    fillHover: 'hover:bg-violet-400',
    dot: 'bg-violet-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.7_0.2_300/0.5)]',
    ring: 'ring-violet-500/40',
    badge: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
  },
  orange: {
    text: 'text-orange-300',
    textBright: 'text-orange-200',
    bg: 'bg-orange-500/10',
    bgSoft: 'bg-orange-500/5',
    border: 'border-orange-500/40',
    borderStrong: 'border-orange-500/60',
    fill: 'bg-orange-500',
    fillHover: 'hover:bg-orange-400',
    dot: 'bg-orange-400',
    glow: 'shadow-[0_0_30px_-5px_oklch(0.72_0.19_60/0.5)]',
    ring: 'ring-orange-500/40',
    badge: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
  },
};

export function getAccent(name: string): AccentClasses {
  return (ACCENTS as Record<string, AccentClasses>)[name] ?? ACCENTS.emerald;
}
