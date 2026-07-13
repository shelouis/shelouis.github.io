'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Trophy, Star, RotateCcw, ChevronRight, Info } from 'lucide-react';
import type { JobLevel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAccent } from '@/lib/accents';
import { useLang, useT } from '@/store/game-store';
import { t } from '@/lib/i18n';

type Phase = 'intro' | 'playing' | 'done';

export interface MiniGameProps {
  onScore: (score: number) => void;
  onFinish: () => void;
}

interface GameFrameProps {
  level: JobLevel;
  onExit: () => void;
  onComplete: (score: number) => void;
  children: (props: MiniGameProps & { phase: Phase; setPhase: (p: Phase) => void }) => ReactNode;
}

export function GameFrame({ level, onExit, onComplete, children }: GameFrameProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [finalScore, setFinalScore] = useState(0);
  const accent = getAccent(level.accent);
  const lang = useLang();
  const tt = useT();

  const handleScore = (score: number) => {
    setFinalScore(score);
    setPhase('done');
  };

  const handleFinish = () => {
    onComplete(finalScore);
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Sub-header with level info */}
      <div className="border-b border-emerald-500/20 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 py-2.5 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-emerald-400/70 hover:text-emerald-200 hover:bg-emerald-500/10 h-8 px-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1 font-mono-game text-xs">{tt('nav.exit')}</span>
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded font-mono-game text-xs font-bold ${accent.bg} ${accent.text} border ${accent.border}`}
            >
              {String(level.index).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <div className="font-mono-game text-xs text-emerald-500/60 truncate">
                {level.company} · {level.role[lang]}
              </div>
              <div className={`font-mono-game text-sm font-bold ${accent.text} truncate`}>
                {level.gameTitle[lang]}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`ml-auto shrink-0 font-mono-game text-[10px] ${accent.badge}`}>
            {tt('map.goal')}: {level.gameGoal}
          </Badge>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-3 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto"
            >
              <IntroCard level={level} accent={accent} onStart={() => setPhase('playing')} />
            </motion.div>
          )}

          {phase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children({
                onScore: handleScore,
                onFinish: handleFinish,
                phase,
                setPhase,
              })}
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto"
            >
              <ResultCard
                level={level}
                accent={accent}
                score={finalScore}
                onFinish={handleFinish}
                onRetry={() => {
                  setFinalScore(0);
                  setPhase('playing');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IntroCard({
  level,
  accent,
  onStart,
}: {
  level: JobLevel;
  accent: ReturnType<typeof getAccent>;
  onStart: () => void;
}) {
  const lang = useLang();
  const tt = useT();
  return (
    <div className="panel rounded-lg p-6 sm:p-8">
      <div
        className={`inline-flex items-center gap-1.5 rounded-md border ${accent.border} ${accent.bg} px-2.5 py-1 mb-4`}
      >
        <Info className={`h-3 w-3 ${accent.text}`} />
        <span className={`font-mono-game text-[10px] tracking-widest ${accent.text}`}>
          {tt('game.briefing')}
        </span>
      </div>

      <h2 className={`font-mono-game text-2xl sm:text-3xl font-bold ${accent.textBright} glow-text mb-2`}>
        {level.gameTitle[lang]}
      </h2>
      <p className="text-sm text-emerald-300/80 mb-6">{level.gameDescription[lang]}</p>

      {/* Context */}
      <div className="rounded-md border border-emerald-500/20 bg-black/30 p-4 mb-6">
        <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-2">
          {tt('game.context')}
        </div>
        <p className="text-sm text-emerald-200/90 leading-relaxed">{level.summary[lang]}</p>
      </div>

      {/* Achievements preview */}
      <div className="mb-6">
        <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-2">
          {tt('game.achievements')}
        </div>
        <ul className="space-y-1.5">
          {level.achievements.slice(0, 3).map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-emerald-300/80">
              <span className={`${accent.text} mt-0.5`}>▸</span>
              <span>{a[lang]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Goal */}
      <div className="flex items-center justify-between rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span className="font-mono-game text-xs text-emerald-300/80">
            {tt('game.objective')}:{' '}
            <span className="text-amber-300 font-bold">
              {level.gameGoal} {tt('game.points')}
            </span>
          </span>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60">
          ★★★ = {Math.round(level.gameGoal * 1.3)}+
        </div>
      </div>

      <Button
        onClick={onStart}
        className={`w-full font-mono-game font-bold ${accent.fill} ${accent.fillHover} text-black h-11`}
      >
        <Play className="h-4 w-4 mr-2" />
        {tt('game.start')}
      </Button>
    </div>
  );
}

function ResultCard({
  level,
  accent,
  score,
  onFinish,
  onRetry,
}: {
  level: JobLevel;
  accent: ReturnType<typeof getAccent>;
  score: number;
  onFinish: () => void;
  onRetry: () => void;
}) {
  const lang = useLang();
  const tt = useT();
  const ratio = score / level.gameGoal;
  const passed = ratio >= 1;
  const stars: 1 | 2 | 3 = ratio >= 1.3 ? 3 : ratio >= 1 ? 2 : 1;

  return (
    <div className={`panel rounded-lg p-6 sm:p-8 text-center ${passed ? 'glow-soft' : ''}`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto mb-4"
      >
        {passed ? (
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 border-2 border-amber-400/60">
            <Trophy className="h-8 w-8 text-amber-400" />
          </div>
        ) : (
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20 border-2 border-rose-400/60">
            <RotateCcw className="h-8 w-8 text-rose-400" />
          </div>
        )}
      </motion.div>

      <h2
        className={`font-mono-game text-2xl font-bold ${passed ? 'text-emerald-200' : 'text-rose-300'} mb-1`}
      >
        {passed ? tt('game.passed') : tt('game.failed')}
      </h2>
      <p className="text-sm text-emerald-400/70 mb-6">
        {passed ? tt('game.passed.desc') : tt('game.failed.desc')}
      </p>

      {/* Score */}
      <div className="mb-6">
        <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-1">
          {tt('game.score')}
        </div>
        <div className="font-mono-game text-5xl font-bold text-emerald-100">{score}</div>
        <div className="font-mono-game text-xs text-emerald-500/60 mt-1">
          / {level.gameGoal} {tt('game.toapprove')}
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <motion.div
            key={s}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 + s * 0.15, type: 'spring', stiffness: 200 }}
          >
            <Star
              className={`h-8 w-8 ${
                s <= stars ? 'text-amber-400 fill-amber-400 glow-text' : 'text-emerald-500/15'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Skills unlocked (only if passed) */}
      {passed && level.skills.length > 0 && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 mb-6">
          <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-2">
            {tt('game.skills.unlocked')} (+{level.skills.length})
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {level.skills.slice(0, 6).map((sid) => (
              <Badge
                key={sid}
                variant="outline"
                className="font-mono-game text-[10px] border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
              >
                {sid}
              </Badge>
            ))}
            {level.skills.length > 6 && (
              <Badge
                variant="outline"
                className="font-mono-game text-[10px] border-emerald-500/30 text-emerald-400/60"
              >
                +{level.skills.length - 6} {tt('game.more')}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex-1 font-mono-game border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
        >
          <RotateCcw className="h-4 w-4 mr-1.5" /> {tt('game.retry')}
        </Button>
        <Button
          onClick={onFinish}
          className={`flex-1 font-mono-game font-bold ${
            passed ? `${accent.fill} ${accent.fillHover} text-black` : 'bg-emerald-500/20 text-emerald-300'
          }`}
        >
          {tt('game.continue')} <ChevronRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
