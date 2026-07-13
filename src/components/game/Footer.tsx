'use client';

import { Terminal, Heart } from 'lucide-react';
import { PERSON } from '@/lib/cv-data';

interface FooterProps {
  completedCount: number;
  totalLevels: number;
}

export function Footer({ completedCount, totalLevels }: FooterProps) {
  const pct = Math.round((completedCount / totalLevels) * 100);

  return (
    <footer className="mt-auto border-t border-emerald-500/20 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/15 border border-emerald-500/40">
              <Terminal className="h-3 w-3 text-emerald-400" />
            </div>
            <div className="font-mono-game text-[11px] text-emerald-400/70">
              <span className="text-emerald-300 font-bold">SYSADMIN_QUEST</span>
              <span className="text-emerald-500/40 mx-1.5">·</span>
              <span>{PERSON.name}</span>
              <span className="text-emerald-500/40 mx-1.5">·</span>
              <span>{completedCount}/{totalLevels} niveles ({pct}%)</span>
            </div>
          </div>
          <div className="font-mono-game text-[10px] text-emerald-500/50 flex items-center gap-1.5">
            <span>CV interactivo basado en carrera real</span>
            <Heart className="h-3 w-3 text-rose-400/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
