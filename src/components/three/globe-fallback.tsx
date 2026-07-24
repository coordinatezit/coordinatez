import { cn } from "@/lib/utils";
import {
  DOTS,
  ARCS,
  HUBS,
  latLonToVec,
  rotate,
  INITIAL_SPIN,
} from "@/components/hero/globe-geometry";

const SIZE = 560;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE * 0.42;

function project(v: { x: number; y: number; z: number }) {
  const r = rotate(v, INITIAL_SPIN);
  return { sx: CX + r.x * R, sy: CY - r.y * R, z: r.z };
}

/**
 * Static first-frame of the dotted globe — server-rendered SVG at the same
 * orientation the canvas starts from, so it appears instantly (great for LCP)
 * and the interactive canvas takes over seamlessly with no 2D→3D flash.
 * Continents are subsampled to keep the initial HTML light.
 */
export function GlobeFallback({ className }: { className?: string }) {
  const dots = DOTS.filter((_, i) => i % 2 === 0)
    .map(project)
    .filter((p) => p.z > 0.02);

  const arcPaths = ARCS.map((arc) => {
    let d = "";
    let started = false;
    for (const pt of arc.pts) {
      const p = project(pt);
      if (p.z <= -0.15) {
        started = false;
        continue;
      }
      d += `${started ? "L" : "M"}${p.sx.toFixed(1)} ${p.sy.toFixed(1)} `;
      started = true;
    }
    return { d, isTech: arc.isTech };
  });

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Dotted world globe showing Coordinatez's network across the US, India, and global markets"
      className={cn("h-full w-full", className)}
    >
      <circle cx={CX} cy={CY} r={R * 1.02} fill="rgba(92,176,234,0.06)" />
      {dots.map((p, i) => (
        <circle
          key={i}
          cx={p.sx.toFixed(1)}
          cy={p.sy.toFixed(1)}
          r={(0.8 + p.z * 1.25).toFixed(1)}
          fill={`rgba(150,180,224,${(0.28 + p.z * 0.55).toFixed(2)})`}
        />
      ))}
      {arcPaths.map((a, i) => (
        <path
          key={i}
          d={a.d}
          fill="none"
          stroke={a.isTech ? "#5cb0ea" : "#e0a06a"}
          strokeWidth={a.isTech ? 1.6 : 1.1}
          strokeOpacity={a.isTech ? 0.85 : 0.55}
          strokeLinecap="round"
        />
      ))}
      {HUBS.map((n) => {
        const p = project(latLonToVec(n.lat, n.lon, 1.01));
        if (p.z <= 0.02) return null;
        const color = n.kind === "development" ? "#5cb0ea" : "#ffffff";
        return (
          <g key={n.id} fontFamily="var(--font-plex-mono), monospace" fontSize="10" fontWeight="600" letterSpacing="0.16em">
            <circle cx={p.sx.toFixed(1)} cy={p.sy.toFixed(1)} r="3.2" fill={color} />
            <text
              x={p.sx.toFixed(1)}
              y={(p.sy - 11).toFixed(1)}
              textAnchor="middle"
              fill="#e9ebf5"
              stroke="#070a2c"
              strokeWidth="3.5"
              paintOrder="stroke"
            >
              {n.city.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
