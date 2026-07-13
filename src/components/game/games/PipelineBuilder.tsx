'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Check, X, Workflow, ArrowRight } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';
import { useLang, useT } from '@/store/game-store';
import { sfx, initAudio } from '@/lib/sound';

type Stage = 'source' | 'build' | 'test' | 'deploy';

interface Tool {
  id: string;
  name: string;
  stage: Stage;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

const STAGES: { id: Stage; label: string; description: { es: string; en: string }; color: string; activeBorder: string }[] = [
  { id: 'source', label: 'SOURCE', description: { es: 'Repositorio de código', en: 'Code repository' }, color: 'text-violet-300', activeBorder: 'border-violet-500/60' },
  { id: 'build', label: 'BUILD', description: { es: 'Construcción de artefacto', en: 'Artifact build' }, color: 'text-cyan-300', activeBorder: 'border-cyan-500/60' },
  { id: 'test', label: 'TEST', description: { es: 'Pruebas automatizadas', en: 'Automated tests' }, color: 'text-amber-300', activeBorder: 'border-amber-500/60' },
  { id: 'deploy', label: 'DEPLOY', description: { es: 'Despliegue a producción', en: 'Production deploy' }, color: 'text-emerald-300', activeBorder: 'border-emerald-500/60' },
];

const TOOLS: Tool[] = [
  { id: 'git', name: 'Git', stage: 'source', icon: '⎇', color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/50' },
  { id: 'bitbucket', name: 'Bitbucket', stage: 'source', icon: '⬢', color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/50' },
  { id: 'docker', name: 'Docker', stage: 'build', icon: '◈', color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50' },
  { id: 'docker-compose', name: 'Docker Compose', stage: 'build', icon: '◈', color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50' },
  { id: 'jenkins', stage: 'build', name: 'Jenkins', icon: '⦿', color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50' },
  { id: 'postman', name: 'Postman', stage: 'test', icon: '✉', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/50' },
  { id: 'swagger', name: 'Swagger', stage: 'test', icon: '▤', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/50' },
  { id: 'aws', name: 'AWS EC2/S3', stage: 'deploy', icon: '☁', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50' },
  { id: 'digitalocean', name: 'DigitalOcean', stage: 'deploy', icon: '☁', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50' },
  { id: 'bitbucket-pipes', name: 'Bitbucket Pipelines', stage: 'deploy', icon: '⇶', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50' },
];

const MAX_WRONG = 4;

export default function PipelineBuilder({ onScore }: MiniGameProps) {
  const lang = useLang();
  const tt = useT();
  const [available, setAvailable] = useState<Tool[]>(() => [...TOOLS].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState<Record<Stage, Tool[]>>({ source: [], build: [], test: [], deploy: [] });
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [feedback, setFeedback] = useState<{ toolId: string; stage: Stage; ok: boolean } | null>(null);
  const endedRef = useRef(false);

  const totalPlaced = Object.values(placed).flat().length;
  const totalToPlace = TOOLS.length;

  const handleClickTool = (tool: Tool, stage: Stage, e: React.MouseEvent) => {
    if (feedback) return;
    // only allow if tool is still available
    if (!available.find((t) => t.id === tool.id)) return;
    initAudio();
    const ok = tool.stage === stage;
    if (ok) {
      sfx.toolPlace();
      setScore((s) => s + 1);
      setAvailable((prev) => prev.filter((t) => t.id !== tool.id));
      setPlaced((prev) => ({ ...prev, [stage]: [...prev[stage], tool] }));
    } else {
      sfx.error();
      setWrong((w) => w + 1);
    }
    setFeedback({ toolId: tool.id, stage, ok });
    setTimeout(() => setFeedback(null), 600);
  };

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onScore(score);
  }, [score, onScore]);

  const finished = totalPlaced >= totalToPlace;
  useEffect(() => {
    if (finished || wrong >= MAX_WRONG) {
      const t = setTimeout(end, 500);
      return () => clearTimeout(t);
    }
  }, [finished, wrong, end]);

  // picked tool flow: click available tool → then click a stage slot
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handlePickTool = (tool: Tool) => {
    if (feedback) return;
    setSelectedTool(tool === selectedTool ? null : tool);
  };

  const handleStageClick = (stage: Stage, e: React.MouseEvent) => {
    if (!selectedTool || feedback) return;
    handleClickTool(selectedTool, stage, e);
    setSelectedTool(null);
  };

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">{tt('hud.placed')}</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{totalPlaced}/{totalToPlace}</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-rose-500/60">{tt('hud.errors')}</span>
            <div className="font-mono-game text-xl font-bold text-rose-300">{wrong}/{MAX_WRONG}</div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Workflow className="h-3.5 w-3.5" />
          CI/CD PIPELINE · RORAIMADEVS
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {tt('pb.instr')}
      </div>

      {/* Selected tool indicator */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-center font-mono-game text-xs text-violet-300"
          >
            → {tt('pb.placing')} <span className="font-bold">{selectedTool.name}</span>
            {tt('pb.clickstage')}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline stages */}
      <div className="rounded-lg border border-emerald-500/30 bg-black/50 p-4 overflow-hidden grid-bg">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/20">
          <GitBranch className="h-4 w-4 text-violet-300" />
          <span className="font-mono-game text-xs text-emerald-300">PIPELINE.YML</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3">
          {STAGES.map((stage, idx) => (
            <div key={stage.id} className="flex sm:flex-col items-center gap-2">
              <button
                onClick={(e) => selectedTool && handleStageClick(stage.id, e)}
                className={`flex-1 w-full rounded-md border p-3 transition-all min-h-[120px] flex flex-col ${
                  selectedTool
                    ? `${stage.activeBorder} hover:scale-[1.02] cursor-pointer bg-black/40`
                    : 'border-emerald-500/20 bg-black/30 cursor-default'
                } ${feedback?.stage === stage.id ? (feedback.ok ? 'ring-2 ring-emerald-400' : 'ring-2 ring-rose-400 shake') : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-mono-game text-[10px] font-bold ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="font-mono-game text-[9px] text-emerald-500/40">
                    {idx + 1}/4
                  </span>
                </div>
                <div className="flex-1 space-y-1.5">
                  {placed[stage.id].map((tool) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center gap-1.5 rounded border ${tool.border} ${tool.bg} px-1.5 py-1`}
                    >
                      <span className={`text-sm ${tool.color}`}>{tool.icon}</span>
                      <span className={`font-mono-game text-[10px] ${tool.color}`}>{tool.name}</span>
                      <Check className="h-3 w-3 text-emerald-400 ml-auto" />
                    </motion.div>
                  ))}
                  {placed[stage.id].length === 0 && (
                    <div className="text-center font-mono-game text-[9px] text-emerald-500/30 py-3">
                      {tt('pb.empty')}
                    </div>
                  )}
                </div>
              </button>
              {idx < STAGES.length - 1 && (
                <ArrowRight className={`h-4 w-4 ${stage.color} shrink-0 hidden sm:block rotate-90 sm:rotate-0`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available tools */}
      <div className="rounded-lg border border-emerald-500/30 bg-black/40 p-3">
        <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-2">
          {tt('pb.tools')}
        </div>
        <div className="flex flex-wrap gap-2">
          {available.length === 0 && (
            <span className="font-mono-game text-xs text-emerald-500/50">{tt('pb.allplaced')}</span>
          )}
          {available.map((tool) => {
            const isSelected = selectedTool?.id === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handlePickTool(tool)}
                className={`flex items-center gap-1.5 rounded-md border ${tool.border} ${tool.bg} px-2.5 py-1.5 transition-all ${
                  isSelected ? 'ring-2 ring-emerald-400 scale-105' : 'hover:scale-105 hover:bg-black/40'
                }`}
              >
                <span className={`text-base ${tool.color}`}>{tool.icon}</span>
                <span className={`font-mono-game text-[11px] font-bold ${tool.color}`}>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all"
          style={{ width: `${(totalPlaced / totalToPlace) * 100}%` }}
        />
      </div>
    </div>
  );
}
