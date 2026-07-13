'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, X, Users } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';

type Specialty = 'cpanel' | 'network' | 'email' | 'ssl';

interface Agent {
  id: string;
  name: string;
  specialty: Specialty;
  specialtyLabel: string;
  color: string;
  bg: string;
  border: string;
  avatar: string;
}

interface IncomingTicket {
  id: number;
  subject: string;
  specialty: Specialty;
}

const AGENTS: Agent[] = [
  {
    id: 'ana',
    name: 'Ana',
    specialty: 'cpanel',
    specialtyLabel: 'cPanel / Hosting',
    color: 'text-orange-300',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/50',
    avatar: 'AN',
  },
  {
    id: 'luis',
    name: 'Luis',
    specialty: 'network',
    specialtyLabel: 'Redes / VPN',
    color: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    avatar: 'LU',
  },
  {
    id: 'maria',
    name: 'María',
    specialty: 'email',
    specialtyLabel: 'Email / SMS',
    color: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/50',
    avatar: 'MA',
  },
  {
    id: 'carlos',
    name: 'Carlos',
    specialty: 'ssl',
    specialtyLabel: 'SSL / Dominios',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/50',
    avatar: 'CA',
  },
];

const TICKETS_POOL: { subject: string; specialty: Specialty }[] = [
  { subject: 'cPanel no carga el dominio', specialty: 'cpanel' },
  { subject: 'Crear cuenta reseller WHM', specialty: 'cpanel' },
  { subject: 'Backup conjet de cuenta', specialty: 'cpanel' },
  { subject: 'Configurar VPN para sede', specialty: 'network' },
  { subject: 'DNS no propaga registro A', specialty: 'network' },
  { subject: 'SMTP rebotado por IP en blacklist', specialty: 'network' },
  { subject: 'Campaña Email Marketing 50k', specialty: 'email' },
  { subject: 'SMS masivo no envía', specialty: 'email' },
  { subject: 'Buzel de correo lleno', specialty: 'email' },
  { subject: 'Instalar certificado SSL Let\'s Encrypt', specialty: 'ssl' },
  { subject: 'Renovar SSL wildcard', specialty: 'ssl' },
  { subject: 'Registrar dominio .com nuevo', specialty: 'ssl' },
  { subject: 'WordPress en cPanel caído', specialty: 'cpanel' },
  { subject: 'Configurar tunel GRE', specialty: 'network' },
  { subject: 'Auto-responder para info@', specialty: 'email' },
  { subject: 'Migrar dominio entre registradores', specialty: 'ssl' },
];

const TOTAL = 12;
const MAX_WRONG = 4;

export default function TeamRouter({ onScore }: MiniGameProps) {
  const [queue, setQueue] = useState<IncomingTicket[]>(() =>
    [...TICKETS_POOL].sort(() => Math.random() - 0.5).slice(0, TOTAL).map((t, i) => ({ ...t, id: i })),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; agentId: string } | null>(null);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const endedRef = useRef(false);
  const floatIdRef = useRef(0);

  const current = queue[currentIdx] ?? null;

  const handleChoice = (agent: Agent, e: React.MouseEvent) => {
    if (!current || feedback) return;
    const ok = agent.specialty === current.specialty;
    if (ok) {
      setScore((s) => s + 1);
    } else {
      setWrong((w) => w + 1);
    }
    setFeedback({ ok, agentId: agent.id });
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
      setCurrentIdx((i) => i + 1);
    }, 550);
  };

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onScore(score);
  }, [score, onScore]);

  const finished = currentIdx >= TOTAL;
  useEffect(() => {
    if (finished || wrong >= MAX_WRONG) {
      const t = setTimeout(end, 400);
      return () => clearTimeout(t);
    }
  }, [finished, wrong, end]);

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">ASIGNADOS</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{Math.min(currentIdx, TOTAL)}/{TOTAL}</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-rose-500/60">MAL ASIGNADOS</span>
            <div className="font-mono-game text-xl font-bold text-rose-300">{wrong}/{MAX_WRONG}</div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          TSM · ADCLICHOSTING · 4 analistas
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {'› Como Gerente (TSM), asigna cada ticket al especialista correcto.'}
      </div>

      {/* Play area */}
      <div className="play-area relative w-full rounded-lg border border-emerald-500/30 bg-black/50 p-4 sm:p-6 overflow-hidden grid-bg min-h-[400px]">
        {/* Current ticket */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="font-mono-game text-[10px] tracking-widest text-emerald-500/60">
            TICKET #{Math.min(currentIdx + 1, TOTAL)} · WHMCS
          </div>
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="max-w-lg w-full rounded-lg border border-rose-500/40 bg-rose-500/5 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 font-mono-game text-[9px] text-rose-300 uppercase">
                    Nuevo Ticket
                  </span>
                  <span className="font-mono-game text-[10px] text-emerald-500/50">via WHMCS</span>
                </div>
                <div className="font-mono-game text-base sm:text-lg font-bold text-emerald-100">
                  {current.subject}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="font-mono-game text-[10px] text-emerald-500/60">→ ASIGNAR A:</div>
        </div>

        {/* Agents */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {AGENTS.map((a) => {
            const isFeedback = feedback?.agentId === a.id;
            const showOk = isFeedback && feedback?.ok;
            const showBad = isFeedback && !feedback?.ok;
            return (
              <button
                key={a.id}
                onClick={(e) => handleChoice(a, e)}
                disabled={!!feedback || !current}
                className={`relative flex flex-col items-center gap-1.5 rounded-md border p-3 sm:p-4 transition-all ${a.bg} ${a.border} ${
                  showOk
                    ? 'ring-2 ring-emerald-400 scale-105'
                    : showBad
                    ? 'ring-2 ring-rose-400 shake'
                    : 'hover:scale-105 hover:bg-black/40'
                } disabled:cursor-default`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${a.bg} ${a.border} border-2`}>
                  <span className={`font-mono-game text-sm font-bold ${a.color}`}>{a.avatar}</span>
                </div>
                <span className={`font-mono-game text-xs font-bold ${a.color}`}>{a.name}</span>
                <span className="font-mono-game text-[9px] text-emerald-500/60 text-center leading-tight">
                  {a.specialtyLabel}
                </span>
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
    </div>
  );
}
