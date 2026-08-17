// Sound Effects Generator usando Web Audio API nativo (cero dependencias externas)
class SoundFX {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sonido de clic sutil de lupa/inspección
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (_) {}
  }

  // Sonido de pista revelada (Campanilla de archivo / deducción)
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

  // Sonido de sello de veredicto (Impacto seco y firme)
  playStamp() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }

  // Sonido de victoria / fanfarria sobria
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
        gain.gain.setValueAtTime(0.2, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.6);
      });
    } catch (_) {}
  }
}

export const soundFx = new SoundFX();
