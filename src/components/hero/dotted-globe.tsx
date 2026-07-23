"use client";

import { useEffect, useRef } from "react";
import { networkNodes, networkArcs } from "@/data/network";

// Palette tuned for the deep-navy (ink) hero — light dots and glowing arcs.
const NAVY: [number, number, number] = [150, 180, 224]; // soft periwinkle surface dots
const SKY: [number, number, number] = [92, 176, 234]; // brand sky (arcs / dev hub)
const COPPER: [number, number, number] = [224, 160, 106]; // warm copper (trade arcs / markets)
const HUB: [number, number, number] = [255, 255, 255]; // hub cores / labels on ink

const TILT = -0.42; // radians — northern hemisphere tips toward viewer
const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

type Vec3 = { x: number; y: number; z: number };

function latLonToVec(latDeg: number, lonDeg: number, r = 1): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: r * Math.cos(lat) * Math.sin(lon),
    y: r * Math.sin(lat),
    z: r * Math.cos(lat) * Math.cos(lon),
  };
}

/** Rotate around Y (spin) then X (fixed tilt). */
function rotate(v: Vec3, spin: number): Vec3 {
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

// Evenly distributed surface dots (density scaled by latitude so the sphere
// doesn't crowd at the poles).
const DOTS: Vec3[] = (() => {
  const pts: Vec3[] = [];
  for (let lat = -78; lat <= 78; lat += 6) {
    const circumference = Math.cos((lat * Math.PI) / 180);
    const count = Math.max(1, Math.round(58 * circumference));
    for (let i = 0; i < count; i++) {
      pts.push(latLonToVec(lat, (i / count) * 360, 1));
    }
  }
  return pts;
})();

// Great-circle arcs (slerp) with a raised altitude bump, precomputed as unit paths.
const ARCS = (() => {
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

const HUBS = networkNodes.filter((n) => n.kind !== "market");
const MARKETS = networkNodes.filter((n) => n.kind === "market");

export function DottedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctxRaw = canvasEl.getContext("2d");
    if (!ctxRaw) return;
    // Re-bind to non-null consts so narrowing holds inside the render closures.
    const cv = canvasEl;
    const ctx = ctxRaw;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let spin = -0.5;
    let size = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;

    function resize() {
      const parent = cv.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.min(parent.clientWidth, parent.clientHeight) || parent.clientWidth;
      cv.width = size * dpr;
      cv.height = size * dpr;
      cv.style.width = `${size}px`;
      cv.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = size / 2;
      cy = size / 2;
      radius = size * 0.42;
    }

    function project(v: Vec3) {
      return { sx: cx + v.x * radius, sy: cy - v.y * radius, z: v.z };
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);

      // faint sphere disc glow
      const grad = ctx.createRadialGradient(cx, cy - radius * 0.2, radius * 0.2, cx, cy, radius * 1.05);
      grad.addColorStop(0, rgba(SKY, 0.14));
      grad.addColorStop(1, rgba(SKY, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
      ctx.fill();

      // surface dots (front hemisphere only), shaded by depth
      for (const d of DOTS) {
        const r = rotate(d, spin);
        if (r.z <= 0.02) continue;
        const p = project(r);
        const depth = r.z;
        ctx.beginPath();
        ctx.fillStyle = rgba(NAVY, 0.16 + depth * 0.5);
        ctx.arc(p.sx, p.sy, 0.7 + depth * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // connection arcs
      for (const arc of ARCS) {
        const col = arc.isTech ? SKY : COPPER;
        ctx.lineWidth = arc.isTech ? 1.6 : 1.1;
        ctx.strokeStyle = rgba(col, arc.isTech ? 0.85 : 0.6);
        ctx.beginPath();
        let started = false;
        for (const pt of arc.pts) {
          const r = rotate(pt, spin);
          const p = project(r);
          if (r.z <= -0.15) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.stroke();

        // travelling pulse
        const prog = (spin * 0.6 + (arc.isTech ? 0 : 0.4)) % 1;
        const idx = Math.floor(Math.abs(prog) * (arc.pts.length - 1));
        const rp = rotate(arc.pts[idx], spin);
        if (rp.z > 0) {
          const pp = project(rp);
          ctx.beginPath();
          ctx.fillStyle = rgba(col, 0.9);
          ctx.arc(pp.sx, pp.sy, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // market nodes
      for (const n of MARKETS) {
        const r = rotate(latLonToVec(n.lat, n.lon, 1.01), spin);
        if (r.z <= 0.02) continue;
        const p = project(r);
        ctx.beginPath();
        ctx.fillStyle = rgba(COPPER, 0.85);
        ctx.arc(p.sx, p.sy, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // hub nodes + labels
      ctx.font = "600 10px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      for (const n of HUBS) {
        const r = rotate(latLonToVec(n.lat, n.lon, 1.01), spin);
        if (r.z <= 0.02) continue;
        const p = project(r);
        const col = n.kind === "development" ? SKY : HUB;
        // glow halo
        ctx.beginPath();
        ctx.fillStyle = rgba(col, 0.25);
        ctx.arc(p.sx, p.sy, 8, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.fillStyle = rgba(col, 1);
        ctx.arc(p.sx, p.sy, 3.2, 0, Math.PI * 2);
        ctx.fill();
        // label with dark halo for legibility on the ink background
        const label = n.city.toUpperCase();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = "rgba(7, 10, 44, 0.92)";
        ctx.strokeText(label, p.sx, p.sy - 11);
        ctx.fillStyle = "rgba(233, 235, 245, 0.98)";
        ctx.fillText(label, p.sx, p.sy - 11);
      }
    }

    function loop() {
      spin += 0.0016;
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    if (cv.parentElement) ro.observe(cv.parentElement);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
    </div>
  );
}
