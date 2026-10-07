// =============================================================
// components/Board.jsx
// Draws the 3x3 board. Each piece shows one ninth of the theme
// picture. Pieces slide with a CSS transition when they move.
// =============================================================
import { useEffect, useRef } from "react";

const PIECES = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 9 = the hidden last piece

export default function Board({ theme, tiles, solved, showNumbers, nudge, onTryMove, onSwipe }) {
  const tileRefs = useRef({});
  const pointer = useRef(null);

  // Shake a piece that can't move
  useEffect(() => {
    if (!nudge.value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = tileRefs.current[nudge.value];
    if (!el) return;
    el.classList.remove("nope");
    void el.offsetWidth; // restart the CSS animation
    el.classList.add("nope");
  }, [nudge]);

  // ---- Mouse / touch: a short press is a tap, a long drag is a swipe ----
  function handlePointerDown(e) {
    const tile = e.target.closest(".tile");
    pointer.current = { x: e.clientX, y: e.clientY, value: tile ? Number(tile.dataset.value) : 0 };
  }

  function handlePointerUp(e) {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 24) {
      const direction =
        Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
      onSwipe(direction);
    } else if (start.value && start.value !== 9) {
      onTryMove(tiles.indexOf(start.value));
    }
  }

  // Keyboard users can press Enter / Space on a focused piece
  function handleClick(e) {
    if (e.detail !== 0) return; // mouse and touch are handled above
    const tile = e.target.closest(".tile");
    if (tile && tile.dataset.value !== "9") onTryMove(tiles.indexOf(Number(tile.dataset.value)));
  }

  return (
    <div className={"board" + (solved ? " solved" : "") + (showNumbers ? "" : " hide-numbers")}>
      <div
        className="board-inner"
        aria-label="Puzzle board"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointer.current = null)}
        onClick={handleClick}
      >
        {PIECES.map((value) => {
          const home = value - 1;                                  // where this piece belongs
          const at = value === 9 ? 8 : tiles.indexOf(value);       // where it is now
          const row = Math.floor(at / 3);
          const col = at % 3;
          const isLast = value === 9;
          return (
            <button
              key={value}
              ref={(el) => {
                tileRefs.current[value] = el;
              }}
              type="button"
              className={"tile" + (isLast ? " last" : "")}
              data-value={value}
              tabIndex={isLast ? -1 : undefined}
              aria-hidden={isLast ? true : undefined}
              aria-label={isLast ? undefined : `Piece ${value}, row ${row + 1}, column ${col + 1}`}
              style={{ left: `${col * 33.3333}%`, top: `${row * 33.3333}%` }}
            >
              <span
                className="face"
                style={{
                  backgroundImage: `url("${theme.image}")`,
                  backgroundPosition: `${(home % 3) * 50}% ${Math.floor(home / 3) * 50}%`,
                }}
              />
              {!isLast && <span className="num">{value}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
