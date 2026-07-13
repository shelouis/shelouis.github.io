'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Map, FileText, RotateCcw, Unlock, Lock, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { JOB_LEVELS, PERSON, TOTAL_UNLOCKABLE_SKILLS } from '@/lib/cv-data';
import { t } from '@/lib/i18n';
import { initAudio, isMuted, setMuted, sfx } from '@/lib/sound';
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
  const [muted, setMutedState] = useState(isMuted());

  const completedCount = Object.keys(results).length;
  const totalLevels = JOB_LEVELS.length;

  const unlockedSkillIds = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (results[lvl.id]) lvl.skills.forEach((s) => unlockedSkillIds.add(s));
  }
  const unlockedSkillCount = unlockedSkillIds.size;
  const skillPct = Math.round((unlockedSkillCount / TOTAL_UNLOCKABLE_SKILLS) * 100);

  const allDone = completedCount === totalLevels;

  const toggleMute = () => {
    initAudio();
    const newMuted = !muted;
    setMuted(newMuted);
    setMutedState(newMuted);
    if (!newMuted) sfx.click();
  };

  return (
    <header className="sticky top-0 z-40 border-b-3 border-emerald-500 bg-black/80 backdrop-blur-sm" style={{ borderBottomWidth: '3px' }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 py-2 flex items-center gap-2 sm:gap-4">
        {/* Logo / name */}
        <button
          onClick={() => { initAudio(); sfx.click(); setScreen('map'); }}
          className="flex items-center gap-2 group shrink-0"
          aria-label={tt('nav.map')}
        >
          <span className="relative flex h-8 w-8 items-center justify-center border-3 border-emerald-500 bg-emerald-500/15" style={{ borderWidth: '3px' }}>
            <span className="font-pixel text-emerald-300 font-bold text-xs">JP</span>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-pixel text-xs font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors">
              {PERSON.name}
            </span>
            <span className="font-mono-game text-sm text-emerald-500/70 tracking-wide">
              SYSADMIN_QUEST
            </span>
          </span>
        </button>

        {/* XP badge */}
        <div className="flex items-center gap-1.5 border-3 border-amber-500 bg-black/60 px-2 py-1 shrink-0" style={{ borderWidth: '3px' }}>
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-pixel text-xs font-bold text-amber-300">
            {xp.toLocaleString()}
          </span>
          <span className="font-mono-game text-sm text-amber-500/70 hidden sm:inline">XP</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 min-w-0 hidden md:block">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-game text-sm text-emerald-500/80">
              {t(lang, 'status.career')}: {completedCount}/{totalLevels} ·{' '}
              {t(lang, 'status.skills')}: {unlockedSkillCount}/{TOTAL_UNLOCKABLE_SKILLS}
            </span>
            <span className="font-mono-game text-sm text-emerald-400/90">{skillPct}%</span>
          </div>
          <div className="h-2 w-full bg-black border-2 border-emerald-500/30" style={{ borderWidth: '2px' }}>
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${skillPct}%` }}
              transition={{ duration: 0.4, ease: 'steps(8)' }}
            />
          </div>
        </div>

        {/* Unlocked mode toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => { initAudio(); sfx.click(); setUnlockedMode(!unlockedMode); }}
                className={`flex items-center justify-center h-8 w-8 border-3 ${unlockedMode ? 'border-amber-500 bg-amber-500/15' : 'border-emerald-500/30 bg-black/40'}`}
                style={{ borderWidth: '3px' }}
                aria-label={tt('lang.unlocked')}
              >
                {unlockedMode ? <Unlock className="h-4 w-4 text-amber-400" /> : <Lock className="h-4 w-4 text-emerald-500/60" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-mono-game text-base">
              {t(lang, 'lang.unlocked')}: {unlockedMode ? t(lang, 'lang.unlocked.on') : t(lang, 'lang.unlocked.off')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className={`flex items-center justify-center h-8 w-8 border-3 ${muted ? 'border-rose-500 bg-rose-500/10' : 'border-emerald-500/40 bg-black/40'}`}
          style={{ borderWidth: '3px' }}
          aria-label={muted ? (lang === 'es' ? 'Activar sonido' : 'Unmute') : (lang === 'es' ? 'Silenciar' : 'Mute')}
        >
          {muted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
        </button>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          <NavButton
            active={screen === 'map'}
            onClick={() => { initAudio(); sfx.click(); setScreen('map'); }}
            icon={<Map className="h-4 w-4" />}
            label={tt('nav.map')}
          />
          <NavButton
            active={screen === 'docs'}
            onClick={() => { setScreen('docs'); }}
            icon={<BookOpen className="h-4 w-4" />}
            label={tt('nav.docs')}
          />
          <NavButton
            active={screen === 'cv'}
            onClick={() => { initAudio(); sfx.click(); setScreen('cv'); }}
            icon={<FileText className="h-4 w-4" />}
            label={tt('nav.cv')}
            highlight={allDone}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 sm:w-auto sm:px-2 p-0 text-emerald-500/70 hover:text-rose-400 hover:bg-rose-500/10 border-3 border-transparent hover:border-rose-500/40"
                style={{ borderWidth: '3px' }}
                aria-label={tt('nav.reset')}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline ml-1 font-pixel text-xs">{tt('nav.reset')}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="panel-solid border-emerald-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-emerald-200 font-pixel text-sm">{t(lang, 'reset.title')}</AlertDialogTitle>
                <AlertDialogDescription className="text-emerald-400/80 font-mono-game text-base">
                  {t(lang, 'reset.desc')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-3 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-pixel text-xs" style={{ borderWidth: '3px' }}>
                  {t(lang, 'reset.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    reset();
                    setScreen('lang');
                  }}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-pixel text-xs border-3 border-black"
                  style={{ borderWidth: '3px' }}
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
    <button
      onClick={onClick}
      className={`h-8 px-2 sm:px-2 font-pixel text-xs gap-1 transition-all border-3 inline-flex items-center justify-center ${
        active
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
          : 'text-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-500/10 border-transparent'
      } ${highlight ? 'ring-2 ring-amber-400/60 animate-pulse' : ''}`}
      style={{ borderWidth: '3px' }}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
