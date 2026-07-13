'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, Brain, Wand2, ChevronRight } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';
import { useLang, useT } from '@/store/game-store';

type ComponentCategory = 'role' | 'context' | 'instruction' | 'constraint' | 'format';

interface PromptComponent {
  id: string;
  category: ComponentCategory;
  text: { es: string; en: string };
}

interface Scenario {
  id: number;
  title: { es: string; en: string };
  task: { es: string; en: string };
  correct: string[]; // component ids that are correct for this scenario
}

const COMPONENTS: PromptComponent[] = [
  // Roles
  { id: 'role-sre', category: 'role', text: { es: 'Rol: SRE Senior', en: 'Role: Senior SRE' } },
  { id: 'role-devops', category: 'role', text: { es: 'Rol: DevOps Engineer', en: 'Role: DevOps Engineer' } },
  { id: 'role-reviewer', category: 'role', text: { es: 'Rol: Code Reviewer', en: 'Role: Code Reviewer' } },
  { id: 'role-qa', category: 'role', text: { es: 'Rol: QA Engineer', en: 'Role: QA Engineer' } },
  // Contexts
  { id: 'context-logs', category: 'context', text: { es: 'Contexto: logs de producción', en: 'Context: production logs' } },
  { id: 'context-diff', category: 'context', text: { es: 'Contexto: git diff del PR', en: 'Context: PR git diff' } },
  { id: 'context-req', category: 'context', text: { es: 'Contexto: documento de requisitos', en: 'Context: requirements doc' } },
  { id: 'context-deploy', category: 'context', text: { es: 'Contexto: plan de despliegue', en: 'Context: deployment plan' } },
  // Instructions
  { id: 'instruction-rca', category: 'instruction', text: { es: 'Instrucción: análisis de causa raíz', en: 'Instruction: root cause analysis' } },
  { id: 'instruction-review', category: 'instruction', text: { es: 'Instrucción: revisar problemas', en: 'Instruction: check for issues' } },
  { id: 'instruction-tests', category: 'instruction', text: { es: 'Instrucción: generar casos de prueba', en: 'Instruction: generate test cases' } },
  { id: 'instruction-rollback', category: 'instruction', text: { es: 'Instrucción: crear plan de rollback', en: 'Instruction: create rollback plan' } },
  // Constraints
  { id: 'constraint-json', category: 'constraint', text: { es: 'Restricción: responde en JSON', en: 'Constraint: respond in JSON' } },
  { id: 'constraint-backup', category: 'constraint', text: { es: 'Restricción: incluir backups', en: 'Constraint: include backups' } },
  { id: 'constraint-edges', category: 'constraint', text: { es: 'Restricción: cubrir casos límite', en: 'Constraint: cover edge cases' } },
  // Formats
  { id: 'format-report', category: 'format', text: { es: 'Formato: reporte estructurado', en: 'Format: structured report' } },
  { id: 'format-list', category: 'format', text: { es: 'Formato: lista numerada', en: 'Format: numbered list' } },
  { id: 'format-bullets', category: 'format', text: { es: 'Formato: viñetas', en: 'Format: bullet points' } },
];

const SCENARIOS: Scenario[] = [
  {
    id: 0,
    title: { es: 'Diagnosticar incidente de producción', en: 'Diagnose production incident' },
    task: {
      es: 'El servicio de pagos está caído. Analiza los logs y encuentra la causa raíz del timeout.',
      en: 'The payment service is down. Analyze the logs and find the root cause of the timeout.',
    },
    correct: ['role-sre', 'context-logs', 'instruction-rca', 'format-report'],
  },
  {
    id: 1,
    title: { es: 'Revisar Pull Request antes de merge', en: 'Review Pull Request before merge' },
    task: {
      es: 'Revisa este PR de 450 líneas. Verifica bugs, estilo y casos límite.',
      en: 'Review this 450-line PR. Check for bugs, style and edge cases.',
    },
    correct: ['role-reviewer', 'context-diff', 'instruction-review', 'constraint-edges'],
  },
  {
    id: 2,
    title: { es: 'Generar casos de prueba', en: 'Generate test cases' },
    task: {
      es: 'A partir de los requisitos, genera casos de prueba para el módulo de autenticación.',
      en: 'From the requirements, generate test cases for the authentication module.',
    },
    correct: ['role-qa', 'context-req', 'instruction-tests', 'format-list'],
  },
  {
    id: 3,
    title: { es: 'Crear plan de rollback', en: 'Create rollback plan' },
    task: {
      es: 'Diseña un plan de rollback para el despliegue v2.3. Incluye backups y pasos numerados.',
      en: 'Design a rollback plan for the v2.3 deployment. Include backups and numbered steps.',
    },
    correct: ['role-devops', 'context-deploy', 'instruction-rollback', 'constraint-backup'],
  },
  {
    id: 4,
    title: { es: 'Validar despliegue pre-producción', en: 'Validate pre-production deployment' },
    task: {
      es: 'Valida el despliegue en staging. Revisa configuración, backups y genera un reporte.',
      en: 'Validate the staging deployment. Check config, backups and generate a report.',
    },
    correct: ['role-qa', 'context-deploy', 'instruction-review', 'constraint-backup'],
  },
  {
    id: 5,
    title: { es: 'Postmortem de incidente', en: 'Incident postmortem' },
    task: {
      es: 'Resume el incidente de anoche en un reporte estructurado para stakeholders.',
      en: 'Summarize last night\'s incident in a structured report for stakeholders.',
    },
    correct: ['role-sre', 'context-logs', 'instruction-rca', 'format-report'],
  },
];

const TOTAL_SCENARIOS = SCENARIOS.length;

const CATEGORY_COLOR: Record<ComponentCategory, { text: string; border: string; bg: string; label: { es: string; en: string } }> = {
  role: { text: 'text-violet-300', border: 'border-violet-500/40', bg: 'bg-violet-500/10', label: { es: 'ROL', en: 'ROLE' } },
  context: { text: 'text-cyan-300', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', label: { es: 'CONTEXTO', en: 'CONTEXT' } },
  instruction: { text: 'text-emerald-300', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', label: { es: 'INSTRUCCIÓN', en: 'INSTRUCTION' } },
  constraint: { text: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-500/10', label: { es: 'RESTRICCIÓN', en: 'CONSTRAINT' } },
  format: { text: 'text-fuchsia-300', border: 'border-fuchsia-500/40', bg: 'bg-fuchsia-500/10', label: { es: 'FORMATO', en: 'FORMAT' } },
};

export default function PromptArchitect({ onScore }: MiniGameProps) {
  const lang = useLang();
  const tt = useT();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [validated, setValidated] = useState(false);
  const [resultData, setResultData] = useState<{ correct: number; wrong: number } | null>(null);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const endedRef = useRef(false);
  const floatIdRef = useRef(0);

  const current = SCENARIOS[scenarioIdx];

  // Build the component pool for the current scenario: 4 correct + 4 distractors
  // useMemo keyed on scenarioIdx so the pool reshuffles only when scenario changes
  const pool = useMemo<PromptComponent[]>(() => {
    const correctComps = COMPONENTS.filter((c) => current.correct.includes(c.id));
    const distractors = COMPONENTS
      .filter((c) => !current.correct.includes(c.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    return [...correctComps, ...distractors].sort(() => Math.random() - 0.5);
  }, [scenarioIdx]);

  // Reset selection when scenario changes
  useEffect(() => {
    setSelected(new Set());
    setValidated(false);
    setResultData(null);
  }, [scenarioIdx]);

  const toggleComponent = (id: string, e: React.MouseEvent) => {
    if (validated) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleValidate = () => {
    if (validated || selected.size === 0) return;
    const correctIds = current.correct;
    const correctSelected = [...selected].filter((id) => correctIds.includes(id)).length;
    const wrongSelected = [...selected].filter((id) => !correctIds.includes(id)).length;
    const points = correctSelected * 2 - wrongSelected;
    setScore((s) => s + Math.max(0, points));
    setResultData({ correct: correctSelected, wrong: wrongSelected });
    setValidated(true);
  };

  const handleNext = () => {
    if (scenarioIdx < TOTAL_SCENARIOS - 1) {
      setScenarioIdx((i) => i + 1);
    } else {
      // finished all scenarios
      if (!endedRef.current) {
        endedRef.current = true;
        onScore(score);
      }
    }
  };

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onScore(score);
  }, [score, onScore]);

  // safety: if no scenarios left
  useEffect(() => {
    if (scenarioIdx >= TOTAL_SCENARIOS) {
      const t = setTimeout(end, 300);
      return () => clearTimeout(t);
    }
  }, [scenarioIdx, end]);

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">{tt('hud.scenario')}</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">
              {Math.min(scenarioIdx + 1, TOTAL_SCENARIOS)}/{TOTAL_SCENARIOS}
            </div>
          </div>
          <div className="rounded-md border border-fuchsia-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-fuchsia-500/60">{tt('hud.score')}</span>
            <div className="font-mono-game text-xl font-bold text-fuchsia-300">{score}</div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Brain className="h-3.5 w-3.5" />
          {lang === 'es' ? 'PROMPT ENGINEER · ZENTRA SaaS' : 'PROMPT ENGINEER · Zentra SaaS'}
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {tt('pa.instr')}
      </div>

      {/* Play area */}
      <div className="play-area relative w-full rounded-lg border border-fuchsia-500/30 bg-black/50 p-4 sm:p-6 overflow-hidden grid-bg min-h-[440px]">
        {/* Scenario card */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="font-mono-game text-[10px] tracking-widest text-fuchsia-400/70">
            {tt('pa.scenario')} #{scenarioIdx + 1}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-lg w-full rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                <span className="font-mono-game text-xs font-bold text-fuchsia-200">
                  {current.title[lang]}
                </span>
              </div>
              <p className="text-sm text-emerald-100/90 leading-relaxed">{current.task[lang]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Component pool */}
        <div className="font-mono-game text-[10px] tracking-widest text-emerald-500/60 mb-2">
          {tt('pa.components')}{' '}
          <span className="text-emerald-400/50">
            ({tt('pa.selected')}: {selected.size})
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {pool.map((comp) => {
            const isSel = selected.has(comp.id);
            const cat = CATEGORY_COLOR[comp.category];
            let extraClass = '';
            if (validated) {
              if (current.correct.includes(comp.id)) {
                extraClass = isSel
                  ? 'ring-2 ring-emerald-400 bg-emerald-500/20'
                  : 'ring-2 ring-amber-400/60 opacity-70';
              } else if (isSel) {
                extraClass = 'ring-2 ring-rose-400 shake';
              }
            } else if (isSel) {
              extraClass = 'ring-2 ring-emerald-400 scale-[1.03]';
            }
            return (
              <button
                key={comp.id}
                onClick={(e) => toggleComponent(comp.id, e)}
                disabled={validated}
                className={`relative flex items-center gap-1.5 rounded-md border ${cat.border} ${cat.bg} px-2.5 py-1.5 transition-all ${extraClass} ${
                  !validated ? 'hover:scale-105 hover:bg-black/40 cursor-pointer' : 'cursor-default'
                }`}
              >
                <span className={`font-mono-game text-[9px] font-bold uppercase ${cat.text} opacity-70`}>
                  {cat.label[lang]}
                </span>
                <span className={`font-mono-game text-[11px] ${cat.text}`}>{comp.text[lang]}</span>
                {validated && current.correct.includes(comp.id) && isSel && (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                )}
                {validated && !current.correct.includes(comp.id) && isSel && (
                  <X className="h-3.5 w-3.5 text-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Validate / Next button */}
        <div className="flex justify-center">
          {!validated ? (
            <button
              onClick={handleValidate}
              disabled={selected.size === 0}
              className={`inline-flex items-center gap-2 rounded-md px-6 py-2.5 font-mono-game text-sm font-bold transition-all ${
                selected.size === 0
                  ? 'bg-emerald-500/10 text-emerald-500/40 cursor-not-allowed border border-emerald-500/20'
                  : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-black glow-soft'
              }`}
            >
              <Wand2 className="h-4 w-4" />
              {tt('pa.validate')}
            </button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 font-mono-game text-sm font-bold text-black transition-colors"
            >
              {scenarioIdx < TOTAL_SCENARIOS - 1 ? (
                <>
                  {tt('bh.next')} <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  {tt('bh.finish')} <Check className="h-4 w-4" />
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Result feedback */}
        <AnimatePresence>
          {validated && resultData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3"
            >
              <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest mb-1">
                {tt('pa.result')}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check className="h-4 w-4" /> {resultData.correct} ✓
                </span>
                {resultData.wrong > 0 && (
                  <span className="flex items-center gap-1 text-rose-300">
                    <X className="h-4 w-4" /> {resultData.wrong} ✗
                  </span>
                )}
                <span className="ml-auto font-mono-game text-xs text-fuchsia-300">
                  +{Math.max(0, resultData.correct * 2 - resultData.wrong)} XP
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-400 transition-all"
          style={{ width: `${((scenarioIdx + (validated ? 1 : 0)) / TOTAL_SCENARIOS) * 100}%` }}
        />
      </div>
    </div>
  );
}
