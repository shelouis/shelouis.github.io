'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Check, X, Code2, Zap } from 'lucide-react';
import type { MiniGameProps } from '../GameFrame';
import { useLang, useT } from '@/store/game-store';

interface BugLine {
  code: string;
  bug: { es: string; en: string };
  explanation: { es: string; en: string };
  lineNum: number;
}

interface Snippet {
  id: number;
  title: { es: string; en: string };
  file: string;
  language: string;
  lines: { text: string; isBug?: boolean; bug?: BugLine }[];
}

// 5 snippets, each with 2 bugs = 10 bugs total
const SNIPPETS: Snippet[] = [
  {
    id: 0,
    title: { es: 'Controlador de Pacientes — store()', en: 'Patient Controller — store()' },
    file: 'app/Http/Controllers/PatientController.php',
    language: 'php',
    lines: [
      { text: 'public function store(Request $request)' },
      { text: '{' },
      { text: '  $data = $request->all();', isBug: true, bug: { code: '$request->all()', bug: { es: 'Mass assignment', en: 'Mass assignment' }, explanation: { es: 'Usar $request->all() permite asignación masiva. Debes usar $request->validate() o $request->only([...]).', en: 'Using $request->all() allows mass assignment. Use $request->validate() or $request->only([...]).' }, lineNum: 3 } },
      { text: '  $patient = Patient::create($data);' },
      { text: '  return response()->json($patient);' },
      { text: '}' },
    ],
  },
  {
    id: 1,
    title: { es: 'Consulta MySQL — búsqueda', en: 'MySQL Query — search' },
    file: 'app/Services/MedicalSearchService.php',
    language: 'php',
    lines: [
      { text: 'public function search($term)' },
      { text: '{' },
      { text: '  return Patient::where("name", "LIKE", "%".$term."%")', isBug: true, bug: { code: 'Concatenación SQL', bug: { es: 'SQL Injection', en: 'SQL Injection' }, explanation: { es: 'Concatenar $term directamente permite SQL injection. Usa bindings con Eloquent que escapará automáticamente.', en: 'Concatenating $term directly allows SQL injection. Use Eloquent bindings which escape automatically.' }, lineNum: 3 } },
      { text: '    ->orderBy("created_at", "desc")' },
      { text: '    ->get();' },
      { text: '}' },
    ],
  },
  {
    id: 2,
    title: { es: 'Ruta API — falta middleware', en: 'API Route — missing middleware' },
    file: 'routes/api.php',
    language: 'php',
    lines: [
      { text: '<?php' },
      { text: 'use App\\Http\\Controllers\\MedicalRecordController;' },
      { text: 'Route::get("/records", [MedicalRecordController::class, "index"]);', isBug: true, bug: { code: 'Sin middleware', bug: { es: 'Sin autenticación', en: 'No authentication' }, explanation: { es: 'Esta ruta expone registros médicos sin middleware auth. Debes envolverla en Route::middleware("auth:sanctum").', en: 'This route exposes medical records without auth middleware. Wrap it in Route::middleware("auth:sanctum").' }, lineNum: 3 } },
      { text: 'Route::post("/records", [MedicalRecordController::class, "store"])' },
      { text: '  ->middleware("auth:sanctum");' },
    ],
  },
  {
    id: 3,
    title: { es: 'Modelo Patient — fillable', en: 'Patient Model — fillable' },
    file: 'app/Models/Patient.php',
    language: 'php',
    lines: [
      { text: 'class Patient extends Model' },
      { text: '{' },
      { text: '  protected $guarded = [];', isBug: true, bug: { code: '$guarded = []', bug: { es: 'Sin protección fillable', en: 'No fillable protection' }, explanation: { es: '$guarded = [] desprotege TODOS los campos. Define $fillable = ["name", "email", ...] explícitamente.', en: '$guarded = [] leaves ALL fields unprotected. Define $fillable = ["name", "email", ...] explicitly.' }, lineNum: 3 } },
      { text: '  public function records()' },
      { text: '  {' },
      { text: '    return $this->hasMany(Record::class);' },
      { text: '  }' },
      { text: '}' },
    ],
  },
  {
    id: 4,
    title: { es: 'Manejo de excepción silenciosa', en: 'Silent exception handling' },
    file: 'app/Http/Controllers/AppointmentController.php',
    language: 'php',
    lines: [
      { text: 'public function cancel($id)' },
      { text: '{' },
      { text: '  try {' },
      { text: '    $appointment = Appointment::findOrFail($id);' },
      { text: '    $appointment->delete();' },
      { text: '  } catch (\\Exception $e) {', isBug: true, bug: { code: 'catch vacío', bug: { es: 'Error silencioso', en: 'Silent error' }, explanation: { es: 'Capturar y no loguear/reportar oculta errores en producción. Usa Log::error($e) o report($e).', en: 'Catching without logging/reporting hides errors in production. Use Log::error($e) or report($e).' }, lineNum: 6 } },
      { text: '    // nada' },
      { text: '  }' },
      { text: '}' },
    ],
  },
];

const TOTAL_BUGS = 5;

export default function BugHunter({ onScore }: MiniGameProps) {
  const lang = useLang();
  const tt = useT();
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [foundBugs, setFoundBugs] = useState<number>(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [clickedLines, setClickedLines] = useState<Set<number>>(new Set());
  const [showBugDetail, setShowBugDetail] = useState<BugLine | null>(null);
  const [feedback, setFeedback] = useState<{ lineKey: string; ok: boolean } | null>(null);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const endedRef = useRef(false);
  const floatIdRef = useRef(0);

  const current = SNIPPETS[snippetIdx];
  const MAX_WRONG = 5;

  const handleLineClick = (lineIdx: number, e: React.MouseEvent) => {
    if (feedback || showBugDetail) return;
    const line = current.lines[lineIdx];
    const lineKey = `${current.id}-${lineIdx}`;
    if (clickedLines.has(lineKey as unknown as number)) return;

    if (line.isBug && line.bug) {
      setFoundBugs((b) => b + 1);
      setClickedLines((prev) => new Set(prev).add(lineKey as unknown as number));
      setFeedback({ lineKey, ok: true });
      // show explanation after short delay
      setTimeout(() => {
        setShowBugDetail(line.bug!);
        setFeedback(null);
      }, 400);
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
            text: '+1 Bug',
            color: 'text-emerald-300',
          },
        ]);
        setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 800);
      }
    } else {
      setWrongClicks((w) => w + 1);
      setFeedback({ lineKey, ok: false });
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
            text: '✗',
            color: 'text-rose-400',
          },
        ]);
        setTimeout(() => setFloats((f) => f.filter((fl) => fl.id !== id)), 700);
      }
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const handleNextSnippet = () => {
    setShowBugDetail(null);
    if (snippetIdx < SNIPPETS.length - 1) {
      setSnippetIdx((i) => i + 1);
    }
  };

  const end = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    // score = bugs found - wrong clicks (min 0)
    onScore(Math.max(0, foundBugs * 2 - wrongClicks));
  }, [foundBugs, wrongClicks, onScore]);

  const finished = foundBugs >= TOTAL_BUGS;
  useEffect(() => {
    if (finished || wrongClicks >= MAX_WRONG) {
      const t = setTimeout(end, 500);
      return () => clearTimeout(t);
    }
  }, [foundBugs, wrongClicks, end]);

  return (
    <div className="space-y-3">
      {/* HUD */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-emerald-500/60">{tt('hud.bugs')}</span>
            <div className="font-mono-game text-xl font-bold text-emerald-300">{foundBugs}/{TOTAL_BUGS}</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-black/40 px-3 py-1.5">
            <span className="font-mono-game text-[10px] text-rose-500/60">{tt('hud.falses')}</span>
            <div className="font-mono-game text-xl font-bold text-rose-300">{wrongClicks}/{MAX_WRONG}</div>
          </div>
        </div>
        <div className="font-mono-game text-[10px] text-emerald-500/60 flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5" />
          PHP/LARAVEL · ESTUDIO2B
        </div>
      </div>

      <div className="text-center text-[11px] font-mono-game text-emerald-500/60">
        {tt('bh.instr')}
      </div>

      {/* Play area */}
      <div className="play-area relative w-full rounded-lg border border-emerald-500/30 bg-black/70 overflow-hidden min-h-[420px]">
        {/* Editor header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-emerald-500/20 bg-black/50">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-mono-game text-[10px] text-emerald-400/60 ml-2">{current.file}</span>
          <span className="ml-auto font-mono-game text-[10px] text-emerald-500/60">
            SNIPPET {snippetIdx + 1}/{SNIPPETS.length}
          </span>
        </div>

        {/* Title bar */}
        <div className="px-4 py-2 border-b border-emerald-500/10 bg-orange-500/5 flex items-center gap-2">
          <Bug className="h-3.5 w-3.5 text-orange-300" />
          <span className="font-mono-game text-xs text-orange-300">{current.title[lang]}</span>
        </div>

        {/* Code lines */}
        <div className="p-3 font-mono-game text-xs sm:text-sm overflow-x-auto scroll-thin">
          {current.lines.map((line, idx) => {
            const lineKey = `${current.id}-${idx}`;
            const isClicked = clickedLines.has(lineKey as unknown as number);
            const isFeedback = feedback?.lineKey === lineKey;
            return (
              <button
                key={idx}
                onClick={(e) => handleLineClick(idx, e)}
                disabled={!!feedback || !!showBugDetail || isClicked}
                className={`group flex w-full text-left items-start gap-3 px-2 py-0.5 rounded transition-colors ${
                  isClicked
                    ? 'bg-emerald-500/15 border-l-2 border-emerald-400'
                    : isFeedback && feedback?.ok
                    ? 'bg-emerald-500/20'
                    : isFeedback && !feedback?.ok
                    ? 'bg-rose-500/15 shake'
                    : 'hover:bg-emerald-500/5 cursor-pointer border-l-2 border-transparent'
                }`}
              >
                <span className="text-emerald-500/30 select-none w-6 text-right shrink-0">{idx + 1}</span>
                <span
                  className={`flex-1 whitespace-pre ${
                    isClicked
                      ? 'text-emerald-300'
                      : 'text-emerald-100/90'
                  }`}
                >
                  {line.text || ' '}
                </span>
                {isClicked && <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Bug detail modal */}
        <AnimatePresence>
          {showBugDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-30"
              onClick={handleNextSnippet}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-md w-full rounded-lg border border-emerald-500/40 bg-emerald-950/95 p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40">
                    <Bug className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest">
                      {tt('bh.found')}
                    </div>
                    <div className="font-mono-game text-sm font-bold text-emerald-200">
                      {showBugDetail.bug[lang]}
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-emerald-500/20 bg-black/50 p-2 mb-3 font-mono-game text-xs text-amber-300">
                  {lang === 'es' ? 'Línea' : 'Line'} {showBugDetail.lineNum}: {showBugDetail.code}
                </div>
                <p className="text-sm text-emerald-300/90 leading-relaxed mb-4">
                  {showBugDetail.explanation[lang]}
                </p>
                <button
                  onClick={handleNextSnippet}
                  className="w-full rounded-md bg-emerald-500 hover:bg-emerald-400 text-black font-mono-game text-sm font-bold py-2.5 flex items-center justify-center gap-2"
                >
                  {snippetIdx < SNIPPETS.length - 1 ? (
                    <>{tt('bh.next')} <Zap className="h-4 w-4" /></>
                  ) : (
                    <>{tt('bh.finish')} <Check className="h-4 w-4" /></>
                  )}
                </button>
              </motion.div>
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
              className={`absolute -translate-x-1/2 font-mono-game text-sm font-bold ${f.color} glow-text pointer-events-none z-20`}
            >
              {f.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="h-1 w-full rounded-full bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all"
          style={{ width: `${(foundBugs / TOTAL_BUGS) * 100}%` }}
        />
      </div>
    </div>
  );
}
