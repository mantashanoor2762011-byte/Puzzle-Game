# My 5 Puzzle Game (Next.js)

A 5-level sliding picture puzzle (3x3, the "8-puzzle") made with Next.js and React.
Puzzles: Cinderella, Doraemon, Rapunzel, She-Ra, Motu Patlu.

## Requirements
- Node.js 20.9 or newer (download the LTS version from https://nodejs.org)
- VS Code

## Run it
Open this folder in VS Code, open the terminal (Ctrl + `) and run:

    npm install
    npm run dev

Then open http://localhost:3000 in your browser.

## Make a production build (optional)

    npm run build
    npm start

## Project structure

    app/
      layout.js        Outer HTML page, font, page title
      page.js          Home page, shows <PuzzleGame />
      globals.css      All styles and colours
    components/
      PuzzleGame.jsx   Main component: game state, moves, timer, keyboard
      MainMenu.jsx     Title + Start Game / Instructions / Exit
      Instructions.jsx How to play
      LevelSelect.jsx  The 5 puzzles, locked until the previous one is solved
      PuzzleScreen.jsx Puzzle number, theme name, moves, timer, buttons
      Board.jsx        The 3x3 board, tap / swipe handling
      WinDialog.jsx    "Congratulations!" after each puzzle
      FinalScreen.jsx  "You Completed All 5 Puzzles!" + results table
      ByeScreen.jsx    Shown after Exit
      LockIcon.jsx     Small padlock icon
    lib/
      puzzle.js        Puzzle logic: shuffle, move, win check
      themes.js        The 5 themes and their SVG pictures
      storage.js       Saves progress in the browser

## Controls
- Click / tap a piece next to the empty space
- Swipe on the board (phone)
- Arrow keys or W A S D
- R = restart the puzzle, M or Esc = main menu
