"use client";
// =============================================================
// components/PuzzleGame.jsx
// The main game component. It remembers everything (which
// screen is open, the board, moves, timer, progress) and passes
// it down to the smaller screen components.
// =============================================================
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_WORLD, TOTAL_PUZZLES } from "@/lib/themes";
import {
  shuffledBoard,
  solvedBoard,
  isSolved,
  isNextToGap,
  pieceForDirection,
  movePiece,
  countInPlace,
} from "@/lib/puzzle";
import { freshProgress, loadProgress, saveProgress } from "@/lib/storage";
import MainMenu from "./MainMenu";
import Instructions from "./Instructions";
import LevelSelect from "./LevelSelect";
import PuzzleScreen from "./PuzzleScreen";
import WinDialog from "./WinDialog";
import FinalScreen from "./FinalScreen";
import ByeScreen from "./ByeScreen";

// Keyboard keys -> slide direction
const KEY_DIRECTIONS = {
  arrowup: "up", w: "up",
  arrowdown: "down", s: "down",
  arrowleft: "left", a: "left",
  arrowright: "right", d: "right",
};

const START_MESSAGE = {
  text: "Tap a piece next to the empty space to begin. The timer starts on your first move.",
  kind: "",
};

export default function PuzzleGame() {
  // ---------- 1. Game state ----------
  const [screen, setScreen] = useState("menu");     // menu | help | select | play | final | bye
  const [progress, setProgress] = useState(freshProgress);
  const [loaded, setLoaded] = useState(false);       // has saved progress been read yet?
  const [level, setLevel] = useState(0);             // current puzzle (0..4)
  const [tiles, setTiles] = useState(solvedBoard);   // the 9 squares, 0 = empty
  const [moves, setMoves] = useState(0);
  const [startAt, setStartAt] = useState(null);      // time of the first move
  const [elapsed, setElapsed] = useState(0);         // seconds shown on the timer
  const [solved, setSolved] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);
  const [message, setMessage] = useState(START_MESSAGE);
  const [win, setWin] = useState(null);              // result shown in the win dialog
  const [nudge, setNudge] = useState({ value: 0, count: 0 }); // shake a piece that can't move
  const finishTimeout = useRef(null);

  // ---------- 2. Load and save progress ----------
  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveProgress(progress);
  }, [progress, loaded]);

  // ---------- 3. Timer (ticks while a puzzle is being played) ----------
  useEffect(() => {
    if (screen !== "play" || startAt === null || solved) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startAt) / 1000));
    }, 250);
    return () => clearInterval(id);
  }, [screen, startAt, solved]);

  // Stop the "show win dialog" timeout if the component goes away
  useEffect(() => () => clearTimeout(finishTimeout.current), []);

  // ---------- 4. Moving between screens ----------
  function goTo(nextScreen) {
    clearTimeout(finishTimeout.current);
    setWin(null);
    setScreen(nextScreen);
    window.scrollTo(0, 0);
  }

  function startPuzzle(newLevel) {
    clearTimeout(finishTimeout.current);
    setLevel(newLevel);
    setTiles(shuffledBoard());
    setMoves(0);
    setStartAt(null);
    setElapsed(0);
    setSolved(false);
    setWin(null);
    setMessage(START_MESSAGE);
    setScreen("play");
    window.scrollTo(0, 0);
  }

  function restartPuzzle() {
    startPuzzle(level);
    setMessage({ text: "New shuffle. Moves and timer are back to zero.", kind: "" });
  }

  function restartWholeGame() {
    setProgress(freshProgress());
    startPuzzle(0);
  }

  // ---------- 5. Moving a piece ----------
  function tryMove(index) {
    if (screen !== "play" || solved || win || index < 0) return;

    if (!isNextToGap(tiles, index)) {
      setNudge((n) => ({ value: tiles[index], count: n.count + 1 }));
      setMessage({ text: "Only a piece next to the empty space can move.", kind: "warn" });
      return;
    }

    const nextTiles = movePiece(tiles, index);
    const nextMoves = moves + 1;
    const firstMoveAt = startAt ?? Date.now();   // start the timer on the first move
    if (startAt === null) setStartAt(firstMoveAt);
    setTiles(nextTiles);
    setMoves(nextMoves);

    // Automatic win check after every move
    if (isSolved(nextTiles)) {
      finishPuzzle(nextMoves, Math.floor((Date.now() - firstMoveAt) / 1000));
    } else {
      const inPlace = countInPlace(nextTiles);
      setMessage({
        text: `${inPlace} of 8 pieces in the right place.`,
        kind: inPlace >= 6 ? "good" : "",
      });
    }
  }

  function moveDirection(direction) {
    if (screen !== "play" || solved || win) return;
    const index = pieceForDirection(tiles, direction);
    if (index < 0) {
      setMessage({ text: "No piece can slide that way. Try another direction.", kind: "warn" });
      return;
    }
    tryMove(index);
  }

  // ---------- 6. Puzzle finished ----------
  function finishPuzzle(finalMoves, finalTime) {
    setSolved(true);
    setElapsed(finalTime);
    setMessage({ text: "Solved! The picture is complete.", kind: "good" });

    const finishedLevel = level;
    const newlyUnlocked =
      finishedLevel + 1 < TOTAL_PUZZLES && progress.unlocked < finishedLevel + 2;

    // Save the best result and unlock the next puzzle
    setProgress((prev) => {
      const records = prev.records.map((r, i) => {
        if (i !== finishedLevel) return r;
        return {
          solved: true,
          bestMoves: r.solved ? Math.min(r.bestMoves, finalMoves) : finalMoves,
          bestTime: r.solved ? Math.min(r.bestTime, finalTime) : finalTime,
        };
      });
      let unlocked = prev.unlocked;
      if (finishedLevel + 1 < TOTAL_PUZZLES && unlocked < finishedLevel + 2) {
        unlocked = finishedLevel + 2;
      }
      return { unlocked, records };
    });

    // Let the player see the full picture for a moment, then celebrate
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    finishTimeout.current = setTimeout(() => {
      if (finishedLevel === TOTAL_PUZZLES - 1) {
        setScreen("final");
        window.scrollTo(0, 0);
      } else {
        setWin({ level: finishedLevel, moves: finalMoves, time: finalTime, newlyUnlocked });
      }
    }, reduceMotion ? 300 : 1100);
  }

  // ---------- 7. Keyboard controls ----------
  // We keep the newest key handler in a ref, and add ONE listener.
  const keyHandler = useRef(null);
  useLayoutEffect(() => {
    keyHandler.current = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = (e.key || "").toLowerCase();
      if (win) {
        if (key === "escape") goTo("menu");
        return;
      }
      if (screen !== "play") return;
      if (KEY_DIRECTIONS[key]) {
        e.preventDefault(); // stop arrow keys from scrolling the page
        moveDirection(KEY_DIRECTIONS[key]);
      } else if (key === "r") {
        restartPuzzle();
      } else if (key === "m" || key === "escape") {
        goTo("menu");
      }
    };
  });
  useEffect(() => {
    const listener = (e) => keyHandler.current && keyHandler.current(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  // ---------- 8. Draw the current screen ----------
  const playing = screen === "play";
  const world = playing ? THEMES[level] : DEFAULT_WORLD;

  return (
    <div className="app" style={{ "--world": world.world, "--world-deep": world.deep }}>
      {screen === "menu" && (
        <MainMenu
          progress={progress}
          onStart={() => goTo("select")}
          onHelp={() => goTo("help")}
          onExit={() => goTo("bye")}
        />
      )}

      {screen === "help" && <Instructions onBack={() => goTo("menu")} />}

      {screen === "select" && (
        <LevelSelect progress={progress} onPlay={startPuzzle} onBack={() => goTo("menu")} />
      )}

      {playing && (
        <PuzzleScreen
          theme={THEMES[level]}
          level={level}
          progress={progress}
          tiles={tiles}
          moves={moves}
          elapsed={elapsed}
          solved={solved}
          showNumbers={showNumbers}
          message={message}
          nudge={nudge}
          onTryMove={tryMove}
          onSwipe={moveDirection}
          onRestart={restartPuzzle}
          onToggleNumbers={() => setShowNumbers((s) => !s)}
          onMenu={() => goTo("menu")}
        />
      )}

      {playing && win && (
        <WinDialog
          result={win}
          theme={THEMES[win.level]}
          nextTheme={THEMES[win.level + 1]}
          onNext={() => startPuzzle(win.level + 1)}
          onReplay={() => startPuzzle(win.level)}
          onMenu={() => goTo("menu")}
        />
      )}

      {screen === "final" && (
        <FinalScreen progress={progress} onRestartGame={restartWholeGame} onMenu={() => goTo("menu")} />
      )}

      {screen === "bye" && <ByeScreen onBack={() => goTo("menu")} />}
    </div>
  );
}
