// Core type definitions for the SysAdmin Quest game

import type { Lang } from './i18n';

export type Screen = 'lang' | 'boot' | 'map' | 'game' | 'cv' | 'docs';

export type WorkMode = 'remote' | 'hybrid' | 'freelance';

export type SkillCategory =
  | 'os'
  | 'cloud'
  | 'devops'
  | 'backend'
  | 'virtualization'
  | 'monitoring'
  | 'network'
  | 'tools'
  | 'tickets'
  | 'languages';

export interface Skill {
  id: string;
  category: SkillCategory;
  icon?: string;
}

export type Bi = { es: string; en: string };

export interface JobLevel {
  id: string;
  index: number;
  company: string;
  role: Bi;
  location: Bi;
  mode: WorkMode;
  period: Bi;
  startDate: string;
  endDate: string;
  durationYears: number;
  summary: Bi;
  achievements: Bi[];
  skills: string[]; // skill ids unlocked by completing this level
  gameId: GameId;
  gameTitle: Bi;
  gameDescription: Bi;
  gameGoal: number; // target score to "complete"
  accent: string; // accent name, e.g. 'emerald'
  howTo: Bi[]; // step-by-step instructions on how to play
  scoring: Bi; // how scoring works
}

export type GameId =
  | 'ticket-triage'
  | 'server-monitor'
  | 'multi-panel'
  | 'team-router'
  | 'pipeline-builder'
  | 'bug-hunter'
  | 'migration'
  | 'prompt-architect';

export interface LevelResult {
  score: number;
  stars: 1 | 2 | 3;
  completedAt: number;
  bestScore: number;
}

export interface GameState {
  screen: Screen;
  currentLevelId: string | null;
  xp: number;
  results: Record<string, LevelResult>;
  booted: boolean;
  lang: Lang;
  unlockedMode: boolean;
  // actions
  setScreen: (s: Screen) => void;
  setCurrentLevel: (id: string | null) => void;
  completeLevel: (levelId: string, score: number) => void;
  addXp: (amount: number) => void;
  setBooted: (v: boolean) => void;
  setLang: (l: Lang) => void;
  setUnlockedMode: (v: boolean) => void;
  reset: () => void;
}
