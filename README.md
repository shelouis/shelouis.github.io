# 🎮 SYSADMIN QUEST — CV Interactivo

> Un videojuego web interactivo estilo 8-bit retro (NES/SNES) que presenta la carrera profesional de José Pérez como un recorrido jugable de 8 niveles. Cada nivel representa un puesto real de trabajo, con su propio mini-juego, mecánicas únicas y habilidades desbloqueables basadas en el stack tecnológico real del CV.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Portfolio_Ready-success)

---

## 📋 Tabla de Contenidos

- [Motivo del Proyecto](#-motivo-del-proyecto)
- [Características Principales](#-características-principales)
- [Los 8 Niveles](#-los-8-niveles)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Cómo Jugar](#-cómo-jugar)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Plantilla para Recrear](#-plantilla-para-recrear)

---

## 🎯 Motivo del Proyecto

Los CV tradicionales en PDF son estáticos y no muestran las habilidades técnicas reales de un candidato. Este proyecto transforma un CV convencional en una **experiencia interactiva** donde las empresas pueden:

1. **Experimentar las competencias** del candidato jugando mini-juegos basados en tareas reales de cada puesto
2. **Ver el stack completo** desbloqueándose progresivamente, igual que en un videojuego de progresión
3. **Aprender el contexto** de cada rol mediante instrucciones, capturas de pantalla y referencias al CV real
4. **Disfrutar el proceso** con una estética retro 8-bit, efectos de sonido chiptune y música de fondo

El objetivo es que un reclutador o equipo técnico **aprenda el perfil de José Pérez de forma memorable e interactiva**, en lugar de leer un PDF aburrido.

---

## ✨ Características Principales

### 🕹️ 8 Mini-juegos únicos
Cada nivel tiene mecánicas distintas inspiradas en tareas reales del puesto correspondiente — no son reskins del mismo juego.

### 🌐 Bilingüe (Español / Inglés)
Selección de idioma al inicio. Todo el contenido (UI, CV, instrucciones, sonidos) se traduce al instante. La elección persiste en localStorage.

### 🔓 Modo Desbloqueado
Toggle que permite jugar cualquier nivel en cualquier orden, sin necesidad de completar los anteriores. Ideal para reclutadores que quieren ver un nivel específico.

### 🎵 Motor de sonido chiptune
Efectos de sonido 8-bit generados programáticamente con Web Audio API (sin archivos de audio). Cada juego tiene su propio sonido distintivo, más música de fondo en el menú.

### 📚 Sección de Documentación
Guía interactiva con instrucciones paso a paso, objetivos, controles, sistema de puntuación, capturas de pantalla clickeables y referencia al rol real del CV para cada nivel.

### 📄 CV Interactivo Final
Pantalla de CV con 4 pestañas: Experiencia, Skills, Educación y Logros. Las secciones se desbloquean a medida que completas niveles. Incluye botón de imprimir/guardar PDF.

### 🏆 Sistema de progresión
- **XP y estrellas** (1-3 por nivel) con persistencia en localStorage
- **50 habilidades** desbloqueables en 10 categorías
- **9 logros** (Veterano, Leyenda DevOps, Arquitecto de IA, etc.)

### 🎨 Estética 8-bit auténtica
- Fuente **Press Start 2P** para títulos/HUD
- Fuente **VT323** para texto cuerpo
- Scanlines CRT + viñeta
- Bordes pixelados de 3px (sin border-radius)
- Paleta de colores saturada estilo NES
- Animaciones escalonadas

---

## 🎮 Los 8 Niveles

| # | Título | Empresa | Rol | Mecánica |
|---|--------|---------|-----|----------|
| 1 | **Primer Contacto** | VenezuelaHosting | Soporte L1 | Tickets caen en 3 canales (Chat/Email/VoIP); responde antes del SLA |
| 2 | **Vigilancia Proactiva** | VenezuelaHosting | Soporte L2 | Grid de servidores Zabbix; repara fallos antes de que caiga el uptime |
| 3 | **Multi-Panel Maestro** | LatincCloud | Soporte Técnico | Asigna configuraciones al panel correcto (cPanel/DirectAdmin/Plesk/VestaPanel) |
| 4 | **Comandante de Soporte** | ADCLICHOSTING | Gerente TSM | Rutea tickets a 4 especialistas (cPanel/Redes/Email/SSL) |
| 5 | **Arquitecto DevOps** | RORAIMADEVS | Jr. DevOps | Construye pipeline CI/CD colocando herramientas en etapas (Source→Build→Test→Deploy) |
| 6 | **Cazador de Bugs** | ESTUDIO2B | Backend Dev | Revisa código PHP/Laravel y encuentra bugs (SQL Injection, mass assignment, etc.) |
| 7 | **Migración Zero Downtime** | SERED | Soporte L2 | Migra 20 cuentas entre servidores sin sobrecargar el sistema |
| 8 | **Arquitecto de Prompts** | Zentra SaaS | Prompt Engineer | Construye prompts estructurados seleccionando componentes (Rol/Contexto/Instrucción/Restricción/Formato) |

---

## 🛠️ Tecnologías Utilizadas

### Core
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 16 | Framework React con App Router |
| **TypeScript** | 5 | Tipado estático en todo el proyecto |
| **React** | 19 | Librería de UI |
| **Tailwind CSS** | 4 | Estilos utilitarios + tema 8-bit personalizado |

### UI y Animación
| Tecnología | Uso |
|------------|-----|
| **shadcn/ui** | Componentes base (Button, Dialog, Tabs, Switch, AlertDialog, Tooltip) |
| **Framer Motion** | Animaciones de transición entre pantallas |
| **Lucide Icons** | Iconografía |

### Estado y Datos
| Tecnología | Uso |
|------------|-----|
| **Zustand** | Estado global del juego (pantalla, XP, resultados, idioma, modo desbloqueado) |
| **Zustand persist** | Persistencia en localStorage |
| **Prisma ORM** | Disponible (configurado para SQLite) |

### Audio
| Tecnología | Uso |
|------------|-----|
| **Web Audio API** | Motor de sonido chiptune (oscilladores + gain nodes, sin archivos externos) |

### Tipografía
| Fuente | Uso |
|--------|-----|
| **Press Start 2P** (Google Fonts) | Títulos, HUD, labels — estilo pixel NES |
| **VT323** (Google Fonts) | Texto cuerpo, instrucciones — terminal retro |
| **Geist** (Google Fonts) | Fallback sans-serif |

---

## 🚀 Cómo Jugar

1. **Pantalla de idioma**: Elige Español o English. Activa el "Modo Desbloqueado" si quieres jugar cualquier nivel.
2. **Pantalla de boot**: Animación de terminal que carga el juego (puedes saltarla).
3. **Mapa de carrera**: 8 niveles en timeline. Completa uno para desbloquear el siguiente.
4. **Cada nivel**: Lee el briefing → juega el mini-juego → supera la puntuación objetivo.
5. **Desbloquea habilidades**: Cada nivel superado libera las skills reales de ese rol.
6. **Revisa la Guía**: Botón "Guía/Guide" en la barra superior para ver instrucciones de cada nivel.
7. **CV completo**: Botón "CV" para ver el currículum interactivo con todo desbloqueado.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Tema 8-bit (scanlines, pixel borders, fuentes)
│   ├── layout.tsx           # Carga fuentes retro (Press Start 2P + VT323)
│   └── page.tsx             # Router principal (lang → boot → map → game → cv → docs)
├── lib/
│   ├── cv-data.ts           # 8 niveles, 50 skills, educación, certificaciones (bilingüe)
│   ├── i18n.ts              # Diccionario de ~150 strings UI (es/en)
│   ├── sound.ts             # Motor chiptune (8 SFX + música de fondo)
│   ├── types.ts             # Tipos TypeScript (GameState, JobLevel, etc.)
│   └── accents.ts           # Mapa estático de colores por acento
├── store/
│   └── game-store.ts        # Zustand store con persist (XP, resultados, idioma)
├── components/
│   └── game/
│       ├── LanguageSelect.tsx   # Pantalla de selección de idioma
│       ├── BootScreen.tsx        # Animación de terminal boot
│       ├── StatusBar.tsx         # HUD superior (XP, nav, mute, unlock toggle)
│       ├── CareerMap.tsx         # Timeline de 8 niveles
│       ├── Documentation.tsx     # Guía con instrucciones + capturas
│       ├── GameFrame.tsx         # Wrapper intro→playing→results
│       ├── GameModal.tsx         # Carga el juego correcto
│       ├── FinalCV.tsx           # CV interactivo (4 tabs)
│       ├── SkillsPanel.tsx       # Stack técnico por categorías
│       ├── Footer.tsx            # Footer sticky
│       └── games/
│           ├── TicketTriage.tsx      # Nivel 1
│           ├── ServerMonitor.tsx     # Nivel 2
│           ├── MultiPanel.tsx        # Nivel 3
│           ├── TeamRouter.tsx        # Nivel 4
│           ├── PipelineBuilder.tsx   # Nivel 5
│           ├── BugHunter.tsx         # Nivel 6
│           ├── Migration.tsx         # Nivel 7
│           ├── PromptArchitect.tsx   # Nivel 8
│           └── index.ts             # Registry de juegos
public/
└── screenshots/              # 8 capturas de pantalla de cada juego
```

---

## 📦 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/shelouis/shelouis.github.io.git
cd shelouis.github.io

# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# Abrir http://localhost:3000

# Build de producción
bun run build

# Lint
bun run lint
```

### Requisitos
- Node.js 18+ o Bun
- Navegador moderno con Web Audio API

---

## 📝 Plantilla para Recrear

Este proyecto incluye una **plantilla de prompt** en [`PROMPT_TEMPLATE.md`](./PROMPT_TEMPLATE.md) que puedes usar para que una IA genere un proyecto similar con tu propio CV.

---

## 👤 Autor

**José Pérez** — Sysadmin · Jr. DevOps Engineer · Technical Support L2

- 📧 Email: shelouiss@gmail.com
- 📱 Teléfono: +58 414 794 8934
- 💼 LinkedIn: [in/shel0u](https://www.linkedin.com/in/shel0u)
- 🌍 Ubicación: Venezuela · Remoto

---

## 📄 Licencia

Este proyecto es de uso personal para portafolio. Siéntete libre de inspirarte en la estructura para crear tu propio CV interactivo.

---

> *Hecho con ♥ y muchos píxeles. Cada nivel está basado en un puesto real de trabajo — las habilidades desbloqueadas son reales.*
