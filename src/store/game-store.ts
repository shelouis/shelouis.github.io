'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameState, LevelResult } from '@/lib/types';
import { JOB_LEVELS } from '@/lib/cv-data';
import { t, type Lang } from '@/lib/i18n';

const XP_PER_LEVEL = 100;

function starsForScore(score: number, goal: number): 1 | 2 | 3 {
  const ratio = score / goal;
  if (ratio >= 1.3) return 3;
  if (ratio >= 1) return 2;
  return 1;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: 'lang',
      currentLevelId: null,
      xp: 0,
      results: {},
      booted: false,
      lang: 'es',
      unlockedMode: false,

      setScreen: (s) => set({ screen: s }),
      setCurrentLevel: (id) => set({ currentLevelId: id }),
      setBooted: (v) => set({ booted: v }),
      setLang: (l) => set({ lang: l }),
      setUnlockedMode: (v) => set({ unlockedMode: v }),

      addXp: (amount) => set((st) => ({ xp: Math.max(0, st.xp + amount) })),

      completeLevel: (levelId, score) => {
        const level = JOB_LEVELS.find((l) => l.id === levelId);
        if (!level) return;
        const prev = get().results[levelId];
        const bestScore = prev ? Math.max(prev.bestScore, score) : score;
        const stars = starsForScore(bestScore, level.gameGoal);
        const isNewBest = !prev || score > prev.bestScore;
        const gain = isNewBest
          ? Math.max(0, bestScore - (prev?.bestScore ?? 0)) * 10 + (prev ? 0 : XP_PER_LEVEL)
          : 0;
        const result: LevelResult = {
          score,
          stars,
          completedAt: Date.now(),
          bestScore,
        };
        set((st) => ({
          results: { ...st.results, [levelId]: result },
          xp: st.xp + gain,
        }));
      },

      reset: () =>
        set({
          screen: 'lang',
          currentLevelId: null,
          xp: 0,
          results: {},
          booted: false,
          // keep lang and unlockedMode on reset
        }),
    }),
    {
      name: 'sysadmin-quest-save',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
      partialize: (s) => ({
        xp: s.xp,
        results: s.results,
        booted: s.booted,
        lang: s.lang,
        unlockedMode: s.unlockedMode,
      }),
    },
  ),
);

// Translation hook — returns a function bound to the current language
export function useT() {
  const lang = useGameStore((s) => s.lang);
  return (key: string) => t(lang, key);
}

export function useLang(): Lang {
  return useGameStore((s) => s.lang);
}

export function useCompletedCount() {
  return useGameStore((s) => Object.keys(s.results).length);
}

export function useUnlockedSkills() {
  const results = useGameStore((s) => s.results);
  const completedIds = new Set(Object.keys(results));
  const ids = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (completedIds.has(lvl.id)) {
      lvl.skills.forEach((s) => ids.add(s));
    }
  }
  return ids;
}
