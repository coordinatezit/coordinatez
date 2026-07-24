// Pure geometry shared by the animated canvas globe and the static SVG fallback,
// so both render the same dotted world at the same orientation (seamless swap).
import { landDots } from "@/data/land-dots";
import { networkNodes, networkArcs } from "@/data/network";

export type Vec3 = { x: number; y: number; z: number };

export const TILT = -0.42; // fixed tilt — northern hemisphere toward viewer
export const INITIAL_SPIN = -0.5; // starting rotation (canvas animates from here)

export function latLonToVec(latDeg: number, lonDeg: number, r = 1): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: r * Math.cos(lat) * Math.sin(lon),
    y: r * Math.sin(lat),
    z: r * Math.cos(lat) * Math.cos(lon),
  };
}

/** Rotate a point around Y (spin) then X (fixed tilt). */
export function rotate(v: Vec3, spin: number): Vec3 {
  const cosY = Math.cos(spin);
  const sinY = Math.sin(spin);
  const x1 = v.x * cosY + v.z * sinY;
  const z1 = -v.x * sinY + v.z * cosY;
  const cosX = Math.cos(TILT);
  const sinX = Math.sin(TILT);
  const y2 = v.y * cosX - z1 * sinX;
  const z2 = v.y * sinX + z1 * cosX;
  return { x: x1, y: y2, z: z2 };
}

// Continent dots (precomputed at build time — see scripts/generate-land-dots.mjs).
export const DOTS: Vec3[] = landDots.map(([lat, lon]) => latLonToVec(lat, lon, 1));

// Faint lat/lon graticule so the sphere reads even over oceans.
export const GRATICULE: Vec3[][] = (() => {
  const lines: Vec3[][] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const ring: Vec3[] = [];
    for (let lon = -180; lon <= 180; lon += 4) ring.push(latLonToVec(lat, lon, 1));
    lines.push(ring);
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const meridian: Vec3[] = [];
    for (let lat = -80; lat <= 80; lat += 4) meridian.push(latLonToVec(lat, lon, 1));
    lines.push(meridian);
  }
  return lines;
})();

// Great-circle arcs (slerp) with a raised altitude bump.
export const ARCS: { pts: Vec3[]; isTech: boolean }[] = (() => {
  const byId = Object.fromEntries(networkNodes.map((n) => [n.id, n]));
  return networkArcs.map(({ from, to }) => {
    const a = byId[from];
    const b = byId[to];
    const va = latLonToVec(a.lat, a.lon, 1);
    const vb = latLonToVec(b.lat, b.lon, 1);
    const dot = Math.min(1, Math.max(-1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
    const omega = Math.acos(dot) || 1e-4;
    const sin = Math.sin(omega);
    const pts: Vec3[] = [];
    const segs = 70;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const k1 = Math.sin((1 - t) * omega) / sin;
      const k2 = Math.sin(t * omega) / sin;
      const alt = 1 + Math.sin(t * Math.PI) * (0.12 + omega * 0.12);
      pts.push({
        x: (va.x * k1 + vb.x * k2) * alt,
        y: (va.y * k1 + vb.y * k2) * alt,
        z: (va.z * k1 + vb.z * k2) * alt,
      });
    }
    return { pts, isTech: from === "chicago" && to === "mehsana" };
  });
})();

export const HUBS = networkNodes.filter((n) => n.kind !== "market");
export const MARKETS = networkNodes.filter((n) => n.kind === "market");
