'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, AlertTriangle, Zap, Activity } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';

type Status = 'ok' | 'warn' | 'critical' | 'fixing' | 'fixed';

interface ServerNode {
  id: number;
  label: string;
  status: Status;
  warnSince: number;
}

const DURATION = 45;
const GRID = 9; // 3x3 of servers + we also have 2 "VPS nodes"

const SERVER_LABELS = [
  'web-01', 'web-02', 'db-01',
  'mail-01', 'cp-01', 'dns-01',
  'ftp-01', 'app-01', 'cache-01',
];

export default function ServerMonitor({ onScore }: MiniGameProps) {
  const [servers, setServers] = useState<ServerNode[]>(() =>
    SERVER_LABELS.map((label, i) => ({ id: i, label, status: 'ok' as Status, warnSince: 0 })),
  );
  const [score, setScore] = useState(0);
  const [uptime, setUptime] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const endedRef = useRef(false);
  const floatIdRef = useRef(0);

  // spawn warnings on random servers
  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) => {
        const candidates = prev.filter((s) => s.status === 'ok');
        if (candidates.length === 0) return prev;
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        return prev.map((s) =>
          s.id === target.id ? { ...s, status: 'warn' as Status, warnSince: Date.now() } : s,
        );
      });
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  // promote warn -> critical, and decay uptime if critical unfixed
  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) => {
        const now = Date.now();
        return prev.map((s) => {
          if (s.status === 'warn' && now - s.warnSince > 2500) {
            return { ...s, status: 'critical' as Status };
          }
          return s;
        });
      });
      setUptime((u) => {
        // decay uptime based on count of critical servers
        const criticalCount = servers.filter((s) => s.status === 'critical').length;
        return Math.max(0, u - criticalCount * 1.5);
      });
    }, 600);
    return () => clearInterval(interval);
  }, [servers]);

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
    // bonus for uptime
    const bonus = Math.round(uptime / 5);
    onScore(score + bonus);
  }, [score, uptime, onScore]);

  useEffect(() => {
    if (timeLeft <= 0 || uptime <= 0) {
      const t = setTimeout(end, 200);
      return () => clearTimeout(t);
    }
  }, [timeLeft, uptime, end]);

  const handleClick = (server: ServerNode, e: React.MouseEvent) => {
    if (server.status === 'ok' || server.status === 'fixing' || server.status === 'fixed') return;
    const pts = server.status === 'critical' ? 1 : 2;
    setScore((s) => s + pts);
    setServers((prev) =>
      prev.map((s) => (s.id === server.id ? { ...s, status: 'fixed' as Status } : s)),
    );
    setTimeout(() => {
      setServers((prev) =>
        prev.map((s) => (s.id === server.id ? { ...s, status: 'ok' as Status, warnSince: 0 } : s)),
      );
    }, 500);
    // float
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const parent = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
    if (parent) {
      const id = floatIdRef.current++;
      setFloats((f) => [
        ...f,
        {
          id,
          x: rect.left - parent.left + rect.width / 2,
          y: rect.top - parent.top,
          text: `+${pts}`,
          color: pts === 2 ? 'text-emerald-300' : 'text-amber-300',
        },
      ]);
      setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 800);
    }
  };

  const statusClass = (s: Status) => {
    switch (s) {
      case 'ok':
        return 'border-emerald-500/30 bg-emerald-500/5';
      case 'warn':
        return 'border-amber-500/60 bg-amber-500/15 pulse-danger';
      case 'critical':
        return 'border-rose-500/70 bg-rose-500/20 pulse-danger';
      case 'fixing':
        return 'border-cyan-500/60 bg-cyan-500/15';
      case 'fixed':
        return 'border-emerald-500/60 bg-emerald-500/25';
    }
  };

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">REPARADAS</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{score}</div>
          </div>
          <div className="rounded-md border border-amber-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-amber-500/60">TIEMPO</span>
            <div className={`font-mono-game text-xl font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5 min-w-[180px]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-game text-[10px] text-emerald-500/60">UPTIME</span>
            <span className={`font-mono-game text-sm font-bold ${uptime < 50 ? 'text-rose-400' : 'text-emerald-300'}`}>
              {uptime.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/50 overflow-hidden">
            <motion.div
              className={`h-full ${uptime < 50 ? 'bg-rose-500' : uptime < 80 ? 'bg-amber-400' : 'bg-emerald-400'}`}
              animate={{ width: `${uptime}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {'› Click en ámbar (+2) antes de que pase a rojo (+1). Servidores en rojo bajan el uptime.'}
      </div>

      {/* Play area */}
      <div className="relative w-full rounded-lg border border-emerald-500/30 bg-black/50 p-4 overflow-hidden grid-bg">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/20">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span className="font-mono-game text-xs text-emerald-300">ZABBIX_DASHBOARD — Flota VenezuelaHosting</span>
          <span className="ml-auto font-mono-game text-[10px] text-emerald-500/60">
            7 servidores · 2 nodos VPS · +5,000 cuentas
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {servers.map((s) => (
            <button
              key={s.id}
              onClick={(e) => handleClick(s, e)}
              disabled={s.status === 'ok' || s.status === 'fixing' || s.status === 'fixed'}
              className={`relative flex flex-col items-center gap-1 rounded-md border p-3 transition-all ${statusClass(s.status)} ${
                s.status === 'warn' || s.status === 'critical'
                  ? 'cursor-pointer hover:scale-105'
                  : 'cursor-default'
              }`}
            >
              <Server
                className={`h-5 w-5 ${
                  s.status === 'ok'
                    ? 'text-emerald-400/60'
                    : s.status === 'warn'
                    ? 'text-amber-400'
                    : s.status === 'critical'
                    ? 'text-rose-400'
                    : 'text-emerald-300'
                }`}
              />
              <span className="font-mono-game text-[10px] text-emerald-200">{s.label}</span>
              <span
                className={`font-mono-game text-[9px] uppercase ${
                  s.status === 'ok'
                    ? 'text-emerald-500/50'
                    : s.status === 'warn'
                    ? 'text-amber-400'
                    : s.status === 'critical'
                    ? 'text-rose-400 font-bold'
                    : 'text-emerald-300'
                }`}
              >
                {s.status === 'ok' ? 'OK' : s.status === 'warn' ? 'WARN' : s.status === 'critical' ? 'CRIT' : 'OK'}
              </span>
              {(s.status === 'warn' || s.status === 'critical') && (
                <AlertTriangle
                  className={`absolute top-1 right-1 h-3 w-3 ${
                    s.status === 'critical' ? 'text-rose-400' : 'text-amber-400'
                  } blink-cursor`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Floating points */}
        <AnimatePresence>
          {floats.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 1, y: f.y, x: f.x }}
              animate={{ opacity: 0, y: f.y - 40, x: f.x }}
              transition={{ duration: 0.8 }}
              style={{ left: f.x, top: f.y }}
              className={`absolute -translate-x-1/2 font-mono-game text-lg font-bold ${f.color} glow-text pointer-events-none z-20`}
            >
              {f.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Time progress bar */}
      <div className="h-1 w-full rounded-full bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all"
          style={{ width: `${(timeLeft / DURATION) * 100}%` }}
        />
      </div>
    </div>
  );
}
