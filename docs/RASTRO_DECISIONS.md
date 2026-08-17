# RASTRO — Registro de Decisiones de Arquitectura (ADR)

## ADR-001: Selección de Framework y UI
* **Decisión**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion.
* **Motivo**: Consistencia con el ecosistema de scratch (`sendero`, `origin`, `umbral`), soporte SSR para SEO de archivos públicos, y renderizado veloz del App Router.

## ADR-002: Autoridad Absoluta en el Servidor para Puntajes y Respuestas
* **Decisión**: La respuesta canónica nunca se expone en el bundle del cliente antes del veredicto. La evaluación se realiza en PostgreSQL mediante RPCs.
* **Motivo**: Prevenir cualquier inspección casual de DevTools o scripts de lectura de memoria en el navegador.

## ADR-003: Renderizado Procedural del Reloj de Arena
* **Decisión**: Utilizar un Canvas 2D nativo de 60fps con simulación de partículas de arena y física de gravedad para el reloj de arena.
* **Motivo**: Garantizar sensación táctil y de peso físico del tiempo, reaccionando a las penalizaciones de tiempo al instante.

## ADR-004: Modelo Híbrido 1v1 (Simulado + Supabase Realtime)
* **Decisión**: Construir un sistema desacoplado con un motor de Rival Simulado de alta fidelidad para el Vertical Slice y entrenamiento instantáneo, conmutando a Supabase Realtime Presence/Broadcast cuando se emparejan 2 jugadores reales.
* **Motivo**: Permite validar inmediatamente la experiencia jugable de 1 ronda completa de forma autónoma sin depender de servidores externos activos en local.

## ADR-005: Corpus Inicial Curado de 20 Evidencias Canónicas
* **Decisión**: Priorizar 20 evidencias de nivel indiscutible documentadas en archivos públicos (AGN, LoC, Europeana, Sodre, BNMM).
* **Motivo**: Evitar la trampa del contenido basura y garantizar que cada ronda sea memorable.
