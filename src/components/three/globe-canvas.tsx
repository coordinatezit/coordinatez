"use client";

import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/three/globe";

export default function GlobeCanvas({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.75], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Globe interactive={interactive} />
    </Canvas>
  );
}
