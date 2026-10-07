// =============================================================
// components/ByeScreen.jsx
// Shown after pressing "Exit" (a web page can't close itself).
// =============================================================
export default function ByeScreen({ onBack }) {
  return (
    <section className="screen bye" aria-labelledby="byeTitle">
      <h1 id="byeTitle">Thanks for playing!</h1>
      <p>Your progress is saved. You can close this tab now.</p>
      <button className="btn primary" type="button" onClick={onBack} autoFocus>
        Back to main menu
      </button>
    </section>
  );
}
