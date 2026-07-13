'use client';

import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import {
  JOB_LEVELS,
  SKILLS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  TOTAL_UNLOCKABLE_SKILLS,
} from '@/lib/cv-data';
import type { SkillCategory } from '@/lib/types';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { Badge } from '@/components/ui/badge';

const CATEGORY_ORDER: SkillCategory[] = [
  'os',
  'cloud',
  'devops',
  'backend',
  'virtualization',
  'monitoring',
  'network',
  'tools',
  'tickets',
  'languages',
];

export default function SkillsPanel() {
  const results = useGameStore((s) => s.results);
  const unlockedMode = useGameStore((s) => s.unlockedMode);
  const lang = useLang();
  const tt = useT();

  // Compute unlocked skill set — when unlockedMode is on, everything is unlocked
  const unlocked = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (unlockedMode || results[lvl.id]) lvl.skills.forEach((s) => unlocked.add(s));
  }

  const unlockedCount = unlocked.size;
  const pct = Math.round((unlockedCount / TOTAL_UNLOCKABLE_SKILLS) * 100);

  // Group skills by category
  const grouped: Record<SkillCategory, typeof SKILLS> = {
    os: [],
    cloud: [],
    devops: [],
    backend: [],
    virtualization: [],
    monitoring: [],
    network: [],
    tools: [],
    tickets: [],
    languages: [],
  };
  for (const skill of SKILLS) {
    if (grouped[skill.category]) grouped[skill.category].push(skill);
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="font-mono-game text-2xl sm:text-3xl font-bold text-emerald-200 glow-text">
              {tt('skills.title')}
            </h2>
            <p className="text-sm text-emerald-400/70 mt-1">{tt('skills.desc')}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-mono-game text-3xl font-bold text-emerald-300">
              {unlockedCount}
              <span className="text-emerald-500/50 text-lg">/{TOTAL_UNLOCKABLE_SKILLS}</span>
            </div>
            <div className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest">
              {tt('skills.unlocked')} · {pct}%
            </div>
          </div>
        </div>
        {/* Big progress bar */}
        <div className="h-2 w-full rounded-full bg-black/50 overflow-hidden border border-emerald-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-violet-400 glow-soft"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORY_ORDER.map((cat) => {
          const skills = grouped[cat];
          const unlockedInCat = skills.filter((s) => unlocked.has(s.id)).length;
          const totalInCat = skills.length;
          const catPct = totalInCat > 0 ? Math.round((unlockedInCat / totalInCat) * 100) : 0;
          const isComplete = unlockedInCat === totalInCat;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="panel rounded-lg p-4"
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                  <h3 className="font-mono-game text-sm font-bold text-emerald-200">
                    {CATEGORY_LABELS[cat][lang]}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className={`font-mono-game text-[10px] ${
                    isComplete
                      ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10'
                      : 'border-emerald-500/20 text-emerald-500/60'
                  }`}
                >
                  {unlockedInCat}/{totalInCat}
                </Badge>
              </div>

              {/* Mini progress */}
              <div className="h-1 w-full rounded-full bg-black/40 overflow-hidden mb-3">
                <div
                  className={`h-full transition-all duration-500 ${
                    isComplete ? 'bg-emerald-400' : 'bg-emerald-500/60'
                  }`}
                  style={{ width: `${catPct}%` }}
                />
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => {
                  const isUnlocked = unlocked.has(skill.id);
                  return (
                    <div
                      key={skill.id}
                      title={skill.name[lang]}
                      className={`group inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono-game text-[11px] transition-all ${
                        isUnlocked
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                          : 'border-emerald-500/10 bg-black/30 text-emerald-500/30'
                      }`}
                    >
                      {isUnlocked ? (
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      ) : (
                        <Lock className="h-2.5 w-2.5" />
                      )}
                      <span className={isUnlocked ? '' : 'blur-[2px] group-hover:blur-0 transition-all'}>
                        {skill.name[lang]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hint */}
      {unlockedCount === 0 && (
        <p className="text-center text-xs text-emerald-500/50 mt-8 font-mono-game">
          {tt('skills.hint')}
        </p>
      )}
    </div>
  );
}
