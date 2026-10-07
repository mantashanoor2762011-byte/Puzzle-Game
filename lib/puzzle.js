// =============================================================
// lib/puzzle.js
// The "brain" of the sliding puzzle. No React here, just logic.
//
// The board is an array of 9 numbers (0 = the empty space):
//   index:  0 1 2        solved:  1 2 3
//           3 4 5                 4 5 6
//           6 7 8                 7 8 0
// =============================================================

const SHUFFLE_MOVES = 300;

// The finished board
export function solvedBoard() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 0];
}

// Is the board in the finished order?
export function isSolved(tiles) {
  for (let i = 0; i < 8; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[8] === 0;
}

// How many pieces are already in the right place (a helpful hint)
export function countInPlace(tiles) {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    if (tiles[i] === i + 1) count++;
  }
  return count;
}

// Is the square at "index" right next to the empty space?
export function isNextToGap(tiles, index) {
  const gap = tiles.indexOf(0);
  const rowDiff = Math.abs(Math.floor(index / 3) - Math.floor(gap / 3));
  const colDiff = Math.abs((index % 3) - (gap % 3));
  return rowDiff + colDiff === 1;
}

// Which square holds the piece that would slide in this direction?
//   "up"    -> the piece BELOW the gap moves up
//   "down"  -> the piece ABOVE the gap moves down
//   "left"  -> the piece RIGHT of the gap moves left
//   "right" -> the piece LEFT of the gap moves right
// Returns -1 when there is no piece on that side.
export function pieceForDirection(tiles, direction) {
  const gap = tiles.indexOf(0);
  let row = Math.floor(gap / 3);
  let col = gap % 3;
  if (direction === "up") row += 1;
  else if (direction === "down") row -= 1;
  else if (direction === "left") col += 1;
  else if (direction === "right") col -= 1;
  if (row < 0 || row > 2 || col < 0 || col > 2) return -1;
  return row * 3 + col;
}

// Swap a piece into the empty space. Returns a NEW array
// (React needs a new array to notice the change).
export function movePiece(tiles, index) {
  const next = [...tiles];
  const gap = next.indexOf(0);
  next[gap] = next[index];
  next[index] = 0;
  return next;
}

const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

// Shuffle by making many RANDOM LEGAL MOVES from the solved board.
// Every step is a real move, so the puzzle can ALWAYS be solved.
export function shuffledBoard() {
  const directions = ["up", "down", "left", "right"];
  let tiles;
  do {
    tiles = solvedBoard();
    let lastMove = null;
    for (let i = 0; i < SHUFFLE_MOVES; i++) {
      const dir = directions[Math.floor(Math.random() * 4)];
      if (lastMove && dir === OPPOSITE[lastMove]) continue; // don't undo the last step
      const piece = pieceForDirection(tiles, dir);
      if (piece < 0) continue;
      tiles = movePiece(tiles, piece);
      lastMove = dir;
    }
  } while (isSolved(tiles)); // never give the player a finished board
  return tiles;
}

// 75 -> "01:15"
export function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

// Fewer moves = more stars
export function starCount(moves) {
  if (moves <= 40) return 3;
  if (moves <= 80) return 2;
  return 1;
}
