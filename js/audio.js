/**
 * Reading Adventure - Audio System
 * Web Audio API generated sounds (no external files needed).
 */

let audioCtx = null;
let muted = false;

/** Initialize audio context (requires user interaction) */
function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/** Set mute state */
export function setMuted(value) {
  muted = value;
}

export function isMuted() {
  return muted;
}

/** Play a tone with given frequency and duration */
function playTone(freq, duration, type = 'sine', volume = 0.3, ramp = true) {
  if (muted) return;
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    if (ramp) {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available — silently ignore
  }
}

/** Correct answer — cheerful ascending chime */
export function playCorrect() {
  playTone(523, 0.15, 'sine', 0.25);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.25), 80);
  setTimeout(() => playTone(784, 0.2, 'sine', 0.25), 160);
}

/** Incorrect answer — gentle low tone (not harsh) */
export function playIncorrect() {
  playTone(330, 0.3, 'triangle', 0.2);
}

/** Coin reward sound */
export function playCoin() {
  playTone(880, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(1100, 0.15, 'sine', 0.2), 60);
}

/** Rank up fanfare */
export function playRankUp() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, 'sine', 0.3), i * 120);
  });
}

/** Button click */
export function playClick() {
  playTone(600, 0.05, 'sine', 0.15, false);
}

/** Level complete */
export function playLevelComplete() {
  const notes = [523, 587, 659, 784, 880];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.25), i * 100);
  });
}

/** Achievement unlock */
export function playAchievement() {
  playTone(784, 0.15, 'sine', 0.25);
  setTimeout(() => playTone(988, 0.15, 'sine', 0.25), 100);
  setTimeout(() => playTone(1175, 0.25, 'sine', 0.25), 200);
}

/** Hint purchased */
export function playHint() {
  playTone(440, 0.1, 'triangle', 0.2);
}

/** Resume audio context after user gesture */
export function resumeAudio() {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}
