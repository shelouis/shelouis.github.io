'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, Phone, Heart, Clock } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';

interface Ticket {
  id: number;
  channel: 'chat' | 'email' | 'voip';
  x: number; // percentage 0-100
  speed: number; // px per frame
  priority: 'low' | 'med' | 'high';
  message: string;
}

const MESSAGES = [
  'No recibo correo',
  'Web caída',
  'SSL vencido',
  'cPanel lento',
  'DNS error',
  'FTP no conecta',
  'Backup falla',
  'DB timeout',
  'Cuenta bloqueada',
  'SSL renovar',
  'WP error 500',
  'Email spam',
];

const CHANNEL_META = {
  chat: { icon: MessageSquare, color: 'text-cyan-300', bg: 'bg-cyan-500/15', border: 'border-cyan-500/40' },
  email: { icon: Mail, color: 'text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40' },
  voip: { icon: Phone, color: 'text-amber-300', bg: 'bg-amber-500/15', border: 'border-amber-500/40' },
};

const DURATION = 45; // seconds
const LIVES = 3;

export default function TicketTriage({ onScore }: MiniGameProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const [shake, setShake] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const floatIdRef = useRef(0);
  const endedRef = useRef(false);

  // spawn tickets
  useEffect(() => {
    const spawn = setInterval(() => {
      setTickets((prev) => {
        if (prev.length > 6) return prev;
        const channel = (['chat', 'email', 'voip'] as const)[Math.floor(Math.random() * 3)];
        const priorityRoll = Math.random();
        const priority: Ticket['priority'] = priorityRoll > 0.7 ? 'high' : priorityRoll > 0.35 ? 'med' : 'low';
        const newTicket: Ticket = {
          id: idRef.current++,
          channel,
          x: 8 + Math.random() * 84,
          speed: 0.25 + Math.random() * 0.3 + priorityRoll * 0.15,
          priority,
          message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        };
        return [...prev, newTicket];
      });
    }, 900);
    return () => clearInterval(spawn);
  }, []);

  // move tickets down (rAF)
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setTickets((prev) => {
        const h = containerRef.current?.clientHeight ?? 400;
        const bottom = h - 80;
        const survivors: Ticket[] = [];
        let missed = 0;
        for (const t of prev) {
          const newY = (t as Ticket & { y?: number }).y ?? 0;
          const next = newY + t.speed * 1.5;
          if (next > bottom) {
            missed += 1;
          } else {
            (t as Ticket & { y?: number }).y = next;
            survivors.push(t);
          }
        }
        if (missed > 0) {
          setLives((l) => Math.max(0, l - missed));
          setShake(true);
          setTimeout(() => setShake(false), 300);
        }
        return survivors;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // countdown
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // end condition
  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onScore(score);
  }, [score, onScore]);

  useEffect(() => {
    if (timeLeft <= 0 || lives <= 0) {
      const t = setTimeout(end, 200);
      return () => clearTimeout(t);
    }
  }, [timeLeft, lives, end]);

  const handleClick = (ticket: Ticket) => {
    const pts = ticket.priority === 'high' ? 3 : ticket.priority === 'med' ? 2 : 1;
    setScore((s) => s + pts);
    setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
    const y = (ticket as Ticket & { y?: number }).y ?? 50;
    const id = floatIdRef.current++;
    setFloats((f) => [
      ...f,
      { id, x: ticket.x, y, text: `+${pts}`, color: pts === 3 ? 'text-amber-300' : 'text-emerald-300' },
    ]);
    setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 900);
  };

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">PUNTOS</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{score}</div>
          </div>
          <div className="rounded-md border border-amber-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-amber-500/60">TIEMPO</span>
            <div className={`font-mono-game text-xl font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-amber-300'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono-game text-[10px] text-rose-500/60 mr-1">VIDAS</span>
          {Array.from({ length: LIVES }).map((_, i) => (
            <Heart
              key={i}
              className={`h-5 w-5 ${i < lives ? 'text-rose-400 fill-rose-400' : 'text-rose-500/15'}`}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {'› Click en cada ticket antes de que caiga. Rojo = urgente (+3), ámbar (+2), verde (+1).'}
      </div>

      {/* Play area */}
      <div
        ref={containerRef}
        className={`relative w-full h-[420px] sm:h-[480px] rounded-lg border border-emerald-500/30 bg-black/50 overflow-hidden grid-bg ${
          shake ? 'shake' : ''
        }`}
      >
        {/* Channel labels at top */}
        <div className="absolute top-0 inset-x-0 flex justify-around px-4 py-1.5 border-b border-emerald-500/20 bg-black/40">
          {(['chat', 'email', 'voip'] as const).map((c) => {
            const Icon = CHANNEL_META[c].icon;
            return (
              <div key={c} className="flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${CHANNEL_META[c].color}`} />
                <span className={`font-mono-game text-[10px] uppercase ${CHANNEL_META[c].color}`}>{c}</span>
              </div>
            );
          })}
        </div>

        {/* SLA line at bottom */}
        <div className="absolute bottom-16 inset-x-0 border-t-2 border-dashed border-rose-500/40">
          <span className="absolute -top-5 right-2 font-mono-game text-[10px] text-rose-400/70">SLA ⚠</span>
        </div>

        {/* Tickets */}
        <AnimatePresence>
          {tickets.map((t) => {
            const meta = CHANNEL_META[t.channel];
            const Icon = meta.icon;
            const y = (t as Ticket & { y?: number }).y ?? 0;
            const prioColor =
              t.priority === 'high'
                ? 'border-rose-500/60 bg-rose-500/15'
                : t.priority === 'med'
                ? 'border-amber-500/50 bg-amber-500/15'
                : 'border-emerald-500/40 bg-emerald-500/10';
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, left: `${t.x}%` }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.15 }}
                onClick={() => handleClick(t)}
                style={{ top: y, left: `${t.x}%` }}
                className={`absolute -translate-x-1/2 flex flex-col items-center gap-1 rounded-md border ${prioColor} ${meta.border} px-2 py-1.5 backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer min-w-[100px]`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
                  <span className={`font-mono-game text-[10px] font-bold uppercase ${meta.color}`}>
                    {t.channel}
                  </span>
                  {t.priority === 'high' && (
                    <span className="text-[9px] font-bold text-rose-400">URG</span>
                  )}
                </div>
                <span className="text-[11px] text-emerald-100 font-mono-game">{t.message}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Floating score */}
        <AnimatePresence>
          {floats.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 1, y: f.y }}
              animate={{ opacity: 0, y: f.y - 40 }}
              transition={{ duration: 0.8 }}
              style={{ left: `${f.x}%` }}
              className={`absolute -translate-x-1/2 font-mono-game text-lg font-bold ${f.color} glow-text pointer-events-none`}
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
