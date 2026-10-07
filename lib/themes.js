// =============================================================
// lib/themes.js
// The 5 puzzle themes: name, short text, colours and a picture.
// Pictures are drawn with SVG code (no outside images), then cut
// into 9 pieces by the board.
// =============================================================

// ---------- Small drawing helpers ----------
function stars(list, color){
  return list.map(function(s){ return '<circle cx="'+s[0]+'" cy="'+s[1]+'" r="'+s[2]+'" fill="'+color+'"/>'; }).join('');
}
function sparkle(x, y, s, color){
  return '<path d="M'+x+' '+(y-s)+' L'+(x+s*0.28)+' '+(y-s*0.28)+' L'+(x+s)+' '+y+' L'+(x+s*0.28)+' '+(y+s*0.28)+' L'+x+' '+(y+s)+' L'+(x-s*0.28)+' '+(y+s*0.28)+' L'+(x-s)+' '+y+' L'+(x-s*0.28)+' '+(y-s*0.28)+' Z" fill="'+color+'"/>';
}
function svgWrap(inner){
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">'+inner+'</svg>';
}

const SCENES = [
  /* Puzzle 1: Cinderella - midnight clock, pumpkin coach, glass slipper */
  svgWrap(
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a4f"/><stop offset="1" stop-color="#4053b8"/></linearGradient></defs>'+
    '<rect width="300" height="300" fill="url(#g)"/>'+
    stars([[20,30,2],[60,18,1.5],[180,25,2],[210,70,1.5],[280,110,2],[30,140,1.5],[200,140,2],[270,20,1.5],[150,150,1.5],[95,170,2]],'#fff')+
    '<circle cx="248" cy="58" r="30" fill="#fdf6c9"/><circle cx="262" cy="50" r="26" fill="#1a2462" opacity=".35"/>'+
    '<circle cx="105" cy="88" r="56" fill="#f2efff" stroke="#c4b2ff" stroke-width="9"/>'+
    '<circle cx="105" cy="42" r="4" fill="#3b3b7a"/><circle cx="151" cy="88" r="4" fill="#3b3b7a"/><circle cx="105" cy="134" r="4" fill="#3b3b7a"/><circle cx="59" cy="88" r="4" fill="#3b3b7a"/>'+
    '<line x1="105" y1="88" x2="105" y2="50" stroke="#3b3b7a" stroke-width="6" stroke-linecap="round"/>'+
    '<line x1="105" y1="88" x2="103" y2="60" stroke="#e0457b" stroke-width="4" stroke-linecap="round"/>'+
    '<circle cx="105" cy="88" r="7" fill="#e0457b"/>'+
    '<path d="M0 238 Q150 210 300 238 V300 H0 Z" fill="#26307a"/>'+
    '<ellipse cx="208" cy="214" rx="56" ry="42" fill="#ff9a2e"/>'+
    '<path d="M185 175 Q170 214 185 254 M208 172 V256 M231 175 Q246 214 231 254" stroke="#e0760e" stroke-width="4" fill="none"/>'+
    '<ellipse cx="208" cy="210" rx="17" ry="20" fill="#ffe7a8" stroke="#e0760e" stroke-width="3"/>'+
    '<path d="M208 172 Q204 160 214 154" stroke="#3fae5a" stroke-width="6" fill="none" stroke-linecap="round"/>'+
    '<circle cx="172" cy="258" r="18" fill="none" stroke="#f7d774" stroke-width="5"/><circle cx="244" cy="258" r="18" fill="none" stroke="#f7d774" stroke-width="5"/>'+
    '<circle cx="172" cy="258" r="4" fill="#f7d774"/><circle cx="244" cy="258" r="4" fill="#f7d774"/>'+
    '<path d="M30 276 Q34 254 54 256 L82 262 Q96 240 112 258 Q114 272 106 276 Z" fill="#c6f1ff" stroke="#ffffff" stroke-width="3"/>'+
    '<path d="M98 262 L104 276" stroke="#ffffff" stroke-width="3"/>'+
    sparkle(124,232,10,'#ffffff')+sparkle(40,236,7,'#c6f1ff')+sparkle(272,180,8,'#fdf6c9')
  ),
  /* Puzzle 2: Doraemon - gadgets from the future */
  svgWrap(
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b9cf0"/><stop offset="1" stop-color="#9ad8ff"/></linearGradient></defs>'+
    '<rect width="300" height="300" fill="url(#g)"/>'+
    '<g fill="#ffffff"><ellipse cx="55" cy="55" rx="34" ry="14"/><ellipse cx="78" cy="46" rx="22" ry="14"/><ellipse cx="240" cy="110" rx="36" ry="14"/><ellipse cx="258" cy="100" rx="20" ry="13"/></g>'+
    stars([[30,110,2.5],[270,30,3],[190,40,2],[120,24,2.5]],'#fff3a3')+
    '<path d="M150 22 Q172 50 172 78 H128 Q128 50 150 22 Z" fill="#e53935"/>'+
    '<rect x="128" y="76" width="44" height="104" rx="8" fill="#ffffff" stroke="#1b4f8a" stroke-width="4"/>'+
    '<circle cx="150" cy="108" r="14" fill="#7fd0ff" stroke="#1b4f8a" stroke-width="4"/>'+
    '<path d="M128 140 L104 180 H128 Z M172 140 L196 180 H172 Z" fill="#e53935" stroke="#1b4f8a" stroke-width="3"/>'+
    '<path d="M136 182 Q150 226 164 182 Z" fill="#ffcf3a"/><path d="M142 182 Q150 206 158 182 Z" fill="#ff7a1a"/>'+
    '<rect x="0" y="232" width="300" height="68" fill="#e8f4ff"/>'+
    '<path d="M0 252 H300 M0 276 H300 M50 232 V300 M100 232 V300 M150 232 V300 M200 232 V300 M250 232 V300" stroke="#b9d9f5" stroke-width="2"/>'+
    '<rect x="22" y="188" width="76" height="62" rx="8" fill="#ffcf3a" stroke="#1b4f8a" stroke-width="4"/>'+
    '<rect x="55" y="188" width="10" height="62" fill="#e53935"/><rect x="22" y="212" width="76" height="10" fill="#e53935"/>'+
    '<text x="60" y="184" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-weight="700" font-size="30" fill="#1b4f8a">?</text>'+
    '<circle cx="240" cy="206" r="44" fill="#7b4fe0" stroke="#1b4f8a" stroke-width="4"/>'+
    '<circle cx="240" cy="206" r="32" fill="#a77cff"/><circle cx="240" cy="206" r="20" fill="#d5bfff"/><circle cx="240" cy="206" r="8" fill="#ffffff"/>'+
    '<path d="M240 162 Q284 172 272 220" stroke="#ffffff" stroke-width="4" fill="none" opacity=".7"/>'+
    sparkle(200,160,8,'#ffffff')+sparkle(286,252,7,'#ffcf3a')
  ),
  /* Puzzle 3: Rapunzel - tall tower with a long golden braid */
  svgWrap(
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98cff"/><stop offset="1" stop-color="#ffd8ec"/></linearGradient></defs>'+
    '<rect width="300" height="300" fill="url(#g)"/>'+
    '<circle cx="62" cy="62" r="30" fill="#ffd166"/><circle cx="62" cy="62" r="40" fill="#ffd166" opacity=".3"/>'+
    '<g fill="#ffffff" opacity=".85"><ellipse cx="250" cy="44" rx="30" ry="11"/><ellipse cx="80" cy="140" rx="26" ry="9"/></g>'+
    '<path d="M0 250 Q80 214 160 238 Q230 256 300 230 V300 H0 Z" fill="#59c27a"/>'+
    '<path d="M0 272 Q120 252 300 270 V300 H0 Z" fill="#3fa862"/>'+
    '<path d="M136 74 L190 14 L244 74 Z" fill="#6b3fa0" stroke="#3d2266" stroke-width="4"/>'+
    '<rect x="150" y="74" width="80" height="196" fill="#a99bc0" stroke="#3d2266" stroke-width="4"/>'+
    '<path d="M150 110 H230 M150 146 H230 M150 182 H230 M150 218 H230 M150 254 H230 M178 74 V110 M206 110 V146 M178 146 V182 M206 182 V218 M178 218 V254" stroke="#8d7fa8" stroke-width="3"/>'+
    '<path d="M174 128 V104 Q190 86 206 104 V128 Z" fill="#ffe08a" stroke="#3d2266" stroke-width="4"/>'+
    '<path d="M190 128 Q160 150 186 172 Q214 194 186 214 Q158 234 186 254 Q206 270 188 292" stroke="#f6c445" stroke-width="12" fill="none" stroke-linecap="round"/>'+
    '<path d="M190 128 Q160 150 186 172 Q214 194 186 214 Q158 234 186 254 Q206 270 188 292" stroke="#d99a16" stroke-width="3" stroke-dasharray="6 8" fill="none"/>'+
    '<g><circle cx="44" cy="262" r="7" fill="#ff7eb6"/><circle cx="72" cy="250" r="6" fill="#fff36b"/><circle cx="104" cy="266" r="7" fill="#ff7eb6"/><circle cx="262" cy="258" r="7" fill="#fff36b"/><circle cx="282" cy="276" r="6" fill="#ff7eb6"/></g>'+
    sparkle(116,96,9,'#ffffff')+sparkle(262,140,8,'#fff6b8')
  ),
  /* Puzzle 4: She-Ra - shining sword of courage */
  svgWrap(
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8cc4"/><stop offset="1" stop-color="#ffd56b"/></linearGradient></defs>'+
    '<rect width="300" height="300" fill="url(#g)"/>'+
    '<g fill="#ffffff" opacity=".28"><path d="M150 140 L0 0 H70 Z"/><path d="M150 140 L130 0 H190 Z"/><path d="M150 140 L250 0 H300 V30 Z"/><path d="M150 140 L300 120 V180 Z"/><path d="M150 140 L0 110 V170 Z"/></g>'+
    '<path d="M0 300 V220 L60 170 L110 222 L170 160 L230 214 L300 176 V300 Z" fill="#8a4bd1"/>'+
    '<path d="M0 300 V250 L70 214 L140 260 L210 226 L300 256 V300 Z" fill="#5d2c9c"/>'+
    '<path d="M150 22 L166 62 V196 H134 V62 Z" fill="#eef3ff" stroke="#3a2a6e" stroke-width="4"/>'+
    '<path d="M150 30 V194" stroke="#b9c6e8" stroke-width="4"/>'+
    '<rect x="96" y="194" width="108" height="20" rx="10" fill="#ffcf3a" stroke="#3a2a6e" stroke-width="4"/>'+
    '<circle cx="150" cy="204" r="13" fill="#e0457b" stroke="#3a2a6e" stroke-width="4"/>'+
    '<rect x="141" y="214" width="18" height="46" rx="4" fill="#7b3fc4" stroke="#3a2a6e" stroke-width="4"/>'+
    '<circle cx="150" cy="268" r="11" fill="#ffcf3a" stroke="#3a2a6e" stroke-width="4"/>'+
    sparkle(98,70,14,'#ffffff')+sparkle(214,96,11,'#ffffff')+sparkle(60,150,8,'#fff6b8')+sparkle(250,40,9,'#fff6b8')
  ),
  /* Puzzle 5: Motu Patlu - samosas and chai */
  svgWrap(
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9f1c"/><stop offset="1" stop-color="#ffd08a"/></linearGradient></defs>'+
    '<rect width="300" height="300" fill="url(#g)"/>'+
    '<path d="M0 22 Q150 52 300 22" stroke="#7a3d00" stroke-width="3" fill="none"/>'+
    '<g stroke="#7a3d00" stroke-width="2"><path d="M14 25 L32 31 L20 54 Z" fill="#2fa84f"/><path d="M50 33 L70 37 L58 62 Z" fill="#ffffff"/><path d="M90 40 L110 43 L98 68 Z" fill="#e53935"/><path d="M130 45 L150 46 L139 72 Z" fill="#2fa84f"/><path d="M170 45 L190 44 L181 71 Z" fill="#ffffff"/><path d="M210 42 L230 39 L222 66 Z" fill="#e53935"/><path d="M250 36 L270 32 L264 59 Z" fill="#2fa84f"/></g>'+
    '<rect x="0" y="196" width="300" height="104" fill="#9c5a22"/>'+
    '<path d="M0 196 H300" stroke="#6f3c12" stroke-width="6"/>'+
    '<ellipse cx="120" cy="200" rx="102" ry="30" fill="#ffffff" stroke="#6f3c12" stroke-width="4"/>'+
    '<ellipse cx="120" cy="198" rx="80" ry="20" fill="#f4ecdf"/>'+
    '<path d="M44 205 L82 128 L120 205 Z" fill="#e9a23b" stroke="#a8641a" stroke-width="4" stroke-linejoin="round"/>'+
    '<path d="M98 206 L140 120 L182 206 Z" fill="#f0b14a" stroke="#a8641a" stroke-width="4" stroke-linejoin="round"/>'+
    '<path d="M150 204 L184 140 L214 204 Z" fill="#e9a23b" stroke="#a8641a" stroke-width="4" stroke-linejoin="round"/>'+
    '<g fill="#a8641a"><circle cx="78" cy="180" r="2.5"/><circle cx="138" cy="170" r="2.5"/><circle cx="146" cy="190" r="2.5"/><circle cx="184" cy="184" r="2.5"/></g>'+
    '<ellipse cx="62" cy="252" rx="30" ry="12" fill="#3fae5a" stroke="#6f3c12" stroke-width="3"/>'+
    '<path d="M236 214 H286 L280 270 Q261 282 242 270 Z" fill="#fff7ea" stroke="#6f3c12" stroke-width="4"/>'+
    '<ellipse cx="261" cy="216" rx="25" ry="6" fill="#b5652a"/>'+
    '<path d="M285 228 Q300 236 284 254" stroke="#6f3c12" stroke-width="4" fill="none"/>'+
    '<g stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"><path d="M250 202 Q242 186 252 172 Q262 158 254 144"/><path d="M270 202 Q262 186 272 172 Q282 158 274 144"/></g>'+
    sparkle(30,100,8,'#fff6b8')+sparkle(240,110,9,'#ffffff')
  )
];

// Turn each SVG into a "data URL" so it can be used as an image
const toUrl = (svg) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

// ---------- The 5 themes ----------
export const THEMES = [
  { name: "Cinderella", tagline: "Rebuild the picture before the clock strikes midnight.", world: "#3d4fb0", deep: "#1f2a6e", image: toUrl(SCENES[0]) },
  { name: "Doraemon",   tagline: "Sort out the box of gadgets from the future.",          world: "#1e8fe0", deep: "#0b5ea8", image: toUrl(SCENES[1]) },
  { name: "Rapunzel",   tagline: "Climb the tall tower one piece at a time.",              world: "#8b4fd8", deep: "#5a2a9e", image: toUrl(SCENES[2]) },
  { name: "She-Ra",     tagline: "Strength and courage will solve this one.",              world: "#e0457b", deep: "#a8235a", image: toUrl(SCENES[3]) },
  { name: "Motu Patlu", tagline: "Grab a samosa and slide those pieces.",                   world: "#ef7d00", deep: "#a85300", image: toUrl(SCENES[4]) },
];

// Colours used on screens that are not a puzzle (menu, help, ...)
export const DEFAULT_WORLD = { world: "#5a55d6", deep: "#2f2b8f" };

export const TOTAL_PUZZLES = THEMES.length;
