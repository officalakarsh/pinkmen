import React from 'react';

interface JewelleryArtworkProps {
  type: string;
  className?: string;
  viewAngle?: 'full' | 'choker' | 'earrings' | 'tikka' | 'reverse';
  showBadge?: boolean;
}

export const JewelleryArtwork: React.FC<JewelleryArtworkProps> = ({
  type,
  className = '',
  viewAngle = 'full',
  showBadge = true,
}) => {
  return (
    <div
      className={`relative w-full h-full bg-[#F5F0EB] flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ aspectRatio: '4/5' }}
    >
      {/* Subtle royal background filigree pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="royal-jaali" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#58111A" strokeWidth="1" />
            <circle cx="20" cy="20" r="3" fill="#C5A059" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#royal-jaali)" />
      </svg>

      {/* Radial ambient lighting */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F5F0EB]/40 to-[#EAE4DC]/80 pointer-events-none" />

      {/* Specific artwork renderer based on type and angle */}
      {renderJewelleryPiece(type, viewAngle)}

      {/* Subtle corner hallmarks */}
      <div className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.14em] text-[#877272] font-semibold flex items-center gap-1 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
        BIS 916 · JAIPUR ATELIER
      </div>

      {showBadge && (
        <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase text-[#58111A] font-semibold border border-[#C5A059]/40 rounded-full shadow-xs pointer-events-none">
          Handcrafted in Jaipur
        </div>
      )}
    </div>
  );
};

function renderJewelleryPiece(type: string, angle: string) {
  // If rendering the Maharani set, honor the requested angle
  if (type === 'maharani-set') {
    switch (angle) {
      case 'choker':
        return <ChokerMacroArtwork />;
      case 'earrings':
        return <JhumkiEarringsArtwork />;
      case 'tikka':
        return <MaangTikkaArtwork />;
      case 'reverse':
        return <MeenakariReverseArtwork />;
      case 'full':
      default:
        return <MaharaniFullSetArtwork />;
    }
  }

  switch (type) {
    case 'kalgi-brooch':
      return <KalgiBroochArtwork />;
    case 'emerald-haar':
      return <EmeraldHaarArtwork />;
    case 'sherwani-buttons':
      return <SherwaniButtonsArtwork />;
    case 'kangan-pair':
      return <KanganPairArtwork />;
    case 'signet-ring':
      return <SignetRingArtwork />;
    case 'gulbandh-choker':
      return <GulbandhChokerArtwork />;
    case 'bazuband-armlet':
      return <BazubandArmletArtwork />;
    default:
      return <MaharaniFullSetArtwork />;
  }
}

// 1. Flagship: Maharani Royal Kundan Set (Full View)
function MaharaniFullSetArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[88%] h-[88%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="35%" stopColor="#C5A059" />
          <stop offset="70%" stopColor="#8F6B1E" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="polkiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F8F9FA" />
          <stop offset="70%" stopColor="#E9ECEF" />
          <stop offset="100%" stopColor="#DEE2E6" />
        </linearGradient>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="50%" stopColor="#1B4332" />
          <stop offset="100%" stopColor="#081C15" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#775A19" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Royal Maang Tikka at Top */}
      <g transform="translate(200, 55)">
        <line x1="0" y1="-30" x2="0" y2="0" stroke="url(#goldGrad1)" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx="0" cy="-30" r="3" fill="#C5A059" />
        {/* Tikka Medallion */}
        <circle cx="0" cy="15" r="14" fill="url(#goldGrad1)" filter="url(#goldGlow)" />
        <polygon points="0,5 9,15 0,25 -9,15" fill="url(#polkiGrad)" stroke="#C5A059" strokeWidth="1" />
        <circle cx="0" cy="15" r="3" fill="#FFFFFF" />
        {/* Emerald drop */}
        <path d="M-4,30 C-4,28 4,28 4,30 C4,37 0,42 0,42 C0,42 -4,37 -4,30 Z" fill="url(#emeraldGrad)" stroke="#C5A059" strokeWidth="0.8" />
      </g>

      {/* Main Kundan Choker Arc */}
      <g transform="translate(200, 230)">
        {/* Dori / Silk Cord behind */}
        <path d="M-130,-50 C-100,-80 100,-80 130,-50" fill="none" stroke="#58111A" strokeWidth="3" strokeDasharray="4,2" />
        <circle cx="-130" cy="-50" r="4" fill="url(#goldGrad1)" />
        <circle cx="130" cy="-50" r="4" fill="url(#goldGrad1)" />

        {/* Choker Inner Gold Bar */}
        <path d="M-110,-10 C-60,-35 60,-35 110,-10" fill="none" stroke="url(#goldGrad1)" strokeWidth="5" filter="url(#goldGlow)" />

        {/* Polki Station Bezels */}
        {[-95, -72, -48, -24, 0, 24, 48, 72, 95].map((x, idx) => {
          const y = Math.pow(x / 30, 2) * 1.5;
          const isCenter = idx === 4;
          const size = isCenter ? 14 : 10;
          return (
            <g key={idx} transform={`translate(${x}, ${y})`}>
              {/* Kundan Bezel in 24k foil */}
              <rect x={-size} y={-size} width={size * 2} height={size * 2} rx="2" fill="url(#goldGrad1)" stroke="#8F6B1E" strokeWidth="0.75" />
              {/* Uncut Polki Diamond */}
              <polygon
                points={`0,${-size + 2} ${size - 2},0 0,${size - 2} ${-size + 2},0`}
                fill="url(#polkiGrad)"
                stroke="#C5A059"
                strokeWidth="0.75"
              />
              <circle cx="0" cy="0" r={size / 4} fill="#FFFFFF" opacity="0.8" />

              {/* Suspended Zambian Emerald Drops */}
              <g transform={`translate(0, ${size + 4})`}>
                <line x1="0" y1="0" x2="0" y2="4" stroke="url(#goldGrad1)" strokeWidth="1.5" />
                <circle cx="0" cy="2" r="1.5" fill="#FAF8F5" />
                <path
                  d={`M-${isCenter ? 6 : 4},6 C-${isCenter ? 6 : 4},3 ${isCenter ? 6 : 4},3 ${isCenter ? 6 : 4},6 C${isCenter ? 6 : 4},18 0,${isCenter ? 26 : 20} 0,${isCenter ? 26 : 20} C0,${isCenter ? 26 : 20} -${isCenter ? 6 : 4},18 -${isCenter ? 6 : 4},6 Z`}
                  fill="url(#emeraldGrad)"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                />
                <ellipse cx="0" cy={isCenter ? 12 : 9} rx="1.5" ry="3" fill="#52B788" opacity="0.6" />
              </g>
            </g>
          );
        })}

        {/* Second Row of Kundan Pendants */}
        {[-70, -35, 0, 35, 70].map((x, idx) => {
          const y = 32 + Math.pow(x / 25, 2);
          const isCenter = idx === 2;
          const r = isCenter ? 16 : 12;
          return (
            <g key={`row2-${idx}`} transform={`translate(${x}, ${y})`}>
              {/* Filigree link */}
              <line x1="0" y1="-12" x2="0" y2="0" stroke="url(#goldGrad1)" strokeWidth="1.5" />
              {/* Flower / Sunburst Medallion */}
              <circle cx="0" cy="0" r={r} fill="url(#goldGrad1)" filter="url(#goldGlow)" />
              <circle cx="0" cy="0" r={r - 3} fill="url(#polkiGrad)" stroke="#C5A059" strokeWidth="0.8" />
              <circle cx="0" cy="0" r={r / 3} fill="url(#emeraldGrad)" />

              {/* Seed pearl fringe */}
              {[-6, 0, 6].map((px, pi) => (
                <circle key={pi} cx={px} cy={r + 3} r="2" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
              ))}
              {/* Hanging briolette drop */}
              <path
                d={`M-4,${r + 7} C-4,${r + 5} 4,${r + 5} 4,${r + 7} C4,${r + 17} 0,${r + 22} 0,${r + 22} C0,${r + 22} -4,${r + 17} -4,${r + 7} Z`}
                fill="url(#emeraldGrad)"
                stroke="#C5A059"
                strokeWidth="0.75"
              />
            </g>
          );
        })}
      </g>

      {/* Left Chandbali Jhumki Earring */}
      <g transform="translate(68, 280)">
        <circle cx="0" cy="-35" r="3" fill="#C5A059" />
        <line x1="0" y1="-35" x2="0" y2="-20" stroke="url(#goldGrad1)" strokeWidth="1.5" />
        <circle cx="0" cy="-12" r="8" fill="url(#goldGrad1)" />
        <polygon points="0,-18 5,-12 0,-6 -5,-12" fill="url(#polkiGrad)" />
        {/* Crescent Moon Chand */}
        <path d="M-16,4 C-8,18 8,18 16,4 C10,12 -10,12 -16,4 Z" fill="url(#goldGrad1)" filter="url(#goldGlow)" />
        {/* Dome Jhumki */}
        <path d="M-12,18 C-12,8 12,8 12,18 Z" fill="url(#goldGrad1)" />
        <line x1="-12" y1="18" x2="12" y2="18" stroke="#8F6B1E" strokeWidth="1" />
        {/* Seed Pearls */}
        {[-8, -4, 0, 4, 8].map((px, pi) => (
          <circle key={pi} cx={px} cy="21" r="1.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
        ))}
        {/* Central drop */}
        <path d="M-3,25 C-3,23 3,23 3,25 C3,32 0,36 0,36 C0,36 -3,32 -3,25 Z" fill="url(#emeraldGrad)" stroke="#C5A059" strokeWidth="0.75" />
      </g>

      {/* Right Chandbali Jhumki Earring */}
      <g transform="translate(332, 280)">
        <circle cx="0" cy="-35" r="3" fill="#C5A059" />
        <line x1="0" y1="-35" x2="0" y2="-20" stroke="url(#goldGrad1)" strokeWidth="1.5" />
        <circle cx="0" cy="-12" r="8" fill="url(#goldGrad1)" />
        <polygon points="0,-18 5,-12 0,-6 -5,-12" fill="url(#polkiGrad)" />
        {/* Crescent Moon Chand */}
        <path d="M-16,4 C-8,18 8,18 16,4 C10,12 -10,12 -16,4 Z" fill="url(#goldGrad1)" filter="url(#goldGlow)" />
        {/* Dome Jhumki */}
        <path d="M-12,18 C-12,8 12,8 12,18 Z" fill="url(#goldGrad1)" />
        <line x1="-12" y1="18" x2="12" y2="18" stroke="#8F6B1E" strokeWidth="1" />
        {/* Seed Pearls */}
        {[-8, -4, 0, 4, 8].map((px, pi) => (
          <circle key={pi} cx={px} cy="21" r="1.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
        ))}
        {/* Central drop */}
        <path d="M-3,25 C-3,23 3,23 3,25 C3,32 0,36 0,36 C0,36 -3,32 -3,25 Z" fill="url(#emeraldGrad)" stroke="#C5A059" strokeWidth="0.75" />
      </g>
    </svg>
  );
}

// 2. Choker Macro Artwork
function ChokerMacroArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[90%] h-[90%] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="macroGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="30%" stopColor="#C5A059" />
          <stop offset="70%" stopColor="#8A671C" />
          <stop offset="100%" stopColor="#E6C875" />
        </linearGradient>
        <linearGradient id="macroPolki" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F1F3F5" />
          <stop offset="100%" stopColor="#D5D9DC" />
        </linearGradient>
        <linearGradient id="macroEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="60%" stopColor="#1B4332" />
          <stop offset="100%" stopColor="#081C15" />
        </linearGradient>
      </defs>

      {/* Extreme macro zoom on the central Kundan Collar and 24K pure gold foil bezel */}
      <g transform="translate(200, 240)">
        {/* Massive Center Kundan Medallion */}
        <rect x="-70" y="-70" width="140" height="140" rx="6" fill="url(#macroGold)" stroke="#6A4E12" strokeWidth="3" />
        {/* Intricate Inner Kundan Bezel Wall */}
        <rect x="-56" y="-56" width="112" height="112" rx="4" fill="#FED488" stroke="#8F6B1E" strokeWidth="1.5" />
        {/* Syndicate Polki Natural Facets */}
        <polygon points="0,-48 48,0 0,48 -48,0" fill="url(#macroPolki)" stroke="#C5A059" strokeWidth="2" />
        {/* Inner Diamond facet table lines */}
        <line x1="0" y1="-48" x2="0" y2="48" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <line x1="-48" y1="0" x2="48" y2="0" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <polygon points="0,-22 22,0 0,22 -22,0" fill="#FFFFFF" opacity="0.5" />

        {/* Flanking Side Bezels */}
        <g transform="translate(-115, 0)">
          <rect x="-35" y="-50" width="70" height="100" rx="4" fill="url(#macroGold)" stroke="#6A4E12" strokeWidth="2" />
          <polygon points="0,-36 24,0 0,36 -24,0" fill="url(#macroPolki)" stroke="#C5A059" strokeWidth="1.5" />
        </g>
        <g transform="translate(115, 0)">
          <rect x="-35" y="-50" width="70" height="100" rx="4" fill="url(#macroGold)" stroke="#6A4E12" strokeWidth="2" />
          <polygon points="0,-36 24,0 0,36 -24,0" fill="url(#macroPolki)" stroke="#C5A059" strokeWidth="1.5" />
        </g>

        {/* Suspended Carved Zambian Emerald Drop */}
        <g transform="translate(0, 95)">
          <circle cx="0" cy="-12" r="5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="1" />
          <line x1="0" y1="-7" x2="0" y2="0" stroke="url(#macroGold)" strokeWidth="3" />
          <path
            d="M-22,10 C-22,0 22,0 22,10 C22,60 0,90 0,90 C0,90 -22,60 -22,10 Z"
            fill="url(#macroEmerald)"
            stroke="#C5A059"
            strokeWidth="2"
          />
          {/* Emerald internal gemstone light refraction */}
          <ellipse cx="0" cy="35" rx="10" ry="24" fill="#52B788" opacity="0.45" />
          <path d="M-8,18 Q0,45 -6,65" fill="none" stroke="#74C69D" strokeWidth="1.5" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

// 3. Jhumki Earrings Artwork
function JhumkiEarringsArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jhGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="40%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8F6B1E" />
        </linearGradient>
        <linearGradient id="jhEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="70%" stopColor="#1B4332" />
        </linearGradient>
      </defs>

      {/* Pair of Matching Chandbali Jhumkis */}
      {[130, 270].map((centerX, idx) => (
        <g key={idx} transform={`translate(${centerX}, 180)`}>
          {/* Ear Stud Top */}
          <circle cx="0" cy="-60" r="18" fill="url(#jhGold)" />
          <polygon points="0,-72 12,-60 0,-48 -12,-60" fill="#FFFFFF" stroke="#C5A059" strokeWidth="1" />
          <circle cx="0" cy="-60" r="3" fill="#1B4332" />

          {/* Golden link */}
          <line x1="0" y1="-42" x2="0" y2="-20" stroke="url(#jhGold)" strokeWidth="3" />

          {/* Chand (Crescent Moon) */}
          <path d="M-36,-10 C-18,24 18,24 36,-10 C24,14 -24,14 -36,-10 Z" fill="url(#jhGold)" />
          {/* Polki encrusted in crescent */}
          {[-20, -10, 0, 10, 20].map((x, pi) => (
            <circle key={pi} cx={x} cy={7 - Math.abs(x) / 5} r="3" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="0.5" />
          ))}

          {/* Suspended Bell / Dome Jhumki */}
          <g transform="translate(0, 40)">
            <path d="M-28,16 C-28,-14 28,-14 28,16 Z" fill="url(#jhGold)" />
            <line x1="-28" y1="16" x2="28" y2="16" stroke="#8F6B1E" strokeWidth="2" />
            {/* Pearl latkan fringe */}
            {[-22, -14, -7, 0, 7, 14, 22].map((px, pidx) => (
              <g key={pidx} transform={`translate(${px}, 18)`}>
                <line x1="0" y1="0" x2="0" y2="8" stroke="url(#jhGold)" strokeWidth="1" />
                <circle cx="0" cy="9" r="2.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
              </g>
            ))}
            {/* Center Emerald Pear Drop */}
            <g transform="translate(0, 36)">
              <path d="M-8,6 C-8,2 8,2 8,6 C8,22 0,30 0,30 C0,30 -8,22 -8,6 Z" fill="url(#jhEmerald)" stroke="#C5A059" strokeWidth="1" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

// 4. Maang Tikka Artwork
function MaangTikkaArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8F6B1E" />
        </linearGradient>
        <linearGradient id="tkEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 180)">
        {/* Hair Chain with Pearls */}
        <line x1="0" y1="-120" x2="0" y2="0" stroke="url(#tkGold)" strokeWidth="3" />
        {[-100, -80, -60, -40, -20].map((y, idx) => (
          <circle key={idx} cx="0" cy={y} r="3.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.75" />
        ))}
        {/* Top Hair Hook */}
        <path d="M-6,-120 C-6,-132 6,-132 6,-120" fill="none" stroke="url(#tkGold)" strokeWidth="2.5" />

        {/* Master Center Medallion */}
        <g transform="translate(0, 35)">
          <circle cx="0" cy="0" r="42" fill="url(#tkGold)" />
          {/* Outer Polki Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, aidx) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 30;
            const y = Math.sin(rad) * 30;
            return (
              <circle key={aidx} cx={x} cy={y} r="7" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="1" />
            );
          })}
          {/* Inner Kundan Stone */}
          <polygon points="0,-18 18,0 0,18 -18,0" fill="#FFFFFF" stroke="#C5A059" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="url(#tkEmerald)" />

          {/* Pearl Cluster & Suspended Drop */}
          <g transform="translate(0, 52)">
            {[-12, -6, 0, 6, 12].map((px, pi) => (
              <circle key={pi} cx={px} cy="4" r="2.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
            ))}
            <path d="M-9,12 C-9,7 9,7 9,12 C9,30 0,40 0,40 C0,40 -9,30 -9,12 Z" fill="url(#tkEmerald)" stroke="#C5A059" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}

// 5. Reverse Meenakari Enameling Artwork (The back of the necklace)
function MeenakariReverseArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[88%] h-[88%] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meenaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A67C1E" />
        </linearGradient>
      </defs>

      {/* Royal Gulabi & Sabz Meenakari (Vibrant Enamel Painted Behind Gold) */}
      <g transform="translate(200, 240)">
        {/* Main Reverse Choker Plates */}
        {[-90, -45, 0, 45, 90].map((x, idx) => {
          const isCenter = idx === 2;
          const w = isCenter ? 38 : 32;
          const h = isCenter ? 52 : 44;
          return (
            <g key={idx} transform={`translate(${x}, ${Math.pow(x / 40, 2) * 2})`}>
              {/* Gold backing plate */}
              <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="4" fill="url(#meenaGold)" stroke="#6A4E12" strokeWidth="2" />
              {/* Royal Enamel Surface */}
              <rect x={-w / 2 + 3} y={-h / 2 + 3} width={w - 6} height={h - 6} rx="2" fill="#58111A" />
              {/* Hand-painted Royal Jaipur Peacock & Floral Motif */}
              <path d="M-6,0 C-10,-12 10,-12 6,0 C10,12 -10,12 -6,0 Z" fill="#1B4332" />
              <circle cx="0" cy="0" r="3" fill="#D4AF37" />
              <circle cx="0" cy="-6" r="2" fill="#FAF8F5" />
              <circle cx="0" cy="6" r="2" fill="#FAF8F5" />
              {/* Fine gold enamel cloisonné divider lines */}
              <line x1={-w / 2 + 5} y1="0" x2={w / 2 - 5} y2="0" stroke="#D4AF37" strokeWidth="0.8" />
            </g>
          );
        })}

        {/* Informational label badge directly in the artwork */}
        <g transform="translate(0, 110)">
          <rect x="-105" y="-14" width="210" height="28" rx="14" fill="#FAF8F5" stroke="#C5A059" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#58111A" fontSize="10" fontWeight="bold" letterSpacing="0.1em">
            REVERSE ENAMEL · GULABI MEENAKARI
          </text>
        </g>
      </g>
    </svg>
  );
}

// 6. Kalgi Brooch Artwork
function KalgiBroochArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="klGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="40%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#775A19" />
        </linearGradient>
        <linearGradient id="klEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="60%" stopColor="#1B4332" />
          <stop offset="100%" stopColor="#081C15" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 240)">
        {/* Plume feathers rising upwards */}
        <path d="M0,-30 C-20,-90 -60,-120 -80,-150 C-40,-130 0,-110 0,-30 Z" fill="url(#klGold)" opacity="0.85" />
        <path d="M0,-30 C0,-95 0,-135 0,-165 C15,-130 15,-90 0,-30 Z" fill="url(#klGold)" />
        <path d="M0,-30 C20,-90 60,-120 80,-150 C40,-130 0,-110 0,-30 Z" fill="url(#klGold)" opacity="0.85" />

        {/* Central Master Carved Mughal Emerald Tablet */}
        <g transform="translate(0, 20)">
          <rect x="-35" y="-45" width="70" height="90" rx="6" fill="url(#klEmerald)" stroke="#C5A059" strokeWidth="2.5" />
          {/* Mughal floral relief carving */}
          <circle cx="0" cy="0" r="14" fill="none" stroke="#52B788" strokeWidth="1.5" />
          <path d="M0,-24 L0,24 M-20,0 L20,0" stroke="#52B788" strokeWidth="1" opacity="0.7" />
          {/* Uncut Polki Border */}
          {[-30, -15, 0, 15, 30].map((x, xi) => (
            <React.Fragment key={xi}>
              <circle cx={x} cy="-48" r="3.5" fill="#FFFFFF" stroke="#C5A059" strokeWidth="0.8" />
              <circle cx={x} cy="48" r="3.5" fill="#FFFFFF" stroke="#C5A059" strokeWidth="0.8" />
            </React.Fragment>
          ))}
        </g>

        {/* Suspended Pearl & Emerald Drops */}
        <g transform="translate(0, 95)">
          {[-18, 0, 18].map((x, di) => (
            <g key={di} transform={`translate(${x}, 0)`}>
              <line x1="0" y1="0" x2="0" y2="8" stroke="url(#klGold)" strokeWidth="1.5" />
              <circle cx="0" cy="9" r="2.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
              <path d="M-4,13 C-4,10 4,10 4,13 C4,23 0,28 0,28 C0,28 -4,23 -4,13 Z" fill="url(#klEmerald)" stroke="#C5A059" strokeWidth="0.8" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

// 7. Emerald Kantha Haar Artwork
function EmeraldHaarArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[88%] h-[88%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emBead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#40916C" />
          <stop offset="50%" stopColor="#1B4332" />
          <stop offset="100%" stopColor="#081C15" />
        </linearGradient>
      </defs>

      {/* Cascading 5-strand Royal Kantha */}
      <g transform="translate(200, 190)">
        {[1, 2, 3, 4, 5].map((strand) => {
          const rx = 40 + strand * 18;
          const ry = 60 + strand * 26;
          return (
            <path
              key={strand}
              d={`M-${rx},-60 C-${rx},${ry} ${rx},${ry} ${rx},-60`}
              fill="none"
              stroke="url(#emBead)"
              strokeWidth="5"
              strokeDasharray="7,3"
            />
          );
        })}

        {/* Polki Station Pendants bridging the strands */}
        {[-70, 70].map((x, pi) => (
          <g key={pi} transform={`translate(${x}, 40)`}>
            <circle cx="0" cy="0" r="14" fill="#C5A059" />
            <polygon points="0,-10 10,0 0,10 -10,0" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="1" />
            <circle cx="0" cy="18" r="3" fill="#1B4332" />
          </g>
        ))}

        {/* Central Master Emerald Pendant */}
        <g transform="translate(0, 185)">
          <rect x="-24" y="-30" width="48" height="60" rx="4" fill="url(#emBead)" stroke="#C5A059" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#C5A059" strokeWidth="1" />
          <circle cx="0" cy="38" r="4" fill="#FAF8F5" stroke="#C5A059" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

// 8. Sherwani Buttons Artwork
function SherwaniButtonsArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="btnGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#775A19" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 240)">
        {/* Linking 22K Gold Chain */}
        <path d="M-90,-110 C-110,0 -90,110 0,120 C90,110 110,0 90,-110" fill="none" stroke="#C5A059" strokeWidth="2" strokeDasharray="4,2" />

        {/* 7 Buttons positioned in ceremonial row */}
        {[
          { x: -90, y: -90, gem: '#1B4332' },
          { x: -60, y: -30, gem: '#93000A' },
          { x: -30, y: 30, gem: '#FED488' },
          { x: 0, y: 80, gem: '#FFFFFF' }, // Center Diamond Button
          { x: 30, y: 30, gem: '#1B4332' },
          { x: 60, y: -30, gem: '#93000A' },
          { x: 90, y: -90, gem: '#C5A059' },
        ].map((btn, idx) => (
          <g key={idx} transform={`translate(${btn.x}, ${btn.y})`}>
            <circle cx="0" cy="0" r="20" fill="url(#btnGold)" stroke="#6A4E12" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="15" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.8" />
            {/* Nine planetary gemstone dots around */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, ai) => {
              const r = (ang * Math.PI) / 180;
              return <circle key={ai} cx={Math.cos(r) * 11} cy={Math.sin(r) * 11} r="1.5" fill="#8F6B1E" />;
            })}
            {/* Center Gemstone */}
            <circle cx="0" cy="0" r="6" fill={btn.gem} stroke="#C5A059" strokeWidth="0.75" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// 9. Kangan Pair Artwork
function KanganPairArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kgGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="40%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#775A19" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 240)">
        {/* Left Kangan */}
        <g transform="translate(-40, -20) rotate(-15)">
          <ellipse cx="0" cy="0" rx="70" ry="70" fill="none" stroke="url(#kgGold)" strokeWidth="16" />
          {/* Polki encrusted outer edge */}
          <ellipse cx="0" cy="0" rx="78" ry="78" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,6" />
          {/* Makara dragonhead terminals */}
          <g transform="translate(0, -70)">
            <circle cx="-12" cy="0" r="9" fill="#93000A" stroke="#C5A059" strokeWidth="1.5" />
            <circle cx="12" cy="0" r="9" fill="#93000A" stroke="#C5A059" strokeWidth="1.5" />
          </g>
        </g>

        {/* Right Kangan overlapping */}
        <g transform="translate(40, 25) rotate(15)">
          <ellipse cx="0" cy="0" rx="70" ry="70" fill="none" stroke="url(#kgGold)" strokeWidth="16" />
          <ellipse cx="0" cy="0" rx="78" ry="78" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,6" />
          <g transform="translate(0, -70)">
            <circle cx="-12" cy="0" r="9" fill="#93000A" stroke="#C5A059" strokeWidth="1.5" />
            <circle cx="12" cy="0" r="9" fill="#93000A" stroke="#C5A059" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}

// 10. Signet Ring Artwork
function SignetRingArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rgGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#775A19" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 250)">
        {/* Solid Gold Shank / Band */}
        <ellipse cx="0" cy="20" rx="65" ry="65" fill="none" stroke="url(#rgGold)" strokeWidth="24" />
        <ellipse cx="0" cy="20" rx="53" ry="53" fill="#F5F0EB" />

        {/* Heavy Rectangular Table Top Mount */}
        <g transform="translate(0, -45)">
          <rect x="-42" y="-32" width="84" height="64" rx="4" fill="url(#rgGold)" stroke="#6A4E12" strokeWidth="2" />
          {/* 24K pure bezel holding the 4.85 carat portrait Polki */}
          <rect x="-34" y="-25" width="68" height="50" rx="2" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="1.5" />
          {/* Crystalline facets and internal cleavage lines */}
          <line x1="-34" y1="-25" x2="34" y2="25" stroke="#E9ECEF" strokeWidth="1" />
          <line x1="-34" y1="25" x2="34" y2="-25" stroke="#E9ECEF" strokeWidth="1" />
          <rect x="-16" y="-12" width="32" height="24" fill="#FFFFFF" opacity="0.7" />
        </g>
      </g>
    </svg>
  );
}

// 11. Gulbandh Choker Artwork
function GulbandhChokerArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gbGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8F6B1E" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 240)">
        {/* Tiered Solid Gold Segmented Plates */}
        {[-80, -40, 0, 40, 80].map((x, idx) => (
          <g key={idx} transform={`translate(${x}, 0)`}>
            <rect x="-18" y="-35" width="36" height="70" rx="3" fill="url(#gbGold)" stroke="#6A4E12" strokeWidth="1.5" />
            {/* Pigeon Blood Rubies */}
            <circle cx="0" cy="-18" r="8" fill="#93000A" stroke="#C5A059" strokeWidth="1" />
            <polygon points="0,-4 8,4 0,12 -8,4" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="0.8" />
            <circle cx="0" cy="22" r="6" fill="#93000A" stroke="#C5A059" strokeWidth="1" />
          </g>
        ))}
        {/* Seed Pearl Fringe Bottom */}
        {Array.from({ length: 19 }).map((_, i) => (
          <circle key={i} cx={-90 + i * 10} cy="42" r="3" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
        ))}
      </g>
    </svg>
  );
}

// 12. Bazuband Armlet Artwork
function BazubandArmletArtwork() {
  return (
    <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bzGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED488" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#775A19" />
        </linearGradient>
      </defs>

      <g transform="translate(200, 240)">
        {/* Gold Brocade Ties */}
        <line x1="-140" y1="0" x2="140" y2="0" stroke="#58111A" strokeWidth="6" />
        <line x1="-140" y1="0" x2="140" y2="0" stroke="#C5A059" strokeWidth="2" strokeDasharray="4,2" />

        {/* Central Solar Medallion */}
        <circle cx="0" cy="0" r="48" fill="url(#bzGold)" />
        {/* Sun rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 38}
              y1={Math.sin(a) * 38}
              x2={Math.cos(a) * 54}
              y2={Math.sin(a) * 54}
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
          );
        })}
        <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#8F6B1E" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="12" fill="#1B4332" />

        {/* Hanging Emerald Bead Tassels */}
        {[-20, 0, 20].map((x, ti) => (
          <g key={ti} transform={`translate(${x}, 52)`}>
            <circle cx="0" cy="6" r="3.5" fill="#FAF8F5" stroke="#C5A059" strokeWidth="0.5" />
            <circle cx="0" cy="18" r="5" fill="#1B4332" />
          </g>
        ))}
      </g>
    </svg>
  );
}
