"use client";

import { useEffect, useRef } from "react";
import {
  DOTS,
  GRATICULE,
  ARCS,
  HUBS,
  MARKETS,
  latLonToVec,
  rotate,
  INITIAL_SPIN,
  type Vec3,
} from "@/components/hero/globe-geometry";

// Palette tuned for the deep-navy (ink) hero — light dots and glowing arcs.
const NAVY: [number, number, number] = [150, 180, 224]; // soft periwinkle surface dots
const SKY: [number, number, number] = [92, 176, 234]; // brand sky (arcs / dev hub)
const COPPER: [number, number, number] = [224, 160, 106]; // warm copper (trade arcs / markets)
const HUB: [number, number, number] = [255, 255, 255]; // hub cores / labels on ink

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

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
    let spin = INITIAL_SPIN;
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

      // faint graticule for sphere structure over the oceans
      ctx.lineWidth = 0.6;
      for (const line of GRATICULE) {
        ctx.beginPath();
        let started = false;
        for (const v of line) {
          const r = rotate(v, spin);
          if (r.z <= 0.02) {
            started = false;
            continue;
          }
          const p = project(r);
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.strokeStyle = rgba(NAVY, 0.13);
        ctx.stroke();
      }

      // continent dots (front hemisphere only), shaded by depth
      for (const d of DOTS) {
        const r = rotate(d, spin);
        if (r.z <= 0.02) continue;
        const p = project(r);
        const depth = r.z;
        ctx.beginPath();
        ctx.fillStyle = rgba(NAVY, 0.28 + depth * 0.55);
        ctx.arc(p.sx, p.sy, 0.8 + depth * 1.25, 0, Math.PI * 2);
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

    let visible = false;
    function loop() {
      if (!visible) return;
      spin += 0.0016;
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    draw(); // paint the first frame immediately (matches the static fallback)

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    if (cv.parentElement) ro.observe(cv.parentElement);

    // Only animate while the globe is on-screen — saves CPU/battery on mobile.
    const io = new IntersectionObserver(
      ([entry]) => {
        const onScreen = entry.isIntersecting;
        if (onScreen && !visible && !reduce) {
          visible = true;
          raf = requestAnimationFrame(loop);
        } else if (!onScreen) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(cv);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
    </div>
  );
}
