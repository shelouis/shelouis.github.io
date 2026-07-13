'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ArrowRight, Gauge, Users, Database } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';
import { useLang, useT } from '@/store/game-store';

interface Account {
  id: number;
  name: string;
  size: 'sm' | 'md' | 'lg'; // small/medium/large accounts
  status: 'pending' | 'migrating' | 'done';
}

const TOTAL_ACCOUNTS = 20;
const DURATION = 60;

const CLIENT_NAMES = [
  'clinicaplus.es', 'radiostream.fm', 'boutique_ve.com', 'lawfirm.mx',
  'startupx.io', 'estudio_fotografia', 'restaurantgourmet', 'tiendaonline_ve',
  'psicologos_mt', 'cursodev.com', 'distribuidora_sa', 'farmacia24h',
  'techblog.dev', 'asociacion_es', 'eventos_pro', 'marketing_agency',
  'constructora_ur', 'notariasv.com', 'inmobiliaria_x', 'viajes_mundo',
];

const SIZE_META = {
  sm: { label: 'S', load: 4, color: 'text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40' },
  md: { label: 'M', load: 8, color: 'text-amber-300', bg: 'bg-amber-500/15', border: 'border-amber-500/40' },
  lg: { label: 'L', load: 14, color: 'text-rose-300', bg: 'bg-rose-500/15', border: 'border-rose-500/40' },
};

export default function Migration({ onScore }: MiniGameProps) {
  const lang = useLang();
  const tt = useT();
  const [accounts, setAccounts] = useState<Account[]>(() =>
    CLIENT_NAMES.slice(0, TOTAL_ACCOUNTS).map((name, i) => ({
      id: i,
      name,
      size: (i % 3 === 0 ? 'lg' : i % 3 === 1 ? 'md' : 'sm') as 'sm' | 'md' | 'lg',
      status: 'pending' as const,
    })),
  );
  const [uptime, setUptime] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [migrating, setMigrating] = useState<number[]>([]); // ids being migrated
  const [migratedCount, setMigratedCount] = useState(0);
  const endedRef = useRef(false);

  // current load = sum of migrating accounts' load (derived value, not state)
  const load = migrating.reduce((sum, id) => {
    const acc = accounts.find((a) => a.id === id);
    return sum + (acc ? SIZE_META[acc.size].load : 0);
  }, 0);

  // decay uptime based on load
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((u) => {
        // safe load threshold: 30
        if (load > 30) {
          return Math.max(0, u - (load - 30) * 0.4);
        }
        // small recovery when low load
        return Math.min(100, u + 0.3);
      });
    }, 500);
    return () => clearInterval(interval);
  }, [load]);

  // migration completes after some time
  useEffect(() => {
    if (migrating.length === 0) return;
    const interval = setInterval(() => {
      setMigrating((prev) => {
        if (prev.length === 0) return prev;
        const [doneId, ...rest] = prev;
        // mark account as done
        setAccounts((accs) => accs.map((a) => (a.id === doneId ? { ...a, status: 'done' as const } : a)));
        setMigratedCount((c) => c + 1);
        return rest;
      });
    }, 1800); // each migration takes ~1.8s
    return () => clearInterval(interval);
  }, [migrating.length]);

  // countdown
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    // score = migrated accounts + uptime bonus
    const bonus = Math.round(uptime / 10);
    onScore(migratedCount + bonus);
  }, [migratedCount, uptime, onScore]);

  useEffect(() => {
    if (migratedCount >= TOTAL_ACCOUNTS || timeLeft <= 0 || uptime <= 0) {
      const t = setTimeout(end, 300);
      return () => clearTimeout(t);
    }
  }, [migratedCount, timeLeft, uptime, end]);

  const handleMigrate = (account: Account) => {
    if (account.status !== 'pending') return;
    if (migrating.includes(account.id)) return;
    // would exceed safe load
    const newLoad = load + SIZE_META[account.size].load;
    if (newLoad > 60) {
      // block: too much load
      return;
    }
    setAccounts((accs) => accs.map((a) => (a.id === account.id ? { ...a, status: 'migrating' as const } : a)));
    setMigrating((prev) => [...prev, account.id]);
  };

  const pending = accounts.filter((a) => a.status === 'pending');
  const done = accounts.filter((a) => a.status === 'done');

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">{tt('hud.migrated')}</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{migratedCount}/{TOTAL_ACCOUNTS}</div>
          </div>
          <div className="rounded-md border border-amber-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-amber-500/60">{tt('hud.time')}</span>
            <div className={`font-mono-game text-xl font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {lang === 'es' ? '+100 CLIENTES · SERED · cPanel + Installatron' : '+100 CLIENTS · SERED · cPanel + Installatron'}
        </div>
      </div>

      {/* Uptime & Load meters */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-emerald-500/30 bg-black/40 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1">
              <Gauge className="h-3 w-3" /> {tt('hud.uptime')}
            </span>
            <span className={`font-mono-game text-sm font-bold ${uptime < 50 ? 'text-rose-400' : uptime < 80 ? 'text-amber-300' : 'text-emerald-300'}`}>
              {uptime.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/50 overflow-hidden">
            <motion.div
              className={`h-full ${uptime < 50 ? 'bg-rose-500' : uptime < 80 ? 'bg-amber-400' : 'bg-emerald-400'}`}
              animate={{ width: `${uptime}%` }}
            />
          </div>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-black/40 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1">
              <Database className="h-3 w-3" /> {tt('hud.load')}
            </span>
            <span className={`font-mono-game text-sm font-bold ${load > 30 ? 'text-rose-400' : 'text-emerald-300'}`}>
              {load}/60
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/50 overflow-hidden relative">
            <div
              className={`h-full ${load > 30 ? 'bg-rose-500' : 'bg-cyan-400'}`}
              style={{ width: `${Math.min(100, (load / 60) * 100)}%` }}
            />
            {/* threshold marker */}
            <div className="absolute top-0 bottom-0 w-px bg-amber-400" style={{ left: '50%' }} title="safe threshold" />
          </div>
          <div className="font-mono-game text-[9px] text-amber-500/60 mt-0.5">{tt('mg.safe')} 30</div>
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {tt('mg.instr')}
      </div>

      {/* Migration area */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        {/* Source server */}
        <div className="rounded-lg border border-rose-500/30 bg-black/50 p-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-rose-500/20">
            <Server className="h-4 w-4 text-rose-400" />
            <span className="font-mono-game text-xs text-rose-300">{tt('mg.source')}</span>
            <span className="ml-auto font-mono-game text-[10px] text-rose-500/60">
              {pending.length} {tt('mg.pending')}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[300px] overflow-y-auto scroll-thin pr-1">
            {pending.map((acc) => {
              const meta = SIZE_META[acc.size];
              return (
                <button
                  key={acc.id}
                  onClick={() => handleMigrate(acc)}
                  disabled={load + meta.load > 60}
                  className={`flex flex-col items-start gap-0.5 rounded border ${meta.border} ${meta.bg} p-1.5 text-left transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed`}
                  title={`Migrar ${acc.name} (carga ${meta.load})`}
                >
                  <div className="flex items-center gap-1 w-full">
                    <span className={`font-mono-game text-[10px] font-bold ${meta.color}`}>
                      {meta.label}
                    </span>
                    <ArrowRight className="h-3 w-3 text-emerald-400/60 ml-auto" />
                  </div>
                  <span className="font-mono-game text-[10px] text-emerald-100/90 truncate w-full">
                    {acc.name}
                  </span>
                </button>
              );
            })}
            {pending.length === 0 && (
              <div className="col-span-full text-center font-mono-game text-xs text-emerald-500/50 py-8">
                {tt('mg.allmigrated')}
              </div>
            )}
          </div>
        </div>

        {/* Migration arrow / in-progress */}
        <div className="flex md:flex-col items-center justify-center gap-2 py-2">
          <div className="flex flex-col items-center gap-1">
            <div className="font-mono-game text-[10px] text-cyan-300">{tt('mg.transit')}</div>
            <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
              <AnimatePresence>
                {migrating.map((id) => {
                  const acc = accounts.find((a) => a.id === id);
                  if (!acc) return null;
                  const meta = SIZE_META[acc.size];
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className={`rounded border ${meta.border} ${meta.bg} px-1.5 py-0.5 font-mono-game text-[9px] ${meta.color}`}
                    >
                      {meta.label}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-cyan-400 rotate-90 md:rotate-0" />
        </div>

        {/* Destination server */}
        <div className="rounded-lg border border-emerald-500/30 bg-black/50 p-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/20">
            <Server className="h-4 w-4 text-emerald-400" />
            <span className="font-mono-game text-xs text-emerald-300">{tt('mg.dest')}</span>
            <span className="ml-auto font-mono-game text-[10px] text-emerald-500/60">
              {done.length} {tt('mg.migrated.label')}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[300px] overflow-y-auto scroll-thin pr-1">
            <AnimatePresence>
              {done.map((acc) => {
                const meta = SIZE_META[acc.size];
                return (
                  <motion.div
                    key={acc.id}
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className={`flex flex-col items-start gap-0.5 rounded border ${meta.border} ${meta.bg} p-1.5`}
                  >
                    <div className="flex items-center gap-1 w-full">
                      <span className={`font-mono-game text-[10px] font-bold ${meta.color}`}>
                        {meta.label}
                      </span>
                      <span className="ml-auto text-emerald-400 text-[10px]">✓</span>
                    </div>
                    <span className="font-mono-game text-[10px] text-emerald-100/80 truncate w-full">
                      {acc.name}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {done.length === 0 && (
              <div className="col-span-full text-center font-mono-game text-xs text-emerald-500/30 py-8">
                {tt('mg.empty')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time progress bar */}
      <div className="h-1 w-full rounded-full bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all"
          style={{ width: `${(timeLeft / DURATION) * 100}%` }}
        />
      </div>
    </div>
  );
}
