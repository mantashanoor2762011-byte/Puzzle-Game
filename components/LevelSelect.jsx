// =============================================================
// components/LevelSelect.jsx
// The list of 5 puzzles. Locked puzzles can't be opened yet.
// =============================================================
import { useEffect, useRef, useState } from "react";
import { THEMES, TOTAL_PUZZLES } from "@/lib/themes";
import { formatTime } from "@/lib/puzzle";

export default function LevelSelect({ progress, onPlay, onBack }) {
  const [warning, setWarning] = useState("");
  const buttons = useRef([]);

  // Put keyboard focus on the next puzzle to play
  useEffect(() => {
    let next = progress.unlocked - 1;
    for (let i = 0; i < progress.unlocked; i++) {
      if (!progress.records[i].solved) {
        next = i;
        break;
      }
    }
    if (buttons.current[next]) buttons.current[next].focus({ preventScroll: true });
  }, [progress]);

  function choose(i) {
    if (i >= progress.unlocked) {
      setWarning(`Puzzle ${i + 1} is locked. Solve Puzzle ${i} first to open it.`);
      return;
    }
    onPlay(i);
  }

  return (
    <section className="screen" aria-labelledby="selectTitle">
      <h2 id="selectTitle" className="screen-title">Choose a puzzle</h2>

      <div className="levels">
        {THEMES.map((theme, i) => {
          const record = progress.records[i];
          const locked = i >= progress.unlocked;
          const statusText = locked ? "locked" : record.solved ? "solved" : "ready to play";
          return (
            <button
              key={theme.name}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              className={"level" + (locked ? " locked" : "")}
              aria-label={`Puzzle ${i + 1}, ${theme.name}, ${statusText}`}
              onClick={() => choose(i)}
            >
              <img src={theme.image} alt="" />
              <div>
                <div className="lv-num">
                  Puzzle {i + 1} of {TOTAL_PUZZLES}
                </div>
                <div className="lv-name">{theme.name}</div>
                {record.solved && (
                  <div className="lv-best">
                    Best: {record.bestMoves} moves, {formatTime(record.bestTime)}
                  </div>
                )}
              </div>
              <div className="lv-right">
                {locked ? (
                  <span className="lv-status locked">Locked</span>
                ) : record.solved ? (
                  <span className="lv-status solved">Solved</span>
                ) : (
                  <span className="lv-status ready">Play</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="warn" aria-live="polite">
        {warning}
      </p>
      <button className="btn" type="button" onClick={onBack}>
        Back to main menu
      </button>
    </section>
  );
}
