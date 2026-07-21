"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { GlobeFallback } from "@/components/three/globe-fallback";

// Client-side-only 3D scene — three.js is only downloaded when we actually render it.
const GlobeCanvas = dynamic(() => import("@/components/three/globe-canvas"), {
  ssr: false,
  loading: () => <GlobeFallback className="opacity-80" />,
});

function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Capability is decided once per page load — cache it so the snapshot stays stable.
let cachedMode: "webgl" | "fallback" | null = null;

function getSnapshot(): "webgl" | "fallback" {
  if (cachedMode === null) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallViewport = window.matchMedia("(max-width: 1023px)").matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 3;
    cachedMode =
      !reducedMotion && !smallViewport && !lowEnd && supportsWebGl() ? "webgl" : "fallback";
  }
  return cachedMode;
}

const subscribe = () => () => {};
const getServerSnapshot = (): "webgl" | "fallback" => "fallback";

/**
 * Capability gate for the 3D globe: real WebGL scene on capable desktop
 * devices, the static illustration everywhere else (mobile, reduced motion,
 * no WebGL, very low-core devices). The server render ships the lightweight
 * fallback markup; the client upgrades after hydration when capable.
 */
export function HeroGlobe() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mode !== "webgl") {
    return <GlobeFallback />;
  }
  return <GlobeCanvas />;
}
