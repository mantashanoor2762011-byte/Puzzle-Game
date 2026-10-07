// =============================================================
// components/Instructions.jsx
// How to play + the controls.
// =============================================================
export default function Instructions({ onBack }) {
  return (
    <section className="screen" aria-labelledby="helpTitle">
      <div className="panel">
        <h2 id="helpTitle" className="screen-title">How to play</h2>
        <ol className="steps">
          <li>Each puzzle is a picture cut into 9 squares. One square is missing, so there is an empty space.</li>
          <li>Slide a piece that is next to the empty space to move it into the space.</li>
          <li>
            Put the picture back together. The numbered pieces go in this order, with the empty
            space in the bottom-right corner:
          </li>
        </ol>
        <div className="goal-grid" aria-label="Goal order: 1 2 3, 4 5 6, 7 8 then the empty space">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span className="gap" />
        </div>
        <ol className="steps" start={4}>
          <li>Finish Puzzle 1 to open Puzzle 2, and so on until Puzzle 5.</li>
          <li>Use fewer moves to earn 3 stars.</li>
        </ol>
        <dl className="controls">
          <dt>Click or tap</dt>
          <dd>Move the piece you touched</dd>
          <dt>Swipe</dt>
          <dd>On a phone, swipe on the board to slide a piece</dd>
          <dt>
            <kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> or <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd>
          </dt>
          <dd>Slide the piece next to the gap in that direction</dd>
          <dt>
            <kbd>R</kbd>
          </dt>
          <dd>Restart the puzzle with a new shuffle</dd>
          <dt>
            <kbd>M</kbd> or <kbd>Esc</kbd>
          </dt>
          <dd>Go back to the main menu</dd>
        </dl>
        <button className="btn primary" type="button" onClick={onBack} autoFocus>
          Back to main menu
        </button>
      </div>
    </section>
  );
}
