// Core type definitions for the SysAdmin Quest game

export type Screen = 'boot' | 'map' | 'game' | 'cv';

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
  name: string;
  category: SkillCategory;
  icon?: string;
}

export interface JobLevel {
  id: string;
  index: number;
  company: string;
  role: string;
  location: string;
  mode: 'Remoto' | 'Híbrido' | 'Freelance';
  period: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  summary: string;
  achievements: string[];
  skills: string[]; // skill ids unlocked by completing this level
  gameId: GameId;
  gameTitle: string;
  gameDescription: string;
  gameGoal: number; // target score to "complete"
  accent: string; // tailwind color name, e.g. 'emerald'
}

export type GameId =
  | 'ticket-triage'
  | 'server-monitor'
  | 'multi-panel'
  | 'team-router'
  | 'pipeline-builder'
  | 'bug-hunter'
  | 'migration';

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
  // boot
  booted: boolean;
  // actions
  setScreen: (s: Screen) => void;
  setCurrentLevel: (id: string | null) => void;
  completeLevel: (levelId: string, score: number) => void;
  addXp: (amount: number) => void;
  setBooted: (v: boolean) => void;
  reset: () => void;
}
