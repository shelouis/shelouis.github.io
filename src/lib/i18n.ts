// Internationalization system — all UI strings in Spanish + English

export type Lang = 'es' | 'en';

type Entry = { es: string; en: string };
type Dict = Record<string, Entry>;

export const UI: Dict = {
  // Language select
  'lang.title': { es: 'Elige tu idioma', en: 'Choose your language' },
  'lang.subtitle': { es: 'Selecciona el idioma del juego', en: 'Select the game language' },
  'lang.continue': { es: 'Continuar', en: 'Continue' },
  'lang.unlocked': { es: 'Modo Desbloqueado', en: 'Unlocked Mode' },
  'lang.unlocked.desc': { es: 'Juega cualquier nivel sin orden', en: 'Play any level in any order' },
  'lang.unlocked.on': { es: 'Activado', en: 'Enabled' },
  'lang.unlocked.off': { es: 'Desactivado', en: 'Disabled' },

  // Nav
  'nav.map': { es: 'Mapa', en: 'Map' },
  'nav.cv': { es: 'CV', en: 'CV' },
  'nav.reset': { es: 'Reiniciar', en: 'Reset' },
  'nav.exit': { es: 'Salir', en: 'Exit' },

  // Work modes
  'mode.remote': { es: 'Remoto', en: 'Remote' },
  'mode.hybrid': { es: 'Híbrido', en: 'Hybrid' },
  'mode.freelance': { es: 'Freelance', en: 'Freelance' },

  // StatusBar
  'status.career': { es: 'CARRERA', en: 'CAREER' },
  'status.skills': { es: 'HABILIDADES', en: 'SKILLS' },

  // CareerMap
  'map.badge': { es: 'CARRERA INTERACTIVA · 2014 → 2026', en: 'INTERACTIVE CAREER · 2014 → 2026' },
  'map.title1': { es: 'La Trayectoria de', en: 'The Journey of' },
  'map.subtitle': {
    es: 'Recorre 8 niveles inspirados en cada rol real. Supera los retos, desbloquea habilidades y construye el CV completo.',
    en: 'Play through 8 levels inspired by each real role. Beat the challenges, unlock skills and build the complete CV.',
  },
  'map.levels': { es: 'Niveles', en: 'Levels' },
  'map.xp': { es: 'XP Total', en: 'Total XP' },
  'map.level': { es: 'NIVEL', en: 'LEVEL' },
  'map.goal': { es: 'META', en: 'GOAL' },
  'map.best': { es: 'MEJOR', en: 'BEST' },
  'map.pts': { es: 'pts', en: 'pts' },
  'map.locked': { es: 'Bloqueado', en: 'Locked' },
  'map.play': { es: 'Jugar', en: 'Play' },
  'map.replay': { es: 'Repetir', en: 'Replay' },
  'map.free': { es: 'Libre', en: 'Free' },
  'map.complete': { es: '¡Misión Completada!', en: 'Mission Complete!' },
  'map.complete.desc': {
    es: 'Has recorrido toda la carrera de José. Tu CV interactivo está listo.',
    en: "You've completed José's entire career. Your interactive CV is ready.",
  },
  'map.viewcv': { es: 'Ver CV Completo', en: 'View Full CV' },
  'map.note': {
    es: 'Cada nivel está basado en un puesto real del CV. Las habilidades desbloqueadas son reales.',
    en: 'Each level is based on a real CV role. Unlocked skills are real.',
  },
  'map.progress': { es: 'PROGRESO GLOBAL', en: 'GLOBAL PROGRESS' },

  // Boot
  'boot.welcome': { es: 'Bienvenido,', en: 'Welcome,' },
  'boot.recruit': { es: 'reclutador IT', en: 'IT recruiter' },
  'boot.intro': { es: 'Vas a recorrer 10+ años de carrera de', en: "You'll explore 10+ years of" },
  'boot.start': { es: 'INICIAR MISIÓN', en: 'START MISSION' },
  'boot.tip': { es: 'Tip: cada nivel desbloquea habilidades reales del CV.', en: 'Tip: each level unlocks real CV skills.' },

  // SkillsPanel
  'skills.title': { es: 'Stack Técnico', en: 'Tech Stack' },
  'skills.desc': {
    es: 'Completa niveles para desbloquear cada habilidad del CV.',
    en: 'Complete levels to unlock each CV skill.',
  },
  'skills.unlocked': { es: 'HABILIDADES DESBLOQUEADAS', en: 'SKILLS UNLOCKED' },
  'skills.hint': {
    es: 'Completa el primer nivel para empezar a desbloquear habilidades.',
    en: 'Complete the first level to start unlocking skills.',
  },

  // GameFrame
  'game.briefing': { es: 'BRIEFING DE MISIÓN', en: 'MISSION BRIEFING' },
  'game.context': { es: 'CONTEXTO REAL', en: 'REAL CONTEXT' },
  'game.achievements': { es: 'LOGROS REALES EN ESTE ROL', en: 'REAL ACHIEVEMENTS IN THIS ROLE' },
  'game.objective': { es: 'OBJETIVO', en: 'OBJECTIVE' },
  'game.points': { es: 'puntos', en: 'points' },
  'game.start': { es: 'COMENZAR DESAFÍO', en: 'START CHALLENGE' },
  'game.passed': { es: '¡MISIÓN CUMPLIDA!', en: 'MISSION ACCOMPLISHED!' },
  'game.failed': { es: 'INTÉNTALO DE NUEVO', en: 'TRY AGAIN' },
  'game.passed.desc': {
    es: 'Has demostrado competencia en este rol.',
    en: "You've demonstrated competence in this role.",
  },
  'game.failed.desc': {
    es: 'No alcanzaste el objetivo. Practica más.',
    en: "You didn't reach the goal. Practice more.",
  },
  'game.score': { es: 'PUNTUACIÓN', en: 'SCORE' },
  'game.toapprove': { es: 'para aprobar', en: 'to pass' },
  'game.skills.unlocked': { es: 'HABILIDADES DESBLOQUEADAS', en: 'SKILLS UNLOCKED' },
  'game.more': { es: 'más', en: 'more' },
  'game.retry': { es: 'Repetir', en: 'Retry' },
  'game.continue': { es: 'Continuar', en: 'Continue' },

  // Common game HUD
  'hud.score': { es: 'PUNTOS', en: 'SCORE' },
  'hud.time': { es: 'TIEMPO', en: 'TIME' },
  'hud.lives': { es: 'VIDAS', en: 'LIVES' },
  'hud.correct': { es: 'CORRECTAS', en: 'CORRECT' },
  'hud.wrong': { es: 'ERRORES', en: 'WRONG' },
  'hud.assigned': { es: 'ASIGNADOS', en: 'ASSIGNED' },
  'hud.badassign': { es: 'MAL ASIGNADOS', en: 'MISASSIGNED' },
  'hud.placed': { es: 'COLOCADOS', en: 'PLACED' },
  'hud.errors': { es: 'ERRORES', en: 'ERRORS' },
  'hud.bugs': { es: 'BUGS', en: 'BUGS' },
  'hud.falses': { es: 'FALSOS', en: 'WRONG' },
  'hud.migrated': { es: 'MIGRADAS', en: 'MIGRATED' },
  'hud.repaired': { es: 'REPARADAS', en: 'REPAIRED' },
  'hud.uptime': { es: 'UPTIME', en: 'UPTIME' },
  'hud.load': { es: 'CARGA', en: 'LOAD' },
  'hud.scenario': { es: 'ESCENARIO', en: 'SCENARIO' },

  // TicketTriage
  'tt.instr': {
    es: 'Click en cada ticket antes de que caiga. Rojo = urgente (+3), ámbar (+2), verde (+1).',
    en: 'Click each ticket before it drops. Red = urgent (+3), amber (+2), green (+1).',
  },

  // ServerMonitor
  'sm.instr': {
    es: 'Click en ámbar (+2) antes de que pase a rojo (+1). Servidores en rojo bajan el uptime.',
    en: 'Click amber (+2) before it turns red (+1). Red servers drop uptime.',
  },
  'sm.dash': { es: 'Flota VenezuelaHosting', en: 'VenezuelaHosting Fleet' },
  'sm.servers.note': { es: '7 servidores · 2 nodos VPS · +5,000 cuentas', en: '7 servers · 2 VPS nodes · +5,000 accounts' },

  // MultiPanel
  'mp.instr': {
    es: 'Lee la tarea y haz click en el panel de control donde se ejecuta.',
    en: 'Read the task and click the control panel where it runs.',
  },
  'mp.task': { es: 'CONFIGURACIÓN SOLICITADA', en: 'REQUESTED CONFIG' },
  'mp.tasknum': { es: 'TAREA', en: 'TASK' },

  // TeamRouter
  'tr.instr': {
    es: 'Como Gerente (TSM), asigna cada ticket al especialista correcto.',
    en: 'As Team Manager (TSM), assign each ticket to the right specialist.',
  },
  'tr.assign': { es: '→ ASIGNAR A:', en: '→ ASSIGN TO:' },
  'tr.newticket': { es: 'Nuevo Ticket', en: 'New Ticket' },

  // PipelineBuilder
  'pb.instr': {
    es: 'Selecciona una herramienta, luego haz click en la etapa del pipeline donde corresponde.',
    en: 'Select a tool, then click the pipeline stage where it belongs.',
  },
  'pb.placing': { es: 'Colocando', en: 'Placing' },
  'pb.clickstage': { es: '... click en una etapa', en: '... click on a stage' },
  'pb.tools': { es: 'HERRAMIENTAS DISPONIBLES', en: 'AVAILABLE TOOLS' },
  'pb.allplaced': { es: '✓ Todas colocadas', en: '✓ All placed' },
  'pb.empty': { es: 'vacío', en: 'empty' },

  // BugHunter
  'bh.instr': {
    es: 'Revisa el código. Click en la línea con bug para identificarlo. Evita clics en líneas correctas.',
    en: 'Review the code. Click the buggy line to identify it. Avoid clicking correct lines.',
  },
  'bh.found': { es: 'BUG ENCONTRADO', en: 'BUG FOUND' },
  'bh.next': { es: 'Próximo snippet', en: 'Next snippet' },
  'bh.finish': { es: 'Finalizar revisión', en: 'Finish review' },

  // Migration
  'mg.instr': {
    es: "Click en cuentas para migrarlas. No sobrecargues el servidor o baja el uptime.",
    en: "Click accounts to migrate them. Don't overload the server or uptime drops.",
  },
  'mg.source': { es: 'SERVIDOR ORIGEN', en: 'SOURCE SERVER' },
  'mg.dest': { es: 'SERVIDOR DESTINO', en: 'DESTINATION SERVER' },
  'mg.pending': { es: 'pendientes', en: 'pending' },
  'mg.migrated.label': { es: 'migradas', en: 'migrated' },
  'mg.transit': { es: 'EN TRÁNSITO', en: 'IN TRANSIT' },
  'mg.safe': { es: '⚠ Límite seguro:', en: '⚠ Safe limit:' },
  'mg.empty': { es: 'vacío', en: 'empty' },
  'mg.allmigrated': { es: '✓ Todo migrado', en: '✓ All migrated' },

  // PromptArchitect (new)
  'pa.instr': {
    es: 'Selecciona los componentes correctos para construir el prompt ideal, luego valida.',
    en: 'Select the correct components to build the ideal prompt, then validate.',
  },
  'pa.scenario': { es: 'ESCENARIO TÉCNICO', en: 'TECHNICAL SCENARIO' },
  'pa.components': { es: 'COMPONENTES DEL PROMPT', en: 'PROMPT COMPONENTS' },
  'pa.validate': { es: 'VALIDAR PROMPT', en: 'VALIDATE PROMPT' },
  'pa.selected': { es: 'Seleccionados', en: 'Selected' },
  'pa.validating': { es: 'Validando...', en: 'Validating...' },
  'pa.result': { es: 'PROMPT VALIDADO', en: 'PROMPT VALIDATED' },

  // FinalCV
  'cv.objective': { es: 'OBJETIVO PROFESIONAL', en: 'CAREER OBJECTIVE' },
  'cv.experience': { es: 'Experiencia', en: 'Experience' },
  'cv.skills': { es: 'Habilidades', en: 'Skills' },
  'cv.education': { es: 'Educación', en: 'Education' },
  'cv.achievements': { es: 'Logros', en: 'Achievements' },
  'cv.exp.header': { es: 'EXPERIENCIA LABORAL', en: 'WORK EXPERIENCE' },
  'cv.edu.header': { es: 'EDUCACIÓN', en: 'EDUCATION' },
  'cv.cert.header': { es: 'CERTIFICACIONES', en: 'CERTIFICATIONS' },
  'cv.skills.header': { es: 'STACK TÉCNICO COMPLETO', en: 'FULL TECH STACK' },
  'cv.ach.header': { es: 'LOGROS DESBLOQUEADOS', en: 'ACHIEVEMENTS UNLOCKED' },
  'cv.locked': { es: 'Completa el Nivel', en: 'Complete Level' },
  'cv.ingame': {
    es: 'en el juego para desbloquear esta sección.',
    en: 'in the game to unlock this section.',
  },
  'cv.print': { es: 'Imprimir / Guardar PDF', en: 'Print / Save PDF' },
  'cv.back': { es: 'Volver al Mapa', en: 'Back to Map' },
  'cv.footer': {
    es: 'CV interactivo generado por SYSADMIN_QUEST',
    en: 'Interactive CV generated by SYSADMIN_QUEST',
  },
  'cv.footer2': {
    es: 'Juega los 8 niveles para desbloquear el CV completo y todas las habilidades.',
    en: 'Play all 8 levels to unlock the full CV and all skills.',
  },
  'cv.levels.done': { es: 'niveles completados', en: 'levels completed' },
  'cv.years': { es: 'años', en: 'years' },
  'cv.year': { es: 'año', en: 'year' },

  // Achievements
  'ach.first': { es: 'Primer Ticket', en: 'First Ticket' },
  'ach.first.desc': { es: 'Completa tu primer nivel', en: 'Complete your first level' },
  'ach.half': { es: 'Mitad de Carrera', en: 'Halfway There' },
  'ach.half.desc': { es: 'Completa 4 niveles', en: 'Complete 4 levels' },
  'ach.sysadmin': { es: 'Sysadmin Real', en: 'True Sysadmin' },
  'ach.sysadmin.desc': { es: 'Completa todos los niveles', en: 'Complete all levels' },
  'ach.collector': { es: 'Coleccionista de Habilidades', en: 'Skill Collector' },
  'ach.collector.desc': { es: 'Desbloquea 35+ habilidades', en: 'Unlock 35+ skills' },
  'ach.fullstack': { es: 'Stack Completo', en: 'Full Stack' },
  'ach.fullstack.desc': { es: 'Desbloquea TODAS las habilidades', en: 'Unlock ALL skills' },
  'ach.perfect': { es: 'Perfeccionista', en: 'Perfectionist' },
  'ach.perfect.desc': { es: 'Consigue 18+ estrellas', en: 'Get 18+ stars' },
  'ach.vet': { es: 'Veterano', en: 'Veteran' },
  'ach.vet.desc': { es: 'Acumula 1000+ XP', en: 'Earn 1000+ XP' },
  'ach.legend': { es: 'Leyenda DevOps', en: 'DevOps Legend' },
  'ach.legend.desc': { es: 'Acumula 2000+ XP', en: 'Earn 2000+ XP' },
  'ach.prompt': { es: 'Arquitecto de IA', en: 'AI Architect' },
  'ach.prompt.desc': { es: 'Completa el nivel de Prompt Engineer', en: 'Complete the Prompt Engineer level' },

  // Reset dialog
  'reset.title': { es: '¿Reiniciar progreso?', en: 'Reset progress?' },
  'reset.desc': {
    es: 'Se borrarán todos los niveles completados, XP y habilidades desbloqueadas. Esta acción no se puede deshacer.',
    en: 'All completed levels, XP and unlocked skills will be erased. This cannot be undone.',
  },
  'reset.cancel': { es: 'Cancelar', en: 'Cancel' },
  'reset.confirm': { es: 'Sí, reiniciar', en: 'Yes, reset' },

  // Nav — docs
  'nav.docs': { es: 'Guía', en: 'Guide' },

  // Documentation screen
  'docs.title': { es: 'Cómo Jugar', en: 'How to Play' },
  'docs.subtitle': {
    es: 'Aprende cómo funciona cada nivel y su referencia al rol real del CV.',
    en: 'Learn how each level works and its reference to the real CV role.',
  },
  'docs.back': { es: 'Volver al Mapa', en: 'Back to Map' },
  'docs.howto': { es: 'Cómo Jugar', en: 'How to Play' },
  'docs.objective': { es: 'Objetivo', en: 'Objective' },
  'docs.role': { es: 'Rol de Referencia', en: 'Reference Role' },
  'docs.controls': { es: 'Controles', en: 'Controls' },
  'docs.click': { es: 'Click del ratón', en: 'Mouse click' },
  'docs.tap': { es: 'Tap en pantalla', en: 'Tap on screen' },
  'docs.scoring': { es: 'Puntuación', en: 'Scoring' },
  'docs.screenshot': { es: 'Captura del Juego', en: 'Game Screenshot' },
  'docs.play': { es: 'Jugar este Nivel', en: 'Play this Level' },
  'docs.select': { es: 'Selecciona un nivel para ver la guía', en: 'Select a level to see the guide' },
  'docs.level': { es: 'Nivel', en: 'Level' },
  'docs.levels': { es: 'Niveles', en: 'Levels' },
  'docs.game': { es: 'Juego', en: 'Game' },
  'docs.zoom': { es: 'CLICK PARA AMPLIAR', en: 'CLICK TO ZOOM' },
  'docs.prev': { es: 'ANT', en: 'PREV' },
  'docs.next': { es: 'SIG', en: 'NEXT' },
};

export function t(lang: Lang, key: string): string {
  return UI[key]?.[lang] ?? key;
}
