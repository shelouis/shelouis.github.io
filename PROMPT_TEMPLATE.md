# 📋 Prompt Template — Cómo Recrear un CV Interactivo Tipo Videojuego

> Copia este prompt y pégalo en tu herramienta de IA preferida (ChatGPT, Claude, Z.ai, etc.) para generar un proyecto similar con tu propio CV. Reemplaza las secciones entre `[CORCHETES]` con tu información real.

---

## 🎯 Prompt Completo

```
Quiero que crees un videojuego web interactivo que presente mi CV profesional de forma jugable. El juego debe tener estética 8-bit retro (estilo NES/SNES/Atari) y permitir a reclutadores y empresas conocer mi perfil de forma divertida e interactiva.

## 📋 MI CV

[NOMBRE]: José Pérez
[TÍTULO PROFESIONAL]: Sysadmin · Jr. DevOps Engineer · Technical Support L2
[EMAIL]: shelouiss@gmail.com
[TELÉFONO]: +58 414 794 8934
[LINKEDIN]: https://www.linkedin.com/in/shel0u
[UBICACIÓN]: Venezuela · Remoto

### RESUMEN PROFESIONAL:
[PEGA AQUÍ TU RESUMEN PROFESIONAL — 3-5 líneas describiendo tu experiencia]

### EXPERIENCIA LABORAL (7-8 puestos, del más antiguo al más reciente):

1. [EMPRESA 1] — [ROL] — [UBICACIÓN] — [MODO: Remoto/Híbrido/Freelance] — [PERÍODO]
   Resumen: [1-2 líneas de qué hacías]
   Logros:
   - [Logro 1 con métrica si es posible]
   - [Logro 2]
   - [Logro 3]
   Habilidades usadas: [skill1, skill2, skill3, ...]

2. [EMPRESA 2] — [ROL] — ...
   [Repetir estructura para cada puesto]

[... Continúa con todos tus puestos ...]

### STACK TÉCNICO (agrupado por categorías):
- OS & Servidores: [Linux, Windows Server, ...]
- Cloud & Hosting: [AWS, Docker, cPanel, ...]
- DevOps & CI/CD: [Jenkins, Git, ...]
- Backend: [PHP, Laravel, MySQL, ...]
- Redes: [DNS, TCP/IP, SSL, ...]
- Herramientas: [Postman, Git, Jira, ...]
- Idiomas: [Español nativo, Inglés B1, ...]

### EDUCACIÓN:
- [Título] — [Institución] — [Período]
- [Título] — [Institución] — [Período]

### CERTIFICACIONES:
- [Certificación 1] — [Emisor]
- [Certificación 2] — [Emisor]

---

## 🎮 REQUERIMIENTOS DEL JUEGO

### ESTRUCTURA GENERAL:
1. **Pantalla de selección de idioma** (Español / Inglés) antes de empezar, con toggle de "Modo Desbloqueado" para jugar cualquier nivel sin orden.
2. **Pantalla de boot** con animación de terminal (estilo `whoami`, `systemctl status`, etc.) que carga el juego.
3. **Mapa de carrera** con todos los puestos de trabajo como niveles en un timeline vertical. Los niveles se desbloquean secuencialmente (o todos si el Modo Desbloqueado está activo).
4. **8 mini-juegos**, uno por cada puesto de trabajo. Cada juego debe tener mecánicas ÚNICAS basadas en las tareas reales de ese rol.
5. **Pantalla de CV interactivo** que se desbloquea progresivamente a medida que completas niveles. Con 4 pestañas: Experiencia, Skills, Educación y Logros.
6. **Sección de documentación/guía** que explica cómo jugar cada nivel con instrucciones paso a paso, capturas de pantalla y referencia al rol real.
7. **Footer sticky** al final de cada pantalla.

### SISTEMA DE PROGRESIÓN:
- XP acumulativa por completar niveles
- Estrellas (1-3) por nivel según la puntuación
- 50+ habilidades desbloqueables agrupadas en 10 categorías
- 8-9 logros desbloqueables
- Persistencia en localStorage (el progreso no se pierde al recargar)

### CADA MINI-JUEGO DEBE TENER:
- Pantalla de briefing con contexto real del puesto
- HUD con puntuación, tiempo/vidas/errores
- Mecánica única y divertida (no reskins del mismo juego)
- Efecto de sonido distintivo al hacer acciones correctas
- Pantalla de resultados con estrellas y skills desbloqueadas
- Botón de repetir y continuar

### ESTÉTICA 8-BIT RETRO:
- Fuente Press Start 2P (Google Fonts) para títulos y HUD
- Fuente VT323 (Google Fonts) para texto cuerpo
- Scanlines CRT en toda la pantalla
- Bordes pixelados de 3px (sin border-radius, todo cuadrado)
- Paleta de colores saturada (verde neón, dorado, cyan, rosa)
- Animaciones escalonadas (steps) para movimiento retro
- Efecto viñeta CRT
- Grid background sutil

### SONIDO CHIPTUNE:
- Motor de sonido con Web Audio API (sin archivos de audio externos)
- 8 efectos de sonido únicos (uno por juego) generados con oscilladores
- Sonido de error para acciones incorrectas
- Música de fondo en el menú de selección de idioma
- Botón de mute/unmute accesible desde la barra superior

### BILINGÜE (ESPAÑOL / INGLÉS):
- Todo el texto traducido: UI, CV, instrucciones, sonidos, logros
- La elección de idioma persiste en localStorage
- Cada campo del CV debe tener versión en español e inglés
- Las instrucciones de cada juego deben estar en ambos idiomas

### SECCIÓN DE DOCUMENTACIÓN:
- Sidebar con lista de los 8 niveles
- Por cada nivel mostrar:
  - Captura de pantalla del juego (clickeable para ampliar)
  - Instrucciones paso a paso de cómo jugar
  - Objetivo del juego
  - Controles
  - Sistema de puntuación
  - Rol de referencia real del CV (empresa, período, resumen, habilidades)
- Navegación con botones Prev/Next
- Botón "Jugar este nivel" que lleva directo al juego

---

## 🛠️ STACK TECNOLÓGICO

Usa este stack exacto:
- **Next.js 16** con App Router
- **TypeScript 5**
- **Tailwind CSS 4** con shadcn/ui (componentes: Button, Dialog, Tabs, Switch, AlertDialog, Tooltip, Badge, Progress)
- **Framer Motion** para animaciones
- **Zustand** con middleware persist para estado global
- **Lucide Icons** para iconografía
- **Web Audio API** para sonido chiptune (sin librerías de audio)
- Fuentes: Press Start 2P + VT323 desde Google Fonts

---

## 📐 ESTRUCTURA DE ARCHIVOS ESPERADA

```
src/
├── app/
│   ├── globals.css          # Tema 8-bit completo
│   ├── layout.tsx           # Carga fuentes retro
│   └── page.tsx             # Router de pantallas
├── lib/
│   ├── cv-data.ts           # Todos los datos del CV (bilingüe {es, en})
│   ├── i18n.ts              # Diccionario de strings UI
│   ├── sound.ts             # Motor de sonido chiptune
│   ├── types.ts             # Tipos TypeScript
│   └── accents.ts           # Mapa de colores estático
├── store/
│   └── game-store.ts        # Zustand store con persist
├── components/game/
│   ├── LanguageSelect.tsx
│   ├── BootScreen.tsx
│   ├── StatusBar.tsx
│   ├── CareerMap.tsx
│   ├── Documentation.tsx
│   ├── GameFrame.tsx
│   ├── GameModal.tsx
│   ├── FinalCV.tsx
│   ├── SkillsPanel.tsx
│   ├── Footer.tsx
│   └── games/
│       ├── [UnArchivoPorCadaJuego].tsx
│       └── index.ts         # Registry de juegos
public/
└── screenshots/             # Capturas de cada juego
```

---

## 🎨 PALETA DE COLORES 8-BIT

- Background: #0d0d1a (azul muy oscuro)
- Foreground: #e8e8f0 (blanco grisáceo)
- Primary/Accent: #3aff3a (verde neón)
- Secundarios: #ffd700 (dorado), #3aafff (cyan), #ff4444 (rojo), #ff44ff (magenta)
- Card: #1a1a2e (azul oscuro)
- Border: 3px sólido, sin border-radius

---

## ⚠️ REGLAS IMPORTANTES

1. **NO uses archivos de audio externos** — todo el sonido debe generarse con Web Audio API
2. **NO uses border-radius** — todos los bordes deben ser cuadrados (8-bit style)
3. **NO uses clases dinámicas de Tailwind** como `bg-${color}-500` — usa mapas estáticos porque Tailwind las purge en build
4. **Cada campo del CV debe ser bilingüe** con tipo `{ es: string; en: string }`
5. **Las animaciones de Framer Motion NO aceptan `ease: 'steps(N)'`** — usa `ease: 'easeOut'` en su lugar
6. **NO uses AnimatePresence mode="wait"** para transiciones de pantalla — causa bugs de renderizado. Usa div con key en su lugar.
7. **El store de Zustand con persist debe tener un merge function** que preserve el estado transitorio (screen, currentLevelId)
8. **Cada mini-juego debe tener mecánicas ÚNICAS** — no repitas el mismo juego con diferente skin
9. **Los textos en español deben tener acentos correctos** (á, é, í, ó, ú, ñ)
10. **El footer debe ser sticky** al bottom del viewport

---

## 🔄 FLUJO DEL JUEGO

1. Usuario abre la página → ve pantalla de selección de idioma con música de fondo
2. Selecciona idioma → opcionalmente activa Modo Desbloqueado → click Continuar
3. Pantalla de boot con animación de terminal (~4 segundos) → click INICIAR MISIÓN
4. Mapa de carrera con los 8 niveles en timeline
5. Click en un nivel → briefing del juego → click COMENZAR DESAFÍO
6. Juega el mini-juego → pantalla de resultados con estrellas y skills desbloqueadas
7. Vuelve al mapa → el siguiente nivel está desbloqueado
8. Puede ir a la Guía para leer instrucciones de cualquier nivel
9. Puede ir al CV para ver el currículum (secciones bloqueadas hasta completar niveles)
10. Al completar todos los niveles → mensaje de "Misión Completada"

---

## 📊 EJEMPLOS DE MECÁNICAS POR JUEGO

Aquí hay ejemplos de mecánicas que puedes usar como inspiración (adapta a tu propio CV):

1. **Soporte L1**: Tickets caen en columnas, clickealos antes de que lleguen al SLA
2. **Soporte L2**: Grid de servidores que cambian de color (OK→WARN→CRIT), clickealos para reparar
3. **Multi-panel**: Tareas que debes asignar al panel de control correcto
4. **Gerente/TSM**: Tickets que debes asignar al especialista correcto
5. **DevOps**: Construye un pipeline colocando herramientas en etapas correctas
6. **Backend Dev**: Revisa código y encuentra bugs en líneas específicas
7. **Migración**: Mueve cuentas entre servidores sin sobrecargar el sistema
8. **Prompt Engineer**: Construye prompts seleccionando componentes correctos

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de considerar el proyecto terminado, verifica:

- [ ] La pantalla de selección de idioma funciona en español e inglés
- [ ] La música de fondo suena en el menú y se puede silenciar
- [ ] Los 8 mini-juegos cargan sin errores de runtime
- [ ] Cada juego tiene su propio efecto de sonido distintivo
- [ ] El progreso se guarda en localStorage al recargar
- [ ] El Modo Desbloqueado permite jugar cualquier nivel
- [ ] La sección de Guía muestra instrucciones para cada nivel
- [ ] El CV interactivo tiene las 4 pestañas funcionando
- [ ] Los textos no tienen errores de ortografía en ningún idioma
- [ ] El footer es sticky en pantallas cortas y largas
- [ ] El diseño es responsive (móvil y desktop)
- [ ] No hay errores en la consola del navegador
- [ ] El lint pasa sin errores

---

Empieza por crear la estructura de datos (cv-data.ts) con toda la información de mi CV de forma bilingüe, luego el sistema de i18n, luego el store de Zustand, y finalmente construye los componentes pantalla por pantalla. Para los mini-juegos, crea primero el GameFrame (wrapper común) y luego cada juego individualmente.
```

---

## 💡 Consejos para Usar Esta Plantilla

1. **Reemplaza TODO el contenido entre `[CORCHETES]`** con tu información real del CV
2. **Adapta las mecánicas de juego** a tus roles reales — si fuiste diseñador, crea juegos de diseño; si fuiste QA, crea juegos de testing
3. **No incluyas más de 8-10 niveles** — más que eso hace el juego muy largo
4. **Asegúrate de que cada juego sea único** — la variedad es lo que hace el proyecto memorable
5. **Prueba en ambos idiomas** — los errores de traducción son fáciles de cometer
6. **Toma capturas de pantalla reales** del gameplay para la sección de documentación
7. **Si tu CV tiene roles muy diferentes** (ej: diseño + programación), asegúrate de que los juegos reflejen esa variedad

---

## 🔗 Ejemplo de Proyecto Completo

Puedes ver el proyecto completo y funcional que inspiró esta plantilla en:
**https://github.com/shelouis/shelouis.github.io**

---

> *Esta plantilla está diseñada para que cualquier profesional pueda crear su propio CV interactivo tipo videojuego. ¡Diviértete creando el tuyo!*
