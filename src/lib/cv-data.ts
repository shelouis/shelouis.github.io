import type { JobLevel, Skill, SkillCategory } from './types';

// ────────────────────────────────────────────────────────────────────────────
// SKILLS — full tech stack from José's CV
// ────────────────────────────────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  // OS & Servers
  { id: 'linux', name: 'Linux (Ubuntu/CentOS/Debian)', category: 'os' },
  { id: 'windows-server', name: 'Windows Server', category: 'os' },
  { id: 'sysadmin', name: 'Administración de Servidores', category: 'os' },
  { id: 'bash', name: 'Bash Scripting', category: 'os' },
  { id: 'cronjobs', name: 'Cronjobs', category: 'os' },
  // Cloud & Hosting
  { id: 'aws', name: 'AWS (EC2, S3, Route53)', category: 'cloud' },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'cloud' },
  { id: 'cpanel', name: 'cPanel', category: 'cloud' },
  { id: 'directadmin', name: 'DirectAdmin', category: 'cloud' },
  { id: 'plesk', name: 'Plesk', category: 'cloud' },
  { id: 'vestapanel', name: 'VestaPanel', category: 'cloud' },
  { id: 'laravel-forge', name: 'Laravel Forge', category: 'cloud' },
  // DevOps & CI/CD
  { id: 'docker', name: 'Docker', category: 'devops' },
  { id: 'docker-compose', name: 'Docker Compose', category: 'devops' },
  { id: 'jenkins', name: 'Jenkins', category: 'devops' },
  { id: 'bitbucket-pipelines', name: 'Bitbucket Pipelines', category: 'devops' },
  { id: 'cicd', name: 'CI/CD Pipelines', category: 'devops' },
  // Backend Dev
  { id: 'php', name: 'PHP', category: 'backend' },
  { id: 'laravel', name: 'Laravel', category: 'backend' },
  { id: 'mysql', name: 'MySQL', category: 'backend' },
  { id: 'rest-api', name: 'APIs REST', category: 'backend' },
  // Virtualization
  { id: 'hyperv', name: 'HyperV', category: 'virtualization' },
  { id: 'proxmox', name: 'Proxmox (KVM)', category: 'virtualization' },
  { id: 'openvz', name: 'OpenVZ', category: 'virtualization' },
  // Monitoring
  { id: 'nagios', name: 'Nagios', category: 'monitoring' },
  { id: 'zabbix', name: 'Zabbix', category: 'monitoring' },
  { id: 'centreon', name: 'Centreon', category: 'monitoring' },
  // Networks
  { id: 'dns', name: 'DNS', category: 'network' },
  { id: 'tcpip', name: 'TCP/IP', category: 'network' },
  { id: 'http', name: 'HTTP/HTTPS', category: 'network' },
  { id: 'smtp', name: 'SMTP', category: 'network' },
  { id: 'ssl-tls', name: 'SSL/TLS', category: 'network' },
  { id: 'vpn', name: 'VPN', category: 'network' },
  // APIs & Dev Tools
  { id: 'postman', name: 'Postman', category: 'tools' },
  { id: 'swagger', name: 'Swagger', category: 'tools' },
  { id: 'git', name: 'Git', category: 'tools' },
  { id: 'bitbucket', name: 'Bitbucket', category: 'tools' },
  // Tickets & Management
  { id: 'whmcs', name: 'WHMCS', category: 'tickets' },
  { id: 'kayako', name: 'Kayako', category: 'tickets' },
  { id: 'jira', name: 'Jira', category: 'tickets' },
  { id: 'intercom', name: 'Intercom', category: 'tickets' },
  { id: 'installatron', name: 'Installatron Manager', category: 'tickets' },
  { id: 'leadership', name: 'Liderazgo de Equipo', category: 'tickets' },
  { id: 'documentation', name: 'Documentación Técnica', category: 'tickets' },
  // Languages
  { id: 'spanish', name: 'Español (Nativo)', category: 'languages' },
  { id: 'english-b1', name: 'Inglés B1 Certificado', category: 'languages' },
];

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  os: 'OS & Servidores',
  cloud: 'Cloud & Hosting',
  devops: 'DevOps & CI/CD',
  backend: 'Desarrollo Backend',
  virtualization: 'Virtualización',
  monitoring: 'Monitorización',
  network: 'Redes & Protocolos',
  tools: 'APIs & Dev Tools',
  tickets: 'Gestión & Tickets',
  languages: 'Idiomas',
};

export const CATEGORY_ICONS: Record<SkillCategory, string> = {
  os: '🖥️',
  cloud: '☁️',
  devops: '⚙️',
  backend: '💻',
  virtualization: '🗂️',
  monitoring: '📊',
  network: '🌐',
  tools: '🔧',
  tickets: '🎫',
  languages: '🗣️',
};

// ────────────────────────────────────────────────────────────────────────────
// JOB LEVELS — one per role, in chronological order (career progression)
// ────────────────────────────────────────────────────────────────────────────
export const JOB_LEVELS: JobLevel[] = [
  {
    id: 'lvl-1',
    index: 1,
    company: 'VenezuelaHosting',
    role: 'Atención al Cliente / Soporte L1',
    location: 'Venezuela',
    mode: 'Híbrido',
    period: 'Sep 2014 — Feb 2016',
    startDate: '2014-09',
    endDate: '2016-02',
    durationYears: 1.4,
    summary:
      'Primer contacto con clientes de hosting compartido vía chat, ticket y VoIP. Auditorías de cuentas cPanel y mejoras en scripts de automatización Linux.',
    achievements: [
      'Soporte de primer contacto vía chat, ticket y VoIP',
      'Auditoría de cuentas de hosting en servidores cPanel',
      'Implementación de mejoras en scripts de automatización Linux',
    ],
    skills: ['linux', 'cpanel', 'sysadmin', 'bash', 'whmcs', 'kayako', 'spanish'],
    gameId: 'ticket-triage',
    gameTitle: 'Primer Contacto',
    gameDescription:
      'Los tickets de soporte llegan sin parar. Responde cada uno antes de que expire el SLA.',
    gameGoal: 15,
    accent: 'emerald',
  },
  {
    id: 'lvl-2',
    index: 2,
    company: 'VenezuelaHosting',
    role: 'Analista de Soporte Técnico L2',
    location: 'Venezuela',
    mode: 'Híbrido',
    period: 'Feb 2016 — Oct 2018',
    startDate: '2016-02',
    endDate: '2018-10',
    durationYears: 2.7,
    summary:
      'Administré 7 servidores principales con +5,000 cuentas de clientes y 2 nodos OpenVZ con +200 VPS en Proxmox (KVM) y HyperV. Monitorización con Zabbix y gestión de Active Directory.',
    achievements: [
      '7 servidores principales con +5,000 cuentas de clientes',
      '2 nodos OpenVZ con +200 VPS en Proxmox (KVM) y HyperV',
      'Monitorización con Zabbix y administración de Active Directory/SharePoint',
      'Migración de cuentas, SSL/TLS y resolución de bugs PHP sin downtime',
    ],
    skills: ['zabbix', 'proxmox', 'hyperv', 'openvz', 'ssl-tls', 'php', 'whmcs', 'kayako'],
    gameId: 'server-monitor',
    gameTitle: 'Vigilancia Proactiva',
    gameDescription:
      'Una flota de servidores no duerme. Detecta y repara fallos antes de que el uptime caiga.',
    gameGoal: 20,
    accent: 'amber',
  },
  {
    id: 'lvl-3',
    index: 3,
    company: 'LatincCloud',
    role: 'Analista de Soporte Técnico',
    location: 'Argentina',
    mode: 'Remoto',
    period: 'Oct 2018 — Dic 2019',
    startDate: '2018-10',
    endDate: '2019-12',
    durationYears: 1.2,
    summary:
      'Administré +20 servidores prestando servicio a +20,000 clientes en cPanel, DirectAdmin, Plesk y VestaPanel. Configuración de protocolos TCP/IP, HTTP, DNS, SMTP y monitorización con Nagios, Zabbix y Centreon.',
    achievements: [
      '+20 servidores con +20,000 clientes activos',
      'Administración multi-panel: cPanel, DirectAdmin, Plesk, VestaPanel',
      'Configuración de TCP/IP, HTTP, DNS, SMTP',
      'Operación de Nagios, Zabbix y Centreon',
      'Soporte técnico WordPress, PHP, Apache y Nginx',
    ],
    skills: ['cpanel', 'directadmin', 'plesk', 'vestapanel', 'nagios', 'zabbix', 'centreon', 'dns', 'tcpip', 'http', 'smtp'],
    gameId: 'multi-panel',
    gameTitle: 'Multi-Panel Maestro',
    gameDescription:
      'Cuatro paneles de control, miles de clientes. Asigna cada configuración al panel correcto.',
    gameGoal: 16,
    accent: 'cyan',
  },
  {
    id: 'lvl-4',
    index: 4,
    company: 'ADCLICHOSTING',
    role: 'Gerente de Soporte Técnico (TSM)',
    location: 'Venezuela',
    mode: 'Híbrido',
    period: 'Ene 2020 — Mar 2022',
    startDate: '2020-01',
    endDate: '2022-03',
    durationYears: 2.2,
    summary:
      'Lideré y capacité a analistas de soporte en administración de servidores Linux y cPanel. Implementé documentación que redujo el tiempo de resolución en un 80-90%. Gestión de SMS masivos, Email Marketing, VPN, SSL y dominios.',
    achievements: [
      'Liderazgo y capacitación de analistas de soporte',
      'Reducción del 80-90% en tiempo de resolución de tickets',
      'Administración de infraestructura cPanel, RadioStreaming y hosting compartido',
      'Gestión de SMS masivos, Email Marketing, VPN, SSL y dominios',
      'Centralización de tickets con WHMCS',
    ],
    skills: ['leadership', 'documentation', 'whmcs', 'cpanel', 'vpn', 'ssl-tls', 'dns', 'sysadmin'],
    gameId: 'team-router',
    gameTitle: 'Comandante de Soporte',
    gameDescription:
      'Tu equipo depende de ti. Asigna cada ticket al especialista correcto para maximizar la resolución.',
    gameGoal: 12,
    accent: 'rose',
  },
  {
    id: 'lvl-5',
    index: 5,
    company: 'RORAIMADEVS',
    role: 'Administrador de Sistemas / Jr. DevOps',
    location: 'USA',
    mode: 'Remoto',
    period: 'May 2022 — May 2023',
    startDate: '2022-05',
    endDate: '2023-05',
    durationYears: 1.0,
    summary:
      'Automatización de despliegues con Docker y cronjobs (-60% en tiempo de configuración). Pipelines CI/CD con Jenkins y Bitbucket. Infraestructura cloud en DigitalOcean y AWS. Pruebas de APIs REST con Postman y Swagger.',
    achievements: [
      'Reducción del 60% en tiempo de configuración de entornos con Docker + cronjobs',
      'Pipelines CI/CD con Jenkins y Bitbucket',
      'Gestión de infraestructura cloud en DigitalOcean y AWS',
      'Pruebas y documentación de APIs REST con Postman y Swagger',
    ],
    skills: ['docker', 'docker-compose', 'jenkins', 'cicd', 'bitbucket-pipelines', 'aws', 'digitalocean', 'cronjobs', 'postman', 'swagger', 'rest-api', 'git', 'bitbucket'],
    gameId: 'pipeline-builder',
    gameTitle: 'Arquitecto DevOps',
    gameDescription:
      'Construye el pipeline CI/CD perfecto. Cada herramienta en su etapa correcta.',
    gameGoal: 8,
    accent: 'violet',
  },
  {
    id: 'lvl-6',
    index: 6,
    company: 'ESTUDIO2B',
    role: 'Desarrollador Backend / Soporte de Aplicación',
    location: 'Freelance',
    mode: 'Freelance',
    period: 'Jun 2023 — Mar 2024',
    startDate: '2023-06',
    endDate: '2024-03',
    durationYears: 0.75,
    summary:
      'Desarrollo y mantenimiento de módulos backend en PHP/Laravel para una aplicación web de consultoría médica. APIs REST consumidas por el frontend, optimización de consultas MySQL y resolución de bugs en producción.',
    achievements: [
      'Desarrollo de módulos backend en PHP/Laravel',
      'Implementación de APIs REST consumidas por el frontend',
      'Optimización de consultas MySQL en funciones críticas',
      'Diagnóstico y resolución de bugs en producción',
      'Revisiones de código y documentación técnica',
    ],
    skills: ['php', 'laravel', 'mysql', 'rest-api', 'git', 'documentation'],
    gameId: 'bug-hunter',
    gameTitle: 'Cazador de Bugs',
    gameDescription:
      'El código Laravel tiene errores ocultos. Encuéntralos y arréglalos antes del deploy.',
    gameGoal: 10,
    accent: 'orange',
  },
  {
    id: 'lvl-7',
    index: 7,
    company: 'SERED',
    role: 'Analista de Soporte Técnico L2',
    location: 'España',
    mode: 'Remoto',
    period: 'Abr 2024 — Feb 2026',
    startDate: '2024-04',
    endDate: '2026-02',
    durationYears: 1.85,
    summary:
      'Reducción del 80-90% en tiempo de resolución de tickets. Migración de servidores y hosting con Installatron Manager a través de cPanel. Scripts Bash de automatización y gestión de +100 clientes activos mensuales.',
    achievements: [
      'Reducción del 80-90% en tiempo medio de resolución de tickets',
      'Migración de servidores con Installatron Manager vía cPanel',
      'Desarrollo de scripts de automatización en Bash',
      'Reestructuración de documentación interna y FAQ',
      'Gestión de +100 clientes activos mensuales con alta retención',
    ],
    skills: ['installatron', 'cpanel', 'bash', 'documentation', 'whmcs', 'jira', 'intercom', 'english-b1', 'sysadmin'],
    gameId: 'migration',
    gameTitle: 'Migración Zero Downtime',
    gameDescription:
      'Migra 20 cuentas de servidor sin bajar el uptime. La velocidad mata, la paciencia salva.',
    gameGoal: 20,
    accent: 'emerald',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// PERSONAL INFO
// ────────────────────────────────────────────────────────────────────────────
export const PERSON = {
  name: 'José Pérez',
  title: 'SYSADMIN · JR. DEVOPS ENGINEER · TECHNICAL SUPPORT L2',
  email: 'shelouiss@gmail.com',
  phone: '+58 414 794 8934',
  linkedin: 'https://www.linkedin.com/in/shel0u',
  linkedinHandle: 'in/shel0u',
  country: 'Venezuela',
  workMode: 'Remoto',
  summary:
    'Administrador de Sistemas (Sysadmin) y Soporte Técnico L2 con más de 10 años de experiencia en infraestructura Linux, hosting web, automatización DevOps y desarrollo backend. He gestionado entornos de alta demanda con más de 20,000 clientes y flotas de servidores de producción en empresas de hosting y cloud. Dominio de cPanel, AWS, DigitalOcean, Docker, Jenkins y pipelines CI/CD, complementado con desarrollo en PHP/Laravel y MySQL. Inglés B1 certificado.',
  goal: 'Busco unirme a equipos de infraestructura o DevOps en empresas SaaS, hosting o cloud donde pueda aportar experiencia técnica real y crecer hacia roles de SRE o DevOps Senior.',
  tags: ['Linux', 'Docker', 'AWS', 'cPanel', 'PHP/Laravel', 'Jenkins', 'Zabbix', 'DigitalOcean', 'Sysadmin'],
};

export const EDUCATION = [
  {
    title: 'Ingeniería Informática (en curso)',
    institution: 'UGMA — Universidad Gran Mariscal de Ayacucho',
    period: '2018 — Presente',
    detail: 'Formación en sistemas, redes y arquitectura de software.',
  },
  {
    title: 'Técnico Medio en Informática',
    institution: 'Escuela Técnica Juan Crisóstomo Falcón',
    period: '2011 — 2014',
    detail: 'Formación técnica en informática y sistemas.',
  },
];

export const CERTIFICATIONS = [
  { name: 'Docker: De cero a experto (Docker Compose e Images)', issuer: 'Platzi' },
  { name: 'B1 Inglés Conversacional', issuer: 'Platzi' },
  { name: 'Inglés Avanzado', issuer: 'Sinergy Institute' },
];

// helper: skills unlocked up to a given level (inclusive)
export function unlockedSkillsUpTo(levelIndex: number, completedIds: Set<string>): Skill[] {
  const ids = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (lvl.index <= levelIndex && completedIds.has(lvl.id)) {
      lvl.skills.forEach((s) => ids.add(s));
    }
  }
  return SKILLS.filter((s) => ids.has(s.id));
}

// all skills that CAN be unlocked (full stack) — used for total XP bar
export const TOTAL_UNLOCKABLE_SKILLS = SKILLS.filter((s) =>
  JOB_LEVELS.some((lvl) => lvl.skills.includes(s.id)),
).length;
