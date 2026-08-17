# RASTRO — Arquitectura del Sistema

## 1. Visión General de la Arquitectura

RASTRO está estructurado bajo un modelo cliente-servidor autoritativo y desacoplado, diseñado para máxima seguridad contra trampas y rendimiento de milisegundos en partidas competitivas.

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENTE (Browser)                     │
│  ┌────────────────────┐ ┌────────────────────────────────┐  │
│  │ Deep Zoom Engine   │ │ Sandglass Particle Engine      │  │
│  │ (Canvas/WebGL/SVG) │ │ (Canvas 60fps)                 │  │
│  └────────────────────┘ └────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Zustand Game Store (FSM de Ronda)                     │  │
│  │ [WAITING -> ROUND_START -> INVESTIGATING -> POST_ROUND]│  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────▲──────────────────────────────┘
                               │ Realtime Broadcast (Eventos opacos)
                               │ RPC autoritativo (Submissions)
┌──────────────────────────────▼──────────────────────────────┐
│                    SUPABASE / POSTGRES 16                   │
│  ┌──────────────────┐ ┌──────────────────┐ ┌─────────────┐  │
│  │ Realtime Presence│ │ Postgres RPCs    │ │ RLS Engine  │  │
│  │ (Matchmaking 1v1)│ │ (submit_verdict) │ │ (Guards)    │  │
│  └──────────────────┘ └──────────────────┘ └─────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Tablas Canónicas:                                     │  │
│  │ - evidences (READY_FOR_COMPETITIVE)                   │  │
│  │ - rooms / round_sessions                              │  │
│  │ - player_submissions (evaluadas en server)            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 2. Máquina de Estados de Partida (FSM)

El cliente y el servidor comparten una máquina de estados explícita:

1. **`IDLE`**: Menú principal y visualización de perfil.
2. **`MATCHMAKING`**: Buscando rival o emparejando contra bot simulado en modo entrenamiento.
3. **`MATCH_FOUND`**: Sala creada, intercambio de handshake, preparación de evidencia.
4. **`ROUND_START`**: Revelación sincronizada de la evidencia (90s). Se activa el reloj de arena.
5. **`INVESTIGATING`**: El jugador observa, hace deep zoom y puede solicitar pistas visuales (consumo de tiempo).
6. **`SUBMITTING`**: El jugador ingresa hipótesis y sella su veredicto. Se envía payload encriptado al servidor.
7. **`ROUND_RESOLVING`**: El servidor valida ambos resultados y calcula distancias temporales, geográficas y penalizaciones.
8. **`POST_ROUND_ARCHIVE`**: Desglose interactivo de la evidencia, explicación de pistas del AGN/LoC y comparativa de táctica 1v1.

## 3. Seguridad de Datos & Modelo Autoritativo
* **Payload Inicial de Ronda**: Contiene solo `evidence_id`, `image_url` (nombre hash), `precision_mode` y el array de zonas `visual_clues` (coordenadas rectangulares vacías, sin texto explicativo).
* **Revelación de Pistas**: Cada pista solicitada envía una llamada RPC que descuenta tiempo en el servidor y retorna el texto y deducción de esa coordenada específica.
* **Cálculo de Puntaje**: La función de PostgreSQL `resolve_round()` calcula las diferencias temporales y de coordenadas geográficas usando fórmulas deterministas. El cliente nunca calcula ni envía su propio puntaje.
