"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Globe } from "@/components/three/globe";

export default function GlobeCanvas({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.75], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Render authored colors directly — no filmic tone mapping to dim the palette.
      flat
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
      }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Globe interactive={interactive} />
    </Canvas>
  );
}
