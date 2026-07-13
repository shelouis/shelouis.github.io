'use client';

import { motion } from 'framer-motion';
import { Globe, Unlock, Check, ChevronRight, Languages } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';
import { Switch } from '@/components/ui/switch';
import { PERSON, TOTAL_LEVELS, TOTAL_UNLOCKABLE_SKILLS } from '@/lib/cv-data';

export default function LanguageSelect() {
  const lang = useGameStore((s) => s.lang);
  const setLang = useGameStore((s) => s.setLang);
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const setUnlockedMode = useGameStore((s) => s.setUnlockedMode);
  const setScreen = useGameStore((s) => s.setScreen);

  const handleContinue = () => {
    setScreen('boot');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full" />
            <div className="relative h-16 w-16 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center glow-emerald">
              <Languages className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="font-mono-game text-2xl sm:text-3xl font-bold text-emerald-300 glow-text tracking-tight">
              SYSADMIN_QUEST
            </h1>
            <p className="font-mono-game text-xs text-emerald-500/70 tracking-widest mt-1">
              {t(lang, 'lang.subtitle')}
            </p>
          </div>
        </div>

        {/* Language options */}
        <div className="panel rounded-lg p-5 sm:p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span className="font-mono-game text-sm font-bold text-emerald-200">
              {t(lang, 'lang.title')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LangOption
              code="es"
              flag="🇪🇸"
              name="Español"
              native="Español"
              selected={lang === 'es'}
              onClick={() => setLang('es')}
            />
            <LangOption
              code="en"
              flag="🇬🇧"
              name="English"
              native="English"
              selected={lang === 'en'}
              onClick={() => setLang('en')}
            />
          </div>
        </div>

        {/* Unlocked mode toggle */}
        <div className="panel rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${
                  unlockedMode
                    ? 'border-amber-500/50 bg-amber-500/10'
                    : 'border-emerald-500/30 bg-emerald-500/5'
                }`}
              >
                <Unlock
                  className={`h-4 w-4 ${unlockedMode ? 'text-amber-400' : 'text-emerald-500/60'}`}
                />
              </div>
              <div className="min-w-0">
                <div className="font-mono-game text-sm font-bold text-emerald-200">
                  {t(lang, 'lang.unlocked')}
                </div>
                <div className="font-mono-game text-[11px] text-emerald-500/60">
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
          className="neon-btn group w-full inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-6 py-3.5 font-mono-game text-sm font-bold text-black hover:bg-emerald-400 transition-colors glow-emerald"
        >
          <Check className="h-4 w-4" />
          {t(lang, 'lang.continue')}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Stats preview */}
        <div className="mt-6 flex items-center justify-center gap-4 text-center">
          <div className="font-mono-game text-[10px] text-emerald-500/50">
            {TOTAL_LEVELS} {lang === 'es' ? 'niveles' : 'levels'}
          </div>
          <span className="text-emerald-500/30">·</span>
          <div className="font-mono-game text-[10px] text-emerald-500/50">
            {TOTAL_UNLOCKABLE_SKILLS} {lang === 'es' ? 'habilidades' : 'skills'}
          </div>
          <span className="text-emerald-500/30">·</span>
          <div className="font-mono-game text-[10px] text-emerald-500/50">
            {PERSON.name}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LangOption({
  flag,
  name,
  selected,
  onClick,
}: {
  code: string;
  flag: string;
  name: string;
  native: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
        selected
          ? 'border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-400/40 scale-[1.02]'
          : 'border-emerald-500/20 bg-black/30 hover:border-emerald-500/40 hover:bg-emerald-500/5'
      }`}
    >
      <span className="text-3xl">{flag}</span>
      <span
        className={`font-mono-game text-sm font-bold ${
          selected ? 'text-emerald-200' : 'text-emerald-400/70'
        }`}
      >
        {name}
      </span>
      {selected && (
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
          <Check className="h-3 w-3 text-black" />
        </span>
      )}
    </button>
  );
}
