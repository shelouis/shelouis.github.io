'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Target,
  Gamepad2,
  Briefcase,
  MousePointer,
  Trophy,
  Play,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { JOB_LEVELS } from '@/lib/cv-data';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { t } from '@/lib/i18n';
import { getAccent } from '@/lib/accents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { initAudio, sfx } from '@/lib/sound';

export default function Documentation() {
  const lang = useLang();
  const tt = useT();
  const setScreen = useGameStore((s) => s.setScreen);
  const setCurrentLevel = useGameStore((s) => s.setCurrentLevel);
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const results = useGameStore((s) => s.results);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const selected = JOB_LEVELS[selectedIdx];
  const accent = getAccent(selected.accent);

  const handlePlay = (levelId: string, index: number) => {
    initAudio();
    sfx.click();
    const prevCompleted = index === 0 || !!results[JOB_LEVELS[index - 1].id];
    if (!unlockedMode && !prevCompleted && !results[levelId]) return;
    setCurrentLevel(levelId);
    setScreen('game');
  };

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  return (
    <div className="relative mx-auto max-w-6xl px-3 sm:px-6 py-6 sm:py-8">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-30" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center border-3 border-emerald-500 bg-emerald-500/10" style={{ borderWidth: '3px' }}>
            <BookOpen className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-pixel text-lg sm:text-2xl font-bold text-emerald-200 glow-text">
              {tt('docs.title')}
            </h1>
            <p className="font-mono-game text-base text-emerald-500/70 mt-1">
              {tt('docs.subtitle')}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="relative grid lg:grid-cols-[280px_1fr] gap-4">
        {/* Level list sidebar */}
        <div className="panel p-3 max-h-[600px] overflow-y-auto scroll-thin">
          <div className="font-pixel text-xs text-emerald-500/60 tracking-widest mb-3">
            {tt('docs.levels')}
          </div>
          <div className="space-y-1">
            {JOB_LEVELS.map((level, idx) => {
              const a = getAccent(level.accent);
              const isSel = idx === selectedIdx;
              return (
                <button
                  key={level.id}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center gap-2 p-2 border-3 transition-all text-left ${
                    isSel
                      ? `${a.border} ${a.bg} ${a.text}`
                      : 'border-transparent hover:border-emerald-500/30 hover:bg-emerald-500/5 text-emerald-300/70'
                  }`}
                  style={{ borderWidth: '3px' }}
                >
                  <span className={`font-pixel text-xs font-bold ${isSel ? a.text : 'text-emerald-500/50'}`}>
                    {String(level.index).padStart(2, '0')}
                  </span>
                  <span className={`font-mono-game text-sm ${isSel ? a.text : 'text-emerald-300/70'}`}>
                    {level.gameTitle[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected level detail */}
        <div key={selected.id} className="panel p-4 sm:p-6">
            {/* Level header */}
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center font-pixel text-lg font-bold ${accent.bg} ${accent.text} border-3 ${accent.border}`} style={{ borderWidth: '3px' }}>
                  {String(selected.index).padStart(2, '0')}
                </span>
                <div>
                  <h2 className={`font-pixel text-base sm:text-xl font-bold ${accent.text} glow-text`}>
                    {selected.gameTitle[lang]}
                  </h2>
                  <div className="font-mono-game text-base text-emerald-400/70 mt-1">
                    {selected.company} · {selected.role[lang]}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={`font-mono-game text-sm ${accent.badge}`} style={{ borderWidth: '2px' }}>
                {tt('docs.game')} {selected.index}/8
              </Badge>
            </div>

            {/* Screenshot */}
            <div className="mb-5">
              <div className="font-pixel text-xs text-emerald-500/60 tracking-widest mb-2 flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                {tt('docs.screenshot')}
              </div>
              <button
                onClick={() => { sfx.click(); setZoomImg(selected.gameId); }}
                className="block w-full group relative"
              >
                <div className={`relative border-3 ${accent.border} bg-black overflow-hidden pixel-clip`} style={{ borderWidth: '3px' }}>
                  {/* Screenshot image */}
                  <ScreenshotPlaceholder gameId={selected.gameId} title={selected.gameTitle[lang]} accent={accent.text} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-2 text-emerald-300 font-pixel text-xs bg-black/80 border-3 border-emerald-500 px-3 py-2" style={{ borderWidth: '3px' }}>
                      <MousePointer className="h-4 w-4" />
                      {tt('docs.zoom')}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* How to play */}
            <div className="mb-5">
              <div className="font-pixel text-xs text-emerald-500/60 tracking-widest mb-2 flex items-center gap-2">
                <Gamepad2 className="h-3 w-3" />
                {tt('docs.howto')}
              </div>
              <ol className="space-y-2">
                {selected.howTo.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`font-pixel text-xs font-bold ${accent.text} mt-0.5 shrink-0`}>
                      {i + 1}.
                    </span>
                    <span className="font-mono-game text-base text-emerald-100/90 leading-snug">
                      {step[lang]}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Two-column: Objective + Controls */}
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {/* Objective */}
              <div className="border-3 border-amber-500/40 bg-amber-500/5 p-3" style={{ borderWidth: '3px' }}>
                <div className="font-pixel text-xs text-amber-400 tracking-widest mb-2 flex items-center gap-2">
                  <Target className="h-3 w-3" />
                  {tt('docs.objective')}
                </div>
                <p className="font-mono-game text-base text-amber-100/90 leading-snug">
                  {selected.gameDescription[lang]}
                </p>
                <div className="mt-2 pt-2 border-t-2 border-amber-500/20 flex items-center gap-2" style={{ borderTopWidth: '2px' }}>
                  <Trophy className="h-3 w-3 text-amber-400" />
                  <span className="font-mono-game text-sm text-amber-400/80">
                    {tt('map.goal')}: <span className="text-amber-300 font-bold">{selected.gameGoal}</span>
                  </span>
                </div>
              </div>

              {/* Controls + Scoring */}
              <div className="border-3 border-cyan-500/40 bg-cyan-500/5 p-3" style={{ borderWidth: '3px' }}>
                <div className="font-pixel text-xs text-cyan-400 tracking-widest mb-2 flex items-center gap-2">
                  <MousePointer className="h-3 w-3" />
                  {tt('docs.controls')}
                </div>
                <div className="font-mono-game text-base text-cyan-100/90 mb-2">
                  • {tt('docs.click')}<br />
                  • {tt('docs.tap')}
                </div>
                <div className="pt-2 border-t-2 border-cyan-500/20" style={{ borderTopWidth: '2px' }}>
                  <div className="font-pixel text-xs text-cyan-400 mb-1">{tt('docs.scoring')}</div>
                  <p className="font-mono-game text-sm text-cyan-100/80 leading-snug">
                    {selected.scoring[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Reference role */}
            <div className="border-3 border-emerald-500/30 bg-black/30 p-3 mb-5" style={{ borderWidth: '3px' }}>
              <div className="font-pixel text-xs text-emerald-400 tracking-widest mb-2 flex items-center gap-2">
                <Briefcase className="h-3 w-3" />
                {tt('docs.role')}
              </div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-pixel text-sm text-emerald-200">{selected.role[lang]}</span>
                <span className="text-emerald-500/40">·</span>
                <span className="font-mono-game text-sm text-emerald-400/70">{selected.company}</span>
                <span className="text-emerald-500/40">·</span>
                <span className="font-mono-game text-sm text-emerald-400/70">{selected.period[lang]}</span>
              </div>
              <p className="font-mono-game text-base text-emerald-200/80 leading-snug mb-2">
                {selected.summary[lang]}
              </p>
              <div className="flex flex-wrap gap-1">
                {selected.skills.map((sid) => (
                  <span key={sid} className="font-mono-game text-xs text-emerald-400/60 border-2 border-emerald-500/20 px-1.5 py-0.5" style={{ borderWidth: '2px' }}>
                    {sid}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation + Play */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => { sfx.click(); setSelectedIdx((i) => Math.max(0, i - 1)); }}
                  disabled={selectedIdx === 0}
                  className="font-pixel text-xs border-3 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-30"
                  style={{ borderWidth: '3px' }}
                >
                  <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">{tt('docs.prev')}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { sfx.click(); setSelectedIdx((i) => Math.min(JOB_LEVELS.length - 1, i + 1)); }}
                  disabled={selectedIdx === JOB_LEVELS.length - 1}
                  className="font-pixel text-xs border-3 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-30"
                  style={{ borderWidth: '3px' }}
                >
                  <span className="hidden sm:inline">{tt('docs.next')}</span> <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => handlePlay(selected.id, selectedIdx)}
                className={`font-pixel text-xs ${accent.fill} ${accent.fillHover} text-black border-3 border-black`}
                style={{ borderWidth: '3px' }}
              >
                <Play className="h-4 w-4" />
                {tt('docs.play')}
              </Button>
            </div>
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImg(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { sfx.click(); setZoomImg(null); }}
                className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center border-3 border-emerald-500 bg-black text-emerald-400 hover:bg-emerald-500/10"
                style={{ borderWidth: '3px' }}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="border-3 border-emerald-500 bg-black overflow-hidden" style={{ borderWidth: '3px' }}>
                <ScreenshotPlaceholder gameId={zoomImg} title={selected.gameTitle[lang]} accent={accent.text} large />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Screenshot component — shows actual game screenshot if available, otherwise stylized placeholder
function ScreenshotPlaceholder({
  gameId,
  title,
  accent,
  large,
}: {
  gameId: string;
  title: string;
  accent: string;
  large?: boolean;
}) {
  const height = large ? 'h-[400px]' : 'h-[160px] sm:h-[200px]';

  return (
    <div className={`relative w-full ${height} bg-black flex items-center justify-center grid-bg overflow-hidden`}>
      {/* Real screenshot image */}
      <img
        src={`/screenshots/${gameId}.png`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-top pixelated"
        onError={(e) => {
          // hide image if it fails to load, show placeholder instead
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Stylized placeholder (shows behind/over image if image fails) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <div className={`font-pixel text-xs ${accent} glow-text text-center`}>
          {title.toUpperCase()}
        </div>
        <div className="font-mono-game text-sm text-emerald-500/50 text-center">
          {'› ' + gameId}
        </div>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`${large ? 'w-6 h-6' : 'w-3 h-3'} bg-emerald-500`}
              style={{ opacity: 0.3 + (i % 3) * 0.2 }}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`${large ? 'w-12 h-3' : 'w-6 h-1.5'} ${accent.replace('text-', 'bg-')}`}
              style={{ opacity: 0.4 + (i % 2) * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
