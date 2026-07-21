"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { networkNodes, networkArcs, type NetworkNode } from "@/data/network";

const GLOBE_RADIUS = 1;

const COLORS = {
  sphere: "#101549",
  graticule: "#3a4187",
  dots: "#545caf",
  sky: "#4aa3dc",
  copper: "#d3915a",
  headquarters: "#7dc0ea",
  atmosphere: new THREE.Color("#2e8fca"),
};

function latLonToVec3(lat: number, lon: number, radius = GLOBE_RADIUS): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta)
  );
}

/** Great-circle-ish arc: spherical interpolation with a sine altitude bump. */
function arcPoints(from: THREE.Vector3, to: THREE.Vector3, segments = 48): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const angle = from.angleTo(to);
  const altitude = 0.12 + angle * 0.16;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().copy(from).lerp(to, t).normalize();
    // lerp+normalize approximates slerp closely enough for display arcs
    point.multiplyScalar(GLOBE_RADIUS * (1 + Math.sin(t * Math.PI) * altitude));
    points.push(point);
  }
  return points;
}

/** Evenly-ish distributed surface dots (fibonacci sphere) for abstract texture. */
function useSurfaceDots(count = 700) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      positions[i * 3 + 1] = y * GLOBE_RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;
    }
    return positions;
  }, [count]);
}

function Graticule() {
  const lines = useMemo(() => {
    const group: THREE.Vector3[][] = [];
    // latitude rings
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 6) {
        ring.push(latLonToVec3(lat, lon, GLOBE_RADIUS * 1.001));
      }
      group.push(ring);
    }
    // longitude meridians
    for (let lon = 0; lon < 360; lon += 30) {
      const meridian: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 6) {
        meridian.push(latLonToVec3(lat, lon, GLOBE_RADIUS * 1.001));
      }
      group.push(meridian);
    }
    return group;
  }, []);

  return (
    <>
      {lines.map((points, i) => (
        <Line key={i} points={points} color={COLORS.graticule} lineWidth={0.5} transparent opacity={0.55} />
      ))}
    </>
  );
}

/** Soft fresnel rim so the sphere reads as an atmosphere-lit planet. */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uColor: { value: COLORS.atmosphere } },
        vertexShader: `
          varying float vIntensity;
          void main() {
            vec3 viewNormal = normalize(normalMatrix * normal);
            vIntensity = pow(0.62 - dot(viewNormal, vec3(0.0, 0.0, 1.0)), 2.2);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vIntensity;
          void main() {
            gl_FragColor = vec4(uColor, 1.0) * vIntensity;
          }
        `,
      }),
    []
  );
  return (
    <mesh material={material} scale={1.18}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
    </mesh>
  );
}

function NodeMarker({ node }: { node: NetworkNode }) {
  const position = useMemo(() => latLonToVec3(node.lat, node.lon, GLOBE_RADIUS * 1.005), [node]);
  const isHub = node.kind !== "market";
  const color = node.kind === "headquarters" ? COLORS.headquarters : node.kind === "development" ? COLORS.sky : COLORS.copper;

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[isHub ? 0.022 : 0.013, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[isHub ? 0.042 : 0.026, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      {isHub && (
        <Html
          position={[0, 0.07, 0]}
          center
          occlude
          distanceFactor={2.6}
          className="pointer-events-none select-none"
        >
          <div className="whitespace-nowrap rounded-sm border border-white/20 bg-[#0b0e33]/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
            {node.city}
          </div>
        </Html>
      )}
    </group>
  );
}

function Arcs() {
  const arcs = useMemo(() => {
    const byId = Object.fromEntries(networkNodes.map((n) => [n.id, n]));
    return networkArcs.map(({ from, to }, i) => {
      const a = byId[from];
      const b = byId[to];
      const points = arcPoints(latLonToVec3(a.lat, a.lon), latLonToVec3(b.lat, b.lon));
      const curve = new THREE.CatmullRomCurve3(points);
      const isTechArc = from === "chicago" && to === "mehsana";
      return { points, curve, isTechArc, phase: (i / networkArcs.length) * Math.PI * 2 };
    });
  }, []);

  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcs.forEach((arc, i) => {
      const pulse = pulseRefs.current[i];
      if (!pulse) return;
      const progress = (t * 0.14 + arc.phase / (Math.PI * 2)) % 1;
      arc.curve.getPoint(progress, pulse.position);
      const fade = Math.sin(progress * Math.PI);
      pulse.scale.setScalar(0.6 + fade * 0.7);
      (pulse.material as THREE.MeshBasicMaterial).opacity = 0.25 + fade * 0.75;
    });
  });

  return (
    <>
      {arcs.map((arc, i) => (
        <group key={i}>
          <Line
            points={arc.points}
            color={arc.isTechArc ? COLORS.sky : COLORS.copper}
            lineWidth={arc.isTechArc ? 1.4 : 1}
            transparent
            opacity={arc.isTechArc ? 0.75 : 0.45}
          />
          <mesh
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.012, 10, 10]} />
            <meshBasicMaterial
              color={arc.isTechArc ? COLORS.sky : COLORS.copper}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function Globe({ interactive = true }: { interactive?: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const dots = useSurfaceDots();

  useFrame(({ pointer }, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.055;
    }
    if (tiltRef.current && interactive) {
      // gentle pointer parallax
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        pointer.y * -0.12,
        0.04
      );
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltRef.current.rotation.y,
        pointer.x * 0.18,
        0.04
      );
    }
  });

  return (
    <group ref={tiltRef} rotation={[0.32, 0, -0.08]}>
      <Atmosphere />
      {/* Rotate the globe so the US–India corridor faces the camera on load */}
      <group ref={globeRef} rotation={[0, -0.4, 0]}>
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS * 0.995, 64, 64]} />
          <meshBasicMaterial color={COLORS.sphere} transparent opacity={0.92} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
          </bufferGeometry>
          <pointsMaterial color={COLORS.dots} size={0.011} sizeAttenuation transparent opacity={0.9} />
        </points>
        <Graticule />
        <Arcs />
        {networkNodes.map((node) => (
          <NodeMarker key={node.id} node={node} />
        ))}
      </group>
    </group>
  );
}
