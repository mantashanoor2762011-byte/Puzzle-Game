// =============================================================
// components/MainMenu.jsx
// Title, the 5 puzzle pictures, and Start / Instructions / Exit.
// =============================================================
import { THEMES, TOTAL_PUZZLES } from "@/lib/themes";
import LockIcon from "./LockIcon";

export default function MainMenu({ progress, onStart, onHelp, onExit }) {
  const solvedCount = progress.records.filter((r) => r.solved).length;

  return (
    <section className="screen" aria-labelledby="menuTitle">
      <h1 id="menuTitle" className="title" aria-label="My 5 Puzzle Game">
        <span>My</span>
        <span>5</span>
        <span>Puzzle</span>
        <span>Game</span>
      </h1>
      <p className="lead">Slide the pieces, rebuild the picture, and finish all five worlds.</p>

      {/* The 5 puzzle pictures, locked ones are grey */}
      <div className="worlds" aria-hidden="true">
        {THEMES.map((theme, i) => {
          const locked = i >= progress.unlocked;
          return (
            <div key={theme.name} className={"world" + (locked ? " locked" : "")}>
              <div className="thumb">
                <img src={theme.image} alt="" />
                <span className="badge">{i + 1}</span>
                {locked && (
                  <span className="lock">
                    <LockIcon />
                  </span>
                )}
                {progress.records[i].solved && <span className="done">&#10003;</span>}
              </div>
              <p>{theme.name}</p>
            </div>
          );
        })}
      </div>

      <div className="menu-buttons">
        <button className="btn primary" type="button" onClick={onStart} autoFocus>
          Start Game
        </button>
        <button className="btn" type="button" onClick={onHelp}>
          Instructions
        </button>
        <button className="btn" type="button" onClick={onExit}>
          Exit
        </button>
      </div>

      <p className="note">
        {solvedCount === 0
          ? "Start with Puzzle 1. Each puzzle you finish opens the next one."
          : `${solvedCount} of ${TOTAL_PUZZLES} puzzles solved. Your progress is saved on this device.`}
      </p>
    </section>
  );
}
