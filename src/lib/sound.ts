// Sound Effects Generator usando Web Audio API nativo (cero dependencias externas)
// Diseñado para generar tensión psicológica con latidos cardíacos realistas
class SoundFX {
  private ctx: AudioContext | null = null;
  private lastHeartbeatTime = 0;
  private heartbeatIntervalId: ReturnType<typeof setTimeout> | null = null;
  private isUnlocked = false;

  public unlockAudio() {
    try {
      if (typeof window === 'undefined') return;
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isUnlocked = true;
        });
      } else if (this.ctx && this.ctx.state === 'running') {
        this.isUnlocked = true;
      }
    } catch (_) {}
  }

  private init() {
    this.unlockAudio();
  }

  // Sonido de clic sutil de lupa/inspección
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  /**
   * LATIDO CARDÍACO HUMANO REALISTA (lub-dub)
   *
   * Un corazón humano produce dos sonidos por ciclo:
   *   S1 ("lub") — cierre de válvulas mitral/tricúspide, ~20-150Hz, ~0.15s
   *   S2 ("dub") — cierre de válvulas aórtica/pulmonar, ~50-200Hz, ~0.12s, ~0.1s después del S1
   *
   * Para generar nerviosismo usamos:
   *   - Sub-bajos profundos (40-80Hz) que se sienten en el pecho
   *   - Un "golpe" percusivo con ruido filtrado para dar cuerpo orgánico
   *   - Volumen alto y envolventes rápidas (ataque <5ms, decaimiento ~100ms)
   *   - Aceleración del BPM conforme baja el tiempo (60→160 BPM)
   */
  playHeartbeat(intensity: 'medium' | 'high' | 'critical') {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Rate limit: evitar superposición
      const minInterval = intensity === 'critical' ? 0.35 : intensity === 'high' ? 0.55 : 0.85;
      if (now - this.lastHeartbeatTime < minInterval) return;
      this.lastHeartbeatTime = now;

      // Volumen según intensidad — alto para que se escuche
      const masterVol = intensity === 'critical' ? 0.65 : intensity === 'high' ? 0.50 : 0.35;

      // === S1: "LUB" — golpe grave, profundo, visceral ===
      this._playHeartSound(now, {
        freq: 55,         // Frecuencia sub-grave (como un golpe de pecho)
        freqEnd: 30,      // Decae a sub-bajo
        duration: 0.14,
        volume: masterVol,
        type: 'sine',
      });

      // Capa percusiva del S1 (ruido filtrado para dar textura orgánica)
      this._playPercBody(now, masterVol * 0.5, 0.08);

      // Armónico medio del S1 (da "cuerpo" audible en parlantes chicos)
      this._playHeartSound(now, {
        freq: 110,
        freqEnd: 60,
        duration: 0.10,
        volume: masterVol * 0.4,
        type: 'triangle',
      });

      // === S2: "DUB" — 0.12s después, más corto, un poco más agudo ===
      const dubDelay = 0.12;
      this._playHeartSound(now + dubDelay, {
        freq: 70,
        freqEnd: 35,
        duration: 0.11,
        volume: masterVol * 0.85,
        type: 'sine',
      });

      // Capa percusiva del S2
      this._playPercBody(now + dubDelay, masterVol * 0.35, 0.06);

      // Armónico del S2
      this._playHeartSound(now + dubDelay, {
        freq: 130,
        freqEnd: 70,
        duration: 0.08,
        volume: masterVol * 0.3,
        type: 'triangle',
      });

    } catch (_) {}
  }

  /** Genera un tono con envolvente de golpe cardíaco */
  private _playHeartSound(
    startTime: number,
    opts: {
      freq: number;
      freqEnd: number;
      duration: number;
      volume: number;
      type: OscillatorType;
    }
  ) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = opts.type;
    osc.frequency.setValueAtTime(opts.freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(opts.freqEnd, 20),
      startTime + opts.duration
    );

    // Envolvente percusiva: ataque instantáneo → decaimiento exponencial
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(opts.volume, startTime + 0.003); // Ataque: 3ms
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + opts.duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + opts.duration + 0.01);
  }

  /**
   * Genera un "golpe percusivo" con ruido filtrado paso-bajo
   * Esto da la sensación orgánica del latido (como un thud en el pecho)
   */
  private _playPercBody(startTime: number, volume: number, duration: number) {
    if (!this.ctx) return;

    // Generar buffer de ruido blanco corto
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    // Filtro paso-bajo para convertir ruido en un golpe sordo
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, startTime);
    filter.frequency.exponentialRampToValueAtTime(60, startTime + duration);
    filter.Q.setValueAtTime(1.5, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(startTime);
    source.stop(startTime + duration + 0.01);
  }

  // Tick de urgencia rápida cuando queda poco tiempo (últimos 8 segundos)
  playUrgentTick() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.02);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // Sonido de ayuda activada (Lifeline 50:50 o Década)
  playLifeline() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [350, 440, 587.33, 880].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.18, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.3);
      });
    } catch (_) {}
  }

  // Sonido de pista revelada
  playClueReveal() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch (_) {}
  }

  // Sonido de sello de veredicto (contundente, final)
  playStamp() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Golpe grave profundo
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);

      // Chasquido de confirmación
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(600, now);
      osc2.frequency.exponentialRampToValueAtTime(200, now + 0.03);
      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.05);
    } catch (_) {}
  }

  // Sonido de victoria (fanfarria ascendente)
  playVictory() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.25, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.6);
      });
    } catch (_) {}
  }

  // Sonido de derrota (descendente melancólico)
  playDefeat() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [440, 370, 311, 220].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0.2, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.4);
      });
    } catch (_) {}
  }

  // Countdown beep (3, 2, 1)
  playCountdown() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (_) {}
  }

  // Countdown GO — ¡YA! (agudo y excitante)
  playCountdownGo() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (_) {}
  }

  // Alerta de "rival selló su respuesta" (presión psicológica)
  playRivalLocked() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Dos tonos descendentes cortos (como un "boop-boop" de alerta)
      [880, 660].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.12, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.15);
      });
    } catch (_) {}
  }

  /** Detiene cualquier loop de heartbeat programado */
  stopHeartbeat() {
    if (this.heartbeatIntervalId) {
      clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = null;
    }
  }
}

export const soundFx = new SoundFX();
