# RASTRO — Diseño de Gameplay & Mecánicas

## 1. El Bucle Central (The Investigation Loop)

```
       ┌────────────────────────┐
       │   Evidencia Oculta     │
       └───────────┬────────────┘
                   │ Inicio de Ronda (90s)
                   ▼
       ┌────────────────────────┐
       │ Observación Inicial    │◄────────────────────────┐
       │ (Deep Zoom & Pan)      │                         │
       └───────────┬────────────┘                         │
                   │                                      │
        ┌──────────┴──────────┐                           │
        ▼                     ▼                           │
  [Intuición Rápida]   [Duda Metódica]                    │
        │                     │                           │
        │                     ├─► Inspeccionar Pista      │
        │                     │   (Consume 6-10s y arena) ├┘
        │                     │
        ▼                     ▼
  ┌───────────────────────────────┐
  │ Formulación de Hipótesis      │
  │ (Año / Ubicación / Evento)    │
  └───────────────┬───────────────┘
                  │ Sellar Veredicto
                  ▼
  ┌───────────────────────────────┐
  │ Resolución & Comparativa 1v1  │
  └───────────────────────────────┘
```

## 2. Herramientas del Investigador
* **Lupa de Archivo (Deep Zoom)**: Zoom fluido de 1x a 8x, paneo libre con mouse/touch. Gratis en tiempo.
* **Inspección de Zonas de Evidencia**: El jugador toca una zona sospechosa. Consume entre 6 y 10 segundos del reloj de arena para desplegar la pista y deducción.
* **Libreta de Deducción**: Registra las pistas descubiertas y permite anotar hipótesis previas.
* **Selector de Hipótesis**: Dial temporal analógico/numérico, mapa cartográfico de coordenadas y buscador canónico de acontecimientos.

## 3. Psicología 1v1 & El "Sello de Veredicto"
Cuando el rival envía su respuesta, se activa una notificación visual de impacto: **"EL RIVAL HA SELLADO SU HIPÓTESIS"**.
Esto genera un dilema estratégico:
* *¿Arriesgarse ahora para no perder multiplicador de velocidad?*
* *¿O seguir analizando para asegurar la precisión exacta a costa de los puntos de tiempo?*
