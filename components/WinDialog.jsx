// =============================================================
// components/WinDialog.jsx
// The "Congratulations!" box after each puzzle (1 to 4).
// =============================================================
import { useEffect, useRef } from "react";
import { formatTime, starCount } from "@/lib/puzzle";

export default function WinDialog({ result, theme, nextTheme, onNext, onReplay, onMenu }) {
  const nextButton = useRef(null);
  useEffect(() => {
    if (nextButton.current) nextButton.current.focus();
  }, []);

  const stars = starCount(result.moves);
  const ratingText =
    stars === 3
      ? "Superstar! 3 stars."
      : stars === 2
        ? "Great job! 2 stars. Solve it in 40 moves or fewer for 3."
        : "Well done! 1 star. Solve it in 80 moves or fewer for 2.";

  return (
    <div className="overlay">
      <div className="dialog panel" role="dialog" aria-modal="true" aria-labelledby="winTitle">
        <p className="big" id="winTitle">Congratulations!</p>
        <p className="sub">
          You solved Puzzle {result.level + 1}: {theme.name}.
        </p>
        <div className="stars" aria-hidden="true">
          {"\u2605".repeat(stars)}
          <span className="off">{"\u2605".repeat(3 - stars)}</span>
        </div>
        <p className="rating">{ratingText}</p>
        <div className="result">
          <div className="stat">
            <span>Moves</span>
            <strong>{result.moves}</strong>
          </div>
          <div className="stat">
            <span>Time</span>
            <strong>{formatTime(result.time)}</strong>
          </div>
        </div>
        <p className="unlock">
          Puzzle {result.level + 2}, {nextTheme.name},{" "}
          {result.newlyUnlocked ? "is now unlocked!" : "is ready for you."}
        </p>
        <div className="dialog-buttons">
          <button ref={nextButton} className="btn primary" type="button" onClick={onNext}>
            Next puzzle
          </button>
          <button className="btn" type="button" onClick={onReplay}>
            Replay this puzzle
          </button>
          <button className="btn" type="button" onClick={onMenu}>
            Main menu
          </button>
        </div>
      </div>
    </div>
  );
}
