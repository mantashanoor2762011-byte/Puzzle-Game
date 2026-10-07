// =============================================================
// app/layout.js
// The outer HTML page that wraps every screen of the game.
// =============================================================
import "./globals.css";

export const metadata = {
  title: "My 5 Puzzle Game",
  description: "A 5-level sliding picture puzzle game made with Next.js",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Rounded "Baloo 2" font from Google Fonts (falls back to a normal font if offline) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
