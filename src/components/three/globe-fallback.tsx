import { cn } from "@/lib/utils";

/**
 * Static (CSS-animated) globe illustration served to mobile, reduced-motion,
 * and non-WebGL visitors — same visual story as the 3D scene at ~0 cost.
 */
export function GlobeFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="Illustration of a globe with connection lines between Chicago, India, and global markets"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="42%" r="60%">
          <stop offset="62%" stopColor="#0e1240" />
          <stop offset="88%" stopColor="#16215c" />
          <stop offset="100%" stopColor="#2e8fca33" />
        </radialGradient>
      </defs>

      {/* sphere + atmosphere */}
      <circle cx="280" cy="285" r="252" fill="#2e8fca" opacity="0.08" />
      <circle cx="280" cy="285" r="240" fill="url(#globe-glow)" stroke="#2a2f6e" strokeWidth="1" />

      {/* graticule */}
      <g stroke="#2a2f6e" strokeWidth="0.8" fill="none" opacity="0.75">
        <ellipse cx="280" cy="285" rx="240" ry="240" />
        <ellipse cx="280" cy="285" rx="185" ry="240" />
        <ellipse cx="280" cy="285" rx="110" ry="240" />
        <ellipse cx="280" cy="285" rx="38" ry="240" />
        <path d="M40 285 h480" />
        <path d="M56 200 a 240 240 0 0 1 448 0" transform="translate(0 -35) scale(1 0.42) translate(0 395)" />
        <ellipse cx="280" cy="285" rx="240" ry="88" />
        <ellipse cx="280" cy="285" rx="216" ry="160" />
      </g>

      {/* connection arcs */}
      <g fill="none" strokeDasharray="5 7" strokeLinecap="round" className="animate-dash-flow">
        <path d="M150 205 Q 280 90 398 252" stroke="#4aa3dc" strokeWidth="2" opacity="0.9" />
        <path d="M150 205 Q 130 260 137 300" stroke="#d3915a" strokeWidth="1.4" opacity="0.6" />
        <path d="M150 205 Q 220 110 296 142" stroke="#d3915a" strokeWidth="1.4" opacity="0.6" />
        <path d="M398 252 Q 386 268 358 287" stroke="#d3915a" strokeWidth="1.4" opacity="0.6" />
        <path d="M358 287 Q 400 330 430 358" stroke="#d3915a" strokeWidth="1.4" opacity="0.6" />
        <path d="M296 142 Q 340 200 358 287" stroke="#d3915a" strokeWidth="1.4" opacity="0.5" />
        <path d="M430 358 Q 462 300 464 218" stroke="#d3915a" strokeWidth="1.4" opacity="0.5" />
      </g>

      {/* market nodes */}
      <g>
        {[
          [137, 300],
          [296, 142],
          [358, 287],
          [430, 358],
          [464, 218],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="4" fill="#d3915a" />
            <circle cx={x} cy={y} r="4" fill="#d3915a" opacity="0.5" className="animate-node-pulse" />
          </g>
        ))}
      </g>

      {/* hub nodes + labels */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="9" letterSpacing="0.18em">
        <circle cx="150" cy="205" r="6" fill="#7dc0ea" />
        <circle cx="150" cy="205" r="6" fill="#7dc0ea" opacity="0.5" className="animate-node-pulse" />
        <text x="150" y="182" textAnchor="middle" fill="#eceef8">
          CHICAGO
        </text>
        <circle cx="398" cy="252" r="6" fill="#4aa3dc" />
        <circle cx="398" cy="252" r="6" fill="#4aa3dc" opacity="0.5" className="animate-node-pulse" />
        <text x="398" y="231" textAnchor="middle" fill="#eceef8">
          MEHSANA
        </text>
      </g>
    </svg>
  );
}
