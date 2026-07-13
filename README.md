# 🎮 SYSADMIN QUEST — Interactive CV

> An interactive 8-bit retro web game (NES/SNES style) that presents José Pérez's professional career as a playable journey of 8 levels. Each level represents a real job role, with its own mini-game, unique mechanics, and unlockable skills based on the actual tech stack from the CV.

### 🚀 [PLAY THE GAME →](https://shelouis-github-io.vercel.app/)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Play_Now-3aff3a?style=for-the-badge&logo=vercel&logoColor=white)](https://shelouis-github-io.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shelouis/shelouis.github.io)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Portfolio_Ready-success)

---

## 🌐 Language / Idioma

<details>
<summary><b>📖 Click here to read in ESPAÑOL</b></summary>

---

# 🎮 SYSADMIN QUEST — CV Interactivo

> Un videojuego web interactivo estilo 8-bit retro (NES/SNES) que presenta la carrera profesional de José Pérez como un recorrido jugable de 8 niveles. Cada nivel representa un puesto real de trabajo, con su propio mini-juego, mecánicas únicas y habilidades desbloqueables basadas en el stack tecnológico real del CV.

### 🚀 [JUGAR AHORA →](https://shelouis-github-io.vercel.app/)

[![Demo en Vivo](https://img.shields.io/badge/DEMO_EN_VIVO-Jugar_Ahora-3aff3a?style=for-the-badge&logo=vercel&logoColor=white)](https://shelouis-github-io.vercel.app/)
[![GitHub](https://img.shields.io/badge/Código_Fuente-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shelouis/shelouis.github.io)

### 🎯 Motivo del Proyecto

Los CV tradicionales en PDF son estáticos y no muestran las habilidades técnicas reales de un candidato. Este proyecto transforma un CV convencional en una **experiencia interactiva** donde las empresas pueden:

1. **Experimentar las competencias** del candidato jugando mini-juegos basados en tareas reales de cada puesto
2. **Ver el stack completo** desbloqueándose progresivamente, igual que en un videojuego de progresión
3. **Aprender el contexto** de cada rol mediante instrucciones, capturas de pantalla y referencias al CV real
4. **Disfrutar el proceso** con una estética retro 8-bit, efectos de sonido chiptune y música de fondo

El objetivo es que un reclutador o equipo técnico **aprenda el perfil de José Pérez de forma memorable e interactiva**, en lugar de leer un PDF aburrido.

### ✨ Características Principales

- **8 mini-juegos únicos** — cada nivel tiene mecánicas distintas inspiradas en tareas reales del puesto
- **Bilingüe (Español/Inglés)** — selección de idioma al inicio, todo se traduce al instante
- **Modo Desbloqueado** — juega cualquier nivel en cualquier orden
- **Motor de sonido chiptune** — efectos 8-bit generados con Web Audio API + música de fondo
- **Sección de Documentación** — guía interactiva con instrucciones, capturas y referencias al CV
- **CV Interactivo Final** — 4 pestañas: Experiencia, Skills, Educación y Logros
- **Sistema de progresión** — XP, estrellas (1-3), 50 habilidades desbloqueables, 9 logros
- **Estética 8-bit auténtica** — Press Start 2P, scanlines CRT, bordes pixelados, paleta NES

### 🎮 Los 8 Niveles

| # | Título | Empresa | Rol | Mecánica |
|---|--------|---------|-----|----------|
| 1 | Primer Contacto | VenezuelaHosting | Soporte L1 | Tickets caen en 3 canales; responde antes del SLA |
| 2 | Vigilancia Proactiva | VenezuelaHosting | Soporte L2 | Grid de servidores Zabbix; repara antes de que caiga el uptime |
| 3 | Multi-Panel Maestro | LatincCloud | Soporte Técnico | Asigna configs al panel correcto (cPanel/DirectAdmin/Plesk/VestaPanel) |
| 4 | Comandante de Soporte | ADCLICHOSTING | Gerente TSM | Rutea tickets a 4 especialistas (cPanel/Redes/Email/SSL) |
| 5 | Arquitecto DevOps | RORAIMADEVS | Jr. DevOps | Construye pipeline CI/CD colocando herramientas en etapas |
| 6 | Cazador de Bugs | ESTUDIO2B | Backend Dev | Revisa código PHP/Laravel y encuentra bugs |
| 7 | Migración Zero Downtime | SERED | Soporte L2 | Migra 20 cuentas entre servidores sin sobrecargar |
| 8 | Arquitecto de Prompts | Zentra SaaS | Prompt Engineer | Construye prompts estructurados seleccionando componentes |

### 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16 | Framework React con App Router |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos + tema 8-bit personalizado |
| shadcn/ui | — | Componentes (Button, Dialog, Tabs, Switch, etc.) |
| Framer Motion | 12 | Animaciones |
| Zustand | 5 | Estado global con persist en localStorage |
| Web Audio API | — | Motor de sonido chiptune (sin archivos externos) |
| Press Start 2P + VT323 | Google Fonts | Tipografía retro 8-bit |

### 🚀 Cómo Jugar

1. **Pantalla de idioma**: Elige Español o English. Activa el "Modo Desbloqueado" si quieres.
2. **Pantalla de boot**: Animación de terminal que carga el juego.
3. **Mapa de carrera**: 8 niveles en timeline. Completa uno para desbloquear el siguiente.
4. **Cada nivel**: Lee el briefing → juega el mini-juego → supera la puntuación objetivo.
5. **Desbloquea habilidades**: Cada nivel superado libera las skills reales de ese rol.
6. **Revisa la Guía**: Botón "Guía" para ver instrucciones de cada nivel con capturas.
7. **CV completo**: Botón "CV" para ver el currículum interactivo.

### 📦 Instalación

```bash
git clone https://github.com/shelouis/shelouis.github.io.git
cd shelouis.github.io
bun install
bun run dev
```

### 👤 Autor

**José Pérez** — Sysadmin · Jr. DevOps Engineer · Technical Support L2

- 📧 shelouiss@gmail.com
- 📱 +58 414 794 8934
- 💼 [LinkedIn](https://www.linkedin.com/in/shel0u)
- 🌍 Venezuela · Remoto

</details>

---

## 📖 Read in ENGLISH (default)

### 🎯 Project Motivation

Traditional PDF resumes are static and don't showcase a candidate's actual technical skills. This project transforms a conventional CV into an **interactive experience** where companies can:

1. **Experience the candidate's competencies** by playing mini-games based on real tasks from each role
2. **See the full tech stack** unlocking progressively, just like in a progression-based video game
3. **Learn the context** of each role through instructions, screenshots, and references to the real CV
4. **Enjoy the process** with an 8-bit retro aesthetic, chiptune sound effects, and background music

The goal is for a recruiter or technical team to **learn José Pérez's profile in a memorable and interactive way**, rather than reading a boring PDF.

### ✨ Key Features

- **8 unique mini-games** — each level has distinct mechanics inspired by real tasks from the corresponding job role
- **Bilingual (Spanish/English)** — language selection at startup, everything translates instantly. Choice persists in localStorage.
- **Unlocked Mode** — play any level in any order, no need to complete previous ones. Ideal for recruiters who want to see a specific level.
- **Chiptune sound engine** — 8-bit sound effects generated programmatically with Web Audio API (no audio files). Each game has its own distinctive sound, plus background music in the menu.
- **Documentation section** — interactive guide with step-by-step instructions, objectives, controls, scoring system, clickable screenshots, and reference to the real CV role for each level.
- **Interactive CV screen** — 4 tabs: Experience, Skills, Education, and Achievements. Sections unlock as you complete levels. Includes print/save PDF button.
- **Progression system** — XP and stars (1-3 per level) with localStorage persistence, 50 unlockable skills across 10 categories, 9 achievements.
- **Authentic 8-bit aesthetic** — Press Start 2P font for titles/HUD, VT323 for body text, CRT scanlines + vignette, 3px pixel borders (no border-radius), saturated NES-style color palette, stepped animations.

### 🎮 The 8 Levels

| # | Title | Company | Role | Mechanic |
|---|-------|---------|------|----------|
| 1 | **First Contact** | VenezuelaHosting | L1 Support | Tickets fall in 3 channels (Chat/Email/VoIP); answer before SLA expires |
| 2 | **Proactive Watch** | VenezuelaHosting | L2 Support | Zabbix server grid; fix failures before uptime drops |
| 3 | **Multi-Panel Master** | LatincCloud | Tech Support | Assign configs to correct panel (cPanel/DirectAdmin/Plesk/VestaPanel) |
| 4 | **Support Commander** | ADCLICHOSTING | TSM Manager | Route tickets to 4 specialists (cPanel/Networks/Email/SSL) |
| 5 | **DevOps Architect** | RORAIMADEVS | Jr. DevOps | Build CI/CD pipeline placing tools in stages (Source→Build→Test→Deploy) |
| 6 | **Bug Hunter** | ESTUDIO2B | Backend Dev | Review PHP/Laravel code and find bugs (SQL Injection, mass assignment, etc.) |
| 7 | **Zero Downtime Migration** | SERED | L2 Support | Migrate 20 accounts between servers without overloading the system |
| 8 | **Prompt Architect** | Zentra SaaS | Prompt Engineer | Build structured prompts selecting components (Role/Context/Instruction/Constraint/Format) |

### 🛠️ Technologies Used

#### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16 | React framework with App Router |
| **TypeScript** | 5 | Static typing throughout the project |
| **React** | 19 | UI library |
| **Tailwind CSS** | 4 | Utility styles + custom 8-bit theme |

#### UI & Animation
| Technology | Purpose |
|------------|---------|
| **shadcn/ui** | Base components (Button, Dialog, Tabs, Switch, AlertDialog, Tooltip) |
| **Framer Motion** | Screen transition animations |
| **Lucide Icons** | Iconography |

#### State & Data
| Technology | Purpose |
|------------|---------|
| **Zustand** | Global game state (screen, XP, results, language, unlocked mode) |
| **Zustand persist** | localStorage persistence |
| **Prisma ORM** | Available (configured for SQLite) |

#### Audio
| Technology | Purpose |
|------------|---------|
| **Web Audio API** | Chiptune sound engine (oscillators + gain nodes, no external files) |

#### Typography
| Font | Purpose |
|------|---------|
| **Press Start 2P** (Google Fonts) | Titles, HUD, labels — NES pixel style |
| **VT323** (Google Fonts) | Body text, instructions — retro terminal |
| **Geist** (Google Fonts) | Sans-serif fallback |

### 🚀 How to Play

1. **Language screen**: Choose Español or English. Enable "Unlocked Mode" to play any level.
2. **Boot screen**: Terminal animation that loads the game (can be skipped).
3. **Career map**: 8 levels on a timeline. Complete one to unlock the next.
4. **Each level**: Read the briefing → play the mini-game → beat the target score.
5. **Unlock skills**: Each completed level releases the real skills from that role.
6. **Check the Guide**: "Guide" button in the top bar to see instructions for each level.
7. **Full CV**: "CV" button to view the interactive resume with everything unlocked.

### 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # 8-bit theme (scanlines, pixel borders, fonts)
│   ├── layout.tsx           # Loads retro fonts (Press Start 2P + VT323)
│   └── page.tsx             # Main router (lang → boot → map → game → cv → docs)
├── lib/
│   ├── cv-data.ts           # 8 levels, 50 skills, education, certifications (bilingual)
│   ├── i18n.ts              # ~150 UI string dictionary (es/en)
│   ├── sound.ts             # Chiptune engine (8 SFX + background music)
│   ├── types.ts             # TypeScript types (GameState, JobLevel, etc.)
│   └── accents.ts           # Static color map per accent
├── store/
│   └── game-store.ts        # Zustand store with persist (XP, results, language)
├── components/
│   └── game/
│       ├── LanguageSelect.tsx   # Language selection screen
│       ├── BootScreen.tsx        # Terminal boot animation
│       ├── StatusBar.tsx         # Top HUD (XP, nav, mute, unlock toggle)
│       ├── CareerMap.tsx         # 8-level timeline
│       ├── Documentation.tsx     # Guide with instructions + screenshots
│       ├── GameFrame.tsx         # Wrapper intro→playing→results
│       ├── GameModal.tsx         # Loads the correct game
│       ├── FinalCV.tsx           # Interactive CV (4 tabs)
│       ├── SkillsPanel.tsx       # Tech stack by categories
│       ├── Footer.tsx            # Sticky footer
│       └── games/
│           ├── TicketTriage.tsx      # Level 1
│           ├── ServerMonitor.tsx     # Level 2
│           ├── MultiPanel.tsx        # Level 3
│           ├── TeamRouter.tsx        # Level 4
│           ├── PipelineBuilder.tsx   # Level 5
│           ├── BugHunter.tsx         # Level 6
│           ├── Migration.tsx         # Level 7
│           ├── PromptArchitect.tsx   # Level 8
│           └── index.ts             # Game registry
public/
└── screenshots/              # 8 gameplay screenshots
```

### 📦 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/shelouis/shelouis.github.io.git
cd shelouis.github.io

# Install dependencies
bun install

# Start development server
bun run dev

# Open http://localhost:3000

# Production build
bun run build

# Lint
bun run lint
```

### Requirements
- Node.js 18+ or Bun
- Modern browser with Web Audio API support

### 📝 Recreate Template

This project includes a **prompt template** in [`PROMPT_TEMPLATE.md`](./PROMPT_TEMPLATE.md) that you can use to have an AI generate a similar project with your own CV.

### 👤 Author

**José Pérez** — Sysadmin · Jr. DevOps Engineer · Technical Support L2

- 📧 Email: shelouiss@gmail.com
- 📱 Phone: +58 414 794 8934
- 💼 LinkedIn: [in/shel0u](https://www.linkedin.com/in/shel0u)
- 🌍 Location: Venezuela · Remote

### 📄 License

This project is for personal portfolio use. Feel free to draw inspiration from the structure to create your own interactive CV.

---

> *Made with ♥ and lots of pixels. Each level is based on a real job role — the unlocked skills are real.*
>
> *Hecho con ♥ y muchos píxeles. Cada nivel está basado en un puesto real de trabajo — las habilidades desbloqueadas son reales.*
