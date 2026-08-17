# RASTRO — Motor de Investigación Histórica Competitiva 1v1

> **"La historia no es una trivia. Es la evidencia."**

RASTRO es un videojuego web histórico competitivo 1 vs 1 donde dos jugadores reciben simultáneamente la misma evidencia documental o fotográfica histórica real de alta resolución proveniente de archivos públicos (Archivo General de la Nación de Argentina, Library of Congress, Europeana, Sodre).

---

## 🏛️ Características Principales

* **Evidencias Canónicas Reales**: Fotografías de archivo documentadas y catalogadas con trazabilidad institucional completa.
* **Deep Zoom & Pan**: Visor interactivo de alta resolución con inspección de detalles de arquitectura, vestimenta, vehículos y cartelería histórica.
* **Reloj de Arena Físico Reactivo**: Renderizado procedural en Canvas a 60fps con simulación de arena y aceleración visual según el consumo de pistas.
* **Tensión Competitiva 1v1**: Notificaciones en vivo del estado del rival (*"EL RIVAL HA SELLADO SU HIPÓTESIS"*).
* **Puntuación Multidimensional Explicable**: Cálculo matemático con distancia ortodrómica (Haversine), decaimiento exponencial temporal y multiplicador de velocidad.
* **Archivo Post-Ronda**: Desglose interactivo de pistas visuales, contexto histórico curado y comparativa táctica 1v1.
* **Content Studio / Backoffice**: Panel de auditoría con checklist factual de 11 puntos antes de autorizar evidencias a `READY_FOR_COMPETITIVE`.

---

## 🛠️ Stack Tecnológico

* **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
* **Estilizado & Animaciones**: Tailwind CSS v4 + Framer Motion
* **Estado de Juego**: Zustand (FSM determinista de ciclo de vida de ronda)
* **Validación Factual**: Zod
* **Multiplayer / DB**: Supabase (PostgreSQL 16 + Realtime Presence & Broadcast)
* **Testing**: Vitest

---

## 🚀 Instalación y Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar servidor de desarrollo
npm run dev

# 3. Correr suite de tests
npm test

# 4. Compilar para producción
npm run build
```

---

## 📜 Licencia & Derechos
Desarrollado por Lucas Correa (`lukson.arts`).
El material fotográfico histórico pertenece al dominio público o fondos de acceso abierto institucional (AGN, LoC, Europeana).
