"use client";

import dynamic from "next/dynamic";
import { GlobeFallback } from "@/components/three/globe-fallback";

// Canvas-based dotted globe — renders identically across devices (no WebGL
// dependency). Loaded client-side only; the static SVG shows until it mounts.
const DottedGlobe = dynamic(
  () => import("@/components/hero/dotted-globe").then((m) => m.DottedGlobe),
  { ssr: false, loading: () => <GlobeFallback /> }
);

export function HeroGlobe() {
  return <DottedGlobe />;
}
