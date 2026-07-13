'use client';

import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
  Award,
  Download,
  ExternalLink,
  Calendar,
  Briefcase,
  Star,
  Lock,
  Check,
  Globe,
  Trophy,
} from 'lucide-react';
import {
  PERSON,
  JOB_LEVELS,
  SKILLS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  EDUCATION,
  CERTIFICATIONS,
  TOTAL_UNLOCKABLE_SKILLS,
} from '@/lib/cv-data';
import type { SkillCategory } from '@/lib/types';
import { useGameStore, useLang, useT } from '@/store/game-store';
import { t } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

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

export default function FinalCV() {
  const results = useGameStore((s) => s.results);
  const xp = useGameStore((s) => s.xp);
  const setScreen = useGameStore((s) => s.setScreen);
  const lang = useLang();
  const tt = useT();

  // unlocked skills
  const unlocked = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (results[lvl.id]) lvl.skills.forEach((s) => unlocked.add(s));
  }
  const unlockedCount = unlocked.size;
  const completedCount = Object.keys(results).length;
  const totalStars = Object.values(results).reduce((sum, r) => sum + r.stars, 0);
  const maxStars = JOB_LEVELS.length * 3;

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="relative mx-auto max-w-5xl px-3 sm:px-6 py-6 sm:py-10 print:px-0 print:max-w-none">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="panel rounded-lg overflow-hidden mb-6 print:border-2 print:border-emerald-500"
      >
        <div className="grid sm:grid-cols-[auto_1fr_auto] gap-4 p-5 sm:p-6 items-start">
          {/* Avatar */}
          <div className="flex items-center gap-3 sm:flex-col sm:items-start">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center glow-soft">
              <span className="font-mono-game text-2xl sm:text-3xl font-bold text-emerald-300">JP</span>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-black border-2 border-background">
                ★
              </span>
            </div>
            <div className="sm:hidden">
              <h1 className="font-mono-game text-xl font-bold text-emerald-200">{PERSON.name}</h1>
              <p className="font-mono-game text-[10px] text-emerald-500/70 tracking-widest">
                {PERSON.title[lang]}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h1 className="hidden sm:block font-mono-game text-2xl sm:text-3xl font-bold text-emerald-200 glow-text">
              {PERSON.name}
            </h1>
            <p className="hidden sm:block font-mono-game text-[11px] text-emerald-500/70 tracking-widest mt-1">
              {PERSON.title[lang]}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs">
              <a
                href={`mailto:${PERSON.email}`}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" /> {PERSON.email}
              </a>
              <a
                href={`tel:${PERSON.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" /> {PERSON.phone}
              </a>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" /> {PERSON.linkedinHandle}
              </a>
              <span className="flex items-center gap-1.5 text-emerald-400/70">
                <MapPin className="h-3.5 w-3.5" /> {PERSON.country[lang]} · {t(lang, `mode.${PERSON.workMode}`)}
              </span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed mt-3 print:text-black">
              {PERSON.summary[lang]}
            </p>
            <div className="mt-3 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2.5">
              <span className="font-mono-game text-[10px] text-emerald-500/60 tracking-widest">
                {tt('cv.objective')}
              </span>
              <p className="text-xs text-emerald-200/90 mt-1">{PERSON.goal[lang]}</p>
            </div>
          </div>

          {/* Game stats */}
          <div className="flex sm:flex-col gap-3 print:hidden">
            <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center min-w-[70px]">
              <Trophy className="h-4 w-4 text-amber-400 mx-auto mb-1" />
              <div className="font-mono-game text-lg font-bold text-amber-300">{xp.toLocaleString()}</div>
              <div className="font-mono-game text-[9px] text-amber-500/70">XP</div>
            </div>
            <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-center min-w-[70px]">
              <Star className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
              <div className="font-mono-game text-lg font-bold text-emerald-300">
                {totalStars}/{maxStars}
              </div>
              <div className="font-mono-game text-[9px] text-emerald-500/70">{lang === 'es' ? 'ESTRELLAS' : 'STARS'}</div>
            </div>
            <div className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-center min-w-[70px]">
              <Check className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
              <div className="font-mono-game text-lg font-bold text-cyan-300">
                {unlockedCount}/{TOTAL_UNLOCKABLE_SKILLS}
              </div>
              <div className="font-mono-game text-[9px] text-emerald-500/70">{tt('status.skills')}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-1.5">
          {PERSON.tags[lang].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono-game text-[10px] border-emerald-500/30 text-emerald-300 bg-emerald-500/5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 print:hidden">
        <Button
          onClick={() => setScreen('map')}
          variant="outline"
          className="font-mono-game border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
        >
          <Briefcase className="h-4 w-4 mr-1.5" /> {tt('cv.back')}
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="font-mono-game border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
        >
          <Download className="h-4 w-4 mr-1.5" /> {tt('cv.print')}
        </Button>
        <a
          href={PERSON.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/5 px-3 h-9 font-mono-game text-xs text-emerald-300 hover:bg-emerald-500/10 transition-colors"
        >
          <Linkedin className="h-4 w-4" /> LinkedIn
          <ExternalLink className="h-3 w-3 ml-0.5" />
        </a>
        <span className="ml-auto font-mono-game text-[10px] text-emerald-500/50">
          {`› ${completedCount}/${JOB_LEVELS.length} ${tt('cv.levels.done')}`}
        </span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-black/40 border border-emerald-500/20 print:hidden">
          <TabsTrigger
            value="experience"
            className="font-mono-game text-xs data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300"
          >
            {tt('cv.experience')}
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="font-mono-game text-xs data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300"
          >
            {tt('cv.skills')} ({unlockedCount})
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="font-mono-game text-xs data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300"
          >
            {tt('cv.education')}
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="font-mono-game text-xs data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-300"
          >
            {tt('cv.achievements')}
          </TabsTrigger>
        </TabsList>

        {/* Experience */}
        <TabsContent value="experience" className="mt-4 space-y-3 print:block">
          <h2 className="font-mono-game text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2 print:text-black">
            <Briefcase className="h-4 w-4" /> {tt('cv.exp.header')}
          </h2>
          {JOB_LEVELS.map((level) => {
            const result = results[level.id];
            const isUnlocked = !!result;
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`relative panel rounded-lg p-4 ${isUnlocked ? '' : 'opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`font-mono-game text-sm font-bold ${
                          isUnlocked ? 'text-emerald-200' : 'text-emerald-500/60'
                        }`}
                      >
                        {level.role[lang]}
                      </h3>
                      {!isUnlocked && <Lock className="h-3 w-3 text-emerald-500/50" />}
                      {isUnlocked && (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${
                                s <= result.stars ? 'text-amber-400 fill-amber-400' : 'text-emerald-500/20'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400/70 mt-0.5 flex-wrap">
                      <span className="font-semibold">{level.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {level.location[lang]}
                      </span>
                      <span>·</span>
                      <span className="font-mono-game text-[10px]">{t(lang, `mode.${level.mode}`)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono-game text-[10px] text-emerald-500/70 flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" /> {level.period[lang]}
                    </div>
                    <div className="font-mono-game text-[10px] text-emerald-500/50 mt-0.5">
                      {level.durationYears} {level.durationYears === 1 ? tt('cv.year') : tt('cv.years')}
                    </div>
                  </div>
                </div>

                {isUnlocked ? (
                  <>
                    <p className="text-xs text-emerald-300/80 leading-relaxed mb-2">{level.summary[lang]}</p>
                    <ul className="space-y-1">
                      {level.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-emerald-200/85">
                          <span className="text-emerald-400 mt-0.5">▸</span>
                          <span>{a[lang]}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {level.skills.map((sid) => {
                        const skill = SKILLS.find((s) => s.id === sid);
                        if (!skill) return null;
                        return (
                          <Badge
                            key={sid}
                            variant="outline"
                            className="font-mono-game text-[9px] border-emerald-500/30 text-emerald-300 bg-emerald-500/5"
                          >
                            {skill.name[lang]}
                          </Badge>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="rounded-md border border-emerald-500/10 bg-black/30 p-3 text-center">
                    <Lock className="h-4 w-4 text-emerald-500/40 mx-auto mb-1" />
                    <p className="font-mono-game text-xs text-emerald-500/60">
                      {tt('cv.locked')} {level.index} {tt('cv.ingame')}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills" className="mt-4">
          <SkillsSection unlocked={unlocked} />
        </TabsContent>

        {/* Education */}
        <TabsContent value="education" className="mt-4 space-y-3">
          <h2 className="font-mono-game text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> {tt('cv.edu.header')}
          </h2>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="panel rounded-lg p-4">
              <h3 className="font-mono-game text-sm font-bold text-emerald-200">{edu.title[lang]}</h3>
              <div className="text-xs text-emerald-400/70 mt-0.5">{edu.institution[lang]}</div>
              <div className="font-mono-game text-[10px] text-emerald-500/60 mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {edu.period[lang]}
              </div>
              <p className="text-xs text-emerald-300/80 mt-2">{edu.detail[lang]}</p>
            </div>
          ))}

          <h2 className="font-mono-game text-sm font-bold text-emerald-300 mt-6 mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" /> {tt('cv.cert.header')}
          </h2>
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="panel rounded-lg p-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/40">
                <Award className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-emerald-100">{cert.name[lang]}</div>
                <div className="font-mono-game text-[10px] text-emerald-500/60">{cert.issuer}</div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="mt-4">
          <AchievementsSection
            unlockedCount={unlockedCount}
            completedCount={completedCount}
            totalStars={totalStars}
            xp={xp}
          />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="font-mono-game text-[10px] text-emerald-500/50">
          {`› ${tt('cv.footer')} · ${PERSON.name} · ${new Date().getFullYear()}`}
        </p>
        <p className="font-mono-game text-[10px] text-emerald-500/40 mt-1">{tt('cv.footer2')}</p>
      </div>
    </div>
  );
}

function SkillsSection({ unlocked }: { unlocked: Set<string> }) {
  const lang = useLang();
  const tt = useT();
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
    <div className="space-y-4">
      <h2 className="font-mono-game text-sm font-bold text-emerald-300 flex items-center gap-2">
        <Globe className="h-4 w-4" /> {tt('cv.skills.header')}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {CATEGORY_ORDER.map((cat) => {
          const skills = grouped[cat];
          const unlockedInCat = skills.filter((s) => unlocked.has(s.id)).length;
          return (
            <div key={cat} className="panel rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{CATEGORY_ICONS[cat]}</span>
                  <h3 className="font-mono-game text-xs font-bold text-emerald-200">
                    {CATEGORY_LABELS[cat][lang]}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono-game text-[9px] border-emerald-500/30 text-emerald-400/70"
                >
                  {unlockedInCat}/{skills.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => {
                  const isUnlocked = unlocked.has(skill.id);
                  return (
                    <span
                      key={skill.id}
                      className={`inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 font-mono-game text-[10px] ${
                        isUnlocked
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                          : 'border-emerald-500/10 bg-black/30 text-emerald-500/40'
                      }`}
                    >
                      {isUnlocked ? <Check className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                      {skill.name[lang]}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AchievementsSection({
  unlockedCount,
  completedCount,
  totalStars,
  xp,
}: {
  unlockedCount: number;
  completedCount: number;
  totalStars: number;
  xp: number;
}) {
  const lang = useLang();
  const tt = useT();
  const lvl8Done = useGameStore((s) => !!s.results['lvl-8']);
  const achievements = [
    { id: 'first-blood', key: 'ach.first', unlocked: completedCount >= 1, icon: '🎫' },
    { id: 'halfway', key: 'ach.half', unlocked: completedCount >= 4, icon: '⚖️' },
    { id: 'sysadmin', key: 'ach.sysadmin', unlocked: completedCount >= JOB_LEVELS.length, icon: '🛡️' },
    { id: 'skill-collector', key: 'ach.collector', unlocked: unlockedCount >= 35, icon: '⚙️' },
    { id: 'fullstack', key: 'ach.fullstack', unlocked: unlockedCount >= TOTAL_UNLOCKABLE_SKILLS, icon: '🌟' },
    { id: 'three-stars', key: 'ach.perfect', unlocked: totalStars >= 18, icon: '⭐' },
    { id: 'xp-1k', key: 'ach.vet', unlocked: xp >= 1000, icon: '🏆' },
    { id: 'xp-2k', key: 'ach.legend', unlocked: xp >= 2000, icon: '👑' },
    { id: 'prompt', key: 'ach.prompt', unlocked: lvl8Done, icon: '🤖' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-mono-game text-sm font-bold text-emerald-300 flex items-center gap-2">
        <Trophy className="h-4 w-4" /> {tt('cv.ach.header')}
      </h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
              a.unlocked
                ? 'border-amber-500/40 bg-amber-500/10'
                : 'border-emerald-500/10 bg-black/30 opacity-50'
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md text-xl ${
                a.unlocked ? 'bg-amber-500/20' : 'bg-emerald-500/5 grayscale'
              }`}
            >
              {a.unlocked ? a.icon : '🔒'}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-mono-game text-xs font-bold ${
                  a.unlocked ? 'text-amber-300' : 'text-emerald-500/60'
                }`}
              >
                {t(lang, `${a.key}`)}
              </div>
              <div className="text-[11px] text-emerald-400/70">{t(lang, `${a.key}.desc`)}</div>
            </div>
            {a.unlocked && <Check className="h-4 w-4 text-emerald-400" />}
          </div>
        ))}
      </div>
    </div>
  );
}
