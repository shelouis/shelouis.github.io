'use client';

import { motion } from 'framer-motion';
import { Trophy, Map, FileText, RotateCcw, Unlock, Lock } from 'lucide-react';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { JOB_LEVELS, PERSON, TOTAL_UNLOCKABLE_SKILLS } from '@/lib/cv-data';
import { t } from '@/lib/i18n';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function StatusBar() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);
  const xp = useGameStore((s) => s.xp);
  const results = useGameStore((s) => s.results);
  const reset = useGameStore((s) => s.reset);
  const lang = useLang();
  const tt = useT();
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const setUnlockedMode = useGameStore((s) => s.setUnlockedMode);

  const completedCount = Object.keys(results).length;
  const totalLevels = JOB_LEVELS.length;

  const unlockedSkillIds = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (results[lvl.id]) lvl.skills.forEach((s) => unlockedSkillIds.add(s));
  }
  const unlockedSkillCount = unlockedSkillIds.size;
  const skillPct = Math.round((unlockedSkillCount / TOTAL_UNLOCKABLE_SKILLS) * 100);

  const allDone = completedCount === totalLevels;

  return (
    <header className="sticky top-0 z-40 panel border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2.5 flex items-center gap-3 sm:gap-6">
        {/* Logo / name */}
        <button
          onClick={() => setScreen('map')}
          className="flex items-center gap-2 group shrink-0"
          aria-label={tt('nav.map')}
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded bg-emerald-500/15 border border-emerald-500/40 glow-soft">
            <span className="font-mono-game text-emerald-300 font-bold text-sm">JP</span>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-mono-game text-sm font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors">
              {PERSON.name}
            </span>
            <span className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest">
              SYSADMIN_QUEST
            </span>
          </span>
        </button>

        {/* XP badge */}
        <div className="flex items-center gap-2 rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5 shrink-0">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono-game text-xs sm:text-sm font-bold text-amber-300">
            {xp.toLocaleString()}
          </span>
          <span className="font-mono-game text-[10px] text-amber-500/60 hidden sm:inline">XP</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 min-w-0 hidden md:block">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-game text-[11px] text-emerald-500/70">
              {t(lang, 'status.career')}: {completedCount}/{totalLevels} ·{' '}
              {t(lang, 'status.skills')}: {unlockedSkillCount}/{TOTAL_UNLOCKABLE_SKILLS}
            </span>
            <span className="font-mono-game text-[11px] text-emerald-400/80">{skillPct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/50 overflow-hidden border border-emerald-500/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 glow-soft"
              initial={{ width: 0 }}
              animate={{ width: `${skillPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Unlocked mode toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-black/40 px-2 py-1.5 cursor-pointer">
                {unlockedMode ? (
                  <Unlock className="h-3.5 w-3.5 text-amber-400" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-emerald-500/50" />
                )}
                <Switch
                  checked={unlockedMode}
                  onCheckedChange={setUnlockedMode}
                  className="scale-75 origin-center"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-mono-game text-xs">
              {t(lang, 'lang.unlocked')}: {unlockedMode ? t(lang, 'lang.unlocked.on') : t(lang, 'lang.unlocked.off')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Nav buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <NavButton
            active={screen === 'map'}
            onClick={() => setScreen('map')}
            icon={<Map className="h-4 w-4" />}
            label={tt('nav.map')}
          />
          <NavButton
            active={screen === 'cv'}
            onClick={() => setScreen('cv')}
            icon={<FileText className="h-4 w-4" />}
            label={tt('nav.cv')}
            highlight={allDone}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:w-auto sm:px-3 p-0 text-emerald-500/70 hover:text-rose-400 hover:bg-rose-500/10"
                aria-label={tt('nav.reset')}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline ml-1.5 font-mono-game text-xs">{tt('nav.reset')}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="panel-solid border-emerald-500/30">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-emerald-200">{t(lang, 'reset.title')}</AlertDialogTitle>
                <AlertDialogDescription className="text-emerald-400/70">
                  {t(lang, 'reset.desc')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                  {t(lang, 'reset.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    reset();
                    setScreen('lang');
                  }}
                  className="bg-rose-500 hover:bg-rose-400 text-white"
                >
                  {t(lang, 'reset.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`h-8 px-2 sm:px-3 font-mono-game text-xs gap-1.5 transition-all ${
        active
          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
          : 'text-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent'
      } ${highlight ? 'ring-2 ring-amber-400/60 animate-pulse' : ''}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
