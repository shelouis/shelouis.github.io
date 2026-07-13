'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Unlock, Check, ChevronRight, Languages, Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { t } from '@/lib/i18n';
import { initAudio, startMusic, stopMusic, isMuted, setMuted } from '@/lib/sound';
import { Switch } from '@/components/ui/switch';
import { PERSON, TOTAL_LEVELS, TOTAL_UNLOCKABLE_SKILLS } from '@/lib/cv-data';

export default function LanguageSelect() {
  const lang = useGameStore((s) => s.lang);
  const setLang = useGameStore((s) => s.setLang);
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const setUnlockedMode = useGameStore((s) => s.setUnlockedMode);
  const setScreen = useGameStore((s) => s.setScreen);
  const [muted, setMutedState] = useMutedState();

  // Start background music on mount, stop on unmount
  useEffect(() => {
    if (!muted) {
      // delay slightly to ensure audio context is ready
      const timer = setTimeout(() => startMusic(), 200);
      return () => {
        clearTimeout(timer);
        stopMusic();
      };
    }
  }, [muted]);

  const handleContinue = () => {
    initAudio();
    stopMusic();
    setScreen('boot');
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setMutedState(newMuted);
    if (newMuted) stopMusic();
    else setTimeout(() => startMusic(), 100);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center border-3 border-emerald-500 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
        style={{ borderWidth: '3px' }}
        aria-label={muted ? (lang === 'es' ? 'Activar sonido' : 'Unmute') : (lang === 'es' ? 'Silenciar' : 'Mute')}
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-lg"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full" />
            <div className="relative h-16 w-16 flex items-center justify-center border-3 border-emerald-500 bg-emerald-500/10 glow-emerald" style={{ borderWidth: '3px' }}>
              <Languages className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="font-pixel text-xl sm:text-2xl font-bold text-emerald-300 glow-text tracking-tight">
              SYSADMIN
            </h1>
            <h1 className="font-pixel text-xl sm:text-2xl font-bold text-emerald-300 glow-text tracking-tight mt-1">
              QUEST
            </h1>
            <p className="font-mono-game text-base text-emerald-500/80 tracking-wider mt-2">
              {t(lang, 'lang.subtitle')}
            </p>
          </div>
        </div>

        {/* Language options */}
        <div className="panel p-5 sm:p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span className="font-pixel text-xs font-bold text-emerald-200">
              {t(lang, 'lang.title')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LangOption
              name="Español"
              code="ES"
              selected={lang === 'es'}
              onClick={() => { initAudio(); setLang('es'); }}
            />
            <LangOption
              name="English"
              code="EN"
              selected={lang === 'en'}
              onClick={() => { initAudio(); setLang('en'); }}
            />
          </div>
        </div>

        {/* Unlocked mode toggle */}
        <div className="panel p-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center border-3 ${
                  unlockedMode
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-emerald-500/30 bg-emerald-500/5'
                }`}
                style={{ borderWidth: '3px' }}
              >
                <Unlock
                  className={`h-4 w-4 ${unlockedMode ? 'text-amber-400' : 'text-emerald-500/60'}`}
                />
              </div>
              <div className="min-w-0">
                <div className="font-pixel text-xs font-bold text-emerald-200">
                  {t(lang, 'lang.unlocked')}
                </div>
                <div className="font-mono-game text-sm text-emerald-500/70">
                  {t(lang, 'lang.unlocked.desc')}
                </div>
              </div>
            </div>
            <Switch checked={unlockedMode} onCheckedChange={setUnlockedMode} />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          onMouseEnter={() => !muted && initAudio()}
          className="neon-btn group w-full inline-flex items-center justify-center gap-2 border-3 border-black bg-emerald-500 px-6 py-3.5 font-pixel text-xs font-bold text-black hover:bg-emerald-400 transition-colors pixel-raised"
          style={{ borderWidth: '3px' }}
        >
          <Check className="h-4 w-4" />
          {t(lang, 'lang.continue')}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Stats preview */}
        <div className="mt-6 flex items-center justify-center gap-4 text-center">
          <div className="font-mono-game text-sm text-emerald-500/60">
            {TOTAL_LEVELS} {lang === 'es' ? 'niveles' : 'levels'}
          </div>
          <span className="text-emerald-500/30">·</span>
          <div className="font-mono-game text-sm text-emerald-500/60">
            {TOTAL_UNLOCKABLE_SKILLS} {lang === 'es' ? 'habilidades' : 'skills'}
          </div>
          <span className="text-emerald-500/30">·</span>
          <div className="font-mono-game text-sm text-emerald-500/60">
            {PERSON.name}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function useMutedState() {
  // Initialize lazily from the sound module (runs once on mount)
  const [muted, setM] = useReactState(() => (typeof window !== 'undefined' ? isMuted() : false));
  return [muted, setM] as const;
}

// lazy import to avoid circular deps
import { useState as useReactState } from 'react';

function LangOption({
  name,
  code,
  selected,
  onClick,
}: {
  name: string;
  code: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 border-3 p-4 transition-all ${
        selected
          ? 'border-emerald-500 bg-emerald-500/15 scale-[1.02]'
          : 'border-emerald-500/30 bg-black/40 hover:border-emerald-500 hover:bg-emerald-500/5'
      }`}
      style={{ borderWidth: '3px' }}
    >
      <span className={`flex h-9 w-12 items-center justify-center border-3 font-pixel text-sm font-bold ${selected ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10' : 'border-emerald-500/40 text-emerald-400/70 bg-black/40'}`} style={{ borderWidth: '3px' }}>
        {code}
      </span>
      <span
        className={`font-pixel text-xs font-bold ${
          selected ? 'text-emerald-200' : 'text-emerald-400/70'
        }`}
      >
        {name}
      </span>
      {selected && (
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center bg-emerald-500 border-2 border-black">
          <Check className="h-3 w-3 text-black" />
        </span>
      )}
    </button>
  );
}
