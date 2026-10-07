// =============================================================
// components/PuzzleScreen.jsx
// Everything shown while playing: puzzle number, theme name,
// moves, timer, progress dots, the board and the buttons.
// =============================================================
import { TOTAL_PUZZLES } from "@/lib/themes";
import { formatTime } from "@/lib/puzzle";
import Board from "./Board";

export default function PuzzleScreen({
  theme, level, progress, tiles, moves, elapsed, solved, showNumbers, message, nudge,
  onTryMove, onSwipe, onRestart, onToggleNumbers, onMenu,
}) {
  const solvedCount = progress.records.filter((r) => r.solved).length;
  const messageClass =
    "msg" + (message.kind === "warn" ? " warn-msg" : message.kind === "good" ? " good" : "");

  return (
    <section className="screen" aria-labelledby="worldName">
      {/* Top bar: "Puzzle 1 of 5", theme name, moves and timer */}
      <div className="playbar">
        <div>
          <p className="count">
            Puzzle {level + 1} of {TOTAL_PUZZLES}
          </p>
          <h2 className="world-name" id="worldName">
            {theme.name}
          </h2>
          <p className="tagline">{theme.tagline}</p>
        </div>
        <div className="stats">
          <div className="stat">
            <span>Moves</span>
            <strong>{moves}</strong>
          </div>
          <div className="stat">
            <span>Time</span>
            <strong>{formatTime(elapsed)}</strong>
          </div>
        </div>
      </div>

      {/* Progress dots: yellow = now, green = solved */}
      <div className="dots" role="img" aria-label={`${solvedCount} of ${TOTAL_PUZZLES} puzzles solved`}>
        {progress.records.map((record, i) => (
          <span
            key={i}
            className={"dot" + (i === level ? " current" : record.solved ? " solved" : "")}
          />
        ))}
      </div>

      <div className="play-area">
        <Board
          theme={theme}
          tiles={tiles}
          solved={solved}
          showNumbers={showNumbers}
          nudge={nudge}
          onTryMove={onTryMove}
          onSwipe={onSwipe}
        />
        <div className="side">
          <div className="goal">
            <img src={theme.image} alt="The finished picture" />
            <div>
              <strong>Finished picture</strong>
              <p>Pieces 1 to 8 in order, empty space last.</p>
            </div>
          </div>
          <div className="side-buttons">
            <button className="btn small" type="button" onClick={onRestart}>
              Restart
            </button>
            <button className="btn small" type="button" onClick={onToggleNumbers} aria-pressed={showNumbers}>
              {showNumbers ? "Hide numbers" : "Show numbers"}
            </button>
            <button className="btn small wide" type="button" onClick={onMenu}>
              Main menu
            </button>
          </div>
        </div>
      </div>

      <p className={messageClass} aria-live="polite">
        {message.text}
      </p>
      <p className="keys-hint">
        Tap a piece, swipe, or use the arrow keys. <kbd>R</kbd> restarts, <kbd>M</kbd> goes to the menu.
      </p>
    </section>
  );
}
