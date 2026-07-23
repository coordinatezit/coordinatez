import { cn } from "@/lib/utils";

/**
 * Static, light-theme globe illustration used for the brief pre-hydration paint
 * and for no-JS visitors. The interactive canvas globe replaces it on mount.
 */
export function GlobeFallback({ className }: { className?: string }) {
  const dots: [number, number][] = [];
  // simple concentric dotted rings to suggest a sphere
  for (let ring = 1; ring <= 6; ring++) {
    const r = ring * 38;
    const count = ring * 8;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dots.push([280 + Math.cos(a) * r, 280 + Math.sin(a) * r * 0.98]);
    }
  }

  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="Illustration of a global network connecting Chicago, India, and world markets"
      className={cn("h-full w-full", className)}
    >
      <circle cx="280" cy="280" r="244" fill="rgba(92,176,234,0.06)" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="rgba(150,180,224,0.45)" />
      ))}
      <g fill="none" strokeLinecap="round" strokeDasharray="5 8" className="animate-dash-flow">
        <path d="M150 210 Q 280 110 398 250" stroke="#5cb0ea" strokeWidth="2" />
        <path d="M398 250 Q 430 320 430 360" stroke="#e0a06a" strokeWidth="1.4" opacity="0.8" />
        <path d="M150 210 Q 130 270 145 320" stroke="#e0a06a" strokeWidth="1.4" opacity="0.8" />
      </g>
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="0.16em" fontWeight="600">
        <circle cx="150" cy="210" r="5" fill="#ffffff" />
        <text x="150" y="192" textAnchor="middle" fill="#e9ebf5">CHICAGO</text>
        <circle cx="398" cy="250" r="5" fill="#5cb0ea" />
        <text x="398" y="232" textAnchor="middle" fill="#e9ebf5">MEHSANA</text>
      </g>
    </svg>
  );
}
