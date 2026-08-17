# RASTRO — Project Map & Scratch Audit

## 1. Proyectos Revisados en el Scratch

| Proyecto | Stack | Componentes Reutilizables | Descartados / Riesgos |
| :--- | :--- | :--- | :--- |
| **`origin` (`el-origen`)** | Next 16 + React 19 + TypeScript | Modelo de datos de inspección (`inspection.ts`, `clues`, `notebook`), libreta de deducciones, sistema de audio posicional. | Descartado el motor de narrativa no lineal pura; se extrae únicamente la lógica de inspección de evidencias. |
| **`planet-club` (`sendero`)** | Next 16 + React 19 + Tailwind v4 + Supabase + Zustand | Arquitectura de Supabase (RLS estricto, RPCs, gestión de perfiles, eventos reactivos), componentes base de UI accesibles. | Descartadas las 50 migraciones específicas de hábitos/comunidad. Se crea un esquema limpio de PostgreSQL enfocado en rondas y evidencias. |
| **`umbral`** | Next 16 + React 19 + Supabase + Zod + Vitest + Playwright + i18n | Validadores con Zod, pipeline de testing unitario y e2e, estructura desacoplada de traducciones (`es`/`en`). | Descartada la lógica experimental de possibility-engine; se adopta el esquema de validación y test runners. |
| **`mi-mandato`** | Vite + React 19 + Tailwind v4 + Zustand + Framer Motion | Máquina de estados de partida con Zustand, componentes de diseño sobrio, detector de patrones y archivo de eventos. | Se extrae la estructura de Zustand store y la jerarquía de UI limpia sin distractores. |
| **`mandibula`** | Scripts Node + PHP API | Scripts de control de calidad factual (`qa_test.js`) y deduplicación de corpus. | Descartado el backend en PHP; se implementa la validación en TypeScript y Zod. |
| **`ruptura` / `ruptura-clips`** | Next + Canvas/CSS + TTS | Renderizado de shaders, transiciones de alta tensión y audio ambiental. | Descartado el generador TTS; se reutiliza la estética de tensión visual y renderizado de partículas. |

## 2. Stack Tecnológico de RASTRO

* **Framework Base**: Next.js 16 (App Router) + React 19 + TypeScript.
* **Estilizado & Diseño**: Tailwind CSS v4 + Framer Motion (para transiciones de tensión y feedback físico) + Vanilla CSS para el renderizado del lienzo de evidencia y reloj de arena.
* **Gestor de Estado de Ronda**: Zustand (FSM determinista y reactiva).
* **Validación Factual & Schemas**: Zod (100% tipado y validado en runtime).
* **Backend & Multiplayer**: Supabase (PostgreSQL 16, Row Level Security, RPCs autoritativas, Realtime Presence & Broadcast).
* **Deep Zoom Engine**: OpenSeadragon / Canvas nativo optimizado con pan/pinch/zoom acelerado por GPU y soporte de coordenadas normalizadas (0..1).
* **Testing & QA**: Vitest + Playwright.

## 3. Riesgos Arquitectónicos & Mitigaciones

1. **Exposición de respuestas en el frontend**:
   * *Mitigación*: Las respuestas canónicas (`canonical_date`, `canonical_location`, `canonical_event`) **nunca** viajan al cliente antes de que la ronda se resuelva en el servidor. El cliente solo recibe un token de evidencia, la URL de la imagen (ofuscada) y las zonas de pistas visuales sin la deducción hasta que se pagan.
2. **Latencia en partidas 1v1**:
   * *Mitigación*: Timestamps autoritativos sincronizados por el backend. El sellado de hipótesis se registra con timestamp de servidor, evitando ventajas por bajo ping.
3. **Contenido histórico ambiguo**:
   * *Mitigación*: Pipeline con estado `READY_FOR_COMPETITIVE` bloqueado por el checklist factual de 11 puntos.
