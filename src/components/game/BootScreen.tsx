'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight, Zap } from 'lucide-react';
import { PERSON, TOTAL_LEVELS, TOTAL_UNLOCKABLE_SKILLS } from '@/lib/cv-data';
import { useGameStore, useLang } from '@/store/game-store';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

interface BootLine {
  text: string;
  isCmd: boolean;
}

function buildBootLines(lang: Lang): BootLine[] {
  if (lang === 'en') {
    return [
      { text: '$ whoami', isCmd: true },
      { text: '> jose_perez', isCmd: false },
      { text: '$ uname -a', isCmd: true },
      { text: '> Linux sysadmin-quest 6.8.0 #devops SMP x86_64 GNU/Linux', isCmd: false },
      { text: '$ cat /etc/os-release', isCmd: true },
      { text: '> PRETTY_NAME="DevOps Journey 2026"', isCmd: false },
      { text: '$ systemctl status career.service', isCmd: true },
      { text: '> ● career.service - Sysadmin Career Path', isCmd: false },
      { text: '>    Loaded: loaded (/etc/systemd/career.conf; enabled)', isCmd: false },
      { text: '>    Active: active (running) since 2014-09-01', isCmd: false },
      { text: '>    Tasks: 1024 (limit: ∞)', isCmd: false },
      { text: '$ ls /var/log/experience/', isCmd: true },
      { text: '> 8-jobs.log  20k-clients.log  docker.img  jenkins.pipe', isCmd: false },
      { text: '$ sudo ./initialize_quest.sh --player=guest', isCmd: true },
      { text: `> [OK] Loading ${TOTAL_LEVELS} career levels...`, isCmd: false },
      { text: `> [OK] Loading ${TOTAL_UNLOCKABLE_SKILLS} skills...`, isCmd: false },
      { text: '> [OK] Loading achievements system...', isCmd: false },
      { text: '> [OK] SysAdmin Quest ready.', isCmd: false },
      { text: '$ ./start_quest', isCmd: true },
    ];
  }
  return [
    { text: '$ whoami', isCmd: true },
    { text: '> jose_perez', isCmd: false },
    { text: '$ uname -a', isCmd: true },
    { text: '> Linux sysadmin-quest 6.8.0 #devops SMP x86_64 GNU/Linux', isCmd: false },
    { text: '$ cat /etc/os-release', isCmd: true },
    { text: '> PRETTY_NAME="DevOps Journey 2026"', isCmd: false },
    { text: '$ systemctl status career.service', isCmd: true },
    { text: '> ● career.service - Sysadmin Career Path', isCmd: false },
    { text: '>    Loaded: loaded (/etc/systemd/career.conf; enabled)', isCmd: false },
    { text: '>    Active: active (running) since 2014-09-01', isCmd: false },
    { text: '>    Tasks: 1024 (limit: ∞)', isCmd: false },
    { text: '$ ls /var/log/experience/', isCmd: true },
    { text: '> 8-jobs.log  20k-clients.log  docker.img  jenkins.pipe', isCmd: false },
    { text: '$ sudo ./initialize_quest.sh --player=guest', isCmd: true },
    { text: `> [OK] Cargando ${TOTAL_LEVELS} niveles de carrera...`, isCmd: false },
    { text: `> [OK] Cargando ${TOTAL_UNLOCKABLE_SKILLS} habilidades...`, isCmd: false },
    { text: '> [OK] Cargando sistema de logros...', isCmd: false },
    { text: '> [OK] SysAdmin Quest listo.', isCmd: false },
    { text: '$ ./start_quest', isCmd: true },
  ];
}

// Inner component that runs the typing animation. Remounted via key when lang changes.
function BootTerminal({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const bootLines = useMemo(() => buildBootLines(lang), [lang]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count >= bootLines.length) {
        clearInterval(interval);
        setVisibleCount(bootLines.length);
        setTimeout(() => setDone(true), 500);
        return;
      }
      setVisibleCount(count);
    }, 220);
    return () => clearInterval(interval);
  }, [bootLines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.scrollTop = containerRef.scrollHeight;
    }
  }, [visibleCount]);

  const handleEnter = () => {
    onDone();
  };

  const visibleLines = bootLines.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-3xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full" />
          <div className="relative h-12 w-12 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center glow-emerald">
            <Terminal className="h-6 w-6 text-emerald-400" />
          </div>
        </div>
        <div>
          <h1 className="font-mono-game text-2xl sm:text-3xl font-bold text-emerald-300 glow-text tracking-tight">
            SYSADMIN_QUEST
          </h1>
          <p className="font-mono-game text-xs text-emerald-500/70 tracking-widest">
            {'v2.0.26 // INTERACTIVE CAREER GAME'}
          </p>
        </div>
      </div>

      {/* Terminal window */}
      <div className="panel rounded-lg overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-emerald-500/20 bg-black/40">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono-game text-xs text-emerald-500/60">
            guest@sysadmin-quest: ~/career
          </span>
        </div>
        {/* Terminal output */}
        <div
          ref={containerRef}
          className="font-mono-game text-sm sm:text-base p-4 sm:p-6 h-[300px] sm:h-[360px] overflow-y-auto scroll-thin bg-black/50"
        >
          {visibleLines.map((line, i) => (
            <div key={i} className={line.isCmd ? 'text-emerald-300' : 'text-emerald-500/70'}>
              {line.text}
            </div>
          ))}
          {!done && <span className="blink-cursor text-emerald-400">▋</span>}
        </div>
      </div>

      {/* Enter button */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <div className="text-center">
              <p className="font-mono-game text-emerald-300/90 text-sm sm:text-base">
                {t(lang, 'boot.welcome')}{' '}
                <span className="text-emerald-200 font-bold">{t(lang, 'boot.recruit')}</span>.
              </p>
              <p className="font-mono-game text-emerald-500/60 text-xs sm:text-sm mt-1">
                {t(lang, 'boot.intro')} {PERSON.name}.
              </p>
            </div>
            <button
              onClick={handleEnter}
              className="neon-btn group inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 font-mono-game text-sm font-bold text-black hover:bg-emerald-400 transition-colors glow-emerald"
            >
              <Zap className="h-4 w-4" />
              {t(lang, 'boot.start')}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="font-mono-game text-[10px] text-emerald-500/40">{t(lang, 'boot.tip')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BootScreen() {
  const lang = useLang();
  const setScreen = useGameStore((s) => s.setScreen);
  const setBooted = useGameStore((s) => s.setBooted);

  const handleEnter = () => {
    setBooted(true);
    setScreen('map');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      {/* key=lang remounts the terminal when language changes, cleanly resetting state */}
      <BootTerminal key={lang} lang={lang} onDone={handleEnter} />
    </div>
  );
}
