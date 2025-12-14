// Kahawa-style SVG divider (wavy gold)
export const KahawaDivider = () => (
  <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z" fill="#C8B06A" />
  </svg>
);

// Motif overlay: subtle coffee beans pattern
export const KahawaMotif = () => (
  <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <pattern id="beans" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <ellipse cx="20" cy="20" rx="8" ry="16" fill="#7C5A2A" opacity="0.18" />
        <ellipse cx="20" cy="20" rx="6" ry="12" fill="#C8B06A" opacity="0.12" />
      </pattern>
    </defs>
    <rect width="1440" height="120" fill="url(#beans)" />
  </svg>
);

