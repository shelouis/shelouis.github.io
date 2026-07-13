'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Layers } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';
import { useLang, useT } from '@/store/game-store';
import { sfx, initAudio } from '@/lib/sound';

type PanelType = 'cpanel' | 'directadmin' | 'plesk' | 'vestapanel';

interface ConfigTask {
  id: number;
  label: { es: string; en: string };
  panel: PanelType;
}

// Each task belongs to exactly one panel — but many tasks work on multiple panels.
// For the game, we use the "canonical" panel for each task.
const TASKS: { label: { es: string; en: string }; panel: PanelType }[] = [
  { label: { es: 'Crear cuenta de hosting', en: 'Create hosting account' }, panel: 'cpanel' },
  { label: { es: 'WHM → Packages', en: 'WHM → Packages' }, panel: 'cpanel' },
  { label: { es: 'MultiPHP Manager', en: 'MultiPHP Manager' }, panel: 'cpanel' },
  { label: { es: 'Instalar WordPress', en: 'Install WordPress' }, panel: 'cpanel' },
  { label: { es: 'Plugin reseller', en: 'Reseller plugin' }, panel: 'directadmin' },
  { label: { es: 'CustomBuild 2.0', en: 'CustomBuild 2.0' }, panel: 'directadmin' },
  { label: { es: 'DNS Administration', en: 'DNS Administration' }, panel: 'directadmin' },
  { label: { es: 'Crear cuenta reseller', en: 'Create reseller account' }, panel: 'directadmin' },
  { label: { es: 'WordPress Toolkit', en: 'WordPress Toolkit' }, panel: 'plesk' },
  { label: { es: 'Configurar Mail Enable', en: 'Configure Mail Enable' }, panel: 'plesk' },
  { label: { es: 'Plesk File Manager', en: 'Plesk File Manager' }, panel: 'plesk' },
  { label: { es: 'Subscription Settings', en: 'Subscription Settings' }, panel: 'plesk' },
  { label: { es: 'v-add-user', en: 'v-add-user' }, panel: 'vestapanel' },
  { label: { es: 'v-add-domain', en: 'v-add-domain' }, panel: 'vestapanel' },
  { label: { es: 'Vesta CLI backup', en: 'Vesta CLI backup' }, panel: 'vestapanel' },
  { label: { es: 'v-list-web-domains', en: 'v-list-web-domains' }, panel: 'vestapanel' },
];

const PANELS: { id: PanelType; name: string; color: string; bg: string; border: string; icon: string }[] = [
  { id: 'cpanel', name: 'cPanel', color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/50', icon: '◐' },
  { id: 'directadmin', name: 'DirectAdmin', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50', icon: '◆' },
  { id: 'plesk', name: 'Plesk', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/50', icon: '▣' },
  { id: 'vestapanel', name: 'VestaPanel', color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50', icon: '◈' },
];

const TOTAL_TASKS = 16;
const MAX_WRONG = 5;

function buildQueue(): ConfigTask[] {
  const shuffled = [...TASKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_TASKS).map((t, i) => ({ ...t, id: i }));
}

export default function MultiPanel({ onScore }: MiniGameProps) {
  const lang = useLang();
  const tt = useT();
  const [queue, setQueue] = useState<ConfigTask[]>(() => buildQueue());
  const [current, setCurrent] = useState<ConfigTask | null>(queue[0] ?? null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [done, setDone] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; panel: PanelType } | null>(null);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const endedRef = useRef(false);
  const floatIdRef = useRef(0);

  const handleChoice = (panel: PanelType, e: React.MouseEvent) => {
    if (!current || feedback) return;
    initAudio();
    const ok = panel === current.panel;
    if (ok) {
      sfx.panelCorrect();
      setScore((s) => s + 1);
      setDone((d) => d + 1);
      setFeedback({ ok: true, panel });
    } else {
      sfx.error();
      setWrong((w) => w + 1);
      setFeedback({ ok: false, panel });
    }
    // float
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const parent = (e.currentTarget as HTMLElement).closest('.play-area')?.getBoundingClientRect();
    if (parent) {
      const id = floatIdRef.current++;
      setFloats((f) => [
        ...f,
        {
          id,
          x: rect.left - parent.left + rect.width / 2,
          y: rect.top - parent.top,
          text: ok ? '+1' : '✗',
          color: ok ? 'text-emerald-300' : 'text-rose-400',
        },
      ]);
      setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 700);
    }
    setTimeout(() => {
      setFeedback(null);
      setCurrent((prev) => {
        if (!prev) return prev;
        const idx = queue.findIndex((q) => q.id === prev.id);
        const next = queue[idx + 1] ?? null;
        return next;
      });
    }, 600);
  };

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onScore(score);
  }, [score, onScore]);

  useEffect(() => {
    if (done >= TOTAL_TASKS || wrong >= MAX_WRONG) {
      const t = setTimeout(end, 400);
      return () => clearTimeout(t);
    }
  }, [done, wrong, end]);

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">{tt('hud.correct')}</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{score}/{TOTAL_TASKS}</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-rose-500/60">{tt('hud.wrong')}</span>
            <div className="font-mono-game text-xl font-bold text-rose-300">{wrong}/{MAX_WRONG}</div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" />
          {lang === 'es' ? 'INFRA: +20 servidores · +20,000 clientes' : 'INFRA: +20 servers · +20,000 customers'}
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {tt('mp.instr')}
      </div>

      {/* Play area */}
      <div className="play-area relative w-full rounded-lg border border-emerald-500/30 bg-black/50 p-4 sm:p-6 overflow-hidden grid-bg min-h-[380px]">
        {/* Current task card */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="font-mono-game text-[10px] tracking-widest text-emerald-500/60">
            {tt('mp.tasknum')} #{Math.min(done + 1, TOTAL_TASKS)}
          </div>
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-md w-full rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 text-center"
              >
                <div className="font-mono-game text-[10px] text-emerald-500/60 mb-1">{tt('mp.task')}</div>
                <div className="font-mono-game text-base sm:text-lg font-bold text-emerald-100">
                  {current.label[lang]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {PANELS.map((p) => {
            const isFeedback = feedback?.panel === p.id;
            const showOk = isFeedback && feedback?.ok;
            const showBad = isFeedback && !feedback?.ok;
            return (
              <button
                key={p.id}
                onClick={(e) => handleChoice(p.id, e)}
                disabled={!!feedback || !current}
                className={`relative flex flex-col items-center gap-1.5 rounded-md border p-3 sm:p-4 transition-all ${p.bg} ${p.border} ${
                  showOk
                    ? 'ring-2 ring-emerald-400 scale-105'
                    : showBad
                    ? 'ring-2 ring-rose-400 shake'
                    : 'hover:scale-105 hover:bg-black/40'
                } disabled:cursor-default`}
              >
                <span className={`text-2xl ${p.color}`}>{p.icon}</span>
                <span className={`font-mono-game text-xs font-bold ${p.color}`}>{p.name}</span>
                {showOk && <Check className="absolute top-1 right-1 h-4 w-4 text-emerald-400" />}
                {showBad && <X className="absolute top-1 right-1 h-4 w-4 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Floats */}
        <AnimatePresence>
          {floats.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 1, y: f.y, x: f.x }}
              animate={{ opacity: 0, y: f.y - 40, x: f.x }}
              transition={{ duration: 0.7 }}
              style={{ left: f.x, top: f.y }}
              className={`absolute -translate-x-1/2 font-mono-game text-lg font-bold ${f.color} glow-text pointer-events-none z-20`}
            >
              {f.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all"
          style={{ width: `${(done / TOTAL_TASKS) * 100}%` }}
        />
      </div>
    </div>
  );
}
