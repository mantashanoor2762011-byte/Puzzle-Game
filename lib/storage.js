// =============================================================
// lib/storage.js
// Saves progress in the browser (localStorage) so it is still
// there after closing the tab.
// =============================================================
import { TOTAL_PUZZLES } from "./themes";

const STORE_KEY = "my5puzzle-progress-v1";

// Progress when nothing is solved yet
export function freshProgress() {
  return {
    unlocked: 1, // how many puzzles are open (1..5)
    records: Array.from({ length: TOTAL_PUZZLES }, () => ({
      solved: false,
      bestMoves: 0,
      bestTime: 0,
    })),
  };
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return freshProgress();
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.records) || data.records.length !== TOTAL_PUZZLES) {
      return freshProgress();
    }
    return {
      unlocked: Math.min(TOTAL_PUZZLES, Math.max(1, data.unlocked | 0)),
      records: data.records.map((r) => ({
        solved: Boolean(r && r.solved),
        bestMoves: (r && r.bestMoves) | 0,
        bestTime: (r && r.bestTime) | 0,
      })),
    };
  } catch {
    return freshProgress(); // storage blocked: play without saving
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(progress));
  } catch {
    // ignore: the game still works, it just won't remember progress
  }
}
