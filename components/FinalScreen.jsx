// =============================================================
// components/FinalScreen.jsx
// Shown after Puzzle 5: big congratulations, best results table,
// confetti, and buttons to restart or go to the menu.
// =============================================================
import { useEffect, useState } from "react";
import { THEMES } from "@/lib/themes";
import { formatTime } from "@/lib/puzzle";

const CONFETTI_COLORS = ["#3d4fb0", "#1e8fe0", "#8b4fd8", "#e0457b", "#ef7d00", "#ffcf3a", "#2fbf71"];

function Confetti() {
  // Random pieces are made once, when the final screen opens
  const [pieces] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return [];
    return Array.from({ length: 90 }, (_, i) => ({
      left: Math.random() * 100,
      duration: 2.4 + Math.random() * 2,
      delay: Math.random() * 0.8,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }));
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5500);
    return () => clearTimeout(t);
  }, []);

  if (!visible || pieces.length === 0) return null;
  return (
    <div className="confetti">
      {pieces.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function FinalScreen({ progress, onRestartGame, onMenu }) {
  const totalMoves = progress.records.reduce((sum, r) => sum + r.bestMoves, 0);
  const totalTime = progress.records.reduce((sum, r) => sum + r.bestTime, 0);

  return (
    <section className="screen" aria-labelledby="finalTitle">
      <Confetti />
      <div className="panel">
        <div className="final-head">
          {/* Simple trophy drawn with SVG */}
          <svg className="trophy" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M30 18h60v22a30 30 0 0 1-60 0z" fill="#ffcf3a" stroke="#23204a" strokeWidth="4" />
            <path d="M30 26H16a14 14 0 0 0 16 22M90 26h14a14 14 0 0 1-16 22" fill="none" stroke="#23204a" strokeWidth="4" />
            <rect x="52" y="68" width="16" height="18" fill="#ffcf3a" stroke="#23204a" strokeWidth="4" />
            <rect x="34" y="86" width="52" height="16" rx="4" fill="#8b4fd8" stroke="#23204a" strokeWidth="4" />
            <text x="60" y="48" textAnchor="middle" fontFamily="Baloo 2, Trebuchet MS, sans-serif" fontWeight="800" fontSize="24" fill="#23204a">
              5
            </text>
          </svg>
          <h1 id="finalTitle">Congratulations! You Completed All 5 Puzzles!</h1>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Puzzle</th>
                <th>Best moves</th>
                <th>Best time</th>
              </tr>
            </thead>
            <tbody>
              {THEMES.map((theme, i) => (
                <tr key={theme.name}>
                  <td>{i + 1}</td>
                  <td className="name">
                    <span className="sw" style={{ background: theme.world }} />
                    {theme.name}
                  </td>
                  <td>{progress.records[i].bestMoves}</td>
                  <td>{formatTime(progress.records[i].bestTime)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td>Total</td>
                <td>{totalMoves}</td>
                <td>{formatTime(totalTime)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="final-buttons">
          <button className="btn primary" type="button" onClick={onRestartGame} autoFocus>
            Restart game from Puzzle 1
          </button>
          <button className="btn" type="button" onClick={onMenu}>
            Main menu
          </button>
        </div>
      </div>
    </section>
  );
}
