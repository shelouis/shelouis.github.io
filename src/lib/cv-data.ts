import type { JobLevel, Skill, SkillCategory, WorkMode } from './types';
import type { Lang } from './i18n';

// Bilingual text helper type
type Bi = { es: string; en: string };

// ────────────────────────────────────────────────────────────────────────────
// SKILLS — full tech stack from José's CV (bilingual)
// ────────────────────────────────────────────────────────────────────────────
export const SKILLS: (Skill & { name: Bi })[] = [
  // OS & Servers
  { id: 'linux', name: { es: 'Linux (Ubuntu/CentOS/Debian)', en: 'Linux (Ubuntu/CentOS/Debian)' }, category: 'os' },
  { id: 'windows-server', name: { es: 'Windows Server', en: 'Windows Server' }, category: 'os' },
  { id: 'sysadmin', name: { es: 'Administración de Servidores', en: 'Server Administration' }, category: 'os' },
  { id: 'bash', name: { es: 'Bash Scripting', en: 'Bash Scripting' }, category: 'os' },
  { id: 'cronjobs', name: { es: 'Cronjobs', en: 'Cronjobs' }, category: 'os' },
  // Cloud & Hosting
  { id: 'aws', name: { es: 'AWS (EC2, S3, Route53)', en: 'AWS (EC2, S3, Route53)' }, category: 'cloud' },
  { id: 'digitalocean', name: { es: 'DigitalOcean', en: 'DigitalOcean' }, category: 'cloud' },
  { id: 'cpanel', name: { es: 'cPanel', en: 'cPanel' }, category: 'cloud' },
  { id: 'directadmin', name: { es: 'DirectAdmin', en: 'DirectAdmin' }, category: 'cloud' },
  { id: 'plesk', name: { es: 'Plesk', en: 'Plesk' }, category: 'cloud' },
  { id: 'vestapanel', name: { es: 'VestaPanel', en: 'VestaPanel' }, category: 'cloud' },
  { id: 'laravel-forge', name: { es: 'Laravel Forge', en: 'Laravel Forge' }, category: 'cloud' },
  // DevOps & CI/CD
  { id: 'docker', name: { es: 'Docker', en: 'Docker' }, category: 'devops' },
  { id: 'docker-compose', name: { es: 'Docker Compose', en: 'Docker Compose' }, category: 'devops' },
  { id: 'jenkins', name: { es: 'Jenkins', en: 'Jenkins' }, category: 'devops' },
  { id: 'bitbucket-pipelines', name: { es: 'Bitbucket Pipelines', en: 'Bitbucket Pipelines' }, category: 'devops' },
  { id: 'cicd', name: { es: 'CI/CD Pipelines', en: 'CI/CD Pipelines' }, category: 'devops' },
  { id: 'release-management', name: { es: 'Release Management', en: 'Release Management' }, category: 'devops' },
  { id: 'automation-flows', name: { es: 'Automatización de Flujos', en: 'Workflow Automation' }, category: 'devops' },
  // Backend Dev
  { id: 'php', name: { es: 'PHP', en: 'PHP' }, category: 'backend' },
  { id: 'laravel', name: { es: 'Laravel', en: 'Laravel' }, category: 'backend' },
  { id: 'mysql', name: { es: 'MySQL', en: 'MySQL' }, category: 'backend' },
  { id: 'rest-api', name: { es: 'APIs REST', en: 'REST APIs' }, category: 'backend' },
  // Virtualization
  { id: 'hyperv', name: { es: 'HyperV', en: 'HyperV' }, category: 'virtualization' },
  { id: 'proxmox', name: { es: 'Proxmox (KVM)', en: 'Proxmox (KVM)' }, category: 'virtualization' },
  { id: 'openvz', name: { es: 'OpenVZ', en: 'OpenVZ' }, category: 'virtualization' },
  // Monitoring
  { id: 'nagios', name: { es: 'Nagios', en: 'Nagios' }, category: 'monitoring' },
  { id: 'zabbix', name: { es: 'Zabbix', en: 'Zabbix' }, category: 'monitoring' },
  { id: 'centreon', name: { es: 'Centreon', en: 'Centreon' }, category: 'monitoring' },
  // Networks
  { id: 'dns', name: { es: 'DNS', en: 'DNS' }, category: 'network' },
  { id: 'tcpip', name: { es: 'TCP/IP', en: 'TCP/IP' }, category: 'network' },
  { id: 'http', name: { es: 'HTTP/HTTPS', en: 'HTTP/HTTPS' }, category: 'network' },
  { id: 'smtp', name: { es: 'SMTP', en: 'SMTP' }, category: 'network' },
  { id: 'ssl-tls', name: { es: 'SSL/TLS', en: 'SSL/TLS' }, category: 'network' },
  { id: 'vpn', name: { es: 'VPN', en: 'VPN' }, category: 'network' },
  // APIs & Dev Tools
  { id: 'postman', name: { es: 'Postman', en: 'Postman' }, category: 'tools' },
  { id: 'swagger', name: { es: 'Swagger', en: 'Swagger' }, category: 'tools' },
  { id: 'git', name: { es: 'Git', en: 'Git' }, category: 'tools' },
  { id: 'bitbucket', name: { es: 'Bitbucket', en: 'Bitbucket' }, category: 'tools' },
  { id: 'prompt-engineering', name: { es: 'Prompt Engineering', en: 'Prompt Engineering' }, category: 'tools' },
  { id: 'llm', name: { es: 'LLMs (Grandes Modelos de Lenguaje)', en: 'LLMs (Large Language Models)' }, category: 'tools' },
  { id: 'ai-qa', name: { es: 'QA Asistido por IA', en: 'AI-Assisted QA' }, category: 'tools' },
  // Tickets & Management
  { id: 'whmcs', name: { es: 'WHMCS', en: 'WHMCS' }, category: 'tickets' },
  { id: 'kayako', name: { es: 'Kayako', en: 'Kayako' }, category: 'tickets' },
  { id: 'jira', name: { es: 'Jira', en: 'Jira' }, category: 'tickets' },
  { id: 'intercom', name: { es: 'Intercom', en: 'Intercom' }, category: 'tickets' },
  { id: 'installatron', name: { es: 'Installatron Manager', en: 'Installatron Manager' }, category: 'tickets' },
  { id: 'leadership', name: { es: 'Liderazgo de Equipo', en: 'Team Leadership' }, category: 'tickets' },
  { id: 'documentation', name: { es: 'Documentación Técnica', en: 'Technical Documentation' }, category: 'tickets' },
  { id: 'change-management', name: { es: 'Gestión de Cambios', en: 'Change Management' }, category: 'tickets' },
  // Languages
  { id: 'spanish', name: { es: 'Español (Nativo)', en: 'Spanish (Native)' }, category: 'languages' },
  { id: 'english-b1', name: { es: 'Inglés B1 Certificado', en: 'English B1 Certified' }, category: 'languages' },
];

export const CATEGORY_LABELS: Record<SkillCategory, Bi> = {
  os: { es: 'OS & Servidores', en: 'OS & Servers' },
  cloud: { es: 'Cloud & Hosting', en: 'Cloud & Hosting' },
  devops: { es: 'DevOps & CI/CD', en: 'DevOps & CI/CD' },
  backend: { es: 'Desarrollo Backend', en: 'Backend Development' },
  virtualization: { es: 'Virtualización', en: 'Virtualization' },
  monitoring: { es: 'Monitorización', en: 'Monitoring' },
  network: { es: 'Redes & Protocolos', en: 'Networks & Protocols' },
  tools: { es: 'APIs & Dev Tools', en: 'APIs & Dev Tools' },
  tickets: { es: 'Gestión & Tickets', en: 'Management & Tickets' },
  languages: { es: 'Idiomas', en: 'Languages' },
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
    role: { es: 'Atención al Cliente / Soporte L1', en: 'Customer Support / L1 Support' },
    location: { es: 'Venezuela', en: 'Venezuela' },
    mode: 'hybrid',
    period: { es: 'Sep 2014 — Feb 2016', en: 'Sep 2014 — Feb 2016' },
    startDate: '2014-09',
    endDate: '2016-02',
    durationYears: 1.4,
    summary: {
      es: 'Primer contacto con clientes de hosting compartido vía chat, ticket y VoIP. Auditorías de cuentas cPanel y mejoras en scripts de automatización Linux.',
      en: 'First contact with shared hosting customers via chat, ticket and VoIP. cPanel account audits and Linux automation script improvements.',
    },
    achievements: [
      {
        es: 'Soporte de primer contacto vía chat, ticket y VoIP',
        en: 'First-contact support via chat, ticket and VoIP',
      },
      {
        es: 'Auditoría de cuentas de hosting en servidores cPanel',
        en: 'Auditing of hosting accounts on cPanel servers',
      },
      {
        es: 'Implementación de mejoras en scripts de automatización Linux',
        en: 'Implemented improvements to Linux automation scripts',
      },
    ],
    skills: ['linux', 'cpanel', 'sysadmin', 'bash', 'whmcs', 'kayako', 'spanish'],
    gameId: 'ticket-triage',
    gameTitle: { es: 'Primer Contacto', en: 'First Contact' },
    gameDescription: {
      es: 'Los tickets de soporte llegan sin parar. Responde cada uno antes de que expire el SLA.',
      en: 'Support tickets keep coming. Answer each one before the SLA expires.',
    },
    gameGoal: 15,
    accent: 'emerald',
    howTo: [
      { es: 'Los tickets caen desde arriba en 3 canales: Chat, Email y VoIP.', en: 'Tickets fall from the top in 3 channels: Chat, Email and VoIP.' },
      { es: 'Haz click en cada ticket antes de que llegue a la línea roja de SLA.', en: 'Click each ticket before it reaches the red SLA line.' },
      { es: 'Los tickets rojos marcados URG valen +3, los ámbar +2, los verdes +1.', en: 'Red tickets marked URG are worth +3, amber +2, green +1.' },
      { es: 'Si un ticket llega al SLA, pierdes una vida. Tienes 3 vidas.', en: 'If a ticket reaches the SLA line, you lose a life. You have 3 lives.' },
      { es: 'Duración: 45 segundos. Meta: 15 puntos.', en: 'Duration: 45 seconds. Goal: 15 points.' },
    ],
    scoring: { es: '+3 urgente, +2 medio, +1 normal. Pierdes vidas si caen al SLA.', en: '+3 urgent, +2 medium, +1 normal. Lose lives if they reach SLA.' },
  },
  {
    id: 'lvl-2',
    index: 2,
    company: 'VenezuelaHosting',
    role: { es: 'Analista de Soporte Técnico L2', en: 'Technical Support Analyst L2' },
    location: { es: 'Venezuela', en: 'Venezuela' },
    mode: 'hybrid',
    period: { es: 'Feb 2016 — Oct 2018', en: 'Feb 2016 — Oct 2018' },
    startDate: '2016-02',
    endDate: '2018-10',
    durationYears: 2.7,
    summary: {
      es: 'Administré 7 servidores principales con +5,000 cuentas de clientes y 2 nodos OpenVZ con +200 VPS en Proxmox (KVM) y HyperV. Monitorización con Zabbix y gestión de Active Directory.',
      en: 'Managed 7 main servers with +5,000 customer accounts and 2 OpenVZ nodes with +200 VPS on Proxmox (KVM) and HyperV. Monitoring with Zabbix and Active Directory management.',
    },
    achievements: [
      {
        es: '7 servidores principales con +5,000 cuentas de clientes',
        en: '7 main servers with +5,000 customer accounts',
      },
      {
        es: '2 nodos OpenVZ con +200 VPS en Proxmox (KVM) y HyperV',
        en: '2 OpenVZ nodes with +200 VPS on Proxmox (KVM) and HyperV',
      },
      {
        es: 'Monitorización con Zabbix y administración de Active Directory/SharePoint',
        en: 'Monitoring with Zabbix and Active Directory/SharePoint administration',
      },
      {
        es: 'Migración de cuentas, SSL/TLS y resolución de bugs PHP sin downtime',
        en: 'Account migration, SSL/TLS and PHP bug resolution with zero downtime',
      },
    ],
    skills: ['zabbix', 'proxmox', 'hyperv', 'openvz', 'ssl-tls', 'php', 'whmcs', 'kayako'],
    gameId: 'server-monitor',
    gameTitle: { es: 'Vigilancia Proactiva', en: 'Proactive Watch' },
    gameDescription: {
      es: 'Una flota de servidores no duerme. Detecta y repara fallos antes de que el uptime caiga.',
      en: 'A server fleet never sleeps. Detect and fix failures before uptime drops.',
    },
    gameGoal: 20,
    accent: 'amber',
    howTo: [
      { es: 'Aparece un grid 3x3 con 9 servidores de la flota VenezuelaHosting.', en: 'A 3x3 grid appears with 9 servers from the VenezuelaHosting fleet.' },
      { es: 'Los servidores pasan de OK → WARN (ámbar) → CRIT (rojo) si no los reparas.', en: 'Servers go from OK → WARN (amber) → CRIT (red) if you do not fix them.' },
      { es: 'Haz click en un servidor WARN para repararlo (+2 puntos).', en: 'Click a WARN server to fix it (+2 points).' },
      { es: 'Si pasa a CRIT, solo vale +1 y empieza a bajar el uptime.', en: 'If it turns CRIT, it is only worth +1 and starts dropping uptime.' },
      { es: 'Mantén el uptime alto. Bonus de +uptime/5 al final. Duración: 45s.', en: 'Keep uptime high. Bonus of +uptime/5 at the end. Duration: 45s.' },
    ],
    scoring: { es: '+2 reparar en ámbar, +1 en rojo. Bonus por uptime al final.', en: '+2 fix in amber, +1 in red. Bonus for uptime at the end.' },
  },
  {
    id: 'lvl-3',
    index: 3,
    company: 'LatincCloud',
    role: { es: 'Analista de Soporte Técnico', en: 'Technical Support Analyst' },
    location: { es: 'Argentina', en: 'Argentina' },
    mode: 'remote',
    period: { es: 'Oct 2018 — Dic 2019', en: 'Oct 2018 — Dec 2019' },
    startDate: '2018-10',
    endDate: '2019-12',
    durationYears: 1.2,
    summary: {
      es: 'Administré +20 servidores prestando servicio a +20,000 clientes en cPanel, DirectAdmin, Plesk y VestaPanel. Configuración de protocolos TCP/IP, HTTP, DNS, SMTP y monitorización con Nagios, Zabbix y Centreon.',
      en: 'Managed +20 servers serving +20,000 customers on cPanel, DirectAdmin, Plesk and VestaPanel. Configured TCP/IP, HTTP, DNS, SMTP protocols and monitoring with Nagios, Zabbix and Centreon.',
    },
    achievements: [
      {
        es: '+20 servidores con +20,000 clientes activos',
        en: '+20 servers with +20,000 active customers',
      },
      {
        es: 'Administración multi-panel: cPanel, DirectAdmin, Plesk, VestaPanel',
        en: 'Multi-panel management: cPanel, DirectAdmin, Plesk, VestaPanel',
      },
      {
        es: 'Configuración de TCP/IP, HTTP, DNS, SMTP',
        en: 'Configuration of TCP/IP, HTTP, DNS, SMTP',
      },
      {
        es: 'Operación de Nagios, Zabbix y Centreon',
        en: 'Operation of Nagios, Zabbix and Centreon',
      },
      {
        es: 'Soporte técnico WordPress, PHP, Apache y Nginx',
        en: 'Technical support for WordPress, PHP, Apache and Nginx',
      },
    ],
    skills: ['cpanel', 'directadmin', 'plesk', 'vestapanel', 'nagios', 'zabbix', 'centreon', 'dns', 'tcpip', 'http', 'smtp'],
    gameId: 'multi-panel',
    gameTitle: { es: 'Multi-Panel Maestro', en: 'Multi-Panel Master' },
    gameDescription: {
      es: 'Cuatro paneles de control, miles de clientes. Asigna cada configuración al panel correcto.',
      en: 'Four control panels, thousands of customers. Assign each config to the right panel.',
    },
    gameGoal: 16,
    accent: 'cyan',
    howTo: [
      { es: 'Aparece una tarea de configuración (ej: “Crear cuenta de hosting”).', en: 'A config task appears (e.g. “Create hosting account”).' },
      { es: 'Debajo hay 4 paneles: cPanel, DirectAdmin, Plesk y VestaPanel.', en: 'Below are 4 panels: cPanel, DirectAdmin, Plesk and VestaPanel.' },
      { es: 'Haz click en el panel donde se ejecuta esa tarea.', en: 'Click the panel where that task is executed.' },
      { es: 'Cada acierto suma +1. Si fallas, suma un error.', en: 'Each correct answer scores +1. If you fail, it counts as an error.' },
      { es: '16 tareas en total. Máximo 5 errores. Meta: 16 aciertos.', en: '16 tasks total. Maximum 5 errors. Goal: 16 correct.' },
    ],
    scoring: { es: '+1 por tarea correcta. Falla 5 y se acaba.', en: '+1 per correct task. 5 errors and the game ends.' },
  },
  {
    id: 'lvl-4',
    index: 4,
    company: 'ADCLICHOSTING',
    role: { es: 'Gerente de Soporte Técnico (TSM)', en: 'Technical Support Manager (TSM)' },
    location: { es: 'Venezuela', en: 'Venezuela' },
    mode: 'hybrid',
    period: { es: 'Ene 2020 — Mar 2022', en: 'Jan 2020 — Mar 2022' },
    startDate: '2020-01',
    endDate: '2022-03',
    durationYears: 2.2,
    summary: {
      es: 'Lideré y capacité a analistas de soporte en administración de servidores Linux y cPanel. Implementé documentación que redujo el tiempo de resolución en un 80-90%. Gestión de SMS masivos, Email Marketing, VPN, SSL y dominios.',
      en: 'Led and trained support analysts on Linux server and cPanel administration. Implemented documentation that reduced resolution time by 80-90%. Managed bulk SMS, Email Marketing, VPN, SSL and domains.',
    },
    achievements: [
      {
        es: 'Liderazgo y capacitación de analistas de soporte',
        en: 'Leadership and training of support analysts',
      },
      {
        es: 'Reducción del 80-90% en tiempo de resolución de tickets',
        en: '80-90% reduction in ticket resolution time',
      },
      {
        es: 'Administración de infraestructura cPanel, RadioStreaming y hosting compartido',
        en: 'Management of cPanel infrastructure, RadioStreaming and shared hosting',
      },
      {
        es: 'Gestión de SMS masivos, Email Marketing, VPN, SSL y dominios',
        en: 'Management of bulk SMS, Email Marketing, VPN, SSL and domains',
      },
      {
        es: 'Centralización de tickets con WHMCS',
        en: 'Centralized ticket tracking with WHMCS',
      },
    ],
    skills: ['leadership', 'documentation', 'whmcs', 'cpanel', 'vpn', 'ssl-tls', 'dns', 'sysadmin'],
    gameId: 'team-router',
    gameTitle: { es: 'Comandante de Soporte', en: 'Support Commander' },
    gameDescription: {
      es: 'Tu equipo depende de ti. Asigna cada ticket al especialista correcto para maximizar la resolución.',
      en: 'Your team depends on you. Assign each ticket to the right specialist to maximize resolution.',
    },
    gameGoal: 12,
    accent: 'rose',
    howTo: [
      { es: 'Llega un ticket nuevo desde WHMCS con un asunto específico.', en: 'A new ticket arrives from WHMCS with a specific subject.' },
      { es: 'Tienes 4 analistas: Ana (cPanel), Luis (Redes), María (Email), Carlos (SSL).', en: 'You have 4 analysts: Ana (cPanel), Luis (Networks), María (Email), Carlos (SSL).' },
      { es: 'Lee el asunto del ticket y haz click en el especialista correcto.', en: 'Read the ticket subject and click the right specialist.' },
      { es: 'Cada asignación correcta suma +1. Las incorrectas suman errores.', en: 'Each correct assignment scores +1. Wrong ones count as errors.' },
      { es: '12 tickets en total. Máximo 4 errores. Meta: 12 aciertos.', en: '12 tickets total. Maximum 4 errors. Goal: 12 correct.' },
    ],
    scoring: { es: '+1 por ticket bien asignado. 4 errores y se acaba.', en: '+1 per correctly assigned ticket. 4 errors and the game ends.' },
  },
  {
    id: 'lvl-5',
    index: 5,
    company: 'RORAIMADEVS',
    role: { es: 'Administrador de Sistemas / Jr. DevOps', en: 'Systems Administrator / Jr. DevOps' },
    location: { es: 'USA', en: 'USA' },
    mode: 'remote',
    period: { es: 'May 2022 — May 2023', en: 'May 2022 — May 2023' },
    startDate: '2022-05',
    endDate: '2023-05',
    durationYears: 1.0,
    summary: {
      es: 'Automatización de despliegues con Docker y cronjobs (-60% en tiempo de configuración). Pipelines CI/CD con Jenkins y Bitbucket. Infraestructura cloud en DigitalOcean y AWS. Pruebas de APIs REST con Postman y Swagger.',
      en: 'Deployment automation with Docker and cronjobs (-60% in config time). CI/CD pipelines with Jenkins and Bitbucket. Cloud infrastructure on DigitalOcean and AWS. REST API testing with Postman and Swagger.',
    },
    achievements: [
      {
        es: 'Reducción del 60% en tiempo de configuración de entornos con Docker + cronjobs',
        en: '60% reduction in environment config time with Docker + cronjobs',
      },
      {
        es: 'Pipelines CI/CD con Jenkins y Bitbucket',
        en: 'CI/CD pipelines with Jenkins and Bitbucket',
      },
      {
        es: 'Gestión de infraestructura cloud en DigitalOcean y AWS',
        en: 'Cloud infrastructure management on DigitalOcean and AWS',
      },
      {
        es: 'Pruebas y documentación de APIs REST con Postman y Swagger',
        en: 'REST API testing and documentation with Postman and Swagger',
      },
    ],
    skills: ['docker', 'docker-compose', 'jenkins', 'cicd', 'bitbucket-pipelines', 'aws', 'digitalocean', 'cronjobs', 'postman', 'swagger', 'rest-api', 'git', 'bitbucket'],
    gameId: 'pipeline-builder',
    gameTitle: { es: 'Arquitecto DevOps', en: 'DevOps Architect' },
    gameDescription: {
      es: 'Construye el pipeline CI/CD perfecto. Cada herramienta en su etapa correcta.',
      en: 'Build the perfect CI/CD pipeline. Each tool in its correct stage.',
    },
    gameGoal: 8,
    accent: 'violet',
    howTo: [
      { es: 'Hay 4 etapas del pipeline: SOURCE → BUILD → TEST → DEPLOY.', en: 'There are 4 pipeline stages: SOURCE → BUILD → TEST → DEPLOY.' },
      { es: 'Debajo verás herramientas: Git, Docker, Jenkins, Postman, AWS, etc.', en: 'Below you will see tools: Git, Docker, Jenkins, Postman, AWS, etc.' },
      { es: 'Selecciona una herramienta y luego haz click en la etapa correcta.', en: 'Select a tool and then click the correct stage.' },
      { es: 'Cada herramienta colocada correctamente suma +1.', en: 'Each correctly placed tool scores +1.' },
      { es: '10 herramientas en total. Máximo 4 errores. Meta: 8 aciertos.', en: '10 tools total. Maximum 4 errors. Goal: 8 correct.' },
    ],
    scoring: { es: '+1 por herramienta en la etapa correcta. 4 errores y se acaba.', en: '+1 per tool in the correct stage. 4 errors and the game ends.' },
  },
  {
    id: 'lvl-6',
    index: 6,
    company: 'ESTUDIO2B',
    role: { es: 'Desarrollador Backend / Soporte de Aplicación', en: 'Backend Developer / Application Support' },
    location: { es: 'Remoto', en: 'Remote' },
    mode: 'freelance',
    period: { es: 'Jun 2023 — Mar 2024', en: 'Jun 2023 — Mar 2024' },
    startDate: '2023-06',
    endDate: '2024-03',
    durationYears: 0.75,
    summary: {
      es: 'Desarrollo y mantenimiento de módulos backend en PHP/Laravel para una aplicación web de consultoría médica. APIs REST consumidas por el frontend, optimización de consultas MySQL y resolución de bugs en producción.',
      en: 'Development and maintenance of backend modules in PHP/Laravel for a medical consultation web app. REST APIs consumed by the frontend, MySQL query optimization and production bug resolution.',
    },
    achievements: [
      {
        es: 'Desarrollo de módulos backend en PHP/Laravel',
        en: 'Development of backend modules in PHP/Laravel',
      },
      {
        es: 'Implementación de APIs REST consumidas por el frontend',
        en: 'Implementation of REST APIs consumed by the frontend',
      },
      {
        es: 'Optimización de consultas MySQL en funciones críticas',
        en: 'Optimization of MySQL queries in critical functions',
      },
      {
        es: 'Diagnóstico y resolución de bugs en producción',
        en: 'Diagnosis and resolution of production bugs',
      },
      {
        es: 'Revisiones de código y documentación técnica',
        en: 'Code reviews and technical documentation',
      },
    ],
    skills: ['php', 'laravel', 'mysql', 'rest-api', 'git', 'documentation'],
    gameId: 'bug-hunter',
    gameTitle: { es: 'Cazador de Bugs', en: 'Bug Hunter' },
    gameDescription: {
      es: 'El código Laravel tiene errores ocultos. Encuéntralos y arréglalos antes del deploy.',
      en: 'The Laravel code has hidden bugs. Find and fix them before deployment.',
    },
    gameGoal: 10,
    accent: 'orange',
    howTo: [
      { es: 'Aparece un fragmento de código PHP/Laravel con líneas numeradas.', en: 'A PHP/Laravel code snippet appears with numbered lines.' },
      { es: 'Una de las líneas contiene un bug (ej: SQL Injection, mass assignment).', en: 'One of the lines contains a bug (e.g. SQL Injection, mass assignment).' },
      { es: 'Haz click en la línea que creas que tiene el bug.', en: 'Click the line you think has the bug.' },
      { es: 'Si aciertas, aparece una explicación del bug y cómo arreglarlo.', en: 'If correct, an explanation of the bug and how to fix it appears.' },
      { es: '5 snippets en total. Evita clicks en líneas correctas. Meta: 10 puntos.', en: '5 snippets total. Avoid clicking correct lines. Goal: 10 points.' },
    ],
    scoring: { es: '+2 por bug encontrado, -1 por click en línea correcta.', en: '+2 per bug found, -1 for clicking a correct line.' },
  },
  {
    id: 'lvl-7',
    index: 7,
    company: 'SERED',
    role: { es: 'Analista de Soporte Técnico L2', en: 'Technical Support Analyst L2' },
    location: { es: 'España', en: 'Spain' },
    mode: 'remote',
    period: { es: 'Abr 2024 — Feb 2026', en: 'Apr 2024 — Feb 2026' },
    startDate: '2024-04',
    endDate: '2026-02',
    durationYears: 1.85,
    summary: {
      es: 'Reducción del 80-90% en tiempo de resolución de tickets. Migración de servidores y hosting con Installatron Manager a través de cPanel. Scripts Bash de automatización y gestión de +100 clientes activos mensuales.',
      en: '80-90% reduction in ticket resolution time. Server and hosting migration with Installatron Manager via cPanel. Bash automation scripts and management of +100 active monthly customers.',
    },
    achievements: [
      {
        es: 'Reducción del 80-90% en tiempo medio de resolución de tickets',
        en: '80-90% reduction in average ticket resolution time',
      },
      {
        es: 'Migración de servidores con Installatron Manager vía cPanel',
        en: 'Server migration with Installatron Manager via cPanel',
      },
      {
        es: 'Desarrollo de scripts de automatización en Bash',
        en: 'Development of Bash automation scripts',
      },
      {
        es: 'Reestructuración de documentación interna y FAQ',
        en: 'Restructuring of internal documentation and FAQ',
      },
      {
        es: 'Gestión de +100 clientes activos mensuales con alta retención',
        en: 'Management of +100 active monthly customers with high retention',
      },
    ],
    skills: ['installatron', 'cpanel', 'bash', 'documentation', 'whmcs', 'jira', 'intercom', 'english-b1', 'sysadmin'],
    gameId: 'migration',
    gameTitle: { es: 'Migración Zero Downtime', en: 'Zero Downtime Migration' },
    gameDescription: {
      es: 'Migra 20 cuentas de servidor sin bajar el uptime. La velocidad mata, la paciencia salva.',
      en: 'Migrate 20 server accounts without dropping uptime. Speed kills, patience saves.',
    },
    gameGoal: 20,
    accent: 'emerald',
    howTo: [
      { es: 'Hay 2 servidores: Origen (izquierda) y Destino (derecha).', en: 'There are 2 servers: Source (left) and Destination (right).' },
      { es: 'Las cuentas tienen tamaños: S (carga 4), M (carga 8), L (carga 14).', en: 'Accounts have sizes: S (load 4), M (load 8), L (load 14).' },
      { es: 'Haz click en cuentas del origen para migrarlas al destino.', en: 'Click accounts on the source to migrate them to the destination.' },
      { es: 'No sobrepases la carga máxima (60) o el uptime bajará.', en: 'Do not exceed the maximum load (60) or uptime will drop.' },
      { es: '20 cuentas en total. Bonus por uptime. Duración: 60s. Meta: 20.', en: '20 accounts total. Bonus for uptime. Duration: 60s. Goal: 20.' },
    ],
    scoring: { es: '+1 por cuenta migrada + bonus por uptime final.', en: '+1 per migrated account + bonus for final uptime.' },
  },
  {
    id: 'lvl-8',
    index: 8,
    company: 'Zentra SaaS',
    role: { es: 'Prompt Engineer', en: 'Prompt Engineer' },
    location: { es: 'Remoto', en: 'Remote' },
    mode: 'freelance',
    period: { es: 'Mar 2026 — Actualmente', en: 'Mar 2026 — Present' },
    startDate: '2026-03',
    endDate: 'present',
    durationYears: 0.3,
    summary: {
      es: 'Diseño y optimización de frameworks de prompting estructurado para LLMs, apoyando desarrollo de software, resolución de incidencias y automatización de flujos. Implementación de procesos de QA asistidos por IA para validación de despliegues, análisis de incidentes y gestión de cambios.',
      en: 'Design and optimization of structured prompting frameworks for LLMs, supporting software development, incident resolution and workflow automation. Implementation of AI-assisted QA processes for deployment validation, incident analysis and change management.',
    },
    achievements: [
      {
        es: 'Diseñé y optimicé frameworks de prompting estructurado para apoyar el desarrollo de software, la resolución de incidencias, la automatización de flujos de trabajo y la toma de decisiones técnicas mediante el uso de Modelos de Lenguaje de Gran Escala (LLMs).',
        en: 'Designed and optimized structured prompting frameworks to support software development, incident resolution, workflow automation, and technical decision-making using Large Language Models (LLMs).',
      },
      {
        es: 'Implementé procesos de validación y control de calidad asistidos por IA, utilizando instrucciones estructuradas para verificar resultados, detectar inconsistencias y apoyar revisiones técnicas antes de la implementación de cambios.',
        en: 'Implemented AI-assisted validation and quality control processes, using structured instructions to verify results, detect inconsistencies, and support technical reviews before implementing changes.',
      },
      {
        es: 'Implementé procesos de aseguramiento de calidad y validación operativa asistidos por IA para revisiones de despliegue, análisis de incidentes, gestión de cambios y mejora continua de procesos.',
        en: 'Implemented AI-assisted quality assurance and operational validation processes for deployment reviews, incident analysis, change management, and continuous process improvement.',
      },
      {
        es: 'Diseñé flujos de automatización orientados a la gestión de despliegues y lanzamientos (Release Management), incorporando validaciones preventivas, generación de respaldos, control de cambios y soporte a procesos de integración continua.',
        en: 'Designed automation flows oriented toward deployment and release management, incorporating preventive validations, backup generation, change control, and support for continuous integration processes.',
      },
    ],
    skills: ['prompt-engineering', 'llm', 'ai-qa', 'release-management', 'change-management', 'automation-flows'],
    gameId: 'prompt-architect',
    gameTitle: { es: 'Arquitecto de Prompts', en: 'Prompt Architect' },
    gameDescription: {
      es: 'Construye prompts estructurados para cada escenario técnico. Selecciona los componentes correctos y valida tu prompt antes de enviarlo al LLM.',
      en: 'Build structured prompts for each technical scenario. Select the correct components and validate your prompt before sending it to the LLM.',
    },
    gameGoal: 12,
    accent: 'fuchsia',
    howTo: [
      { es: 'Aparece un escenario técnico (ej: “Diagnosticar incidente de producción”).', en: 'A technical scenario appears (e.g. “Diagnose production incident”).' },
      { es: 'Se muestran 8 componentes de prompt en 5 categorías: ROL, CONTEXTO, INSTRUCCIÓN, RESTRICCIÓN, FORMATO.', en: '8 prompt components are shown in 5 categories: ROLE, CONTEXT, INSTRUCTION, CONSTRAINT, FORMAT.' },
      { es: '4 componentes son correctos para el escenario y 4 son distractores.', en: '4 components are correct for the scenario and 4 are distractors.' },
      { es: 'Selecciona los 4 correctos y pulsa “VALIDAR PROMPT”.', en: 'Select the 4 correct ones and press “VALIDATE PROMPT”.' },
      { es: '+2 por correcto, -1 por incorrecto. 6 escenarios. Meta: 12 puntos.', en: '+2 per correct, -1 per wrong. 6 scenarios. Goal: 12 points.' },
    ],
    scoring: { es: '+2 por componente correcto, -1 por incorrecto. 6 escenarios.', en: '+2 per correct component, -1 per wrong. 6 scenarios.' },
  },
];

// ────────────────────────────────────────────────────────────────────────────
// PERSONAL INFO
// ────────────────────────────────────────────────────────────────────────────
export const PERSON = {
  name: 'José Pérez',
  title: {
    es: 'SYSADMIN · JR. DEVOPS ENGINEER · TECHNICAL SUPPORT L2',
    en: 'SYSADMIN · JR. DEVOPS ENGINEER · TECHNICAL SUPPORT L2',
  },
  email: 'shelouiss@gmail.com',
  phone: '+58 414 794 8934',
  linkedin: 'https://www.linkedin.com/in/shel0u',
  linkedinHandle: 'in/shel0u',
  country: { es: 'Venezuela', en: 'Venezuela' },
  workMode: 'remote' as WorkMode,
  summary: {
    es: 'Administrador de Sistemas (Sysadmin) y Soporte Técnico L2 con más de 10 años de experiencia en infraestructura Linux, hosting web, automatización DevOps y desarrollo backend. He gestionado entornos de alta demanda con más de 20,000 clientes y flotas de servidores de producción en empresas de hosting y cloud. Dominio de cPanel, AWS, DigitalOcean, Docker, Jenkins y pipelines CI/CD, complementado con desarrollo en PHP/Laravel y MySQL. Inglés B1 certificado.',
    en: 'Systems Administrator (Sysadmin) and Technical Support L2 with over 10 years of experience in Linux infrastructure, web hosting, DevOps automation and backend development. Managed high-demand environments with over 20,000 customers and production server fleets in hosting and cloud companies. Proficient in cPanel, AWS, DigitalOcean, Docker, Jenkins and CI/CD pipelines, complemented by PHP/Laravel and MySQL development. Certified English B1.',
  },
  goal: {
    es: 'Busco unirme a equipos de infraestructura o DevOps en empresas SaaS, hosting o cloud donde pueda aportar experiencia técnica real y crecer hacia roles de SRE o DevOps Senior.',
    en: 'Seeking to join infrastructure or DevOps teams in SaaS, hosting or cloud companies where I can bring real technical experience and grow toward SRE or Senior DevOps roles.',
  },
  tags: {
    es: ['Linux', 'Docker', 'AWS', 'cPanel', 'PHP/Laravel', 'Jenkins', 'Zabbix', 'DigitalOcean', 'Sysadmin'],
    en: ['Linux', 'Docker', 'AWS', 'cPanel', 'PHP/Laravel', 'Jenkins', 'Zabbix', 'DigitalOcean', 'Sysadmin'],
  },
};

export const EDUCATION = [
  {
    title: {
      es: 'Ingeniería Informática (en curso)',
      en: 'Computer Engineering (in progress)',
    },
    institution: {
      es: 'UGMA — Universidad Gran Mariscal de Ayacucho',
      en: 'UGMA — Universidad Gran Mariscal de Ayacucho',
    },
    period: { es: '2018 — Presente', en: '2018 — Present' },
    detail: {
      es: 'Formación en sistemas, redes y arquitectura de software.',
      en: 'Training in systems, networks and software architecture.',
    },
  },
  {
    title: {
      es: 'Técnico Medio en Informática',
      en: 'Computer Technician',
    },
    institution: {
      es: 'Escuela Técnica Juan Crisóstomo Falcón',
      en: 'Escuela Técnica Juan Crisóstomo Falcón',
    },
    period: { es: '2011 — 2014', en: '2011 — 2014' },
    detail: {
      es: 'Formación técnica en informática y sistemas.',
      en: 'Technical training in computing and systems.',
    },
  },
];

export const CERTIFICATIONS = [
  {
    name: {
      es: 'Docker: De cero a experto (Docker Compose e Images)',
      en: 'Docker: From zero to expert (Docker Compose and Images)',
    },
    issuer: 'Platzi',
  },
  {
    name: { es: 'B1 Inglés Conversacional', en: 'B1 Conversational English' },
    issuer: 'Platzi',
  },
  {
    name: { es: 'Inglés Avanzado', en: 'Advanced English' },
    issuer: 'Sinergy Institute',
  },
];

// helper: skills unlocked up to a given level (inclusive)
export function unlockedSkillsUpTo(levelIndex: number, completedIds: Set<string>): (Skill & { name: Bi })[] {
  const ids = new Set<string>();
  for (const lvl of JOB_LEVELS) {
    if (lvl.index <= levelIndex && completedIds.has(lvl.id)) {
      lvl.skills.forEach((s) => ids.add(s));
    }
  }
  return SKILLS.filter((s) => ids.has(s.id));
}

// all skills that CAN be unlocked (full stack)
export const TOTAL_UNLOCKABLE_SKILLS = SKILLS.filter((s) =>
  JOB_LEVELS.some((lvl) => lvl.skills.includes(s.id)),
).length;

// total levels
export const TOTAL_LEVELS = JOB_LEVELS.length;

// helper to get skill name by lang
export function skillName(skill: (typeof SKILLS)[number], lang: Lang): string {
  return skill.name[lang];
}
