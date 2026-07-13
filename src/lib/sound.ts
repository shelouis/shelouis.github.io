'use client';

// ────────────────────────────────────────────────────────────────────────────
// Chiptune Sound Engine — 8-bit retro sound effects + background music
// Uses Web Audio API to generate all sounds programmatically (no audio files)
// ────────────────────────────────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let muted = false;
let musicInterval: ReturnType<typeof setInterval> | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(audioCtx.destination);
    } catch {
      return null;
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Initialize audio context on first user interaction (required by browsers) */
export function initAudio() {
  getCtx();
}

export function setMuted(m: boolean) {
  muted = m;
  if (m) stopMusic();
}

export function isMuted() {
  return muted;
}

// Play a single note with given parameters
function playNote(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15,
  delay = 0,
) {
  const ctx = getCtx();
  if (!ctx || !masterGain || muted) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const now = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

// ── Sound effects per game (each game has a unique sound) ───────────────────
export const sfx = {
  // Level 1 — Ticket Triage: quick blip (ticket resolved)
  ticketHit: () => {
    playNote(880, 0.06, 'square', 0.12);
    setTimeout(() => playNote(1320, 0.05, 'square', 0.1), 50);
  },
  // Level 2 — Server Monitor: ascending repair sound
  serverRepair: () => {
    playNote(440, 0.04, 'square', 0.12);
    setTimeout(() => playNote(660, 0.04, 'square', 0.12), 40);
    setTimeout(() => playNote(880, 0.08, 'square', 0.12), 80);
  },
  // Level 3 — Multi-Panel: correct chord (C-E-G)
  panelCorrect: () => {
    playNote(523, 0.08, 'square', 0.1);
    setTimeout(() => playNote(659, 0.08, 'square', 0.1), 40);
    setTimeout(() => playNote(784, 0.12, 'square', 0.1), 80);
  },
  // Level 4 — Team Router: assign sound
  ticketAssign: () => {
    playNote(659, 0.05, 'square', 0.1);
    setTimeout(() => playNote(880, 0.1, 'square', 0.1), 40);
  },
  // Level 5 — Pipeline Builder: tool place click
  toolPlace: () => {
    playNote(330, 0.03, 'sawtooth', 0.1);
    setTimeout(() => playNote(550, 0.07, 'square', 0.12), 30);
  },
  // Level 6 — Bug Hunter: bug found jingle
  bugFound: () => {
    playNote(784, 0.05, 'square', 0.12);
    setTimeout(() => playNote(988, 0.05, 'square', 0.12), 40);
    setTimeout(() => playNote(1319, 0.12, 'square', 0.12), 80);
  },
  // Level 7 — Migration: account migrated swoosh
  accountMigrated: () => {
    playNote(440, 0.04, 'triangle', 0.12);
    setTimeout(() => playNote(550, 0.04, 'triangle', 0.12), 30);
    setTimeout(() => playNote(660, 0.08, 'triangle', 0.12), 60);
  },
  // Level 8 — Prompt Architect: validate success fanfare
  promptValid: () => {
    playNote(523, 0.06, 'square', 0.1);
    setTimeout(() => playNote(659, 0.06, 'square', 0.1), 50);
    setTimeout(() => playNote(784, 0.06, 'square', 0.1), 100);
    setTimeout(() => playNote(1047, 0.15, 'square', 0.12), 150);
  },
  // Wrong / error action
  error: () => {
    playNote(200, 0.08, 'sawtooth', 0.1);
    setTimeout(() => playNote(150, 0.12, 'sawtooth', 0.1), 60);
  },
  // Level complete fanfare
  levelComplete: () => {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((n, i) => setTimeout(() => playNote(n, 0.12, 'square', 0.12), i * 80));
  },
  // Star earned
  star: () => {
    playNote(1319, 0.08, 'square', 0.1);
    setTimeout(() => playNote(1568, 0.12, 'square', 0.1), 60);
  },
  // UI click (button press)
  click: () => {
    playNote(800, 0.02, 'square', 0.08);
  },
  // UI hover
  hover: () => {
    playNote(600, 0.015, 'square', 0.04);
  },
  // Game start
  gameStart: () => {
    playNote(440, 0.05, 'square', 0.1);
    setTimeout(() => playNote(660, 0.05, 'square', 0.1), 40);
    setTimeout(() => playNote(880, 0.1, 'square', 0.1), 80);
  },
};

// ── Background music — simple chiptune loop for the menu ─────────────────────
// A cheerful, looping 8-bit melody (C major scale based)
const MELODY: { freq: number; beats: number }[] = [
  { freq: 523, beats: 0.5 }, // C5
  { freq: 659, beats: 0.5 }, // E5
  { freq: 784, beats: 0.5 }, // G5
  { freq: 659, beats: 0.5 }, // E5
  { freq: 523, beats: 0.5 }, // C5
  { freq: 587, beats: 0.5 }, // D5
  { freq: 659, beats: 1.0 }, // E5
  { freq: 0, beats: 0.5 }, // rest
  { freq: 587, beats: 0.5 }, // D5
  { freq: 659, beats: 0.5 }, // E5
  { freq: 784, beats: 0.5 }, // G5
  { freq: 880, beats: 0.5 }, // A5
  { freq: 784, beats: 1.0 }, // G5
  { freq: 0, beats: 0.5 }, // rest
  { freq: 659, beats: 0.5 }, // E5
  { freq: 784, beats: 0.5 }, // G5
  { freq: 880, beats: 0.5 }, // A5
  { freq: 988, beats: 0.5 }, // B5
  { freq: 1047, beats: 1.0 }, // C6
  { freq: 0, beats: 0.5 }, // rest
  { freq: 784, beats: 0.5 }, // G5
  { freq: 659, beats: 0.5 }, // E5
  { freq: 523, beats: 1.0 }, // C5
  { freq: 0, beats: 0.5 }, // rest
];

const BASS: { freq: number; beats: number }[] = [
  { freq: 131, beats: 2.0 }, // C3
  { freq: 147, beats: 2.0 }, // D3
  { freq: 165, beats: 2.0 }, // E3
  { freq: 196, beats: 2.0 }, // G3
];

const TEMPO = 180; // ms per beat (quarter note)
let melodyIdx = 0;
let bassIdx = 0;
let beatCounter = 0;

export function startMusic() {
  const ctx = getCtx();
  if (!ctx || muted || musicInterval) return;

  melodyIdx = 0;
  bassIdx = 0;
  beatCounter = 0;

  const tick = () => {
    if (muted) return;

    // Melody (plays every half beat)
    const note = MELODY[melodyIdx % MELODY.length];
    if (note.freq > 0) {
      playNote(note.freq, (note.beats * TEMPO) / 1000 * 0.85, 'square', 0.05);
    }
    melodyIdx++;

    // Bass (plays every 2 beats)
    if (beatCounter % 4 === 0) {
      const bassNote = BASS[bassIdx % BASS.length];
      if (bassNote.freq > 0) {
        playNote(bassNote.freq, (bassNote.beats * TEMPO) / 1000 * 0.85, 'triangle', 0.07);
      }
      bassIdx++;
    }
    beatCounter++;
  };

  tick();
  musicInterval = setInterval(tick, TEMPO / 2);
}

export function stopMusic() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

export function isMusicPlaying() {
  return musicInterval !== null;
}
