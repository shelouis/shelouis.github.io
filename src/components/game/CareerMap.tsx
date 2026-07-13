'use client';

import { motion } from 'framer-motion';
import {
  Lock,
  CheckCircle2,
  Star,
  MapPin,
  Briefcase,
  Clock,
  Play,
  ChevronRight,
  Sparkles,
  Award,
  Unlock,
} from 'lucide-react';
import { JOB_LEVELS, PERSON } from '@/lib/cv-data';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { t } from '@/lib/i18n';
import { getAccent, type AccentClasses } from '@/lib/accents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CareerMap() {
  const results = useGameStore((s) => s.results);
  const setCurrentLevel = useGameStore((s) => s.setCurrentLevel);
  const setScreen = useGameStore((s) => s.setScreen);
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const lang = useLang();
  const tt = useT();

  const totalCompleted = Object.keys(results).length;
  const totalXp = useGameStore((s) => s.xp);
  const allDone = totalCompleted === JOB_LEVELS.length;

  const handlePlay = (levelId: string, index: number) => {
    // unlock rule: unlocked mode OR (previous level completed OR first level)
    if (!unlockedMode && index > 0 && !results[JOB_LEVELS[index - 1].id]) return;
    setCurrentLevel(levelId);
    setScreen('game');
  };

  return (
    <div className="relative mx-auto max-w-6xl px-3 sm:px-6 py-8 sm:py-12">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 sm:mb-12"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-3 border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono-game"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {tt('map.badge')}
            </Badge>
            <h1 className="font-mono-game text-3xl sm:text-5xl font-bold text-emerald-200 glow-text leading-tight">
              {tt('map.title1')}
              <br />
              <span className="text-emerald-300">{PERSON.name}</span>
            </h1>
            <p className="font-mono-game text-sm sm:text-base text-emerald-500/70 mt-3 max-w-2xl">
              {PERSON.title[lang]}
            </p>
            <p className="text-sm text-emerald-400/60 mt-2 max-w-2xl">{tt('map.subtitle')}</p>
          </div>

          {/* Stats card */}
          <div className="panel rounded-lg p-4 min-w-[180px]">
            <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-2">
              {tt('map.progress')}
            </div>
            <div className="space-y-2">
              <Stat
                label={tt('map.levels')}
                value={`${totalCompleted}/${JOB_LEVELS.length}`}
                icon={<Briefcase className="h-3.5 w-3.5" />}
              />
              <Stat
                label={tt('map.xp')}
                value={totalXp.toLocaleString()}
                icon={<Award className="h-3.5 w-3.5" />}
              />
            </div>
            {unlockedMode && (
              <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center gap-1.5">
                <Unlock className="h-3 w-3 text-amber-400" />
                <span className="font-mono-game text-[10px] text-amber-300">
                  {t(lang, 'lang.unlocked')} {t(lang, 'lang.unlocked.on')}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Timeline path */}
      <div className="relative">
        {/* Vertical connector line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 -translate-x-1/2" />

        <div className="space-y-6 md:space-y-12">
          {JOB_LEVELS.map((level, idx) => {
            const result = results[level.id];
            const isCompleted = !!result;
            const prevCompleted = idx === 0 || !!results[JOB_LEVELS[idx - 1].id];
            const isLocked = !unlockedMode && !prevCompleted;
            const accent = getAccent(level.accent);
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 items-center`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
                  <div
                    className={`h-4 w-4 rounded-full ${accent.dot} ring-4 ring-background ${
                      isCompleted ? 'glow-soft' : ''
                    } ${isLocked ? 'opacity-50' : ''}`}
                  />
                </div>

                {/* Card: alternating side on desktop */}
                <div
                  className={`${
                    isLeft ? 'md:col-start-1 md:pr-4' : 'md:col-start-2 md:pl-4 md:row-start-1'
                  }`}
                >
                  <LevelCard
                    level={level}
                    isCompleted={isCompleted}
                    isLocked={isLocked}
                    isFree={unlockedMode && !isCompleted}
                    stars={result?.stars}
                    bestScore={result?.bestScore}
                    onPlay={() => handlePlay(level.id, idx)}
                    accent={accent}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Final CTA */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <div className="panel rounded-lg p-6 inline-block glow-emerald">
            <Award className="h-10 w-10 text-amber-400 mx-auto mb-3" />
            <h3 className="font-mono-game text-xl font-bold text-emerald-200 mb-1">
              {tt('map.complete')}
            </h3>
            <p className="text-sm text-emerald-400/70 mb-4">{tt('map.complete.desc')}</p>
            <Button
              onClick={() => setScreen('cv')}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono-game font-bold"
            >
              {tt('map.viewcv')} <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Footer note */}
      <p className="text-center text-[11px] text-emerald-500/40 mt-12 font-mono-game">
        {tt('map.note')}
      </p>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-xs text-emerald-400/70">
        {icon}
        {label}
      </span>
      <span className="font-mono-game text-sm font-bold text-emerald-200">{value}</span>
    </div>
  );
}

function LevelCard({
  level,
  isCompleted,
  isLocked,
  isFree,
  stars,
  bestScore,
  onPlay,
  accent,
}: {
  level: (typeof JOB_LEVELS)[number];
  isCompleted: boolean;
  isLocked: boolean;
  isFree: boolean;
  stars?: 1 | 2 | 3;
  bestScore?: number;
  onPlay: () => void;
  accent: AccentClasses;
}) {
  const lang = useLang();
  const tt = useT();
  return (
    <div
      className={`relative panel rounded-lg p-5 transition-all duration-300 ${
        isLocked ? 'opacity-50 grayscale' : accent.glow
      } ${isCompleted ? accent.border : 'border-emerald-500/20'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-md font-mono-game font-bold text-sm ${accent.bg} ${accent.text} border ${accent.border}`}
          >
            {String(level.index).padStart(2, '0')}
          </span>
          <div>
            <div className={`font-mono-game text-[10px] tracking-widest ${accent.text}`}>
              {tt('map.level')} {level.index}
            </div>
            <div className="font-mono-game text-xs text-emerald-500/60">{level.period[lang]}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`h-3.5 w-3.5 ${
                    s <= (stars ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-emerald-500/20'
                  }`}
                />
              ))}
            </div>
          )}
          {isLocked && <Lock className="h-4 w-4 text-emerald-500/40" />}
          {isFree && <Unlock className="h-4 w-4 text-amber-400" />}
        </div>
      </div>

      {/* Title */}
      <h3 className={`font-mono-game text-lg font-bold ${accent.text} mb-1`}>
        {level.gameTitle[lang]}
      </h3>
      <div className="text-sm font-semibold text-emerald-100 mb-1">{level.role[lang]}</div>
      <div className="flex items-center gap-2 text-xs text-emerald-400/60 mb-3 flex-wrap">
        <span className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" /> {level.company}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {level.location[lang]}
        </span>
        <Badge
          variant="outline"
          className="h-4 px-1.5 text-[10px] border-emerald-500/30 text-emerald-400/70"
        >
          {t(lang, `mode.${level.mode}`)}
        </Badge>
      </div>

      {/* Summary */}
      <p className="text-xs text-emerald-400/70 leading-relaxed mb-4 line-clamp-3">
        {level.summary[lang]}
      </p>

      {/* Game info */}
      <div className="flex items-center gap-2 mb-4 text-[11px] font-mono-game flex-wrap">
        <Clock className="h-3 w-3 text-emerald-500/60" />
        <span className="text-emerald-400/60">{tt('map.goal')}:</span>
        <span className={accent.text}>
          {level.gameGoal} {tt('map.pts')}
        </span>
        {bestScore !== undefined && (
          <>
            <span className="text-emerald-500/40">·</span>
            <span className="text-emerald-400/60">{tt('map.best')}:</span>
            <span className="text-emerald-200 font-bold">{bestScore}</span>
          </>
        )}
      </div>

      {/* Play button */}
      <Button
        onClick={onPlay}
        disabled={isLocked}
        className={`w-full font-mono-game text-sm font-bold ${
          isLocked
            ? 'bg-emerald-500/5 text-emerald-500/30 cursor-not-allowed'
            : isCompleted || isFree
            ? `${accent.bg} ${accent.text} border ${accent.border} hover:bg-emerald-500/20`
            : 'bg-emerald-500 hover:bg-emerald-400 text-black'
        }`}
      >
        {isLocked ? (
          <>
            <Lock className="h-4 w-4 mr-1.5" /> {tt('map.locked')}
          </>
        ) : isCompleted ? (
          <>
            <Play className="h-4 w-4 mr-1.5" /> {tt('map.replay')}
          </>
        ) : isFree ? (
          <>
            <Unlock className="h-4 w-4 mr-1.5" /> {tt('map.play')}
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-1.5" /> {tt('map.play')}
          </>
        )}
      </Button>

      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-mono-game font-bold text-black">
          <CheckCircle2 className="h-3 w-3" /> OK
        </div>
      )}
    </div>
  );
}
