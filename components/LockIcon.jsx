// A small padlock drawn with SVG (shown on locked puzzles)
export default function LockIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="#fff" stroke="#23204a" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="12" cy="15.5" r="1.6" fill="#23204a" />
    </svg>
  );
}
