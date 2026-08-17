# RASTRO — Roadmap de Implementación

## Fase 0: Reconocimiento y Auditoría [DONE]
- [x] Auditoría de proyectos en el scratch (`origin`, `planet-club`, `umbral`, `mi-mandato`, etc.)
- [x] Generación de `RASTRO_PROJECT_MAP.md` y documentos de arquitectura
- [x] Definición del modelo de datos y corpus inicial de 20 evidencias

## Fase 1: Arquitectura & Setup Base [IN PROGRESS]
- [ ] Inicialización del proyecto Next.js 16 + React 19 + Tailwind v4 + TypeScript en `./`
- [ ] Configuración de Zustand Store para la FSM de ronda
- [ ] Implementación de validadores Zod para evidencias y respuestas

## Fase 2: Motor de Evidencias & Corpus Canónico
- [ ] Dataset tipado y validado con las 20 evidencias maestras completas con metadatos del AGN/LoC/Europeana
- [ ] Pipeline de validación de 11 puntos

## Fase 3: Visor Deep Zoom & Reloj de Arena Físico
- [ ] Visor de imagen de alta fidelidad con zoom, pan y coordenadas relativas
- [ ] Reloj de arena procedural en Canvas con partículas y estados de tensión

## Fase 4: Bucle de Investigación & Formulación de Hipótesis
- [ ] Inspección de pistas visuales con consumo dinámico de tiempo
- [ ] Libreta de notas de investigación
- [ ] Selector analógico de año, mapa de coordenadas y buscador de acontecimientos

## Fase 5: Motor de Puntuación & Rival Simulado (Vertical Slice 1v1)
- [ ] Algoritmo de puntuación determinista multidimensional
- [ ] IA de rival simulado con perfiles tácticos (Francotirador, Detective, Temerario)
- [ ] Pantalla post-ronda con desglose interactivo de pistas del AGN y comparativa 1v1

## Fase 6: Supabase Realtime & Matchmaking 1v1 Online
- [ ] Migraciones SQL y RLS en Postgres
- [ ] Conexión por Broadcast y Presence de Supabase
- [ ] Sincronización autoritativa y sellado de hipótesis

## Fase 7: Backoffice & Content Studio
- [ ] Panel de curaduría para revisión editorial y aprobación a `READY_FOR_COMPETITIVE`

## Fase 8: Testing & Polish
- [ ] Tests con Vitest (fórmulas de puntuación, validación de schemas, estados)
- [ ] Tests e2e con Playwright
- [ ] Optimización de assets WebP/AVIF y despliegue
